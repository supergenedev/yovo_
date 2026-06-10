import { SgDsLibraryChip } from './Chip';

type Args = Record<string, boolean | string>;

const meta = {
  title: 'SgDsLibrary/Chip',
  component: SgDsLibraryChip,
  args: {
    children: '한국어',
    icon: '',
    removable: false,
    tone: 'neutral',
    variant: 'default',
    size: 'md',
  },
  argTypes: {
    children: { control: 'text' },
    icon: { control: 'icon' },
    removable: { control: 'boolean' },
    tone: { control: 'select', options: ['neutral', 'brand'] },
    variant: { control: 'select', options: ['default', 'outline'] },
    size: { control: 'select', options: ['sm', 'md'] },
  },
  sourceInsert: {
    props: {
      children: '한국어',
      icon: '',
      removable: false,
      tone: 'neutral',
      variant: 'default',
      size: 'md',
    },
  },
};
export default meta;

export const Default = {
  name: 'Chip',
  render: (args: Args) => (
    <SgDsLibraryChip
      icon={asText(args.icon) || undefined}
      removable={asBoolean(args.removable)}
      size={asOption(args.size, ['sm', 'md'], 'md')}
      tone={asOption(args.tone, ['neutral', 'brand'], 'neutral')}
      variant={asOption(args.variant, ['default', 'outline'], 'default')}
    >
      {asText(args.children, '한국어')}
    </SgDsLibraryChip>
  ),
};

export const Brand = { args: { children: '500 crd 보상', icon: 'gem', tone: 'brand' }, render: Default.render };
export const Removable = { args: { children: '차분한 톤', removable: true }, render: Default.render };

function asBoolean(value: unknown): boolean {
  return typeof value === 'boolean' ? value : value === 'true';
}

function asOption<T extends string>(value: unknown, options: readonly T[], fallback: T): T {
  return typeof value === 'string' && options.includes(value as T) ? (value as T) : fallback;
}

function asText(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}
