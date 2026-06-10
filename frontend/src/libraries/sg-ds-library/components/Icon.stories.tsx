import { SgDsLibraryIcon } from './Icon';

type Args = Record<string, number | string>;

const meta = {
  title: 'SgDsLibrary/Icon',
  component: SgDsLibraryIcon,
  args: {
    name: 'sparkles',
    color: '',
    strokeWidth: 2.25,
    size: 24,
  },
  argTypes: {
    name: { control: 'icon' },
    color: { name: 'Color', control: 'text' },
    strokeWidth: { control: 'number' },
    size: { control: 'number' },
  },
  sourceInsert: {
    props: {
      name: 'sparkles',
      color: '',
      strokeWidth: '2.25',
      size: '24',
    },
  },
};
export default meta;

export const Default = {
  name: 'Icon',
  render: (args: Args) => (
    <div className="sg-ds-library-scope" style={{ color: 'var(--s-text-primary)' }}>
      <SgDsLibraryIcon
        color={asText(args.color)}
        name={asText(args.name, 'sparkles')}
        size={asNumber(args.size, 24)}
        strokeWidth={asNumber(args.strokeWidth, 2.25)}
      />
    </div>
  ),
};

export const Check = { args: { name: 'check', size: 24 }, render: Default.render };
export const Bell = { args: { name: 'bell', size: 24 }, render: Default.render };
export const Search = { args: { name: 'search', size: 24 }, render: Default.render };
export const Brand = { args: { name: 'sparkles', color: 'var(--s-text-brand)', size: 24 }, render: Default.render };

function asNumber(value: unknown, fallback: number): number {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string') {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return fallback;
}

function asText(value: unknown, fallback = ''): string {
  return typeof value === 'string' && value.trim() ? value : fallback;
}
