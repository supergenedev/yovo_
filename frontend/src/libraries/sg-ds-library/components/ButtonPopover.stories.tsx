import { SgDsLibraryButtonPopover } from './ButtonPopover';
import { SgDsLibraryPopoverContent, SgDsLibraryPopoverItem, SgDsLibraryPopoverList } from './Popover';

type Args = Record<string, unknown>;

const BUTTON_VARIANTS = ['primary', 'secondary', 'outline', 'soft', 'ghost', 'danger'] as const;
const BUTTON_SIZES = ['sm', 'md', 'lg'] as const;
const BUTTON_SHAPES = ['default', 'pill'] as const;
const PLACEMENTS = [
  'top',
  'bottom',
  'left',
  'right',
  'top-start',
  'top-end',
  'bottom-start',
  'bottom-end',
  'left-start',
  'left-end',
  'right-start',
  'right-end',
] as const;

function ordered<T extends Record<string, unknown>>(order: number, config: T): T & { order: number } {
  return { ...config, order };
}

const BUTTON_POPOVER_ARG_TYPES = {
  leadingIcon: ordered(30, { name: 'Leading icon', control: 'icon' }),
  trailingIcon: ordered(40, { name: 'Trailing icon', control: 'icon' }),
  iconOnly: ordered(80, { name: 'Icon only', control: 'boolean' }),
  disabled: ordered(90, { control: 'boolean' }),
  arrow: ordered(120, { control: 'boolean' }),
  placement: ordered(100, { control: 'select', options: PLACEMENTS }),
  buttonAriaLabel: ordered(20, { name: 'Button aria label', control: 'text' }),
  buttonLabel: ordered(10, { name: 'Button label', control: 'text' }),
  buttonShape: ordered(70, { name: 'Button shape', control: 'select', options: BUTTON_SHAPES }),
  buttonSize: ordered(60, { name: 'Button size', control: 'select', options: BUTTON_SIZES }),
  buttonVariant: ordered(50, { name: 'Button variant', control: 'select', options: BUTTON_VARIANTS }),
  closeOnItemClick: ordered(130, { name: 'Close on item click', control: 'boolean' }),
  defaultOpen: ordered(110, { name: 'Open by default', control: 'boolean' }),
  fullWidth: ordered(140, { name: 'Full width', control: 'boolean' }),
};

const SHARED_ARGS = {
  leadingIcon: '',
  trailingIcon: 'chevron-down',
  iconOnly: false,
  disabled: false,
  arrow: false,
  placement: 'bottom-end',
  buttonAriaLabel: '',
  buttonLabel: '최신순',
  buttonShape: 'default',
  buttonSize: 'sm',
  buttonVariant: 'soft',
  closeOnItemClick: true,
  defaultOpen: true,
  fullWidth: false,
};

const meta = {
  title: 'SgDsLibrary/ButtonPopover',
  component: SgDsLibraryButtonPopover,
};
export default meta;

export const Default = {
  name: 'ButtonPopover',
  args: SHARED_ARGS,
  argTypes: BUTTON_POPOVER_ARG_TYPES,
  sourceInsert: {
    imports: [{ names: ['SgDsLibraryPopoverItem', 'SgDsLibraryPopoverList'] }],
    jsxChildren: '<SgDsLibraryPopoverList><SgDsLibraryPopoverItem icon="clock">최신순</SgDsLibraryPopoverItem><SgDsLibraryPopoverItem icon="flame">인기순</SgDsLibraryPopoverItem><SgDsLibraryPopoverItem icon="sparkles">추천순</SgDsLibraryPopoverItem></SgDsLibraryPopoverList>',
    props: {
      ...SHARED_ARGS,
      defaultOpen: false,
    },
  },
  render: renderMenuButtonPopover,
};

