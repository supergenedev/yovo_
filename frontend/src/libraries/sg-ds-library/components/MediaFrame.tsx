import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { SgDsLibraryBadge, type SgDsLibraryBadgeStatus, type SgDsLibraryBadgeVariant } from './Badge';
import { SgDsLibraryButton, type SgDsLibraryButtonShape, type SgDsLibraryButtonSize, type SgDsLibraryButtonVariant } from './Button';
import { SgDsLibraryIcon } from './Icon';
import { SgDsLibraryLiveStreamBadge, SgDsLibraryLiveStreamViewerCount } from './LiveStream';
import { resolveWorkbenchModeProps } from './_shared';

export type SgDsLibraryMediaFrameAspect = '16/9' | '1' | '1/1' | '4/3' | '21/9' | '4/5' | '9/16' | '3/4';
export type SgDsLibraryMediaFrameSize = 'md' | 'sm';
export type SgDsLibraryMediaFrameFit = 'width' | 'height';
export type SgDsLibraryMediaFrameAlign = 'start' | 'center' | 'end';

export type SgDsLibraryMediaFrameProps = HTMLAttributes<HTMLDivElement> & {
  aspect?: SgDsLibraryMediaFrameAspect;
  size?: SgDsLibraryMediaFrameSize;
  /** Which dimension drives sizing while keeping the aspect ratio.
   *  - `width` (default): fills the available width; height follows. In a
   *    height-constrained container the frame keeps its width-derived height
   *    and is cropped.
   *  - `height`: fills the available height; width follows. Place inside a
   *    height-bounded container so the frame scales down (instead of cropping)
   *    when vertical space shrinks. */
  fit?: SgDsLibraryMediaFrameFit;
  /** Optional height cap for the default (width-driven) mode, as a CSS length
   *  (e.g. "80vh", "480px"). The frame fills its width and keeps the aspect
   *  ratio until its height would exceed this cap; past that the height holds
   *  and the width shrinks to preserve the ratio (no cropping). Implemented as
   *  `max-width = maxHeight × aspectRatio`, so it never collapses and needs no
   *  height-bounded parent. */
  maxHeight?: string;
  /** Horizontal alignment when the frame is narrower than its container (e.g.
   *  once a `maxHeight` cap shrinks the width). Defaults to `start` (left). */
  align?: SgDsLibraryMediaFrameAlign;
  background?: string;
  backgroundToken?: string;
  backgroundTokenCollection?: string;
  src?: string;
  imageUrl?: string;
  locked?: boolean;
  /** Lock notice icon (icon picker). Use to signal the reason — e.g. crown for
   *  premium, user-round for subscriber-only, shield-alert for age restriction. */
  lockIcon?: string;
  /** Lock notice heading (e.g. "프리미엄 전용"). '' hides it. */
  lockTitle?: string;
  /** Lock notice description. '' hides it. */
  lockMessage?: string;
  /** Unlock button label. '' hides the button. */
  lockActionLabel?: string;
  /** Unlock button leading icon (icon picker). */
  lockActionIcon?: string;
  /** Unlock button variant. */
  lockActionVariant?: SgDsLibraryButtonVariant;
  /** Unlock button size. */
  lockActionSize?: SgDsLibraryButtonSize;
  /** Unlock button shape. */
  lockActionShape?: SgDsLibraryButtonShape;
  /** Click handler for the unlock button. */
  onUnlock?: () => void;
  showGrain?: boolean;
  showPlay?: boolean;
  playLabel?: string;
  progress?: number | string;
  progressLabel?: string;
  badgeText?: string;
  /** Color status of the badge (defaults to warning when locked, otherwise info). */
  badgeStatus?: SgDsLibraryBadgeStatus;
  /** Fill style of the badge (defaults to solid when locked, otherwise subtle). */
  badgeVariant?: SgDsLibraryBadgeVariant;
  duration?: string;
  captionEyebrow?: string;
  captionTitle?: string;
  live?: boolean;
  liveLabel?: string;
  viewerCount?: string;
  overlaySlot?: ReactNode;
};

