import { SgDsLibraryTab, SgDsLibraryTabs, SgDsLibraryTabsBar, SgDsLibraryTabsList, SgDsLibraryTabsPanel } from './Tabs';
import { SgDsLibraryButton } from './Button';

type Args = Record<string, boolean | string>;

const SIZES = ['sm', 'md', 'lg'] as const;
const VARIANTS = ['underline', 'pill'] as const;

const meta = {
  title: 'SgDsLibrary/Tabs',
  component: SgDsLibraryTabs,
};
export default meta;

export const Default = {
  name: 'Tabs',
  args: {
    variant: 'underline',
    size: 'md',
    sticky: false,
    stickyOffset: '',
  },
  argTypes: {
    variant: { control: 'select', options: VARIANTS },
    size: { control: 'select', options: SIZES },
    sticky: { control: 'boolean' },
    stickyOffset: { name: 'Sticky offset', control: 'text', when: { key: 'sticky', value: true } },
  },
  sourceInsert: {
    props: {
      variant: 'underline',
      size: 'md',
      sticky: false,
      stickyOffset: '',
    },
  },
  render: (args: Args) => (
    <SgDsLibraryTabs
      size={asOption(args.size, SIZES, 'md')}
      sticky={asBoolean(args.sticky)}
      stickyOffset={asText(args.stickyOffset)}
      variant={asOption(args.variant, VARIANTS, 'underline')}
    />
  ),
};

export const TabsBar = {
  name: 'TabsBar',
  args: {
    label: 'Views',
  },
  argTypes: {
    label: { control: 'text' },
  },
  sourceInsert: {
    props: {
      label: 'Views',
    },
  },
  render: (args: Args) => (
    <div className="sg-ds-library-scope tabs" data-size="md" data-variant="underline" style={{ width: '420px' }}>
      <SgDsLibraryTabsBar>
        <SgDsLibraryTabsList label={asText(args.label, 'Views')}>
          <SgDsLibraryTab selected>전체</SgDsLibraryTab>
          <SgDsLibraryTab>비디오</SgDsLibraryTab>
          <SgDsLibraryTab>오디오</SgDsLibraryTab>
          <SgDsLibraryTab>이미지</SgDsLibraryTab>
          <SgDsLibraryTab>문서</SgDsLibraryTab>
          <SgDsLibraryTab>북마크</SgDsLibraryTab>
          <SgDsLibraryTab>아카이브</SgDsLibraryTab>
        </SgDsLibraryTabsList>
        <SgDsLibraryButton variant="ghost" size="sm" leadingIcon="arrow-down-up" iconOnly aria-label="정렬" />
        <SgDsLibraryButton variant="ghost" size="sm" leadingIcon="settings-2" iconOnly aria-label="표시 설정" />
      </SgDsLibraryTabsBar>
    </div>
  ),
};

export const TabsList = {
  args: {
    label: 'Views',
  },
  argTypes: {
    label: { control: 'text' },
  },
  sourceInsert: {
    props: {
      label: 'Views',
    },
  },
  render: (args: Args) => (
    <div className="sg-ds-library-scope tabs" data-size="md" data-variant="underline">
      <SgDsLibraryTabsList label={asText(args.label, 'Views')}>
        <SgDsLibraryTab selected>Overview</SgDsLibraryTab>
        <SgDsLibraryTab>Activity</SgDsLibraryTab>
      </SgDsLibraryTabsList>
    </div>
  ),
};

const BADGE_VARIANTS = ['info', 'success', 'warning', 'danger', 'neutral'] as const;

export const Tab = {
  args: {
    children: 'Overview',
    leadingIcon: '',
    trailingIcon: '',
    badge: false,
    badgeText: '',
    badgeVariant: 'danger',
    selected: true,
  },
  argTypes: {
    children: { control: 'text' },
    leadingIcon: { control: 'icon' },
    trailingIcon: { control: 'icon' },
    badge: { control: 'boolean' },
    badgeText: { control: 'text' },
    badgeVariant: { control: 'select', options: BADGE_VARIANTS },
    selected: { control: 'boolean' },
  },
  sourceInsert: {
    props: {
      children: 'Overview',
      leadingIcon: '',
      trailingIcon: '',
      badge: false,
      badgeText: '',
      badgeVariant: 'danger',
      selected: true,
    },
  },
  render: (args: Args) => (
    <div className="sg-ds-library-scope tabs" data-size="md" data-variant="underline">
      <SgDsLibraryTab
        badge={asBoolean(args.badge)}
        badgeText={asText(args.badgeText)}
        badgeVariant={asOption(args.badgeVariant, BADGE_VARIANTS, 'danger')}
        leadingIcon={asText(args.leadingIcon) || undefined}
        selected={asBoolean(args.selected)}
        trailingIcon={asText(args.trailingIcon) || undefined}
      >
        {asText(args.children, 'Overview')}
      </SgDsLibraryTab>
    </div>
  ),
};

export const TabsPanel = {
  args: {
    children: 'Panel content',
    selected: true,
  },
  argTypes: {
    children: { control: 'text' },
    selected: { control: 'boolean' },
  },
  sourceInsert: {
    props: {
      children: 'Panel content',
      selected: true,
    },
  },
  render: (args: Args) => (
    <SgDsLibraryTabsPanel selected={asBoolean(args.selected)}>
      {asText(args.children, 'Panel content')}
    </SgDsLibraryTabsPanel>
  ),
};

function asOption<T extends string>(value: unknown, options: readonly T[], fallback: T): T {
  return typeof value === 'string' && options.includes(value as T) ? (value as T) : fallback;
}

function asBoolean(value: unknown): boolean {
  return value === true || value === 'true';
}

function asText(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}
