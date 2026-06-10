import type { HTMLAttributes, ReactNode } from 'react';
import { SgDsLibraryFollowRow } from './FollowRow';
import { SgDsLibraryNavItem } from './NavItem';
import { resolveWorkbenchModeProps } from './_shared';

export type SgDsLibraryRailGroupVariant = 'nav' | 'follow';

export type SgDsLibraryRailGroupProps = HTMLAttributes<HTMLElement> & {
  children?: ReactNode;
  label?: ReactNode;
  tailSlot?: ReactNode;
  variant?: SgDsLibraryRailGroupVariant;
};

export function SgDsLibraryRailGroup(rawProps: SgDsLibraryRailGroupProps) {
  const {
  children,
  className = '',
  label,
  tailSlot,
  variant = 'nav',
  ...props
} = resolveWorkbenchModeProps(rawProps);
  const Tag = variant === 'nav' ? 'nav' : 'section';
  const visibleLabel = label ?? (variant === 'follow' ? 'Following' : null);
  const accessibleLabel =
    props['aria-label'] ??
    (props['aria-labelledby'] ? undefined : typeof visibleLabel === 'string' && visibleLabel ? visibleLabel : variant === 'nav' ? 'Primary' : 'Following');

  return (
    <Tag
      {...props}
      aria-label={accessibleLabel}
      className={['sg-ds-library-scope', 'rail-group', className].filter(Boolean).join(' ')}
    >
      {visibleLabel ? (
        <div className="rail-label">
          <span>{visibleLabel}</span>
          {tailSlot}
        </div>
      ) : null}
      {children ?? (
        variant === 'nav' ? (
          <>
            <SgDsLibraryNavItem current icon="house" label="Home" variant="rail" />
            <SgDsLibraryNavItem icon="radio" label="Live" variant="rail" />
            <SgDsLibraryNavItem icon="library" label="Library" variant="rail" />
          </>
        ) : (
          <>
            <SgDsLibraryFollowRow initials="HL" name="Hailey Luna" state="live" />
            <SgDsLibraryFollowRow avatarTone="teal" initials="NV" name="NeoVoice" />
          </>
        )
      )}
    </Tag>
  );
}

export default SgDsLibraryRailGroup;
