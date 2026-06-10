import { SgDsLibraryStat } from './Stat';
import { SgDsLibraryStatList } from './StatList';

type Args = Record<string, boolean | string>;

const TONES = ['default', 'brand'] as const;

const meta = {
  title: 'SgDsLibrary/Stat',
  component: SgDsLibraryStat,
  args: {
    label: 'plays',
    value: '124K',
    icon: '',
    tone: 'default',
  },
  argTypes: {
    label: { control: 'text' },
    value: { control: 'text' },
    icon: { control: 'icon' },
    tone: { control: 'select', options: TONES },
  },
  sourceInsert: {
    props: {
      label: 'plays',
      value: '124K',
      icon: '',
      tone: 'default',
    },
  },
};
export default meta;

export const Default = {
  name: 'Stat',
  render: (args: Args) => (
    <SgDsLibraryStatList>
      <SgDsLibraryStat
        icon={asText(args.icon) || undefined}
        label={asText(args.label, 'plays')}
        tone={asOption(args.tone, TONES, 'default')}
        value={asText(args.value, '124K')}
      />
    </SgDsLibraryStatList>
  ),
};

export const Brand = {
  args: { label: 'supporters', value: '1,840', icon: 'gem', tone: 'brand' },
  render: Default.render,
};

function asOption<T extends string>(value: unknown, options: readonly T[], fallback: T): T {
  return typeof value === 'string' && options.includes(value as T) ? (value as T) : fallback;
}

function asText(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}
