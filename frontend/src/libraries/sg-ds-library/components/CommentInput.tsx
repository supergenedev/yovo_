import type { HTMLAttributes, ReactNode } from 'react';
import { SgDsLibraryAvatar, type SgDsLibraryAvatarTone } from './Avatar';
import { SgDsLibraryButton } from './Button';
import { SgDsLibraryIcon } from './Icon';
import { SgDsLibraryTextarea } from './Textarea';
import { resolveWorkbenchModeProps } from './_shared';

export type SgDsLibraryCommentInputProps = Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue'> & {
  autoFocus?: boolean;
  avatarSrc?: string;
  avatarTone?: SgDsLibraryAvatarTone;
  cancelLabel?: ReactNode;
  context?: ReactNode;
  defaultValue?: string;
  disabled?: boolean;
  helperText?: ReactNode;
  initials?: string;
  maxLength?: number | string;
  name?: string;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  rows?: number | string;
  showAttachment?: boolean;
  showAvatar?: boolean;
  showCancel?: boolean;
  showCounter?: boolean;
  showEmoji?: boolean;
  showMention?: boolean;
  submitDisabled?: boolean;
  submitLabel?: ReactNode;
  textareaId?: string;
  textareaLabel?: string;
};

export function SgDsLibraryCommentInput(rawProps: SgDsLibraryCommentInputProps) {
  const {
    autoFocus,
    avatarSrc,
    avatarTone = 'brand',
    cancelLabel = '취소',
    className = '',
    context,
    defaultValue = '',
    disabled = false,
    helperText,
    initials = 'U',
    maxLength,
    name,
    placeholder = '댓글을 입력하세요',
    readOnly = false,
    required = false,
    rows = 3,
    showAttachment = true,
    showAvatar = true,
    showCancel = false,
    showCounter = true,
    showEmoji = true,
    showMention = false,
    submitDisabled = false,
    submitLabel = '등록',
    textareaId,
    textareaLabel = '댓글 입력',
    ...props
  } = resolveWorkbenchModeProps(rawProps);
  const normalizedMaxLength = normalizeOptionalNumber(maxLength);
  const hasTools = showAttachment || showEmoji || showMention;
  const counter = showCounter && normalizedMaxLength ? `${defaultValue.length}/${normalizedMaxLength}` : '';
  const hasMeta = Boolean(helperText || counter);
  const lockControls = disabled || readOnly;

  return (
    <div
      {...props}
      className={['sg-ds-library-scope', 'comment-input', className].filter(Boolean).join(' ')}
      data-disabled={disabled || undefined}
      data-readonly={readOnly || undefined}
      data-show-avatar={showAvatar ? undefined : 'false'}
    >
      {showAvatar ? <SgDsLibraryAvatar size="sm" tone={avatarTone} initials={initials} src={avatarSrc} /> : null}
      <div className="comment-input-panel">
        {context ? (
          <div className="comment-input-context">
            <SgDsLibraryIcon name="corner-down-right" size="1em" />
            <span>{context}</span>
          </div>
        ) : null}
        <SgDsLibraryTextarea
          id={textareaId}
          name={name}
          className="comment-input-textarea"
          aria-label={textareaLabel}
          autoFocus={autoFocus}
          defaultValue={defaultValue}
          disabled={disabled}
          maxLength={normalizedMaxLength}
          placeholder={placeholder}
          readOnly={readOnly}
          required={required}
          rows={rows}
          size="md"
        />
        <div className="comment-input-toolbar">
          {hasTools ? (
            <div className="comment-input-tools">
              {showAttachment ? (
                <SgDsLibraryButton
                  aria-label="파일 첨부"
                  className="comment-input-tool"
                  disabled={lockControls}
                  iconOnly
                  label="파일 첨부"
                  leadingIcon="paperclip"
                  size="sm"
                  variant="ghost"
                />
              ) : null}
              {showEmoji ? (
                <SgDsLibraryButton
                  aria-label="이모지 추가"
                  className="comment-input-tool"
                  disabled={lockControls}
                  iconOnly
                  label="이모지 추가"
                  leadingIcon="smile"
                  size="sm"
                  variant="ghost"
                />
              ) : null}
              {showMention ? (
                <SgDsLibraryButton
                  aria-label="멘션 추가"
                  className="comment-input-tool"
                  disabled={lockControls}
                  iconOnly
                  label="멘션 추가"
                  leadingIcon="at-sign"
                  size="sm"
                  variant="ghost"
                />
              ) : null}
            </div>
          ) : (
            <span className="comment-input-toolbar-spacer" aria-hidden="true" />
          )}
          <div className="comment-input-actions">
            {hasMeta ? (
              <span className="comment-input-meta">
                {helperText ? <span className="comment-input-helper">{helperText}</span> : null}
                {counter ? <span className="comment-input-counter">{counter}</span> : null}
              </span>
            ) : null}
            {showCancel ? (
              <SgDsLibraryButton
                className="comment-input-cancel"
                disabled={disabled}
                label={cancelLabel}
                size="sm"
                variant="ghost"
              />
            ) : null}
            <SgDsLibraryButton
              className="comment-input-submit"
              disabled={disabled || submitDisabled || readOnly}
              label={submitLabel}
              leadingIcon="send"
              size="sm"
              variant="primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function normalizeOptionalNumber(value: number | string | undefined): number | undefined {
  if (typeof value === 'undefined') return undefined;
  const parsed = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? Math.round(parsed) : undefined;
}

export default SgDsLibraryCommentInput;
