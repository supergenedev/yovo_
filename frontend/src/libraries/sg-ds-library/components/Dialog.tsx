import { forwardRef, useEffect, useId, useRef, useState, type ButtonHTMLAttributes, type DialogHTMLAttributes, type HTMLAttributes, type KeyboardEvent, type MouseEvent, type ReactNode } from 'react';
import { SgDsLibraryButton, type SgDsLibraryButtonProps } from './Button';
import { SgDsLibraryIcon } from './Icon';
import { SgDsLibraryText } from './Text';
import { resolveWorkbenchModeProps } from './_shared';

export type SgDsLibraryDialogSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type SgDsLibraryDialogAlign = 'center' | 'top';
export type SgDsLibraryDialogFooterButtonLayout = 'right' | 'full';

export type SgDsLibraryDialogProps = Omit<DialogHTMLAttributes<HTMLDialogElement>, 'title'> & {
  action1Icon?: string;
  action1Label?: string;
  action1Variant?: SgDsLibraryButtonProps['variant'];
  action2Icon?: string;
  action2Label?: string;
  action2Variant?: SgDsLibraryButtonProps['variant'];
  align?: SgDsLibraryDialogAlign;
  bordered?: boolean;
  children?: ReactNode;
  description?: ReactNode;
  dimmed?: boolean;
  footerButtonLayout?: SgDsLibraryDialogFooterButtonLayout;
  floating?: boolean;
  onAction1?: () => void;
  onAction2?: () => void;
  onDismiss?: () => void;
  open?: boolean;
  scroll?: boolean;
  showClose?: boolean;
  size?: SgDsLibraryDialogSize;
  title?: ReactNode;
};

export type SgDsLibraryDialogHeaderProps = Omit<HTMLAttributes<HTMLElement>, 'title'> & {
  children?: ReactNode;
  description?: ReactNode;
  descriptionId?: string;
  onClose?: () => void;
  showClose?: boolean;
  title?: ReactNode;
  titleId?: string;
};

export type SgDsLibraryDialogTitleProps = HTMLAttributes<HTMLHeadingElement> & {
  children?: ReactNode;
};

export type SgDsLibraryDialogDescriptionProps = HTMLAttributes<HTMLParagraphElement> & {
  children?: ReactNode;
};

export type SgDsLibraryDialogBodyProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  scroll?: boolean;
};

export type SgDsLibraryDialogFooterProps = HTMLAttributes<HTMLElement> & {
  children?: ReactNode;
  layout?: SgDsLibraryDialogFooterButtonLayout;
};

export type SgDsLibraryDialogCloseProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: string;
};

export function SgDsLibraryDialog(rawProps: SgDsLibraryDialogProps) {
  const {
  action1Icon,
  action1Label,
  action1Variant = 'ghost',
  action2Icon,
  action2Label,
  action2Variant = 'primary',
  align = 'center',
  bordered = false,
  children,
  className = '',
  description,
  dimmed = true,
  footerButtonLayout = 'right',
  floating = true,
  onAction1,
  onAction2,
  onDismiss,
  open = true,
  scroll = false,
  showClose = true,
  size = 'md',
  title,
  ...props
} = resolveWorkbenchModeProps(rawProps);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const generatedId = useId();
  const titleId = props['aria-labelledby'] ?? `${generatedId}-title`;
  const descriptionId = props['aria-describedby'] ?? `${generatedId}-description`;
  const hasAction1 = typeof action1Label === 'string' && action1Label.trim().length > 0;
  const hasAction2 = typeof action2Label === 'string' && action2Label.trim().length > 0;
  const actionButtonSize: SgDsLibraryButtonProps['size'] = size === 'sm' ? 'sm' : size === 'md' ? 'md' : 'lg';
  const [scrollState, setScrollState] = useState({ canScrollDown: false, canScrollUp: false });

  useEffect(() => {
    const bodyElement = bodyRef.current;
    if (!open || !scroll || !bodyElement) {
      setScrollState({ canScrollDown: false, canScrollUp: false });
      return undefined;
    }

    let frameId: number | null = null;
    const commitScrollState = () => {
      frameId = null;
      const maxScrollTop = Math.max(0, bodyElement.scrollHeight - bodyElement.clientHeight);
      const nextState = {
        canScrollDown: maxScrollTop - bodyElement.scrollTop > 1,
        canScrollUp: bodyElement.scrollTop > 1,
      };
      setScrollState((current) => (
        current.canScrollDown === nextState.canScrollDown && current.canScrollUp === nextState.canScrollUp
          ? current
          : nextState
      ));
    };
    const updateScrollState = () => {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(commitScrollState);
    };

    updateScrollState();
    bodyElement.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(updateScrollState);
    observer?.observe(bodyElement);
    Array.from(bodyElement.children).forEach((child) => observer?.observe(child));
    return () => {
      if (frameId !== null) window.cancelAnimationFrame(frameId);
      bodyElement.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
      observer?.disconnect();
    };
  }, [children, open, scroll, size]);

  const handleBodyKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!scroll || event.target !== event.currentTarget) return;
    const bodyElement = bodyRef.current;
    if (!bodyElement) return;
    const pageStep = Math.max(48, bodyElement.clientHeight * 0.82);
    if (event.key === 'PageDown' || event.key === ' ') {
      event.preventDefault();
      bodyElement.scrollBy({ behavior: 'smooth', top: pageStep });
    }
    if (event.key === 'PageUp') {
      event.preventDefault();
      bodyElement.scrollBy({ behavior: 'smooth', top: -pageStep });
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      bodyElement.scrollBy({ behavior: 'smooth', top: 40 });
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      bodyElement.scrollBy({ behavior: 'smooth', top: -40 });
    }
    if (event.key === 'End') {
      event.preventDefault();
      bodyElement.scrollTo({ behavior: 'smooth', top: bodyElement.scrollHeight });
    }
    if (event.key === 'Home') {
      event.preventDefault();
      bodyElement.scrollTo({ behavior: 'smooth', top: 0 });
    }
  };

  const handleAction1Click = (event: MouseEvent<HTMLButtonElement>) => {
    onAction1?.();
    event.currentTarget.closest('dialog')?.close('action1');
  };

  const handleAction2Click = (event: MouseEvent<HTMLButtonElement>) => {
    onAction2?.();
    event.currentTarget.closest('dialog')?.close('action2');
  };

  return (
    <>
      {open && floating && dimmed ? <div aria-hidden="true" className="sg-ds-library-scope dialog-backdrop" /> : null}
      <dialog
        {...props}
        aria-describedby={description ? descriptionId : undefined}
        aria-labelledby={title ? titleId : undefined}
        className={['sg-ds-library-scope', 'dialog', className].filter(Boolean).join(' ')}
        data-align={align}
        data-bordered={bordered || undefined}
        data-can-scroll-down={scroll && scrollState.canScrollDown || undefined}
        data-can-scroll-up={scroll && scrollState.canScrollUp || undefined}
        data-dimmed={dimmed}
        data-floating={floating}
        data-scroll={scroll || undefined}
        data-size={size}
        open={open}
      >
        <SgDsLibraryDialogHeader
          description={description}
          descriptionId={descriptionId}
          onClose={onDismiss}
          showClose={showClose}
          title={title}
          titleId={titleId}
        />
        <SgDsLibraryDialogBody onKeyDown={scroll ? handleBodyKeyDown : undefined} ref={bodyRef} scroll={scroll} tabIndex={scroll ? 0 : undefined}>{children}</SgDsLibraryDialogBody>
        {hasAction1 || hasAction2 ? (
          <SgDsLibraryDialogFooter layout={footerButtonLayout}>
            {hasAction1 ? (
              <SgDsLibraryButton leadingIcon={action1Icon} size={actionButtonSize} variant={action1Variant} onClick={handleAction1Click}>{action1Label}</SgDsLibraryButton>
            ) : null}
            {hasAction2 ? (
              <SgDsLibraryButton leadingIcon={action2Icon} size={actionButtonSize} variant={action2Variant} onClick={handleAction2Click}>{action2Label}</SgDsLibraryButton>
            ) : null}
          </SgDsLibraryDialogFooter>
        ) : null}
      </dialog>
    </>
  );
}

