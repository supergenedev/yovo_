import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import {
  SgDsLibraryAvatar,
  type SgDsLibraryAvatarShape,
  type SgDsLibraryAvatarSize,
  type SgDsLibraryAvatarTone,
} from './Avatar';
import { SgDsLibraryButton } from './Button';
import { SgDsLibraryIcon } from './Icon';
import { SgDsLibraryMedia } from './Media';
import { SgDsLibraryText } from './Text';
import { resolveWorkbenchModeProps } from './_shared';

export type SgDsLibraryCreatorSpotlightProps = HTMLAttributes<HTMLElement> & {
  avatarAlt?: string;
  avatarInitials?: string;
  avatarShape?: SgDsLibraryAvatarShape;
  avatarSize?: SgDsLibraryAvatarSize;
  avatarSrc?: string;
  avatarTone?: SgDsLibraryAvatarTone;
  eyebrow?: ReactNode;
  /** Background media revealed on the trailing edge of the banner; it is tinted
   *  with the brand surface and faded toward the content so text stays legible. */
  mediaSrc?: string;
  /** Trailing media width as a CSS length (e.g. "60%", "320px"). */
  mediaWidth?: number | string;
  meta?: ReactNode;
  name?: ReactNode;
  primaryActionIcon?: string;
  primaryActionLabel?: string;
  secondaryActionIcon?: string;
  secondaryActionLabel?: string;
  stat1?: ReactNode;
  stat2?: ReactNode;
  stat3?: ReactNode;
  verified?: boolean;
};

export function SgDsLibraryCreatorSpotlight(rawProps: SgDsLibraryCreatorSpotlightProps) {
  const {
    avatarAlt = '',
    avatarInitials = 'M',
    avatarShape = 'circle',
    avatarSize = '2xl',
    avatarSrc = '',
    avatarTone = 'coral',
    className = '',
    eyebrow = '스포트라이트',
    mediaSrc = '',
    mediaWidth = '60%',
    meta = '단편영화 전문 스튜디오',
    name = 'MIKO Studio',
    primaryActionIcon = 'lock-open',
    primaryActionLabel = '구독 · ⓒ 3,900/월',
    secondaryActionIcon = 'plus',
    secondaryActionLabel = '팔로우',
    stat1 = '219K 팔로워',
    stat2 = '92 작품',
    stat3 = '+18.2% 지난 30일',
    style,
    verified = true,
    ...props
  } = resolveWorkbenchModeProps(rawProps);

  const mediaWidthCss = formatCreatorSpotlightCssDimension(mediaWidth);
  const hasMedia = Boolean(mediaSrc);
  const hasStats = Boolean(stat1 || stat2 || stat3);
  const hasActions = Boolean(primaryActionLabel || secondaryActionLabel);
  const rootStyle = {
    ...style,
    ...(mediaWidthCss ? { '--c-creator-spotlight-media-width': mediaWidthCss } : null),
  } as CSSProperties;

  return (
    <section
      {...props}
      className={['sg-ds-library-scope', 'creator-spotlight', className].filter(Boolean).join(' ')}
      data-has-media={hasMedia ? 'true' : undefined}
      style={rootStyle}
    >
      {hasMedia ? (
        <SgDsLibraryMedia
          aria-hidden="true"
          aspectRatio="16 / 9"
          backgroundPosition="right"
          className="creator-spotlight-media"
          fit="cover"
          overlay="accent"
          overlayColor="var(--s-brand-bg)"
          overlayMask="fade"
          overlayMaskAngle={100}
          overlayMaskEnd={60}
          overlayMaskStart={5}
          rounded="md"
          src={mediaSrc}
        />
      ) : null}
      <div className="creator-spotlight-content">
        {eyebrow ? (
          <SgDsLibraryText as="p" className="creator-spotlight-eyebrow" tone="inverse" variant="body-sm">
            {eyebrow}
          </SgDsLibraryText>
        ) : null}
        <SgDsLibraryAvatar
          alt={avatarAlt}
          className="creator-spotlight-avatar"
          initials={avatarInitials}
          shape={avatarShape}
          size={avatarSize}
          src={avatarSrc}
          tone={avatarTone}
        />
        <div className="creator-spotlight-identity">
          <div className="creator-spotlight-name-row">
            <SgDsLibraryText as="h2" className="creator-spotlight-name" tone="inverse" variant="heading-2" weight="bold">
              {name}
            </SgDsLibraryText>
            {verified ? (
              <SgDsLibraryIcon
                className="creator-spotlight-verified"
                color="var(--s-text-inverse)"
                name="badge-check"
                size="22px"
              />
            ) : null}
          </div>
          {meta ? (
            <SgDsLibraryText as="p" className="creator-spotlight-meta" tone="inverse" variant="body">
              {meta}
            </SgDsLibraryText>
          ) : null}
        </div>
        {hasStats ? (
          <div className="creator-spotlight-stats">
            {stat1 ? (
              <SgDsLibraryText as="span" className="creator-spotlight-stat" tone="inverse" variant="body-sm" weight="semibold">
                {stat1}
              </SgDsLibraryText>
            ) : null}
            {stat2 ? (
              <SgDsLibraryText as="span" className="creator-spotlight-stat" tone="inverse" variant="body-sm" weight="semibold">
                {stat2}
              </SgDsLibraryText>
            ) : null}
            {stat3 ? (
              <SgDsLibraryText as="span" className="creator-spotlight-stat" tone="inverse" variant="body-sm" weight="semibold">
                {stat3}
              </SgDsLibraryText>
            ) : null}
          </div>
        ) : null}
        {hasActions ? (
          <div className="creator-spotlight-actions">
            {primaryActionLabel ? (
              <SgDsLibraryButton leadingIcon={primaryActionIcon || undefined} shape="pill" size="md" variant="secondary">
                {primaryActionLabel}
              </SgDsLibraryButton>
            ) : null}
            {secondaryActionLabel ? (
              <SgDsLibraryButton leadingIcon={secondaryActionIcon || undefined} shape="pill" size="md" variant="secondary">
                {secondaryActionLabel}
              </SgDsLibraryButton>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}

function formatCreatorSpotlightCssDimension(value: number | string | undefined): string | null {
  if (typeof value === 'number') return Number.isFinite(value) ? `${value}px` : null;
  const trimmed = value?.trim();
  return trimmed || null;
}

export default SgDsLibraryCreatorSpotlight;
