import type { TextareaHTMLAttributes } from 'react';
import { resolveWorkbenchModeProps } from './_shared';

export type SgDsLibraryTextareaSize = 'sm' | 'md' | 'lg';
export type SgDsLibraryTextareaState = 'default' | 'error' | 'success';

export type SgDsLibraryTextareaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'rows'> & {
  rows?: number | string;
  size?: SgDsLibraryTextareaSize;
  state?: SgDsLibraryTextareaState;
};

export function SgDsLibraryTextarea(rawProps: SgDsLibraryTextareaProps) {
  const {
  className = '',
  disabled,
  readOnly,
  rows = 4,
  size = 'md',
  state = 'default',
  ...props
} = resolveWorkbenchModeProps(rawProps);
  return (
    <textarea
      {...props}
      className={['sg-ds-library-scope', 'textarea', className].filter(Boolean).join(' ')}
      data-size={size}
      data-state={state === 'default' ? undefined : state}
      disabled={disabled}
      aria-disabled={disabled || undefined}
      readOnly={readOnly}
      rows={normalizeRows(rows)}
    />
  );
}

function normalizeRows(value: number | string): number {
  const parsed = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? Math.round(parsed) : 4;
}

export default SgDsLibraryTextarea;
