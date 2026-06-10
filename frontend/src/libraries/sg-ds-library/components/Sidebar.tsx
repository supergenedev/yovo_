import { Children, createContext, isValidElement, useContext, useEffect, useMemo, useState, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type CSSProperties, type HTMLAttributes, type ReactNode } from 'react';
import { SgDsLibraryAvatar, type SgDsLibraryAvatarTone } from './Avatar';
import { SgDsLibraryButton, type SgDsLibraryButtonVariant } from './Button';
import { SgDsLibraryIcon } from './Icon';
import { resolveWorkbenchModeProps } from './_shared';

export type SgDsLibrarySidebarActiveItem = 'home' | 'watch' | 'library' | 'audience' | 'settings';
export type SgDsLibrarySidebarBackground =
  | 'none'
  | 'surface'
  | 'soft'
  | 'subtle'
  | 'muted'
  | 'inverse'
  | 'accent'
  | 'glass';
export type SgDsLibrarySidebarCollapsedHeaderDisplay = 'symbol' | 'menu-button';
export type SgDsLibrarySidebarDrawerPlacement = 'left' | 'right';
export type SgDsLibrarySidebarDrawerTriggerPlacement = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
export type SgDsLibrarySidebarExpandedBrandDisplay = 'symbol-logo' | 'symbol' | 'logo';
export type SgDsLibrarySidebarPresentation = 'sidebar' | 'drawer';
export type SgDsLibrarySidebarRadius = 'none' | 'sm' | 'md' | 'lg';
export type SgDsLibrarySidebarFollowRowAs = 'a' | 'button' | 'div';
export type SgDsLibrarySidebarFollowRowStatus = 'default' | 'live';
export type SgDsLibrarySidebarTone = 'surface' | 'subtle' | 'inverse' | 'glass';
export type SgDsLibrarySidebarToggleVariant = Extract<SgDsLibraryButtonVariant, 'ghost' | 'secondary' | 'soft'>;
export type SgDsLibrarySidebarWidth = 'sm' | 'md' | 'lg' | (string & {});

type SidebarContextValue = {
  collapsed: boolean;
};

const SidebarContext = createContext<SidebarContextValue>({ collapsed: false });

type SidebarStyle = CSSProperties & {
  '--c-sidebar-collapsed-width'?: string;
  '--c-sidebar-height'?: string;
  '--c-sidebar-width'?: string;
};

function hasSidebarFooterContent(value: ReactNode): boolean {
  if (value === null || value === undefined || value === false) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.some(hasSidebarFooterContent);
  return true;
}

function splitSidebarChildren(value: ReactNode): { footerChildren: ReactNode; navChildren: ReactNode } {
  const footerChildren: ReactNode[] = [];
  const navChildren: ReactNode[] = [];

  Children.forEach(value, (child) => {
    if (child === null || child === undefined || child === false) return;
    if (isValidElement(child) && child.type === SgDsLibrarySidebarFooter) {
      footerChildren.push(child);
      return;
    }
    navChildren.push(child);
  });

  return {
    footerChildren: footerChildren.length > 0 ? footerChildren : null,
    navChildren: navChildren.length > 0 ? navChildren : null,
  };
}

