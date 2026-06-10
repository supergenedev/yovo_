import type { HTMLAttributes, ReactNode } from 'react';
import { SgDsLibraryButton } from './Button';
import { resolveWorkbenchModeProps } from './_shared';

export type SgDsLibraryRailFooterProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  primaryLabel?: string;
  primaryIcon?: string;
  secondaryLabel?: string;
  secondaryIcon?: string;
};

function hasRailFooterContent(value: ReactNode): boolean {
  if (value === null || value === undefined || value === false) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.some(hasRailFooterContent);
  return true;
}

export function SgDsLibraryRailFooter(rawProps: SgDsLibraryRailFooterProps) {
  const {
  children,
  className = '',
  primaryLabel = 'Dark mode',
  primaryIcon = 'moon',
  secondaryLabel = '',
  secondaryIcon = 'settings',
  ...props
} = resolveWorkbenchModeProps(rawProps);
  const hasCustomContent = hasRailFooterContent(children);

  return (
    <div {...props} className={['sg-ds-library-scope', 'rail-footer', className].filter(Boolean).join(' ')}>
      {hasCustomContent ? children : (
        <>
          <SgDsLibraryButton
            leadingIcon={primaryIcon}
            size="sm"
            variant="ghost"
          >
            {primaryLabel}
          </SgDsLibraryButton>
          {secondaryLabel ? (
            <SgDsLibraryButton
              leadingIcon={secondaryIcon}
              size="sm"
              variant="ghost"
            >
              {secondaryLabel}
            </SgDsLibraryButton>
          ) : null}
        </>
      )}
    </div>
  );
}

export default SgDsLibraryRailFooter;
