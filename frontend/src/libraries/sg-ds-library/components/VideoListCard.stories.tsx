import { SgDsLibraryVideoListCard } from './VideoListCard';

type Args = Record<string, unknown>;

const ACTION_SIZES = ['sm', 'md', 'lg'] as const;
const AVATAR_SHAPES = ['circle', 'square', 'rounded'] as const;
const AVATAR_SIZES = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;
const AVATAR_TONES = ['neutral', 'brand', 'teal', 'amber', 'purple', 'coral', 'blue', 'pink', 'green'] as const;
const BADGE_STATUSES = ['info', 'success', 'warning', 'danger', 'neutral'] as const;
const BADGE_VARIANTS = ['solid', 'subtle', 'flat'] as const;
const CARD_SIZES = ['lg', 'sm'] as const;
const MEDIA_SIZES = ['md', 'sm'] as const;
const THUMBNAIL_ASPECTS = ['16/9', '1', '1/1', '4/3', '21/9', '4/5', '9/16', '3/4'] as const;
const VARIANTS = ['vertical', 'horizontal'] as const;

function ordered<T extends Record<string, unknown>>(order: number, config: T): T & { order: number } {
  return { ...config, order };
}

function asText(value: unknown, fallback: string): string {
  return typeof value === 'string' ? value : fallback;
}

function asOptionalNumberText(value: unknown): string {
  if (typeof value === 'number' && Number.isFinite(value)) return String(value);
  return asText(value, '');
}

function asBoolean(value: unknown, fallback = false): boolean {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    if (value === 'true') return true;
    if (value === 'false') return false;
  }
  return fallback;
}

function asOption<T extends string>(value: unknown, options: readonly T[], fallback: T): T {
  return typeof value === 'string' && options.includes(value as T) ? (value as T) : fallback;
}

const VIDEO_LIST_CARD_ARG_TYPES = {
  title: ordered(30, { control: 'text' }),
  creatorName: ordered(50, { name: 'Creator name', control: 'text' }),
  meta: ordered(100, { control: 'text' }),
  eyebrow: ordered(45, { control: 'text' }),
  duration: ordered(150, { control: 'text' }),
  progress: ordered(160, { control: 'text' }),
  progressLabel: ordered(170, { name: 'Progress label', control: 'text' }),
  actionLabel: ordered(320, { name: 'Action label', control: 'text' }),
  actionSize: ordered(330, { name: 'Action size', control: 'select', options: ACTION_SIZES }),
  thumbnailImageUrl: ordered(110, { name: 'Thumbnail image URL', control: 'text' }),
  thumbnailAspect: ordered(130, { control: 'select', options: THUMBNAIL_ASPECTS }),
  mediaSize: ordered(135, { name: 'Media layout size', control: 'select', options: MEDIA_SIZES }),
  avatarSrc: ordered(230, { name: 'Avatar src', control: 'text' }),
  avatarAlt: ordered(240, { name: 'Avatar alt', control: 'text' }),
  avatarInitials: ordered(250, { name: 'Avatar initials', control: 'text' }),
  creatorBadge: ordered(70, { name: 'Creator badge', control: 'text' }),
  creatorBadgeStatus: ordered(80, { name: 'Creator badge status', control: 'select', options: BADGE_STATUSES }),
  creatorBadgeVariant: ordered(90, { name: 'Creator badge variant', control: 'select', options: BADGE_VARIANTS }),
  badgeText: ordered(180, { name: 'Media badge text', control: 'text' }),
  badgeVariant: ordered(190, { name: 'Media badge variant', control: 'select', options: BADGE_VARIANTS }),
  badgeStatus: ordered(200, { name: 'Media badge status', control: 'select', options: BADGE_STATUSES }),
  creatorVerified: ordered(60, { name: 'Creator verified', control: 'boolean' }),
  showPlay: ordered(210, { control: 'boolean' }),
  showAvatar: ordered(220, { name: 'Show avatar', control: 'boolean' }),
  showGrain: ordered(215, { control: 'boolean' }),
  variant: ordered(10, { control: 'select', options: VARIANTS }),
  avatarTone: ordered(260, { name: 'Avatar tone', control: 'select', options: AVATAR_TONES }),
  titleLines: ordered(40, { control: 'number' }),
  size: ordered(20, { control: 'select', options: CARD_SIZES }),
  avatarSize: ordered(270, { name: 'Avatar size', control: 'select', options: AVATAR_SIZES }),
  avatarShape: ordered(280, { name: 'Avatar shape', control: 'select', options: AVATAR_SHAPES }),
  thumbnailWidth: ordered(140, { control: 'text' }),
  thumbnailBackground: ordered(120, { control: 'text' }),
  actionIcon: ordered(310, { name: 'Action icon', control: 'icon' }),
  eyebrowColor: ordered(46, { name: 'Eyebrow color', control: 'text' }),
  showAction: ordered(300, { name: 'Show action', control: 'boolean' }),
};

