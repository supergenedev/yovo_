import { SgDsLibraryAvatar } from './Avatar';

type Args = Record<string, boolean | string>;

const meta = {
  title: 'SgDsLibrary/Avatar',
  component: SgDsLibraryAvatar,
  args: {
    initials: 'JD',
    src: '',
    alt: 'Jane Doe',
    quietStatus: false,
    tone: 'neutral',
    status: '',
    size: 'md',
    shape: 'circle',
  },
  argTypes: {
    initials: { control: 'text' },
    src: { control: 'text' },
    alt: { control: 'text' },
    quietStatus: { control: 'boolean', when: { key: 'status', value: 'live' } },
    tone: {
      control: 'select',
      options: ['neutral', 'brand', 'teal', 'amber', 'purple', 'coral', 'blue', 'pink', 'green'],
    },
    status: { control: 'select', options: ['', 'online', 'offline', 'busy', 'away', 'live'] },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] },
    shape: { control: 'select', options: ['circle', 'square', 'rounded'] },
  },
  sourceInsert: {
    props: {
      initials: 'JD',
      src: '',
      alt: 'Jane Doe',
      quietStatus: false,
      tone: 'neutral',
      status: '',
      size: 'md',
      shape: 'circle',
    },
  },
};
export default meta;

export const Default = {
  name: 'Avatar',
  render: (args: Args) => (
    <SgDsLibraryAvatar
      alt={asText(args.alt, 'Jane Doe')}
      initials={asText(args.initials, 'JD')}
      quietStatus={asBoolean(args.quietStatus)}
      shape={asOption(args.shape, ['circle', 'square', 'rounded'], 'circle')}
      size={asOption(args.size, ['xs', 'sm', 'md', 'lg', 'xl', '2xl'], 'md')}
      src={asText(args.src, '') || undefined}
      status={resolveStatus(args.status)}
      tone={asOption(
        args.tone,
        ['neutral', 'brand', 'teal', 'amber', 'purple', 'coral', 'blue', 'pink', 'green'],
        'neutral',
      )}
    />
  ),
};

export const Online = { args: { tone: 'brand', status: 'online', size: 'lg' }, render: Default.render };
export const Live = { args: { initials: 'HL', alt: 'Hailey Luna', tone: 'brand', status: 'live', size: 'lg' }, render: Default.render };
export const LiveQuiet = { args: { initials: 'HL', quietStatus: true, tone: 'brand', status: 'live', size: 'lg' }, render: Default.render };

function asBoolean(value: unknown): boolean {
  return typeof value === 'boolean' ? value : value === 'true';
}

const STATUS_VALUES = ['online', 'offline', 'busy', 'away', 'live'] as const;
type StatusValue = typeof STATUS_VALUES[number];

function resolveStatus(value: unknown): StatusValue | undefined {
  return typeof value === 'string' && (STATUS_VALUES as readonly string[]).includes(value)
    ? (value as StatusValue)
    : undefined;
}

function asOption<T extends string>(value: unknown, options: readonly T[], fallback: T): T {
  return typeof value === 'string' && options.includes(value as T) ? (value as T) : fallback;
}

function asText(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}
