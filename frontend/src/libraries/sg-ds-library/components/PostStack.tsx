import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';
import { SgDsLibraryIcon } from './Icon';
import { SgDsLibraryPostCard } from './PostCard';
import { resolveWorkbenchModeProps } from './_shared';

export type SgDsLibraryPostStackProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  newCount?: number | string;
  showNewPill?: boolean;
};

export type SgDsLibraryPostStackNewPillProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  count?: number | string;
  label?: string;
};

export function SgDsLibraryPostStack(rawProps: SgDsLibraryPostStackProps) {
  const {
  children,
  className = '',
  newCount = 4,
  showNewPill = true,
  ...props
} = resolveWorkbenchModeProps(rawProps);
  return (
    <div {...props} className={['sg-ds-library-scope', 'post-stack', className].filter(Boolean).join(' ')}>
      {showNewPill ? <SgDsLibraryPostStackNewPill count={newCount} /> : null}
      {children ?? (
        <>
          <SgDsLibraryPostCard title="Live session notes" prose="A compact feed stack using source-backed post cards." />
          <SgDsLibraryPostCard userName="Koda" userInitials="KO" title="garden_after_midnight.wav" prose="New remix stems are open." />
        </>
      )}
    </div>
  );
}

export function SgDsLibraryPostStackNewPill(rawProps: SgDsLibraryPostStackNewPillProps) {
  const {
  className = '',
  count = 4,
  label,
  type = 'button',
  ...props
} = resolveWorkbenchModeProps(rawProps);
  return (
    <button {...props} className={['sg-ds-library-scope', 'post-stack-new-pill', className].filter(Boolean).join(' ')} type={type}>
      <SgDsLibraryIcon name="arrow-up" size="var(--c-post-stack-new-pill-icon-size)" />
      {label ?? `${count} new posts`}
    </button>
  );
}

export default SgDsLibraryPostStack;
