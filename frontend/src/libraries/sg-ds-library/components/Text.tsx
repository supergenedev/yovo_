import { createElement, type CSSProperties, type HTMLAttributes, type ReactNode } from 'react';
import { resolveWorkbenchModeProps } from './_shared';

export type SgDsLibraryTextAs =
  | 'span'
  | 'p'
  | 'div'
  | 'strong'
  | 'em'
  | 'small'
  | 'label'
  | 'time'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6';

export type SgDsLibraryTextVariant =
  | 'display'
  | 'heading-1'
  | 'heading-2'
  | 'heading-3'
  | 'heading-4'
  | 'heading-5'
  | 'heading-6'
  | 'body'
  | 'body-sm'
  | 'ui'
  | 'ui-sm'
  | 'caption'
  | 'eyebrow'
  | 'inherit';

export type SgDsLibraryTextTone =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'disabled'
  | 'inverse'
  | 'brand'
  | 'link'
  | 'success'
  | 'warning'
  | 'danger'
  | 'static-dark'
  | 'static-light'
  | 'inherit';

export type SgDsLibraryTextWeight = 'regular' | 'medium' | 'semibold' | 'bold' | 'inherit';
export type SgDsLibraryTextAlign = 'start' | 'center' | 'end' | 'justify';
export type SgDsLibraryTextTransform = 'none' | 'uppercase';

export type SgDsLibraryTextProps = Omit<HTMLAttributes<HTMLElement>, 'color'> & {
  align?: SgDsLibraryTextAlign;
  as?: SgDsLibraryTextAs;
  children?: ReactNode;
  lineHeight?: number | string;
  tone?: SgDsLibraryTextTone;
  transform?: SgDsLibraryTextTransform;
  truncate?: boolean;
  truncateLines?: number | string;
  variant?: SgDsLibraryTextVariant;
  weight?: SgDsLibraryTextWeight;
};

export function SgDsLibraryText(rawProps: SgDsLibraryTextProps) {
  const {
    align,
    as = 'span',
    children = 'Text',
    className = '',
    lineHeight,
    style,
    tone = 'primary',
    transform = 'none',
    truncate = false,
    truncateLines = 1,
    variant = 'body',
    weight,
    ...props
  } = resolveWorkbenchModeProps(rawProps);
  const resolvedLineHeight = normalizeSgDsLibraryTextLineHeight(lineHeight);
  const resolvedTruncateLines = normalizeSgDsLibraryTextTruncateLines(truncateLines);
  const resolvedStyle = resolveSgDsLibraryTextStyle(style, resolvedLineHeight, truncate ? resolvedTruncateLines : undefined);

  return createElement(
    as,
    {
      ...props,
      className: ['sg-ds-library-scope', 'text', className].filter(Boolean).join(' '),
      'data-align': align,
      'data-tone': tone === 'inherit' ? undefined : tone,
      'data-transform': transform === 'none' ? undefined : transform,
      'data-truncate': truncate || undefined,
      'data-truncate-lines': truncate && resolvedTruncateLines !== undefined ? resolvedTruncateLines : undefined,
      'data-variant': variant === 'inherit' ? undefined : variant,
      'data-weight': weight && weight !== 'inherit' ? weight : undefined,
      style: resolvedStyle,
    },
    children,
  );
}

function normalizeSgDsLibraryTextLineHeight(value: number | string | undefined): number | string | undefined {
  if (typeof value === 'number') return Number.isFinite(value) ? value : undefined;
  if (typeof value !== 'string') return undefined;
  const trimmedValue = value.trim();
  return trimmedValue ? trimmedValue : undefined;
}

function normalizeSgDsLibraryTextTruncateLines(value: number | string | undefined): number | undefined {
  const numericValue = typeof value === 'number'
    ? value
    : typeof value === 'string' && value.trim()
      ? Number(value)
      : undefined;
  if (numericValue === undefined || !Number.isFinite(numericValue)) return undefined;
  const lineCount = Math.floor(numericValue);
  return lineCount > 1 ? lineCount : undefined;
}

function resolveSgDsLibraryTextStyle(
  style: CSSProperties | undefined,
  lineHeight: number | string | undefined,
  truncateLines: number | undefined,
): CSSProperties | undefined {
  if (lineHeight === undefined && truncateLines === undefined) return style;
  const resolvedStyle: CSSProperties & Record<string, number | string | undefined> = { ...style };
  if (lineHeight !== undefined) resolvedStyle.lineHeight = lineHeight;
  if (truncateLines !== undefined) resolvedStyle['--c-text-truncate-lines'] = truncateLines;
  return resolvedStyle;
}

export default SgDsLibraryText;
