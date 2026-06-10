import type { HTMLAttributes, ReactNode } from 'react';
import { SgDsLibraryAudioBlock } from './AudioBlock';
import { SgDsLibraryAudioFrame } from './AudioFrame';
import { SgDsLibraryAudioPlayer } from './AudioPlayer';
import { SgDsLibraryButton } from './Button';
import { SgDsLibraryChip } from './Chip';
import { SgDsLibraryCollabCredits } from './CollabCredits';
import { SgDsLibraryImageGrid } from './ImageGrid';
import { SgDsLibraryMediaFrame } from './MediaFrame';
import { SgDsLibraryToolbar } from './Toolbar';
import { SgDsLibraryTopComment } from './TopComment';
import { SgDsLibraryUserBlock } from './UserBlock';
import { resolveWorkbenchModeProps } from './_shared';

export type SgDsLibraryPostCardCardVariant = 'solid' | 'outline' | 'raised' | 'bare';
export type SgDsLibraryPostCardCardPadding = 'sm' | 'md' | 'lg';
export type SgDsLibraryPostCardProseVariant = 'default' | 'lead';
export type SgDsLibraryPostCardBodyVariant = 'none' | 'live-video' | 'video-collab' | 'music-release' | 'voice-clip' | 'image-update';
export type SgDsLibraryPostCardImageTileCount = '1' | '2' | '3' | '4' | '5' | '6';
export type SgDsLibraryPostCardAvatarTone =
  | 'brand'
  | 'teal'
  | 'amber'
  | 'purple'
  | 'coral'
  | 'blue'
  | 'pink'
  | 'green';

export type SgDsLibraryPostCardStat = {
  label: string;
  value: string | number;
  tone?: 'default' | 'brand';
  icon?: string;
  spacerBefore?: boolean;
};

export type SgDsLibraryPostCardProps = Omit<HTMLAttributes<HTMLElement>, 'children' | 'title'> & {
  userName?: string;
  userMeta?: string;
  userInitials?: string;
  userAvatarSrc?: string;
  avatarTone?: SgDsLibraryPostCardAvatarTone;
  verified?: boolean;
  title?: string;
  prose?: string;
  proseVariant?: SgDsLibraryPostCardProseVariant;
  imageUrl?: string;
  imageAspect?: '16/9' | '4/5' | '9/16' | '3/4' | '1/1';
  imageTile1Src?: string;
  imageTile2Src?: string;
  imageTile3Src?: string;
  imageTile4Src?: string;
  imageTile5Src?: string;
  imageTile6Src?: string;
  imageTileCount?: SgDsLibraryPostCardImageTileCount;
  audioArtAlt?: string;
  audioArtImageUrl?: string;
  stats?: SgDsLibraryPostCardStat[];
  kind?: string;
  bodyVariant?: SgDsLibraryPostCardBodyVariant;
  cardVariant?: SgDsLibraryPostCardCardVariant;
  cardPadding?: SgDsLibraryPostCardCardPadding;
  children?: ReactNode;
  bodySlot?: ReactNode;
  engagementSlot?: ReactNode;
  toolbarSlot?: ReactNode;
  /* 인터랙션 콜백 — 미전달 시 기존처럼 표시 전용 버튼으로 동작 */
  liked?: boolean;
  onLikeClick?: () => void;
  onCommentClick?: () => void;
  onShareClick?: () => void;
  onSupportClick?: () => void;
  onMoreClick?: () => void;
  onUserClick?: () => void;
};

