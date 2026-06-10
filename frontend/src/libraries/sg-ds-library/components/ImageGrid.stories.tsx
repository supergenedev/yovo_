import { SgDsLibraryImageGrid } from './ImageGrid';

type Args = Record<string, string>;

const ASPECTS = ['1', '16/9', '4/3', '3/4', '9/16'] as const;
const COLS = ['2', '3', '4'] as const;
const TILE_COUNTS = ['1', '2', '3', '4', '5', '6'] as const;

const meta = {
  title: 'SgDsLibrary/ImageGrid',
  component: SgDsLibraryImageGrid,
  args: {
    cols: '3',
    aspect: '1',
    tileCount: '3',
    imageTile1Src: '',
    imageTile2Src: '',
    imageTile3Src: '',
    imageTile4Src: '',
    imageTile5Src: '',
    imageTile6Src: '',
  },
  argTypes: {
    cols: { control: 'select', options: COLS },
    aspect: { control: 'select', options: ASPECTS },
    tileCount: { control: 'select', options: TILE_COUNTS },
    imageTile1Src: { name: 'Image tile 1 src', control: 'text' },
    imageTile2Src: { name: 'Image tile 2 src', control: 'text' },
    imageTile3Src: { name: 'Image tile 3 src', control: 'text' },
    imageTile4Src: { name: 'Image tile 4 src', control: 'text' },
    imageTile5Src: { name: 'Image tile 5 src', control: 'text' },
    imageTile6Src: { name: 'Image tile 6 src', control: 'text' },
  },
  sourceInsert: {
    props: {
      cols: '3',
      aspect: '1',
      tileCount: '3',
      imageTile1Src: '',
      imageTile2Src: '',
      imageTile3Src: '',
      imageTile4Src: '',
      imageTile5Src: '',
      imageTile6Src: '',
    },
  },
};
export default meta;

export const Default = {
  name: 'ImageGrid',
  render: (args: Args) => (
    <SgDsLibraryImageGrid
      aspect={asOption(args.aspect, ASPECTS, '1')}
      cols={asOption(args.cols, COLS, '3')}
      imageTile1Src={asText(args.imageTile1Src)}
      imageTile2Src={asText(args.imageTile2Src)}
      imageTile3Src={asText(args.imageTile3Src)}
      imageTile4Src={asText(args.imageTile4Src)}
      imageTile5Src={asText(args.imageTile5Src)}
      imageTile6Src={asText(args.imageTile6Src)}
      tileCount={asOption(args.tileCount, TILE_COUNTS, '3')}
    />
  ),
};

export const Cinematic = { args: { aspect: '16/9', cols: '3' }, render: Default.render };

function asOption<T extends string>(value: unknown, options: readonly T[], fallback: T): T {
  return typeof value === 'string' && options.includes(value as T) ? (value as T) : fallback;
}

function asText(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}
