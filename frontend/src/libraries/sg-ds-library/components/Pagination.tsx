import type { AnchorHTMLAttributes, HTMLAttributes, ReactNode } from 'react';
import { resolveWorkbenchModeProps } from './_shared';

export type SgDsLibraryPaginationSize = 'sm' | 'md' | 'lg';
export type SgDsLibraryPaginationEntry = number | 'ellipsis';

export type SgDsLibraryPaginationProps = HTMLAttributes<HTMLElement> & {
  children?: ReactNode;
  currentPage?: number;
  label?: string;
  pages?: SgDsLibraryPaginationEntry[];
  size?: SgDsLibraryPaginationSize;
  totalPages?: number;
};

export type SgDsLibraryPaginationItemProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children?: ReactNode;
  current?: boolean;
};

export type SgDsLibraryPaginationEllipsisProps = HTMLAttributes<HTMLSpanElement> & {
  children?: ReactNode;
};

const DEFAULT_PAGES: SgDsLibraryPaginationEntry[] = [1, 2, 3, 4, 'ellipsis', 10];

export function SgDsLibraryPagination(rawProps: SgDsLibraryPaginationProps) {
  const {
  children,
  className = '',
  currentPage = 3,
  label = 'Pagination',
  pages = DEFAULT_PAGES,
  size = 'md',
  totalPages = 10,
  ...props
} = resolveWorkbenchModeProps(rawProps);
  const lastPage = Math.max(1, totalPages);
  const activePage = Math.min(Math.max(1, currentPage), lastPage);
  const isFirstPage = activePage <= 1;
  const isLastPage = activePage >= lastPage;

  return (
    <nav
      {...props}
      aria-label={label}
      className={['sg-ds-library-scope', 'pagination', className].filter(Boolean).join(' ')}
      data-size={size}
    >
      {isFirstPage ? (
        <span className="pagination-prev" aria-disabled="true" aria-label="Previous page">
          <span aria-hidden="true">←</span>
          Previous
        </span>
      ) : (
        <a className="pagination-prev" href={`?page=${activePage - 1}`} aria-label="Previous page">
          <span aria-hidden="true">←</span>
          Previous
        </a>
      )}
      <ul className="pagination-list">
        {children ?? pages.map((page, index) => (
          <li key={`${page}-${index}`}>
            {page === 'ellipsis' ? (
              <SgDsLibraryPaginationEllipsis />
            ) : (
              <SgDsLibraryPaginationItem current={page === activePage} href={`?page=${page}`}>{page}</SgDsLibraryPaginationItem>
            )}
          </li>
        ))}
      </ul>
      {isLastPage ? (
        <span className="pagination-next" aria-disabled="true" aria-label="Next page">
          Next
          <span aria-hidden="true">→</span>
        </span>
      ) : (
        <a className="pagination-next" href={`?page=${activePage + 1}`} aria-label="Next page">
          Next
          <span aria-hidden="true">→</span>
        </a>
      )}
    </nav>
  );
}

export function SgDsLibraryPaginationItem(rawProps: SgDsLibraryPaginationItemProps) {
  const { children = '1', className = '', current = false, href = '#', ...props } = resolveWorkbenchModeProps(rawProps);
  return (
    <a
      {...props}
      aria-current={current ? 'page' : undefined}
      className={['sg-ds-library-scope', 'pagination-item', className].filter(Boolean).join(' ')}
      href={href}
    >
      {children}
    </a>
  );
}

export function SgDsLibraryPaginationEllipsis(rawProps: SgDsLibraryPaginationEllipsisProps) {
  const { children = '…', className = '', ...props } = resolveWorkbenchModeProps(rawProps);
  return <span {...props} aria-hidden="true" className={['sg-ds-library-scope', 'pagination-ellipsis', className].filter(Boolean).join(' ')}>{children}</span>;
}

export default SgDsLibraryPagination;
