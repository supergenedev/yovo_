import { SgDsLibraryToast, SgDsLibraryToastDismiss, SgDsLibraryToastRegion } from './Toast';

type Args = Record<string, boolean | string>;

const POSITIONS = ['top-left', 'top-right', 'top-center', 'bottom-left', 'bottom-right', 'bottom-center'] as const;
const LIVE_MODES = ['polite', 'assertive'] as const;
const STATES = ['entering', 'visible', 'leaving'] as const;
const STATUSES = ['info', 'success', 'warning', 'danger'] as const;
const VARIANTS = ['solid', 'subtle'] as const;

const meta = {
  title: 'SgDsLibrary/Toast',
  component: SgDsLibraryToast,
};
export default meta;

export const Default = {
  name: 'Toast',
  args: {
    title: '',
    message: 'File uploaded.',
    showDismiss: true,
    status: 'success',
    state: 'visible',
    variant: 'solid',
  },
  argTypes: {
    title: { control: 'text' },
    message: { control: 'text' },
    showDismiss: { control: 'boolean' },
    status: { control: 'select', options: STATUSES },
    state: { control: 'select', options: STATES },
    variant: { control: 'select', options: VARIANTS },
  },
  sourceInsert: {
    props: {
      title: '',
      message: 'File uploaded.',
      showDismiss: true,
      status: 'success',
      state: 'visible',
      variant: 'solid',
    },
  },
  render: (args: Args) => (
    <SgDsLibraryToast
      message={asText(args.message, 'File uploaded.')}
      showDismiss={asBoolean(args.showDismiss)}
      state={asOption(args.state, STATES, 'visible')}
      status={asOption(args.status, STATUSES, 'success')}
      title={asText(args.title, '')}
      variant={asOption(args.variant, VARIANTS, 'solid')}
    />
  ),
};

export const ToastRegion = {
  args: {
    label: 'Notifications',
    live: 'polite',
    position: 'top-right',
  },
  argTypes: {
    label: { control: 'text' },
    live: { control: 'select', options: LIVE_MODES },
    position: { control: 'select', options: POSITIONS },
  },
  sourceInsert: {
    props: {
      label: 'Notifications',
      live: 'polite',
      position: 'top-right',
    },
  },
  render: (args: Args) => (
    <SgDsLibraryToastRegion
      label={asText(args.label, 'Notifications')}
      live={asOption(args.live, LIVE_MODES, 'polite')}
      position={asOption(args.position, POSITIONS, 'top-right')}
      style={{ position: 'relative' }}
    >
      <SgDsLibraryToast message="Saved to library." status="success" />
      <SgDsLibraryToast message="Sync needs attention." status="warning" variant="subtle" />
    </SgDsLibraryToastRegion>
  ),
};

export const ToastDismiss = {
  args: { label: 'Dismiss notification' },
  argTypes: { label: { control: 'text' } },
  sourceInsert: {
    props: { label: 'Dismiss notification' },
  },
  render: (args: Args) => <SgDsLibraryToastDismiss label={asText(args.label, 'Dismiss notification')} />,
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
