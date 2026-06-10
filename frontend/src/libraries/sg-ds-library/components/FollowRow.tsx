import type { AnchorHTMLAttributes, ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';
import { SgDsLibraryAvatar, type SgDsLibraryAvatarTone } from './Avatar';
import { resolveWorkbenchModeProps } from './_shared';

export type SgDsLibraryFollowRowSize = 'sm' | 'md';
export type SgDsLibraryFollowRowState = 'default' | 'live';
export type SgDsLibraryFollowRowAs = 'a' | 'button' | 'div';
export type SgDsLibraryFollowRowTailStatus = 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'live';
export type SgDsLibraryFollowRowTailVariant = 'plain' | 'subtle' | 'solid';

export type SgDsLibraryFollowRowProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'type'> & {
  as?: SgDsLibraryFollowRowAs;
  avatarSrc?: string;
  avatarTone?: SgDsLibraryAvatarTone;
  buttonType?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  initials?: string;
  name?: ReactNode;
  size?: SgDsLibraryFollowRowSize;
  state?: SgDsLibraryFollowRowState;
  tail?: ReactNode;
  tailStatus?: SgDsLibraryFollowRowTailStatus;
  tailVariant?: SgDsLibraryFollowRowTailVariant;
};

export function SgDsLibraryFollowRow(rawProps: SgDsLibraryFollowRowProps) {
  const {
  as = 'a',
  avatarSrc,
  avatarTone = 'brand',
  buttonType = 'button',
  className = '',
  href = '#',
  initials = 'HL',
  name = 'Hailey Luna',
  size = 'sm',
  state = 'default',
  tail,
  tailStatus,
  tailVariant,
  ...props
} = resolveWorkbenchModeProps(rawProps);
  const isLive = state === 'live';
  const classNames = ['sg-ds-library-scope', 'follow-row', className].filter(Boolean).join(' ');
  const isPrimitiveTail = typeof tail === 'string' || typeof tail === 'number';
  const resolvedTailStatus: SgDsLibraryFollowRowTailStatus = tailStatus ?? (isLive ? 'live' : 'neutral');
  const resolvedTailVariant: SgDsLibraryFollowRowTailVariant = tailVariant ?? 'plain';
  let resolvedTail: ReactNode;
  if (tail == null) {
    resolvedTail = (
      <span
        className="follow-row-tail"
        data-status={resolvedTailStatus}
        data-variant={resolvedTailVariant}
        data-tone={resolvedTailStatus === 'live' ? 'live' : undefined}
      >
        {isLive ? 'LIVE' : '5m'}
      </span>
    );
  } else if (tail === '') {
    resolvedTail = null;
  } else if (isPrimitiveTail) {
    resolvedTail = (
      <span
        className="follow-row-tail"
        data-status={resolvedTailStatus}
        data-variant={resolvedTailVariant}
        data-tone={resolvedTailStatus === 'live' ? 'live' : undefined}
      >
        {tail}
      </span>
    );
  } else {
    resolvedTail = tail;
  }
  const content = (
    <>
      <SgDsLibraryAvatar
        initials={initials}
        size={size === 'md' ? 'md' : 'sm'}
        src={avatarSrc}
        status={isLive ? 'live' : undefined}
        tone={avatarTone}
      />
      <span className="follow-row-name">{name}</span>
      {resolvedTail}
    </>
  );
  const hostProps = {
    ...props,
    className: classNames,
    'data-size': size,
    'data-state': isLive ? 'live' : undefined,
  };

  if (as === 'button') {
    return <button {...(hostProps as ButtonHTMLAttributes<HTMLButtonElement>)} type={buttonType}>{content}</button>;
  }
  if (as === 'div') {
    return <div {...(hostProps as HTMLAttributes<HTMLDivElement>)}>{content}</div>;
  }
  return (
    <a {...(hostProps as AnchorHTMLAttributes<HTMLAnchorElement>)} href={href}>
      {content}
    </a>
  );
}

export default SgDsLibraryFollowRow;
