import { SgDsLibraryPostStack, SgDsLibraryPostStackNewPill } from './PostStack';

type Args = Record<string, boolean | string>;

const meta = {
  title: 'SgDsLibrary/PostStack',
  component: SgDsLibraryPostStack,
};
export default meta;

export const Default = {
  name: 'PostStack',
  args: {
    newCount: '4',
    showNewPill: true,
  },
  argTypes: {
    newCount: { control: 'text' },
    showNewPill: { control: 'boolean' },
  },
  sourceInsert: {
    props: {
      newCount: '4',
      showNewPill: true,
    },
  },
  render: (args: Args) => (
    <SgDsLibraryPostStack
      newCount={asText(args.newCount, '4')}
      showNewPill={asBoolean(args.showNewPill)}
    />
  ),
};

export const PostStackNewPill = {
  args: { count: '4' },
  argTypes: { count: { control: 'text' } },
  sourceInsert: {
    props: { count: '4' },
  },
  render: (args: Args) => <SgDsLibraryPostStackNewPill count={asText(args.count, '4')} />,
};

function asBoolean(value: unknown): boolean {
  return value === true || value === 'true';
}

function asText(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}
