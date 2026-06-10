import type { HTMLAttributes, ReactNode } from 'react';
import { SgDsLibraryAvatar, type SgDsLibraryAvatarTone } from './Avatar';
import { SgDsLibraryButton } from './Button';
import { SgDsLibraryIcon } from './Icon';
import { resolveWorkbenchModeProps } from './_shared';

export type SgDsLibraryCommentProps = HTMLAttributes<HTMLDivElement> & {
  author?: ReactNode;
  authorMeta?: ReactNode;
  avatarSrc?: string;
  avatarTone?: SgDsLibraryAvatarTone;
  body?: ReactNode;
  comment?: ReactNode;
  initials?: string;
  liked?: boolean;
  likeCount?: number | string;
  pinned?: boolean;
  replyCount?: number | string;
  time?: ReactNode;
  verified?: boolean;
  /* 인터랙션 콜백 — 미전달 시 표시 전용 */
  onLikeClick?: () => void;
  onReplyClick?: () => void;
  onFlagClick?: () => void;
  onMoreClick?: () => void;
};

export function SgDsLibraryComment(rawProps: SgDsLibraryCommentProps) {
  const {
  author = 'User',
  authorMeta,
  avatarSrc,
  avatarTone = 'brand',
  body,
  className = '',
  comment,
  initials = 'U',
  liked = false,
  likeCount,
  pinned = false,
  replyCount,
  time,
  verified = false,
  onLikeClick,
  onReplyClick,
  onFlagClick,
  onMoreClick,
  ...props
} = resolveWorkbenchModeProps(rawProps);
  const resolvedBody = body ?? comment;
  return (
    <div
      {...props}
      className={['sg-ds-library-scope', 'comment', className].filter(Boolean).join(' ')}
      data-pinned={pinned || undefined}
    >
      <SgDsLibraryAvatar size="sm" tone={avatarTone} initials={initials} src={avatarSrc} />
      <div className="comment-body">
        <div className="comment-head">
          <span className="comment-author">
            {author}
            {verified ? (
              <span className="comment-verified" aria-label="Verified">
                <SgDsLibraryIcon name="badge-check" size="1em" />
              </span>
            ) : null}
          </span>
          {authorMeta ? <span className="comment-author-meta">{authorMeta}</span> : null}
          {time ? <span className="comment-time">{time}</span> : null}
          {pinned ? <span className="comment-pinned" aria-label="Pinned"><SgDsLibraryIcon name="pin" size="1em" /> 고정됨</span> : null}
        </div>
        {resolvedBody ? <p className="comment-text">{resolvedBody}</p> : null}
        <div className="comment-reactions">
          <SgDsLibraryButton
            className={liked ? 'is-liked' : ''}
            variant="ghost"
            size="sm"
            leadingIcon="heart"
            style={liked ? { color: 'var(--p-color-brand-500, #ff0055)' } : undefined}
            aria-pressed={liked}
            label={typeof likeCount === 'undefined' ? '좋아요' : String(likeCount)}
            onClick={onLikeClick}
          />
          <SgDsLibraryButton
            variant="ghost"
            size="sm"
            leadingIcon="corner-down-right"
            label={typeof replyCount === 'undefined' || replyCount === 0 ? '답글' : `답글 ${replyCount}`}
            onClick={onReplyClick}
          />
          <SgDsLibraryButton
            variant="ghost"
            size="sm"
            iconOnly
            leadingIcon="flag"
            aria-label="신고"
            onClick={onFlagClick}
          />
          <SgDsLibraryButton
            variant="ghost"
            size="sm"
            iconOnly
            leadingIcon="ellipsis"
            aria-label="더보기"
            onClick={onMoreClick}
          />
        </div>
      </div>
    </div>
  );
}

export default SgDsLibraryComment;
