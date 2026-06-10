import { SgDsLibraryPostListItem } from './PostListItem';

type Args = Record<string, unknown>;

const AVATAR_SHAPES = ['circle', 'square', 'rounded'] as const;
const AVATAR_SIZES = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;
const AVATAR_TONES = ['neutral', 'brand', 'teal', 'amber', 'purple', 'coral', 'blue', 'pink', 'green'] as const;
const BADGE_STATUSES = ['info', 'success', 'warning', 'danger', 'neutral'] as const;
const BADGE_VARIANTS = ['solid', 'subtle', 'flat'] as const;
const BUTTON_SHAPES = ['default', 'pill'] as const;
const BUTTON_SIZES = ['sm', 'md', 'lg'] as const;
const BUTTON_VARIANTS = ['primary', 'secondary', 'outline', 'soft', 'ghost', 'danger'] as const;
const MEDIA_ASPECTS = ['16/9', '1', '1/1', '4/3', '21/9', '4/5', '9/16', '3/4'] as const;
const MEDIA_SIZES = ['md', 'sm'] as const;
const SIZES = ['sm', 'lg'] as const;
const VARIANTS = ['horizontal', 'vertical'] as const;

function ordered<T extends Record<string, unknown>>(order: number, config: T): T & { order: number } {
  return { ...config, order };
}

function asText(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}

function asBoolean(value: unknown, fallback = false): boolean {
  if (typeof value === 'boolean') return value;
  if (value === 'true') return true;
  if (value === 'false') return false;
  return fallback;
}

function asOption<T extends string>(value: unknown, options: readonly T[], fallback: T): T {
  return typeof value === 'string' && options.includes(value as T) ? (value as T) : fallback;
}

function asProgress(value: unknown): number | string | undefined {
  if (value === '' || value === undefined) return undefined;
  if (typeof value === 'number' || typeof value === 'string') return value;
  return undefined;
}

const POST_LIST_ITEM_ARG_TYPES = {
  title: ordered(30, { control: 'text' }),
  initials: ordered(530, { name: 'Avatar initials', control: 'text' }),
  meta: ordered(40, { control: 'text' }),
  eyebrow: ordered(60, { control: 'text' }),
  avatarSrc: ordered(510, { name: 'Avatar src', control: 'text' }),
  avatarAlt: ordered(520, { name: 'Avatar alt', control: 'text' }),
  showAvatar: ordered(500, { name: 'Show avatar', control: 'boolean' }),
  variant: ordered(10, { control: 'select', options: VARIANTS }),
  avatarTone: ordered(540, { name: 'Avatar tone', control: 'select', options: AVATAR_TONES }),
  size: ordered(20, { control: 'select', options: SIZES }),
  avatarSize: ordered(550, { name: 'Avatar size', control: 'select', options: AVATAR_SIZES }),
  avatarShape: ordered(560, { name: 'Avatar shape', control: 'select', options: AVATAR_SHAPES }),
  caption: ordered(50, { control: 'text' }),
  eyebrowColor: ordered(70, { name: 'Eyebrow color', control: 'text' }),
  mediaAspect: ordered(180, { name: 'Aspect', control: 'select', options: MEDIA_ASPECTS }),
  mediaBackground: ordered(370, { name: 'Fallback background', control: 'text' }),
  mediaBackgroundToken: ordered(380, { name: 'Background token', control: 'text' }),
  mediaBackgroundTokenCollection: ordered(390, { name: 'Background token collection', control: 'text' }),
  mediaBadgeStatus: ordered(240, { name: 'Badge Status', control: 'select', options: BADGE_STATUSES }),
  mediaBadgeText: ordered(220, { name: 'Badge Text', control: 'text' }),
  mediaBadgeVariant: ordered(230, { name: 'Badge Variant', control: 'select', options: BADGE_VARIANTS }),
  mediaCaptionEyebrow: ordered(110, { name: 'Caption Eyebrow', control: 'text' }),
  mediaCaptionTitle: ordered(120, { name: 'Caption Title', control: 'text' }),
  mediaDuration: ordered(130, { name: 'Duration', control: 'text' }),
  mediaImageUrl: ordered(210, { name: 'Image URL fallback', control: 'text' }),
  mediaLive: ordered(340, { name: 'Live', control: 'boolean' }),
  mediaLiveLabel: ordered(170, { name: 'Live Label', control: 'text' }),
  mediaLockActionIcon: ordered(300, { name: 'Lock action icon', control: 'icon' }),
  mediaLockActionLabel: ordered(290, { name: 'Lock Action Label', control: 'text' }),
  mediaLockActionShape: ordered(330, { name: 'Lock action shape', control: 'select', options: BUTTON_SHAPES }),
  mediaLockActionSize: ordered(320, { name: 'Lock action size', control: 'select', options: BUTTON_SIZES }),
  mediaLockActionVariant: ordered(310, { name: 'Lock action variant', control: 'select', options: BUTTON_VARIANTS }),
  mediaLocked: ordered(250, { name: 'Locked', control: 'boolean' }),
  mediaLockIcon: ordered(260, { name: 'Lock icon', control: 'icon' }),
  mediaLockMessage: ordered(280, { name: 'Lock Message', control: 'text' }),
  mediaLockTitle: ordered(270, { name: 'Lock Title', control: 'text' }),
  mediaPlayLabel: ordered(160, { name: 'Play Label', control: 'text' }),
  mediaProgress: ordered(140, { name: 'Progress', control: { max: 100, min: 0, step: 1, type: 'range' } }),
  mediaProgressLabel: ordered(150, { name: 'Progress Label', control: 'text' }),
  mediaShowGrain: ordered(360, { name: 'Show Grain', control: 'boolean' }),
  mediaShowPlay: ordered(350, { name: 'Show Play', control: 'boolean' }),
  mediaSize: ordered(190, { name: 'Media size', control: 'select', options: MEDIA_SIZES }),
  mediaSrc: ordered(200, { name: 'Image source', control: 'text' }),
  mediaViewerCount: ordered(100, { name: 'Viewer Count', control: 'text' }),
  mediaWidth: ordered(400, { name: 'Media width', control: 'text' }),
};

