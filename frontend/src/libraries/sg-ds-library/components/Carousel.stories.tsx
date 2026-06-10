import { SgDsLibraryBadge } from './Badge';
import { SgDsLibraryCard } from './Card';
import { SgDsLibraryCarousel } from './Carousel';
import { SgDsLibraryMedia } from './Media';
import { SgDsLibraryStack } from './Stack';

type Args = Record<string, boolean | string>;

const ALIGNS = ['center', 'start'] as const;
const ASPECTS = ['', '1 / 1', '4 / 3', '16 / 9', '3 / 4', '2 / 3'] as const;
const EDGE_FADES = ['fade', 'visible'] as const;
const GAPS = ['sm', 'md', 'lg'] as const;
const INDICATOR_POSITIONS = ['inside', 'outside'] as const;

const meta = {
  title: 'SgDsLibrary/Carousel',
  component: SgDsLibraryCarousel,
};
export default meta;

export const Default = {
  name: 'Carousel',
  args: {
    count: '5',
    loop: true,
    indicators: true,
    indicatorPosition: 'outside',
    align: 'center',
    gap: 'md',
    cardWidth: '78',
    cardMinWidth: '',
    itemHeight: '',
    itemAspectRatio: '3 / 4',
    startIndex: '0',
    edgeFade: 'fade',
    shadow: false,
  },
  argTypes: {
    count: { control: 'number' },
    loop: { control: 'boolean' },
    indicators: { control: 'boolean' },
    indicatorPosition: { control: 'select', options: INDICATOR_POSITIONS, when: { key: 'indicators', value: true } },
    align: { control: 'select', options: ALIGNS },
    gap: { control: 'select', options: GAPS },
    cardWidth: { control: 'number' },
    cardMinWidth: { control: 'text' },
    itemHeight: { control: 'text' },
    itemAspectRatio: { control: 'select', options: ASPECTS },
    startIndex: { control: 'number' },
    edgeFade: { control: 'select', options: EDGE_FADES },
    shadow: { control: 'boolean' },
  },
  sourceInsert: {
    imports: [{ names: ['SgDsLibraryBadge', 'SgDsLibraryCard', 'SgDsLibraryMedia', 'SgDsLibraryStack'] }],
    jsxChildren: `
      <SgDsLibraryCard gap="sm" padding="sm" variant="raised">
        <SgDsLibraryMedia aspectRatio="16 / 9" overlay="glass" overlayMask="fade" rounded="sm" />
        <SgDsLibraryStack gap="xs">
          <SgDsLibraryBadge status="info" variant="subtle">Featured</SgDsLibraryBadge>
          <strong>Loop carousel</strong>
          <span>Cards keep edge fade and indicators.</span>
        </SgDsLibraryStack>
      </SgDsLibraryCard>
    `,
    props: {
      count: '5',
      loop: true,
      indicators: true,
      indicatorPosition: 'outside',
      align: 'center',
      gap: 'md',
      cardWidth: '78',
      cardMinWidth: '',
      itemHeight: '',
      itemAspectRatio: '3 / 4',
      startIndex: '0',
      edgeFade: 'fade',
      shadow: false,
    },
  },
  render: (args: Args) => (
    <SgDsLibraryCarousel
      align={asOption(args.align, ALIGNS, 'center')}
      cardMinWidth={asText(args.cardMinWidth) || undefined}
      cardWidth={asText(args.cardWidth, '78')}
      count={asText(args.count, '5')}
      edgeFade={asOption(args.edgeFade, EDGE_FADES, 'fade')}
      gap={asOption(args.gap, GAPS, 'md')}
      indicatorPosition={asOption(args.indicatorPosition, INDICATOR_POSITIONS, 'outside')}
      indicators={asBoolean(args.indicators, true)}
      itemAspectRatio={asText(args.itemAspectRatio)}
      itemHeight={asText(args.itemHeight) || undefined}
      loop={asBoolean(args.loop, true)}
      shadow={asBoolean(args.shadow, false)}
      startIndex={asText(args.startIndex, '0')}
    >
      <SgDsLibraryCard gap="sm" padding="sm" variant="raised">
        <SgDsLibraryMedia aspectRatio="16 / 9" overlay="glass" overlayMask="fade" rounded="sm" />
        <SgDsLibraryStack gap="xs">
          <SgDsLibraryBadge status="info" variant="subtle">Featured</SgDsLibraryBadge>
          <strong>Loop carousel</strong>
          <span>Cards keep edge fade and indicators.</span>
        </SgDsLibraryStack>
      </SgDsLibraryCard>
    </SgDsLibraryCarousel>
  ),
};

function asBoolean(value: unknown, fallback: boolean): boolean {
  if (value === true || value === 'true') return true;
  if (value === false || value === 'false') return false;
  return fallback;
}

function asOption<T extends string>(value: unknown, options: readonly T[], fallback: T): T {
  return typeof value === 'string' && options.includes(value as T) ? (value as T) : fallback;
}

function asText(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}
