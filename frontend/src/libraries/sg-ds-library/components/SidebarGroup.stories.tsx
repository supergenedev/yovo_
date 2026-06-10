import { SgDsLibrarySidebarGroup, SgDsLibrarySidebarItem } from './Sidebar';

type Args = Record<string, boolean | string>;

const DEFAULT_PROPS = {
  label: 'Browse',
  count: '',
  seeAllLabel: '',
  seeAllIcon: 'chevron-right',
} as const;

const meta = {
  title: 'SgDsLibrary/SidebarGroup',
  component: SgDsLibrarySidebarGroup,
  args: DEFAULT_PROPS,
  argTypes: {
    label: { control: 'text' },
    count: { control: 'text' },
    seeAllLabel: { control: 'text' },
    seeAllIcon: { control: 'icon' },
  },
  sourceInsert: {
    imports: [
      { names: ['SgDsLibrarySidebarItem'], sourceFile: 'sg-ds-library-preset/components/Sidebar.tsx' },
    ],
    jsxChildren: '<SgDsLibrarySidebarItem icon="house" label="Home" />',
    props: DEFAULT_PROPS,
  },
};
export default meta;

export const Default = {
  name: 'SidebarGroup',
  render: (args: Args) => (
    <div style={{ width: '17rem' }}>
      <SgDsLibrarySidebarGroup
        label={asText(args.label, 'Browse')}
        count={asText(args.count) || undefined}
        seeAllLabel={asText(args.seeAllLabel) || undefined}
        seeAllIcon={asText(args.seeAllIcon) || undefined}
      >
        <SgDsLibrarySidebarItem active icon="house" label="Home" description="For you" />
        <SgDsLibrarySidebarItem icon="play" label="Watch" description="Continue" />
        <SgDsLibrarySidebarItem icon="library" label="Library" badge="12" />
      </SgDsLibrarySidebarGroup>
    </div>
  ),
};

function asText(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}
