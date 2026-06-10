import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { SgDsLibraryText } from './Text';
import { resolveWorkbenchModeProps } from './_shared';

export type SgDsLibraryCardVariant = 'solid' | 'outline' | 'raised' | 'bare';
export type SgDsLibraryCardPadding = 'none' | 'sm' | 'md' | 'lg';
export type SgDsLibraryCardGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | (string & {});

export type SgDsLibraryCardProps = HTMLAttributes<HTMLElement> & {
  children?: ReactNode;
  variant?: SgDsLibraryCardVariant;
  padding?: SgDsLibraryCardPadding;
  gap?: SgDsLibraryCardGap;
  interactive?: boolean;
  title?: ReactNode;
  subtitle?: ReactNode;
  mediaSlot?: ReactNode;
  footerSlot?: ReactNode;
};

const CARD_GAP_VALUES: Record<string, string> = {
  none: '0px',
  xs: 'var(--s-space-stack-xs)',
  sm: 'var(--s-space-stack-sm)',
  md: 'var(--s-space-stack-md)',
  lg: 'var(--s-space-stack-lg)',
};

function resolveCardGap(gap: SgDsLibraryCardGap | undefined): string | undefined {
  if (!gap) return undefined;
  return CARD_GAP_VALUES[gap] ?? gap;
}

export function SgDsLibraryCard(rawProps: SgDsLibraryCardProps) {
  const {
  children,
  className = '',
  footerSlot,
  gap,
  interactive = false,
  mediaSlot,
  padding = 'md',
  style,
  subtitle,
  title,
  variant = 'solid',
  ...props
} = resolveWorkbenchModeProps(rawProps);
  const resolvedGap = resolveCardGap(gap);
  const cardStyle = resolvedGap
    ? ({ ...style, '--c-card-gap': resolvedGap, gap: resolvedGap } as CSSProperties)
    : style;

  return (
    <article
      {...props}
      className={['sg-ds-library-scope', 'card', className].filter(Boolean).join(' ')}
      data-gap={CARD_GAP_VALUES[gap] ? gap : undefined}
      data-variant={variant}
      data-padding={padding}
      data-interactive={interactive || undefined}
      style={cardStyle}
    >
      {mediaSlot ? <div className="card-media">{mediaSlot}</div> : null}
      {title || subtitle ? (
        <header className="card-header">
          {title ? <SgDsLibraryText as="h3" className="card-title" variant="heading-3">{title}</SgDsLibraryText> : null}
          {subtitle ? <SgDsLibraryText as="p" className="card-subtitle" tone="secondary" variant="body">{subtitle}</SgDsLibraryText> : null}
        </header>
      ) : null}
      {children ? <div className="card-body">{children}</div> : null}
      {footerSlot ? <footer className="card-footer">{footerSlot}</footer> : null}
    </article>
  );
}

export default SgDsLibraryCard;
