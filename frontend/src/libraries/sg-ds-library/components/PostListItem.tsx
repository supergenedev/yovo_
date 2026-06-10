import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import {
  SgDsLibraryAvatar,
  type SgDsLibraryAvatarShape,
  type SgDsLibraryAvatarSize,
  type SgDsLibraryAvatarTone,
} from './Avatar';
import type { SgDsLibraryBadgeStatus, SgDsLibraryBadgeVariant } from './Badge';
import type { SgDsLibraryButtonShape, SgDsLibraryButtonSize, SgDsLibraryButtonVariant } from './Button';
import {
  SgDsLibraryMediaFrame,
  type SgDsLibraryMediaFrameAspect,
  type SgDsLibraryMediaFrameProps,
  type SgDsLibraryMediaFrameSize,
} from './MediaFrame';
import { resolveWorkbenchModeProps } from './_shared';

export type SgDsLibraryPostListItemAspect = SgDsLibraryMediaFrameAspect;
export type SgDsLibraryPostListItemSize = 'lg' | 'sm';
export type SgDsLibraryPostListItemVariant = 'horizontal' | 'vertical';

export type SgDsLibraryPostListItemProps = HTMLAttributes<HTMLDivElement> & {
  mediaFrameProps?: SgDsLibraryMediaFrameProps;
  mediaAspect?: SgDsLibraryMediaFrameAspect;
  mediaSize?: SgDsLibraryMediaFrameSize;
  mediaBackground?: string;
  mediaBackgroundToken?: string;
  mediaBackgroundTokenCollection?: string;
  mediaBadgeStatus?: SgDsLibraryBadgeStatus;
  mediaBadgeText?: string;
  mediaBadgeVariant?: SgDsLibraryBadgeVariant;
  mediaCaptionEyebrow?: string;
  mediaCaptionTitle?: string;
  mediaDuration?: string;
  mediaImageUrl?: string;
  mediaLive?: boolean;
  mediaLiveLabel?: string;
  mediaLocked?: boolean;
  mediaLockActionIcon?: string;
  mediaLockActionLabel?: string;
  mediaLockActionShape?: SgDsLibraryButtonShape;
  mediaLockActionSize?: SgDsLibraryButtonSize;
  mediaLockActionVariant?: SgDsLibraryButtonVariant;
  mediaLockIcon?: string;
  mediaLockMessage?: string;
  mediaLockTitle?: string;
  mediaClassName?: string;
  mediaOnUnlock?: SgDsLibraryMediaFrameProps['onUnlock'];
  mediaOverlaySlot?: ReactNode;
  mediaPlayLabel?: string;
  mediaProgress?: number | string;
  mediaProgressLabel?: string;
  mediaShowGrain?: boolean;
  mediaShowPlay?: boolean;
  mediaSrc?: string;
  mediaStyle?: CSSProperties;
  mediaViewerCount?: string;
  mediaWidth?: number | string;
  /** @deprecated Use mediaBackground. */
  thumbnailBackground?: string;
  /** @deprecated Use mediaSrc or mediaImageUrl. */
  thumbnailImageUrl?: string;
  /** @deprecated Use mediaAspect. */
  thumbnailAspect?: SgDsLibraryPostListItemAspect;
  /** @deprecated Use mediaWidth. */
  thumbnailWidth?: number | string;
  avatarAlt?: string;
  avatarShape?: SgDsLibraryAvatarShape;
  avatarSize?: SgDsLibraryAvatarSize;
  avatarSrc?: string;
  avatarTone?: SgDsLibraryAvatarTone;
  badge?: ReactNode;
  duration?: ReactNode;
  showAvatar?: boolean;
  showPlay?: boolean;
  eyebrow?: ReactNode;
  eyebrowColor?: string;
  eyebrowColorToken?: string;
  eyebrowColorTokenCollection?: string;
  initials?: string;
  title?: ReactNode;
  meta?: ReactNode;
  caption?: ReactNode;
  size?: SgDsLibraryPostListItemSize;
  variant?: SgDsLibraryPostListItemVariant;
};

