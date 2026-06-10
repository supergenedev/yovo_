import type { AnchorHTMLAttributes, HTMLAttributes, ReactNode } from 'react';
import { resolveWorkbenchModeProps } from './_shared';

export type SgDsLibraryBreadcrumbSize = 'sm' | 'md' | 'lg';
export type SgDsLibraryBreadcrumbSeparator = 'slash' | 'chevron' | 'dot';

export type SgDsLibraryBreadcrumbPathItem = {
  href?: string;
  label: ReactNode;
};

export type SgDsLibraryBreadcrumbProps = HTMLAttributes<HTMLElement> & {
  children?: ReactNode;
  current?: ReactNode;
  items?: SgDsLibraryBreadcrumbPathItem[];
  label?: string;
  parent?: ReactNode;
  root?: ReactNode;
  separator?: SgDsLibraryBreadcrumbSeparator;
  size?: SgDsLibraryBreadcrumbSize;
};

export type SgDsLibraryBreadcrumbItemProps = HTMLAttributes<HTMLLIElement> & {
  children?: ReactNode;
};

export type SgDsLibraryBreadcrumbLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children?: ReactNode;
};

export type SgDsLibraryBreadcrumbCurrentProps = HTMLAttributes<HTMLSpanElement> & {
  children?: ReactNode;
};

const DEFAULT_BREADCRUMB_ITEMS: SgDsLibraryBreadcrumbPathItem[] = [
  { href: '#', label: 'Home' },
  { href: '#', label: 'Library' },
  { label: 'Components' },
];

export function SgDsLibraryBreadcrumb(rawProps: SgDsLibraryBreadcrumbProps) {
  const {
  children,
  className = '',
  current,
  items,
  label = 'Breadcrumb',
  parent,
  root,
  separator = 'slash',
  size = 'md',
  ...props
} = resolveWorkbenchModeProps(rawProps);
  const resolvedItems = items ?? (
    root !== undefined || parent !== undefined || current !== undefined
      ? [
          { href: '#', label: root ?? 'Home' },
          { href: '#', label: parent ?? 'Products' },
          { label: current ?? 'Headphones' },
        ]
      : DEFAULT_BREADCRUMB_ITEMS
  );

  return (
    <nav
      {...props}
      aria-label={label}
      className={['sg-ds-library-scope', 'breadcrumb', className].filter(Boolean).join(' ')}
      data-separator={separator}
      data-size={size}
    >
      <ol className="breadcrumb-list">
        {children ?? resolvedItems.map((item, index) => {
          const isCurrent = index === resolvedItems.length - 1 || !item.href;
          return (
            <SgDsLibraryBreadcrumbItem key={`${String(item.label)}-${index}`}>
              {isCurrent ? (
                <SgDsLibraryBreadcrumbCurrent>{item.label}</SgDsLibraryBreadcrumbCurrent>
              ) : (
                <SgDsLibraryBreadcrumbLink href={item.href}>{item.label}</SgDsLibraryBreadcrumbLink>
              )}
            </SgDsLibraryBreadcrumbItem>
          );
        })}
      </ol>
    </nav>
  );
}

export function SgDsLibraryBreadcrumbItem(rawProps: SgDsLibraryBreadcrumbItemProps) {
  const { children, className = '', ...props } = resolveWorkbenchModeProps(rawProps);
  return <li {...props} className={['sg-ds-library-scope', 'breadcrumb-item', className].filter(Boolean).join(' ')}>{children}</li>;
}

export function SgDsLibraryBreadcrumbLink(rawProps: SgDsLibraryBreadcrumbLinkProps) {
  const { children = 'Link', className = '', href = '#', ...props } = resolveWorkbenchModeProps(rawProps);
  return <a {...props} className={['sg-ds-library-scope', 'breadcrumb-link', className].filter(Boolean).join(' ')} href={href}>{children}</a>;
}

export function SgDsLibraryBreadcrumbCurrent(rawProps: SgDsLibraryBreadcrumbCurrentProps) {
  const { children = 'Current page', className = '', ...props } = resolveWorkbenchModeProps(rawProps);
  return <span {...props} aria-current="page" className={['sg-ds-library-scope', 'breadcrumb-current', className].filter(Boolean).join(' ')}>{children}</span>;
}

export default SgDsLibraryBreadcrumb;
