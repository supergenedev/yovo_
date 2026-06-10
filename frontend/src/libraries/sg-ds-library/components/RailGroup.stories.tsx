import { SgDsLibraryRailGroup } from './RailGroup';

type Args = Record<string, string>;

const VARIANTS = ['nav', 'follow'] as const;

const meta = {
  title: 'SgDsLibrary/RailGroup',
  component: SgDsLibraryRailGroup,
  args: {
    label: '',
    variant: 'nav',
  },
  argTypes: {
    label: { control: 'text' },
    variant: { control: 'select', options: VARIANTS },
  },
  sourceInsert: {
    props: {
      label: '',
      variant: 'nav',
    },
  },
};
export default meta;

export const Default = {
  name: 'RailGroup',
  render: (args: Args) => (
    <SgDsLibraryRailGroup
      label={asText(args.label, '')}
      variant={asOption(args.variant, VARIANTS, 'nav')}
    />
  ),
};

function asOption<T extends string>(value: unknown, options: readonly T[], fallback: T): T {
  return typeof value === 'string' && options.includes(value as T) ? (value as T) : fallback;
}

function asText(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}
