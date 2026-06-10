import { SgDsLibraryMedia } from './Media';

type Args = Record<string, boolean | number | string>;

const ASPECTS = ['1 / 1', '4 / 3', '16 / 9', '3 / 4', '2 / 3', '9 / 16'] as const;
const FITS = ['cover', 'contain'] as const;
const MASKS = ['none', 'fade'] as const;
const OVERLAYS = ['none', 'subtle', 'muted', 'inverse', 'accent', 'glass'] as const;
const ROUNDED = ['none', 'sm', 'md', 'lg', 'pill'] as const;

const meta = {
  title: 'SgDsLibrary/Media',
  component: SgDsLibraryMedia,
};
export default meta;

export const Default = {
  name: 'Media',
  args: {
    src: '',
    rounded: 'md',
    radius: '',
    aspectRatio: '16 / 9',
    backgroundPosition: 'center',
    backgroundSize: '',
    fit: 'cover',
    mask: 'none',
    maskStart: 45,
    maskEnd: 100,
    maskAngle: 0,
    overlay: 'glass',
    overlayColor: '',
    overlayGlassBlur: 18,
    overlayMask: 'fade',
    overlayMaskStart: 38,
    overlayMaskEnd: 100,
    overlayMaskAngle: 0,
  },
  argTypes: {
    src: { control: 'text' },
    rounded: { control: 'select', options: ROUNDED },
    radius: { control: 'text' },
    aspectRatio: { control: 'select', options: ASPECTS },
    backgroundPosition: { control: 'text' },
    backgroundSize: { control: 'text' },
    fit: { control: 'select', options: FITS },
    mask: { control: 'select', options: MASKS },
    maskStart: { control: 'number', min: 0, max: 100, step: 1, when: { key: 'mask', value: 'fade' } },
    maskEnd: { control: 'number', min: 0, max: 100, step: 1, when: { key: 'mask', value: 'fade' } },
    maskAngle: { control: 'number', min: 0, max: 360, step: 1, when: { key: 'mask', value: 'fade' } },
    overlay: { control: 'select', options: OVERLAYS },
    overlayColor: { control: 'text' },
    overlayGlassBlur: { control: 'number', min: 0, max: 80, step: 1, when: { key: 'overlay', value: 'glass' } },
    overlayMask: { control: 'select', options: MASKS, when: { key: 'overlay', value: ['subtle', 'muted', 'inverse', 'accent', 'glass'] } },
    overlayMaskStart: {
      control: 'number',
      min: 0,
      max: 100,
      step: 1,
      whenAll: [
        { key: 'overlay', value: ['subtle', 'muted', 'inverse', 'accent', 'glass'] },
        { key: 'overlayMask', value: 'fade' },
      ],
    },
    overlayMaskEnd: {
      control: 'number',
      min: 0,
      max: 100,
      step: 1,
      whenAll: [
        { key: 'overlay', value: ['subtle', 'muted', 'inverse', 'accent', 'glass'] },
        { key: 'overlayMask', value: 'fade' },
      ],
    },
    overlayMaskAngle: {
      control: 'number',
      min: 0,
      max: 360,
      step: 1,
      whenAll: [
        { key: 'overlay', value: ['subtle', 'muted', 'inverse', 'accent', 'glass'] },
        { key: 'overlayMask', value: 'fade' },
      ],
    },
  },
  sourceInsert: {
    props: {
      src: '',
      rounded: 'md',
      radius: '',
      aspectRatio: '16 / 9',
      backgroundPosition: 'center',
      backgroundSize: '',
      fit: 'cover',
      mask: 'none',
      overlay: 'glass',
      overlayColor: '',
      overlayGlassBlur: '18',
      overlayMask: 'fade',
      overlayMaskStart: '38',
      overlayMaskEnd: '100',
      overlayMaskAngle: '0',
    },
  },
  render: (args: Args) => (
    <SgDsLibraryMedia
      aspectRatio={asOption(args.aspectRatio, ASPECTS, '16 / 9')}
      backgroundPosition={asText(args.backgroundPosition, 'center')}
      backgroundSize={asText(args.backgroundSize) || undefined}
      fit={asOption(args.fit, FITS, 'cover')}
      mask={asOption(args.mask, MASKS, 'none')}
      maskAngle={asNumber(args.maskAngle, 0)}
      maskEnd={asNumber(args.maskEnd, 100)}
      maskStart={asNumber(args.maskStart, 45)}
      overlay={asOption(args.overlay, OVERLAYS, 'glass')}
      overlayColor={asText(args.overlayColor) || undefined}
      overlayGlassBlur={asNumber(args.overlayGlassBlur, 18)}
      overlayMask={asOption(args.overlayMask, MASKS, 'fade')}
      overlayMaskAngle={asNumber(args.overlayMaskAngle, 0)}
      overlayMaskEnd={asNumber(args.overlayMaskEnd, 100)}
      overlayMaskStart={asNumber(args.overlayMaskStart, 38)}
      radius={asText(args.radius) || undefined}
      rounded={asOption(args.rounded, ROUNDED, 'md')}
      src={asText(args.src) || undefined}
    />
  ),
};

function asNumber(value: unknown, fallback: number): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function asOption<T extends string>(value: unknown, options: readonly T[], fallback: T): T {
  return typeof value === 'string' && options.includes(value as T) ? (value as T) : fallback;
}

function asText(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}
