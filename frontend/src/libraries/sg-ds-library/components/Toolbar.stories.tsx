import { SgDsLibraryButton } from './Button';
import { SgDsLibraryToolbar } from './Toolbar';

type Args = Record<string, boolean | string>;

const meta = {
  title: 'SgDsLibrary/Toolbar',
  component: SgDsLibraryToolbar,
  args: { variant: 'default', align: 'start', wrap: false, size: 'md' },
  argTypes: {
    variant: { control: 'select', options: ['default', 'divided'] },
    align: { control: 'select', options: ['start', 'center', 'end', 'between'] },
    wrap: { control: 'boolean' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  sourceInsert: {
    imports: [{ names: ['SgDsLibraryButton'] }],
    jsxProps: {
      startSlot: '(<><SgDsLibraryButton size="sm" variant="ghost" leadingIcon="heart">Like</SgDsLibraryButton><SgDsLibraryButton size="sm" variant="ghost" leadingIcon="message-circle">Comment</SgDsLibraryButton></>)',
      endSlot: '(<SgDsLibraryButton size="sm">Support</SgDsLibraryButton>)',
    },
    props: { variant: 'default', align: 'start', wrap: false, size: 'md' },
  },
};
export default meta;

export const Default = {
  name: 'Toolbar',
  render: (args: Args) => (
    <SgDsLibraryToolbar
      align={asOption(args.align, ['start', 'center', 'end', 'between'], 'start')}
      size={asOption(args.size, ['sm', 'md', 'lg'], 'md')}
      variant={asOption(args.variant, ['default', 'divided'], 'default')}
      wrap={asBoolean(args.wrap)}
      startSlot={(
        <>
          <SgDsLibraryButton size="sm" variant="ghost" leadingIcon="heart">Like</SgDsLibraryButton>
          <SgDsLibraryButton size="sm" variant="ghost" leadingIcon="message-circle">Comment</SgDsLibraryButton>
        </>
      )}
      endSlot={<SgDsLibraryButton size="sm">Support</SgDsLibraryButton>}
    />
  ),
};

function asBoolean(value: unknown): boolean {
  return typeof value === 'boolean' ? value : value === 'true';
}

function asOption<T extends string>(value: unknown, options: readonly T[], fallback: T): T {
  return typeof value === 'string' && options.includes(value as T) ? (value as T) : fallback;
}
