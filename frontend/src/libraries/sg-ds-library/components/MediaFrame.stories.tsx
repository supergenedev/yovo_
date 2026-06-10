import { SgDsLibraryMediaFrame } from './MediaFrame';

type Args = Record<string, boolean | number | string>;

const ASPECTS = ['16/9', '1', '1/1', '4/3', '21/9', '4/5', '9/16', '3/4'] as const;
const BADGE_STATUSES = ['info', 'success', 'warning', 'danger', 'neutral'] as const;
const BADGE_VARIANTS = ['solid', 'subtle', 'flat'] as const;
const BUTTON_VARIANTS = ['primary', 'secondary', 'outline', 'soft', 'ghost', 'danger'] as const;
const BUTTON_SIZES = ['sm', 'md', 'lg'] as const;
const BUTTON_SHAPES = ['default', 'pill'] as const;
const SIZES = ['md', 'sm'] as const;
const FITS = ['width', 'height'] as const;
const ALIGNS = ['start', 'center', 'end'] as const;

const meta = {
  title: 'SgDsLibrary/MediaFrame',
  component: SgDsLibraryMediaFrame,
  args: {
    viewerCount: '4,218 watching',
    captionEyebrow: 'ON AIR · 1h 22m',
    captionTitle: '새벽 라이브 #18 — Hailey × NeoVoice',
    duration: '17:02',
    progress: 64,
    progressLabel: 'Media progress',
    playLabel: 'Play',
    liveLabel: 'LIVE',
    aspect: '16/9',
    src: '',
    badgeText: 'AI video',
    badgeVariant: 'subtle',
    badgeStatus: 'info',
    locked: false,
    lockIcon: 'lock',
    lockTitle: '',
    lockMessage: '',
    lockActionLabel: '',
    lockActionIcon: '',
    lockActionVariant: 'primary',
    lockActionSize: 'sm',
    lockActionShape: 'pill',
    live: false,
    showPlay: true,
    showGrain: true,
    size: 'md',
    fit: 'width',
    maxHeight: '',
    align: 'start',
    background: 'linear-gradient(140deg, #0c1429, #4c1d95 50%, #be185d)',
  },
  argTypes: {
    viewerCount: { control: 'text' },
    captionEyebrow: { control: 'text' },
    captionTitle: { control: 'text' },
    duration: { control: 'text' },
    progress: { control: { max: 100, min: 0, step: 1, type: 'range' } },
    progressLabel: { control: 'text' },
    playLabel: { control: 'text' },
    liveLabel: { control: 'text' },
    aspect: { control: 'select', options: ASPECTS },
    src: { name: 'Image source', control: 'text' },
    badgeText: { control: 'text' },
    badgeVariant: { control: 'select', options: BADGE_VARIANTS },
    badgeStatus: { control: 'select', options: BADGE_STATUSES },
    locked: { control: 'boolean' },
    lockIcon: { name: 'Lock icon', control: 'icon' },
    lockTitle: { control: 'text' },
    lockMessage: { control: 'text' },
    lockActionLabel: { control: 'text' },
    lockActionIcon: { name: 'Lock action icon', control: 'icon' },
    lockActionVariant: { name: 'Lock action variant', control: 'select', options: BUTTON_VARIANTS },
    lockActionSize: { name: 'Lock action size', control: 'select', options: BUTTON_SIZES },
    lockActionShape: { name: 'Lock action shape', control: 'select', options: BUTTON_SHAPES },
    live: { control: 'boolean' },
    showPlay: { control: 'boolean' },
    showGrain: { control: 'boolean' },
    size: { control: 'select', options: SIZES },
    fit: { name: 'Resize basis', control: 'select', options: FITS },
    maxHeight: { name: 'Max height (keep ratio)', control: 'text' },
    align: { name: 'Align', control: 'select', options: ALIGNS },
    background: { name: 'Fallback background', control: 'text' },
  },
  sourceInsert: {
    props: {
      viewerCount: '4,218 watching',
      captionEyebrow: 'ON AIR · 1h 22m',
      captionTitle: '새벽 라이브 #18 — Hailey × NeoVoice',
      duration: '17:02',
      progress: 64,
      progressLabel: 'Media progress',
      playLabel: 'Play',
      liveLabel: 'LIVE',
      aspect: '16/9',
      src: '',
      badgeText: 'AI video',
      badgeVariant: 'subtle',
      badgeStatus: 'info',
      locked: false,
      lockIcon: 'lock',
      lockTitle: '',
      lockMessage: '',
      lockActionLabel: '',
      lockActionIcon: '',
      lockActionVariant: 'primary',
      lockActionSize: 'sm',
      lockActionShape: 'pill',
      live: false,
      showPlay: true,
      showGrain: true,
      size: 'md',
      fit: 'width',
      maxHeight: '',
      align: 'start',
      background: 'linear-gradient(140deg, #0c1429, #4c1d95 50%, #be185d)',
    },
  },
};
export default meta;

