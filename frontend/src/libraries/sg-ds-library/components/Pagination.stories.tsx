import { SgDsLibraryPagination } from './Pagination';

type Args = Record<string, boolean | string>;

const SIZES = ['sm', 'md', 'lg'] as const;

const meta = {
  title: 'SgDsLibrary/Pagination',
  component: SgDsLibraryPagination,
};
export default meta;

export const Default = {
  name: 'Pagination',
  args: {
    currentPage: '3',
    size: 'md',
  },
  argTypes: {
    currentPage: { control: 'text' },
    size: { control: 'select', options: SIZES },
  },
  sourceInsert: {
    props: {
      currentPage: '3',
      size: 'md',
    },
  },
  render: (args: Args) => (
    <SgDsLibraryPagination
      currentPage={Number(asText(args.currentPage, '3')) || 3}
      size={asOption(args.size, SIZES, 'md')}
    />
  ),
};

function asOption<T extends string>(value: unknown, options: readonly T[], fallback: T): T {
  return typeof value === 'string' && options.includes(value as T) ? (value as T) : fallback;
}

function asText(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}