export type SgDsLibrarySidebarProps = HTMLAttributes<HTMLElement> & {
  activeItem?: SgDsLibrarySidebarActiveItem;
  background?: SgDsLibrarySidebarBackground;
  brand?: ReactNode;
  brandMark?: ReactNode;
  brandMarkBackgroundPosition?: CSSProperties['backgroundPosition'];
  brandMarkBackgroundRepeat?: CSSProperties['backgroundRepeat'];
  brandMarkBackgroundSize?: CSSProperties['backgroundSize'];
  brandMarkIcon?: string;
  brandMarkSrc?: string;
  brandMarkText?: string;
  brandName?: ReactNode;
  brandNameBackgroundPosition?: CSSProperties['backgroundPosition'];
  brandNameBackgroundRepeat?: CSSProperties['backgroundRepeat'];
  brandNameBackgroundSize?: CSSProperties['backgroundSize'];
  brandNameSrc?: string;
  bordered?: boolean;
  children?: ReactNode;
  collapsed?: boolean;
  collapsedHeaderDisplay?: SgDsLibrarySidebarCollapsedHeaderDisplay;
  collapsedToggleVariant?: SgDsLibrarySidebarToggleVariant;
  collapsedWidth?: number | string;
  defaultCollapsed?: boolean;
  drawerOverlay?: boolean;
  drawerPlacement?: SgDsLibrarySidebarDrawerPlacement;
  /** @deprecated Use drawerPlacement. Kept for older saved pages. */
  drawerTriggerPlacement?: SgDsLibrarySidebarDrawerTriggerPlacement;
  expandedBrandDisplay?: SgDsLibrarySidebarExpandedBrandDisplay;
  headerActionLabel?: string;
  headerLogo?: ReactNode;
  headerLogoAlt?: string;
  headerLogoFit?: CSSProperties['objectFit'];
  headerLogoImage?: string;
  headerLogoImageToken?: string;
  headerLogoImageTokenCollection?: string;
  headerLogoPosition?: CSSProperties['objectPosition'];
  headerMedia?: ReactNode;
  headerMediaAlt?: string;
  headerMediaBackgroundAttachment?: CSSProperties['backgroundAttachment'];
  headerMediaBackgroundClip?: CSSProperties['backgroundClip'];
  headerMediaBackgroundImage?: string;
  headerMediaBackgroundImageToken?: string;
  headerMediaBackgroundImageTokenCollection?: string;
  headerMediaBackgroundOrigin?: CSSProperties['backgroundOrigin'];
  headerMediaBackgroundPosition?: CSSProperties['backgroundPosition'];
  headerMediaBackgroundRepeat?: CSSProperties['backgroundRepeat'];
  headerMediaBackgroundSize?: CSSProperties['backgroundSize'];
  headerMediaFit?: CSSProperties['objectFit'];
  headerMediaPosition?: CSSProperties['objectPosition'];
  headerMediaSrc?: string;
  headerSymbol?: ReactNode;
  headerSymbolAlt?: string;
  headerSymbolFit?: CSSProperties['objectFit'];
  headerSymbolImage?: string;
  headerSymbolImageToken?: string;
  headerSymbolImageTokenCollection?: string;
  headerSymbolPosition?: CSSProperties['objectPosition'];
  height?: number | string;
  onCollapsedChange?: (collapsed: boolean) => void;
  presentation?: SgDsLibrarySidebarPresentation;
  radius?: SgDsLibrarySidebarRadius;
  showFollowing?: boolean;
  signature?: ReactNode;
  soft?: boolean;
  symbol?: ReactNode;
  symbolIcon?: string;
  tone?: SgDsLibrarySidebarTone;
  width?: SgDsLibrarySidebarWidth;
};

