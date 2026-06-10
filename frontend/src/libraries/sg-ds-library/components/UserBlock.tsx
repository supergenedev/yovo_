import type { HTMLAttributes, ReactNode } from 'react';
import {
  SgDsLibraryAvatar,
  type SgDsLibraryAvatarShape,
  type SgDsLibraryAvatarSize,
  type SgDsLibraryAvatarStatus,
  type SgDsLibraryAvatarTone,
} from './Avatar';
import { SgDsLibraryButton, type SgDsLibraryButtonProps } from './Button';
import { SgDsLibraryIcon } from './Icon';
import { resolveWorkbenchModeProps } from './_shared';

export type SgDsLibraryUserBlockSize = 'sm' | 'md' | 'lg';
export type SgDsLibraryUserBlockDirection = 'row' | 'stack';

export type SgDsLibraryUserBlockProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  name?: string;
  meta?: string;
  initials?: string;
  avatarAlt?: string;
  avatarIcon?: ReactNode;
  avatarInitials?: string;
  avatarQuietStatus?: boolean;
  avatarShape?: SgDsLibraryAvatarShape;
  avatarSrc?: string;
  avatarStatus?: SgDsLibraryAvatarStatus;
  avatarStatusLabel?: string;
  avatarTone?: SgDsLibraryAvatarTone;
  avatarSize?: SgDsLibraryAvatarSize;
  verified?: boolean;
  size?: SgDsLibraryUserBlockSize;
  direction?: SgDsLibraryUserBlockDirection;
  action1Icon?: string;
  action1Label?: string;
  action1Variant?: SgDsLibraryButtonProps['variant'];
  action1AriaLabel?: string;
  action2Icon?: string;
  action2Label?: string;
  action2Variant?: SgDsLibraryButtonProps['variant'];
  action2AriaLabel?: string;
  /* action3*: UserCard가 Pick으로 참조하는 예약 슬롯. UserBlock 자체는 렌더하지
   * 않지만, 선언이 없으면 rest 스프레드로 DOM에 누수되고 타입도 깨진다. */
  action3Icon?: string;
  action3Label?: string;
  action3Variant?: SgDsLibraryButtonProps['variant'];
  action3AriaLabel?: string;
  tailSlot?: ReactNode;
};

export function SgDsLibraryUserBlock(rawProps: SgDsLibraryUserBlockProps) {
  const {
  action1AriaLabel,
  action1Icon,
  action1Label,
  action1Variant = 'ghost',
  action2AriaLabel,
  action2Icon,
  action2Label,
  action2Variant = 'primary',
  action3AriaLabel: _action3AriaLabel,
  action3Icon: _action3Icon,
  action3Label: _action3Label,
  action3Variant: _action3Variant,
  avatarAlt = '',
  avatarIcon,
  avatarInitials,
  avatarQuietStatus = false,
  avatarShape = 'circle',
  avatarSize = 'md',
  avatarSrc,
  avatarStatus,
  avatarStatusLabel,
  avatarTone = 'neutral',
  children,
  className = '',
  direction = 'row',
  initials = 'U',
  meta,
  name = 'User',
  size = 'md',
  tailSlot,
  verified = false,
  ...props
} = resolveWorkbenchModeProps(rawProps);
  const actionButtons = tailSlot === undefined && children === undefined
    ? [
        renderUserBlockAction('action1', action1Label, action1Icon, action1Variant, action1AriaLabel),
        renderUserBlockAction('action2', action2Label, action2Icon, action2Variant, action2AriaLabel),
      ].filter(Boolean)
    : [];
  const tail = tailSlot ?? children ?? (actionButtons.length > 0 ? <div className="user-block-actions">{actionButtons}</div> : null);
  const resolvedInitials = avatarInitials ?? initials;

  return (
    <div
      {...props}
      className={['sg-ds-library-scope', 'user-block', className].filter(Boolean).join(' ')}
      data-size={size}
      data-direction={direction === 'stack' ? 'stack' : undefined}
    >
      <SgDsLibraryAvatar
        alt={avatarAlt}
        icon={avatarIcon}
        initials={resolvedInitials}
        quietStatus={avatarQuietStatus}
        shape={avatarShape}
        size={avatarSize}
        src={avatarSrc}
        status={avatarStatus}
        statusLabel={avatarStatusLabel}
        tone={avatarTone}
      />
      <div className="user-block-body">
        <span className="user-block-name">
          {name}
          {verified ? (
            <span className="user-block-verified" aria-label="Verified">
              <SgDsLibraryIcon name="badge-check" size="1em" />
            </span>
          ) : null}
        </span>
        {meta ? <span className="user-block-meta">{meta}</span> : null}
      </div>
      {tail ? <div className="user-block-tail">{tail}</div> : null}
    </div>
  );
}

function renderUserBlockAction(
  key: string,
  label: string | undefined,
  icon: string | undefined,
  variant: SgDsLibraryButtonProps['variant'],
  ariaLabel: string | undefined,
): ReactNode {
  const resolvedLabel = typeof label === 'string' ? label.trim() : '';
  const resolvedIcon = typeof icon === 'string' ? icon.trim() : '';
  if (!resolvedLabel && !resolvedIcon) return null;

  const iconOnly = !resolvedLabel;
  return (
    <SgDsLibraryButton
      key={key}
      aria-label={iconOnly ? (ariaLabel || resolvedIcon) : ariaLabel}
      iconOnly={iconOnly}
      leadingIcon={resolvedIcon || undefined}
      size="sm"
      variant={variant}
    >
      {resolvedLabel || ariaLabel || resolvedIcon}
    </SgDsLibraryButton>
  );
}

export default SgDsLibraryUserBlock;
