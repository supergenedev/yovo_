import type { InputHTMLAttributes, ReactNode } from 'react';
import { useEffect, useRef } from 'react';
import { resolveWorkbenchModeProps } from './_shared';

export type SgDsLibraryCheckboxSize = 'sm' | 'md' | 'lg';

export type SgDsLibraryCheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'children' | 'size' | 'type'> & {
  indeterminate?: boolean;
  inputClassName?: string;
  label?: ReactNode;
  size?: SgDsLibraryCheckboxSize;
};

export function SgDsLibraryCheckbox(rawProps: SgDsLibraryCheckboxProps) {
  const {
  className = '',
  disabled,
  indeterminate = false,
  inputClassName = '',
  label = 'Remember me',
  size = 'md',
  ...props
} = resolveWorkbenchModeProps(rawProps);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <label
      className={['sg-ds-library-scope', 'checkbox-label', className].filter(Boolean).join(' ')}
      data-size={size}
      data-disabled={disabled || undefined}
    >
      <input
        {...props}
        ref={inputRef}
        type="checkbox"
        className={['checkbox', inputClassName].filter(Boolean).join(' ')}
        data-size={size}
        data-indeterminate={indeterminate || undefined}
        disabled={disabled}
        aria-disabled={disabled || undefined}
        aria-checked={indeterminate ? 'mixed' : undefined}
      />
      <span className="checkbox-label-text">{label}</span>
    </label>
  );
}

export default SgDsLibraryCheckbox;
