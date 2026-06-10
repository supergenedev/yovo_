import { Children, cloneElement, isValidElement, useEffect, useMemo, useRef, useState, type CSSProperties, type HTMLAttributes, type ReactElement, type ReactNode } from 'react';
import { SgDsLibraryButton } from './Button';
import { resolveRepeaterItemProps, resolveWorkbenchModeProps, type SgDsLibraryRepeaterItemPropKeys, type SgDsLibraryRepeaterItemProps } from './_shared';

export type SgDsLibraryCardGridLayout = 'row' | 'column' | 'grid';
export type SgDsLibraryCardGridGap = 'sm' | 'md' | 'lg';
export type SgDsLibraryCardGridEdgeFade = 'fade' | 'visible';
export type SgDsLibraryCardGridScroll = 'smooth' | 'snap';
export type SgDsLibraryCardGridItemSize = 'sm' | 'md' | 'lg' | 'xl' | 'custom' | (string & {});

export type SgDsLibraryCardGridProps = HTMLAttributes<HTMLDivElement> & {
  arrows?: boolean;
  children?: ReactNode;
  cols?: number | string;
  count?: number | string;
  edgeFade?: SgDsLibraryCardGridEdgeFade;
  edgePadding?: string;
  gap?: SgDsLibraryCardGridGap;
  itemAspectRatio?: string;
  itemPropKeys?: SgDsLibraryRepeaterItemPropKeys;
  itemProps?: SgDsLibraryRepeaterItemProps;
  itemSize?: SgDsLibraryCardGridItemSize;
  itemSizeOverride?: string;
  /** Minimum item width floor for the row layout — pairs with a relative
   *  itemSizeOverride (e.g. "50%") so cards never shrink below this (e.g. "320px"). */
  itemMinSize?: string;
  /** Maximum item width ceiling for the row layout — caps a relative
   *  itemSizeOverride (e.g. "50%") so cards never grow beyond this (e.g. "600px"). */
  itemMaxSize?: string;
  layout?: SgDsLibraryCardGridLayout;
  scroll?: SgDsLibraryCardGridScroll;
  shadow?: boolean;
};

const ITEM_SIZE_PRESETS: Record<string, string> = {
  sm: '12rem',
  md: '16.5rem',
  lg: '22rem',
  xl: '28rem',
};

type CardGridStyle = CSSProperties & {
  '--c-card-grid-cols'?: number;
  '--c-card-grid-edge-padding'?: string;
  '--c-card-grid-item-width'?: string;
  '--c-card-grid-item-min-width'?: string;
  '--c-card-grid-item-max-width'?: string;
};

