import {
  SgDsLibraryDialog,
  SgDsLibraryDialogBody,
  SgDsLibraryDialogClose,
  SgDsLibraryDialogDescription,
  SgDsLibraryDialogFooter,
  SgDsLibraryDialogHeader,
  SgDsLibraryDialogTitle,
} from './Dialog';
import { SgDsLibraryButton } from './Button';

type Args = Record<string, boolean | string>;

const ALIGNS = ['center', 'top'] as const;
const BUTTON_VARIANTS = ['primary', 'secondary', 'outline', 'soft', 'ghost', 'danger'] as const;
const FOOTER_BUTTON_LAYOUTS = ['right', 'full'] as const;
const SIZES = ['sm', 'md', 'lg', 'xl', 'full'] as const;
const DIALOG_ARG_TYPES = {
  children: { control: 'text' },
  title: { control: 'text' },
  description: { control: 'text' },
  action1Label: { control: 'text', name: 'Action 1 Label' },
  action1Variant: { control: 'select', name: 'Action 1 Variant', options: BUTTON_VARIANTS },
  action1Icon: { control: 'icon', name: 'Action 1 Icon' },
  action2Label: { control: 'text', name: 'Action 2 Label' },
  action2Variant: { control: 'select', name: 'Action 2 Variant', options: BUTTON_VARIANTS },
  action2Icon: { control: 'icon', name: 'Action 2 Icon' },
  open: { control: 'boolean' },
  floating: { control: 'boolean' },
  dimmed: { control: 'boolean' },
  showClose: { control: 'boolean' },
  bordered: { control: 'boolean' },
  footerButtonLayout: { control: 'select', name: 'Footer Button Layout', options: FOOTER_BUTTON_LAYOUTS },
  align: { control: 'select', options: ALIGNS },
  scroll: { control: 'boolean' },
  size: { control: 'select', options: SIZES },
};
const TEXT_ARG_TYPES = {
  children: { control: 'text' },
};

const meta = {
  title: 'SgDsLibrary/Dialog',
  component: SgDsLibraryDialog,
};
export default meta;

export const Default = {
  name: 'Dialog',
  args: {
    children: 'Dialog body content.',
    title: 'Delete project?',
    description: 'This action cannot be undone.',
    action1Label: 'Action 1',
    action1Variant: 'ghost',
    action1Icon: '',
    action2Label: 'Action 2',
    action2Variant: 'primary',
    action2Icon: '',
    open: true,
    floating: true,
    dimmed: true,
    showClose: true,
    bordered: false,
    footerButtonLayout: 'right',
    align: 'center',
    scroll: false,
    size: 'md',
  },
  argTypes: DIALOG_ARG_TYPES,
  sourceInsert: {
    jsxChildren: 'Dialog body content.',
    props: {
      title: '',
      description: '',
      action1Label: '',
      action1Variant: 'ghost',
      action1Icon: '',
      action2Label: '',
      action2Variant: 'primary',
      action2Icon: '',
      open: true,
      floating: true,
      dimmed: true,
      showClose: true,
      bordered: false,
      footerButtonLayout: 'right',
      align: 'center',
      scroll: false,
      size: 'md',
    },
  },
  render: (args: Args) => (
    <SgDsLibraryDialog
      title={asText(args.title)}
      description={asText(args.description)}
      action1Label={asText(args.action1Label)}
      action1Variant={asOption(args.action1Variant, BUTTON_VARIANTS, 'ghost')}
      action1Icon={asText(args.action1Icon)}
      action2Label={asText(args.action2Label)}
      action2Variant={asOption(args.action2Variant, BUTTON_VARIANTS, 'primary')}
      action2Icon={asText(args.action2Icon)}
      align={asOption(args.align, ALIGNS, 'center')}
      bordered={asBoolean(args.bordered)}
      dimmed={asBoolean(args.dimmed, true)}
      footerButtonLayout={asOption(args.footerButtonLayout, FOOTER_BUTTON_LAYOUTS, 'right')}
      floating={asBoolean(args.floating, true)}
      open={asBoolean(args.open)}
      scroll={asBoolean(args.scroll)}
      showClose={asBoolean(args.showClose, true)}
      size={asOption(args.size, SIZES, 'md')}
    >
      {renderDialogStoryChildren(args)}
    </SgDsLibraryDialog>
  ),
};

