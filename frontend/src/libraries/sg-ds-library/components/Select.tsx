import type { ReactNode, SelectHTMLAttributes } from 'react';
import { resolveWorkbenchModeProps } from './_shared';

export type SgDsLibrarySelectSize = 'sm' | 'md' | 'lg';
export type SgDsLibrarySelectState = 'default' | 'error' | 'success';

export type SgDsLibrarySelectOption = {
  disabled?: boolean;
  label: string;
  value: string;
};

export type SgDsLibrarySelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> & {
  children?: ReactNode;
  options?: SgDsLibrarySelectOption[];
  placeholder?: string;
  size?: SgDsLibrarySelectSize;
  state?: SgDsLibrarySelectState;
};

const DEFAULT_OPTIONS: SgDsLibrarySelectOption[] = [
  { label: 'Free', value: 'free' },
  { label: 'Creator', value: 'creator' },
  { label: 'Studio', value: 'studio' },
];

export function SgDsLibrarySelect(rawProps: SgDsLibrarySelectProps) {
  const {
  children,
  className = '',
  defaultValue = '',
  disabled,
  options = DEFAULT_OPTIONS,
  placeholder = 'Choose an option',
  size = 'md',
  state = 'default',
  value,
  ...props
} = resolveWorkbenchModeProps(rawProps);
  return (
    <div
      className={['sg-ds-library-scope', 'select-wrapper', className].filter(Boolean).join(' ')}
      data-size={size}
    >
      <select
        {...props}
        className="select"
        data-size={size}
        data-state={state === 'default' ? undefined : state}
        disabled={disabled}
        aria-disabled={disabled || undefined}
        value={value}
        defaultValue={value === undefined ? defaultValue : undefined}
      >
        {placeholder ? <option value="" disabled>{placeholder}</option> : null}
        {children ?? options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SgDsLibrarySelect;