export const IconOnly = {
  args: {
    ...SHARED_ARGS,
    buttonLabel: '더보기',
    buttonAriaLabel: '더보기 메뉴 열기',
    leadingIcon: 'ellipsis',
    trailingIcon: '',
    buttonShape: 'pill',
    iconOnly: true,
    placement: 'bottom-end',
  },
  argTypes: BUTTON_POPOVER_ARG_TYPES,
  sourceInsert: {
    imports: [{ names: ['SgDsLibraryPopoverItem', 'SgDsLibraryPopoverList'] }],
    jsxChildren: '<SgDsLibraryPopoverList><SgDsLibraryPopoverItem icon="pencil">수정</SgDsLibraryPopoverItem><SgDsLibraryPopoverItem icon="copy">복제</SgDsLibraryPopoverItem><SgDsLibraryPopoverItem icon="trash-2" tone="danger">삭제</SgDsLibraryPopoverItem></SgDsLibraryPopoverList>',
    props: {
      ...SHARED_ARGS,
      buttonLabel: '더보기',
      buttonAriaLabel: '더보기 메뉴 열기',
      leadingIcon: 'ellipsis',
      trailingIcon: '',
      buttonShape: 'pill',
      defaultOpen: false,
      iconOnly: true,
      placement: 'bottom-end',
    },
  },
  render: renderMenuButtonPopover,
};

export const ContentPanel = {
  args: {
    ...SHARED_ARGS,
    buttonLabel: '필터',
    leadingIcon: 'list-filter',
    trailingIcon: 'chevron-down',
    placement: 'bottom-start',
  },
  argTypes: BUTTON_POPOVER_ARG_TYPES,
  sourceInsert: {
    imports: [{ names: ['SgDsLibraryPopoverContent'] }],
    jsxChildren: '<SgDsLibraryPopoverContent title="필터" body="노출할 콘텐츠 조건을 선택하세요." />',
    props: {
      ...SHARED_ARGS,
      buttonLabel: '필터',
      defaultOpen: false,
      leadingIcon: 'list-filter',
      placement: 'bottom-start',
    },
  },
  render: (args: Args) => (
    <SgDsLibraryButtonPopover {...getButtonPopoverProps(args)}>
      <SgDsLibraryPopoverContent title="필터" body="노출할 콘텐츠 조건을 선택하세요." />
    </SgDsLibraryButtonPopover>
  ),
};

function renderMenuButtonPopover(args: Args) {
  return (
    <SgDsLibraryButtonPopover {...getButtonPopoverProps(args)}>
      <SgDsLibraryPopoverList>
        <SgDsLibraryPopoverItem icon="clock">최신순</SgDsLibraryPopoverItem>
        <SgDsLibraryPopoverItem icon="flame">인기순</SgDsLibraryPopoverItem>
        <SgDsLibraryPopoverItem icon="sparkles">추천순</SgDsLibraryPopoverItem>
      </SgDsLibraryPopoverList>
    </SgDsLibraryButtonPopover>
  );
}

function getButtonPopoverProps(args: Args) {
  return {
    arrow: asBoolean(args.arrow, false),
    buttonAriaLabel: asText(args.buttonAriaLabel, ''),
    buttonLabel: asText(args.buttonLabel, '메뉴'),
    buttonShape: asOption(args.buttonShape, BUTTON_SHAPES, 'default'),
    buttonSize: asOption(args.buttonSize, BUTTON_SIZES, 'sm'),
    buttonVariant: asOption(args.buttonVariant, BUTTON_VARIANTS, 'soft'),
    closeOnItemClick: asBoolean(args.closeOnItemClick, true),
    defaultOpen: asBoolean(args.defaultOpen, true),
    disabled: asBoolean(args.disabled, false),
    fullWidth: asBoolean(args.fullWidth, false),
    iconOnly: asBoolean(args.iconOnly, false),
    leadingIcon: asText(args.leadingIcon, ''),
    placement: asOption(args.placement, PLACEMENTS, 'bottom-end'),
    trailingIcon: asText(args.trailingIcon, 'chevron-down'),
  };
}

function asBoolean(value: unknown, fallback = false): boolean {
  if (typeof value === 'boolean') return value;
  if (value === 'true') return true;
  if (value === 'false') return false;
  return fallback;
}

function asOption<T extends string>(value: unknown, options: readonly T[], fallback: T): T {
  return typeof value === 'string' && options.includes(value as T) ? (value as T) : fallback;
}

function asText(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}
