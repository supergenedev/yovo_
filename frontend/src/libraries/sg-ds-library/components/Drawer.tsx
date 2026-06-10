import { useEffect, useRef, useState, type CSSProperties, type HTMLAttributes, type ReactNode } from 'react';
import { SgDsLibraryButton } from './Button';
import { resolveWorkbenchModeProps } from './_shared';

export type SgDsLibraryDrawerPosition = 'bottom' | 'top' | 'left' | 'right';
export type SgDsLibraryDrawerBackground =
  | 'none'
  | 'surface'
  | 'subtle'
  | 'muted'
  | 'inverse'
  | 'accent'
  | 'soft'
  | 'glass';

export type SgDsLibraryDrawerProps = HTMLAttributes<HTMLDivElement> & {
  background?: SgDsLibraryDrawerBackground;
  children?: ReactNode;
  minSize?: number | string;
  onDismiss?: () => void;
  open?: boolean;
  overlay?: boolean;
  position?: SgDsLibraryDrawerPosition;
  size?: number | string;
  soft?: boolean;
};

type DrawerStyle = CSSProperties & {
  '--c-drawer-min-size'?: string;
  '--c-drawer-size'?: string;
};

export function SgDsLibraryDrawer(rawProps: SgDsLibraryDrawerProps) {
  const {
  background = 'surface',
  children,
  className = '',
  minSize,
  onDismiss,
  open = true,
  overlay = true,
  position = 'bottom',
  size = '48%',
  soft = false,
  style,
  ...props
} = resolveWorkbenchModeProps(rawProps);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const bodyScrollFrameRef = useRef<number | null>(null);
  const [bodyScrollState, setBodyScrollState] = useState({ down: false, up: false });
  const minSizeValue = normalizeDrawerLength(minSize);
  const sizeValue = normalizeDrawerLength(size);
  const drawerStyle: DrawerStyle = {
    '--c-drawer-min-size': minSizeValue,
    '--c-drawer-size': sizeValue,
  };
  const rootStyle: DrawerStyle = {
    ...drawerStyle,
    ...style,
  };
  const bodyClassName = [
    'drawer-body',
    bodyScrollState.up ? 'can-scroll-up' : '',
    bodyScrollState.down ? 'can-scroll-down' : '',
  ].filter(Boolean).join(' ');

  useEffect(() => {
    const body = bodyRef.current;
    if (!body || !open) {
      setBodyScrollState((current) => (
        current.up || current.down ? { down: false, up: false } : current
      ));
      return undefined;
    }
    const updateScrollState = () => {
      bodyScrollFrameRef.current = null;
      const maxScrollTop = Math.max(0, body.scrollHeight - body.clientHeight);
      const nextState = {
        up: body.scrollTop > 1,
        down: body.scrollTop < maxScrollTop - 1,
      };
      setBodyScrollState((current) => (
        current.up === nextState.up && current.down === nextState.down ? current : nextState
      ));
    };
    const scheduleScrollStateUpdate = () => {
      if (bodyScrollFrameRef.current !== null) return;
      bodyScrollFrameRef.current = window.requestAnimationFrame(updateScrollState);
    };

    body.addEventListener('scroll', scheduleScrollStateUpdate, { passive: true });
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(scheduleScrollStateUpdate);
    observer?.observe(body);
    Array.from(body.children).forEach((child) => observer?.observe(child));
    scheduleScrollStateUpdate();
    return () => {
      if (bodyScrollFrameRef.current !== null) {
        window.cancelAnimationFrame(bodyScrollFrameRef.current);
        bodyScrollFrameRef.current = null;
      }
      body.removeEventListener('scroll', scheduleScrollStateUpdate);
      observer?.disconnect();
    };
  }, [children, open, position, sizeValue, minSizeValue]);

  return (
    <div
      {...props}
      aria-hidden={!open}
      className={[
        'sg-ds-library-scope',
        'drawer-root',
        `drawer-root--${position}`,
        open ? 'is-open' : '',
        soft ? 'drawer-root--soft' : '',
        className,
      ].filter(Boolean).join(' ')}
      style={rootStyle}
    >
      {overlay ? <button aria-hidden="true" className="drawer-scrim" onClick={onDismiss} tabIndex={-1} type="button" /> : null}
      <div
        aria-modal={open || undefined}
        className={[
          'drawer',
          `drawer--${position}`,
          `drawer--bg-${background}`,
          soft ? 'drawer--soft' : '',
        ].filter(Boolean).join(' ')}
        role="dialog"
        style={drawerStyle}
      >
        <div className="drawer-head">
          <SgDsLibraryButton aria-label="Close drawer" iconOnly leadingIcon="x" onClick={onDismiss} size="sm" variant="ghost" />
        </div>
        <div className={bodyClassName} ref={bodyRef}>
          {children ?? 'Drawer content'}
        </div>
      </div>
    </div>
  );
}

function normalizeDrawerLength(value: number | string | undefined): string | undefined {
  if (typeof value === 'number') return Number.isFinite(value) ? `${value}%` : undefined;
  const text = value?.trim();
  if (!text) return undefined;
  return /^-?\d+(\.\d+)?$/.test(text) ? `${text}%` : text;
}

export default SgDsLibraryDrawer;