export function SgDsLibraryPostCard(rawProps: SgDsLibraryPostCardProps) {
  const {
  audioArtAlt = 'Track cover art',
  audioArtImageUrl = '',
  avatarTone = 'brand',
  bodyVariant = 'none',
  bodySlot,
  cardPadding = 'lg',
  cardVariant = 'solid',
  children,
  className = '',
  engagementSlot,
  imageAspect = '16/9',
  imageTile1Src,
  imageTile2Src,
  imageTile3Src,
  imageTile4Src,
  imageTile5Src,
  imageTile6Src,
  imageTileCount = '4',
  imageUrl,
  kind,
  prose,
  proseVariant = 'default',
  stats,
  title,
  toolbarSlot,
  userAvatarSrc,
  userInitials = 'U',
  userMeta,
  userName = 'User',
  verified = false,
  liked = false,
  onLikeClick,
  onCommentClick,
  onShareClick,
  onSupportClick,
  onMoreClick,
  onUserClick,
  ...props
} = resolveWorkbenchModeProps(rawProps);
  const hasText = Boolean(title || prose);
  const resolvedBodySlot = bodySlot ?? renderPostCardBodyVariant(bodyVariant, {
    audioArtAlt,
    audioArtImageUrl,
    imageTile1Src,
    imageTile2Src,
    imageTile3Src,
    imageTile4Src,
    imageTile5Src,
    imageTile6Src,
    imageTileCount,
    imageUrl,
  });
  const resolvedEngagementSlot = engagementSlot ?? renderPostCardEngagementVariant(bodyVariant);
  const resolvedStats = stats ?? getPostCardStatsForBodyVariant(bodyVariant);
  const visibleMetrics = getPostCardVisibleMetrics(resolvedStats);
  const likeStat = findPostCardStat(resolvedStats, ['like', 'likes']);
  const commentStat = findPostCardStat(resolvedStats, ['comment', 'comments', 'reply', 'replies', 'chat']);
  const shareStat = findPostCardStat(resolvedStats, ['share', 'shares']);
  const hasEngagement = Boolean(resolvedEngagementSlot || toolbarSlot || visibleMetrics.length > 0 || likeStat || commentStat || shareStat);

  return (
    <article
      {...props}
      className={['sg-ds-library-scope', 'post-card', 'card', className].filter(Boolean).join(' ')}
      data-variant={cardVariant}
      data-padding={cardPadding}
      data-kind={kind || undefined}
    >
      <header className="post-card-head">
        <SgDsLibraryUserBlock
          avatarSize="md"
          avatarSrc={userAvatarSrc}
          avatarTone={avatarTone}
          initials={userInitials}
          meta={userMeta}
          name={userName}
          verified={verified}
          onClick={onUserClick}
          style={onUserClick ? { cursor: 'pointer' } : undefined}
          tailSlot={<SgDsLibraryButton aria-label="More" iconOnly leadingIcon="more-horizontal" size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); onMoreClick?.() }} />}
        />
      </header>

      {hasText ? (
        <div className="post-card-text">
          {title ? <h2 className="post-card-title">{title}</h2> : null}
          {prose ? (
            <p
              className="post-card-prose"
              data-variant={proseVariant === 'lead' ? 'lead' : undefined}
            >
              {prose}
            </p>
          ) : null}
        </div>
      ) : null}

      {imageUrl && !resolvedBodySlot ? (
        <SgDsLibraryMediaFrame
          aspect={imageAspect}
          captionEyebrow=""
          captionTitle=""
          imageUrl={imageUrl}
          showPlay={kind === 'live' || kind === 'video'}
        />
      ) : null}

      {resolvedBodySlot}

      {children}

      {hasEngagement ? (
        <footer className="post-card-engagement">
          {toolbarSlot ?? (
            <div className="post-card-engagement-default" data-has-metrics={visibleMetrics.length > 0 || undefined}>
              {visibleMetrics.length > 0 ? (
                <div className="post-card-metrics" aria-label="Post metrics">
                  {visibleMetrics.map((stat) => (
                    <span className="post-card-metric" data-tone={stat.tone === 'brand' ? 'brand' : undefined} key={stat.label}>
                      <strong>{stat.value}</strong>
                      {stat.label}
                    </span>
                  ))}
                </div>
              ) : null}
              <div className="post-card-action-row">
                <div className="post-card-actions" aria-label="Post actions">
                  <SgDsLibraryButton
                    className="post-card-action"
                    size="sm"
                    variant={liked ? 'soft' : 'ghost'}
                    leadingIcon="heart"
                    style={liked ? { color: 'var(--p-color-brand-500, #ff0055)' } : undefined}
                    aria-pressed={liked}
                    onClick={onLikeClick}
                  >
                    <span>Like</span>
                    {likeStat ? <span className="post-card-action-count">{likeStat.value}</span> : null}
                  </SgDsLibraryButton>
                  <SgDsLibraryButton className="post-card-action" size="sm" variant="ghost" leadingIcon="message-circle" onClick={onCommentClick}>
                    <span>Comment</span>
                    {commentStat ? <span className="post-card-action-count">{commentStat.value}</span> : null}
                  </SgDsLibraryButton>
                  <SgDsLibraryButton className="post-card-action" size="sm" variant="ghost" leadingIcon="share-2" onClick={onShareClick}>
                    <span>Share</span>
                    {shareStat ? <span className="post-card-action-count">{shareStat.value}</span> : null}
                  </SgDsLibraryButton>
                </div>
                <SgDsLibraryButton className="post-card-support-action" size="sm" leadingIcon="gem" onClick={onSupportClick}>
                  Support
                </SgDsLibraryButton>
              </div>
            </div>
          )}
          {resolvedEngagementSlot ? <div className="post-card-context">{resolvedEngagementSlot}</div> : null}
        </footer>
      ) : null}
    </article>
  );
}