export const ScrollFade = {
  name: 'Scroll Fade',
  args: {
    children: 'Review the details before continuing.',
    title: 'Scrollable dialog',
    description: 'Header and footer fades respond to the body scroll position.',
    action1Label: 'Action 1',
    action1Variant: 'ghost',
    action1Icon: '',
    action2Label: 'Action 2',
    action2Variant: 'primary',
    action2Icon: '',
    open: true,
    floating: true,
    dimmed: true,
    showClose: true,
    bordered: false,
    footerButtonLayout: 'full',
    align: 'center',
    scroll: true,
    size: 'sm',
  },
  argTypes: DIALOG_ARG_TYPES,
  sourceInsert: {
    jsxChildren: '<div><p>Review the details before continuing.</p><p>The footer fade remains visible while more content is available.</p><p>The header fade appears after the body has been scrolled.</p><p>Use this area for permission summaries, confirmation notes, and long review steps.</p><p>Additional details continue here so the body has enough height to scroll.</p><p>The fade is now part of Dialog, so Modal is no longer needed for this chrome.</p><p>Scroll section 1 keeps the body taller than the viewport.</p><p>Scroll section 2 keeps the body taller than the viewport.</p><p>Scroll section 3 keeps the body taller than the viewport.</p><p>Scroll section 4 keeps the body taller than the viewport.</p><p>Scroll section 5 keeps the body taller than the viewport.</p><p>Scroll section 6 keeps the body taller than the viewport.</p></div>',
    props: {
      title: 'Scrollable dialog',
      description: 'Header and footer fades respond to the body scroll position.',
      action1Label: 'Action 1',
      action1Variant: 'ghost',
      action1Icon: '',
      action2Label: 'Action 2',
      action2Variant: 'primary',
      action2Icon: '',
      open: true,
      floating: true,
      dimmed: true,
      showClose: true,
      bordered: false,
      footerButtonLayout: 'full',
      align: 'center',
      scroll: true,
      size: 'sm',
    },
  },
  render: (args: Args) => (
    <SgDsLibraryDialog
      title={asText(args.title)}
      description={asText(args.description)}
      action1Label={asText(args.action1Label)}
      action1Variant={asOption(args.action1Variant, BUTTON_VARIANTS, 'ghost')}
      action1Icon={asText(args.action1Icon)}
      action2Label={asText(args.action2Label)}
      action2Variant={asOption(args.action2Variant, BUTTON_VARIANTS, 'primary')}
      action2Icon={asText(args.action2Icon)}
      align={asOption(args.align, ALIGNS, 'center')}
      bordered={asBoolean(args.bordered)}
      dimmed={asBoolean(args.dimmed, true)}
      footerButtonLayout={asOption(args.footerButtonLayout, FOOTER_BUTTON_LAYOUTS, 'full')}
      floating={asBoolean(args.floating, true)}
      open={asBoolean(args.open)}
      scroll={asBoolean(args.scroll, true)}
      showClose={asBoolean(args.showClose, true)}
      size={asOption(args.size, SIZES, 'sm')}
    >
      {renderDialogStoryChildren(args)}
    </SgDsLibraryDialog>
  ),
};

export const DialogHeader = {
  args: {
    title: 'Dialog title',
    description: 'Supporting description.',
    showClose: true,
  },
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    showClose: { control: 'boolean' },
  },
  sourceInsert: {
    props: {
      title: 'Dialog title',
      description: 'Supporting description.',
      showClose: true,
    },
  },
  render: (args: Args) => (
    <div className="sg-ds-library-scope dialog" style={{ position: 'relative' }}>
      <SgDsLibraryDialogHeader
        title={asText(args.title)}
        description={asText(args.description)}
        showClose={asBoolean(args.showClose)}
      />
    </div>
  ),
};

