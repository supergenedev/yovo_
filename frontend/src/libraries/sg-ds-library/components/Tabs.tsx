import { Children, useEffect, useId, useMemo, useRef, useState, type ButtonHTMLAttributes, type CSSProperties, type HTMLAttributes, type ReactNode } from 'react';
import { SgDsLibraryIcon } from './Icon';
import { resolveWorkbenchModeProps } from './_shared';

export type SgDsLibraryTabBadgeVariant =
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
  | 'neutral';

function renderTabIconSlot(name: string | undefined, node: ReactNode | undefined): ReactNode {
  if (node !== undefined) return node;
  if (name) return <SgDsLibraryIcon name={name} size="1em" />;
  return null;
}

export type SgDsLibraryTabsSize = 'sm' | 'md' | 'lg';
export type SgDsLibraryTabsVariant = 'underline' | 'pill';
export type SgDsLibraryTabsItem = {
  id?: string;
  label: ReactNode;
  panel?: ReactNode;
};

export type SgDsLibraryTabsProps = HTMLAttributes<HTMLDivElement> & {
  ariaLabel?: string;
  children?: ReactNode;
  defaultValue?: string;
  items?: SgDsLibraryTabsItem[];
  size?: SgDsLibraryTabsSize;
  /** Pin the tab list to the top while the panel content scrolls past it. */
  sticky?: boolean;
  /** Top offset for the pinned tab list — clears a fixed header above. Number = px. */
  stickyOffset?: number | string;
  value?: string;
  variant?: SgDsLibraryTabsVariant;
};

export type SgDsLibraryTabsListProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  label?: string;
};

export type SgDsLibraryTabsBarProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
};

export type SgDsLibraryTabProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode;
  controls?: string;
  selected?: boolean;
  /** Backward-compatible label prop for Workbench/story args; `children` remains preferred. */
  label?: ReactNode;
  /** Icon name from the project asset picker (workbench `control: 'icon'`). */
  leadingIcon?: string;
  leadingIconNode?: ReactNode;
  /** Icon name from the project asset picker. */
  trailingIcon?: string;
  trailingIconNode?: ReactNode;
  /** Render a counter/status chip inline after the label. */
  badge?: boolean;
  badgeText?: string;
  badgeVariant?: SgDsLibraryTabBadgeVariant;
};

export type SgDsLibraryTabsPanelProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  labelledBy?: string;
  selected?: boolean;
};

const DEFAULT_TABS: SgDsLibraryTabsItem[] = [
  { id: 'overview', label: 'Overview', panel: 'Project summary and recent activity.' },
  { id: 'library', label: 'Library', panel: 'Reusable source-backed components.' },
  { id: 'settings', label: 'Settings', panel: 'Workspace preferences.' },
];

