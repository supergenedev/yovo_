import { useCallback, useEffect, useRef, useState, type CSSProperties, type HTMLAttributes, type ReactNode } from 'react';
import { resolveWorkbenchModeProps } from './_shared';

export type SgDsLibraryStackAlign = 'stretch' | 'start' | 'center' | 'end';
export type SgDsLibraryStackAs = 'div' | 'main' | 'section' | 'article' | 'aside' | 'header' | 'footer' | 'nav';
export type SgDsLibraryStackBackground = 'none' | 'surface' | 'soft' | 'subtle' | 'muted' | 'inverse' | 'accent' | 'glass';
export type SgDsLibraryStackDirection = 'column' | 'row';
export type SgDsLibraryStackGap = 'none' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | (string & {});
export type SgDsLibraryStackJustify = 'start' | 'center' | 'end' | 'between';
export type SgDsLibraryStackMask = 'none' | 'fade';
export type SgDsLibraryStackOverflow = 'visible' | 'hidden' | 'auto' | 'scroll' | 'clip';
export type SgDsLibraryStackPadding = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | (string & {});
export type SgDsLibraryStackPosition = 'static' | 'relative' | 'sticky';
export type SgDsLibraryStackRadius = 'none' | 'sm' | 'md' | 'lg' | 'pill';

export type SgDsLibraryStackProps = HTMLAttributes<HTMLElement> & {
  align?: SgDsLibraryStackAlign;
  as?: SgDsLibraryStackAs;
  background?: SgDsLibraryStackBackground;
  bottom?: string;
  children?: ReactNode;
  direction?: SgDsLibraryStackDirection;
  flex?: string;
  gap?: SgDsLibraryStackGap;
  glassBlur?: number | string;
  height?: string;
  justify?: SgDsLibraryStackJustify;
  left?: string;
  marginBlock?: string;
  marginBottom?: string;
  marginInline?: string;
  marginLeft?: string;
  marginRight?: string;
  marginTop?: string;
  mask?: SgDsLibraryStackMask;
  maskAngle?: number | string;
  maskEnd?: number | string;
  maskStart?: number | string;
  maxHeight?: string;
  maxWidth?: string;
  minHeight?: string;
  minWidth?: string;
  overflow?: SgDsLibraryStackOverflow;
  overflowX?: SgDsLibraryStackOverflow;
  overflowY?: SgDsLibraryStackOverflow;
  padding?: SgDsLibraryStackPadding;
  paddingBlock?: string;
  paddingBottom?: string;
  paddingInline?: string;
  paddingLeft?: string;
  paddingRight?: string;
  paddingTop?: string;
  position?: SgDsLibraryStackPosition;
  radius?: SgDsLibraryStackRadius;
  right?: string;
  scrollFade?: boolean;
  textAlign?: CSSProperties['textAlign'];
  top?: string;
  width?: string;
  wrap?: boolean;
  zIndex?: string;
};

const STACK_GAP_VALUES: Record<string, string> = {
  none: '0px',
  xxs: 'var(--c-stack-gap-xxs)',
  xs: 'var(--c-stack-gap-xs)',
  sm: 'var(--c-stack-gap-sm)',
  md: 'var(--c-stack-gap-md)',
  lg: 'var(--c-stack-gap-lg)',
  xl: 'var(--c-stack-gap-xl)',
  '2xl': 'var(--c-stack-gap-2xl)',
};

const STACK_PADDING_VALUES: Record<string, string> = {
  none: '0px',
  xs: 'var(--c-stack-padding-xs)',
  sm: 'var(--c-stack-padding-sm)',
  md: 'var(--c-stack-padding-md)',
  lg: 'var(--c-stack-padding-lg)',
  xl: 'var(--c-stack-padding-xl)',
};

type StackStyle = CSSProperties & {
  '--c-stack-gap'?: string;
  '--c-stack-glass-blur'?: string;
  '--c-stack-mask-angle'?: string;
  '--c-stack-mask-end'?: string;
  '--c-stack-mask-start'?: string;
  '--c-stack-padding'?: string;
};

type StackScrollFadeEdges = {
  bottom: boolean;
  left: boolean;
  right: boolean;
  top: boolean;
};

const EMPTY_STACK_SCROLL_FADE_EDGES: StackScrollFadeEdges = {
  bottom: false,
  left: false,
  right: false,
  top: false,
};