export function SgDsLibraryCardGrid(rawProps: SgDsLibraryCardGridProps) {
  const {
  arrows = false,
  children,
  className = '',
  cols = 3,
  count = 3,
  edgeFade = 'fade',
  edgePadding = '',
  gap = 'md',
  itemAspectRatio = '',
  itemPropKeys,
  itemProps,
  itemSize,
  itemSizeOverride,
  itemMinSize,
  itemMaxSize,
  layout = 'row',
  scroll = 'smooth',
  shadow = false,
  style,
  ...props
} = resolveWorkbenchModeProps(rawProps);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [edge, setEdge] = useState({ left: false, right: false });
  const normalizedCols = Math.max(1, Math.round(Number(cols) || 1));
  const normalizedCount = Math.max(1, Math.round(Number(count) || 1));
  const baseItems = useMemo(() => Children.toArray(children), [children]);
  const items = useMemo(() => {
    const template = baseItems[0];
    if (baseItems.length === 1 && isValidElement(template)) {
      return Array.from({ length: normalizedCount }, (_, index) => cloneElement(template as ReactElement, {
        key: index,
        ...resolveRepeaterItemProps(itemProps?.[index], itemPropKeys),
      }));
    }
    return baseItems;
  }, [baseItems, itemPropKeys, itemProps, normalizedCount]);
  const rowWidth = layout === 'row' ? resolveCardGridItemWidth(itemSize, itemSizeOverride) : undefined;
  const rowMinWidth = layout === 'row' ? itemMinSize?.trim() || undefined : undefined;
  const rowMaxWidth = layout === 'row' ? itemMaxSize?.trim() || undefined : undefined;
  const gridStyle: CardGridStyle = {
    '--c-card-grid-cols': normalizedCols,
    ...(edgePadding ? { '--c-card-grid-edge-padding': edgePadding } : null),
    ...(rowWidth ? { '--c-card-grid-item-width': rowWidth } : null),
    ...(rowMinWidth ? { '--c-card-grid-item-min-width': rowMinWidth } : null),
    ...(rowMaxWidth ? { '--c-card-grid-item-max-width': rowMaxWidth } : null),
    ...style,
  };

  useEffect(() => {
    if (layout !== 'row') return undefined;
    const track = trackRef.current;
    if (!track) return undefined;
    const update = () => {
      setEdge({
        left: track.scrollLeft > 8,
        right: track.scrollWidth - track.clientWidth - track.scrollLeft > 8,
      });
    };
    update();
    track.addEventListener('scroll', update, { passive: true });
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(update);
    observer?.observe(track);
    return () => {
      track.removeEventListener('scroll', update);
      observer?.disconnect();
    };
  }, [items.length, layout, rowWidth, rowMinWidth, rowMaxWidth, gap, scroll]);

  const cells = items.map((item, index) => (
    <div className="card-grid-cell" key={index} style={itemAspectRatio ? { aspectRatio: itemAspectRatio } : undefined}>
      {item}
    </div>
  ));

  const scrollByItem = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const firstCell = track.querySelector<HTMLElement>('.card-grid-cell');
    const step = firstCell ? firstCell.getBoundingClientRect().width + 16 : track.clientWidth * 0.85;
    track.scrollBy({ behavior: 'smooth', left: direction * step });
  };

  if (layout === 'row') {
    return (
      <div
        {...props}
        className={[
          'sg-ds-library-scope',
          'card-grid',
          'card-grid--row',
          `card-grid--gap-${gap}`,
          `card-grid--edge-${edgeFade}`,
          `card-grid--scroll-${scroll}`,
          shadow ? 'card-grid--shadow' : '',
          edge.left ? 'has-left' : '',
          edge.right ? 'has-right' : '',
          className,
        ].filter(Boolean).join(' ')}
        style={gridStyle}
      >
        <div className="card-grid-track" ref={trackRef}>{cells}</div>
        {arrows && edge.left ? <SgDsLibraryButton aria-label="Previous cards" className="card-grid-arrow card-grid-arrow--left" iconOnly leadingIcon="chevron-left" onClick={() => scrollByItem(-1)} size="sm" variant="secondary" /> : null}
        {arrows && edge.right ? <SgDsLibraryButton aria-label="Next cards" className="card-grid-arrow card-grid-arrow--right" iconOnly leadingIcon="chevron-right" onClick={() => scrollByItem(1)} size="sm" variant="secondary" /> : null}
      </div>
    );
  }

  return (
    <div
      {...props}
      className={['sg-ds-library-scope', 'card-grid', `card-grid--${layout}`, `card-grid--gap-${gap}`, shadow ? 'card-grid--shadow' : '', className].filter(Boolean).join(' ')}
      style={gridStyle}
    >
      {cells}
    </div>
  );
}

function resolveCardGridItemWidth(size: SgDsLibraryCardGridItemSize | undefined, override: string | undefined): string | undefined {
  const custom = override?.trim();
  if (custom) return custom;
  if (!size || size === 'custom') return undefined;
  return ITEM_SIZE_PRESETS[size] ?? String(size).trim() ?? undefined;
}

export default SgDsLibraryCardGrid;
