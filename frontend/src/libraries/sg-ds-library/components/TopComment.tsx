import type { HTMLAttributes } from 'react';
import { SgDsLibraryAvatar, type SgDsLibraryAvatarTone } from './Avatar';
import { resolveWorkbenchModeProps } from './_shared';

export type SgDsLibraryTopCommentProps = HTMLAttributes<HTMLDivElement> & {
  author?: string;
  comment?: string;
  initials?: string;
  avatarTone?: SgDsLibraryAvatarTone;
  avatarSrc?: string;
};

export function SgDsLibraryTopComment(rawProps: SgDsLibraryTopCommentProps) {
  const {
  author = 'SOYU',
  avatarSrc,
  avatarTone = 'pink',
  className = '',
  comment = '4:12쯤 첼로 들어올 때 진짜 소름… 한 번에 갔다는 게 안 믿겨요',
  initials = 'SY',
  ...props
} = resolveWorkbenchModeProps(rawProps);
  return (
    <div {...props} className={['sg-ds-library-scope', 'top-comment', className].filter(Boolean).join(' ')}>
      <SgDsLibraryAvatar size="xs" tone={avatarTone} initials={initials} src={avatarSrc} />
      <p className="top-comment-body">
        <span className="top-comment-author">{author}</span>
        {comment}
      </p>
    </div>
  );
}

export default SgDsLibraryTopComment;
