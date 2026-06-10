import type { HTMLAttributes, ReactNode } from 'react';
import { resolveWorkbenchModeProps } from './_shared';

export type SgDsLibraryDividerOrientation = 'horizontal' | 'vertical';
export type SgDsLibraryDividerVariant = 'solid' | 'dashed' | 'dotted';
export type SgDsLibraryDividerInset = 'none' | 'start' | 'end' | 'both';
export type SgDsLibraryDividerLabelPosition = 'left' | 'center' | 'right';

export type SgDsLibraryDividerProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
  label?: ReactNode;
  orientation?: SgDsLibraryDividerOrientation;
  variant?: SgDsLibraryDividerVariant;
  inset?: SgDsLibraryDividerInset;
  /**
   * Position of the label along the divider. Horizontal-only — has no
   * effect when orientation is vertical (vertical dividers don't support
   * labels in the source design system).
   */
  labelPosition?: SgDsLibraryDividerLabelPosition;
};

export function SgDsLibraryDivider(rawProps: SgDsLibraryDividerProps) {
  const {
  className = '',
  inset = 'none',
  label,
  labelPosition = 'center',
  orientation = 'horizontal',
  variant = 'solid',
  ...props
} = resolveWorkbenchModeProps(rawProps);
  const dataAttrs = {
    'data-orientation': orientation === 'horizontal' ? undefined : orientation,
    'data-variant': variant === 'solid' ? undefined : variant,
    'data-inset': inset === 'none' ? undefined : inset,
  };

  if (label != null && orientation === 'horizontal') {
    return (
      <div
        {...props}
        className={['sg-ds-library-scope', 'divider-labeled', className].filter(Boolean).join(' ')}
        role="separator"
        data-label-position={labelPosition === 'center' ? undefined : labelPosition}
        {...dataAttrs}
      >
        <span className="divider-label">{label}</span>
      </div>
    );
  }

  if (orientation === 'vertical') {
    return (
      <div
        {...props}
        className={['sg-ds-library-scope', 'divider', className].filter(Boolean).join(' ')}
        role="separator"
        aria-orientation="vertical"
        {...dataAttrs}
      />
    );
  }

  return (
    <hr
      {...(props as HTMLAttributes<HTMLHRElement>)}
      className={['sg-ds-library-scope', 'divider', className].filter(Boolean).join(' ')}
      {...dataAttrs}
    />
  );
}

export default SgDsLibraryDivider;
