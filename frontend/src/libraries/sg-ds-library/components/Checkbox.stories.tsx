import { SgDsLibraryCheckbox } from './Checkbox';

type Args = Record<string, boolean | string>;

const SIZES = ['sm', 'md', 'lg'] as const;

const meta = {
  title: 'SgDsLibrary/Checkbox',
  component: SgDsLibraryCheckbox,
  args: {
    label: 'Email me product updates',
    defaultChecked: true,
    indeterminate: false,
    disabled: false,
    size: 'md',
  },
  argTypes: {
    label: { control: 'text' },
    defaultChecked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
    size: { control: 'select', options: SIZES },
  },
  sourceInsert: {
    props: {
      label: 'Email me product updates',
      defaultChecked: true,
      indeterminate: false,
      disabled: false,
      size: 'md',
    },
  },
};
export default meta;

export const Default = {
  name: 'Checkbox',
  render: (args: Args) => (
    <SgDsLibraryCheckbox
      key={`${asBoolean(args.defaultChecked)}-${asBoolean(args.indeterminate)}-${asText(args.label)}`}
      defaultChecked={asBoolean(args.defaultChecked)}
      disabled={asBoolean(args.disabled)}
      indeterminate={asBoolean(args.indeterminate)}
      label={asText(args.label, 'Email me product updates')}
      size={asOption(args.size, SIZES, 'md')}
    />
  ),
};

export const Indeterminate = {
  args: { label: 'Some items selected', defaultChecked: false, indeterminate: true },
  render: Default.render,
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
