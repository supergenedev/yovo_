// 동영상 파일에서 특정 지점(기본 25% 지점)의 "내용 있는" 프레임 한 장을 추출해
// JPEG 썸네일(Blob + 미리보기 objectURL)로 돌려준다. 전부 브라우저 안에서 처리.
//
// 검은 썸네일 방지:
//  1) seek 후 프레임이 실제로 페인트될 때까지 requestVideoFrameCallback(가능 시)으로 대기
//  2) 캡처한 프레임의 평균 밝기를 검사해 너무 어두우면 다른 지점에서 재시도
//  3) 끝까지 다 어두우면 그래도 가장 밝았던 프레임을 사용
export interface VideoThumb {
  url: string
  blob: Blob
}

const DARK_THRESHOLD = 18 // 평균 휘도(0~255)가 이 값 미만이면 '검은 프레임'으로 간주

function meanLuma(ctx: CanvasRenderingContext2D, w: number, h: number): number {
  try {
    const { data } = ctx.getImageData(0, 0, w, h)
    let sum = 0
    let count = 0
    // 성능을 위해 픽셀을 듬성듬성(step) 샘플링
    const step = Math.max(4, Math.floor((w * h) / 4000)) * 4
    for (let i = 0; i < data.length; i += step) {
      sum += 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]
      count++
    }
    return count ? sum / count : 0
  } catch {
    return 255 // 읽기 실패 시 어둡지 않다고 가정(재시도 안 함)
  }
}

export function extractVideoFrame(
  file: File,
  rand: () => number = Math.random,
): Promise<VideoThumb> {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video')
    video.preload = 'auto'
    video.muted = true
    video.playsInline = true
    video.crossOrigin = 'anonymous'
    const objectUrl = URL.createObjectURL(file)
    video.src = objectUrl

    let settled = false
    const cleanup = () => URL.revokeObjectURL(objectUrl)
    const fail = (e: unknown) => { if (!settled) { settled = true; cleanup(); reject(e) } }
    const timer = setTimeout(() => {
      // 시간 초과 시 마지막 best 프레임이라도 내보낸다
      if (best) finish(best.canvas)
      else fail(new Error('video thumbnail timeout'))
    }, 12000)

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d', { willReadFrequently: true })

    let duration = 0
    let attempt = 0
    const MAX_ATTEMPTS = 5
    let best: { canvas: HTMLCanvasElement; luma: number } | null = null

    function pickTime(): number {
      // 1차: 특정 지점(영상의 25% 지점) — 결정적. 검은 프레임이면 아래 지점들로 재시도.
      const fracs = [0.25, 0.5, 0.1, 0.65, 0.4]
      return duration * (fracs[attempt] ?? 0.25)
    }

    function finish(c: HTMLCanvasElement) {
      c.toBlob(
        (blob) => {
          if (!blob) return fail(new Error('toBlob 실패'))
          settled = true
          clearTimeout(timer)
          cleanup()
          resolve({ url: URL.createObjectURL(blob), blob })
        },
        'image/jpeg',
        0.85,
      )
    }

    function capture() {
      if (settled || !ctx) return
      const w = (canvas.width = video.videoWidth || 640)
      const h = (canvas.height = video.videoHeight || 360)
      ctx.drawImage(video, 0, 0, w, h)
      const luma = meanLuma(ctx, w, h)

      // 지금까지 가장 밝은 프레임 보관(어두운 것만 나오면 최후 수단)
      if (!best || luma > best.luma) {
        const snap = document.createElement('canvas')
        snap.width = w; snap.height = h
        snap.getContext('2d')?.drawImage(canvas, 0, 0)
        best = { canvas: snap, luma }
      }

      attempt++
      if (luma >= DARK_THRESHOLD || attempt >= MAX_ATTEMPTS) {
        finish((best ?? { canvas }).canvas)
        return
      }
      // 더 밝은 프레임을 찾아 다른 지점으로 이동
      seekTo(pickTime())
    }

    // seek 후 프레임이 실제로 페인트되면 capture 한다.
    // requestVideoFrameCallback이 더 정확하지만 일부 환경(일시정지/헤드리스)에서
    // 끝내 호출되지 않으므로, 타이머와 경쟁시켜 둘 중 먼저 오는 쪽으로 캡처한다.
    function onSeeked() {
      if (settled) return
      let done = false
      const go = () => { if (!done) { done = true; capture() } }
      const anyVideo = video as HTMLVideoElement & {
        requestVideoFrameCallback?: (cb: () => void) => number
      }
      if (typeof anyVideo.requestVideoFrameCallback === 'function') {
        anyVideo.requestVideoFrameCallback(() => go())
      }
      setTimeout(go, 180) // rvfc 미발화 대비 폴백
    }

    function seekTo(t: number) {
      video.currentTime = Math.min(Math.max(0.1, t), Math.max(0.1, duration - 0.05))
    }

    video.onloadedmetadata = () => {
      duration = video.duration
      if (!isFinite(duration) || duration <= 0) {
        // 길이를 모르면 앞부분 한 프레임만
        duration = 1
        seekTo(0.1)
        return
      }
      seekTo(pickTime())
    }

    video.addEventListener('seeked', onSeeked)
    video.onerror = () => fail(new Error('동영상을 읽을 수 없습니다'))
  })
}
