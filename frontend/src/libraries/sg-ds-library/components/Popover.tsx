import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';
import { SgDsLibraryIcon } from './Icon';
import { resolveWorkbenchModeProps } from './_shared';

export type SgDsLibraryPopoverPlacement =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-start'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-end'
  | 'left-start'
  | 'left-end'
  | 'right-start'
  | 'right-end';

export type SgDsLibraryPopoverMode = 'auto' | 'manual';

export type SgDsLibraryPopoverProps = Omit<HTMLAttributes<HTMLDivElement>, 'popover'> & {
  arrow?: boolean;
  children?: ReactNode;
  open?: boolean;
  placement?: SgDsLibraryPopoverPlacement;
  popover?: SgDsLibraryPopoverMode;
};

export type SgDsLibraryPopoverListProps = HTMLAttributes<HTMLUListElement> & {
  children?: ReactNode;
};

export type SgDsLibraryPopoverItemProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode;
  icon?: string;
  iconNode?: ReactNode;
  meta?: ReactNode;
  tone?: 'default' | 'danger';
};

export type SgDsLibraryPopoverContentProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  title?: ReactNode;
  body?: ReactNode;
};

export function SgDsLibraryPopover(rawProps: SgDsLibraryPopoverProps) {
  const {
  arrow = false,
  children,
  className = '',
  open = true,
  placement = 'bottom-start',
  popover = 'auto',
  ...props
} = resolveWorkbenchModeProps(rawProps);
  const previewStyle = open ? { display: 'block', opacity: 1, position: 'relative' as const, transform: 'none' } : undefined;

  return (
    <div
      {...props}
      className={['sg-ds-library-scope', 'popover', className].filter(Boolean).join(' ')}
      data-placement={placement}
      popover={popover}
      style={{
        ...previewStyle,
        ...props.style,
      }}
    >
      {children ?? (
        <SgDsLibraryPopoverList>
          <SgDsLibraryPopoverItem icon="user" meta="⇧P">Profile</SgDsLibraryPopoverItem>
          <SgDsLibraryPopoverItem icon="settings">Settings</SgDsLibraryPopoverItem>
          <SgDsLibraryPopoverItem icon="log-out" tone="danger">Sign out</SgDsLibraryPopoverItem>
        </SgDsLibraryPopoverList>
      )}
      {arrow ? <span className="popover-arrow" aria-hidden="true" /> : null}
    </div>
  );
}

export function SgDsLibraryPopoverList(rawProps: SgDsLibraryPopoverListProps) {
  const { children, className = '', ...props } = resolveWorkbenchModeProps(rawProps);
  return (
    <ul {...props} className={['sg-ds-library-scope', 'popover-list', className].filter(Boolean).join(' ')} role={props.role ?? 'menu'}>
      {children}
    </ul>
  );
}

export function SgDsLibraryPopoverItem(rawProps: SgDsLibraryPopoverItemProps) {
  const {
  children = 'Menu item',
  className = '',
  icon,
  iconNode,
  meta,
  tone = 'default',
  type = 'button',
  ...props
} = resolveWorkbenchModeProps(rawProps);
  const resolvedIcon = iconNode !== undefined ? iconNode : icon ? <SgDsLibraryIcon name={icon} size="1em" /> : null;
  return (
    <li role="none">
      <button
        {...props}
        className={['sg-ds-library-scope', 'popover-item', className].filter(Boolean).join(' ')}
        data-tone={tone === 'danger' ? 'danger' : undefined}
        role={props.role ?? 'menuitem'}
        type={type}
      >
        {resolvedIcon ? <span className="popover-item-icon" aria-hidden="true">{resolvedIcon}</span> : null}
        <span>{children}</span>
        {meta ? <span className="popover-item-meta">{meta}</span> : null}
      </button>
    </li>
  );
}

export function SgDsLibraryPopoverContent(rawProps: SgDsLibraryPopoverContentProps) {
  const {
  body = 'Choose which items to include in the results.',
  children,
  className = '',
  title = 'Filter by',
  ...props
} = resolveWorkbenchModeProps(rawProps);
  return (
    <div {...props} className={['sg-ds-library-scope', 'popover-content', className].filter(Boolean).join(' ')}>
      {children ?? (
        <>
          {title ? <h4>{title}</h4> : null}
          {body ? <p>{body}</p> : null}
        </>
      )}
    </div>
  );
}

export default SgDsLibraryPopover;
