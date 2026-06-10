import { SgDsLibraryTooltip } from './Tooltip';

type Args = Record<string, boolean | string>;

const meta = {
  title: 'SgDsLibrary/Tooltip',
  component: SgDsLibraryTooltip,
  args: {
    tip: 'Save changes (Ctrl+S)',
    trigger: 'Hover me',
    arrow: true,
    placement: 'top',
  },
  argTypes: {
    tip: { control: 'text' },
    trigger: { control: 'text' },
    arrow: { control: 'boolean' },
    placement: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
  },
  sourceInsert: {
    props: {
      tip: 'Save changes (Ctrl+S)',
      trigger: 'Hover me',
      arrow: true,
      placement: 'top',
    },
  },
};
export default meta;

export const Default = {
  name: 'Tooltip',
  render: (args: Args) => (
    <SgDsLibraryTooltip
      arrow={asBoolean(args.arrow)}
      placement={asOption(args.placement, ['top', 'bottom', 'left', 'right'], 'top')}
      tip={asText(args.tip, 'Tooltip text')}
      trigger={asText(args.trigger, 'Hover me')}
    />
  ),
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