export function SgDsLibraryStack(rawProps: SgDsLibraryStackProps) {
  const {
    align = 'stretch',
    as = 'div',
    background = 'none',
    bottom,
    children,
    className = '',
    direction = 'column',
    flex,
    gap = 'md',
    glassBlur,
    height,
    justify = 'start',
    left,
    marginBlock,
    marginBottom,
    marginInline,
    marginLeft,
    marginRight,
    marginTop,
    mask = 'none',
    maskAngle,
    maskEnd,
    maskStart,
    maxHeight,
    maxWidth,
    minHeight,
    minWidth,
    overflow,
    overflowX,
    overflowY,
    padding = 'none',
    paddingBlock,
    paddingBottom,
    paddingInline,
    paddingLeft,
    paddingRight,
    paddingTop,
    position = 'static',
    radius = 'none',
    right,
    scrollFade = false,
    style,
    textAlign,
    top,
    width,
    wrap = false,
    zIndex,
    ...props
  } = resolveWorkbenchModeProps(rawProps);
  const stackRef = useRef<HTMLElement | null>(null);
  const [scrollFadeEdges, setScrollFadeEdges] = useState<StackScrollFadeEdges>(EMPTY_STACK_SCROLL_FADE_EDGES);
  const setStackNode = useCallback((node: HTMLElement | null) => {
    stackRef.current = node;
  }, []);
  const customStyle: StackStyle = {};
  const resolvedGap = resolveStackValue(gap, STACK_GAP_VALUES);
  const resolvedPadding = resolveStackValue(padding, STACK_PADDING_VALUES);

  if (!isNamedStackValue(gap, STACK_GAP_VALUES)) {
    customStyle['--c-stack-gap'] = resolvedGap;
  }
  if (!isNamedStackValue(padding, STACK_PADDING_VALUES)) {
    customStyle['--c-stack-padding'] = resolvedPadding;
  }
  if (mask !== 'none') {
    if (maskAngle !== undefined) {
      customStyle['--c-stack-mask-angle'] = formatStackAngle(maskAngle);
    }
    if (maskStart !== undefined) {
      customStyle['--c-stack-mask-start'] = formatStackPercentage(maskStart);
    }
    if (maskEnd !== undefined) {
      customStyle['--c-stack-mask-end'] = formatStackPercentage(maskEnd);
    }
  }
  if (glassBlur !== undefined) {
    customStyle['--c-stack-glass-blur'] = formatStackLength(glassBlur);
  }
  applyStackLength(customStyle, 'width', width);
  applyStackLength(customStyle, 'minWidth', minWidth);
  applyStackLength(customStyle, 'maxWidth', maxWidth);
  applyStackLength(customStyle, 'height', height);
  applyStackLength(customStyle, 'minHeight', minHeight);
  applyStackLength(customStyle, 'maxHeight', maxHeight);
  applyStackValue(customStyle, 'flex', flex);
  if (position !== 'static') {
    customStyle.position = position;
  }
  applyStackLength(customStyle, 'top', top);
  applyStackLength(customStyle, 'right', right);
  applyStackLength(customStyle, 'bottom', bottom);
  applyStackLength(customStyle, 'left', left);
  applyStackValue(customStyle, 'zIndex', zIndex);
  if (overflow && overflow !== 'visible') {
    customStyle.overflow = overflow;
  }
  if (overflowX && overflowX !== 'visible') {
    customStyle.overflowX = overflowX;
  }
  if (overflowY && overflowY !== 'visible') {
    customStyle.overflowY = overflowY;
  }
  applyStackLength(customStyle, 'marginTop', marginTop);
  applyStackLength(customStyle, 'marginRight', marginRight);
  applyStackLength(customStyle, 'marginBottom', marginBottom);
  applyStackLength(customStyle, 'marginLeft', marginLeft);
  applyStackValue(customStyle, 'marginInline', marginInline);
  applyStackValue(customStyle, 'marginBlock', marginBlock);
  applyStackLength(customStyle, 'paddingTop', paddingTop);
  applyStackLength(customStyle, 'paddingRight', paddingRight);
  applyStackLength(customStyle, 'paddingBottom', paddingBottom);
  applyStackLength(customStyle, 'paddingLeft', paddingLeft);
  applyStackValue(customStyle, 'paddingInline', paddingInline);
  applyStackValue(customStyle, 'paddingBlock', paddingBlock);
  if (textAlign) {
    customStyle.textAlign = textAlign;
  }
  const stackStyle = Object.keys(customStyle).length > 0
    ? ({ ...customStyle, ...style } as CSSProperties)
    : style;
  const Component = as;

  useEffect(() => {
    if (!scrollFade) {
      setScrollFadeEdges((current) => (
        areStackScrollFadeEdgesEqual(current, EMPTY_STACK_SCROLL_FADE_EDGES)
          ? current
          : EMPTY_STACK_SCROLL_FADE_EDGES
      ));
      return;
    }

    const node = stackRef.current;
    if (!node) return;

    let frame = 0;
    const updateScrollFadeEdges = () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const nextEdges = getStackScrollFadeEdges(node);
        setScrollFadeEdges((current) => (
          areStackScrollFadeEdgesEqual(current, nextEdges) ? current : nextEdges
        ));
      });
    };

    updateScrollFadeEdges();
    node.addEventListener('scroll', updateScrollFadeEdges, { passive: true });
    const resizeObserver = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(updateScrollFadeEdges)
      : null;
    resizeObserver?.observe(node);
    Array.from(node.children).forEach((child) => resizeObserver?.observe(child));
    window.addEventListener('resize', updateScrollFadeEdges);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
      node.removeEventListener('scroll', updateScrollFadeEdges);
      resizeObserver?.disconnect();
      window.removeEventListener('resize', updateScrollFadeEdges);
    };
  }, [as, children, height, maxHeight, maxWidth, minHeight, minWidth, overflow, overflowX, overflowY, scrollFade, style, width]);

  return (
    <Component
      {...props}
      ref={setStackNode as never}
      className={['sg-ds-library-scope', 'stack', className].filter(Boolean).join(' ')}
      data-align={align === 'stretch' ? undefined : align}
      data-background={background === 'none' ? undefined : background}
      data-direction={direction === 'column' ? undefined : direction}
      data-gap={isNamedStackValue(gap, STACK_GAP_VALUES) ? gap : undefined}
      data-justify={justify === 'start' ? undefined : justify}
      data-mask={mask === 'none' ? undefined : mask}
      data-padding={isNamedStackValue(padding, STACK_PADDING_VALUES) ? padding : undefined}
      data-radius={radius === 'none' ? undefined : radius}
      data-scroll-fade={scrollFade ? 'true' : undefined}
      data-scroll-fade-bottom={scrollFade && scrollFadeEdges.bottom ? 'true' : undefined}
      data-scroll-fade-left={scrollFade && scrollFadeEdges.left ? 'true' : undefined}
      data-scroll-fade-right={scrollFade && scrollFadeEdges.right ? 'true' : undefined}
      data-scroll-fade-top={scrollFade && scrollFadeEdges.top ? 'true' : undefined}
      data-wrap={wrap ? 'true' : undefined}
      style={stackStyle}
    >
      {children}
    </Component>
  );
}

