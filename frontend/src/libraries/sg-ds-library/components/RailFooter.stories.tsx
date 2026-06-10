import { SgDsLibraryRailFooter } from './RailFooter';

type Args = Record<string, string>;

const DEFAULT_PROPS = {
  primaryLabel: 'Dark mode',
  primaryIcon: 'moon',
  secondaryLabel: '',
  secondaryIcon: 'settings',
} as const;

const meta = {
  title: 'SgDsLibrary/RailFooter',
  component: SgDsLibraryRailFooter,
  args: DEFAULT_PROPS,
  argTypes: {
    primaryLabel: { control: 'text' },
    primaryIcon: { control: 'icon' },
    secondaryLabel: { control: 'text' },
    secondaryIcon: { control: 'icon' },
  },
  sourceInsert: {
    props: DEFAULT_PROPS,
  },
};
export default meta;

export const Default = {
  name: 'RailFooter',
  render: (args: Args) => (
    <SgDsLibraryRailFooter
      primaryLabel={asText(args.primaryLabel, 'Dark mode')}
      primaryIcon={asText(args.primaryIcon, 'moon')}
      secondaryLabel={asText(args.secondaryLabel, '')}
      secondaryIcon={asText(args.secondaryIcon, 'settings')}
    />
  ),
};

function asText(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}
