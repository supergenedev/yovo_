import { SgDsLibrarySidebarFooter } from './Sidebar';

type Args = Record<string, string>;

const DEFAULT_PROPS = {
  primaryLabel: 'Dark mode',
  primaryIcon: 'moon',
  primaryHref: '',
  secondaryLabel: 'Settings',
  secondaryIcon: 'settings',
  secondaryHref: '',
} as const;

const meta = {
  title: 'SgDsLibrary/SidebarFooter',
  component: SgDsLibrarySidebarFooter,
  args: DEFAULT_PROPS,
  argTypes: {
    primaryLabel: { control: 'text' },
    primaryIcon: { control: 'icon' },
    primaryHref: { control: 'text' },
    secondaryLabel: { control: 'text' },
    secondaryIcon: { control: 'icon' },
    secondaryHref: { control: 'text' },
  },
  sourceInsert: {
    props: DEFAULT_PROPS,
  },
};
export default meta;

export const Default = {
  name: 'SidebarFooter',
  render: (args: Args) => (
    <div style={{ width: '17rem' }}>
      <SgDsLibrarySidebarFooter
        primaryLabel={asText(args.primaryLabel, 'Dark mode')}
        primaryIcon={asText(args.primaryIcon, 'moon')}
        primaryHref={asText(args.primaryHref) || undefined}
        secondaryLabel={asText(args.secondaryLabel, 'Settings')}
        secondaryIcon={asText(args.secondaryIcon, 'settings')}
        secondaryHref={asText(args.secondaryHref) || undefined}
      />
    </div>
  ),
};

function asText(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}
