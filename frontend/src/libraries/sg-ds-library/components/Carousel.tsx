import { Children, cloneElement, isValidElement, useEffect, useMemo, useRef, useState, type CSSProperties, type HTMLAttributes, type ReactElement, type ReactNode } from 'react';
import { SgDsLibraryButton } from './Button';
import { resolveRepeaterItemProps, resolveWorkbenchModeProps, type SgDsLibraryRepeaterItemPropKeys, type SgDsLibraryRepeaterItemProps } from './_shared';

export type SgDsLibraryCarouselAlign = 'center' | 'start';
export type SgDsLibraryCarouselGap = 'sm' | 'md' | 'lg';
export type SgDsLibraryCarouselEdgeFade = 'fade' | 'visible';
export type SgDsLibraryCarouselIndicatorPosition = 'inside' | 'outside';

export type SgDsLibraryCarouselProps = HTMLAttributes<HTMLDivElement> & {
  align?: SgDsLibraryCarouselAlign;
  cardMinWidth?: number | string;
  cardWidth?: number | string;
  children?: ReactNode;
  count?: number | string;
  edgeFade?: SgDsLibraryCarouselEdgeFade;
  gap?: SgDsLibraryCarouselGap;
  indicatorPosition?: SgDsLibraryCarouselIndicatorPosition;
  indicators?: boolean;
  itemAspectRatio?: string;
  itemHeight?: number | string;
  itemPropKeys?: SgDsLibraryRepeaterItemPropKeys;
  itemProps?: SgDsLibraryRepeaterItemProps;
  loop?: boolean;
  shadow?: boolean;
  startIndex?: number | string;
};

type CarouselStyle = CSSProperties & {
  '--c-carousel-card-min-width'?: string;
  '--c-carousel-card-width'?: string;
  '--c-carousel-item-height'?: string;
};

export function SgDsLibraryCarousel(rawProps: SgDsLibraryCarouselProps) {
  const {
  align = 'center',
  cardMinWidth = '',
  cardWidth = 78,
  children,
  className = '',
  count = 3,
  edgeFade = 'fade',
  gap = 'md',
  indicatorPosition = 'outside',
  indicators = true,
  itemAspectRatio = '',
  itemHeight = '',
  itemPropKeys,
  itemProps,
  loop = true,
  shadow = false,
  startIndex = 0,
  style,
  ...props
} = resolveWorkbenchModeProps(rawProps);
  const viewportRef = useRef<HTMLDivElement | null>(null);
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
  const [activeIndex, setActiveIndex] = useState(() => normalizeCarouselIndex(startIndex, items.length));

  useEffect(() => {
    setActiveIndex(normalizeCarouselIndex(startIndex, items.length));
  }, [startIndex, items.length]);

  useEffect(() => {
    const viewport = viewportRef.current;
    const cell = viewport?.querySelectorAll<HTMLElement>('.carousel-cell')[activeIndex];
    cell?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: align === 'start' ? 'start' : 'center',
    });
  }, [activeIndex, align]);

  const canMove = items.length > 1;
  const move = (direction: -1 | 1) => {
    if (!canMove) return;
    setActiveIndex((current) => {
      const next = current + direction;
      if (loop) return (next + items.length) % items.length;
      return Math.min(items.length - 1, Math.max(0, next));
    });
  };

  const carouselStyle: CarouselStyle = {
    '--c-carousel-card-width': normalizeCarouselCardWidth(cardWidth),
    '--c-carousel-card-min-width': normalizeCarouselLength(cardMinWidth),
    '--c-carousel-item-height': normalizeCarouselLength(itemHeight),
    ...style,
  };

  if (items.length === 0) return null;

  return (
    <div
      {...props}
      aria-roledescription="carousel"
      className={[
        'sg-ds-library-scope',
        'carousel',
        `carousel--align-${align}`,
        `carousel--edge-${edgeFade}`,
        `carousel--gap-${gap}`,
        `carousel--indicators-${indicatorPosition}`,
        shadow ? 'carousel--shadow' : '',
        className,
      ].filter(Boolean).join(' ')}
      role="region"
      style={carouselStyle}
    >
      <div
        className="carousel-viewport"
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft') {
            event.preventDefault();
            move(-1);
          }
          if (event.key === 'ArrowRight') {
            event.preventDefault();
            move(1);
          }
        }}
        ref={viewportRef}
        tabIndex={0}
      >
        <div className="carousel-track">
          {items.map((item, index) => (
            <div
              aria-current={index === activeIndex ? 'true' : undefined}
              aria-label={`Show card ${index + 1}`}
              className={['carousel-cell', index === activeIndex ? 'is-active' : ''].filter(Boolean).join(' ')}
              key={index}
              onClick={() => setActiveIndex(index)}
              role="button"
              style={{
                ...(itemAspectRatio ? { aspectRatio: itemAspectRatio } : null),
                ...(itemHeight ? { height: 'var(--c-carousel-item-height)' } : null),
              }}
              tabIndex={0}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      {canMove ? (
        <div className="carousel-controls">
          <SgDsLibraryButton aria-label="Previous card" iconOnly leadingIcon="chevron-left" onClick={() => move(-1)} size="sm" variant="secondary" />
          <SgDsLibraryButton aria-label="Next card" iconOnly leadingIcon="chevron-right" onClick={() => move(1)} size="sm" variant="secondary" />
        </div>
      ) : null}
      {indicators ? (
        <div aria-label="Carousel indicators" className="carousel-indicators">
          {items.map((_, index) => (
            <button
              aria-label={`Go to card ${index + 1}`}
              aria-pressed={index === activeIndex}
              className={index === activeIndex ? 'carousel-dot is-active' : 'carousel-dot'}
              key={index}
              onClick={() => setActiveIndex(index)}
              type="button"
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function normalizeCarouselIndex(value: number | string, count: number): number {
  if (count <= 0) return 0;
  const parsed = Number(value);
  return Math.min(count - 1, Math.max(0, Number.isFinite(parsed) ? Math.round(parsed) : 0));
}

function normalizeCarouselCardWidth(value: number | string): string {
  const parsed = typeof value === 'number' ? value : Number(String(value).replace('%', '').trim());
  if (!Number.isFinite(parsed)) return '78%';
  return `${Math.min(100, Math.max(1, parsed))}%`;
}

function normalizeCarouselLength(value: number | string | undefined): string | undefined {
  if (typeof value === 'number') return Number.isFinite(value) ? `${value}px` : undefined;
  const text = value?.trim();
  if (!text) return undefined;
  return /^-?\d+(\.\d+)?$/.test(text) ? `${text}px` : text;
}

export default SgDsLibraryCarousel;
