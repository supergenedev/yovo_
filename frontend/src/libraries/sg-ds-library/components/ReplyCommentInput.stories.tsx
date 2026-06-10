import { SgDsLibraryReplyCommentInput } from './ReplyCommentInput';

type Args = Record<string, unknown>;

const TONES = ['neutral', 'brand', 'teal', 'amber', 'purple', 'coral', 'blue', 'pink', 'green'] as const;

export default {
  title: 'SgDsLibrary/ReplyCommentInput',
  component: SgDsLibraryReplyCommentInput,
  args: {
    initials: 'ME',
    placeholder: '답글을 입력하세요',
    defaultValue: '',
    avatarSrc: '',
    disabled: false,
    readOnly: false,
    showAvatar: true,
    showCancel: true,
    avatarTone: 'brand',
    rows: 3,
    helperText: '',
    maxLength: 300,
    replyTo: 'SOYU',
    showAttachment: true,
    showConnector: true,
    showCounter: true,
    showEmoji: true,
    showMention: false,
    submitDisabled: false,
    submitLabel: '답글',
  },
  argTypes: {
    initials: { control: 'text' },
    placeholder: { control: 'text' },
    defaultValue: { control: 'text' },
    avatarSrc: { name: 'Avatar src', control: 'text' },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    showAvatar: { control: 'boolean' },
    showCancel: { control: 'boolean' },
    avatarTone: { control: 'select', options: TONES },
    rows: { control: { type: 'number', min: 2, max: 8, step: 1 } },
    helperText: { control: 'text' },
    maxLength: { control: { type: 'number', min: 0, max: 2000, step: 10 } },
    replyTo: { control: 'text' },
    showAttachment: { control: 'boolean' },
    showConnector: { control: 'boolean' },
    showCounter: { control: 'boolean' },
    showEmoji: { control: 'boolean' },
    showMention: { control: 'boolean' },
    submitDisabled: { control: 'boolean' },
    submitLabel: { control: 'text' },
  },
  sourceInsert: {
    props: {
      initials: 'ME',
      placeholder: '답글을 입력하세요',
      defaultValue: '',
      avatarSrc: '',
      disabled: false,
      readOnly: false,
      showAvatar: true,
      showCancel: true,
      avatarTone: 'brand',
      rows: 3,
      helperText: '',
      maxLength: 300,
      replyTo: 'SOYU',
      showAttachment: true,
      showConnector: true,
      showCounter: true,
      showEmoji: true,
      showMention: false,
      submitDisabled: false,
      submitLabel: '답글',
    },
  },
};

export const Default = {
  name: 'ReplyCommentInput',
  render: (args: Args) => (
    <SgDsLibraryReplyCommentInput
      key={`${asText(args.defaultValue)}-${asNumber(args.rows, 3)}`}
      avatarSrc={asText(args.avatarSrc, '') || undefined}
      avatarTone={asTone(args.avatarTone)}
      defaultValue={asText(args.defaultValue)}
      disabled={asBoolean(args.disabled)}
      helperText={asText(args.helperText, '') || undefined}
      initials={asText(args.initials, 'ME')}
      maxLength={asNumber(args.maxLength, 300)}
      placeholder={asText(args.placeholder, '답글을 입력하세요')}
      readOnly={asBoolean(args.readOnly)}
      replyTo={asText(args.replyTo, 'SOYU')}
      rows={asNumber(args.rows, 3)}
      showAttachment={asBoolean(args.showAttachment, true)}
      showAvatar={asBoolean(args.showAvatar, true)}
      showCancel={asBoolean(args.showCancel, true)}
      showConnector={asBoolean(args.showConnector, true)}
      showCounter={asBoolean(args.showCounter, true)}
      showEmoji={asBoolean(args.showEmoji, true)}
      showMention={asBoolean(args.showMention)}
      submitDisabled={asBoolean(args.submitDisabled)}
      submitLabel={asText(args.submitLabel, '답글')}
    />
  ),
};

export const Writing = {
  args: {
    defaultValue: '말씀하신 부분 반영해서 다시 올려볼게요.',
    helperText: '답글은 원 댓글 작성자에게 알림으로 전달됩니다.',
    showMention: true,
  },
  render: Default.render,
};

function asBoolean(value: unknown, fallback = false): boolean {
  return typeof value === 'boolean' ? value : value === 'true' ? true : value === 'false' ? false : fallback;
}

function asNumber(value: unknown, fallback: number): number {
  const parsed = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function asText(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}

function asTone(value: unknown): (typeof TONES)[number] {
  return TONES.includes(value as never) ? (value as (typeof TONES)[number]) : 'brand';
}
