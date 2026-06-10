import { SgDsLibrarySidebarFollowRow } from './Sidebar';

type Args = Record<string, boolean | string>;

const AVATAR_TONES = ['brand', 'teal', 'amber', 'purple', 'coral', 'blue', 'pink', 'green'] as const;
const ROW_AS = ['button', 'a', 'div'] as const;
const STATUSES = ['default', 'live'] as const;
const TAIL_STATUSES = ['neutral', 'info', 'success', 'warning', 'danger', 'live'] as const;
const TAIL_VARIANTS = ['plain', 'subtle', 'solid'] as const;

const DEFAULT_PROPS = {
  name: 'Hailey Luna',
  initials: 'HL',
  description: 'Creator',
  href: '',
  avatarSrc: '',
  tail: '5m',
  tailStatus: 'neutral',
  tailVariant: 'plain',
  active: false,
  as: 'button',
  status: 'default',
  avatarTone: 'brand',
} as const;

const meta = {
  title: 'SgDsLibrary/SidebarFollowRow',
  component: SgDsLibrarySidebarFollowRow,
  args: DEFAULT_PROPS,
  argTypes: {
    name: { control: 'text' },
    initials: { control: 'text' },
    description: { control: 'text' },
    href: { control: 'text', when: { key: 'as', value: 'a' } },
    avatarSrc: { control: 'text' },
    tail: { control: 'text' },
    tailStatus: { control: 'select', options: TAIL_STATUSES },
    tailVariant: { control: 'select', options: TAIL_VARIANTS },
    active: { control: 'boolean' },
    as: { control: 'select', options: ROW_AS },
    status: { control: 'select', options: STATUSES },
    avatarTone: { control: 'select', options: AVATAR_TONES },
  },
  sourceInsert: {
    props: DEFAULT_PROPS,
  },
};
export default meta;

export const Default = {
  name: 'SidebarFollowRow',
  render: (args: Args) => (
    <div style={{ width: '17rem' }}>
      <SgDsLibrarySidebarFollowRow
        active={asBoolean(args.active)}
        as={asOption(args.as, ROW_AS, 'button')}
        avatarSrc={asText(args.avatarSrc) || undefined}
        avatarTone={asOption(args.avatarTone, AVATAR_TONES, 'brand')}
        description={asText(args.description)}
        href={asText(args.href) || undefined}
        initials={asText(args.initials, 'HL')}
        name={asText(args.name, 'Hailey Luna')}
        status={asOption(args.status, STATUSES, 'default')}
        tail={asText(args.tail) || undefined}
        tailStatus={asOption(args.tailStatus, TAIL_STATUSES, 'neutral')}
        tailVariant={asOption(args.tailVariant, TAIL_VARIANTS, 'plain')}
      />
    </div>
  ),
};

export const Live = {
  args: {
    ...DEFAULT_PROPS,
    status: 'live',
    tail: '',
    tailStatus: 'live',
    tailVariant: 'plain',
  },
  sourceInsert: {
    props: {
      ...DEFAULT_PROPS,
      status: 'live',
      tail: '',
      tailStatus: 'live',
      tailVariant: 'plain',
    },
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