export function SgDsLibrarySidebar(rawProps: SgDsLibrarySidebarProps) {
  const {
    activeItem = 'home',
    background,
    brand = 'StudioGrid',
    brandMark,
    brandMarkBackgroundPosition,
    brandMarkBackgroundRepeat,
    brandMarkBackgroundSize,
    brandMarkIcon = 'sparkles',
    brandMarkSrc,
    brandMarkText = 'SG',
    brandName,
    brandNameBackgroundPosition,
    brandNameBackgroundRepeat,
    brandNameBackgroundSize,
    brandNameSrc,
    bordered = false,
    children,
    className = '',
    collapsed,
    collapsedHeaderDisplay = 'symbol',
    collapsedToggleVariant = 'ghost',
    collapsedWidth,
    defaultCollapsed = false,
    drawerOverlay = true,
    drawerPlacement,
    drawerTriggerPlacement = 'top-left',
    expandedBrandDisplay = 'symbol-logo',
    headerActionLabel,
    headerLogo,
    headerLogoAlt,
    headerLogoFit,
    headerLogoImage,
    headerLogoImageToken,
    headerLogoImageTokenCollection,
    headerLogoPosition,
    headerMedia,
    headerMediaAlt,
    headerMediaBackgroundAttachment,
    headerMediaBackgroundClip,
    headerMediaBackgroundImage,
    headerMediaBackgroundImageToken,
    headerMediaBackgroundImageTokenCollection,
    headerMediaBackgroundOrigin,
    headerMediaBackgroundPosition,
    headerMediaBackgroundRepeat,
    headerMediaBackgroundSize,
    headerMediaFit,
    headerMediaPosition,
    headerMediaSrc,
    headerSymbol,
    headerSymbolAlt,
    headerSymbolFit,
    headerSymbolImage,
    headerSymbolImageToken,
    headerSymbolImageTokenCollection,
    headerSymbolPosition,
    height = '100%',
    onCollapsedChange,
    presentation = 'sidebar',
    radius = 'none',
    showFollowing = true,
    signature,
    soft = false,
    style,
    symbol,
    symbolIcon,
    tone = 'surface',
    width = 'md',
    ...props
  } = resolveWorkbenchModeProps(rawProps);
  void brandMarkBackgroundRepeat;
  void brandNameBackgroundRepeat;
  void headerLogoImageToken;
  void headerLogoImageTokenCollection;
  void headerMediaBackgroundClip;
  void headerMediaBackgroundImageToken;
  void headerMediaBackgroundImageTokenCollection;
  void headerMediaBackgroundRepeat;
  void headerSymbolImageToken;
  void headerSymbolImageTokenCollection;

  const [uncontrolledCollapsed, setUncontrolledCollapsed] = useState(defaultCollapsed);
  const [previewCollapsedOverride, setPreviewCollapsedOverride] = useState<boolean | null>(null);
  const [drawerContentMounted, setDrawerContentMounted] = useState(!defaultCollapsed);
  const [drawerTransitionOpen, setDrawerTransitionOpen] = useState(!defaultCollapsed);
  const resolvedCollapsed = previewCollapsedOverride ?? collapsed ?? uncontrolledCollapsed;
  const collapsedContext = useMemo(() => ({ collapsed: resolvedCollapsed }), [resolvedCollapsed]);
  const expandedContext = useMemo(() => ({ collapsed: false }), []);
  const resolvedBackground = background ?? getSidebarBackgroundFromTone(tone);
  const { width: _styleWidth, minWidth: _styleMinWidth, maxWidth: _styleMaxWidth, ...safeStyle } = style ?? {};
  const sidebarStyle: SidebarStyle = {
    '--c-sidebar-collapsed-width': normalizeSidebarCollapsedWidth(collapsedWidth, '88px'),
    '--c-sidebar-height': normalizeSidebarLength(height, '100%'),
    '--c-sidebar-width': normalizeSidebarWidth(width, undefined),
    ...safeStyle,
  };
  const resolvedHeaderSymbolSrc = resolveSidebarHeaderMediaSrc(
    headerSymbolImage,
    headerMediaBackgroundImage,
    headerMediaSrc,
    brandMarkSrc,
    headerMediaBackgroundAttachment,
    headerMediaBackgroundOrigin,
  );
  const resolvedHeaderLogoSrc = resolveSidebarHeaderMediaSrc(headerLogoImage, brandNameSrc);
  const resolvedHeaderSymbol = headerSymbol ?? headerMedia ?? brandMark ?? symbol ?? (
    <SidebarSymbolFallback icon={brandMarkIcon || symbolIcon} label={brandMarkText} />
  );
  const resolvedHeaderLogo = headerLogo ?? brandName ?? signature ?? brand;
  const resolvedHeaderSymbolFit = headerSymbolFit ?? headerMediaFit ?? resolveSidebarHeaderMediaFit(headerMediaBackgroundSize ?? brandMarkBackgroundSize);
  const resolvedHeaderSymbolPosition = headerSymbolPosition ?? headerMediaPosition ?? headerMediaBackgroundPosition ?? brandMarkBackgroundPosition;
  const resolvedHeaderLogoFit = headerLogoFit ?? headerMediaFit ?? resolveSidebarHeaderMediaFit(brandNameBackgroundSize);
  const resolvedHeaderLogoPosition = headerLogoPosition ?? brandNameBackgroundPosition ?? 'left center';
  const ariaLabel = props['aria-label'] ?? (typeof brand === 'string' ? `${brand} navigation` : 'Sidebar navigation');
  const resolvedDrawerPlacement = drawerPlacement ?? getSidebarDrawerPlacementFromTrigger(drawerTriggerPlacement);

  const toggleCollapsed = () => {
    const nextCollapsed = !resolvedCollapsed;
    if (collapsed === undefined) {
      setUncontrolledCollapsed(nextCollapsed);
    } else if (!onCollapsedChange) {
      setPreviewCollapsedOverride(nextCollapsed);
    }
    onCollapsedChange?.(nextCollapsed);
  };

  useEffect(() => {
    setPreviewCollapsedOverride(null);
  }, [collapsed]);

  useEffect(() => {
    if (presentation !== 'drawer') {
      setDrawerContentMounted(false);
      setDrawerTransitionOpen(false);
      return undefined;
    }
    if (!resolvedCollapsed) {
      setDrawerContentMounted(true);
      const frame = window.requestAnimationFrame(() => setDrawerTransitionOpen(true));
      return () => window.cancelAnimationFrame(frame);
    }
    setDrawerTransitionOpen(false);
    if (!drawerContentMounted) {
      return undefined;
    }
    const timeout = window.setTimeout(() => setDrawerContentMounted(false), 360);
    return () => window.clearTimeout(timeout);
  }, [drawerContentMounted, presentation, resolvedCollapsed]);

  const defaultContent = (
    <>
      <SgDsLibrarySidebarGroup label="Browse">
        <SgDsLibrarySidebarItem active={activeItem === 'home'} icon="house" label="Home" description="For you" />
        <SgDsLibrarySidebarItem active={activeItem === 'watch'} icon="play" label="Watch" description="Continue" />
        <SgDsLibrarySidebarItem active={activeItem === 'library'} icon="library" label="Library" badge="12" />
      </SgDsLibrarySidebarGroup>
      {showFollowing ? (
        <SgDsLibrarySidebarGroup label="Following">
          <SgDsLibrarySidebarFollowRow initials="HL" name="Hailey Luna" status="live" />
          <SgDsLibrarySidebarFollowRow avatarTone="teal" initials="NV" name="NeoVoice" />
          <SgDsLibrarySidebarFollowRow avatarTone="purple" initials="MX" name="Mika X" />
        </SgDsLibrarySidebarGroup>
      ) : null}
      <SgDsLibrarySidebarGroup label="Manage">
        <SgDsLibrarySidebarItem active={activeItem === 'audience'} icon="users" label="Audience" />
        <SgDsLibrarySidebarItem active={activeItem === 'settings'} icon="settings" label="Settings" />
      </SgDsLibrarySidebarGroup>
    </>
  );
  const { footerChildren, navChildren } = splitSidebarChildren(children);
  const resolvedContent = navChildren ?? defaultContent;
  const drawerRootStyle: SidebarStyle = {
    '--c-sidebar-collapsed-width': sidebarStyle['--c-sidebar-collapsed-width'],
    '--c-sidebar-height': sidebarStyle['--c-sidebar-height'],
    '--c-sidebar-width': sidebarStyle['--c-sidebar-width'],
  };

  const renderSidebarNode = (isCollapsed: boolean, rootProps: HTMLAttributes<HTMLElement> = props, extraClassName = '') => {
    const hideDrawerCollapsedContent = presentation === 'drawer' && isCollapsed;
    return (
      <aside
        {...rootProps}
        aria-label={rootProps['aria-label'] ?? ariaLabel}
        className={[
          'sg-ds-library-scope',
          'sidebar',
          `sidebar--bg-${resolvedBackground}`,
          `sidebar--radius-${radius}`,
          `sidebar--presentation-${presentation}`,
          presentation === 'drawer' ? `sidebar--drawer-placement-${resolvedDrawerPlacement}` : '',
          `sidebar--expanded-brand-${expandedBrandDisplay}`,
          bordered ? 'sidebar--bordered' : '',
          soft ? 'sidebar--soft' : '',
          isCollapsed ? 'is-collapsed' : 'is-expanded',
          className,
          extraClassName,
        ].filter(Boolean).join(' ')}
        data-collapsed={isCollapsed ? 'true' : 'false'}
        style={sidebarStyle}
      >
        <div className="sidebar-header">
          {isCollapsed && collapsedHeaderDisplay === 'menu-button' ? (
            <SgDsLibraryButton
              aria-label={headerActionLabel ?? 'Expand sidebar'}
              className="sidebar-collapsed-toggle"
              iconOnly
              leadingIcon="menu"
              onClick={toggleCollapsed}
              size="sm"
              variant={collapsedToggleVariant}
            />
          ) : (
            <button
              aria-label={isCollapsed ? (headerActionLabel ?? 'Expand sidebar') : undefined}
              className="sidebar-identity"
              disabled={!isCollapsed}
              onClick={isCollapsed ? toggleCollapsed : undefined}
              title={isCollapsed ? (headerActionLabel ?? 'Expand sidebar') : undefined}
              type="button"
            >
              <span className="sidebar-header-symbol">
                {resolvedHeaderSymbolSrc ? (
                  <SidebarHeaderMedia
                    alt={headerSymbolAlt ?? headerMediaAlt ?? ''}
                    className="sidebar-header-symbol-image"
                    fit={resolvedHeaderSymbolFit}
                    position={resolvedHeaderSymbolPosition}
                    src={resolvedHeaderSymbolSrc}
                  />
                ) : resolvedHeaderSymbol}
              </span>
              {resolvedHeaderLogoSrc || resolvedHeaderLogo ? (
                <span className="sidebar-header-logo">
                  {resolvedHeaderLogoSrc ? (
                    <SidebarHeaderMedia
                      alt={headerLogoAlt ?? ''}
                      className="sidebar-header-logo-image"
                      fit={resolvedHeaderLogoFit}
                      position={resolvedHeaderLogoPosition}
                      src={resolvedHeaderLogoSrc}
                    />
                  ) : resolvedHeaderLogo}
                </span>
              ) : null}
            </button>
          )}
          {!isCollapsed ? (
            <SgDsLibraryButton
              aria-label={headerActionLabel ?? 'Collapse sidebar'}
              className="sidebar-toggle"
              iconOnly
              leadingIcon="chevron-left"
              onClick={toggleCollapsed}
              size="sm"
              variant="ghost"
            />
          ) : null}
        </div>
        {!hideDrawerCollapsedContent ? <nav className="sidebar-nav">{resolvedContent}</nav> : null}
        {!hideDrawerCollapsedContent ? footerChildren : null}
      </aside>
    );
  };

  const sidebarNode = renderSidebarNode(resolvedCollapsed);

  if (presentation === 'drawer') {
    const shouldRenderDrawerContent = !resolvedCollapsed || drawerContentMounted;
    const drawerAnchorNode = renderSidebarNode(
      true,
      !resolvedCollapsed ? { ...props, 'aria-hidden': true } : props,
      ['sidebar-drawer-anchor', !resolvedCollapsed ? 'is-open-anchor' : ''].filter(Boolean).join(' '),
    );
    return (
      <div
        className={[
          'sg-ds-library-scope',
          'sidebar-drawer-layout',
          `sidebar-drawer-layout--${resolvedCollapsed ? 'collapsed' : 'expanded'}`,
        ].join(' ')}
        style={drawerRootStyle}
      >
        <SidebarContext.Provider value={collapsedContext}>
          {drawerAnchorNode}
        </SidebarContext.Provider>
        {shouldRenderDrawerContent ? (
          <div
            {...getSidebarDrawerScopeProps(props)}
            aria-hidden={resolvedCollapsed ? true : undefined}
            className={[
              'sg-ds-library-scope',
              'sidebar-drawer-root',
              `sidebar-drawer-root--${resolvedDrawerPlacement}`,
              drawerTransitionOpen ? 'is-open' : '',
              soft ? 'sidebar-drawer-root--soft' : '',
            ].filter(Boolean).join(' ')}
            style={drawerRootStyle}
          >
            {drawerOverlay ? (
              <button
                aria-hidden="true"
                className="sidebar-drawer-scrim"
                onClick={toggleCollapsed}
                tabIndex={-1}
                type="button"
              />
            ) : null}
            <div className="sidebar-drawer-panel">
              <SidebarContext.Provider value={expandedContext}>
                {renderSidebarNode(false)}
              </SidebarContext.Provider>
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <SidebarContext.Provider value={collapsedContext}>
      {sidebarNode}
    </SidebarContext.Provider>
  );
}

export type SgDsLibrarySidebarGroupProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  /** Number/text rendered next to the label (e.g. group item count). Optional. */
  count?: ReactNode;
  label?: ReactNode;
  /** Optional callback for the see-all action. Used when no seeAllHref is set. */
  onSeeAllClick?: () => void;
  /** Optional href for the see-all action. Renders the see-all slot as an <a>. */
  seeAllHref?: string;
  /** Icon name appended after the see-all label (default: chevron-right). */
  seeAllIcon?: string;
  /** Label for the right-edge "see all" link. Renders the see-all slot when set. */
  seeAllLabel?: ReactNode;
  /** Free-form ReactNode appended after count/see-all in the label tail. */
  tailSlot?: ReactNode;
};

export function SgDsLibrarySidebarGroup(rawProps: SgDsLibrarySidebarGroupProps) {
  const {
  children,
  className = '',
  count,
  label,
  onSeeAllClick,
  seeAllHref,
  seeAllIcon = 'chevron-right',
  seeAllLabel,
  tailSlot,
  ...props
} = resolveWorkbenchModeProps(rawProps);
  const { collapsed } = useContext(SidebarContext);
  const hasCount = count !== undefined && count !== null && count !== '' && count !== false;
  const hasSeeAll = hasSidebarFooterContent(seeAllLabel);
  const hasTailSlot = hasSidebarFooterContent(tailSlot);
  const hasTail = hasCount || hasSeeAll || hasTailSlot;

  const seeAllContent = hasSeeAll ? (
    <>
      <span className="sidebar-group-label-seeall-text">{seeAllLabel}</span>
      {seeAllIcon ? (
        <span className="sidebar-group-label-seeall-icon" aria-hidden="true">
          <SgDsLibraryIcon name={seeAllIcon} size="1em" />
        </span>
      ) : null}
    </>
  ) : null;

  const hasTrailing = hasSeeAll || hasTailSlot;
  return (
    <div className={['sg-ds-library-scope', 'sidebar-group', className].filter(Boolean).join(' ')} {...props}>
      {label ? (
        <div className="sidebar-group-label" aria-hidden={collapsed ? true : undefined}>
          <span className="sidebar-group-label-head">
            <span className="sidebar-group-label-text">{label}</span>
            {hasCount ? <span className="sidebar-group-label-count">{count}</span> : null}
          </span>
          {hasTrailing ? (
            <span className="sidebar-group-label-tail">
              {hasSeeAll ? (
                <a
                  className="sidebar-group-label-seeall"
                  href={seeAllHref}
                  onClick={onSeeAllClick}
                >
                  {seeAllContent}
                </a>
              ) : null}
              {hasTailSlot ? tailSlot : null}
            </span>
          ) : null}
        </div>
      ) : null}
      <div className="sidebar-group-items">{children}</div>
    </div>
  );
}

export type SgDsLibrarySidebarBadgeStatus = 'neutral' | 'info' | 'success' | 'warning' | 'danger';
export type SgDsLibrarySidebarBadgeVariant = 'subtle' | 'solid';

export type SgDsLibrarySidebarItemProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
  emphasized?: boolean;
  badge?: ReactNode;
  badgeStatus?: SgDsLibrarySidebarBadgeStatus;
  badgeVariant?: SgDsLibrarySidebarBadgeVariant;
  description?: ReactNode;
  href?: string;
  icon?: string;
  label?: ReactNode;
};

export function SgDsLibrarySidebarItem(rawProps: SgDsLibrarySidebarItemProps) {
  const {
  active = false,
  badge,
  badgeStatus = 'neutral',
  badgeVariant = 'subtle',
  className = '',
  description,
  emphasized = false,
  href,
  icon = 'circle',
  label = 'Item',
  type = 'button',
  ...props
} = resolveWorkbenchModeProps(rawProps);
  const { collapsed } = useContext(SidebarContext);
  const itemClassName = ['sg-ds-library-scope', 'sidebar-item', active ? 'is-active' : '', className].filter(Boolean).join(' ');
  const ariaLabel = typeof label === 'string' ? label : undefined;
  const isPrimitiveBadge = typeof badge === 'string' || typeof badge === 'number';
  const content = (
    <>
      <span className="sidebar-item-icon">
        <SgDsLibraryIcon name={icon} size={20} strokeWidth={2} />
      </span>
      <span className="sidebar-item-body">
        <span className="sidebar-item-label">{label}</span>
        {description ? <span className="sidebar-item-description">{description}</span> : null}
      </span>
      {badge != null && badge !== '' ? (
        <span className="sidebar-item-trailing">
          {isPrimitiveBadge ? (
            <span
              className="sidebar-item-badge"
              data-status={badgeStatus}
              data-variant={badgeVariant}
            >
              {badge}
            </span>
          ) : (
            badge
          )}
        </span>
      ) : null}
    </>
  );

  if (href) {
    const isPlaceholder = href === '#';
    return (
      <a
        aria-current={active ? 'page' : undefined}
        aria-label={collapsed ? ariaLabel : undefined}
        className={itemClassName}
        data-emphasized={emphasized ? 'true' : undefined}
        href={href}
        onClick={isPlaceholder ? (e) => e.preventDefault() : undefined}
        title={collapsed && typeof label === 'string' ? label : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      aria-current={active ? 'page' : undefined}
      aria-label={collapsed ? ariaLabel : undefined}
      className={itemClassName}
      data-emphasized={emphasized ? 'true' : undefined}
      title={collapsed && typeof label === 'string' ? label : undefined}
      type={type}
      {...props}
    >
      {content}
    </button>
  );
}

export type SgDsLibrarySidebarFollowRowSize = 'sm' | 'md';
export type SgDsLibrarySidebarFollowRowTailStatus = 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'live';
export type SgDsLibrarySidebarFollowRowTailVariant = 'plain' | 'subtle' | 'solid';

export type SgDsLibrarySidebarFollowRowProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'type'> & {
  active?: boolean;
  as?: SgDsLibrarySidebarFollowRowAs;
  avatarSrc?: string;
  avatarTone?: SgDsLibraryAvatarTone;
  buttonType?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  description?: ReactNode;
  initials?: string;
  name?: ReactNode;
  size?: SgDsLibrarySidebarFollowRowSize;
  status?: SgDsLibrarySidebarFollowRowStatus;
  tail?: ReactNode;
  tailStatus?: SgDsLibrarySidebarFollowRowTailStatus;
  tailVariant?: SgDsLibrarySidebarFollowRowTailVariant;
};

export function SgDsLibrarySidebarFollowRow(rawProps: SgDsLibrarySidebarFollowRowProps) {
  const {
  active = false,
  as = 'button',
  avatarSrc,
  avatarTone = 'brand',
  buttonType = 'button',
  className = '',
  description,
  href,
  initials = 'HL',
  name = 'Hailey Luna',
  size = 'md',
  status = 'default',
  style,
  tail,
  tailStatus,
  tailVariant,
  ...props
} = resolveWorkbenchModeProps(rawProps);
  const { collapsed } = useContext(SidebarContext);
  const isLive = status === 'live';
  const rowClassName = ['sg-ds-library-scope', 'sidebar-item', 'sidebar-follow-row', active ? 'is-active' : '', className].filter(Boolean).join(' ');
  const ariaLabel = typeof name === 'string' ? name : undefined;
  const isPrimitiveTail = typeof tail === 'string' || typeof tail === 'number';
  const resolvedTailStatus: SgDsLibrarySidebarFollowRowTailStatus = tailStatus ?? (isLive ? 'live' : 'neutral');
  const resolvedTailVariant: SgDsLibrarySidebarFollowRowTailVariant = tailVariant ?? (isLive ? 'plain' : 'plain');
  let resolvedTail: ReactNode;
  if (tail == null || tail === '') {
    resolvedTail = isLive
      ? <span className="sidebar-follow-row-tail" data-status="live" data-variant="plain">LIVE</span>
      : null;
  } else if (isPrimitiveTail) {
    resolvedTail = (
      <span
        className="sidebar-follow-row-tail"
        data-status={resolvedTailStatus}
        data-variant={resolvedTailVariant}
        data-tone={resolvedTailStatus === 'live' ? 'live' : undefined}
      >
        {tail}
      </span>
    );
  } else {
    resolvedTail = tail;
  }
  const content = (
    <>
      <span className="sidebar-item-icon sidebar-follow-row-avatar">
        <SgDsLibraryAvatar
          initials={initials}
          quietStatus
          size={size === 'sm' ? 'sm' : 'md'}
          src={avatarSrc}
          status={isLive ? 'live' : undefined}
          tone={avatarTone}
        />
      </span>
      <span className="sidebar-item-body">
        <span className="sidebar-item-label">{name}</span>
        {description ? <span className="sidebar-item-description">{description}</span> : null}
      </span>
      {hasSidebarFooterContent(resolvedTail) ? (
        <span className="sidebar-item-trailing">{resolvedTail}</span>
      ) : null}
    </>
  );
  const hostProps = {
    ...props,
    'aria-current': active ? 'page' : undefined,
    'aria-label': collapsed ? ariaLabel : undefined,
    className: rowClassName,
    'data-size': size,
    style,
    title: collapsed && typeof name === 'string' ? name : undefined,
  };

  if (as === 'button') {
    return <button {...(hostProps as ButtonHTMLAttributes<HTMLButtonElement>)} type={buttonType}>{content}</button>;
  }
  if (as === 'div') {
    return <div {...(hostProps as HTMLAttributes<HTMLDivElement>)}>{content}</div>;
  }
  const isPlaceholderHref = !href || href === '#';
  return (
    <a
      {...(hostProps as AnchorHTMLAttributes<HTMLAnchorElement>)}
      href={href}
      onClick={isPlaceholderHref ? (e) => e.preventDefault() : undefined}
    >
      {content}
    </a>
  );
}

export type SgDsLibrarySidebarFooterProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  primaryLabel?: ReactNode;
  primaryIcon?: string;
  primaryHref?: string;
  secondaryLabel?: ReactNode;
  secondaryIcon?: string;
  secondaryHref?: string;
};

export function SgDsLibrarySidebarFooter(rawProps: SgDsLibrarySidebarFooterProps) {
  const {
  children,
  className = '',
  primaryLabel = 'Dark mode',
  primaryIcon = 'moon',
  primaryHref,
  secondaryLabel = 'Settings',
  secondaryIcon = 'settings',
  secondaryHref,
  ...props
} = resolveWorkbenchModeProps(rawProps);
  const hasCustomContent = hasSidebarFooterContent(children);
  const hasPrimary = hasSidebarFooterContent(primaryLabel);
  const hasSecondary = hasSidebarFooterContent(secondaryLabel);

  return (
    <div {...props} className={['sg-ds-library-scope', 'sidebar-footer', className].filter(Boolean).join(' ')}>
      {hasCustomContent ? children : (
        <>
          {hasPrimary ? (
            <SgDsLibrarySidebarItem
              className="sidebar-footer-action"
              href={primaryHref}
              icon={primaryIcon}
              label={primaryLabel}
            />
          ) : null}
          {hasSecondary ? (
            <SgDsLibrarySidebarItem
              className="sidebar-footer-action"
              href={secondaryHref}
              icon={secondaryIcon}
              label={secondaryLabel}
            />
          ) : null}
        </>
      )}
    </div>
  );
}

function getSidebarDrawerScopeProps(props: HTMLAttributes<HTMLElement>): HTMLAttributes<HTMLDivElement> {
  const scopeProps: HTMLAttributes<HTMLDivElement> = {};
  for (const [key, value] of Object.entries(props)) {
    if (key === 'data-theme' || key.startsWith('data-wb-token')) {
      (scopeProps as Record<string, unknown>)[key] = value;
    }
  }
  return scopeProps;
}

function getSidebarDrawerPlacementFromTrigger(
  placement: SgDsLibrarySidebarDrawerTriggerPlacement,
): SgDsLibrarySidebarDrawerPlacement {
  return placement.endsWith('right') ? 'right' : 'left';
}

function normalizeSidebarWidth(value: number | string | undefined, fallback: string | undefined): string | undefined {
  if (typeof value === 'number') return Number.isFinite(value) ? `${value}px` : fallback;
  if (!value) return fallback;
  const trimmed = value.trim();
  if (!trimmed) return fallback;
  if (trimmed === 'sm') return '224px';
  if (trimmed === 'md') return '272px';
  if (trimmed === 'lg') return '320px';
  return /^-?\d+(\.\d+)?$/.test(trimmed) ? `${trimmed}px` : trimmed;
}

function normalizeSidebarCollapsedWidth(value: number | string | undefined, fallback: string): string {
  if (typeof value === 'number') return Number.isFinite(value) ? `${value}px` : fallback;
  if (!value) return fallback;
  const trimmed = value.trim();
  if (!trimmed) return fallback;
  return /^-?\d+(\.\d+)?$/.test(trimmed) ? `${trimmed}px` : trimmed;
}

function normalizeSidebarLength(value: number | string | undefined, fallback: string): string {
  if (typeof value === 'number') return Number.isFinite(value) ? `${value}rem` : fallback;
  if (!value) return fallback;
  const trimmed = value.trim();
  if (!trimmed) return fallback;
  return /^-?\d+(\.\d+)?$/.test(trimmed) ? `${trimmed}rem` : trimmed;
}

function getSidebarBackgroundFromTone(tone: SgDsLibrarySidebarTone): SgDsLibrarySidebarBackground {
  if (tone === 'subtle') return 'subtle';
  if (tone === 'inverse') return 'inverse';
  if (tone === 'glass') return 'glass';
  return 'surface';
}

function resolveSidebarHeaderMediaSrc(...values: Array<string | undefined>): string | undefined {
  return values.find(isLikelySidebarMediaSource);
}

type SidebarHeaderMediaProps = {
  alt: string;
  className: string;
  fit: CSSProperties['objectFit'];
  position: CSSProperties['objectPosition'];
  src: string;
};

function SidebarHeaderMedia({ alt, className, fit, position, src }: SidebarHeaderMediaProps) {
  const mediaStyle = { objectFit: fit, objectPosition: position };
  if (isSidebarVideoSource(src)) {
    return (
      <video
        aria-hidden={alt ? undefined : true}
        aria-label={alt || undefined}
        autoPlay
        className={className}
        draggable={false}
        loop
        muted
        playsInline
        preload="metadata"
        src={src}
        style={mediaStyle}
      />
    );
  }

  return <img alt={alt} className={className} draggable={false} src={src} style={mediaStyle} />;
}

function SidebarSymbolFallback({ icon, label }: { icon?: string; label: string }) {
  if (icon) return <SgDsLibraryIcon name={icon} size="100%" />;
  return <span className="sidebar-symbol-text">{label}</span>;
}

function resolveSidebarHeaderMediaFit(value: CSSProperties['backgroundSize'] | undefined): CSSProperties['objectFit'] {
  if (value === 'cover') return 'cover';
  if (value === 'contain') return 'contain';
  if (value === 'auto') return 'none';
  return 'contain';
}

function isLikelySidebarMediaSource(value: string | undefined): value is string {
  if (!value) return false;
  const trimmed = value.trim();
  return /^(https?:\/\/|data:(?:image|video)\/|blob:|\/|\.\/|\.\.\/)/i.test(trimmed);
}

function isSidebarVideoSource(src: string): boolean {
  const value = src.trim().toLowerCase();
  return /^data:video\//.test(value) || /\.(?:webm|mp4|m4v|mov|ogv)(?:[?#].*)?$/.test(value);
}

export default SgDsLibrarySidebar;