export function SgDsLibraryPostListItem(rawProps: SgDsLibraryPostListItemProps) {
  const {
    avatarAlt,
    avatarShape = 'circle',
    avatarSize = 'xs',
    avatarSrc,
    avatarTone = 'neutral',
    badge,
    caption,
    className = '',
    duration,
    eyebrow,
    eyebrowColor,
    eyebrowColorToken,
    eyebrowColorTokenCollection,
    initials,
    mediaAspect,
    mediaBackground,
    mediaBackgroundToken,
    mediaBackgroundTokenCollection,
    mediaBadgeStatus,
    mediaBadgeText,
    mediaBadgeVariant,
    mediaCaptionEyebrow,
    mediaCaptionTitle,
    mediaClassName = '',
    mediaDuration,
    mediaFrameProps = {},
    mediaImageUrl,
    mediaLive,
    mediaLiveLabel,
    mediaLocked,
    mediaLockActionIcon,
    mediaLockActionLabel,
    mediaLockActionShape,
    mediaLockActionSize,
    mediaLockActionVariant,
    mediaLockIcon,
    mediaLockMessage,
    mediaLockTitle,
    mediaOnUnlock,
    mediaOverlaySlot,
    mediaPlayLabel,
    mediaProgress,
    mediaProgressLabel,
    mediaShowGrain,
    mediaShowPlay,
    mediaSize,
    mediaSrc,
    mediaStyle,
    mediaViewerCount,
    mediaWidth,
    meta,
    showAvatar = true,
    showPlay,
    size = 'sm',
    style,
    thumbnailAspect,
    thumbnailBackground,
    thumbnailImageUrl,
    thumbnailWidth,
    title = 'Post title',
    variant = 'horizontal',
    ...props
  } = resolveWorkbenchModeProps(rawProps);
  const mediaFrameClassName = mediaFrameProps.className ?? '';
  const mediaFrameStyle = mediaFrameProps.style;
  const mediaWidthCss = formatPostListItemCssDimension(
    mediaWidth ?? thumbnailWidth ?? mediaFrameStyle?.width ?? '128px',
  );
  const hasAvatar = showAvatar && Boolean(avatarSrc || initials);
  const resolvedAvatarSize = avatarSize ?? (size === 'lg' ? 'sm' : 'xs');
  const resolvedMediaAspect = mediaAspect ?? thumbnailAspect ?? mediaFrameProps.aspect ?? '16/9';
  const resolvedMediaSize = mediaSize ?? mediaFrameProps.size ?? 'md';
  const resolvedMediaBackground = mediaBackground ?? thumbnailBackground ?? mediaFrameProps.background ?? '';
  const resolvedMediaBackgroundToken = mediaBackgroundToken ?? mediaFrameProps.backgroundToken ?? '';
  const resolvedMediaBackgroundTokenCollection = mediaBackgroundTokenCollection ?? mediaFrameProps.backgroundTokenCollection ?? '';
  const resolvedMediaSrc = mediaSrc ?? thumbnailImageUrl ?? mediaFrameProps.src ?? '';
  const resolvedMediaImageUrl = mediaImageUrl ?? mediaFrameProps.imageUrl ?? '';
  const resolvedMediaDuration = mediaDuration ?? toPostListItemMediaText(duration) ?? mediaFrameProps.duration ?? '';
  const resolvedMediaBadgeText = mediaBadgeText ?? toPostListItemMediaText(badge) ?? mediaFrameProps.badgeText ?? '';
  const resolvedMediaShowPlay = mediaShowPlay ?? showPlay ?? mediaFrameProps.showPlay ?? false;
  const resolvedMediaStyle = {
    ...(mediaFrameStyle ?? {}),
    ...(mediaStyle ?? {}),
    width: variant === 'vertical' ? '100%' : mediaWidthCss ?? undefined,
  } as CSSProperties;
  const eyebrowCssColor = toPostListItemCssColor(
    formatPostListItemTokenReference(eyebrowColorTokenCollection, eyebrowColorToken) ?? eyebrowColor,
  );
  const rootStyle = eyebrowCssColor
    ? ({
        ...style,
        '--post-list-item-eyebrow-color': eyebrowCssColor,
      } as CSSProperties)
    : style;
  return (
    <div
      {...props}
      className={['sg-ds-library-scope', 'post-list-item', className].filter(Boolean).join(' ')}
      data-size={size}
      data-variant={variant}
      style={rootStyle}
    >
      <SgDsLibraryMediaFrame
        {...mediaFrameProps}
        aspect={resolvedMediaAspect}
        size={resolvedMediaSize}
        background={resolvedMediaBackground}
        backgroundToken={resolvedMediaBackgroundToken}
        backgroundTokenCollection={resolvedMediaBackgroundTokenCollection}
        badgeStatus={mediaBadgeStatus ?? mediaFrameProps.badgeStatus}
        badgeText={resolvedMediaBadgeText}
        badgeVariant={mediaBadgeVariant ?? mediaFrameProps.badgeVariant}
        captionEyebrow={mediaCaptionEyebrow ?? mediaFrameProps.captionEyebrow ?? ''}
        captionTitle={mediaCaptionTitle ?? mediaFrameProps.captionTitle ?? ''}
        className={['post-list-item-media', mediaFrameClassName, mediaClassName].filter(Boolean).join(' ')}
        duration={resolvedMediaDuration}
        imageUrl={resolvedMediaImageUrl}
        live={mediaLive ?? mediaFrameProps.live ?? false}
        liveLabel={mediaLiveLabel ?? mediaFrameProps.liveLabel ?? ''}
        locked={mediaLocked ?? mediaFrameProps.locked ?? false}
        lockActionIcon={mediaLockActionIcon ?? mediaFrameProps.lockActionIcon ?? ''}
        lockActionLabel={mediaLockActionLabel ?? mediaFrameProps.lockActionLabel ?? ''}
        lockActionShape={mediaLockActionShape ?? mediaFrameProps.lockActionShape ?? 'pill'}
        lockActionSize={mediaLockActionSize ?? mediaFrameProps.lockActionSize ?? 'sm'}
        lockActionVariant={mediaLockActionVariant ?? mediaFrameProps.lockActionVariant ?? 'primary'}
        lockIcon={mediaLockIcon ?? mediaFrameProps.lockIcon ?? ''}
        lockMessage={mediaLockMessage ?? mediaFrameProps.lockMessage ?? ''}
        lockTitle={mediaLockTitle ?? mediaFrameProps.lockTitle ?? ''}
        onUnlock={mediaOnUnlock ?? mediaFrameProps.onUnlock}
        overlaySlot={mediaOverlaySlot ?? mediaFrameProps.overlaySlot}
        playLabel={mediaPlayLabel ?? mediaFrameProps.playLabel ?? ''}
        progress={mediaProgress ?? mediaFrameProps.progress}
        progressLabel={mediaProgressLabel ?? mediaFrameProps.progressLabel ?? ''}
        showGrain={mediaShowGrain ?? mediaFrameProps.showGrain ?? true}
        showPlay={resolvedMediaShowPlay}
        src={resolvedMediaSrc}
        style={resolvedMediaStyle}
        viewerCount={mediaViewerCount ?? mediaFrameProps.viewerCount ?? ''}
      />
      <div
        className="post-list-item-body"
        data-avatar={hasAvatar ? 'true' : 'false'}
        data-avatar-size={hasAvatar ? resolvedAvatarSize : undefined}
      >
        <span className="post-list-item-main">
          {hasAvatar ? (
            <SgDsLibraryAvatar
              alt={avatarAlt}
              className="post-list-item-avatar"
              initials={initials}
              shape={avatarShape}
              size={resolvedAvatarSize}
              src={avatarSrc}
              tone={avatarTone}
            />
          ) : null}
          <span className="post-list-item-content">
            {eyebrow ? <span className="post-list-item-eyebrow">{eyebrow}</span> : null}
            <span className="post-list-item-title">{title}</span>
            {meta ? <span className="post-list-item-meta">{meta}</span> : null}
          </span>
        </span>
        {caption ? <span className="post-list-item-caption">{caption}</span> : null}
      </div>
    </div>
  );
}

function formatPostListItemCssDimension(value: number | string | undefined): string | null {
  if (typeof value === 'number') return Number.isFinite(value) ? `${value}px` : null;
  const trimmed = value?.trim();
  return trimmed || null;
}

function toPostListItemMediaText(value: ReactNode | undefined): string | undefined {
  if (typeof value === 'string' || typeof value === 'number') return String(value);
  return undefined;
}

function formatPostListItemTokenReference(collectionId: string | undefined, tokenId: string | undefined): string | null {
  const collection = collectionId?.trim();
  const token = tokenId?.trim();
  return collection && token ? `var(--ds-token-${collection}-${token})` : null;
}

function toPostListItemCssColor(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed || undefined;
}

export default SgDsLibraryPostListItem;
