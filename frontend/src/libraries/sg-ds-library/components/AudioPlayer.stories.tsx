import { SgDsLibraryAudioPlayer } from './AudioPlayer';

type Args = Record<string, boolean | number | string>;

const SIZES = ['sm', 'md'] as const;
const VARIANTS = ['default', 'inline', 'compact'] as const;

const meta = {
  title: 'SgDsLibrary/AudioPlayer',
  component: SgDsLibraryAudioPlayer,
  args: {
    time: '0:14 / 0:36',
    playedBars: 12,
    playLabel: 'Play audio',
    variant: 'default',
    size: 'md',
  },
  argTypes: {
    time: { control: 'text' },
    playedBars: { control: 'number' },
    playLabel: { control: 'text' },
    variant: { control: 'select', options: VARIANTS },
    size: { control: 'select', options: SIZES },
  },
  sourceInsert: {
    props: {
      time: '0:14 / 0:36',
      playedBars: '12',
      playLabel: 'Play audio',
      variant: 'default',
      size: 'md',
    },
  },
};
export default meta;

export const Default = {
  name: 'AudioPlayer',
  render: (args: Args) => (
    <SgDsLibraryAudioPlayer
      playedBars={asNumber(args.playedBars, 12)}
      playLabel={asText(args.playLabel, 'Play audio')}
      size={asOption(args.size, SIZES, 'md')}
      time={asText(args.time, '0:14 / 0:36')}
      variant={asOption(args.variant, VARIANTS, 'default')}
    />
  ),
};

export const Inline = { args: { time: '1:14 / 3:25', playedBars: 16, variant: 'inline' }, render: Default.render };
export const Compact = { args: { time: '0:07', playedBars: 6, variant: 'compact', size: 'sm' }, render: Default.render };

function asNumber(value: unknown, fallback: number): number {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && value.trim()) {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return fallback;
}

function asOption<T extends string>(value: unknown, options: readonly T[], fallback: T): T {
  return typeof value === 'string' && options.includes(value as T) ? (value as T) : fallback;
}

function asText(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}
