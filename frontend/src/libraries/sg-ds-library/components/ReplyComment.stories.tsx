import { SgDsLibraryReplyComment } from './ReplyComment';

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
  title: 'SgDsLibrary/ReplyComment',
  component: SgDsLibraryReplyComment,
  sourceInsert: {
    props: {
      author: 'Mina K',
      initials: 'MK',
      comment: '그 부분에서 드럼 킥도 살짝 앞으로 나와서 훨씬 입체적으로 들려요.',
      time: '18분 전',
      avatarSrc: '',
      verified: false,
      avatarTone: 'teal',
      likeCount: 42,
      liked: false,
      replyCount: 2,
      replyTo: 'SOYU',
      showConnector: true,
    },
  },
};

const REPLY_COMMENT_ARG_TYPES = {
  author: { control: 'text' },
  initials: { control: 'text' },
  comment: { control: 'text' },
  time: { control: 'text' },
  avatarSrc: { name: 'Avatar src', control: 'text' },
  verified: { control: 'boolean' },
  avatarTone: { control: 'select', options: TONES },
  likeCount: { control: 'text' },
  liked: { control: 'boolean' },
  replyCount: { control: 'text' },
  replyTo: { control: 'text' },
  showConnector: { control: 'boolean' },
};

export const Default = {
  args: {
    author: 'Mina K',
    initials: 'MK',
    comment: '그 부분에서 드럼 킥도 살짝 앞으로 나와서 훨씬 입체적으로 들려요.',
    time: '18분 전',
    avatarSrc: '',
    verified: false,
    avatarTone: 'teal',
    likeCount: 42,
    liked: false,
    replyCount: 2,
    replyTo: 'SOYU',
    showConnector: true,
  },
  argTypes: REPLY_COMMENT_ARG_TYPES,
  render: (args: Args) => (
    <SgDsLibraryReplyComment
      author={asText(args.author, 'User')}
      avatarSrc={asText(args.avatarSrc, '') || undefined}
      avatarTone={asTone(args.avatarTone)}
      comment={asText(args.comment, '')}
      initials={asText(args.initials, 'U')}
      likeCount={Number(args.likeCount) || 0}
      liked={asBoolean(args.liked)}
      replyCount={Number(args.replyCount) || 0}
      replyTo={asText(args.replyTo, '')}
      showConnector={asBoolean(args.showConnector, true)}
      time={asText(args.time, '')}
      verified={asBoolean(args.verified)}
    />
  ),
};

export const Liked = {
  args: {
    ...Default.args,
    author: 'Jin Park',
    initials: 'JP',
    avatarTone: 'blue',
    comment: '믹스 버전 올라오면 바로 다시 들어볼게요. 베이스 라인이 정말 좋네요.',
    likeCount: 96,
    liked: true,
    verified: true,
  },
  argTypes: REPLY_COMMENT_ARG_TYPES,
  render: Default.render,
};
