import type { ReactNode } from 'react';
import { SgDsLibraryCommentInput, type SgDsLibraryCommentInputProps } from './CommentInput';
import { resolveWorkbenchModeProps } from './_shared';

export type SgDsLibraryReplyCommentInputProps = SgDsLibraryCommentInputProps & {
  replyTo?: ReactNode;
  showConnector?: boolean;
};

export function SgDsLibraryReplyCommentInput(rawProps: SgDsLibraryReplyCommentInputProps) {
  const {
    className = '',
    context,
    placeholder = '답글을 입력하세요',
    replyTo,
    showConnector = true,
    submitLabel = '답글',
    textareaLabel = '대댓글 입력',
    ...props
  } = resolveWorkbenchModeProps(rawProps);
  const resolvedContext = context ?? (replyTo ? <><span className="reply-comment-input-target">@{replyTo}</span>에게 답글</> : '대댓글 작성');

  return (
    <SgDsLibraryCommentInput
      {...props}
      className={['reply-comment-input', className].filter(Boolean).join(' ')}
      context={resolvedContext}
      data-reply-connector={showConnector || undefined}
      placeholder={placeholder}
      submitLabel={submitLabel}
      textareaLabel={textareaLabel}
    />
  );
}

export default SgDsLibraryReplyCommentInput;
