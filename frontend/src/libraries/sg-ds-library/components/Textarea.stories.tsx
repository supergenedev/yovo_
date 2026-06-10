import { SgDsLibraryTextarea } from './Textarea';

type Args = Record<string, boolean | string>;

const SIZES = ['sm', 'md', 'lg'] as const;
const STATES = ['default', 'error', 'success'] as const;

const meta = {
  title: 'SgDsLibrary/Textarea',
  component: SgDsLibraryTextarea,
  args: {
    placeholder: 'Write a note',
    defaultValue: 'Looks good for launch.',
    disabled: false,
    readOnly: false,
    state: 'default',
    size: 'md',
    rows: '4',
  },
  argTypes: {
    placeholder: { control: 'text' },
    defaultValue: { control: 'text' },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    state: { control: 'select', options: STATES },
    size: { control: 'select', options: SIZES },
    rows: { control: { type: 'number', min: 2, max: 12, step: 1 } },
  },
  sourceInsert: {
    props: {
      placeholder: 'Write a note',
      defaultValue: 'Looks good for launch.',
      disabled: false,
      readOnly: false,
      state: 'default',
      size: 'md',
      rows: '4',
    },
  },
};
export default meta;

export const Default = {
  name: 'Textarea',
  render: (args: Args) => (
    <SgDsLibraryTextarea
      key={`${asText(args.defaultValue)}-${asText(args.rows)}`}
      defaultValue={asText(args.defaultValue)}
      disabled={asBoolean(args.disabled)}
      placeholder={asText(args.placeholder, 'Write a note')}
      readOnly={asBoolean(args.readOnly)}
      rows={asText(args.rows, '4')}
      size={asOption(args.size, SIZES, 'md')}
      state={asOption(args.state, STATES, 'default')}
    />
  ),
};

export const Error = {
  args: { defaultValue: 'Too short', state: 'error' },
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
