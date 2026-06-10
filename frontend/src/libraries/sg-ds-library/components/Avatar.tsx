import type { HTMLAttributes, ReactNode } from 'react';
import { resolveWorkbenchModeProps } from './_shared';

export type SgDsLibraryAvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type SgDsLibraryAvatarShape = 'circle' | 'square' | 'rounded';
export type SgDsLibraryAvatarTone =
  | 'neutral'
  | 'brand'
  | 'teal'
  | 'amber'
  | 'purple'
  | 'coral'
  | 'blue'
  | 'pink'
  | 'green';
export type SgDsLibraryAvatarStatus = 'online' | 'offline' | 'busy' | 'away' | 'live';

export type SgDsLibraryAvatarProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
  src?: string;
  alt?: string;
  initials?: string;
  icon?: ReactNode;
  size?: SgDsLibraryAvatarSize;
  shape?: SgDsLibraryAvatarShape;
  tone?: SgDsLibraryAvatarTone;
  status?: SgDsLibraryAvatarStatus;
  statusLabel?: string;
  /** Suppress the pulsing animation on `status="live"` while keeping the
   *  red perimeter ring. Use for crowded grids / lists where movement
   *  becomes distracting. No effect on the other status values. */
  quietStatus?: boolean;
};

export function SgDsLibraryAvatar(rawProps: SgDsLibraryAvatarProps) {
  const {
  alt = '',
  className = '',
  icon,
  initials,
  quietStatus = false,
  shape = 'circle',
  size = 'md',
  src,
  status,
  statusLabel,
  tone = 'neutral',
  ...props
} = resolveWorkbenchModeProps(rawProps);
  return (
    <span
      {...props}
      className={['sg-ds-library-scope', 'avatar', className].filter(Boolean).join(' ')}
      data-size={size}
      data-shape={shape === 'circle' ? undefined : shape}
      data-tone={tone === 'neutral' ? undefined : tone}
    >
      {src ? <img className="avatar-image" src={src} alt={alt} /> : null}
      <span className="avatar-fallback" aria-hidden="true">
        {icon ?? initials ?? '?'}
      </span>
      {status ? (
        <span
          className="avatar-status"
          data-status={status}
          data-quiet={status === 'live' && quietStatus ? 'true' : undefined}
          aria-label={statusLabel ?? status}
        />
      ) : null}
    </span>
  );
}

export default SgDsLibraryAvatar;
