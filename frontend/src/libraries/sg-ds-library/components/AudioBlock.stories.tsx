import { SgDsLibraryAudioBlock } from './AudioBlock';

type Args = Record<string, number | string>;

const meta = {
  title: 'SgDsLibrary/AudioBlock',
  component: SgDsLibraryAudioBlock,
  args: {
    startTime: '1:14',
    endTime: '3:25',
    progress: 50,
    artImageUrl: '',
    artAlt: 'Track cover art',
    artName: 'dusk.exe',
    artBackground: 'linear-gradient(135deg, #111827 0%, #7c3aed 48%, #f43f5e 100%)',
  },
  argTypes: {
    startTime: { control: 'text' },
    endTime: { control: 'text' },
    progress: { control: { max: 100, min: 0, step: 1, type: 'range' } },
    artImageUrl: { control: 'text' },
    artAlt: { control: 'text' },
    artName: { control: 'text' },
    artBackground: { control: 'text' },
  },
  sourceInsert: {
    props: {
      startTime: '1:14',
      endTime: '3:25',
      progress: '50',
      artImageUrl: '',
      artAlt: 'Track cover art',
      artName: 'dusk.exe',
      artBackground: 'linear-gradient(135deg, #111827 0%, #7c3aed 48%, #f43f5e 100%)',
    },
  },
};
export default meta;

export const Default = {
  name: 'AudioBlock',
  render: (args: Args) => (
    <SgDsLibraryAudioBlock
      artAlt={asText(args.artAlt, 'Track cover art')}
      artBackground={asText(args.artBackground, '')}
      artImageUrl={asText(args.artImageUrl, '')}
      artName={asText(args.artName, 'dusk.exe')}
      endTime={asText(args.endTime, '3:25')}
      progress={asNumber(args.progress, 50)}
      startTime={asText(args.startTime, '1:14')}
    />
  ),
};

export const NeonBallad = {
  args: {
    startTime: '2:08',
    endTime: '4:02',
    progress: 66,
    artName: 'garden.m4a',
    artBackground: 'linear-gradient(145deg, #0f172a 0%, #0891b2 44%, #f59e0b 100%)',
  },
  render: Default.render,
};

function asNumber(value: unknown, fallback: number): number {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && value.trim()) {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return fallback;
}

function asText(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}
