import { SgDsLibraryUserBlock } from './UserBlock';

type Args = Record<string, boolean | string>;

const AVATAR_SHAPES = ['circle', 'square', 'rounded'] as const;
const AVATAR_SIZES = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;
const AVATAR_STATUSES = ['', 'online', 'offline', 'busy', 'away', 'live'] as const;
const AVATAR_TONES = ['neutral', 'brand', 'teal', 'amber', 'purple', 'coral', 'blue', 'pink', 'green'] as const;
const BUTTON_VARIANTS = ['primary', 'secondary', 'outline', 'soft', 'ghost', 'danger'] as const;
const DIRECTIONS = ['row', 'stack'] as const;
const USER_BLOCK_SIZES = ['sm', 'md', 'lg'] as const;

const meta = {
  title: 'SgDsLibrary/UserBlock',
  component: SgDsLibraryUserBlock,
  args: {
    name: 'Hailey Luna',
    initials: 'HL',
    meta: '보컬리스트 · 2시간 전',
    action1Label: 'Message',
    action1Variant: 'ghost',
    action1Icon: 'message-circle',
    action2Label: 'Follow',
    action2Variant: 'primary',
    action2Icon: 'plus',
    avatarSrc: '',
    avatarAlt: 'Hailey Luna',
    verified: true,
    avatarQuietStatus: false,
    avatarStatus: '',
    avatarStatusLabel: '',
    avatarTone: 'brand',
    direction: 'row',
    size: 'md',
    avatarSize: 'md',
    avatarShape: 'circle',
  },
  argTypes: {
    name: { control: 'text' },
    initials: { name: 'Avatar initials', control: 'text' },
    meta: { control: 'text' },
    action1Label: { name: 'Action 1 label', control: 'text' },
    action1Variant: { name: 'Action 1 variant', control: 'select', options: BUTTON_VARIANTS },
    action1Icon: { name: 'Action 1 icon', control: 'icon' },
    action2Label: { name: 'Action 2 label', control: 'text' },
    action2Variant: { name: 'Action 2 variant', control: 'select', options: BUTTON_VARIANTS },
    action2Icon: { name: 'Action 2 icon', control: 'icon' },
    avatarSrc: { name: 'Avatar src', control: 'text' },
    avatarAlt: { name: 'Avatar alt', control: 'text' },
    verified: { control: 'boolean' },
    avatarQuietStatus: { name: 'Avatar quiet status', control: 'boolean', when: { key: 'avatarStatus', value: 'live' } },
    avatarStatus: { name: 'Avatar status', control: 'select', options: AVATAR_STATUSES },
    avatarStatusLabel: { name: 'Avatar status label', control: 'text' },
    avatarTone: { name: 'Avatar tone', control: 'select', options: AVATAR_TONES },
    direction: { control: 'select', options: DIRECTIONS },
    size: { control: 'select', options: USER_BLOCK_SIZES },
    avatarSize: { name: 'Avatar size', control: 'select', options: AVATAR_SIZES },
    avatarShape: { name: 'Avatar shape', control: 'select', options: AVATAR_SHAPES },
  },
  sourceInsert: {
    props: {
      name: 'Hailey Luna',
      initials: 'HL',
      meta: '보컬리스트 · 2시간 전',
      action1Label: 'Message',
      action1Variant: 'ghost',
      action1Icon: 'message-circle',
      action2Label: 'Follow',
      action2Variant: 'primary',
      action2Icon: 'plus',
      avatarSrc: '',
      avatarAlt: 'Hailey Luna',
      verified: true,
      avatarQuietStatus: false,
      avatarStatus: '',
      avatarStatusLabel: '',
      avatarTone: 'brand',
      direction: 'row',
      size: 'md',
      avatarSize: 'md',
      avatarShape: 'circle',
    },
  },
  designDefaultArgs: {
    action1Variant: 'ghost',
    action2Variant: 'primary',
    avatarQuietStatus: false,
    avatarStatus: '',
    avatarTone: 'brand',
    direction: 'row',
    size: 'md',
    avatarSize: 'md',
    avatarShape: 'circle',
    verified: true,
  },
};
export default meta;

export const Default = {
  name: 'UserBlock',
  render: (args: Args) => (
    <SgDsLibraryUserBlock
      avatarAlt={asText(args.avatarAlt, 'Hailey Luna')}
      avatarQuietStatus={asBoolean(args.avatarQuietStatus)}
      avatarShape={asOption(args.avatarShape, AVATAR_SHAPES, 'circle')}
      avatarSize={asOption(args.avatarSize, AVATAR_SIZES, 'md')}
      avatarSrc={asText(args.avatarSrc, '') || undefined}
      avatarStatus={resolveAvatarStatus(args.avatarStatus)}
      avatarStatusLabel={asText(args.avatarStatusLabel, '') || undefined}
      avatarTone={asOption(args.avatarTone, AVATAR_TONES, 'brand')}
      direction={asOption(args.direction, DIRECTIONS, 'row')}
      initials={asText(args.initials, 'U')}
      meta={asText(args.meta)}
      name={asText(args.name, 'User')}
      action1Label={asText(args.action1Label)}
      action1Variant={asOption(args.action1Variant, BUTTON_VARIANTS, 'ghost')}
      action1Icon={asText(args.action1Icon)}
      action2Label={asText(args.action2Label)}
      action2Variant={asOption(args.action2Variant, BUTTON_VARIANTS, 'primary')}
      action2Icon={asText(args.action2Icon)}
      size={asOption(args.size, USER_BLOCK_SIZES, 'md')}
      verified={asBoolean(args.verified)}
    />
  ),
};

export const Stacked = { args: { name: 'NeoVoice', initials: 'NV', meta: 'LIVE', avatarStatus: 'live', direction: 'stack', size: 'sm' }, render: Default.render };

function asBoolean(value: unknown): boolean {
  return typeof value === 'boolean' ? value : value === 'true';
}

function resolveAvatarStatus(value: unknown) {
  return typeof value === 'string' && value !== '' && (AVATAR_STATUSES as readonly string[]).includes(value)
    ? value as Exclude<typeof AVATAR_STATUSES[number], ''>
    : undefined;
}

function asOption<T extends string>(value: unknown, options: readonly T[], fallback: T): T {
  return typeof value === 'string' && options.includes(value as T) ? (value as T) : fallback;
}

function asText(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}
