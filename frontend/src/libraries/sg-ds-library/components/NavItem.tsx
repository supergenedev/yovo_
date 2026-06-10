import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { SgDsLibraryIcon } from './Icon';
import { resolveWorkbenchModeProps } from './_shared';

export type SgDsLibraryNavItemSize = 'sm' | 'md' | 'lg';
export type SgDsLibraryNavItemVariant = 'default' | 'rail';

type CommonProps = {
  children?: ReactNode;
  current?: boolean;
  icon?: string;
  iconNode?: ReactNode;
  label?: ReactNode;
  selected?: boolean;
  size?: SgDsLibraryNavItemSize;
  tail?: ReactNode;
  variant?: SgDsLibraryNavItemVariant;
};

export type SgDsLibraryNavItemLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & CommonProps & {
  as?: 'a';
};

export type SgDsLibraryNavItemButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & CommonProps & {
  as: 'button';
};

export type SgDsLibraryNavItemProps = SgDsLibraryNavItemLinkProps | SgDsLibraryNavItemButtonProps;

function renderNavItemIcon(icon: string | undefined, iconNode: ReactNode | undefined): ReactNode {
  if (iconNode !== undefined) return iconNode;
  if (icon) return <SgDsLibraryIcon name={icon} size="1em" />;
  return null;
}

function hasNavItemContent(value: ReactNode): boolean {
  return value !== null && value !== undefined && value !== false && !(typeof value === 'string' && value.length === 0);
}

export function SgDsLibraryNavItem(rawProps: SgDsLibraryNavItemProps) {
  const {
  as,
  children,
  className = '',
  current = false,
  icon,
  iconNode,
  label = 'Navigation item',
  selected = false,
  size = 'md',
  tail,
  variant = 'default',
  ...domProps
} = resolveWorkbenchModeProps(rawProps);
  const content = hasNavItemContent(children) ? children : label;
  const resolvedIcon = renderNavItemIcon(icon, iconNode);
  const sharedClassName = ['sg-ds-library-scope', 'nav-item', className].filter(Boolean).join(' ');
  const sharedAttrs = {
    'aria-current': current ? 'page' as const : undefined,
    'aria-selected': selected ? true : undefined,
    'data-size': size,
    'data-selected': selected ? 'true' : undefined,
    'data-variant': variant === 'default' ? undefined : variant,
  };

  const inner = (
    <>
      {resolvedIcon ? <span className="nav-item-icon" aria-hidden="true">{resolvedIcon}</span> : null}
      <span className="nav-item-label">{content}</span>
      {tail ? <span className="nav-item-tail">{tail}</span> : null}
    </>
  );

  const anchorHref = (domProps as AnchorHTMLAttributes<HTMLAnchorElement>).href;

  if (as === 'button' || (as === undefined && anchorHref === undefined)) {
    const buttonProps = domProps as ButtonHTMLAttributes<HTMLButtonElement>;
    return (
      <button
        {...buttonProps}
        className={sharedClassName}
        type={buttonProps.type ?? 'button'}
        {...sharedAttrs}
      >
        {inner}
      </button>
    );
  }

  const { href, onClick, ...anchorProps } = domProps as AnchorHTMLAttributes<HTMLAnchorElement>;
  return (
    <a
      {...anchorProps}
      className={sharedClassName}
      href={href}
      onClick={(event) => {
        if (!href || href === '#') event.preventDefault();
        onClick?.(event);
      }}
      {...sharedAttrs}
    >
      {inner}
    </a>
  );
}

export default SgDsLibraryNavItem;
