import { SgDsLibraryAlert, type SgDsLibraryAlertAction, type SgDsLibraryAlertActionPlacement } from './Alert';
import type { SgDsLibraryButtonProps, SgDsLibraryButtonShape, SgDsLibraryButtonSize } from './Button';

type Args = Record<string, boolean | string>;

const BUTTON_VARIANTS: Array<NonNullable<SgDsLibraryButtonProps['variant']>> = [
  'primary',
  'secondary',
  'ghost',
  'danger',
];

const ACTION_PLACEMENTS: Array<SgDsLibraryAlertActionPlacement> = ['below', 'end'];
const ACTION_SIZES: Array<SgDsLibraryButtonSize> = ['sm', 'md', 'lg'];
const ACTION_SHAPES: Array<SgDsLibraryButtonShape> = ['default', 'pill'];

const meta = {
  title: 'SgDsLibrary/Alert',
  component: SgDsLibraryAlert,
  // Prop order follows the shared SG DS story order: content, optional
  // action slots, icons, state toggles, then visual variants.
  args: {
    title: '',
    message: 'Your changes have been saved.',
    action1Label: '',
    action1Variant: 'primary',
    action2Label: '',
    action2Variant: 'ghost',
    actionPlacement: 'below',
    actionSize: 'sm',
    actionShape: 'default',
    icon: '',
    hideIcon: false,
    dismissible: false,
    status: 'info',
    variant: 'subtle',
  },
  argTypes: {
    title: { control: 'text' },
    message: { control: 'text' },
    action1Label: { control: 'text' },
    action1Variant: { control: 'select', options: BUTTON_VARIANTS },
    action2Label: { control: 'text' },
    action2Variant: { control: 'select', options: BUTTON_VARIANTS },
    actionPlacement: { control: 'select', options: ['below', 'end'] },
    actionSize: { control: 'select', options: ['sm', 'md', 'lg'] },
    actionShape: { control: 'select', options: ['default', 'pill'] },
    icon: { control: 'icon' },
    hideIcon: { control: 'boolean' },
    dismissible: { control: 'boolean' },
    status: { control: 'select', options: ['info', 'success', 'warning', 'danger'] },
    variant: { control: 'select', options: ['solid', 'subtle', 'flat'] },
  },
};
export default meta;

/* ─── Pattern 1: body only, no title ───────────────────────────────────── */
export const BodyOnly = {
  name: '간단 알림 (body only)',
  args: {
    title: '',
    message: '간단 알림. 제목 없이 본문만.',
    status: 'info',
  },
  render: renderAlert,
};

/* ─── Pattern 2: title + body ──────────────────────────────────────────── */
export const TitleAndBody = {
  name: '제목 + 본문',
  args: {
    title: 'Profile saved',
    message: '제목 + 본문 패턴. 변경사항이 저장됐습니다.',
    status: 'success',
  },
  render: renderAlert,
};

/* ─── Pattern 3: title + body + actions ────────────────────────────────── */
export const WithActions = {
  name: '제목 + 본문 + 액션',
  args: {
    title: 'Storage almost full',
    message: '92% of your 50 GB quota is in use. Free up space or upgrade.',
    action1Label: 'Upgrade',
    action1Variant: 'primary',
    action2Label: 'Manage files',
    action2Variant: 'ghost',
    status: 'warning',
  },
  render: renderAlert,
};

/* ─── Pattern 4: title + body + dismiss button ─────────────────────────── */
export const Dismissible = {
  name: '제목 + 본문 + 닫기 버튼',
  args: {
    title: 'New feature',
    message: '제목 + 본문 + 닫기 버튼.',
    dismissible: true,
    status: 'info',
  },
  render: renderAlert,
};

/* ─── Pattern 5: danger (destructive, solid) ───────────────────────────── */
export const Danger = {
  name: 'Danger (실패)',
  args: {
    title: '업로드 실패',
    message: '파일을 다시 시도해 주세요.',
    status: 'danger',
    variant: 'solid',
  },
  render: renderAlert,
};

/* ─── Pattern 6: inline actions (right side) ───────────────────────────── */
export const InlineActions = {
  name: '인라인 액션 (우측 배치)',
  args: {
    title: '',
    message: '로그인하면 댓글로 의견을 남길 수 있어요.',
    action1Label: '로그인',
    action1Variant: 'primary',
    actionPlacement: 'end',
    actionSize: 'md',
    icon: 'lock',
    status: 'info',
  },
  render: renderAlert,
};

/* ─── Default — generic with all controls ──────────────────────────────── */
export const Default = {
  name: 'Alert (full controls)',
  sourceInsert: {
    props: {
      title: '',
      message: 'Your changes have been saved.',
      action1Label: '',
      action1Variant: 'primary',
      action2Label: '',
      action2Variant: 'ghost',
      actionPlacement: 'below',
      actionSize: 'sm',
      actionShape: 'default',
      icon: '',
      hideIcon: false,
      dismissible: false,
      status: 'info',
      variant: 'subtle',
    },
  },
  render: renderAlert,
};

function renderAlert(args: Args) {
  const actions = buildActions(args);
  return (
    <SgDsLibraryAlert
      actions={actions.length > 0 ? actions : undefined}
      actionPlacement={asOption(args.actionPlacement, ACTION_PLACEMENTS, 'below')}
      actionShape={asOption(args.actionShape, ACTION_SHAPES, 'default')}
      actionSize={asOption(args.actionSize, ACTION_SIZES, 'sm')}
      dismissible={asBoolean(args.dismissible)}
      hideIcon={asBoolean(args.hideIcon)}
      icon={asText(args.icon) || undefined}
      message={asText(args.message)}
      status={asOption(args.status, ['info', 'success', 'warning', 'danger'], 'info')}
      title={asText(args.title)}
      variant={asOption(args.variant, ['solid', 'subtle', 'flat'], 'subtle')}
    />
  );
}

function buildActions(args: Args): SgDsLibraryAlertAction[] {
  const actions: SgDsLibraryAlertAction[] = [];
  const a1 = asText(args.action1Label).trim();
  if (a1) actions.push({ label: a1, variant: asOption(args.action1Variant, BUTTON_VARIANTS, 'primary') });
  const a2 = asText(args.action2Label).trim();
  if (a2) actions.push({ label: a2, variant: asOption(args.action2Variant, BUTTON_VARIANTS, 'ghost') });
  return actions;
}

function asBoolean(value: unknown): boolean {
  return typeof value === 'boolean' ? value : value === 'true';
}

function asOption<T extends string>(value: unknown, options: readonly T[], fallback: T): T {
  return typeof value === 'string' && options.includes(value as T) ? (value as T) : fallback;
}

function asText(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}
