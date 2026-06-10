import { SgDsLibrarySidebarItem } from './Sidebar';

type Args = Record<string, boolean | string>;

const BADGE_STATUSES = ['neutral', 'info', 'success', 'warning', 'danger'] as const;
const BADGE_VARIANTS = ['subtle', 'solid'] as const;

const DEFAULT_PROPS = {
  label: 'Home',
  description: 'Pinned',
  href: '',
  icon: 'house',
  badge: '3',
  badgeVariant: 'subtle',
  badgeStatus: 'neutral',
  active: false,
  emphasized: false,
} as const;

const meta = {
  title: 'SgDsLibrary/SidebarItem',
  component: SgDsLibrarySidebarItem,
  args: DEFAULT_PROPS,
  argTypes: {
    label: { control: 'text' },
    description: { control: 'text' },
    href: { control: 'text' },
    icon: { control: 'icon' },
    badge: { control: 'text' },
    badgeVariant: { control: 'select', options: BADGE_VARIANTS },
    badgeStatus: { control: 'select', options: BADGE_STATUSES },
    active: { control: 'boolean' },
    emphasized: { control: 'boolean' },
  },
  sourceInsert: {
    props: DEFAULT_PROPS,
  },
};
export default meta;

export const Default = {
  name: 'SidebarItem',
  render: (args: Args) => (
    <div style={{ width: '17rem' }}>
      <SgDsLibrarySidebarItem
        active={asBoolean(args.active)}
        emphasized={asBoolean(args.emphasized)}
        badge={asText(args.badge)}
        badgeStatus={asOption(args.badgeStatus, BADGE_STATUSES, 'neutral')}
        badgeVariant={asOption(args.badgeVariant, BADGE_VARIANTS, 'subtle')}
        description={asText(args.description)}
        href={asText(args.href) || undefined}
        icon={asText(args.icon, 'house')}
        label={asText(args.label, 'Home')}
      />
    </div>
  ),
};

export const Active = {
  args: { ...DEFAULT_PROPS, active: true },
  sourceInsert: {
    props: { ...DEFAULT_PROPS, active: true },
  },
  render: Default.render,
};

export const Emphasized = {
  args: { ...DEFAULT_PROPS, badge: '', description: 'Primary action', emphasized: true, icon: 'plus', label: 'Create' },
  sourceInsert: {
    props: { ...DEFAULT_PROPS, badge: '', description: 'Primary action', emphasized: true, icon: 'plus', label: 'Create' },
  },
  render: Default.render,
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
