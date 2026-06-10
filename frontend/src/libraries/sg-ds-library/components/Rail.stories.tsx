import { SgDsLibraryRail } from './Rail';

type Args = Record<string, boolean | string>;

const ACTIVE_ITEMS = ['home', 'live', 'library', 'messages'] as const;
const SIZES = ['compact', 'default', 'wide'] as const;

const meta = {
  title: 'SgDsLibrary/Rail',
  component: SgDsLibraryRail,
};
export default meta;

export const Default = {
  name: 'Rail',
  args: {
    brand: 'StudioGrid',
    subtitle: 'Creator studio',
    footerPrimaryLabel: 'Dark mode',
    footerSecondaryLabel: 'Settings',
    activeItem: 'home',
    showFollowing: true,
    showFooter: true,
    collapsed: false,
    size: 'default',
  },
  argTypes: {
    brand: { control: 'text' },
    subtitle: { control: 'text' },
    footerPrimaryLabel: { control: 'text' },
    footerSecondaryLabel: { control: 'text' },
    activeItem: { control: 'select', options: ACTIVE_ITEMS },
    showFollowing: { control: 'boolean' },
    showFooter: { control: 'boolean' },
    collapsed: { control: 'boolean' },
    size: { control: 'select', options: SIZES },
  },
  sourceInsert: {
    props: {
      brand: 'StudioGrid',
      subtitle: 'Creator studio',
      footerPrimaryLabel: 'Dark mode',
      footerSecondaryLabel: 'Settings',
      activeItem: 'home',
      showFollowing: true,
      showFooter: true,
      collapsed: false,
      size: 'default',
    },
  },
  render: (args: Args) => (
    <SgDsLibraryRail
      activeItem={asOption(args.activeItem, ACTIVE_ITEMS, 'home')}
      brand={asText(args.brand, 'StudioGrid')}
      collapsed={asBoolean(args.collapsed, false)}
      footerPrimaryLabel={asText(args.footerPrimaryLabel, 'Dark mode')}
      footerSecondaryLabel={asText(args.footerSecondaryLabel, 'Settings')}
      showFollowing={asBoolean(args.showFollowing, true)}
      showFooter={asBoolean(args.showFooter, true)}
      size={asOption(args.size, SIZES, 'default')}
      subtitle={asText(args.subtitle, 'Creator studio')}
    />
  ),
};

function asBoolean(value: unknown, fallback: boolean): boolean {
  if (value === true || value === 'true') return true;
  if (value === false || value === 'false') return false;
  return fallback;
}

function asOption<T extends string>(value: unknown, options: readonly T[], fallback: T): T {
  return typeof value === 'string' && options.includes(value as T) ? (value as T) : fallback;
}

function asText(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}
