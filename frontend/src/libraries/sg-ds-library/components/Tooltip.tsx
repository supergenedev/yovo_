import { useId } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { resolveWorkbenchModeProps } from './_shared';

export type SgDsLibraryTooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export type SgDsLibraryTooltipProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
  trigger: ReactNode;
  tip: ReactNode;
  placement?: SgDsLibraryTooltipPlacement;
  arrow?: boolean;
  tipId?: string;
};

export function SgDsLibraryTooltip(rawProps: SgDsLibraryTooltipProps) {
  const {
  arrow = true,
  className = '',
  placement = 'top',
  tip,
  tipId,
  trigger,
  ...props
} = resolveWorkbenchModeProps(rawProps);
  const autoId = useId();
  const resolvedId = tipId ?? `tip-${autoId}`;

  return (
    <span
      {...props}
      className={['sg-ds-library-scope', 'tooltip-wrapper', className].filter(Boolean).join(' ')}
    >
      <span className="tooltip-trigger" tabIndex={0} aria-describedby={resolvedId}>
        {trigger}
      </span>
      <span className="tooltip" id={resolvedId} role="tooltip" data-placement={placement}>
        {tip}
        {arrow ? <span className="tooltip-arrow" aria-hidden="true" /> : null}
      </span>
    </span>
  );
}

export default SgDsLibraryTooltip;
