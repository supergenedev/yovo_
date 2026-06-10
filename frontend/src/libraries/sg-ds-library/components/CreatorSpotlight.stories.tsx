import { SgDsLibraryCreatorSpotlight } from './CreatorSpotlight';

type Args = Record<string, unknown>;

const AVATAR_SHAPES = ['circle', 'square', 'rounded'] as const;
const AVATAR_SIZES = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;
const AVATAR_TONES = ['neutral', 'brand', 'teal', 'amber', 'purple', 'coral', 'blue', 'pink', 'green'] as const;

function ordered<T extends Record<string, unknown>>(order: number, config: T): T & { order: number } {
  return { ...config, order };
}

function asText(value: unknown, fallback: string): string {
  return typeof value === 'string' ? value : fallback;
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

const CREATOR_SPOTLIGHT_ARG_TYPES = {
  mediaWidth: ordered(15, { name: 'Media width', control: 'text' }),
  eyebrow: ordered(30, { control: 'text' }),
  name: ordered(40, { control: 'text' }),
  meta: ordered(50, { control: 'text' }),
  verified: ordered(60, { control: 'boolean' }),
  stat1: ordered(70, { name: 'Stat 1', control: 'text' }),
  stat2: ordered(72, { name: 'Stat 2', control: 'text' }),
  stat3: ordered(74, { name: 'Stat 3', control: 'text' }),
  mediaSrc: ordered(110, { name: 'Media src', control: 'text' }),
  avatarSrc: ordered(230, { name: 'Avatar src', control: 'text' }),
  avatarAlt: ordered(240, { name: 'Avatar alt', control: 'text' }),
  avatarInitials: ordered(250, { name: 'Avatar initials', control: 'text' }),
  avatarTone: ordered(260, { name: 'Avatar tone', control: 'select', options: AVATAR_TONES }),
  avatarSize: ordered(270, { name: 'Avatar size', control: 'select', options: AVATAR_SIZES }),
  avatarShape: ordered(280, { name: 'Avatar shape', control: 'select', options: AVATAR_SHAPES }),
  primaryActionLabel: ordered(300, { name: 'Primary action label', control: 'text' }),
  primaryActionIcon: ordered(310, { name: 'Primary action icon', control: 'icon' }),
  secondaryActionLabel: ordered(320, { name: 'Secondary action label', control: 'text' }),
  secondaryActionIcon: ordered(330, { name: 'Secondary action icon', control: 'icon' }),
};

const SHARED_ARGS = {
  mediaWidth: '60%',
  eyebrow: '스포트라이트',
  name: 'MIKO Studio',
  meta: '단편영화 전문 스튜디오',
  verified: true,
  stat1: '219K 팔로워',
  stat2: '92 작품',
  stat3: '+18.2% 지난 30일',
  mediaSrc: 'https://i.pinimg.com/736x/64/35/1b/64351bf5a15fdc1674758340556a1967.jpg',
  avatarSrc: 'https://i.pinimg.com/736x/a8/bf/a3/a8bfa3749e7f7ffaa0441b108d8a23fb.jpg',
  avatarAlt: 'MIKO Studio',
  avatarInitials: 'M',
  avatarTone: 'coral',
  avatarSize: '2xl',
  avatarShape: 'circle',
  primaryActionLabel: '구독 · ⓒ 3,900/월',
  primaryActionIcon: 'lock-open',
  secondaryActionLabel: '팔로우',
  secondaryActionIcon: 'plus',
};

export default {
  title: 'SgDsLibrary/CreatorSpotlight',
  component: SgDsLibraryCreatorSpotlight,
};

export const Default = {
  name: 'CreatorSpotlight',
  args: { ...SHARED_ARGS },
  argTypes: CREATOR_SPOTLIGHT_ARG_TYPES,
  sourceInsert: {
    props: { ...SHARED_ARGS },
  },
  render: renderCreatorSpotlight,
};

export const NoMedia = {
  args: { ...SHARED_ARGS, mediaSrc: '', name: '사야 SAYA', meta: '보컬리스트 · 첫 풀앨범 진행 중', avatarInitials: 'S', avatarTone: 'purple', avatarSrc: '', stat1: '287K 팔로워', stat2: '41 작품', stat3: '+9.5% 지난 30일' },
  argTypes: CREATOR_SPOTLIGHT_ARG_TYPES,
  sourceInsert: {
    props: { ...SHARED_ARGS, mediaSrc: '' },
  },
  render: renderCreatorSpotlight,
};

function renderCreatorSpotlight(args: Args) {
  return (
    <SgDsLibraryCreatorSpotlight
      avatarAlt={asText(args.avatarAlt, '')}
      avatarInitials={asText(args.avatarInitials, 'M')}
      avatarShape={asOption(args.avatarShape, AVATAR_SHAPES, 'circle')}
      avatarSize={asOption(args.avatarSize, AVATAR_SIZES, '2xl')}
      avatarSrc={asText(args.avatarSrc, '')}
      avatarTone={asOption(args.avatarTone, AVATAR_TONES, 'coral')}
      eyebrow={asText(args.eyebrow, '스포트라이트')}
      mediaSrc={asText(args.mediaSrc, '')}
      mediaWidth={asText(args.mediaWidth, '60%')}
      meta={asText(args.meta, '')}
      name={asText(args.name, 'Creator')}
      primaryActionIcon={asText(args.primaryActionIcon, 'lock-open')}
      primaryActionLabel={asText(args.primaryActionLabel, '')}
      secondaryActionIcon={asText(args.secondaryActionIcon, 'plus')}
      secondaryActionLabel={asText(args.secondaryActionLabel, '')}
      stat1={asText(args.stat1, '')}
      stat2={asText(args.stat2, '')}
      stat3={asText(args.stat3, '')}
      verified={asBoolean(args.verified, true)}
    />
  );
}
