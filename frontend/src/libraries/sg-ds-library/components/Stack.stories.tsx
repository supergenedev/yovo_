import { SgDsLibraryBadge } from './Badge';
import { SgDsLibraryButton } from './Button';
import { SgDsLibraryStack } from './Stack';

type Args = Record<string, boolean | string>;

const ALIGN_OPTIONS = ['stretch', 'start', 'center', 'end'] as const;
const AS_OPTIONS = ['div', 'main', 'section', 'article', 'aside', 'header', 'footer', 'nav'] as const;
const BACKGROUND_OPTIONS = ['none', 'surface', 'soft', 'subtle', 'muted', 'inverse', 'accent', 'glass'] as const;
const DIRECTION_OPTIONS = ['column', 'row'] as const;
const GAP_OPTIONS = ['none', 'xxs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;
const JUSTIFY_OPTIONS = ['start', 'center', 'end', 'between'] as const;
const MASK_OPTIONS = ['none', 'fade'] as const;
const OVERFLOW_OPTIONS = ['visible', 'hidden', 'auto', 'scroll', 'clip'] as const;
const PADDING_OPTIONS = ['none', 'xs', 'sm', 'md', 'lg', 'xl'] as const;
const POSITION_OPTIONS = ['static', 'relative', 'sticky'] as const;
const RADIUS_OPTIONS = ['none', 'sm', 'md', 'lg', 'pill'] as const;
const STACK_SCROLL_FADE_ITEMS = [
  'Inbox',
  'Mentions',
  'Review queue',
  'Scheduled',
  'Activity',
  'Bookmarks',
  'Archived',
  'Settings',
];

const meta = {
  title: 'SgDsLibrary/Stack',
  component: SgDsLibraryStack,
  args: {
    as: 'div',
    radius: 'none',
    direction: 'column',
    position: 'static',
    align: 'stretch',
    justify: 'start',
    wrap: false,
    gap: 'md',
    padding: 'none',
    width: '360px',
    height: '',
    background: 'none',
    maxHeight: '',
    mask: 'none',
    maskStart: '45',
    maskEnd: '100',
    maskAngle: '0',
    scrollFade: false,
    glassBlur: '18',
    bottom: '',
    flex: '',
    left: '',
    marginBlock: '',
    marginBottom: '',
    marginInline: '',
    marginLeft: '',
    marginRight: '',
    marginTop: '',
    maxWidth: '',
    minHeight: '',
    minWidth: '',
    overflow: 'visible',
    overflowX: 'visible',
    overflowY: 'visible',
    paddingBlock: '',
    paddingBottom: '',
    paddingInline: '',
    paddingLeft: '',
    paddingRight: '',
    paddingTop: '',
    right: '',
    textAlign: '',
    top: '',
    zIndex: '',
  },
  argTypes: {
    as: { control: 'select', options: AS_OPTIONS },
    radius: { control: 'select', options: RADIUS_OPTIONS },
    direction: { control: 'select', options: DIRECTION_OPTIONS },
    position: { control: 'select', options: POSITION_OPTIONS },
    align: { control: 'select', options: ALIGN_OPTIONS },
    justify: { control: 'select', options: JUSTIFY_OPTIONS },
    wrap: { control: 'boolean' },
    gap: { control: 'select', options: GAP_OPTIONS },
    padding: { control: 'select', options: PADDING_OPTIONS },
    width: { control: 'text' },
    height: { control: 'text' },
    background: { control: 'select', options: BACKGROUND_OPTIONS },
    maxHeight: { control: 'text' },
    mask: { control: 'select', options: MASK_OPTIONS },
    maskStart: { control: 'number', min: 0, max: 100, step: 1, when: { key: 'mask', value: 'fade' } },
    maskEnd: { control: 'number', min: 0, max: 100, step: 1, when: { key: 'mask', value: 'fade' } },
    maskAngle: { control: 'number', min: 0, max: 360, step: 1, when: { key: 'mask', value: 'fade' } },
    scrollFade: { control: 'boolean' },
    glassBlur: { control: 'text', when: { key: 'background', value: 'glass' } },
    bottom: { control: 'text', when: { key: 'position', value: 'sticky' } },
    flex: { control: 'text' },
    left: { control: 'text', when: { key: 'position', value: 'sticky' } },
    marginBlock: { control: 'text' },
    marginBottom: { control: 'text' },
    marginInline: { control: 'text' },
    marginLeft: { control: 'text' },
    marginRight: { control: 'text' },
    marginTop: { control: 'text' },
    maxWidth: { control: 'text' },
    minHeight: { control: 'text' },
    minWidth: { control: 'text' },
    overflow: { control: 'select', options: OVERFLOW_OPTIONS },
    overflowX: { control: 'select', options: OVERFLOW_OPTIONS },
    overflowY: { control: 'select', options: OVERFLOW_OPTIONS },
    paddingBlock: { control: 'text' },
    paddingBottom: { control: 'text' },
    paddingInline: { control: 'text' },
    paddingLeft: { control: 'text' },
    paddingRight: { control: 'text' },
    paddingTop: { control: 'text' },
    right: { control: 'text', when: { key: 'position', value: 'sticky' } },
    textAlign: { control: 'text' },
    top: { control: 'text', when: { key: 'position', value: 'sticky' } },
    zIndex: { control: 'text' },
  },
};
export default meta;

export const Default = {
  name: 'Stack',
  sourceInsert: {
    props: {
      as: 'div',
      radius: 'none',
      direction: 'column',
      align: 'stretch',
      justify: 'start',
      wrap: false,
      gap: 'md',
      padding: 'none',
      background: 'none',
      mask: 'none',
      maskStart: '45',
      maskEnd: '100',
      maskAngle: '0',
      scrollFade: false,
      glassBlur: '18',
    },
  },
  render: (args: Args) => (
    <SgDsLibraryStack
      as={asOption(args.as, AS_OPTIONS, 'div')}
      align={asOption(args.align, ALIGN_OPTIONS, 'stretch')}
      background={asOption(args.background, BACKGROUND_OPTIONS, 'none')}
      bottom={asOptionalText(args.bottom)}
      direction={asOption(args.direction, DIRECTION_OPTIONS, 'column')}
      flex={asOptionalText(args.flex)}
      gap={asOption(args.gap, GAP_OPTIONS, 'md')}
      glassBlur={asText(args.glassBlur, '18')}
      height={asOptionalText(args.height)}
      justify={asOption(args.justify, JUSTIFY_OPTIONS, 'start')}
      left={asOptionalText(args.left)}
      marginBlock={asOptionalText(args.marginBlock)}
      marginBottom={asOptionalText(args.marginBottom)}
      marginInline={asOptionalText(args.marginInline)}
      marginLeft={asOptionalText(args.marginLeft)}
      marginRight={asOptionalText(args.marginRight)}
      marginTop={asOptionalText(args.marginTop)}
      mask={asOption(args.mask, MASK_OPTIONS, 'none')}
      maskAngle={asText(args.maskAngle, '0')}
      maskEnd={asText(args.maskEnd, '100')}
      maskStart={asText(args.maskStart, '45')}
      maxHeight={asOptionalText(args.maxHeight)}
      maxWidth={asOptionalText(args.maxWidth)}
      minHeight={asOptionalText(args.minHeight)}
      minWidth={asOptionalText(args.minWidth)}
      overflow={asOption(args.overflow, OVERFLOW_OPTIONS, 'visible')}
      overflowX={asOption(args.overflowX, OVERFLOW_OPTIONS, 'visible')}
      overflowY={asOption(args.overflowY, OVERFLOW_OPTIONS, 'visible')}
      padding={asOption(args.padding, PADDING_OPTIONS, 'none')}
      paddingBlock={asOptionalText(args.paddingBlock)}
      paddingBottom={asOptionalText(args.paddingBottom)}
      paddingInline={asOptionalText(args.paddingInline)}
      paddingLeft={asOptionalText(args.paddingLeft)}
      paddingRight={asOptionalText(args.paddingRight)}
      paddingTop={asOptionalText(args.paddingTop)}
      position={asOption(args.position, POSITION_OPTIONS, 'static')}
      radius={asOption(args.radius, RADIUS_OPTIONS, 'none')}
      right={asOptionalText(args.right)}
      scrollFade={asBoolean(args.scrollFade)}
      textAlign={asOptionalText(args.textAlign)}
      top={asOptionalText(args.top)}
      width={asOptionalText(args.width)}
      wrap={asBoolean(args.wrap)}
      zIndex={asOptionalText(args.zIndex)}
    >
      {asBoolean(args.scrollFade) ? (
        STACK_SCROLL_FADE_ITEMS.map((label, index) => (
          <SgDsLibraryButton key={label} size="sm" variant={index % 2 === 0 ? 'secondary' : 'ghost'}>
            {label}
          </SgDsLibraryButton>
        ))
      ) : (
        <>
          <SgDsLibraryBadge status="info" variant="subtle">Stack</SgDsLibraryBadge>
          <SgDsLibraryButton size="sm" variant="secondary">Primary action</SgDsLibraryButton>
          <SgDsLibraryButton size="sm" variant="ghost">Secondary</SgDsLibraryButton>
        </>
      )}
    </SgDsLibraryStack>
  ),
};

export const SurfaceGroup = {
  args: { gap: 'sm', padding: 'md', background: 'soft' },
  render: Default.render,
};

export const MaskFade = {
  args: { gap: 'sm', padding: 'md', background: 'glass', mask: 'fade' },
  render: Default.render,
};

export const ScrollFade = {
  args: { radius: 'md', gap: 'sm', padding: 'sm', height: '144px', background: 'surface', scrollFade: true, overflowY: 'auto' },
  render: Default.render,
};

export const RowActions = {
  args: { direction: 'row', align: 'center', justify: 'between', wrap: true, gap: 'sm' },
  render: Default.render,
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

function asOptionalText(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;
  return value.trim() ? value : undefined;
}