export const DialogTitle = {
  args: { children: 'Dialog title' },
  argTypes: TEXT_ARG_TYPES,
  sourceInsert: {
    props: { children: 'Dialog title' },
  },
  render: (args: Args) => <SgDsLibraryDialogTitle>{asText(args.children)}</SgDsLibraryDialogTitle>,
};
export const DialogDescription = {
  args: { children: 'Dialog description' },
  argTypes: TEXT_ARG_TYPES,
  sourceInsert: {
    props: { children: 'Dialog description' },
  },
  render: (args: Args) => <SgDsLibraryDialogDescription>{asText(args.children)}</SgDsLibraryDialogDescription>,
};
export const DialogBody = {
  args: {
    children: 'Dialog body content.',
    scroll: false,
  },
  argTypes: {
    children: { control: 'text' },
    scroll: { control: 'boolean' },
  },
  sourceInsert: {
    props: {
      children: 'Dialog body content.',
      scroll: false,
    },
  },
  render: (args: Args) => (
    <SgDsLibraryDialogBody scroll={asBoolean(args.scroll)}>
      {asText(args.children, 'Dialog body content.')}
    </SgDsLibraryDialogBody>
  ),
};
export const DialogFooter = {
  args: {
    action1Label: 'Action 1',
    action1Variant: 'ghost',
    action1Icon: '',
    action2Label: 'Action 2',
    action2Variant: 'primary',
    action2Icon: '',
    layout: 'right',
  },
  argTypes: {
    action1Label: { control: 'text', name: 'Action 1 Label' },
    action1Variant: { control: 'select', name: 'Action 1 Variant', options: BUTTON_VARIANTS },
    action1Icon: { control: 'icon', name: 'Action 1 Icon' },
    action2Label: { control: 'text', name: 'Action 2 Label' },
    action2Variant: { control: 'select', name: 'Action 2 Variant', options: BUTTON_VARIANTS },
    action2Icon: { control: 'icon', name: 'Action 2 Icon' },
    layout: { control: 'select', options: FOOTER_BUTTON_LAYOUTS },
  },
  sourceInsert: {
    imports: [{ names: ['SgDsLibraryButton'] }],
    jsxChildren: `
      <SgDsLibraryButton size="sm" variant="ghost">Action 1</SgDsLibraryButton>
      <SgDsLibraryButton size="sm">Action 2</SgDsLibraryButton>
    `,
    props: {
      layout: 'right',
    },
  },
  render: (args: Args) => (
    <SgDsLibraryDialogFooter layout={asOption(args.layout, FOOTER_BUTTON_LAYOUTS, 'right')}>
      <SgDsLibraryButton leadingIcon={asText(args.action1Icon)} size="sm" variant={asOption(args.action1Variant, BUTTON_VARIANTS, 'ghost')}>{asText(args.action1Label)}</SgDsLibraryButton>
      <SgDsLibraryButton leadingIcon={asText(args.action2Icon)} size="sm" variant={asOption(args.action2Variant, BUTTON_VARIANTS, 'primary')}>{asText(args.action2Label)}</SgDsLibraryButton>
    </SgDsLibraryDialogFooter>
  ),
};
export const DialogClose = {
  args: { label: 'Close dialog' },
  argTypes: { label: { control: 'text' } },
  sourceInsert: {
    props: { label: 'Close dialog' },
  },
  render: (args: Args) => (
    <div className="sg-ds-library-scope dialog" style={{ minHeight: 48, position: 'relative' }}>
      <SgDsLibraryDialogClose label={asText(args.label, 'Close dialog')} />
    </div>
  ),
};

function asBoolean(value: unknown, fallback = false): boolean {
  if (value === undefined) return fallback;
  return value === true || value === 'true';
}

function asOption<T extends string>(value: unknown, options: readonly T[], fallback: T): T {
  return typeof value === 'string' && options.includes(value as T) ? (value as T) : fallback;
}

function asText(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}

function renderDialogStoryChildren(args: Args) {
  const text = asText(args.children, 'Dialog body content.');
  if (asBoolean(args.scroll) && text === 'Review the details before continuing.') {
    return (
      <div style={{ display: 'grid', gap: 12 }}>
        <p>{text}</p>
        {Array.from({ length: 96 }, (_, index) => (
          <p key={index}>Dialog scroll section {index + 1}: the header and footer fade layers stay attached to the dialog chrome while the body scrolls.</p>
        ))}
      </div>
    );
  }
  return text;
}
