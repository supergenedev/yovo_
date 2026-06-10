import { SgDsLibraryBadge } from './Badge';

type Args = Record<string, boolean | string>;

const BADGE_VARIANTS = ['solid', 'subtle', 'flat'] as const;

const meta = {
  title: 'SgDsLibrary/Badge',
  component: SgDsLibraryBadge,
  // Prop order follows the shared SG DS story order: content and icon first,
  // then visual variants and sizing.
  args: {
    children: 'Active',
    icon: '',
    status: 'success',
    variant: 'subtle',
    size: 'md',
    shape: 'default',
  },
  argTypes: {
    children: { control: 'text' },
    icon: { control: 'icon' },
    status: { control: 'select', options: ['info', 'success', 'warning', 'danger', 'neutral'] },
    variant: { control: 'select', options: BADGE_VARIANTS },
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
    shape: { control: 'select', options: ['default', 'pill', 'dot'] },
  },
  sourceInsert: {
    props: {
      children: 'Active',
      icon: '',
      status: 'success',
      variant: 'subtle',
      size: 'md',
      shape: 'default',
    },
  },
};
export default meta;

export const Default = {
  name: 'Badge',
  render: (args: Args) => (
    <SgDsLibraryBadge
      icon={asText(args.icon) || undefined}
      shape={asOption(args.shape, ['default', 'pill', 'dot'], 'default')}
      size={asOption(args.size, ['sm', 'md', 'lg', 'xl'], 'md')}
      status={asOption(args.status, ['info', 'success', 'warning', 'danger', 'neutral'], 'success')}
      variant={asOption(args.variant, BADGE_VARIANTS, 'subtle')}
    >
      {asText(args.children, 'Active')}
    </SgDsLibraryBadge>
  ),
};

export const Count = { args: { children: '3', icon: '', status: 'danger', variant: 'solid', size: 'sm', shape: 'pill' }, render: Default.render };
export const Warning = { args: { children: 'Pending', icon: 'clock', status: 'warning' }, render: Default.render };
export const Flat = { args: { children: 'Flat', icon: '', status: 'info', variant: 'flat', size: 'md', shape: 'pill' }, render: Default.render };
export const Dot = { args: { children: '', icon: '', status: 'danger', variant: 'solid', shape: 'dot' }, render: Default.render };

function asOption<T extends string>(value: unknown, options: readonly T[], fallback: T): T {
  return typeof value === 'string' && options.includes(value as T) ? (value as T) : fallback;
}

function asText(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}
