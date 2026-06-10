import type { FieldsetHTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';
import { useId } from 'react';
import { resolveWorkbenchModeProps } from './_shared';

export type SgDsLibraryRadioSize = 'sm' | 'md' | 'lg';

export type SgDsLibraryRadioOption = {
  disabled?: boolean;
  label: ReactNode;
  value: string;
};

export type SgDsLibraryRadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'children' | 'size' | 'type'> & {
  inputClassName?: string;
  label?: ReactNode;
  size?: SgDsLibraryRadioSize;
};

export type SgDsLibraryRadioGroupProps = Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>, 'onChange'> & {
  defaultValue?: string;
  legend?: ReactNode;
  name?: string;
  onValueChange?: (value: string) => void;
  options?: SgDsLibraryRadioOption[];
  size?: SgDsLibraryRadioSize;
  value?: string;
};

const DEFAULT_OPTIONS: SgDsLibraryRadioOption[] = [
  { label: 'Free', value: 'free' },
  { label: 'Creator', value: 'creator' },
  { label: 'Studio', value: 'studio' },
];

export function SgDsLibraryRadio(rawProps: SgDsLibraryRadioProps) {
  const {
  className = '',
  disabled,
  inputClassName = '',
  label = 'Option',
  size = 'md',
  ...props
} = resolveWorkbenchModeProps(rawProps);
  return (
    <label
      className={['sg-ds-library-scope', 'radio-label', className].filter(Boolean).join(' ')}
      data-size={size}
      data-disabled={disabled || undefined}
    >
      <input
        {...props}
        type="radio"
        className={['radio', 'radio-input', inputClassName].filter(Boolean).join(' ')}
        data-size={size}
        disabled={disabled}
        aria-disabled={disabled || undefined}
      />
      <span className="radio-control" data-size={size} aria-hidden="true">
        <span className="radio-dot" />
      </span>
      <span className="radio-label-text">{label}</span>
    </label>
  );
}

export function SgDsLibraryRadioGroup(rawProps: SgDsLibraryRadioGroupProps) {
  const {
  className = '',
  defaultValue = 'creator',
  disabled,
  legend = 'Choose a plan',
  name,
  onValueChange,
  options = DEFAULT_OPTIONS,
  size = 'md',
  value,
  ...props
} = resolveWorkbenchModeProps(rawProps);
  const generatedName = useId();
  const groupName = name ?? generatedName;

  return (
    <fieldset
      {...props}
      className={['sg-ds-library-scope', 'radio-group', className].filter(Boolean).join(' ')}
      disabled={disabled}
    >
      {legend ? <legend className="radio-group-legend">{legend}</legend> : null}
      {options.map((option) => {
        const optionDisabled = disabled || option.disabled;
        return (
          <label
            key={option.value}
            className="radio-label"
            data-size={size}
            data-disabled={optionDisabled || undefined}
          >
            <input
              type="radio"
              className="radio radio-input"
              data-size={size}
              name={groupName}
              value={option.value}
              checked={value === undefined ? undefined : value === option.value}
              defaultChecked={value === undefined ? defaultValue === option.value : undefined}
              disabled={optionDisabled}
              aria-disabled={optionDisabled || undefined}
              onChange={(event) => {
                if (event.currentTarget.checked) onValueChange?.(option.value);
              }}
            />
            <span className="radio-control" data-size={size} aria-hidden="true">
              <span className="radio-dot" />
            </span>
            <span className="radio-label-text">{option.label}</span>
          </label>
        );
      })}
    </fieldset>
  );
}

export default SgDsLibraryRadioGroup;
