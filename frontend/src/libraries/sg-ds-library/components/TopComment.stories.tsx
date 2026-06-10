import { SgDsLibraryTopComment } from './TopComment';

type Args = Record<string, string>;

const meta = {
  title: 'SgDsLibrary/TopComment',
  component: SgDsLibraryTopComment,
  args: {
    author: 'SOYU',
    initials: 'SY',
    avatarSrc: '',
    comment: '4:12쯤 첼로 들어올 때 진짜 소름… 한 번에 갔다는 게 안 믿겨요',
    avatarTone: 'pink',
  },
  argTypes: {
    author: { control: 'text' },
    initials: { control: 'text' },
    avatarSrc: { name: 'Avatar src', control: 'text' },
    comment: { control: 'text' },
    avatarTone: { control: 'select', options: ['neutral', 'brand', 'teal', 'amber', 'purple', 'coral', 'blue', 'pink', 'green'] },
  },
  sourceInsert: {
    props: {
      author: 'SOYU',
      initials: 'SY',
      avatarSrc: '',
      comment: '4:12쯤 첼로 들어올 때 진짜 소름… 한 번에 갔다는 게 안 믿겨요',
      avatarTone: 'pink',
    },
  },
};
export default meta;

export const Default = {
  name: 'TopComment',
  render: (args: Args) => (
    <SgDsLibraryTopComment
      author={asText(args.author, 'SOYU')}
      avatarSrc={asText(args.avatarSrc) || undefined}
      avatarTone={asOption(args.avatarTone, ['neutral', 'brand', 'teal', 'amber', 'purple', 'coral', 'blue', 'pink', 'green'], 'pink')}
      comment={asText(args.comment)}
      initials={asText(args.initials, 'SY')}
    />
  ),
};

function asOption<T extends string>(value: unknown, options: readonly T[], fallback: T): T {
  return typeof value === 'string' && options.includes(value as T) ? (value as T) : fallback;
}

function asText(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}