const SHARED_ARGS = {
  title: '새벽이 떠오를 때 — 2인 콜라보 단편',
  creatorName: '코다 / Koda',
  meta: '92K 시청 · 1주 전',
  eyebrow: '',
  duration: '17:02',
  progress: '64',
  progressLabel: 'Media progress',
  actionLabel: 'More options',
  actionSize: 'md',
  thumbnailImageUrl: '',
  thumbnailAspect: '16/9',
  mediaSize: 'md',
  avatarSrc: '',
  avatarAlt: '코다 / Koda',
  avatarInitials: '코다',
  creatorBadge: '후원자 145k',
  creatorBadgeStatus: 'neutral',
  creatorBadgeVariant: 'flat',
  badgeText: '15+',
  badgeVariant: 'solid',
  badgeStatus: 'warning',
  creatorVerified: true,
  showPlay: false,
  showAvatar: true,
  showGrain: true,
  variant: 'vertical',
  avatarTone: 'brand',
  titleLines: 2,
  size: 'lg',
  avatarSize: 'md',
  avatarShape: 'circle',
  thumbnailWidth: '100%',
  thumbnailBackground: 'linear-gradient(140deg, #0c1429, #4c1d95 50%, #be185d)',
  actionIcon: 'ellipsis',
  eyebrowColor: '',
  showAction: true,
};

export default {
  title: 'SgDsLibrary/VideoListCard',
  component: SgDsLibraryVideoListCard,
};

export const VerticalLg = {
  args: {
    ...SHARED_ARGS,
    size: 'lg',
    variant: 'vertical',
    avatarSize: 'md',
    actionSize: 'md',
    showAvatar: true,
    thumbnailWidth: '100%',
    titleLines: 2,
  },
  argTypes: VIDEO_LIST_CARD_ARG_TYPES,
  sourceInsert: {
    props: {
      ...SHARED_ARGS,
      size: 'lg',
      variant: 'vertical',
      avatarSize: 'md',
      actionSize: 'md',
      showAvatar: true,
      thumbnailWidth: '100%',
      titleLines: 2,
    },
  },
  render: renderVideoListCard,
};

export const VerticalSm = {
  args: {
    ...SHARED_ARGS,
    size: 'sm',
    variant: 'vertical',
    avatarSize: 'sm',
    actionSize: 'sm',
    mediaSize: 'sm',
    showAvatar: true,
    thumbnailWidth: '100%',
    titleLines: 2,
  },
  argTypes: VIDEO_LIST_CARD_ARG_TYPES,
  sourceInsert: {
    props: {
      ...SHARED_ARGS,
      size: 'sm',
      variant: 'vertical',
      avatarSize: 'sm',
      actionSize: 'sm',
      mediaSize: 'sm',
      showAvatar: true,
      thumbnailWidth: '100%',
      titleLines: 2,
    },
  },
  render: renderVideoListCard,
};

