import { isValidElement, type HTMLAttributes, type ReactNode } from 'react';
import { SgDsLibraryIcon } from './Icon';
import { resolveWorkbenchIconSource, resolveWorkbenchModeProps } from './_shared';
import { SgDsLibraryButton, type SgDsLibraryButtonProps, type SgDsLibraryButtonShape, type SgDsLibraryButtonSize } from './Button';
import { SgDsLibraryText } from './Text';

export type SgDsLibraryAlertStatus = 'info' | 'success' | 'warning' | 'danger';
export type SgDsLibraryAlertVariant = 'solid' | 'subtle' | 'flat';
export type SgDsLibraryAlertActionPlacement = 'below' | 'end';

export type SgDsLibraryAlertAction = {
  label: string;
  variant?: SgDsLibraryButtonProps['variant'];
  onClick?: () => void;
};

export type SgDsLibraryAlertProps = Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
  action1Label?: string;
  action1Variant?: SgDsLibraryButtonProps['variant'];
  action2Label?: string;
  action2Variant?: SgDsLibraryButtonProps['variant'];
  title?: ReactNode;
  message?: ReactNode;
  /** Icon name from the project asset picker (workbench `control: 'icon'`). */
  icon?: string;
  /** Direct React node override (escape hatch for programmatic usage). */
  iconNode?: ReactNode;
  /** Pass `true` to suppress both the picker icon and the status fallback. */
  hideIcon?: boolean;
  /**
   * Action buttons. Either an array of `{ label, variant?, onClick? }`
   * (stories-friendly) or a ReactNode for fully custom content.
   */
  actions?: ReactNode | SgDsLibraryAlertAction[];
  /**
   * Where to place action buttons. `'below'` stacks them under the message
   * (default), `'end'` aligns them to the right edge of the alert.
   */
  actionPlacement?: SgDsLibraryAlertActionPlacement;
  /**
   * Size for the auto-generated action buttons (when using `action1Label` /
   * `action2Label` / an action array). Defaults to `'sm'`.
   */
  actionSize?: SgDsLibraryButtonSize;
  /**
   * Shape for the auto-generated action buttons. Defaults to `'default'`.
   * Use `'pill'` for fully rounded ends.
   */
  actionShape?: SgDsLibraryButtonShape;
  status?: SgDsLibraryAlertStatus;
  variant?: SgDsLibraryAlertVariant;
  dismissible?: boolean;
  dismissLabel?: string;
  onDismiss?: () => void;
  role?: 'alert' | 'status';
};

/**
 * Built-in fallback SVGs used when the project hasn't installed an icon
 * library yet. They keep the Alert layout balanced while the asset picker
 * is still empty.
 */
const STATUS_FALLBACK: Record<SgDsLibraryAlertStatus, ReactNode> = {
  info: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
  success: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%" aria-hidden="true">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  warning: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%" aria-hidden="true">
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  danger: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  ),
};

/**
 * Lucide canonical names. Status defaults align with the rest of the
 * design system. `circle-check-big` is the only "big" variant currently
 * shipped; the rest fall back to standard size.
 */
const STATUS_DEFAULT_ICON_NAME: Record<SgDsLibraryAlertStatus, string> = {
  info: 'info',
  success: 'circle-check-big',
  warning: 'triangle-alert',
  danger: 'circle-x',
};

function defaultRole(status: SgDsLibraryAlertStatus): 'alert' | 'status' {
  return status === 'danger' || status === 'warning' ? 'alert' : 'status';
}

function isActionArray(value: unknown): value is SgDsLibraryAlertAction[] {
  return Array.isArray(value) && value.every((item) => (
    item !== null
    && typeof item === 'object'
    && !isValidElement(item)
    && typeof (item as SgDsLibraryAlertAction).label === 'string'
  ));
}

function buildActionProps(
  action1Label: string | undefined,
  action1Variant: SgDsLibraryButtonProps['variant'] | undefined,
  action2Label: string | undefined,
  action2Variant: SgDsLibraryButtonProps['variant'] | undefined,
): SgDsLibraryAlertAction[] {
  const actions: SgDsLibraryAlertAction[] = [];
  const firstLabel = action1Label?.trim();
  if (firstLabel) actions.push({ label: firstLabel, variant: action1Variant ?? 'primary' });
  const secondLabel = action2Label?.trim();
  if (secondLabel) actions.push({ label: secondLabel, variant: action2Variant ?? 'ghost' });
  return actions;
}

function renderIcon(
  iconName: string | undefined,
  iconNode: ReactNode | undefined,
  status: SgDsLibraryAlertStatus,
): ReactNode {
  if (iconNode !== undefined) return iconNode;
  const candidate = iconName?.trim() || STATUS_DEFAULT_ICON_NAME[status];
  if (resolveWorkbenchIconSource(candidate)) {
    return <SgDsLibraryIcon name={candidate} size="1em" />;
  }
  return STATUS_FALLBACK[status];
}

export function SgDsLibraryAlert(rawProps: SgDsLibraryAlertProps) {
  const {
  action1Label,
  action1Variant,
  action2Label,
  action2Variant,
  actionPlacement = 'below',
  actionShape = 'default',
  actionSize = 'sm',
  actions,
  className = '',
  dismissible = false,
  dismissLabel = '알림 닫기',
  hideIcon = false,
  icon,
  iconNode,
  message,
  onDismiss,
  role,
  status = 'info',
  title,
  variant = 'subtle',
  ...props
} = resolveWorkbenchModeProps(rawProps);
  const renderedIcon = hideIcon ? null : renderIcon(icon, iconNode, status);
  const actionProps = buildActionProps(action1Label, action1Variant, action2Label, action2Variant);
  const resolvedActions = actions ?? (actionProps.length > 0 ? actionProps : undefined);
  const renderedActions = isActionArray(resolvedActions)
    ? resolvedActions.map((action, i) => (
      <SgDsLibraryButton
        key={`${action.label}-${i}`}
        size={actionSize}
        shape={actionShape}
        variant={action.variant ?? (i === 0 ? 'primary' : 'ghost')}
        onClick={action.onClick}
      >
        {action.label}
      </SgDsLibraryButton>
    ))
    : resolvedActions;

  const showInlineActions = renderedActions != null && actionPlacement === 'end';
  const showBelowActions = renderedActions != null && actionPlacement === 'below';

  return (
    <div
      {...props}
      role={role ?? defaultRole(status)}
      className={['sg-ds-library-scope', 'alert', className].filter(Boolean).join(' ')}
      data-status={status}
      data-variant={variant}
      data-dismissible={dismissible || undefined}
      data-action-placement={actionPlacement === 'end' ? 'end' : undefined}
    >
      {renderedIcon ? (
        <span className="alert-icon" aria-hidden="true">
          {renderedIcon}
        </span>
      ) : null}
      <div className="alert-content">
        {title ? <SgDsLibraryText as="h4" className="alert-title" tone="inherit" variant="ui" weight="semibold">{title}</SgDsLibraryText> : null}
        {message ? <SgDsLibraryText as="p" className="alert-message" tone="inherit" variant="body-sm">{message}</SgDsLibraryText> : null}
        {showBelowActions ? <div className="alert-actions">{renderedActions}</div> : null}
      </div>
      {showInlineActions ? (
        <div className="alert-actions" data-placement="end">{renderedActions}</div>
      ) : null}
      {dismissible ? (
        <button
          type="button"
          className="alert-dismiss"
          aria-label={dismissLabel}
          onClick={onDismiss}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" width="16" height="16" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      ) : null}
    </div>
  );
}

export default SgDsLibraryAlert;