export function SgDsLibraryTabs(rawProps: SgDsLibraryTabsProps) {
  const {
  ariaLabel = 'Tabs',
  children,
  className = '',
  defaultValue,
  items = DEFAULT_TABS,
  size = 'md',
  sticky = false,
  stickyOffset,
  style,
  value,
  variant = 'underline',
  ...props
} = resolveWorkbenchModeProps(rawProps);
  const resolvedStyle = resolveSgDsLibraryTabsStyle(style, sticky ? stickyOffset : undefined);
  const generatedId = useId();
  const normalizedItems = useMemo(() => items.map((item, index) => ({
    ...item,
    id: item.id ?? `tab-${index}`,
  })), [items]);
  const fallbackValue = normalizedItems[0]?.id ?? 'tab';
  const [localValue, setLocalValue] = useState(defaultValue ?? value ?? fallbackValue);
  const activeValue = value ?? localValue;

  if (children) {
    return (
      <div
        {...props}
        className={['sg-ds-library-scope', 'tabs', className].filter(Boolean).join(' ')}
        data-size={size}
        data-sticky={sticky || undefined}
        data-variant={variant}
        style={resolvedStyle}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      {...props}
      className={['sg-ds-library-scope', 'tabs', className].filter(Boolean).join(' ')}
      data-size={size}
      data-sticky={sticky || undefined}
      data-variant={variant}
      style={resolvedStyle}
    >
      <SgDsLibraryTabsList label={ariaLabel}>
        {normalizedItems.map((item) => {
          const selected = item.id === activeValue;
          const tabId = `${generatedId}-${item.id}`;
          const panelId = `${tabId}-panel`;
          return (
            <SgDsLibraryTab
              controls={panelId}
              id={tabId}
              key={item.id}
              selected={selected}
              onClick={() => setLocalValue(item.id)}
            >
              {item.label}
            </SgDsLibraryTab>
          );
        })}
      </SgDsLibraryTabsList>
      {normalizedItems.map((item) => {
        const selected = item.id === activeValue;
        const tabId = `${generatedId}-${item.id}`;
        const panelId = `${tabId}-panel`;
        return (
          <SgDsLibraryTabsPanel id={panelId} key={item.id} labelledBy={tabId} selected={selected}>
            {item.panel}
          </SgDsLibraryTabsPanel>
        );
      })}
    </div>
  );
}

function normalizeSgDsLibraryTabsStickyOffset(value: number | string | undefined): string | undefined {
  if (typeof value === 'number') return Number.isFinite(value) ? `${value}px` : undefined;
  if (typeof value !== 'string') return undefined;
  const trimmedValue = value.trim();
  return trimmedValue ? trimmedValue : undefined;
}

function resolveSgDsLibraryTabsStyle(
  style: CSSProperties | undefined,
  stickyOffset: number | string | undefined,
): CSSProperties | undefined {
  const resolvedOffset = normalizeSgDsLibraryTabsStickyOffset(stickyOffset);
  if (resolvedOffset === undefined) return style;
  return { ...style, ['--c-tabs-sticky-offset']: resolvedOffset } as CSSProperties;
}

// Row that holds the scrollable tab list plus a fixed trailing actions area
// (sort/options buttons grouped on the right). The tab list scrolls
// horizontally while the trailing children stay put, and the underline base
// line runs continuously beneath both. Put a <SgDsLibraryTabsList> first and any
// actions group (e.g. SgDsLibraryToolbarGroup) after it.
export function SgDsLibraryTabsBar(rawProps: SgDsLibraryTabsBarProps) {
  const { children, className = '', ...props } = resolveWorkbenchModeProps(rawProps);
  return (
    <div {...props} className={['sg-ds-library-scope', 'tabs-bar', className].filter(Boolean).join(' ')}>
      {children}
    </div>
  );
}

export function SgDsLibraryTabsList(rawProps: SgDsLibraryTabsListProps) {
  const {
  children,
  className = '',
  label = 'Tabs',
  ...props
} = resolveWorkbenchModeProps(rawProps);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const sync = () => {
      el.dataset.scrollable = el.scrollWidth > el.clientWidth ? 'true' : 'false';
    };
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    const mo = new MutationObserver(sync);
    mo.observe(el, { childList: true, subtree: true, characterData: true });
    return () => { ro.disconnect(); mo.disconnect(); };
  }, []);
  return (
    <div
      {...props}
      ref={ref}
      aria-label={label}
      className={['sg-ds-library-scope', 'tabs-list', className].filter(Boolean).join(' ')}
      role="tablist"
    >
      {children ?? (
        <>
          <SgDsLibraryTab selected>Overview</SgDsLibraryTab>
          <SgDsLibraryTab>Activity</SgDsLibraryTab>
        </>
      )}
    </div>
  );
}

export function SgDsLibraryTab(rawProps: SgDsLibraryTabProps) {
  const {
  badge = false,
  badgeText = '',
  badgeVariant = 'danger',
  children,
  className = '',
  controls,
  label,
  leadingIcon,
  leadingIconNode,
  selected = false,
  trailingIcon,
  trailingIconNode,
  type = 'button',
  ...props
} = resolveWorkbenchModeProps(rawProps);
  const lead = renderTabIconSlot(leadingIcon, leadingIconNode);
  const trail = renderTabIconSlot(trailingIcon, trailingIconNode);
  const labelContent = children ?? label ?? 'Tab';
  const showBadge = badge && (badgeText || '').toString().length > 0;
  return (
    <button
      {...props}
      aria-controls={controls}
      aria-selected={selected}
      className={['sg-ds-library-scope', 'tab', className].filter(Boolean).join(' ')}
      role="tab"
      tabIndex={selected ? 0 : -1}
      type={type}
    >
      {lead ? <span className="tab-icon" aria-hidden="true">{lead}</span> : null}
      <span className="tab-label">{labelContent}</span>
      {showBadge ? (
        <span className="tab-badge" data-status={badgeVariant} aria-hidden="true">{badgeText}</span>
      ) : null}
      {trail ? <span className="tab-icon" aria-hidden="true">{trail}</span> : null}
    </button>
  );
}

export function SgDsLibraryTabsPanel(rawProps: SgDsLibraryTabsPanelProps) {
  const {
  children,
  className = '',
  labelledBy,
  selected = false,
  ...props
} = resolveWorkbenchModeProps(rawProps);
  return (
    <div
      {...props}
      aria-labelledby={labelledBy}
      className={['sg-ds-library-scope', 'tab-panel', className].filter(Boolean).join(' ')}
      hidden={!selected}
      role="tabpanel"
    >
      {Children.count(children) > 0 ? children : 'Panel content'}
    </div>
  );
}

export default SgDsLibraryTabs;
