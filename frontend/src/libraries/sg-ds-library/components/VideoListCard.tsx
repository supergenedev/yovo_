import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import {
  SgDsLibraryAvatar,
  type SgDsLibraryAvatarShape,
  type SgDsLibraryAvatarSize,
  type SgDsLibraryAvatarTone,
} from './Avatar';
import { SgDsLibraryBadge, type SgDsLibraryBadgeStatus, type SgDsLibraryBadgeVariant } from './Badge';
import { SgDsLibraryButton, type SgDsLibraryButtonSize } from './Button';
import { SgDsLibraryIcon } from './Icon';
import { SgDsLibraryMediaFrame, type SgDsLibraryMediaFrameAspect, type SgDsLibraryMediaFrameSize } from './MediaFrame';
import { resolveWorkbenchModeProps } from './_shared';

export type SgDsLibraryVideoListCardSize = 'lg' | 'sm';
export type SgDsLibraryVideoListCardVariant = 'vertical' | 'horizontal';

export type SgDsLibraryVideoListCardProps = Omit<HTMLAttributes<HTMLElement>, 'title'> & {
  actionIcon?: string;
  actionLabel?: string;
  actionSize?: SgDsLibraryButtonSize;
  /* 인터랙션 콜백 — 카드 자체 onClick과 분리해 stopPropagation 처리됨 */
  onAvatarClick?: () => void;
  onActionClick?: () => void;
  avatarAlt?: string;
  avatarInitials?: string;
  avatarShape?: SgDsLibraryAvatarShape;
  avatarSize?: SgDsLibraryAvatarSize;
  avatarSrc?: string;
  avatarTone?: SgDsLibraryAvatarTone;
  badgeStatus?: SgDsLibraryBadgeStatus;
  badgeText?: string;
  badgeVariant?: SgDsLibraryBadgeVariant;
  /** 잠금(유료) 콘텐츠면 썸네일에 잠금 오버레이를 표시한다. */
  locked?: boolean;
  lockIcon?: string;
  creatorBadge?: ReactNode;
  creatorBadgeStatus?: SgDsLibraryBadgeStatus;
  creatorBadgeVariant?: SgDsLibraryBadgeVariant;
  creatorName?: ReactNode;
  creatorVerified?: boolean;
  duration?: string;
  eyebrow?: ReactNode;
  eyebrowColor?: string;
  eyebrowColorToken?: string;
  eyebrowColorTokenCollection?: string;
  mediaSize?: SgDsLibraryMediaFrameSize;
  meta?: ReactNode;
  progress?: number | string;
  progressLabel?: string;
  showAction?: boolean;
  showAvatar?: boolean;
  showGrain?: boolean;
  showPlay?: boolean;
  size?: SgDsLibraryVideoListCardSize;
  thumbnailAspect?: SgDsLibraryMediaFrameAspect;
  thumbnailBackground?: string;
  thumbnailImageUrl?: string;
  thumbnailWidth?: number | string;
  title?: ReactNode;
  titleLines?: number | string;
  variant?: SgDsLibraryVideoListCardVariant;
};

