import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { SgDsLibraryIcon } from './Icon';
import { resolveWorkbenchModeProps } from './_shared';

export type SgDsLibraryButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'soft'
  | 'ghost'
  | 'danger';
export type SgDsLibraryButtonSize = 'sm' | 'md' | 'lg';
export type SgDsLibraryButtonShape = 'default' | 'pill';
export type SgDsLibraryButtonBadgeVariant =
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
  | 'neutral';

export type SgDsLibraryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode;
  /** Backward-compatible label prop for Workbench/story args; `children` remains preferred. */
  label?: ReactNode;
  variant?: SgDsLibraryButtonVariant;
  size?: SgDsLibraryButtonSize;
  shape?: SgDsLibraryButtonShape;
  /** Icon name from the project asset picker (workbench `control: 'icon'`). */
  leadingIcon?: string;
  /** Direct React node override for the leading slot. */
  leadingIconNode?: ReactNode;
  /** Icon name from the project asset picker (workbench `control: 'icon'`). */
  trailingIcon?: string;
  /** Direct React node override for the trailing slot. */
  trailingIconNode?: ReactNode;
  iconOnly?: boolean;
  loading?: boolean;
  /** Render a count/notification badge in the top-right of the button. */
  badge?: boolean;
  badgeText?: string;
  badgeVariant?: SgDsLibraryButtonBadgeVariant;
};

function renderIconSlot(
  name: string | undefined,
  node: ReactNode | undefined,
): ReactNode {
  if (node !== undefined) return node;
  if (name) return <SgDsLibraryIcon name={name} size="1em" />;
  return null;
}

export function SgDsLibraryButton(rawProps: SgDsLibraryButtonProps) {
  const {
  badge = false,
  badgeText = '',
  badgeVariant = 'danger',
  children,
  className = '',
  disabled,
  iconOnly = false,
  label = '버튼',
  leadingIcon,
  leadingIconNode,
  loading = false,
  shape = 'default',
  size = 'md',
  trailingIcon,
  trailingIconNode,
  type = 'button',
  variant = 'primary',
  ...props
} = resolveWorkbenchModeProps(rawProps);
  const lead = renderIconSlot(leadingIcon, leadingIconNode);
  const trail = renderIconSlot(trailingIcon, trailingIconNode);
  const labelContent = children ?? label;
  const showBadge = badge && (badgeText || '').toString().length > 0;

  return (
    <button
      {...props}
      type={type}
      className={['sg-ds-library-scope', 'btn', className].filter(Boolean).join(' ')}
      data-variant={variant}
      data-size={size}
      data-shape={shape === 'pill' ? 'pill' : undefined}
      data-loading={loading || undefined}
      data-icon-only={iconOnly || undefined}
      disabled={disabled}
      aria-disabled={disabled || undefined}
      aria-busy={loading || undefined}
    >
      {loading ? <span className="btn-spinner" aria-hidden="true" /> : null}
      {lead ? (
        <span className="btn-icon" aria-hidden="true">
          {lead}
        </span>
      ) : null}
      {iconOnly ? null : <span className="btn-label">{labelContent}</span>}
      {/* Inline badge sits between the label and any trailing icon —
       * it rides the same flex gap as the icon slots, so multi-character
       * counts ("99+") never overflow the button hit area. */}
      {showBadge && !iconOnly ? (
        <span className="btn-badge" data-status={badgeVariant} aria-hidden="true">
          {badgeText}
        </span>
      ) : null}
      {trail && !iconOnly ? (
        <span className="btn-icon" aria-hidden="true">
          {trail}
        </span>
      ) : null}
    </button>
  );
}

export default SgDsLibraryButton;