const SHARED_ARGS = {
  title: '새벽이 떠오를 때 — 2인 콜라보 단편',
  initials: 'KO',
  meta: '코다 / Koda · 1주 전',
  eyebrow: 'EP.02 · 콜라보 시리즈',
  avatarSrc: '',
  avatarAlt: '코다 / Koda',
  showAvatar: true,
  variant: 'horizontal',
  avatarTone: 'amber',
  size: 'sm',
  avatarSize: 'xs',
  avatarShape: 'circle',
  caption: '92K 시청 · 1,124 후원자',
  eyebrowColor: '',
  mediaAspect: '16/9',
  mediaBackground: 'linear-gradient(140deg, #0c1429 0%, #4c1d95 50%, #be185d 100%)',
  mediaBackgroundToken: '',
  mediaBackgroundTokenCollection: '',
  mediaBadgeStatus: 'info',
  mediaBadgeText: '',
  mediaBadgeVariant: 'subtle',
  mediaCaptionEyebrow: '',
  mediaCaptionTitle: '',
  mediaDuration: '12:48',
  mediaImageUrl: '',
  mediaLive: false,
  mediaLiveLabel: 'LIVE',
  mediaLockActionIcon: '',
  mediaLockActionLabel: '',
  mediaLockActionShape: 'pill',
  mediaLockActionSize: 'sm',
  mediaLockActionVariant: 'primary',
  mediaLocked: false,
  mediaLockIcon: 'lock',
  mediaLockMessage: '',
  mediaLockTitle: '',
  mediaPlayLabel: 'Play',
  mediaProgress: '',
  mediaProgressLabel: 'Media progress',
  mediaShowGrain: true,
  mediaShowPlay: true,
  mediaSize: 'sm',
  mediaSrc: '',
  mediaViewerCount: '',
  mediaWidth: '128px',
};

export default {
  title: 'SgDsLibrary/PostListItem',
  component: SgDsLibraryPostListItem,
};

export const Default = {
  args: SHARED_ARGS,
  argTypes: POST_LIST_ITEM_ARG_TYPES,
  sourceInsert: { props: SHARED_ARGS },
  render: renderPostListItem,
};

