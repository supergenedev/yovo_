import {
  SgDsLibraryBreadcrumb,
  SgDsLibraryBreadcrumbCurrent,
  SgDsLibraryBreadcrumbItem,
  SgDsLibraryBreadcrumbLink,
} from './Breadcrumb';

type Args = Record<string, string>;

const SEPARATORS = ['slash', 'chevron', 'dot'] as const;
const SIZES = ['sm', 'md', 'lg'] as const;

const meta = {
  title: 'SgDsLibrary/Breadcrumb',
  component: SgDsLibraryBreadcrumb,
};
export default meta;

export const Default = {
  name: 'Breadcrumb',
  args: {
    parent: 'Products',
    root: 'Home',
    current: 'Headphones',
    size: 'md',
    separator: 'slash',
  },
  argTypes: {
    parent: { control: 'text' },
    root: { control: 'text' },
    current: { control: 'text' },
    size: { control: 'select', options: SIZES },
    separator: { control: 'select', options: SEPARATORS },
  },
  sourceInsert: {
    props: {
      parent: 'Products',
      root: 'Home',
      current: 'Headphones',
      size: 'md',
      separator: 'slash',
    },
  },
  render: (args: Args) => (
    <SgDsLibraryBreadcrumb
      items={[
        { href: '#', label: asText(args.root, 'Home') },
        { href: '#', label: asText(args.parent, 'Products') },
        { label: asText(args.current, 'Headphones') },
      ]}
      separator={asOption(args.separator, SEPARATORS, 'slash')}
      size={asOption(args.size, SIZES, 'md')}
    />
  ),
};

export const BreadcrumbItem = {
  args: { children: 'Library' },
  argTypes: { children: { control: 'text' } },
  sourceInsert: {
    props: { children: 'Library' },
  },
  render: (args: Args) => (
    <ol className="sg-ds-library-scope breadcrumb-list">
      <SgDsLibraryBreadcrumbItem>
        <SgDsLibraryBreadcrumbLink href="#">{asText(args.children, 'Library')}</SgDsLibraryBreadcrumbLink>
      </SgDsLibraryBreadcrumbItem>
    </ol>
  ),
};

export const BreadcrumbLink = {
  args: {
    children: 'Products',
    href: '#',
  },
  argTypes: {
    children: { control: 'text' },
    href: { control: 'text' },
  },
  sourceInsert: {
    props: {
      children: 'Products',
      href: '#',
    },
  },
  render: (args: Args) => (
    <SgDsLibraryBreadcrumbLink href={asText(args.href, '#')}>
      {asText(args.children, 'Products')}
    </SgDsLibraryBreadcrumbLink>
  ),
};

export const BreadcrumbCurrent = {
  args: { children: 'Headphones' },
  argTypes: { children: { control: 'text' } },
  sourceInsert: {
    props: { children: 'Headphones' },
  },
  render: (args: Args) => (
    <SgDsLibraryBreadcrumbCurrent>{asText(args.children, 'Headphones')}</SgDsLibraryBreadcrumbCurrent>
  ),
};

function asOption<T extends string>(value: unknown, options: readonly T[], fallback: T): T {
  return typeof value === 'string' && options.includes(value as T) ? (value as T) : fallback;
}

function asText(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}
