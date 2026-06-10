import { SgDsLibraryAudioBlock } from './AudioBlock';
import { SgDsLibraryAudioFrame } from './AudioFrame';
import { SgDsLibraryAudioPlayer } from './AudioPlayer';
import { SgDsLibraryChip } from './Chip';
import { SgDsLibraryToolbar } from './Toolbar';

type Args = Record<string, string>;

const VARIANTS = ['neutral', 'music', 'voice'] as const;
const BACKGROUNDS = ['default', 'surface', 'soft', 'brand', 'mint', 'sunset', 'mono'] as const;

const meta = {
  title: 'SgDsLibrary/AudioFrame',
  component: SgDsLibraryAudioFrame,
  args: {
    title: 'garden_after_midnight.wav',
    meta: 'Stem package · 4:02 · Remix open',
    eyebrow: 'MUSIC RELEASE',
    variant: 'music',
    background: 'default',
  },
  argTypes: {
    title: { control: 'text' },
    meta: { control: 'text' },
    eyebrow: { control: 'text' },
    variant: { control: 'select', options: VARIANTS },
    background: { control: 'select', options: BACKGROUNDS },
  },
  sourceInsert: {
    imports: [{ names: ['SgDsLibraryAudioBlock'] }],
    jsxChildren: `
      <SgDsLibraryAudioBlock
        artBackground="linear-gradient(145deg, #0f172a 0%, #0d9488 44%, #f59e0b 100%)"
        artName="garden.m4a"
        endTime="4:02"
        progress="66"
        startTime="2:08"
      />
    `,
    props: {
      title: 'garden_after_midnight.wav',
      meta: 'Stem package · 4:02 · Remix open',
      eyebrow: 'MUSIC RELEASE',
      variant: 'music',
      background: 'default',
    },
  },
};
export default meta;

export const Default = {
  name: 'AudioFrame',
  render: (args: Args) => {
    const variant = asOption(args.variant, VARIANTS, 'music');
    return (
      <SgDsLibraryAudioFrame
        background={asOption(args.background, BACKGROUNDS, 'default')}
        eyebrow={asText(args.eyebrow, 'MUSIC RELEASE')}
        meta={asText(args.meta, 'Stem package · 4:02 · Remix open')}
        title={asText(args.title, 'garden_after_midnight.wav')}
        variant={variant}
      >
        {variant === 'voice' ? (
          <SgDsLibraryAudioPlayer progress={42} size="sm" time="0:18 / 0:42" variant="compact" />
        ) : (
          <SgDsLibraryAudioBlock
            artBackground="linear-gradient(145deg, #0f172a 0%, #0d9488 44%, #f59e0b 100%)"
            artName="garden.m4a"
            endTime="4:02"
            progress={66}
            startTime="2:08"
          />
        )}
      </SgDsLibraryAudioFrame>
    );
  },
};

export const Voice = {
  args: {
    title: '0:18 호흡 체크',
    meta: '0:42 · Producer feedback',
    eyebrow: 'VOICE NOTE',
    variant: 'voice',
    background: 'soft',
  },
  render: Default.render,
};

export const MusicRelease = {
  args: {
    title: 'garden_after_midnight.wav',
    meta: 'Stem package · 4:02 · Remix open',
    eyebrow: 'MUSIC RELEASE',
    variant: 'music',
    background: 'brand',
  },
  render: (args: Args) => (
    <SgDsLibraryAudioFrame
      background={asOption(args.background, BACKGROUNDS, 'brand')}
      eyebrow={asText(args.eyebrow, 'MUSIC RELEASE')}
      meta={asText(args.meta, 'Stem package · 4:02 · Remix open')}
      title={asText(args.title, 'garden_after_midnight.wav')}
      variant={asOption(args.variant, VARIANTS, 'music')}
    >
      <SgDsLibraryAudioBlock
        artBackground="linear-gradient(145deg, #0f172a 0%, #0d9488 44%, #f59e0b 100%)"
        artName="garden.m4a"
        endTime="4:02"
        progress={66}
        startTime="2:08"
      />
      <SgDsLibraryToolbar
        size="sm"
        wrap
        startSlot={(
          <>
            <SgDsLibraryChip icon="music" size="sm" tone="brand">Melodic pop</SgDsLibraryChip>
            <SgDsLibraryChip icon="sparkles" size="sm">Remixable</SgDsLibraryChip>
          </>
        )}
      />
    </SgDsLibraryAudioFrame>
  ),
};

function asOption<T extends string>(value: unknown, options: readonly T[], fallback: T): T {
  return typeof value === 'string' && options.includes(value as T) ? (value as T) : fallback;
}

function asText(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}
