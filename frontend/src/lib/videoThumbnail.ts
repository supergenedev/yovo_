// 동영상 파일에서 중간 구간(25~75%)의 랜덤 프레임 한 장을 추출해
// JPEG 썸네일(Blob + 미리보기 objectURL)로 돌려준다. 전부 브라우저 안에서 처리.
export interface VideoThumb {
  url: string
  blob: Blob
}

export function extractVideoFrame(
  file: File,
  rand: () => number = Math.random,
): Promise<VideoThumb> {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video')
    video.preload = 'metadata'
    video.muted = true
    video.playsInline = true
    const objectUrl = URL.createObjectURL(file)
    video.src = objectUrl

    let settled = false
    const cleanup = () => URL.revokeObjectURL(objectUrl)
    const fail = (e: unknown) => { if (!settled) { settled = true; cleanup(); reject(e) } }

    // 일부 브라우저/코덱에서 seeked가 끝내 안 오는 경우 방지
    const timer = setTimeout(() => fail(new Error('video thumbnail timeout')), 8000)

    video.onloadedmetadata = () => {
      const d = video.duration
      if (!isFinite(d) || d <= 0) {
        video.currentTime = 0.1
        return
      }
      const start = d * 0.25
      const end = d * 0.75
      const t = start + rand() * (end - start)
      video.currentTime = Math.min(t, Math.max(0.1, d - 0.1))
    }

    video.onseeked = () => {
      if (settled) return
      try {
        const canvas = document.createElement('canvas')
        canvas.width = video.videoWidth || 640
        canvas.height = video.videoHeight || 360
        const ctx = canvas.getContext('2d')
        if (!ctx) return fail(new Error('canvas 2d context 없음'))
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
        canvas.toBlob(
          (blob) => {
            if (!blob) return fail(new Error('toBlob 실패'))
            settled = true
            clearTimeout(timer)
            cleanup()
            resolve({ url: URL.createObjectURL(blob), blob })
          },
          'image/jpeg',
          0.82,
        )
      } catch (e) {
        fail(e)
      }
    }

    video.onerror = () => fail(new Error('동영상을 읽을 수 없습니다'))
  })
}