export function SgDsLibraryVideoListCard(rawProps: SgDsLibraryVideoListCardProps) {
  const {
    actionIcon = 'ellipsis',
    actionLabel = 'More options',
    actionSize,
    onAvatarClick,
    onActionClick,
    avatarAlt = '',
    avatarInitials = '코다',
    avatarShape = 'circle',
    avatarSize,
    avatarSrc = '',
    avatarTone = 'brand',
    badgeStatus = 'warning',
    badgeText = '15+',
    badgeVariant = 'solid',
    locked = false,
    lockIcon = '',
    className = '',
    creatorBadge = '후원자 145k',
    creatorBadgeStatus = 'neutral',
    creatorBadgeVariant = 'flat',
    creatorName = '코다 / Koda',
    creatorVerified = true,
    duration = '17:02',
    eyebrow,
    eyebrowColor,
    eyebrowColorToken,
    eyebrowColorTokenCollection,
    mediaSize = 'md',
    meta = '92K 시청 · 1주 전',
    progress = 64,
    progressLabel = 'Media progress',
    showAction = true,
    showAvatar,
    showGrain = true,
    showPlay = false,
    size = 'lg',
    style,
    thumbnailAspect = '16/9',
    thumbnailBackground = 'linear-gradient(140deg, #0c1429, #4c1d95 50%, #be185d)',
    thumbnailImageUrl = '',
    thumbnailWidth = '50%',
    title = '새벽이 떠오를 때 — 2인 콜라보 단편',
    titleLines,
    variant = 'vertical',
    ...props
  } = resolveWorkbenchModeProps(rawProps);
  const resolvedShowAvatar = showAvatar ?? variant === 'vertical';
  const resolvedAvatarSize = avatarSize ?? (size === 'lg' ? 'md' : 'sm');
  const resolvedActionSize = actionSize ?? (size === 'lg' && variant === 'vertical' ? 'md' : 'sm');
  const hasAvatar = resolvedShowAvatar && Boolean(avatarSrc || avatarInitials);
  const hasCreatorLine = Boolean(creatorName || creatorBadge || (creatorVerified && creatorName));
  const thumbnailWidthCss = formatVideoListCardCssDimension(thumbnailWidth);
  const titleLineCount = formatVideoListCardLineCount(titleLines);
  const eyebrowCssColor = toVideoListCardCssColor(
    formatVideoListCardTokenReference(eyebrowColorTokenCollection, eyebrowColorToken) ?? eyebrowColor,
  );
  const rootStyle = {
    ...style,
    ...(thumbnailWidthCss ? { '--c-video-list-card-thumbnail-width': thumbnailWidthCss } : null),
    ...(titleLineCount ? { '--c-video-list-card-title-lines': titleLineCount } : null),
    ...(eyebrowCssColor ? { '--video-list-card-eyebrow-color': eyebrowCssColor } : null),
  } as CSSProperties;

  return (
    <article
      {...props}
      className={['sg-ds-library-scope', 'video-list-card', className].filter(Boolean).join(' ')}
      data-size={size}
      data-variant={variant}
      style={rootStyle}
    >
      <SgDsLibraryMediaFrame
        className="video-list-card-media"
        aspect={thumbnailAspect}
        background={thumbnailBackground}
        badgeStatus={badgeStatus}
        badgeText={badgeText}
        badgeVariant={badgeVariant}
        locked={locked}
        lockIcon={lockIcon}
        captionEyebrow=""
        captionTitle=""
        duration={duration}
        progress={progress}
        progressLabel={progressLabel}
        showGrain={showGrain}
        showPlay={showPlay}
        size={mediaSize}
        src={thumbnailImageUrl}
      />
      <div className="video-list-card-info">
        {hasAvatar ? (
          <SgDsLibraryAvatar
            alt={avatarAlt}
            className="video-list-card-avatar"
            initials={avatarInitials}
            shape={avatarShape}
            size={resolvedAvatarSize}
            src={avatarSrc}
            tone={avatarTone}
            onClick={onAvatarClick ? (e) => { e.stopPropagation(); onAvatarClick() } : undefined}
            style={onAvatarClick ? { cursor: 'pointer' } : undefined}
          />
        ) : null}
        <div className="video-list-card-body">
          {eyebrow ? <span className="video-list-card-eyebrow">{eyebrow}</span> : null}
          <span className="video-list-card-title">{title}</span>
          {hasCreatorLine ? (
            <span className="video-list-card-creator">
              {creatorName ? (
                <span className="video-list-card-creator-identity">
                  <span className="video-list-card-creator-name">{creatorName}</span>
                  {creatorVerified ? (
                  <SgDsLibraryIcon
                    className="video-list-card-verified"
                    color="var(--c-video-list-card-verified-color)"
                    name="badge-check"
                    size="12"
                    strokeWidth="2.5"
                    />
                  ) : null}
                </span>
              ) : null}
              {creatorBadge ? (
                <SgDsLibraryBadge
                  className="video-list-card-creator-badge"
                  size="sm"
                  status={creatorBadgeStatus}
                  variant={creatorBadgeVariant}
                >
                  {creatorBadge}
                </SgDsLibraryBadge>
              ) : null}
            </span>
          ) : null}
          {meta ? <span className="video-list-card-meta">{meta}</span> : null}
        </div>
        {showAction ? (
          <SgDsLibraryButton
            aria-label={actionLabel}
            className="video-list-card-action"
            iconOnly
            leadingIcon={actionIcon}
            size={resolvedActionSize}
            variant="ghost"
            onClick={onActionClick ? (e) => { e.stopPropagation(); onActionClick() } : undefined}
          >
            {actionLabel}
          </SgDsLibraryButton>
        ) : null}
      </div>
    </article>
  );
}

function formatVideoListCardCssDimension(value: number | string | undefined): string | null {
  if (typeof value === 'number') return Number.isFinite(value) ? `${value}px` : null;
  const trimmed = value?.trim();
  return trimmed || null;
}

function formatVideoListCardLineCount(value: number | string | undefined): string | null {
  if (typeof value === 'number') return Number.isFinite(value) && value > 0 ? String(Math.round(value)) : null;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? String(Math.round(parsed)) : null;
}

function formatVideoListCardTokenReference(collectionId: string | undefined, tokenId: string | undefined): string | null {
  const collection = collectionId?.trim();
  const token = tokenId?.trim();
  return collection && token ? `var(--ds-token-${collection}-${token})` : null;
}

function toVideoListCardCssColor(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed || undefined;
}

export default SgDsLibraryVideoListCard;
