import type { HTMLAttributes, ReactNode } from 'react';
import { SgDsLibraryIcon } from './Icon';
import { resolveWorkbenchModeProps } from './_shared';

export type SgDsLibraryBadgeStatus = 'info' | 'success' | 'warning' | 'danger' | 'neutral';
export type SgDsLibraryBadgeVariant = 'solid' | 'subtle' | 'flat';
export type SgDsLibraryBadgeSize = 'sm' | 'md' | 'lg' | 'xl';
export type SgDsLibraryBadgeShape = 'default' | 'pill' | 'dot';

export type SgDsLibraryBadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children?: ReactNode;
  status?: SgDsLibraryBadgeStatus;
  variant?: SgDsLibraryBadgeVariant;
  size?: SgDsLibraryBadgeSize;
  shape?: SgDsLibraryBadgeShape;
  /** Icon name from the project asset picker (workbench `control: 'icon'`). */
  icon?: string;
  /** Direct React node override (escape hatch for programmatic usage). */
  iconNode?: ReactNode;
};

export function SgDsLibraryBadge(rawProps: SgDsLibraryBadgeProps) {
  const {
  children = 'Badge',
  className = '',
  icon,
  iconNode,
  shape = 'default',
  size = 'md',
  status = 'neutral',
  variant = 'subtle',
  ...props
} = resolveWorkbenchModeProps(rawProps);
  const resolvedIcon = iconNode !== undefined
    ? iconNode
    : icon
      ? <SgDsLibraryIcon name={icon} size="1em" />
      : null;

  return (
    <span
      {...props}
      className={['sg-ds-library-scope', 'badge', className].filter(Boolean).join(' ')}
      data-status={status}
      data-variant={variant}
      data-size={size}
      data-shape={shape === 'default' ? undefined : shape}
    >
      {resolvedIcon ? (
        <span className="badge-icon" aria-hidden="true">
          {resolvedIcon}
        </span>
      ) : null}
      {children}
    </span>
  );
}

export default SgDsLibraryBadge;
