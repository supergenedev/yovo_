import { useRef } from 'react'

// 피드 인라인 영상 플레이어.
// - 저장된 포스터(업로드 시 추출한 특정지점 썸네일)가 있으면 그대로 사용.
// - 없으면 메타데이터 로드 후 특정 지점(25%) 프레임으로 seek 해 '검은 박스' 대신
//   대표 프레임을 미리보기로 보여준다. 사용자가 직접 스크럽하지 않고 바로 재생하면
//   처음(0초)부터 재생되도록 보정한다.
export default function FeedVideo({ src, poster }: { src: string; poster?: string }) {
  const startedRef = useRef(false)
  const previewSeekRef = useRef(false)

  const previewPoint = (d: number) => Math.min(d * 0.25, 5)

  return (
    <video
      src={src}
      poster={poster || undefined}
      controls
      playsInline
      preload="metadata"
      onClick={(e) => e.stopPropagation()}
      onLoadedMetadata={(e) => {
        // 등록된 포스터(업로드 시 추출한 썸네일)가 있으면 그대로 보여주고 영상 데이터를
        // 더 받지 않는다. 포스터가 없을 때만 특정 지점(25%)으로 seek 해 프레임을 그린다.
        if (poster) return
        const v = e.currentTarget
        if (isFinite(v.duration) && v.duration > 0.2) {
          previewSeekRef.current = true
          try { v.currentTime = previewPoint(v.duration) } catch { /* noop */ }
        }
      }}
      onSeeked={() => {
        // 우리가 건 미리보기 seek는 한 번만 무시, 그 외(사용자 스크럽)는 '시작됨'으로 표시
        if (previewSeekRef.current) previewSeekRef.current = false
        else startedRef.current = true
      }}
      onPlay={(e) => {
        const v = e.currentTarget
        if (!startedRef.current) {
          startedRef.current = true
          // 미리보기 지점이 아니라 처음부터 재생
          if (v.currentTime > 0) {
            try { v.currentTime = 0 } catch { /* noop */ }
          }
        }
      }}
      style={{
        width: '100%',
        aspectRatio: '16 / 9',
        objectFit: 'cover',
        background: '#000',
        borderRadius: 'var(--ds-radius-md, 12px)',
        display: 'block',
      }}
    />
  )
}
