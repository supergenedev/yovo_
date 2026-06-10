import { SgDsLibraryFollowRow } from './FollowRow';

type Args = Record<string, string>;

const SIZES = ['sm', 'md'] as const;
const STATES = ['default', 'live'] as const;
const TAIL_STATUSES = ['neutral', 'info', 'success', 'warning', 'danger', 'live'] as const;
const TAIL_VARIANTS = ['plain', 'subtle', 'solid'] as const;
const TONES = ['brand', 'teal', 'amber', 'purple', 'coral', 'blue', 'pink', 'green'] as const;

const meta = {
  title: 'SgDsLibrary/FollowRow',
  component: SgDsLibraryFollowRow,
  args: {
    name: 'Hailey Luna',
    initials: 'HL',
    tail: '5m',
    tailStatus: 'neutral',
    tailVariant: 'plain',
    state: 'default',
    avatarTone: 'brand',
    size: 'sm',
  },
  argTypes: {
    name: { control: 'text' },
    initials: { control: 'text' },
    tail: { control: 'text' },
    tailStatus: { control: 'select', options: TAIL_STATUSES },
    tailVariant: { control: 'select', options: TAIL_VARIANTS },
    state: { control: 'select', options: STATES },
    avatarTone: { control: 'select', options: TONES },
    size: { control: 'select', options: SIZES },
  },
  sourceInsert: {
    props: {
      name: 'Hailey Luna',
      initials: 'HL',
      tail: '5m',
      tailStatus: 'neutral',
      tailVariant: 'plain',
      state: 'default',
      avatarTone: 'brand',
      size: 'sm',
    },
  },
};
export default meta;

export const Default = {
  name: 'FollowRow',
  render: (args: Args) => (
    <SgDsLibraryFollowRow
      avatarTone={asOption(args.avatarTone, TONES, 'brand')}
      initials={asText(args.initials, 'HL')}
      name={asText(args.name, 'Hailey Luna')}
      size={asOption(args.size, SIZES, 'sm')}
      state={asOption(args.state, STATES, 'default')}
      tail={asText(args.tail) || undefined}
      tailStatus={asOption(args.tailStatus, TAIL_STATUSES, 'neutral')}
      tailVariant={asOption(args.tailVariant, TAIL_VARIANTS, 'plain')}
    />
  ),
};

function asOption<T extends string>(value: unknown, options: readonly T[], fallback: T): T {
  return typeof value === 'string' && options.includes(value as T) ? (value as T) : fallback;
}

function asText(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}
