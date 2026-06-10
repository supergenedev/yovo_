import type { HTMLAttributes, ReactNode } from 'react';
import { resolveWorkbenchModeProps } from './_shared';

export type SgDsLibraryAudioFrameVariant = 'music' | 'voice' | 'neutral';
export type SgDsLibraryAudioFrameBackground = 'default' | 'auto' | 'surface' | 'soft' | 'brand' | 'mint' | 'sunset' | 'mono';

export type SgDsLibraryAudioFrameProps = Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'title'> & {
  actionSlot?: ReactNode;
  background?: SgDsLibraryAudioFrameBackground;
  children?: ReactNode;
  eyebrow?: string;
  footerSlot?: ReactNode;
  meta?: string;
  title?: string;
  variant?: SgDsLibraryAudioFrameVariant;
};

export function SgDsLibraryAudioFrame(rawProps: SgDsLibraryAudioFrameProps) {
  const {
  actionSlot,
  background = 'default',
  children,
  className = '',
  eyebrow = '',
  footerSlot,
  meta = '',
  title = '',
  variant = 'neutral',
  ...props
} = resolveWorkbenchModeProps(rawProps);
  const hasHeader = Boolean(eyebrow || title || meta || actionSlot);

  return (
    <section
      {...props}
      className={['sg-ds-library-scope', 'audio-frame', className].filter(Boolean).join(' ')}
      data-background={background === 'default' || background === 'auto' ? undefined : background}
      data-variant={variant === 'neutral' ? undefined : variant}
    >
      {hasHeader ? (
        <header className="audio-frame-head">
          <div className="audio-frame-copy">
            {eyebrow ? <span className="audio-frame-eyebrow">{eyebrow}</span> : null}
            {title ? <strong className="audio-frame-title">{title}</strong> : null}
            {meta ? <span className="audio-frame-meta">{meta}</span> : null}
          </div>
          {actionSlot ? <div className="audio-frame-action">{actionSlot}</div> : null}
        </header>
      ) : null}
      {children ? <div className="audio-frame-body">{children}</div> : null}
      {footerSlot ? <footer className="audio-frame-footer">{footerSlot}</footer> : null}
    </section>
  );
}

export default SgDsLibraryAudioFrame;
