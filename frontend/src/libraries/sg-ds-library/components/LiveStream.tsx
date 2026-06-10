import type { HTMLAttributes } from 'react';
import { SgDsLibraryIcon } from './Icon';
import { resolveWorkbenchModeProps } from './_shared';

export type SgDsLibraryLiveStreamProps = HTMLAttributes<HTMLSpanElement> & {
  label?: string;
  viewerCount?: string;
  viewerIcon?: string;
};

export function SgDsLibraryLiveStreamBadge(rawProps: HTMLAttributes<HTMLSpanElement> & { label?: string }) {
  const {
  children,
  className = '',
  label = 'LIVE',
  ...props
} = resolveWorkbenchModeProps(rawProps);
  return (
    <span {...props} className={['sg-ds-library-scope', 'live-stream-badge', className].filter(Boolean).join(' ')}>
      {children ?? label}
    </span>
  );
}

export function SgDsLibraryLiveStreamViewerCount(rawProps: SgDsLibraryLiveStreamProps) {
  const {
  children,
  className = '',
  viewerCount = '4,218 watching',
  viewerIcon = 'eye',
  ...props
} = resolveWorkbenchModeProps(rawProps);
  return (
    <span {...props} className={['sg-ds-library-scope', 'live-stream-viewer-count', className].filter(Boolean).join(' ')}>
      <SgDsLibraryIcon name={viewerIcon} size="1em" />
      {children ?? viewerCount}
    </span>
  );
}

export function SgDsLibraryLiveStream(rawProps: SgDsLibraryLiveStreamProps) {
  const {
  className = '',
  label = 'LIVE',
  viewerCount = '4,218 watching',
  viewerIcon = 'eye',
  ...props
} = resolveWorkbenchModeProps(rawProps);
  return (
    <span {...props} className={['sg-ds-library-scope', className].filter(Boolean).join(' ')} style={{ display: 'inline-flex', gap: 8, ...props.style }}>
      <SgDsLibraryLiveStreamBadge label={label} />
      <SgDsLibraryLiveStreamViewerCount viewerCount={viewerCount} viewerIcon={viewerIcon} />
    </span>
  );
}

export default SgDsLibraryLiveStream;
