import { SgDsLibraryBadge } from './Badge';
import { SgDsLibraryNavItem } from './NavItem';

type Args = Record<string, boolean | string>;

const SIZES = ['sm', 'md', 'lg'] as const;
const VARIANTS = ['default', 'rail'] as const;
const DEFAULT_PROPS = {
  label: 'Home',
  icon: 'house',
  tail: '⌘1',
  selected: false,
  current: false,
  variant: 'rail',
  size: 'md',
} as const;

const meta = {
  title: 'SgDsLibrary/NavItem',
  component: SgDsLibraryNavItem,
  args: DEFAULT_PROPS,
  argTypes: {
    label: { control: 'text' },
    icon: { control: 'icon' },
    tail: { control: 'text' },
    selected: { control: 'boolean' },
    current: { control: 'boolean' },
    variant: { control: 'select', options: VARIANTS },
    size: { control: 'select', options: SIZES },
  },
  sourceInsert: {
    props: DEFAULT_PROPS,
  },
};
export default meta;

export const Default = {
  name: 'NavItem',
  render: (args: Args) => (
    <SgDsLibraryNavItem
      current={asBoolean(args.current)}
      icon={asText(args.icon, 'house')}
      label={asText(args.label, 'Home')}
      selected={asBoolean(args.selected)}
      size={asOption(args.size, SIZES, 'md')}
      tail={asText(args.tail, '⌘1')}
      variant={asOption(args.variant, VARIANTS, 'rail')}
    />
  ),
};

export const WithBadge = {
  args: { label: 'Notifications', icon: 'bell', tail: '3', selected: false, current: false, variant: 'rail', size: 'md' },
  sourceInsert: {
    props: { label: 'Notifications', icon: 'bell', tail: '3', selected: false, current: false, variant: 'rail', size: 'md' },
  },
  render: (args: Args) => (
    <SgDsLibraryNavItem
      current={asBoolean(args.current)}
      icon={asText(args.icon, 'bell')}
      label={asText(args.label, 'Notifications')}
      selected={asBoolean(args.selected)}
      size={asOption(args.size, SIZES, 'md')}
      tail={asText(args.tail) ? (
        <SgDsLibraryBadge shape="pill" size="sm" status="danger" variant="solid">
          {asText(args.tail, '3')}
        </SgDsLibraryBadge>
      ) : ''}
      variant={asOption(args.variant, VARIANTS, 'rail')}
    />
  ),
};

function asBoolean(value: unknown): boolean {
  return value === true || value === 'true';
}

function asOption<T extends string>(value: unknown, options: readonly T[], fallback: T): T {
  return typeof value === 'string' && options.includes(value as T) ? (value as T) : fallback;
}

function asText(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}