function renderPostCardBodyVariant(
  variant: SgDsLibraryPostCardBodyVariant,
  options: {
    audioArtAlt: string;
    audioArtImageUrl: string;
    imageTile1Src?: string;
    imageTile2Src?: string;
    imageTile3Src?: string;
    imageTile4Src?: string;
    imageTile5Src?: string;
    imageTile6Src?: string;
    imageTileCount: SgDsLibraryPostCardImageTileCount;
    imageUrl?: string;
  },
): ReactNode {
  if (variant === 'live-video') {
    return (
      <SgDsLibraryMediaFrame
        aspect="16/9"
        background="linear-gradient(140deg, #0f172a 0%, #155e75 42%, #e11d48 100%)"
        captionEyebrow="ON AIR · 42m"
        captionTitle="NeoVoice duet session"
        live
        src={options.imageUrl}
        viewerCount="3,812 watching"
      />
    );
  }

  if (variant === 'video-collab') {
    return (
      <>
        <SgDsLibraryMediaFrame
          aspect="4/5"
          badgeText="AI video"
          background="linear-gradient(145deg, #172554 0%, #7c2d12 46%, #db2777 100%)"
          captionEyebrow="PREMIERE · 02:17"
          captionTitle="City Bloom / final motion cut"
          duration="2:17"
          src={options.imageUrl}
        />
        <SgDsLibraryCollabCredits
          items={[
            { avatarTone: 'purple', credit: '+4.2k crd', initials: 'MS', name: 'Mika Studio', role: 'DIR', verified: true },
            { avatarTone: 'brand', credit: '+2.8k crd', initials: 'HL', name: 'Hailey Luna', role: 'VOC', verified: true },
            { avatarTone: 'teal', credit: '+1.1k crd', initials: 'NV', name: 'NeoVoice', role: 'AI' },
          ]}
        />
      </>
    );
  }

  if (variant === 'music-release') {
    return (
      <SgDsLibraryAudioFrame
        eyebrow="MUSIC RELEASE"
        meta="Stem package · 4:02 · Remix open"
        title="garden_after_midnight.wav"
        variant="music"
      >
        <SgDsLibraryAudioBlock
          artAlt={options.audioArtAlt}
          artBackground="linear-gradient(145deg, #0f172a 0%, #0d9488 44%, #f59e0b 100%)"
          artImageUrl={options.audioArtImageUrl}
          artName="garden.m4a"
          endTime="4:02"
          playedBars={21}
          startTime="2:08"
        />
        <SgDsLibraryToolbar
          size="sm"
          wrap
          startSlot={(
            <>
              <SgDsLibraryChip icon="music" size="sm" tone="brand">Melodic pop</SgDsLibraryChip>
              <SgDsLibraryChip icon="mic-2" size="sm">Open vocal</SgDsLibraryChip>
              <SgDsLibraryChip icon="sparkles" size="sm">Remixable</SgDsLibraryChip>
            </>
          )}
        />
      </SgDsLibraryAudioFrame>
    );
  }

  if (variant === 'voice-clip') {
    return (
      <SgDsLibraryAudioFrame
        eyebrow="VOICE NOTE"
        meta="0:42 · Producer feedback"
        title="0:18 호흡 체크"
        variant="voice"
      >
        <SgDsLibraryAudioPlayer playedBars={9} size="sm" time="0:18 / 0:42" variant="compact" />
      </SgDsLibraryAudioFrame>
    );
  }

  if (variant === 'image-update') {
    return (
      <>
        <SgDsLibraryImageGrid
          aspect="4/3"
          cols="2"
          imageTile1Src={options.imageTile1Src || options.imageUrl}
          imageTile2Src={options.imageTile2Src}
          imageTile3Src={options.imageTile3Src}
          imageTile4Src={options.imageTile4Src}
          imageTile5Src={options.imageTile5Src}
          imageTile6Src={options.imageTile6Src}
          tileCount={options.imageTileCount}
        />
        <SgDsLibraryCollabCredits
          items={[
            { avatarTone: 'pink', credit: '+1.4k crd', initials: 'MK', name: 'Mika', role: 'ART', verified: true },
            { avatarTone: 'coral', credit: '+680 crd', initials: 'RN', name: 'Rina', role: '3D' },
          ]}
        />
      </>
    );
  }

  return null;
}

