import { SgDsLibrarySidebar, SgDsLibrarySidebarFollowRow, SgDsLibrarySidebarFooter, SgDsLibrarySidebarGroup, SgDsLibrarySidebarItem } from './Sidebar';
import { SgDsLibraryUserBlock } from './UserBlock';

type Args = Record<string, boolean | string>;

const BACKGROUNDS = ['none', 'surface', 'soft', 'subtle', 'muted', 'inverse', 'accent', 'glass'] as const;
const COLLAPSED_HEADER_DISPLAYS = ['symbol', 'menu-button'] as const;
const DRAWER_PLACEMENTS = ['left', 'right'] as const;
const EXPANDED_BRAND_DISPLAYS = ['symbol-logo', 'symbol', 'logo'] as const;
const IMAGE_FITS = ['contain', 'cover', 'fill', 'none', 'scale-down'] as const;
const IMAGE_POSITIONS = ['center', 'left center', 'right center', 'top center', 'bottom center', 'left top', 'left bottom', 'right top', 'right bottom'] as const;
const PRESENTATIONS = ['sidebar', 'drawer'] as const;
const RADII = ['none', 'sm', 'md', 'lg'] as const;
const TOGGLE_VARIANTS = ['ghost', 'secondary', 'soft'] as const;
const WIDTHS = ['sm', 'md', 'lg'] as const;
const SOURCE_CHILDREN = `
  <SgDsLibrarySidebarGroup label="Browse">
    <SgDsLibrarySidebarItem active icon="house" label="Home" description="For you" />
    <SgDsLibrarySidebarItem icon="play" label="Watch" description="Continue" />
    <SgDsLibrarySidebarItem icon="library" label="Library" badge="12" />
  </SgDsLibrarySidebarGroup>
  <SgDsLibrarySidebarGroup label="Following">
    <SgDsLibrarySidebarFollowRow initials="HL" name="Hailey Luna" status="live" />
    <SgDsLibrarySidebarFollowRow avatarTone="teal" initials="NV" name="NeoVoice" />
    <SgDsLibrarySidebarFollowRow avatarTone="purple" initials="MX" name="Mika X" />
  </SgDsLibrarySidebarGroup>
  <SgDsLibrarySidebarGroup label="Manage">
    <SgDsLibrarySidebarItem icon="users" label="Audience" />
    <SgDsLibrarySidebarItem icon="settings" label="Settings" />
  </SgDsLibrarySidebarGroup>
  <SgDsLibrarySidebarFooter>
    <SgDsLibraryUserBlock avatarTone="pink" initials="S" meta="@soomin_yo" name="soomin" size="sm" />
  </SgDsLibrarySidebarFooter>
`;

const meta = {
  title: 'SgDsLibrary/Sidebar',
  component: SgDsLibrarySidebar,
};
export default meta;

const DEFAULT_PROPS = {
  headerSymbolImage: '',
  headerSymbolAlt: '',
  headerSymbolFit: 'contain',
  headerSymbolPosition: 'center',
  headerLogoImage: '',
  headerLogoAlt: '',
  headerLogoFit: 'contain',
  headerLogoPosition: 'left center',
  headerMediaBackgroundImage: '',
  brand: 'StudioGrid',
  brandMarkIcon: 'sparkles',
  brandMarkText: 'SG',
  collapsed: false,
  presentation: 'sidebar',
  radius: 'none',
  bordered: false,
  drawerPlacement: 'left',
  drawerOverlay: true,
  collapsedHeaderDisplay: 'symbol',
  expandedBrandDisplay: 'symbol-logo',
  collapsedToggleVariant: 'ghost',
  width: 'md',
  height: '100%',
  collapsedWidth: '88px',
  background: 'surface',
  soft: false,
} as const;

