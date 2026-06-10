import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';
import { SgDsLibraryIcon } from './Icon';
import { SgDsLibraryText } from './Text';
import { resolveWorkbenchModeProps } from './_shared';

export type SgDsLibraryToastStatus = 'info' | 'success' | 'warning' | 'danger';
export type SgDsLibraryToastVariant = 'solid' | 'subtle';
export type SgDsLibraryToastState = 'entering' | 'visible' | 'leaving';
export type SgDsLibraryToastRegionPosition = 'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'bottom-center';

export type SgDsLibraryToastProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  dismissLabel?: string;
  icon?: string;
  iconNode?: ReactNode;
  message?: ReactNode;
  showDismiss?: boolean;
  state?: SgDsLibraryToastState;
  status?: SgDsLibraryToastStatus;
  title?: ReactNode;
  variant?: SgDsLibraryToastVariant;
};

export type SgDsLibraryToastRegionProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  label?: string;
  live?: 'polite' | 'assertive';
  position?: SgDsLibraryToastRegionPosition;
};

export type SgDsLibraryToastDismissProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: string;
};

const STATUS_ICON: Record<SgDsLibraryToastStatus, string> = {
  danger: 'circle-x',
  info: 'info',
  success: 'circle-check-big',
  warning: 'triangle-alert',
};

function getToastRole(status: SgDsLibraryToastStatus): 'alert' | 'status' {
  return status === 'danger' || status === 'warning' ? 'alert' : 'status';
}

export function SgDsLibraryToast(rawProps: SgDsLibraryToastProps) {
  const {
  children,
  className = '',
  dismissLabel = 'Dismiss notification',
  icon,
  iconNode,
  message = 'File uploaded.',
  showDismiss = true,
  state = 'visible',
  status = 'success',
  title,
  variant = 'solid',
  ...props
} = resolveWorkbenchModeProps(rawProps);
  const resolvedIcon = iconNode !== undefined
    ? iconNode
    : <SgDsLibraryIcon name={icon || STATUS_ICON[status]} size="1em" />;

  return (
    <div
      {...props}
      className={['sg-ds-library-scope', 'toast', className].filter(Boolean).join(' ')}
      data-state={state}
      data-status={status}
      data-variant={variant}
      role={props.role ?? getToastRole(status)}
    >
      <span className="toast-icon" aria-hidden="true">{resolvedIcon}</span>
      <div className="toast-content">
        {children ?? (
          <>
            {title ? <SgDsLibraryText as="p" className="toast-title" tone="inherit" variant="ui" weight="semibold">{title}</SgDsLibraryText> : null}
            {message ? <SgDsLibraryText as="p" className="toast-message" tone="inherit" variant="body-sm">{message}</SgDsLibraryText> : null}
          </>
        )}
      </div>
      {showDismiss ? <SgDsLibraryToastDismiss label={dismissLabel} /> : null}
    </div>
  );
}

export function SgDsLibraryToastRegion(rawProps: SgDsLibraryToastRegionProps) {
  const {
  children,
  className = '',
  label = 'Notifications',
  live = 'polite',
  position = 'top-right',
  ...props
} = resolveWorkbenchModeProps(rawProps);
  return (
    <div
      {...props}
      aria-label={label}
      aria-live={live}
      className={['sg-ds-library-scope', 'toast-region', className].filter(Boolean).join(' ')}
      data-position={position}
      role={props.role ?? 'region'}
    >
      {children ?? <SgDsLibraryToast />}
    </div>
  );
}

export function SgDsLibraryToastDismiss(rawProps: SgDsLibraryToastDismissProps) {
  const { className = '', label = 'Dismiss notification', type = 'button', ...props } = resolveWorkbenchModeProps(rawProps);
  return (
    <button {...props} aria-label={label} className={['sg-ds-library-scope', 'toast-dismiss', className].filter(Boolean).join(' ')} type={type}>
      <SgDsLibraryIcon name="x" size="1em" />
    </button>
  );
}

export default SgDsLibraryToast;
