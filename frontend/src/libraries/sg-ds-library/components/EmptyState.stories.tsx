import { SgDsLibraryEmptyState } from './EmptyState';

type Args = Record<string, boolean | string>;

const SIZES = ['sm', 'md', 'lg'] as const;

const meta = {
  title: 'SgDsLibrary/EmptyState',
  component: SgDsLibraryEmptyState,
  args: {
    title: 'No projects yet',
    body: 'Create a project and reusable components will appear here.',
    actionLabel: 'Create first project',
    artIcon: 'inbox',
    showArt: true,
    size: 'md',
  },
  argTypes: {
    title: { control: 'text' },
    body: { control: 'text' },
    actionLabel: { control: 'text' },
    artIcon: { control: 'icon' },
    showArt: { control: 'boolean' },
    size: { control: 'select', options: SIZES },
  },
  sourceInsert: {
    props: {
      title: 'No projects yet',
      body: 'Create a project and reusable components will appear here.',
      actionLabel: 'Create first project',
      artIcon: 'inbox',
      showArt: true,
      size: 'md',
    },
  },
};
export default meta;

export const Default = {
  name: 'EmptyState',
  render: (args: Args) => (
    <SgDsLibraryEmptyState
      actionLabel={asText(args.actionLabel, 'Create first project')}
      artIcon={asText(args.artIcon, 'inbox')}
      body={asText(args.body, 'Create a project and reusable components will appear here.')}
      showArt={asBoolean(args.showArt)}
      size={asOption(args.size, SIZES, 'md')}
      title={asText(args.title, 'No projects yet')}
    />
  ),
};

function asBoolean(value: unknown): boolean {
  return value === true || value === 'true';
}

function asOption<T extends string>(value: unknown, options: readonly T[], fallback: T): T {
  return typeof value === 'string' && options.includes(value as T) ? (value as T) : fallback;
}

function asText(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}
