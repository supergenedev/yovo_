import type { HTMLAttributes, ReactNode } from 'react';
import { SgDsLibraryDivider } from './Divider';
import { SgDsLibraryFollowRow } from './FollowRow';
import { SgDsLibraryIcon } from './Icon';
import { SgDsLibraryLink } from './Link';
import { SgDsLibraryNavItem } from './NavItem';
import { SgDsLibraryRailFooter } from './RailFooter';
import { SgDsLibraryRailGroup } from './RailGroup';
import { resolveWorkbenchModeProps } from './_shared';

export type SgDsLibraryRailActiveItem = 'home' | 'live' | 'library' | 'messages';
export type SgDsLibraryRailSize = 'compact' | 'default' | 'wide';

export type SgDsLibraryRailProps = HTMLAttributes<HTMLElement> & {
  activeItem?: SgDsLibraryRailActiveItem;
  brand?: string;
  children?: ReactNode;
  collapsed?: boolean;
  footerPrimaryLabel?: string;
  footerSecondaryLabel?: string;
  showFollowing?: boolean;
  showFooter?: boolean;
  size?: SgDsLibraryRailSize;
  subtitle?: string;
};

export function SgDsLibraryRail(rawProps: SgDsLibraryRailProps) {
  const {
  activeItem = 'home',
  brand = 'StudioGrid',
  children,
  className = '',
  collapsed = false,
  footerPrimaryLabel = 'Dark mode',
  footerSecondaryLabel = 'Settings',
  showFollowing = true,
  showFooter = true,
  size = 'default',
  subtitle = 'Creator studio',
  ...props
} = resolveWorkbenchModeProps(rawProps);
  const ariaLabel = props['aria-label'] ?? `${brand} navigation`;

  return (
    <aside
      {...props}
      aria-label={ariaLabel}
      className={['sg-ds-library-scope', 'app-rail', className].filter(Boolean).join(' ')}
      data-collapsed={collapsed || undefined}
      data-size={size === 'default' ? undefined : size}
    >
      {children ?? (
        <>
          <header className="rail-head">
            <div className="rail-brand" aria-label={brand}>
              <span className="rail-brand-mark" aria-hidden="true">
                <SgDsLibraryIcon name="sparkles" size="1em" />
              </span>
              <span className="rail-brand-text">
                <span className="rail-brand-name">{brand}</span>
                {subtitle ? <span className="rail-brand-subtitle">{subtitle}</span> : null}
              </span>
            </div>
          </header>

          <div className="rail-body">
            <SgDsLibraryRailGroup aria-label="Primary">
              <SgDsLibraryNavItem current={activeItem === 'home'} icon="house" label="Home" variant="rail" />
              <SgDsLibraryNavItem current={activeItem === 'live'} icon="radio" label="Live" tail="12" variant="rail" />
              <SgDsLibraryNavItem current={activeItem === 'library'} icon="library" label="Library" variant="rail" />
              <SgDsLibraryNavItem current={activeItem === 'messages'} icon="bell" label="Messages" tail="3" variant="rail" />
            </SgDsLibraryRailGroup>

            {showFollowing ? (
              <>
                <SgDsLibraryDivider inset="both" />
                <SgDsLibraryRailGroup
                  label="Following"
                  tailSlot={<SgDsLibraryLink size="sm" variant="subtle">All</SgDsLibraryLink>}
                  variant="follow"
                >
                  <SgDsLibraryFollowRow initials="HL" name="Hailey Luna" state="live" />
                  <SgDsLibraryFollowRow avatarTone="teal" initials="NV" name="NeoVoice" />
                  <SgDsLibraryFollowRow avatarTone="violet" initials="MX" name="Mika X" />
                </SgDsLibraryRailGroup>
              </>
            ) : null}
          </div>

          {showFooter ? (
            <SgDsLibraryRailFooter
              primaryLabel={footerPrimaryLabel}
              secondaryLabel={footerSecondaryLabel}
            />
          ) : null}
        </>
      )}
    </aside>
  );
}

export default SgDsLibraryRail;