export const Vertical = {
  args: {
    ...SHARED_ARGS,
    title: '달이 지는 도시 — 라이브 스케치',
    meta: 'Hailey Luna · 방금 전',
    caption: '멤버십 선공개 · 14.8K 재생',
    eyebrow: 'LIVE CUT',
    eyebrowColor: 'var(--s-brand-text)',
    mediaDuration: '17:02',
    mediaBadgeText: 'NEW',
    mediaBadgeVariant: 'solid',
    mediaBadgeStatus: 'info',
    mediaBackground: 'linear-gradient(140deg, #0f766e 0%, #2563eb 48%, #f97316 100%)',
    mediaSize: 'md',
    mediaWidth: '100%',
    initials: 'HL',
    avatarAlt: 'Hailey Luna',
    avatarTone: 'brand',
    avatarSize: 'sm',
    variant: 'vertical',
  },
  argTypes: POST_LIST_ITEM_ARG_TYPES,
  sourceInsert: {
    props: {
      ...SHARED_ARGS,
      title: '달이 지는 도시 — 라이브 스케치',
      meta: 'Hailey Luna · 방금 전',
      caption: '멤버십 선공개 · 14.8K 재생',
      eyebrow: 'LIVE CUT',
      eyebrowColor: 'var(--s-brand-text)',
      mediaDuration: '17:02',
      mediaBadgeText: 'NEW',
      mediaBadgeVariant: 'solid',
      mediaBadgeStatus: 'info',
      mediaBackground: 'linear-gradient(140deg, #0f766e 0%, #2563eb 48%, #f97316 100%)',
      mediaSize: 'md',
      mediaWidth: '100%',
      initials: 'HL',
      avatarAlt: 'Hailey Luna',
      avatarTone: 'brand',
      avatarSize: 'sm',
      variant: 'vertical',
    },
  },
  render: renderPostListItem,
};

export const Large = {
  args: {
    ...SHARED_ARGS,
    size: 'lg',
    title: '한여름의 끝 — 사라진 약속',
    meta: 'MIKO Studio · 284K views',
    caption: '12.4K 후원 · 2일 전',
    eyebrow: 'EDITOR PICK',
    mediaDuration: '12:34',
    mediaBadgeText: '15+',
    mediaBadgeVariant: 'solid',
    mediaBadgeStatus: 'warning',
    mediaBackground: 'linear-gradient(135deg, #ff8e54, #7c2d12)',
    mediaSize: 'md',
    mediaWidth: '156px',
    initials: 'MI',
    avatarAlt: 'MIKO Studio',
    avatarTone: 'coral',
    avatarSize: 'sm',
    variant: 'horizontal',
  },
  argTypes: POST_LIST_ITEM_ARG_TYPES,
  sourceInsert: {
    props: {
      ...SHARED_ARGS,
      size: 'lg',
      title: '한여름의 끝 — 사라진 약속',
      meta: 'MIKO Studio · 284K views',
      caption: '12.4K 후원 · 2일 전',
      eyebrow: 'EDITOR PICK',
      mediaDuration: '12:34',
      mediaBadgeText: '15+',
      mediaBadgeVariant: 'solid',
      mediaBadgeStatus: 'warning',
      mediaBackground: 'linear-gradient(135deg, #ff8e54, #7c2d12)',
      mediaSize: 'md',
      mediaWidth: '156px',
      initials: 'MI',
      avatarAlt: 'MIKO Studio',
      avatarTone: 'coral',
      avatarSize: 'sm',
      variant: 'horizontal',
    },
  },
  render: renderPostListItem,
};

export const LockedLive = {
  args: {
    ...SHARED_ARGS,
    title: '구독자 전용 라이브 — 다시보기',
    meta: 'MIKO Studio · 방금 전',
    caption: '1,456 watching · 멤버십 전용',
    eyebrow: 'LIVE',
    mediaViewerCount: '1,456 watching',
    mediaDuration: '17:01',
    mediaProgress: 48,
    mediaLiveLabel: 'LIVE',
    mediaSrc: 'https://i.pinimg.com/1200x/8e/03/85/8e0385f19e37344b55bdb999a8e655e3.jpg',
    mediaBadgeText: 'AI video',
    mediaBadgeVariant: 'solid',
    mediaBadgeStatus: 'danger',
    mediaLocked: true,
    mediaLockIcon: 'ticket-check',
    mediaLockTitle: '구독자 전용 라이브',
    mediaLockMessage: '구독자만을 위한 특별한 라이브 방송',
    mediaLockActionLabel: '1,000 CRD',
    mediaLockActionIcon: 'coins',
    mediaLockActionVariant: 'primary',
    mediaLockActionSize: 'lg',
    mediaLockActionShape: 'default',
    mediaLive: true,
    mediaShowPlay: false,
    mediaBackground: 'linear-gradient(135deg, #ff8e54, #e85d2a)',
    mediaSize: 'sm',
    avatarTone: 'brand',
  },
  argTypes: POST_LIST_ITEM_ARG_TYPES,
  sourceInsert: {
    props: {
      ...SHARED_ARGS,
      title: '구독자 전용 라이브 — 다시보기',
      meta: 'MIKO Studio · 방금 전',
      caption: '1,456 watching · 멤버십 전용',
      eyebrow: 'LIVE',
      mediaViewerCount: '1,456 watching',
      mediaDuration: '17:01',
      mediaProgress: 48,
      mediaLiveLabel: 'LIVE',
      mediaSrc: 'https://i.pinimg.com/1200x/8e/03/85/8e0385f19e37344b55bdb999a8e655e3.jpg',
      mediaBadgeText: 'AI video',
      mediaBadgeVariant: 'solid',
      mediaBadgeStatus: 'danger',
      mediaLocked: true,
      mediaLockIcon: 'ticket-check',
      mediaLockTitle: '구독자 전용 라이브',
      mediaLockMessage: '구독자만을 위한 특별한 라이브 방송',
      mediaLockActionLabel: '1,000 CRD',
      mediaLockActionIcon: 'coins',
      mediaLockActionVariant: 'primary',
      mediaLockActionSize: 'lg',
      mediaLockActionShape: 'default',
      mediaLive: true,
      mediaShowPlay: false,
      mediaBackground: 'linear-gradient(135deg, #ff8e54, #e85d2a)',
      mediaSize: 'sm',
      avatarTone: 'brand',
    },
  },
  render: renderPostListItem,
};