export const HorizontalLg = {
  args: {
    ...SHARED_ARGS,
    size: 'lg',
    variant: 'horizontal',
    eyebrow: 'EDITOR PICK',
    avatarSize: 'sm',
    actionSize: 'sm',
    showAvatar: false,
    thumbnailWidth: '50%',
    titleLines: 3,
  },
  argTypes: VIDEO_LIST_CARD_ARG_TYPES,
  sourceInsert: {
    props: {
      ...SHARED_ARGS,
      size: 'lg',
      variant: 'horizontal',
      eyebrow: 'EDITOR PICK',
      avatarSize: 'sm',
      actionSize: 'sm',
      showAvatar: false,
      thumbnailWidth: '50%',
      titleLines: 3,
    },
  },
  render: renderVideoListCard,
};

export const HorizontalSm = {
  args: {
    ...SHARED_ARGS,
    size: 'sm',
    variant: 'horizontal',
    avatarSize: 'sm',
    actionSize: 'sm',
    showAvatar: false,
    thumbnailWidth: '50%',
    titleLines: 3,
  },
  argTypes: VIDEO_LIST_CARD_ARG_TYPES,
  sourceInsert: {
    props: {
      ...SHARED_ARGS,
      size: 'sm',
      variant: 'horizontal',
      avatarSize: 'sm',
      actionSize: 'sm',
      showAvatar: false,
      thumbnailWidth: '50%',
      titleLines: 3,
    },
  },
  render: renderVideoListCard,
};

function renderVideoListCard(args: Args) {
  return (
    <SgDsLibraryVideoListCard
      actionIcon={asText(args.actionIcon, 'ellipsis')}
      actionLabel={asText(args.actionLabel, 'More options')}
      actionSize={asOption(args.actionSize, ACTION_SIZES, 'sm')}
      avatarAlt={asText(args.avatarAlt, '')}
      avatarInitials={asText(args.avatarInitials, '')}
      avatarShape={asOption(args.avatarShape, AVATAR_SHAPES, 'circle')}
      avatarSize={asOption(args.avatarSize, AVATAR_SIZES, 'sm')}
      avatarSrc={asText(args.avatarSrc, '')}
      avatarTone={asOption(args.avatarTone, AVATAR_TONES, 'brand')}
      badgeStatus={asOption(args.badgeStatus, BADGE_STATUSES, 'warning')}
      badgeText={asText(args.badgeText, '')}
      badgeVariant={asOption(args.badgeVariant, BADGE_VARIANTS, 'solid')}
      creatorBadge={asText(args.creatorBadge, '')}
      creatorBadgeStatus={asOption(args.creatorBadgeStatus, BADGE_STATUSES, 'neutral')}
      creatorBadgeVariant={asOption(args.creatorBadgeVariant, BADGE_VARIANTS, 'flat')}
      creatorName={asText(args.creatorName, '')}
      creatorVerified={asBoolean(args.creatorVerified, true)}
      duration={asText(args.duration, '')}
      eyebrow={asText(args.eyebrow, '')}
      eyebrowColor={asText(args.eyebrowColor, '')}
      meta={asText(args.meta, '')}
      mediaSize={asOption(args.mediaSize, MEDIA_SIZES, 'md')}
      progress={asText(args.progress, '')}
      progressLabel={asText(args.progressLabel, '')}
      showAction={asBoolean(args.showAction, true)}
      showAvatar={asBoolean(args.showAvatar, false)}
      showGrain={asBoolean(args.showGrain, true)}
      showPlay={asBoolean(args.showPlay, false)}
      size={asOption(args.size, CARD_SIZES, 'lg')}
      thumbnailAspect={asOption(args.thumbnailAspect, THUMBNAIL_ASPECTS, '16/9')}
      thumbnailBackground={asText(args.thumbnailBackground, '')}
      thumbnailImageUrl={asText(args.thumbnailImageUrl, '')}
      thumbnailWidth={asText(args.thumbnailWidth, '50%')}
      title={asText(args.title, 'Video title')}
      titleLines={asOptionalNumberText(args.titleLines)}
      variant={asOption(args.variant, VARIANTS, 'vertical')}
    />
  );
}