const DESIGN_PROPS = {
  headerSymbolImage: DEFAULT_PROPS.headerSymbolImage,
  headerSymbolAlt: DEFAULT_PROPS.headerSymbolAlt,
  headerSymbolFit: DEFAULT_PROPS.headerSymbolFit,
  headerSymbolPosition: DEFAULT_PROPS.headerSymbolPosition,
  headerLogoImage: DEFAULT_PROPS.headerLogoImage,
  headerLogoAlt: DEFAULT_PROPS.headerLogoAlt,
  headerLogoFit: DEFAULT_PROPS.headerLogoFit,
  headerLogoPosition: DEFAULT_PROPS.headerLogoPosition,
  headerMediaBackgroundImage: DEFAULT_PROPS.headerMediaBackgroundImage,
  brand: DEFAULT_PROPS.brand,
  brandMarkIcon: DEFAULT_PROPS.brandMarkIcon,
  brandMarkText: DEFAULT_PROPS.brandMarkText,
  collapsed: DEFAULT_PROPS.collapsed,
  presentation: DEFAULT_PROPS.presentation,
  radius: DEFAULT_PROPS.radius,
  bordered: DEFAULT_PROPS.bordered,
  drawerPlacement: DEFAULT_PROPS.drawerPlacement,
  drawerOverlay: DEFAULT_PROPS.drawerOverlay,
  collapsedHeaderDisplay: DEFAULT_PROPS.collapsedHeaderDisplay,
  expandedBrandDisplay: DEFAULT_PROPS.expandedBrandDisplay,
  collapsedToggleVariant: DEFAULT_PROPS.collapsedToggleVariant,
  width: DEFAULT_PROPS.width,
  height: DEFAULT_PROPS.height,
  collapsedWidth: DEFAULT_PROPS.collapsedWidth,
  background: DEFAULT_PROPS.background,
  soft: DEFAULT_PROPS.soft,
} as const;

export const Default = {
  name: 'Sidebar',
  args: DEFAULT_PROPS,
  argTypes: {
    headerSymbolImage: { control: 'text' },
    headerSymbolAlt: { control: 'text' },
    headerSymbolFit: { control: 'select', options: IMAGE_FITS },
    headerSymbolPosition: { control: 'select', options: IMAGE_POSITIONS },
    headerLogoImage: { control: 'text' },
    headerLogoAlt: { control: 'text' },
    headerLogoFit: { control: 'select', options: IMAGE_FITS },
    headerLogoPosition: { control: 'select', options: IMAGE_POSITIONS },
    headerMediaBackgroundImage: { control: 'text' },
    brand: { control: 'text' },
    brandMarkIcon: { control: 'icon' },
    brandMarkText: { control: 'text' },
    collapsed: { control: 'boolean' },
    presentation: { control: 'select', options: PRESENTATIONS },
    radius: { control: 'select', options: RADII },
    bordered: { control: 'boolean' },
    drawerPlacement: { control: 'select', options: DRAWER_PLACEMENTS, when: { key: 'presentation', value: 'drawer' } },
    drawerOverlay: { control: 'boolean', when: { key: 'presentation', value: 'drawer' } },
    collapsedHeaderDisplay: { control: 'select', options: COLLAPSED_HEADER_DISPLAYS, when: { key: 'collapsed', value: true } },
    expandedBrandDisplay: { control: 'select', options: EXPANDED_BRAND_DISPLAYS },
    collapsedToggleVariant: {
      control: 'select',
      options: TOGGLE_VARIANTS,
      whenAll: [
        { key: 'collapsed', value: true },
        { key: 'collapsedHeaderDisplay', value: 'menu-button' },
      ],
    },
    width: { control: 'select', options: WIDTHS },
    height: { control: 'text' },
    collapsedWidth: { control: 'text' },
    background: { control: 'select', options: BACKGROUNDS },
    soft: { control: 'boolean' },
  },
  sourceInsert: {
    imports: [
      {
        names: ['SgDsLibrarySidebarGroup', 'SgDsLibrarySidebarItem', 'SgDsLibrarySidebarFollowRow', 'SgDsLibrarySidebarFooter'],
        sourceFile: 'sg-ds-library-preset/components/Sidebar.tsx',
      },
      { names: ['SgDsLibraryUserBlock'], sourceFile: 'sg-ds-library-preset/components/UserBlock.tsx' },
    ],
    jsxChildren: SOURCE_CHILDREN,
    props: DESIGN_PROPS,
  },
  render: (args: Args) => (
    <div style={{ display: 'flex', minWidth: '38rem', height: '32rem', position: 'relative' }}>
      <SgDsLibrarySidebar
        background={asOption(args.background, BACKGROUNDS, 'surface')}
        bordered={asBoolean(args.bordered, false)}
        brand={asText(args.brand, 'StudioGrid')}
        brandMarkIcon={asText(args.brandMarkIcon, 'sparkles') || undefined}
        brandMarkText={asText(args.brandMarkText, 'SG')}
        collapsed={asBoolean(args.collapsed, false)}
        collapsedHeaderDisplay={asOption(args.collapsedHeaderDisplay, COLLAPSED_HEADER_DISPLAYS, 'symbol')}
        collapsedToggleVariant={asOption(args.collapsedToggleVariant, TOGGLE_VARIANTS, 'ghost')}
        collapsedWidth={asText(args.collapsedWidth, '88px')}
        drawerOverlay={asBoolean(args.drawerOverlay, true)}
        drawerPlacement={asOption(args.drawerPlacement, DRAWER_PLACEMENTS, 'left')}
        expandedBrandDisplay={asOption(args.expandedBrandDisplay, EXPANDED_BRAND_DISPLAYS, 'symbol-logo')}
        headerLogoAlt={asText(args.headerLogoAlt)}
        headerLogoFit={asOption(args.headerLogoFit, IMAGE_FITS, 'contain')}
        headerLogoImage={asText(args.headerLogoImage) || undefined}
        headerLogoPosition={asOption(args.headerLogoPosition, IMAGE_POSITIONS, 'left center')}
        headerMediaBackgroundImage={asText(args.headerMediaBackgroundImage) || undefined}
        headerSymbolAlt={asText(args.headerSymbolAlt)}
        headerSymbolFit={asOption(args.headerSymbolFit, IMAGE_FITS, 'contain')}
        headerSymbolImage={asText(args.headerSymbolImage) || undefined}
        headerSymbolPosition={asOption(args.headerSymbolPosition, IMAGE_POSITIONS, 'center')}
        height={asText(args.height, '100%')}
        presentation={asOption(args.presentation, PRESENTATIONS, 'sidebar')}
        radius={asOption(args.radius, RADII, 'none')}
        soft={asBoolean(args.soft, false)}
        width={asOption(args.width, WIDTHS, 'md')}
      >
        {renderSidebarChildren()}
      </SgDsLibrarySidebar>
    </div>
  ),
};

