import { SgDsLibrarySelect } from './Select';

type Args = Record<string, boolean | string>;

const SIZES = ['sm', 'md', 'lg'] as const;
const STATES = ['default', 'error', 'success'] as const;
const VALUES = ['', 'free', 'creator', 'studio'] as const;

const meta = {
  title: 'SgDsLibrary/Select',
  component: SgDsLibrarySelect,
  args: {
    placeholder: 'Choose a plan',
    defaultValue: 'creator',
    disabled: false,
    state: 'default',
    size: 'md',
  },
  argTypes: {
    placeholder: { control: 'text' },
    defaultValue: { control: 'select', options: VALUES },
    disabled: { control: 'boolean' },
    state: { control: 'select', options: STATES },
    size: { control: 'select', options: SIZES },
  },
  sourceInsert: {
    props: {
      placeholder: 'Choose a plan',
      defaultValue: 'creator',
      disabled: false,
      state: 'default',
      size: 'md',
    },
  },
};
export default meta;

export const Default = {
  name: 'Select',
  render: (args: Args) => (
    <SgDsLibrarySelect
      key={`${asText(args.defaultValue)}-${asText(args.placeholder)}`}
      defaultValue={asOption(args.defaultValue, VALUES, 'creator')}
      disabled={asBoolean(args.disabled)}
      placeholder={asText(args.placeholder, 'Choose a plan')}
      size={asOption(args.size, SIZES, 'md')}
      state={asOption(args.state, STATES, 'default')}
    />
  ),
};

export const Error = {
  args: { defaultValue: '', state: 'error' },
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
