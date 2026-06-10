import { useEffect, useId, useLayoutEffect, useRef, useState, type HTMLAttributes, type MouseEvent, type ReactNode } from 'react';
import {
  SgDsLibraryButton,
  type SgDsLibraryButtonShape,
  type SgDsLibraryButtonSize,
  type SgDsLibraryButtonVariant,
} from './Button';
import {
  SgDsLibraryPopoverItem,
  SgDsLibraryPopoverList,
  type SgDsLibraryPopoverPlacement,
} from './Popover';
import { resolveWorkbenchModeProps } from './_shared';

export type SgDsLibraryButtonPopoverProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  arrow?: boolean;
  buttonAriaLabel?: string;
  buttonLabel?: ReactNode;
  buttonShape?: SgDsLibraryButtonShape;
  buttonSize?: SgDsLibraryButtonSize;
  buttonVariant?: SgDsLibraryButtonVariant;
  children?: ReactNode;
  closeOnItemClick?: boolean;
  defaultOpen?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  iconOnly?: boolean;
  leadingIcon?: string;
  onOpenChange?: (open: boolean) => void;
  placement?: SgDsLibraryPopoverPlacement;
  popoverId?: string;
  trailingIcon?: string;
};

function isElementTarget(target: EventTarget | null): target is Element {
  return target instanceof Element;
}

const BUTTON_POPOVER_OFFSET_FALLBACK = 8;
const BUTTON_POPOVER_VIEWPORT_MARGIN = 4;

// Position the (top-layer) panel relative to the trigger using fixed/viewport
// coordinates. Because the panel renders in the popover top layer, no ancestor
// `overflow` or `transform` clips it — but the top layer also means CSS can't
// anchor it to the trigger, so we measure and place it here, flipping to the
// opposite side and clamping to the viewport when space runs out.
function positionButtonPopoverPanel(
  trigger: HTMLElement,
  panel: HTMLElement,
  placement: SgDsLibraryPopoverPlacement,
): void {
  const t = trigger.getBoundingClientRect();
  const p = panel.getBoundingClientRect();
  const panelWidth = p.width;
  const panelHeight = p.height;
  const viewportWidth = document.documentElement.clientWidth;
  const viewportHeight = document.documentElement.clientHeight;
  const margin = BUTTON_POPOVER_VIEWPORT_MARGIN;
  const offsetRaw = parseFloat(getComputedStyle(panel).getPropertyValue('--c-popover-offset'));
  const offset = Number.isFinite(offsetRaw) ? offsetRaw : BUTTON_POPOVER_OFFSET_FALLBACK;

  const [requestedSide, align] = placement.split('-') as [string, string | undefined];
  let side = requestedSide;

  // Flip to the opposite side when the requested side would overflow and the
  // opposite side has room.
  if (side === 'bottom' && t.bottom + offset + panelHeight > viewportHeight && t.top - offset - panelHeight >= 0) {
    side = 'top';
  } else if (side === 'top' && t.top - offset - panelHeight < 0 && t.bottom + offset + panelHeight <= viewportHeight) {
    side = 'bottom';
  } else if (side === 'right' && t.right + offset + panelWidth > viewportWidth && t.left - offset - panelWidth >= 0) {
    side = 'left';
  } else if (side === 'left' && t.left - offset - panelWidth < 0 && t.right + offset + panelWidth <= viewportWidth) {
    side = 'right';
  }

  let top = 0;
  let left = 0;
  if (side === 'bottom' || side === 'top') {
    top = side === 'bottom' ? t.bottom + offset : t.top - offset - panelHeight;
    if (align === 'start') left = t.left;
    else if (align === 'end') left = t.right - panelWidth;
    else left = t.left + t.width / 2 - panelWidth / 2;
  } else {
    left = side === 'right' ? t.right + offset : t.left - offset - panelWidth;
    if (align === 'start') top = t.top;
    else if (align === 'end') top = t.bottom - panelHeight;
    else top = t.top + t.height / 2 - panelHeight / 2;
  }

  left = Math.min(Math.max(margin, left), Math.max(margin, viewportWidth - panelWidth - margin));
  top = Math.min(Math.max(margin, top), Math.max(margin, viewportHeight - panelHeight - margin));

  panel.style.left = `${Math.round(left)}px`;
  panel.style.top = `${Math.round(top)}px`;
}