function renderPostCardEngagementVariant(variant: SgDsLibraryPostCardBodyVariant): ReactNode {
  if (variant === 'live-video') {
    return (
      <SgDsLibraryTopComment
        author="SOYU"
        avatarTone="pink"
        comment="브릿지에서 신스 톤 조금 더 밝게 가면 후렴이 확 열릴 것 같아요."
        initials="SY"
      />
    );
  }

  if (variant === 'video-collab') {
    return (
      <SgDsLibraryTopComment
        author="Koda"
        avatarTone="amber"
        comment="2절 컷 전환 타이밍이 좋아요. 리믹스용 스템도 열어두면 바로 붙겠습니다."
        initials="KO"
      />
    );
  }

  if (variant === 'voice-clip') {
    return (
      <SgDsLibraryTopComment
        author="Hailey"
        avatarTone="brand"
        comment="확인했어요. 마지막 음절 숨소리는 살리고 앞부분만 정리해서 다시 올릴게요."
        initials="HL"
      />
    );
  }

  if (variant === 'image-update') {
    return (
      <SgDsLibraryTopComment
        author="NeoVoice"
        avatarTone="teal"
        comment="2번 톤이 보컬 질감하고 가장 잘 맞습니다. 라이브 썸네일로도 명확해요."
        initials="NV"
      />
    );
  }

  return null;
}

function getPostCardStatsForBodyVariant(variant: SgDsLibraryPostCardBodyVariant): SgDsLibraryPostCardStat[] {
  if (variant === 'live-video') {
    return [
      { label: 'Viewers', value: '3.8k', icon: 'eye' },
      { label: 'Likes', value: '12.4k' },
      { label: 'Chat', value: 824 },
      { label: 'Supporters', value: '2,180', tone: 'brand', icon: 'gem', spacerBefore: true },
    ];
  }
  if (variant === 'music-release') {
    return [
      { label: 'Plays', value: '28.2k' },
      { label: 'Saves', value: '4.1k' },
      { label: 'Remixes', value: 128 },
      { label: 'Credits', value: '8,920', tone: 'brand', icon: 'gem', spacerBefore: true },
    ];
  }
  if (variant === 'video-collab') {
    return [
      { label: 'Views', value: '42.8k' },
      { label: 'Likes', value: '9.6k' },
      { label: 'Comments', value: 284 },
      { label: 'Credits', value: '12.4k', tone: 'brand', icon: 'gem', spacerBefore: true },
    ];
  }
  if (variant === 'voice-clip') {
    return [
      { label: 'Replies', value: 36 },
      { label: 'Saves', value: 412 },
      { label: 'Shares', value: 57 },
    ];
  }
  if (variant === 'image-update') {
    return [
      { label: 'Votes', value: '5.6k' },
      { label: 'Likes', value: '18.1k' },
      { label: 'Comments', value: 492 },
      { label: 'Supporters', value: '3,740', tone: 'brand', icon: 'gem', spacerBefore: true },
    ];
  }
  return [
    { label: 'Listens', value: '1.2k' },
    { label: 'Likes', value: 342 },
    { label: 'Comments', value: 18 },
    { label: 'Supporters', value: '1,840', tone: 'brand', icon: 'gem', spacerBefore: true },
  ];
}

function findPostCardStat(stats: SgDsLibraryPostCardStat[] | undefined, labels: string[]): SgDsLibraryPostCardStat | null {
  const labelSet = new Set(labels);
  return stats?.find((stat) => labelSet.has(normalizePostCardStatLabel(stat.label))) ?? null;
}

function getPostCardVisibleMetrics(stats: SgDsLibraryPostCardStat[] | undefined): SgDsLibraryPostCardStat[] {
  if (!stats || stats.length === 0) return [];
  const hiddenLabels = new Set(['like', 'likes', 'comment', 'comments', 'reply', 'replies', 'chat', 'share', 'shares']);
  const preferred = stats.filter((stat) => {
    const label = normalizePostCardStatLabel(stat.label);
    if (hiddenLabels.has(label)) return false;
    return stat.tone === 'brand' || ['view', 'views', 'viewer', 'viewers', 'listen', 'listens', 'play', 'plays', 'vote', 'votes'].includes(label);
  });
  return preferred.slice(0, 2);
}

function normalizePostCardStatLabel(label: string): string {
  return label.trim().toLowerCase().replace(/[^a-z0-9]+/g, '');
}

export default SgDsLibraryPostCard;
