import type { HTMLAttributes, ReactNode } from 'react';
import { SgDsLibraryButton } from './Button';
import { SgDsLibraryIcon } from './Icon';
import { SgDsLibraryText } from './Text';
import { resolveWorkbenchModeProps } from './_shared';

export type SgDsLibraryEmptyStateSize = 'sm' | 'md' | 'lg';

export type SgDsLibraryEmptyStateProps = HTMLAttributes<HTMLDivElement> & {
  actionLabel?: string;
  actionsSlot?: ReactNode;
  artIcon?: string;
  artSlot?: ReactNode;
  body?: ReactNode;
  showArt?: boolean;
  size?: SgDsLibraryEmptyStateSize;
  title?: ReactNode;
  titleLevel?: 2 | 3;
};

export function SgDsLibraryEmptyState(rawProps: SgDsLibraryEmptyStateProps) {
  const {
  actionLabel = 'Create item',
  actionsSlot,
  artIcon = 'inbox',
  artSlot,
  body = 'When new content arrives, it will appear here.',
  className = '',
  showArt = true,
  size = 'md',
  title = 'Nothing here yet',
  titleLevel,
  ...props
} = resolveWorkbenchModeProps(rawProps);
  const actionContent =
    actionsSlot === undefined ? (
      <SgDsLibraryButton size={size}>{actionLabel}</SgDsLibraryButton>
    ) : (
      actionsSlot
    );
  const TitleTag = (titleLevel ?? (size === 'lg' ? 2 : 3)) === 2 ? 'h2' : 'h3';
  const titleVariant = TitleTag === 'h2' ? 'heading-2' : 'heading-3';

  return (
    <div
      {...props}
      className={['sg-ds-library-scope', 'empty-state', className].filter(Boolean).join(' ')}
      data-size={size}
    >
      {showArt ? (
        <div className="empty-state-art" aria-hidden="true">
          {artSlot ?? <SgDsLibraryIcon name={artIcon} size="50%" />}
        </div>
      ) : null}
      {title ? <SgDsLibraryText as={TitleTag} className="empty-state-title" variant={titleVariant}>{title}</SgDsLibraryText> : null}
      {body ? <SgDsLibraryText as="p" className="empty-state-body" tone="secondary" variant="body">{body}</SgDsLibraryText> : null}
      {actionContent ? <div className="empty-state-actions">{actionContent}</div> : null}
    </div>
  );
}

export default SgDsLibraryEmptyState;
