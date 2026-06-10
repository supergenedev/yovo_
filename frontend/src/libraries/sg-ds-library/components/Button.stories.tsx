import { SgDsLibraryButton } from './Button';

type Args = Record<string, boolean | string>;

const VARIANTS = ['primary', 'secondary', 'outline', 'soft', 'ghost', 'danger'] as const;
const SIZES = ['sm', 'md', 'lg'] as const;
const SHAPES = ['default', 'pill'] as const;
const BADGE_VARIANTS = ['info', 'success', 'warning', 'danger', 'neutral'] as const;

const meta = {
  title: 'SgDsLibrary/Button',
  component: SgDsLibraryButton,
  // Prop order follows the shared SG DS story order: content, icons,
  // state toggles, then visual variants and sizing.
  args: {
    children: 'Continue',
    leadingIcon: '',
    trailingIcon: '',
    iconOnly: false,
    badge: false,
    badgeText: '',
    badgeVariant: 'danger',
    variant: 'primary',
    size: 'md',
    shape: 'default',
  },
  argTypes: {
    children: { control: 'text' },
    leadingIcon: { control: 'icon' },
    trailingIcon: { control: 'icon' },
    iconOnly: { control: 'boolean' },
    badge: { control: 'boolean' },
    badgeText: { control: 'text' },
    badgeVariant: { control: 'select', options: BADGE_VARIANTS },
    variant: { control: 'select', options: VARIANTS },
    size: { control: 'select', options: SIZES },
    shape: { control: 'select', options: SHAPES },
  },
  sourceInsert: {
    props: {
      children: 'Continue',
      leadingIcon: '',
      trailingIcon: '',
      iconOnly: false,
      badge: false,
      badgeText: '',
      badgeVariant: 'danger',
      variant: 'primary',
      size: 'md',
      shape: 'default',
    },
  },
};
export default meta;

export const Default = {
  name: 'Button',
  render: (args: Args) => (
    <SgDsLibraryButton
      badge={asBoolean(args.badge)}
      badgeText={asText(args.badgeText)}
      badgeVariant={asOption(args.badgeVariant, BADGE_VARIANTS, 'danger')}
      iconOnly={asBoolean(args.iconOnly)}
      leadingIcon={asText(args.leadingIcon) || undefined}
      shape={asOption(args.shape, SHAPES, 'default')}
      size={asOption(args.size, SIZES, 'md')}
      trailingIcon={asText(args.trailingIcon) || undefined}
      variant={asOption(args.variant, VARIANTS, 'primary')}
    >
      {asText(args.children, asText(args.label, 'Continue'))}
    </SgDsLibraryButton>
  ),
};

export const Secondary = { args: { children: 'Cancel', variant: 'secondary' }, render: Default.render };
export const Outline = { args: { children: 'Preview', variant: 'outline' }, render: Default.render };
export const Soft = { args: { children: 'Listen now', variant: 'soft' }, render: Default.render };
export const Ghost = { args: { children: 'Skip', variant: 'ghost' }, render: Default.render };
export const Danger = { args: { children: 'Delete', variant: 'danger' }, render: Default.render };
export const WithLeadingIcon = {
  args: { children: 'Save', leadingIcon: 'save' },
  render: Default.render,
};
export const IconOnly = {
  args: { children: 'Search', leadingIcon: 'search', iconOnly: true, variant: 'ghost' },
  render: Default.render,
};
export const WithBadge = {
  args: { children: 'Notifications', leadingIcon: 'bell', badge: true, badgeText: '3', badgeVariant: 'danger' },
  render: Default.render,
};

function asBoolean(value: unknown): boolean {
  return typeof value === 'boolean' ? value : value === 'true';
}

function asOption<T extends string>(value: unknown, options: readonly T[], fallback: T): T {
  return typeof value === 'string' && options.includes(value as T) ? (value as T) : fallback;
}

function asText(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}
