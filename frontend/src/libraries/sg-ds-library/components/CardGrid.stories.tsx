import { SgDsLibraryBadge } from './Badge';
import { SgDsLibraryCard } from './Card';
import { SgDsLibraryCardGrid } from './CardGrid';
import { SgDsLibraryMedia } from './Media';
import { SgDsLibraryStack } from './Stack';

type Args = Record<string, boolean | string>;

const ASPECTS = ['', '1 / 1', '4 / 3', '16 / 9', '3 / 4', '2 / 3'] as const;
const EDGE_FADES = ['fade', 'visible'] as const;
const GAPS = ['sm', 'md', 'lg'] as const;
const ITEM_SIZES = ['', 'sm', 'md', 'lg', 'xl', 'custom'] as const;
const LAYOUTS = ['row', 'column', 'grid'] as const;
const SCROLLS = ['smooth', 'snap'] as const;

const meta = {
  title: 'SgDsLibrary/CardGrid',
  component: SgDsLibraryCardGrid,
};
export default meta;

export const Default = {
  name: 'CardGrid',
  args: {
    count: '6',
    arrows: true,
    layout: 'row',
    gap: 'md',
    scroll: 'smooth',
    itemSize: '',
    itemAspectRatio: '3 / 4',
    itemSizeOverride: '',
    itemMinSize: '',
    itemMaxSize: '',
    cols: '3',
    edgePadding: '',
    edgeFade: 'fade',
    shadow: false,
  },
  argTypes: {
    count: { control: 'number' },
    arrows: { control: 'boolean' },
    layout: { control: 'select', options: LAYOUTS },
    gap: { control: 'select', options: GAPS },
    scroll: { control: 'select', options: SCROLLS, when: { key: 'layout', value: 'row' } },
    itemSize: { control: 'select', options: ITEM_SIZES },
    itemAspectRatio: { control: 'select', options: ASPECTS },
    itemSizeOverride: { control: 'text', when: { key: 'itemSize', value: 'custom' } },
    itemMinSize: { name: 'Item min size', control: 'text', when: { key: 'layout', value: 'row' } },
    itemMaxSize: { name: 'Item max size', control: 'text', when: { key: 'layout', value: 'row' } },
    cols: { control: 'number', when: { key: 'layout', value: 'grid' } },
    edgePadding: { control: 'text', when: { key: 'layout', value: 'row' } },
    edgeFade: { control: 'select', options: EDGE_FADES, when: { key: 'layout', value: 'row' } },
    shadow: { control: 'boolean' },
  },
  sourceInsert: {
    imports: [{ names: ['SgDsLibraryBadge', 'SgDsLibraryCard', 'SgDsLibraryMedia', 'SgDsLibraryStack'] }],
    jsxChildren: `
      <SgDsLibraryCard gap="sm" padding="sm" variant="raised">
        <SgDsLibraryMedia aspectRatio="16 / 9" overlay="subtle" overlayMask="fade" rounded="sm" />
        <SgDsLibraryStack gap="xs">
          <SgDsLibraryBadge status="info" variant="subtle">Episode</SgDsLibraryBadge>
          <strong>Template card</strong>
          <span>Count repeats this card.</span>
        </SgDsLibraryStack>
      </SgDsLibraryCard>
    `,
    props: {
      count: '6',
      arrows: true,
      layout: 'row',
      gap: 'md',
      scroll: 'smooth',
      itemSize: '',
      itemAspectRatio: '3 / 4',
      itemSizeOverride: '',
      itemMinSize: '',
      itemMaxSize: '',
      cols: '3',
      edgePadding: '',
      edgeFade: 'fade',
      shadow: false,
    },
  },
  render: (args: Args) => (
    <SgDsLibraryCardGrid
      arrows={asBoolean(args.arrows, true)}
      cols={asText(args.cols, '3')}
      count={asText(args.count, '6')}
      edgeFade={asOption(args.edgeFade, EDGE_FADES, 'fade')}
      edgePadding={asText(args.edgePadding)}
      gap={asOption(args.gap, GAPS, 'md')}
      itemAspectRatio={asText(args.itemAspectRatio)}
      itemSize={asText(args.itemSize) || undefined}
      itemSizeOverride={asText(args.itemSize) === 'custom' ? asText(args.itemSizeOverride) : undefined}
      itemMinSize={asOption(args.layout, LAYOUTS, 'row') === 'row' ? asText(args.itemMinSize) || undefined : undefined}
      itemMaxSize={asOption(args.layout, LAYOUTS, 'row') === 'row' ? asText(args.itemMaxSize) || undefined : undefined}
      layout={asOption(args.layout, LAYOUTS, 'row')}
      scroll={asOption(args.scroll, SCROLLS, 'smooth')}
      shadow={asBoolean(args.shadow, false)}
    >
      <SgDsLibraryCard gap="sm" padding="sm" variant="raised">
        <SgDsLibraryMedia aspectRatio="16 / 9" overlay="subtle" overlayMask="fade" rounded="sm" />
        <SgDsLibraryStack gap="xs">
          <SgDsLibraryBadge status="info" variant="subtle">Episode</SgDsLibraryBadge>
          <strong>Template card</strong>
          <span>Count repeats this card.</span>
        </SgDsLibraryStack>
      </SgDsLibraryCard>
    </SgDsLibraryCardGrid>
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
