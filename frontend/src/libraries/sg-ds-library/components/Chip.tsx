import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';
import { SgDsLibraryIcon } from './Icon';
import { resolveWorkbenchModeProps } from './_shared';

export type SgDsLibraryChipSize = 'sm' | 'md';
export type SgDsLibraryChipTone = 'neutral' | 'brand';
export type SgDsLibraryChipVariant = 'default' | 'outline';

type CommonProps = {
  children?: ReactNode;
  /** Icon name from the project asset picker (workbench `control: 'icon'`). */
  icon?: string;
  /** Direct React node override (escape hatch for programmatic usage). */
  iconNode?: ReactNode;
  size?: SgDsLibraryChipSize;
  tone?: SgDsLibraryChipTone;
  variant?: SgDsLibraryChipVariant;
};

export type SgDsLibraryChipStaticProps = HTMLAttributes<HTMLSpanElement> &
  CommonProps & {
    as?: 'span';
    pressed?: never;
    removable?: boolean;
    onRemove?: () => void;
    removeLabel?: string;
  };

export type SgDsLibraryChipButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  CommonProps & {
    as: 'button';
    pressed?: boolean;
    removable?: never;
    onRemove?: never;
    removeLabel?: never;
  };

export type SgDsLibraryChipProps = SgDsLibraryChipStaticProps | SgDsLibraryChipButtonProps;

function renderIcon(icon: string | undefined, iconNode: ReactNode | undefined): ReactNode {
  if (iconNode !== undefined) return iconNode;
  if (icon) return <SgDsLibraryIcon name={icon} size="1em" />;
  return null;
}

export function SgDsLibraryChip(props: SgDsLibraryChipProps) {
  props = resolveWorkbenchModeProps(props);
  const {
    children = 'Tag',
    className = '',
    icon,
    iconNode,
    size = 'md',
    tone = 'neutral',
    variant = 'default',
  } = props;

  const sharedClass = ['sg-ds-library-scope', 'chip', className].filter(Boolean).join(' ');
  const sharedAttrs = {
    'data-size': size,
    'data-tone': tone === 'neutral' ? undefined : tone,
    'data-variant': variant === 'default' ? undefined : variant,
  };
  const resolvedIcon = renderIcon(icon, iconNode);

  if (props.as === 'button') {
    const { as: _as, pressed, ...rest } = props;
    return (
      <button
        type="button"
        {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
        className={sharedClass}
        aria-pressed={pressed}
        {...sharedAttrs}
      >
        {resolvedIcon ? <span className="chip-icon" aria-hidden="true">{resolvedIcon}</span> : null}
        <span className="chip-label">{children}</span>
      </button>
    );
  }

  const { as: _as, removable, onRemove, removeLabel = '제거', ...rest } = props;
  return (
    <span
      {...(rest as HTMLAttributes<HTMLSpanElement>)}
      className={sharedClass}
      data-removable={removable || undefined}
      {...sharedAttrs}
    >
      {resolvedIcon ? <span className="chip-icon" aria-hidden="true">{resolvedIcon}</span> : null}
      <span className="chip-label">{children}</span>
      {removable ? (
        <button
          type="button"
          className="chip-remove"
          aria-label={removeLabel}
          onClick={onRemove}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      ) : null}
    </span>
  );
}

export default SgDsLibraryChip;
