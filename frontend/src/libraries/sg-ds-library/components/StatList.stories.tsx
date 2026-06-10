import { SgDsLibraryStatList } from './StatList';

type Args = Record<string, boolean | string>;

const meta = {
  title: 'SgDsLibrary/StatList',
  component: SgDsLibraryStatList,
  args: { brandStat: true, size: 'md' },
  argTypes: {
    brandStat: { control: 'boolean' },
    size: { control: 'select', options: ['sm', 'md'] },
  },
};
export default meta;

export const Default = {
  name: 'StatList',
  sourceInsert: {
    props: { brandStat: true, size: 'md' },
  },
  render: (args: Args) => (
    <SgDsLibraryStatList
      brandStat={asBoolean(args.brandStat)}
      size={asOption(args.size, ['sm', 'md'], 'md')}
    />
  ),
};

function asBoolean(value: unknown): boolean {
  return typeof value === 'boolean' ? value : value === 'true';
}

function asOption<T extends string>(value: unknown, options: readonly T[], fallback: T): T {
  return typeof value === 'string' && options.includes(value as T) ? (value as T) : fallback;
}