export const Default = {
  name: 'MediaFrame',
  render: (args: Args) => (
    <SgDsLibraryMediaFrame
      aspect={asOption(args.aspect, ASPECTS, '16/9')}
      background={asText(args.background)}
      badgeText={asText(args.badgeText)}
      badgeStatus={asOption(args.badgeStatus, BADGE_STATUSES, 'info')}
      badgeVariant={asOption(args.badgeVariant, BADGE_VARIANTS, 'subtle')}
      captionEyebrow={asText(args.captionEyebrow)}
      captionTitle={asText(args.captionTitle)}
      duration={asText(args.duration)}
      src={asText(args.src)}
      live={asBoolean(args.live)}
      liveLabel={asText(args.liveLabel)}
      size={asOption(args.size, SIZES, 'md')}
      fit={asOption(args.fit, FITS, 'width')}
      maxHeight={asText(args.maxHeight)}
      align={asOption(args.align, ALIGNS, 'start')}
      locked={asBoolean(args.locked)}
      lockIcon={asText(args.lockIcon)}
      lockTitle={asText(args.lockTitle)}
      lockMessage={asText(args.lockMessage)}
      lockActionLabel={asText(args.lockActionLabel)}
      lockActionIcon={asText(args.lockActionIcon)}
      lockActionVariant={asOption(args.lockActionVariant, BUTTON_VARIANTS, 'primary')}
      lockActionSize={asOption(args.lockActionSize, BUTTON_SIZES, 'sm')}
      lockActionShape={asOption(args.lockActionShape, BUTTON_SHAPES, 'pill')}
      playLabel={asText(args.playLabel)}
      progress={asProgress(args.progress)}
      progressLabel={asText(args.progressLabel)}
      showGrain={asBoolean(args.showGrain, true)}
      showPlay={asBoolean(args.showPlay)}
      viewerCount={asText(args.viewerCount)}
    />
  ),
};

export const Locked = { args: { duration: '47:18', badgeText: '19+', badgeVariant: 'solid', badgeStatus: 'danger', locked: true, lockIcon: 'shield-alert', lockTitle: '연령 제한', lockMessage: '성인 인증이 필요한 콘텐츠예요.', lockActionLabel: '본인 인증', lockActionIcon: 'shield-check', showPlay: false }, render: Default.render };
export const Live = { args: { duration: '', badgeText: '4K', badgeVariant: 'solid', badgeStatus: 'danger', live: true, showPlay: true }, render: Default.render };
export const Small = { args: { viewerCount: '1,456 watching', captionEyebrow: 'LIVE CUT', captionTitle: '작은 리스트용 미디어', duration: '17:01', badgeText: 'AI video', badgeVariant: 'solid', badgeStatus: 'danger', live: true, showPlay: false, size: 'sm' }, render: Default.render };

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

function asProgress(value: unknown): number | string | undefined {
  if (value === '' || value === undefined) return undefined;
  if (typeof value === 'number' || typeof value === 'string') return value;
  return undefined;
}