function renderPostListItem(args: Args) {
  return (
    <SgDsLibraryPostListItem
      avatarAlt={asText(args.avatarAlt)}
      avatarShape={asOption(args.avatarShape, AVATAR_SHAPES, 'circle')}
      avatarSize={asOption(args.avatarSize, AVATAR_SIZES, 'xs')}
      avatarSrc={asText(args.avatarSrc)}
      avatarTone={asOption(args.avatarTone, AVATAR_TONES, 'neutral')}
      caption={asText(args.caption)}
      eyebrow={asText(args.eyebrow)}
      eyebrowColor={asText(args.eyebrowColor)}
      initials={asText(args.initials)}
      mediaAspect={asOption(args.mediaAspect, MEDIA_ASPECTS, '16/9')}
      mediaBackground={asText(args.mediaBackground)}
      mediaBackgroundToken={asText(args.mediaBackgroundToken)}
      mediaBackgroundTokenCollection={asText(args.mediaBackgroundTokenCollection)}
      mediaBadgeStatus={asOption(args.mediaBadgeStatus, BADGE_STATUSES, 'info')}
      mediaBadgeText={asText(args.mediaBadgeText)}
      mediaBadgeVariant={asOption(args.mediaBadgeVariant, BADGE_VARIANTS, 'subtle')}
      mediaCaptionEyebrow={asText(args.mediaCaptionEyebrow)}
      mediaCaptionTitle={asText(args.mediaCaptionTitle)}
      mediaDuration={asText(args.mediaDuration)}
      mediaImageUrl={asText(args.mediaImageUrl)}
      mediaLive={asBoolean(args.mediaLive)}
      mediaLiveLabel={asText(args.mediaLiveLabel)}
      mediaLocked={asBoolean(args.mediaLocked)}
      mediaLockActionIcon={asText(args.mediaLockActionIcon)}
      mediaLockActionLabel={asText(args.mediaLockActionLabel)}
      mediaLockActionShape={asOption(args.mediaLockActionShape, BUTTON_SHAPES, 'pill')}
      mediaLockActionSize={asOption(args.mediaLockActionSize, BUTTON_SIZES, 'sm')}
      mediaLockActionVariant={asOption(args.mediaLockActionVariant, BUTTON_VARIANTS, 'primary')}
      mediaLockIcon={asText(args.mediaLockIcon)}
      mediaLockMessage={asText(args.mediaLockMessage)}
      mediaLockTitle={asText(args.mediaLockTitle)}
      mediaPlayLabel={asText(args.mediaPlayLabel)}
      mediaProgress={asProgress(args.mediaProgress)}
      mediaProgressLabel={asText(args.mediaProgressLabel)}
      mediaShowGrain={asBoolean(args.mediaShowGrain, true)}
      mediaShowPlay={asBoolean(args.mediaShowPlay)}
      mediaSize={asOption(args.mediaSize, MEDIA_SIZES, 'md')}
      mediaSrc={asText(args.mediaSrc)}
      mediaViewerCount={asText(args.mediaViewerCount)}
      mediaWidth={asText(args.mediaWidth, '128px')}
      meta={asText(args.meta)}
      showAvatar={asBoolean(args.showAvatar, true)}
      size={asOption(args.size, SIZES, 'sm')}
      title={asText(args.title, 'Post title')}
      variant={asOption(args.variant, VARIANTS, 'horizontal')}
    />
  );
}
