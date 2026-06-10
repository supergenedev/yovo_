import { SgDsLibraryInput } from './Input';

type Args = Record<string, boolean | string>;

const SIZES = ['sm', 'md', 'lg'] as const;
const SHAPES = ['default', 'pill'] as const;
const STATES = ['default', 'error', 'success'] as const;
const TYPES = ['text', 'search', 'email', 'password', 'url', 'tel', 'number'] as const;
const LABEL_POSITIONS = ['outside', 'inside'] as const;

const meta = {
  title: 'SgDsLibrary/Input',
  component: SgDsLibraryInput,
  args: {
    label: '',
    description: '',
    placeholder: 'Search workspace',
    defaultValue: '',
    leadingIcon: '',
    trailingIcon: '',
    disabled: false,
    readOnly: false,
    clearable: false,
    type: 'text',
    state: 'default',
    labelPosition: 'outside',
    size: 'md',
    shape: 'default',
  },
  argTypes: {
    label: { control: 'text' },
    description: { control: 'text' },
    placeholder: { control: 'text' },
    defaultValue: { control: 'text' },
    leadingIcon: { control: 'icon' },
    trailingIcon: { control: 'icon' },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    clearable: { control: 'boolean' },
    type: { control: 'select', options: TYPES },
    state: { control: 'select', options: STATES },
    labelPosition: { control: 'select', options: LABEL_POSITIONS },
    size: { control: 'select', options: SIZES },
    shape: { control: 'select', options: SHAPES },
  },
  sourceInsert: {
    props: {
      label: '',
      description: '',
      placeholder: 'Search workspace',
      defaultValue: '',
      leadingIcon: '',
      trailingIcon: '',
      disabled: false,
      readOnly: false,
      clearable: false,
      type: 'text',
      state: 'default',
      labelPosition: 'outside',
      size: 'md',
      shape: 'default',
    },
  },
};
export default meta;

export const Default = {
  name: 'Input',
  render: (args: Args) => (
    <SgDsLibraryInput
      key={`${asText(args.type)}-${asText(args.defaultValue)}-${asText(args.placeholder)}`}
      clearable={asBoolean(args.clearable)}
      defaultValue={asText(args.defaultValue)}
      description={asText(args.description) || undefined}
      disabled={asBoolean(args.disabled)}
      label={asText(args.label) || undefined}
      labelPosition={asOption(args.labelPosition, LABEL_POSITIONS, 'outside')}
      leadingIcon={asText(args.leadingIcon) || undefined}
      placeholder={asText(args.placeholder, 'Search workspace')}
      readOnly={asBoolean(args.readOnly)}
      shape={asOption(args.shape, SHAPES, 'default')}
      size={asOption(args.size, SIZES, 'md')}
      state={asOption(args.state, STATES, 'default')}
      trailingIcon={asText(args.trailingIcon) || undefined}
      type={asOption(args.type, TYPES, 'text')}
    />
  ),
};

export const Search = {
  args: { placeholder: 'Search creators', leadingIcon: 'search', clearable: true, type: 'search', shape: 'pill' },
  render: Default.render,
};
export const Error = {
  args: { label: 'Email', description: '올바른 이메일 주소를 입력해 주세요.', defaultValue: 'not-an-email', type: 'email', state: 'error' },
  render: Default.render,
};
export const InsideLabel = {
  args: { label: 'Search', description: 'Creator, topic, tag', placeholder: 'Search workspace', leadingIcon: 'search', labelPosition: 'inside' },
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
