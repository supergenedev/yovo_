import { useEffect, useRef, useState } from 'react';

// 정지된 영상 프레임 썸네일. 화면(또는 근처)에 들어올 때만 영상을 로드(lazy)해
// 특정 지점(25%, 최대 5초) 프레임을 그린다 → 그리드에서 여러 영상을 한꺼번에
// 받지 않으므로 초기 로드가 빨라진다.
export function SgDsLibraryLazyVideoThumb({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || load) return;
    if (typeof IntersectionObserver === 'undefined') { setLoad(true); return; }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: '300px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [load]);

  return (
    <video
      ref={ref}
      src={load ? src : undefined}
      muted
      playsInline
      preload="metadata"
      tabIndex={-1}
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', pointerEvents: 'none' }}
      onLoadedMetadata={(e) => {
        const v = e.currentTarget;
        if (isFinite(v.duration) && v.duration > 0.2) {
          try { v.currentTime = Math.min(v.duration * 0.25, 5); } catch { /* noop */ }
        }
      }}
    />
  );
}

export default SgDsLibraryLazyVideoThumb;
