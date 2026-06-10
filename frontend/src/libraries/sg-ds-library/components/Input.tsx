import { useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { SgDsLibraryButton } from './Button';
import { SgDsLibraryIcon } from './Icon';
import { resolveWorkbenchModeProps } from './_shared';

export type SgDsLibraryInputSize = 'sm' | 'md' | 'lg';
export type SgDsLibraryInputShape = 'default' | 'pill';
export type SgDsLibraryInputState = 'default' | 'error' | 'success';
export type SgDsLibraryInputType = 'text' | 'search' | 'email' | 'password' | 'url' | 'tel' | 'number';
export type SgDsLibraryInputLabelPosition = 'outside' | 'inside';

export type SgDsLibraryInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'children' | 'size' | 'type'> & {
  clearLabel?: string;
  clearable?: boolean;
  description?: ReactNode;
  label?: ReactNode;
  labelPosition?: SgDsLibraryInputLabelPosition;
  inputClassName?: string;
  /** Icon name from the project asset picker (workbench `control: 'icon'`). */
  leadingIcon?: string;
  /** Direct React node override for the leading slot. */
  leadingIconNode?: ReactNode;
  onClear?: () => void;
  shape?: SgDsLibraryInputShape;
  size?: SgDsLibraryInputSize;
  state?: SgDsLibraryInputState;
  /** Icon name from the project asset picker (workbench `control: 'icon'`). */
  trailingIcon?: string;
  /** Direct React node override for the trailing slot. */
  trailingIconNode?: ReactNode;
  type?: SgDsLibraryInputType;
};

function renderIconSlot(
  name: string | undefined,
  node: ReactNode | undefined,
): ReactNode {
  if (node !== undefined) return node;
  if (name) return <SgDsLibraryIcon name={name} size="1em" />;
  return null;
}

export function SgDsLibraryInput(rawProps: SgDsLibraryInputProps) {
  const {
  className = '',
  clearLabel = 'Clear input',
  clearable = false,
  description,
  disabled,
  id,
  inputClassName = '',
  label,
  labelPosition = 'outside',
  leadingIcon,
  leadingIconNode,
  onClear,
  readOnly,
  shape = 'default',
  size = 'md',
  state = 'default',
  style,
  trailingIcon,
  trailingIconNode,
  type = 'text',
  ...props
} = resolveWorkbenchModeProps(rawProps);
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const descriptionId = description ? `${inputId}-description` : undefined;
  const lead = renderIconSlot(leadingIcon, leadingIconNode);
  const trail = clearable ? null : renderIconSlot(trailingIcon, trailingIconNode);
  const hasInsideLabel = Boolean(label) && labelPosition === 'inside';
  const hasOutsideLabel = Boolean(label) && labelPosition === 'outside';
  const hasFieldChrome = Boolean(label || description);
  const hasWrapper = Boolean(lead || trail || clearable || hasInsideLabel);
  const inputClass = [
    hasWrapper ? null : 'sg-ds-library-scope',
    'input',
    lead ? 'input--with-leading-icon' : null,
    trail || clearable ? 'input--with-trailing-icon' : null,
    hasInsideLabel ? 'input--with-inside-label' : null,
    inputClassName,
    hasWrapper || hasFieldChrome ? null : className,
  ].filter(Boolean).join(' ');

  // Author styling (e.g. width) targets the component's root element — the
  // field/wrapper when present, otherwise the bare input — so the inner input
  // (always width:100%) fills the sized component instead of the style landing
  // on the input while the wrapper independently stretches.
  const inputStyle = hasWrapper || hasFieldChrome ? undefined : style;
  const wrapperStyle = hasFieldChrome ? undefined : style;

  const input = (
    <input
      {...props}
      id={inputId}
      type={type}
      className={inputClass}
      style={inputStyle}
      data-size={size}
      data-shape={shape === 'pill' ? 'pill' : undefined}
      data-state={state === 'default' ? undefined : state}
      disabled={disabled}
      aria-disabled={disabled || undefined}
      aria-describedby={descriptionId}
      readOnly={readOnly}
    />
  );

  const control = hasWrapper ? (
    <div
      className={['sg-ds-library-scope', 'input-wrapper', hasFieldChrome ? '' : className].filter(Boolean).join(' ')}
      style={wrapperStyle}
      data-size={size}
      data-label-position={hasInsideLabel ? 'inside' : undefined}
    >
      {lead ? (
        <span className="input-icon input-icon-leading" aria-hidden="true">
          {lead}
        </span>
      ) : null}
      {hasInsideLabel ? <label className="input-label input-label-inside" htmlFor={inputId}>{label}</label> : null}
      {input}
      {trail ? (
        <span className="input-icon input-icon-trailing" aria-hidden="true">
          {trail}
        </span>
      ) : null}
      {clearable ? (
        <SgDsLibraryButton
          type="button"
          className="input-clear"
          aria-label={clearLabel}
          disabled={disabled || readOnly}
          iconOnly
          label={clearLabel}
          leadingIcon="x"
          onClick={onClear}
          shape="pill"
          size={size}
          variant="soft"
        />
      ) : null}
    </div>
  ) : input;

  if (!hasFieldChrome) return control;

  return (
    <div
      className={['sg-ds-library-scope', 'input-field', className].filter(Boolean).join(' ')}
      style={style}
      data-label-position={labelPosition}
      data-size={size}
      data-state={state === 'default' ? undefined : state}
    >
      {hasOutsideLabel ? <label className="input-label input-label-outside" htmlFor={inputId}>{label}</label> : null}
      {control}
      {description ? <span className="input-description" id={descriptionId}>{description}</span> : null}
    </div>
  );
}

export default SgDsLibraryInput;