export function SgDsLibraryButtonPopover(rawProps: SgDsLibraryButtonPopoverProps) {
  const {
    arrow = false,
    buttonAriaLabel,
    buttonLabel = '메뉴',
    buttonShape = 'default',
    buttonSize = 'sm',
    buttonVariant = 'soft',
    children,
    className = '',
    closeOnItemClick = true,
    defaultOpen = false,
    disabled = false,
    fullWidth = false,
    iconOnly = false,
    leadingIcon,
    onOpenChange,
    placement = 'bottom-end',
    popoverId,
    trailingIcon = 'chevron-down',
    ...props
  } = resolveWorkbenchModeProps(rawProps);
  const generatedPopoverId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [open, setOpenState] = useState(defaultOpen);
  const resolvedPopoverId = popoverId || `sg-ds-button-popover-${generatedPopoverId}`;

  useEffect(() => {
    setOpenState(defaultOpen);
  }, [defaultOpen]);

  // Promote the panel into the popover top layer while open and keep it pinned
  // to the trigger. The top layer is what lets the panel escape a clipping
  // parent frame; positioning is then our responsibility (see helper above).
  useLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel) return undefined;
    const supportsPopover = typeof panel.showPopover === 'function';

    if (!open) {
      if (supportsPopover && panel.matches(':popover-open')) {
        // Restore focus to the trigger ourselves with preventScroll *before*
        // hiding. Otherwise the browser's focus restoration on popover close
        // calls a plain focus() on the trigger, which scrolls it into view —
        // yanking a horizontally scrollable parent (e.g. a tab bar) to the end.
        const activeEl = panel.ownerDocument.activeElement;
        if (activeEl && panel.contains(activeEl)) {
          rootRef.current?.querySelector('button')?.focus({ preventScroll: true });
        }
        try { panel.hidePopover(); } catch { /* already closed */ }
      }
      return undefined;
    }

    if (supportsPopover && !panel.matches(':popover-open')) {
      try { panel.showPopover(); } catch { /* already open */ }
    }
    const reposition = () => {
      const root = rootRef.current;
      if (root && panelRef.current) positionButtonPopoverPanel(root, panelRef.current, placement);
    };
    reposition();
    const raf = requestAnimationFrame(reposition);
    window.addEventListener('scroll', reposition, true);
    window.addEventListener('resize', reposition);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', reposition, true);
      window.removeEventListener('resize', reposition);
    };
  }, [open, placement]);

  useEffect(() => {
    if (!open) return undefined;

    const handlePointerDown = (event: PointerEvent) => {
      const root = rootRef.current;
      if (!root || root.contains(event.target as Node)) return;
      setOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      rootRef.current?.querySelector('button')?.focus({ preventScroll: true });
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  const setOpen = (nextOpen: boolean) => {
    setOpenState(nextOpen);
    onOpenChange?.(nextOpen);
  };

  const handleTriggerClick = () => {
    if (disabled) return;
    setOpen(!open);
  };

  const handlePanelClick = (event: MouseEvent<HTMLDivElement>) => {
    if (!closeOnItemClick || !isElementTarget(event.target)) return;
    if (event.target.closest('.popover-item')) setOpen(false);
  };

  const content = children !== undefined ? children : (
    <SgDsLibraryPopoverList>
      <SgDsLibraryPopoverItem icon="list-filter">필터 적용</SgDsLibraryPopoverItem>
      <SgDsLibraryPopoverItem icon="arrow-down-up">정렬 변경</SgDsLibraryPopoverItem>
      <SgDsLibraryPopoverItem icon="settings">표시 설정</SgDsLibraryPopoverItem>
    </SgDsLibraryPopoverList>
  );

  return (
    <div
      {...props}
      ref={rootRef}
      className={['sg-ds-library-scope', 'button-popover', className].filter(Boolean).join(' ')}
      data-full-width={fullWidth ? 'true' : undefined}
      data-open={open ? 'true' : undefined}
      data-placement={placement}
    >
      <SgDsLibraryButton
        aria-controls={resolvedPopoverId}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={buttonAriaLabel || (iconOnly && typeof buttonLabel === 'string' ? buttonLabel : undefined)}
        disabled={disabled}
        iconOnly={iconOnly}
        leadingIcon={leadingIcon}
        onClick={handleTriggerClick}
        shape={buttonShape}
        size={buttonSize}
        trailingIcon={iconOnly ? undefined : trailingIcon}
        variant={buttonVariant}
      >
        {buttonLabel}
      </SgDsLibraryButton>
      <div
        className="sg-ds-library-scope popover button-popover-panel"
        data-placement={placement}
        id={resolvedPopoverId}
        onClick={handlePanelClick}
        popover="manual"
        ref={panelRef}
      >
        {content}
        {arrow ? <span className="popover-arrow" aria-hidden="true" /> : null}
      </div>
    </div>
  );
}

export default SgDsLibraryButtonPopover;
