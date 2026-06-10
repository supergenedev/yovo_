import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { resolveWorkbenchModeProps } from './_shared';

export type SgDsLibraryMediaFit = 'cover' | 'contain';
export type SgDsLibraryMediaMask = 'none' | 'fade';
export type SgDsLibraryMediaRounded = 'none' | 'sm' | 'md' | 'lg' | 'pill';
export type SgDsLibraryMediaOverlay = 'none' | 'subtle' | 'muted' | 'inverse' | 'accent' | 'glass';

export type SgDsLibraryMediaProps = HTMLAttributes<HTMLDivElement> & {
  alt?: string;
  aspectRatio?: string;
  backgroundPosition?: CSSProperties['backgroundPosition'];
  backgroundRepeat?: CSSProperties['backgroundRepeat'];
  backgroundSize?: CSSProperties['backgroundSize'];
  children?: ReactNode;
  fit?: SgDsLibraryMediaFit;
  /** Fades the media (image/video) itself toward transparent, independent of any
   *  overlay tint — use it to blend the media into the surrounding background.
   *  `overlayMask` only masks the overlay tint; `mask` masks the media itself. */
  mask?: SgDsLibraryMediaMask;
  maskAngle?: number | string;
  maskEnd?: number | string;
  maskStart?: number | string;
  overlay?: SgDsLibraryMediaOverlay;
  /** Custom overlay color or gradient (any CSS color/gradient). Overrides the
   *  `overlay` variant's preset tint so you control the opacity yourself. When
   *  set, the overlay renders even if `overlay` is `none`. */
  overlayColor?: string;
  overlayGlassBlur?: number | string;
  overlayMask?: SgDsLibraryMediaMask;
  overlayMaskAngle?: number | string;
  overlayMaskEnd?: number | string;
  overlayMaskStart?: number | string;
  /** Custom corner radius as a CSS length (e.g. "20px", "1.5rem"). Overrides the
   *  `rounded` preset when set. */
  radius?: number | string;
  rounded?: SgDsLibraryMediaRounded;
  src?: string;
  videoAutoPlay?: boolean;
  videoControls?: boolean;
  videoLoop?: boolean;
  videoMuted?: boolean;
  videoPlaysInline?: boolean;
};

export function SgDsLibraryMedia(rawProps: SgDsLibraryMediaProps) {
  const {
  alt = '',
  aspectRatio = '16 / 9',
  backgroundPosition = 'center',
  backgroundRepeat = 'no-repeat',
  backgroundSize,
  children,
  className = '',
  fit = 'cover',
  mask = 'none',
  maskAngle = 0,
  maskEnd = 100,
  maskStart = 45,
  overlay = 'none',
  overlayColor,
  overlayGlassBlur,
  overlayMask = 'none',
  overlayMaskAngle = 0,
  overlayMaskEnd = 100,
  overlayMaskStart = 45,
  radius,
  rounded = 'md',
  src,
  style,
  videoAutoPlay = true,
  videoControls = false,
  videoLoop = true,
  videoMuted = true,
  videoPlaysInline = true,
  ...props
} = resolveWorkbenchModeProps(rawProps);
  const isVideo = isMediaVideoSource(src);
  const hasOverlay = overlay !== 'none' || Boolean(overlayColor);
  const mediaStyle = {
    aspectRatio,
    ...(hasOverlay && overlayMask !== 'none' ? {
      '--c-media-mask-angle': formatMediaAngle(overlayMaskAngle),
      '--c-media-mask-end': formatMediaPercentage(overlayMaskEnd),
      '--c-media-mask-start': formatMediaPercentage(overlayMaskStart),
    } : null),
    ...(mask !== 'none' ? {
      '--c-media-fade-angle': formatMediaAngle(maskAngle),
      '--c-media-fade-end': formatMediaPercentage(maskEnd),
      '--c-media-fade-start': formatMediaPercentage(maskStart),
    } : null),
    ...(overlayColor ? { '--c-media-overlay-color': overlayColor } : null),
    ...(radius !== undefined && radius !== '' ? { borderRadius: formatMediaLength(radius) } : null),
    ...(overlayGlassBlur !== undefined ? { '--c-media-glass-blur': formatMediaLength(overlayGlassBlur) } : null),
    ...(src && !isVideo ? {
      backgroundImage: formatMediaBackgroundImage(src),
      backgroundPosition,
      backgroundRepeat,
      backgroundSize: backgroundSize ?? fit,
    } : null),
    ...style,
  } as CSSProperties;
  return (
    <div
      {...props}
      aria-label={src && alt && !isVideo ? alt : props['aria-label']}
      className={['sg-ds-library-scope', 'media', `media--fit-${fit}`, `media--rounded-${rounded}`, className].filter(Boolean).join(' ')}
      data-has-media={src ? 'true' : undefined}
      data-overlay={overlay === 'none' ? (overlayColor ? 'custom' : undefined) : overlay}
      data-overlay-color={overlayColor ? 'true' : undefined}
      data-overlay-mask={hasOverlay && overlayMask !== 'none' ? overlayMask : undefined}
      data-mask={mask === 'none' ? undefined : mask}
      role={src && alt && !isVideo ? 'img' : props.role}
      style={mediaStyle}
    >
      {src && isVideo ? (
        <video
          aria-label={alt || undefined}
          autoPlay={videoAutoPlay}
          className="media-video"
          controls={videoControls}
          loop={videoLoop}
          muted={videoMuted}
          playsInline={videoPlaysInline}
          src={src}
        />
      ) : null}
      {children ?? (!src ? <span className="media-placeholder" /> : null)}
      {hasOverlay ? <span aria-hidden="true" className="media-overlay" /> : null}
    </div>
  );
}

function formatMediaBackgroundImage(src: string): string {
  return `url("${src.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}")`;
}

function isMediaVideoSource(src: string | undefined): src is string {
  const value = src?.trim() ?? '';
  const path = value.split(/[?#]/, 1)[0].toLowerCase();
  return value.toLowerCase().startsWith('data:video/') || /\.(?:webm|mp4|m4v|mov|ogv|ogg)$/.test(path);
}

function formatMediaAngle(value: number | string): string {
  const text = String(value).trim();
  return /[a-z)]$/i.test(text) ? text : `${text}deg`;
}

function formatMediaPercentage(value: number | string): string {
  const text = String(value).trim();
  return text.endsWith('%') ? text : `${text}%`;
}

function formatMediaLength(value: number | string): string {
  const text = String(value).trim();
  if (!text) return '0px';
  return /[a-z%)]$/i.test(text) ? text : `${text}px`;
}

export default SgDsLibraryMedia;
