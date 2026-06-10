import { SgDsLibraryPopover, SgDsLibraryPopoverContent, SgDsLibraryPopoverItem, SgDsLibraryPopoverList } from './Popover';

type Args = Record<string, boolean | string>;

const PLACEMENTS = [
  'top',
  'bottom',
  'left',
  'right',
  'top-start',
  'top-end',
  'bottom-start',
  'bottom-end',
  'left-start',
  'left-end',
  'right-start',
  'right-end',
] as const;
const ITEM_TONES = ['default', 'danger'] as const;

const meta = {
  title: 'SgDsLibrary/Popover',
  component: SgDsLibraryPopover,
};
export default meta;

export const Default = {
  name: 'Popover',
  args: {
    open: true,
    arrow: false,
    placement: 'bottom-start',
  },
  argTypes: {
    open: { control: 'boolean' },
    arrow: { control: 'boolean' },
    placement: { control: 'select', options: PLACEMENTS },
  },
  sourceInsert: {
    props: {
      open: true,
      arrow: false,
      placement: 'bottom-start',
    },
  },
  render: (args: Args) => (
    <SgDsLibraryPopover
      arrow={asBoolean(args.arrow)}
      open={asBoolean(args.open)}
      placement={asOption(args.placement, PLACEMENTS, 'bottom-start')}
    />
  ),
};

export const PopoverList = {
  args: {
    firstItem: 'Profile',
    secondItem: 'Settings',
  },
  argTypes: {
    firstItem: { control: 'text' },
    secondItem: { control: 'text' },
  },
  sourceInsert: {
    imports: [{ names: ['SgDsLibraryPopoverItem'] }],
    jsxChildren: `
      <SgDsLibraryPopoverItem icon="user">Profile</SgDsLibraryPopoverItem>
      <SgDsLibraryPopoverItem icon="settings">Settings</SgDsLibraryPopoverItem>
    `,
  },
  render: (args: Args) => (
    <SgDsLibraryPopover open>
      <SgDsLibraryPopoverList>
        <SgDsLibraryPopoverItem icon="user">{asText(args.firstItem, 'Profile')}</SgDsLibraryPopoverItem>
        <SgDsLibraryPopoverItem icon="settings">{asText(args.secondItem, 'Settings')}</SgDsLibraryPopoverItem>
      </SgDsLibraryPopoverList>
    </SgDsLibraryPopover>
  ),
};

export const PopoverItem = {
  args: {
    children: 'Sign out',
    meta: '',
    icon: 'log-out',
    tone: 'danger',
  },
  argTypes: {
    children: { control: 'text' },
    meta: { control: 'text' },
    icon: { control: 'icon' },
    tone: { control: 'select', options: ITEM_TONES },
  },
  sourceInsert: {
    props: {
      children: 'Sign out',
      meta: '',
      icon: 'log-out',
      tone: 'danger',
    },
  },
  render: (args: Args) => (
    <SgDsLibraryPopoverList>
      <SgDsLibraryPopoverItem
        icon={asText(args.icon, 'log-out')}
        meta={asText(args.meta) || undefined}
        tone={asOption(args.tone, ITEM_TONES, 'danger')}
      >
        {asText(args.children, 'Sign out')}
      </SgDsLibraryPopoverItem>
    </SgDsLibraryPopoverList>
  ),
};

export const PopoverContent = {
  args: {
    title: 'Filter by',
    body: 'Choose which items to include in the results.',
  },
  argTypes: {
    title: { control: 'text' },
    body: { control: 'text' },
  },
  sourceInsert: {
    props: {
      title: 'Filter by',
      body: 'Choose which items to include in the results.',
    },
  },
  render: (args: Args) => (
    <SgDsLibraryPopoverContent
      body={asText(args.body, 'Choose which items to include in the results.')}
      title={asText(args.title, 'Filter by')}
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