function resolveStackValue(value: string, values: Record<string, string>): string {
  return values[value] ?? value;
}

function isNamedStackValue(value: string, values: Record<string, string>): boolean {
  return Object.prototype.hasOwnProperty.call(values, value);
}

function getStackScrollFadeEdges(node: HTMLElement): StackScrollFadeEdges {
  const computedStyle = window.getComputedStyle(node);
  const maxScrollTop = Math.max(0, node.scrollHeight - node.clientHeight);
  const maxScrollLeft = Math.max(0, node.scrollWidth - node.clientWidth);
  const canScrollY = maxScrollTop > 1 && isScrollableStackOverflow(computedStyle.overflowY);
  const canScrollX = maxScrollLeft > 1 && isScrollableStackOverflow(computedStyle.overflowX);
  const scrollTop = Math.max(0, node.scrollTop);
  const scrollLeft = Math.max(0, node.scrollLeft);

  return {
    bottom: canScrollY && scrollTop < maxScrollTop - 1,
    left: canScrollX && scrollLeft > 1,
    right: canScrollX && scrollLeft < maxScrollLeft - 1,
    top: canScrollY && scrollTop > 1,
  };
}

function isScrollableStackOverflow(value: string): boolean {
  return value === 'auto' || value === 'scroll' || value === 'overlay';
}

function areStackScrollFadeEdgesEqual(left: StackScrollFadeEdges, right: StackScrollFadeEdges): boolean {
  return (
    left.bottom === right.bottom &&
    left.left === right.left &&
    left.right === right.right &&
    left.top === right.top
  );
}

function formatStackAngle(value: number | string): string {
  const text = String(value).trim();
  return /[a-z)]$/i.test(text) ? text : `${text}deg`;
}

function formatStackPercentage(value: number | string): string {
  const text = String(value).trim();
  return text.endsWith('%') ? text : `${text}%`;
}

function formatStackLength(value: number | string): string {
  const text = String(value).trim();
  if (!text) return '0px';
  return /[a-z%)]$/i.test(text) ? text : `${text}px`;
}

function applyStackLength(style: CSSProperties, key: keyof CSSProperties, value: string | undefined): void {
  if (value === undefined || value.trim() === '') return;
  style[key] = formatStackLength(value) as never;
}

function applyStackValue(style: CSSProperties, key: keyof CSSProperties, value: string | undefined): void {
  if (value === undefined || value.trim() === '') return;
  style[key] = value as never;
}

export default SgDsLibraryStack;
