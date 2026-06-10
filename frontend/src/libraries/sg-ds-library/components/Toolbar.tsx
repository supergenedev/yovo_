import type { HTMLAttributes, ReactNode } from 'react';
import { resolveWorkbenchModeProps } from './_shared';

export type SgDsLibraryToolbarAlign = 'start' | 'center' | 'end' | 'between';
export type SgDsLibraryToolbarSize = 'sm' | 'md' | 'lg';
export type SgDsLibraryToolbarVariant = 'default' | 'divided';
export type SgDsLibraryToolbarGroupAlign = 'start' | 'end';

export type SgDsLibraryToolbarProps = HTMLAttributes<HTMLDivElement> & {
  align?: SgDsLibraryToolbarAlign;
  children?: ReactNode;
  startSlot?: ReactNode;
  endSlot?: ReactNode;
  size?: SgDsLibraryToolbarSize;
  variant?: SgDsLibraryToolbarVariant;
  wrap?: boolean;
};

export function SgDsLibraryToolbar(rawProps: SgDsLibraryToolbarProps) {
  const {
  align = 'start',
  children,
  className = '',
  endSlot,
  size = 'md',
  startSlot,
  variant = 'default',
  wrap = false,
  ...props
} = resolveWorkbenchModeProps(rawProps);
  return (
    <div
      {...props}
      className={['sg-ds-library-scope', 'toolbar', className].filter(Boolean).join(' ')}
      data-align={align === 'start' ? undefined : align}
      data-size={size}
      data-variant={variant === 'divided' ? 'divided' : undefined}
      data-wrap={wrap ? 'true' : undefined}
    >
      {startSlot || endSlot ? (
        <>
          {startSlot ? <div className="toolbar-start">{startSlot}</div> : null}
          {endSlot ? <div className="toolbar-end">{endSlot}</div> : null}
        </>
      ) : children}
    </div>
  );
}

export type SgDsLibraryToolbarGroupProps = HTMLAttributes<HTMLDivElement> & {
  align?: SgDsLibraryToolbarGroupAlign;
  children?: ReactNode;
};

export function SgDsLibraryToolbarGroup(rawProps: SgDsLibraryToolbarGroupProps) {
  const {
  align = 'start',
  children,
  className = '',
  ...props
} = resolveWorkbenchModeProps(rawProps);
  return (
    <div
      {...props}
      className={['sg-ds-library-scope', 'toolbar-group', className].filter(Boolean).join(' ')}
      data-align={align === 'end' ? 'end' : undefined}
    >
      {children}
    </div>
  );
}

export default SgDsLibraryToolbar;
