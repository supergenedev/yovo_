import {
  SgDsLibraryCollabCreditItem,
  SgDsLibraryCollabCredits,
  SgDsLibraryCollabCreditsGroup,
} from './CollabCredits';

type Args = Record<string, boolean | string>;

const TONES = ['neutral', 'brand', 'teal', 'amber', 'pink', 'blue'] as const;

const meta = {
  title: 'SgDsLibrary/CollabCredits',
  component: SgDsLibraryCollabCredits,
};
export default meta;

const ITEM_ARGS = {
  name: 'Hailey Luna',
  credit: '+820 crd',
  role: 'VOICE',
  initials: 'HL',
  verified: true,
  avatarTone: 'brand',
};

const ITEM_ARG_TYPES = {
  name: { control: 'text' },
  credit: { control: 'text' },
  role: { control: 'text' },
  initials: { control: 'text' },
  verified: { control: 'boolean' },
  avatarTone: { control: 'select', options: TONES },
};

const TITLE_ARG_TYPES = {
  title: { control: 'text' },
};

export const Default = {
  name: 'CollabCredits',
  args: { title: 'Collaborators' },
  argTypes: TITLE_ARG_TYPES,
  sourceInsert: {
    props: { title: 'Collaborators' },
  },
  render: (args: Args) => <SgDsLibraryCollabCredits title={asText(args.title, 'Collaborators')} />,
};

export const CollabCreditsGroup = {
  name: 'CollabCreditsGroup',
  args: { title: 'Collaborators', ...ITEM_ARGS },
  argTypes: { ...TITLE_ARG_TYPES, ...ITEM_ARG_TYPES },
  sourceInsert: {
    props: { title: 'Collaborators', ...ITEM_ARGS },
  },
  render: (args: Args) => (
    <SgDsLibraryCollabCreditsGroup title={asText(args.title, 'Collaborators')}>
      <SgDsLibraryCollabCreditItem
        avatarTone={asOption(args.avatarTone, TONES, 'brand')}
        credit={asText(args.credit, '+820 crd')}
        initials={asText(args.initials, 'HL')}
        name={asText(args.name, 'Hailey Luna')}
        role={asText(args.role, 'VOICE')}
        verified={asBoolean(args.verified)}
      />
    </SgDsLibraryCollabCreditsGroup>
  ),
};

export const CollabCreditItem = {
  name: 'CollabCreditItem',
  args: ITEM_ARGS,
  argTypes: ITEM_ARG_TYPES,
  sourceInsert: {
    props: ITEM_ARGS,
  },
  render: (args: Args) => (
    <ul className="sg-ds-library-scope collab-credits" aria-label="Collaborator item preview">
      <SgDsLibraryCollabCreditItem
        avatarTone={asOption(args.avatarTone, TONES, 'brand')}
        credit={asText(args.credit, '+820 crd')}
        initials={asText(args.initials, 'HL')}
        name={asText(args.name, 'Hailey Luna')}
        role={asText(args.role, 'VOICE')}
        verified={asBoolean(args.verified)}
      />
    </ul>
  ),
};

export const CompactCollab = {
  render: () => (
    <SgDsLibraryCollabCredits
      title="Featured collaborators"
      items={[
        { avatarTone: 'pink', credit: '+1.2k crd', initials: 'MK', name: 'Mika Studio', role: 'IMG', verified: true },
        { avatarTone: 'blue', credit: '+640 crd', initials: 'AR', name: 'Arin', role: 'CUT' },
      ]}
    />
  ),
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
