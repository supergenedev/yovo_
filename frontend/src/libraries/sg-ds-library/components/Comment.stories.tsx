import { SgDsLibraryComment } from './Comment';

type Args = Record<string, unknown>;

function asText(value: unknown, fallback: string): string {
  return typeof value === 'string' && value.trim() ? value : fallback;
}

function asBoolean(value: unknown, fallback = false): boolean {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    if (value === 'true') return true;
    if (value === 'false') return false;
  }
  return fallback;
}

const TONES = ['neutral', 'brand', 'teal', 'amber', 'purple', 'coral', 'blue', 'pink', 'green'] as const;
function asTone(value: unknown): (typeof TONES)[number] {
  return TONES.includes(value as never) ? (value as (typeof TONES)[number]) : 'brand';
}

export default {
  title: 'SgDsLibrary/Comment',
  component: SgDsLibraryComment,
  sourceInsert: {
    props: {
      author: 'SOYU',
      initials: 'SY',
      comment: '4:12쯤 첼로 들어올 때 진짜 소름… 한 번에 갔다는 게 안 믿겨요',
      time: '2시간 전',
      avatarSrc: '',
      verified: true,
      avatarTone: 'pink',
      likeCount: 124,
      liked: false,
      pinned: false,
      replyCount: 8,
    },
  },
};

const COMMENT_ARG_TYPES = {
  author: { control: 'text' },
  initials: { control: 'text' },
  comment: { control: 'text' },
  time: { control: 'text' },
  avatarSrc: { name: 'Avatar src', control: 'text' },
  verified: { control: 'boolean' },
  avatarTone: { control: 'select', options: TONES },
  likeCount: { control: 'text' },
  liked: { control: 'boolean' },
  pinned: { control: 'boolean' },
  replyCount: { control: 'text' },
};

export const Default = {
  args: {
    author: 'SOYU',
    initials: 'SY',
    comment: '4:12쯤 첼로 들어올 때 진짜 소름… 한 번에 갔다는 게 안 믿겨요',
    time: '2시간 전',
    avatarSrc: '',
    verified: true,
    avatarTone: 'pink',
    likeCount: 124,
    liked: false,
    pinned: false,
    replyCount: 8,
  },
  argTypes: COMMENT_ARG_TYPES,
  render: (args: Args) => (
    <SgDsLibraryComment
      author={asText(args.author, 'User')}
      avatarSrc={asText(args.avatarSrc, '') || undefined}
      avatarTone={asTone(args.avatarTone)}
      comment={asText(args.comment, '')}
      initials={asText(args.initials, 'U')}
      likeCount={Number(args.likeCount) || 0}
      liked={asBoolean(args.liked)}
      pinned={asBoolean(args.pinned)}
      replyCount={Number(args.replyCount) || 0}
      time={asText(args.time, '')}
      verified={asBoolean(args.verified)}
    />
  ),
};

export const Pinned = {
  args: {
    author: 'Hailey Luna',
    initials: 'HL',
    comment: '저희 첫 라이브 직캠도 곧 올릴게요. 이번 EP에 함께 참여한 분들 모두 고마워요!',
    time: '5분 전',
    avatarSrc: '',
    verified: true,
    avatarTone: 'brand',
    likeCount: 2480,
    liked: true,
    pinned: true,
    replyCount: 142,
  },
  argTypes: COMMENT_ARG_TYPES,
  render: (args: Args) => (
    <SgDsLibraryComment
      author={asText(args.author, 'User')}
      avatarSrc={asText(args.avatarSrc, '') || undefined}
      avatarTone={asTone(args.avatarTone)}
      comment={asText(args.comment, '')}
      initials={asText(args.initials, 'U')}
      likeCount={Number(args.likeCount) || 0}
      liked={asBoolean(args.liked, true)}
      pinned={asBoolean(args.pinned, true)}
      replyCount={Number(args.replyCount) || 0}
      time={asText(args.time, '')}
      verified={asBoolean(args.verified)}
    />
  ),
};
