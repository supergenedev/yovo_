import { SgDsLibraryLink } from './Link';

type Args = Record<string, string>;

const meta = {
  title: 'SgDsLibrary/Link',
  component: SgDsLibraryLink,
  args: {
    children: 'Read more',
    href: '#',
    variant: 'default',
    size: 'md',
    tailIcon: '',
  },
  argTypes: {
    children: { control: 'text' },
    href: { control: 'text' },
    variant: { control: 'select', options: ['default', 'subtle', 'standalone'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    tailIcon: { name: 'Tail icon', control: 'icon' },
  },
  sourceInsert: {
    props: {
      children: 'Read more',
      href: '#',
      variant: 'default',
      size: 'md',
      tailIcon: '',
    },
  },
};
export default meta;

export const Default = {
  name: 'Link',
  render: (args: Args) => (
    <SgDsLibraryLink
      href={asText(args.href, '#')}
      size={asOption(args.size, ['sm', 'md', 'lg'], 'md')}
      tailIcon={asText(args.tailIcon)}
      variant={asOption(args.variant, ['default', 'subtle', 'standalone'], 'default')}
    >
      {asText(args.children, 'Read more')}
    </SgDsLibraryLink>
  ),
};

export const Standalone = {
  args: { children: 'Continue to checkout →', variant: 'standalone' },
  render: Default.render,
};

function asOption<T extends string>(value: unknown, options: readonly T[], fallback: T): T {
  return typeof value === 'string' && options.includes(value as T) ? (value as T) : fallback;
}

function asText(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}