export function SgDsLibraryMediaFrame(rawProps: SgDsLibraryMediaFrameProps) {
  const {
    aspect = '16/9',
    size = 'md',
    fit = 'width',
    maxHeight = '',
    align = 'start',
    background = '',
    backgroundToken = '',
    backgroundTokenCollection = '',
    badgeText = '',
    badgeStatus,
    badgeVariant,
    captionEyebrow = '',
    captionTitle = '',
    className = '',
    duration = '',
    imageUrl = '',
    live = false,
    liveLabel = '',
    locked = false,
    lockIcon = '',
    lockTitle = '',
    lockMessage = '',
    lockActionLabel = '',
    lockActionIcon = '',
    lockActionVariant = 'primary',
    lockActionSize = 'sm',
    lockActionShape = 'pill',
    onUnlock,
    overlaySlot,
    playLabel = '',
    progress,
    progressLabel = '',
    showGrain = true,
    showPlay = true,
    src = '',
    viewerCount = '',
    style,
    ...props
  } = resolveWorkbenchModeProps(rawProps);
  const normalizedAspect = aspect === '1/1' ? '1' : aspect;
  // Feed the height cap to CSS as a variable; the stylesheet turns it into a
  // ratio-preserving max-width. Merge with any author-provided inline style.
  const rootStyle = maxHeight
    ? ({ ...style, '--c-media-frame-max-height': maxHeight } as CSSProperties)
    : style;
  const tokenBackground = formatMediaFrameTokenBackground(backgroundTokenCollection, backgroundToken);
  const mediaFrameBackground = formatMediaFrameBackground(tokenBackground ?? background);
  const resolvedImageUrl = src || imageUrl;
  const normalizedProgress = normalizeMediaFrameProgress(progress);
  const progressStyle = normalizedProgress === null
    ? undefined
    : ({ '--media-frame-progress': `${normalizedProgress}%` } as CSSProperties);
  const hasCaption = Boolean(captionEyebrow || captionTitle);
  // Single badge node reused in both placements: standalone at top-start when
  // not live, or clustered in front of the LIVE badge when live. Color status
  // and fill are author-configurable, falling back to the locked-aware defaults.
  const badgeNode = badgeText ? (
    <SgDsLibraryBadge
      status={badgeStatus ?? (locked ? 'warning' : 'info')}
      variant={badgeVariant ?? (locked ? 'solid' : 'subtle')}
      size="sm"
      shape="default"
      icon={locked ? 'lock' : undefined}
    >
      {badgeText}
    </SgDsLibraryBadge>
  ) : null;
  return (
    <div
      {...props}
      style={rootStyle}
      className={['sg-ds-library-scope', 'media-frame', className].filter(Boolean).join(' ')}
      data-aspect={normalizedAspect}
      data-caption={hasCaption || undefined}
      data-fit={fit === 'height' ? 'height' : undefined}
      data-max-height={maxHeight ? 'true' : undefined}
      data-align={align === 'start' ? undefined : align}
      data-locked={locked || undefined}
      data-size={size}
    >
      <div className="media-frame-aspect" aria-hidden="true" />
      <div className="media-frame-bg" style={{ background: mediaFrameBackground }}>
        {resolvedImageUrl ? <img src={resolvedImageUrl} alt="" /> : null}
      </div>
      {showGrain ? <div className="media-frame-grain" /> : null}
      {hasCaption ? <div className="media-frame-caption-scrim" aria-hidden="true" /> : null}
      {badgeNode && !live ? (
        <div className="media-frame-overlay" data-position="top-start">
          {badgeNode}
        </div>
      ) : null}
      {live ? (
        <div className="media-frame-overlay" data-position="top-full">
          <span className="media-frame-live-group">
            {badgeNode}
            <SgDsLibraryLiveStreamBadge label={liveLabel} />
          </span>
          <SgDsLibraryLiveStreamViewerCount viewerCount={viewerCount} />
        </div>
      ) : null}
      {duration ? (
        <div className="media-frame-overlay" data-position="bottom-end">
          <span className="media-frame-duration">{duration}</span>
        </div>
      ) : null}
      {normalizedProgress === null ? null : (
        <span
          aria-label={progressLabel}
          aria-valuemax={100}
          aria-valuemin={0}
          aria-valuenow={normalizedProgress}
          className="media-frame-progress"
          role="progressbar"
          style={progressStyle}
        />
      )}
      {overlaySlot}
      {locked ? (
        <div className="media-frame-lock">
          {lockIcon ? (
            <span className="media-frame-lock-icon" aria-hidden="true">
              <SgDsLibraryIcon name={lockIcon} size="var(--c-media-frame-lock-icon-size)" />
            </span>
          ) : null}
          {lockTitle ? <span className="media-frame-lock-title">{lockTitle}</span> : null}
          {lockMessage ? <span className="media-frame-lock-message">{lockMessage}</span> : null}
          {lockActionLabel ? (
            <SgDsLibraryButton
              className="media-frame-lock-action"
              size={lockActionSize}
              shape={lockActionShape}
              variant={lockActionVariant}
              leadingIcon={lockActionIcon || undefined}
              onClick={onUnlock}
            >
              {lockActionLabel}
            </SgDsLibraryButton>
          ) : null}
        </div>
      ) : null}
      {showPlay ? (
        <button className="media-frame-play" type="button" aria-label={playLabel}>
          <SgDsLibraryIcon name="play" size="var(--c-media-frame-play-icon-size)" style={{ marginLeft: 'var(--c-media-frame-play-icon-offset)' }} />
        </button>
      ) : null}
      {hasCaption ? (
        <div className="media-frame-caption">
          {captionEyebrow ? <span className="eyebrow">{captionEyebrow}</span> : null}
          {captionTitle ? <span className="title">{captionTitle}</span> : null}
        </div>
      ) : null}
    </div>
  );
}

function normalizeMediaFrameProgress(value: number | string | undefined): number | null {
  if (value === undefined || value === '') return null;
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return null;
  return Math.min(100, Math.max(0, parsed));
}

function formatMediaFrameBackground(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  if (!trimmed) return undefined;
  return looksLikeMediaFrameImageUrl(trimmed) ? formatMediaFrameImageBackground(trimmed) : trimmed;
}

function formatMediaFrameTokenBackground(collectionId: string | undefined, tokenId: string | undefined): string | null {
  const collection = collectionId?.trim();
  const token = tokenId?.trim();
  return collection && token ? `var(--ds-token-${collection}-${token})` : null;
}

function formatMediaFrameImageBackground(src: string): string {
  return `center / cover no-repeat url("${src.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}")`;
}

function looksLikeMediaFrameImageUrl(value: string): boolean {
  const lower = value.toLowerCase();
  return lower.startsWith('http://') ||
    lower.startsWith('https://') ||
    lower.startsWith('data:image/') ||
    lower.startsWith('blob:') ||
    lower.startsWith('/') ||
    lower.startsWith('./') ||
    lower.startsWith('../') ||
    /\.(?:avif|gif|jpe?g|png|svg|webp)(?:[?#].*)?$/i.test(value);
}

export default SgDsLibraryMediaFrame;
