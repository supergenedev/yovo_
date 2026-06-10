import type { ReactNode } from 'react';
import { SgDsLibraryComment, type SgDsLibraryCommentProps } from './Comment';
import { resolveWorkbenchModeProps } from './_shared';

export type SgDsLibraryReplyCommentProps = SgDsLibraryCommentProps & {
  replyTo?: ReactNode;
  showConnector?: boolean;
};

export function SgDsLibraryReplyComment(rawProps: SgDsLibraryReplyCommentProps) {
  const {
    authorMeta,
    className = '',
    replyTo,
    showConnector = true,
    ...props
  } = resolveWorkbenchModeProps(rawProps);
  const resolvedAuthorMeta = authorMeta ?? (replyTo ? <span className="reply-comment-target">@{replyTo}에게 답글</span> : undefined);

  return (
    <SgDsLibraryComment
      {...props}
      authorMeta={resolvedAuthorMeta}
      className={['reply-comment', className].filter(Boolean).join(' ')}
      data-reply-connector={showConnector || undefined}
    />
  );
}

export default SgDsLibraryReplyComment;
