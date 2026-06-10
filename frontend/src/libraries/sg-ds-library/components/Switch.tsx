import type { InputHTMLAttributes, ReactNode } from 'react';
import { resolveWorkbenchModeProps } from './_shared';

export type SgDsLibrarySwitchSize = 'sm' | 'md' | 'lg';

export type SgDsLibrarySwitchProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'children' | 'size' | 'type'> & {
  inputClassName?: string;
  label?: ReactNode;
  size?: SgDsLibrarySwitchSize;
};

export function SgDsLibrarySwitch(rawProps: SgDsLibrarySwitchProps) {
  const {
  className = '',
  disabled,
  inputClassName = '',
  label = 'Enable notifications',
  size = 'md',
  ...props
} = resolveWorkbenchModeProps(rawProps);
  return (
    <label
      className={['sg-ds-library-scope', 'switch-label', className].filter(Boolean).join(' ')}
      data-size={size}
      data-disabled={disabled || undefined}
    >
      <input
        {...props}
        type="checkbox"
        role="switch"
        className={['switch', 'switch-input', inputClassName].filter(Boolean).join(' ')}
        data-size={size}
        disabled={disabled}
        aria-disabled={disabled || undefined}
      />
      <span className="switch-track" data-size={size} aria-hidden="true">
        <span className="switch-thumb" />
      </span>
      <span className="switch-label-text">{label}</span>
    </label>
  );
}

export default SgDsLibrarySwitch;