export function SgDsLibraryDialogHeader(rawProps: SgDsLibraryDialogHeaderProps) {
  const {
  children,
  className = '',
  description,
  descriptionId,
  onClose,
  showClose = true,
  title,
  titleId,
  ...props
} = resolveWorkbenchModeProps(rawProps);
  const content = children ?? (
    <>
      {title ? <SgDsLibraryDialogTitle id={titleId}>{title}</SgDsLibraryDialogTitle> : null}
      {description ? <SgDsLibraryDialogDescription id={descriptionId}>{description}</SgDsLibraryDialogDescription> : null}
      {showClose ? <SgDsLibraryDialogClose onClick={() => onClose?.()} /> : null}
    </>
  );

  return <header {...props} className={['sg-ds-library-scope', 'dialog-header', className].filter(Boolean).join(' ')}>{content}</header>;
}

export function SgDsLibraryDialogTitle(rawProps: SgDsLibraryDialogTitleProps) {
  const { children, className = '', ...props } = resolveWorkbenchModeProps(rawProps);
  return <SgDsLibraryText {...props} as="h2" className={['dialog-title', className].filter(Boolean).join(' ')} variant="heading-3">{children}</SgDsLibraryText>;
}

export function SgDsLibraryDialogDescription(rawProps: SgDsLibraryDialogDescriptionProps) {
  const { children, className = '', ...props } = resolveWorkbenchModeProps(rawProps);
  return <SgDsLibraryText {...props} as="p" className={['dialog-description', className].filter(Boolean).join(' ')} tone="secondary" variant="caption">{children}</SgDsLibraryText>;
}

export const SgDsLibraryDialogBody = forwardRef<HTMLDivElement, SgDsLibraryDialogBodyProps>(function SgDsLibraryDialogBody({ children, className = '', scroll = false, ...props }, ref) {
  return <div {...props} className={['sg-ds-library-scope', 'dialog-body', className].filter(Boolean).join(' ')} data-scroll={scroll || undefined} ref={ref}>{children}</div>;
});

export function SgDsLibraryDialogFooter(rawProps: SgDsLibraryDialogFooterProps) {
  const { children, className = '', layout = 'right', ...props } = resolveWorkbenchModeProps(rawProps);
  return <footer {...props} className={['sg-ds-library-scope', 'dialog-footer', className].filter(Boolean).join(' ')} data-layout={layout}>{children}</footer>;
}

export function SgDsLibraryDialogClose(rawProps: SgDsLibraryDialogCloseProps) {
  const { className = '', label = 'Close dialog', onClick, type = 'button', ...props } = resolveWorkbenchModeProps(rawProps);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    if (!event.defaultPrevented) {
      event.currentTarget.closest('dialog')?.close();
    }
  };

  return (
    <button {...props} aria-label={label} className={['sg-ds-library-scope', 'dialog-close', className].filter(Boolean).join(' ')} onClick={handleClick} type={type}>
      <SgDsLibraryIcon name="x" size="1em" />
    </button>
  );
}

export default SgDsLibraryDialog;