export const Collapsed = {
  name: 'Collapsed Sidebar',
  args: {
    ...DEFAULT_PROPS,
    collapsed: true,
  },
  sourceInsert: {
    props: {
      ...DESIGN_PROPS,
      collapsed: true,
    },
  },
  render: Default.render,
};

export const DrawerLike = {
  name: 'Drawer Sidebar',
  args: {
    ...DEFAULT_PROPS,
    background: 'glass',
    collapsed: false,
    drawerOverlay: true,
    presentation: 'drawer',
    soft: true,
  },
  sourceInsert: {
    props: {
      ...DESIGN_PROPS,
      background: 'glass',
      collapsed: false,
      drawerOverlay: true,
      presentation: 'drawer',
      soft: true,
    },
  },
  render: Default.render,
};

function renderSidebarChildren() {
  return (
    <>
      <SgDsLibrarySidebarGroup label="Browse">
        <SgDsLibrarySidebarItem active icon="house" label="Home" description="For you" />
        <SgDsLibrarySidebarItem icon="play" label="Watch" description="Continue" />
        <SgDsLibrarySidebarItem icon="library" label="Library" badge="12" />
      </SgDsLibrarySidebarGroup>
      <SgDsLibrarySidebarGroup label="Following">
        <SgDsLibrarySidebarFollowRow initials="HL" name="Hailey Luna" status="live" />
        <SgDsLibrarySidebarFollowRow avatarTone="teal" initials="NV" name="NeoVoice" />
        <SgDsLibrarySidebarFollowRow avatarTone="purple" initials="MX" name="Mika X" />
      </SgDsLibrarySidebarGroup>
      <SgDsLibrarySidebarGroup label="Manage">
        <SgDsLibrarySidebarItem icon="users" label="Audience" />
        <SgDsLibrarySidebarItem icon="settings" label="Settings" />
      </SgDsLibrarySidebarGroup>
      <SgDsLibrarySidebarFooter>
        <SgDsLibraryUserBlock avatarTone="pink" initials="S" meta="@soomin_yo" name="soomin" size="sm" />
      </SgDsLibrarySidebarFooter>
    </>
  );
}

function asBoolean(value: unknown, fallback: boolean): boolean {
  if (value === true || value === 'true') return true;
  if (value === false || value === 'false') return false;
  return fallback;
}

function asOption<T extends string>(value: unknown, options: readonly T[], fallback: T): T {
  return typeof value === 'string' && options.includes(value as T) ? (value as T) : fallback;
}

function asText(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}
