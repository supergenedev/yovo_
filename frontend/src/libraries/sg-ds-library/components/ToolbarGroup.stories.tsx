import { SgDsLibraryButton } from './Button';
import { SgDsLibraryToolbar, SgDsLibraryToolbarGroup } from './Toolbar';

type Args = Record<string, string>;

const meta = {
  title: 'SgDsLibrary/ToolbarGroup',
  component: SgDsLibraryToolbarGroup,
  args: {
    align: 'end',
  },
  argTypes: {
    align: { control: 'select', options: ['start', 'end'] },
  },
  sourceInsert: {
    imports: [{ names: ['SgDsLibraryButton'] }],
    jsxChildren: '<SgDsLibraryButton size="sm">Support</SgDsLibraryButton>',
    props: {
      align: 'end',
    },
  },
};
export default meta;

export const Default = {
  name: 'ToolbarGroup',
  render: (args: Args) => (
    <SgDsLibraryToolbar>
      <SgDsLibraryToolbarGroup>
        <SgDsLibraryButton size="sm" variant="ghost" leadingIcon="heart">Like</SgDsLibraryButton>
        <SgDsLibraryButton size="sm" variant="ghost" leadingIcon="message-circle">Comment</SgDsLibraryButton>
      </SgDsLibraryToolbarGroup>
      <SgDsLibraryToolbarGroup align={asOption(args.align, ['start', 'end'], 'end')}>
        <SgDsLibraryButton size="sm">Support</SgDsLibraryButton>
      </SgDsLibraryToolbarGroup>
    </SgDsLibraryToolbar>
  ),
};

function asOption<T extends string>(value: unknown, options: readonly T[], fallback: T): T {
  return typeof value === 'string' && options.includes(value as T) ? (value as T) : fallback;
}
