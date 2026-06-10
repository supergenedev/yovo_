import { useEffect, useRef, useState, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type HTMLAttributes, type ReactNode } from 'react';
import { SgDsLibraryAvatar, type SgDsLibraryAvatarSize, type SgDsLibraryAvatarTone } from './Avatar';
import { resolveWorkbenchModeProps } from './_shared';

export type SgDsLibraryStorySize = 'sm' | 'md' | 'lg';
export type SgDsLibraryStoryState = 'unseen' | 'seen' | 'muted';
export type SgDsLibraryStoryStripScroll = 'auto' | 'start' | 'end' | 'none' | 'both';
export type SgDsLibraryStoryAs = 'a' | 'button';
export type SgDsLibraryStoryStripAs = 'nav' | 'section';
type SgDsLibraryStoryStripResolvedScroll = Exclude<SgDsLibraryStoryStripScroll, 'auto'>;

export type SgDsLibraryStoryProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'type'> & {
  as?: SgDsLibraryStoryAs;
  avatarSrc?: string;
  avatarTone?: SgDsLibraryAvatarTone;
  badge?: ReactNode;
  buttonType?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  initials?: string;
  label?: ReactNode;
  size?: SgDsLibraryStorySize;
  state?: SgDsLibraryStoryState;
};

export type SgDsLibraryStoryStripProps = HTMLAttributes<HTMLElement> & {
  as?: SgDsLibraryStoryStripAs;
  children?: ReactNode;
  label?: string;
  scroll?: SgDsLibraryStoryStripScroll;
};

export function SgDsLibraryStory(rawProps: SgDsLibraryStoryProps) {
  const {
  as = 'a',
  avatarSrc,
  avatarTone = 'brand',
  badge = 'LIVE',
  buttonType = 'button',
  className = '',
  href = '#',
  initials = 'HL',
  label = 'Hailey',
  size = 'md',
  state = 'unseen',
  ...props
} = resolveWorkbenchModeProps(rawProps);
  const labelText = typeof label === 'string' || typeof label === 'number' ? String(label) : undefined;
  const badgeText = typeof badge === 'string' || typeof badge === 'number' ? String(badge) : undefined;
  const ariaLabel = props['aria-label'] ?? (labelText ? `${labelText}${badgeText ? ` · ${badgeText}` : ''}` : undefined);
  const content = (
    <>
      <span className="story-ring">
        <SgDsLibraryAvatar initials={initials} size={getStoryAvatarSize(size)} src={avatarSrc} tone={avatarTone} />
        {badge ? <span className="story-badge">{badge}</span> : null}
      </span>
      {label ? <span className="story-label">{label}</span> : null}
    </>
  );
  const hostProps = {
    ...props,
    'aria-label': ariaLabel,
    className: ['sg-ds-library-scope', 'story', className].filter(Boolean).join(' '),
    'data-size': size,
    'data-state': state,
  };

  if (as === 'button') {
    return <button {...(hostProps as ButtonHTMLAttributes<HTMLButtonElement>)} type={buttonType}>{content}</button>;
  }

  const { onClick, ...anchorProps } = hostProps as AnchorHTMLAttributes<HTMLAnchorElement>;
  return (
    <a
      {...anchorProps}
      href={href}
      onClick={(event) => {
        if (!href || href === '#') event.preventDefault();
        onClick?.(event);
      }}
    >
      {content}
    </a>
  );
}

function getStoryAvatarSize(size: SgDsLibraryStorySize): SgDsLibraryAvatarSize {
  if (size === 'sm') return 'lg';
  if (size === 'lg') return '2xl';
  return 'xl';
}

export function SgDsLibraryStoryStrip(rawProps: SgDsLibraryStoryStripProps) {
  const {
  as = 'nav',
  children,
  className = '',
  label = 'Live creators',
  scroll = 'auto',
  ...props
} = resolveWorkbenchModeProps(rawProps);
  const Tag = as;
  const stripRef = useRef<HTMLElement | null>(null);
  const [autoScroll, setAutoScroll] = useState<SgDsLibraryStoryStripResolvedScroll>('none');
  const resolvedScroll = scroll === 'auto' ? autoScroll : scroll;

  useEffect(() => {
    const element = stripRef.current;
    if (!element || scroll !== 'auto') return undefined;

    let frame = 0;
    const update = () => {
      setAutoScroll(getStoryStripAutoScroll(element));
    };
    const scheduleUpdate = () => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(update);
    };

    scheduleUpdate();
    element.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);

    const ResizeObserverCtor = window.ResizeObserver;
    const observer = ResizeObserverCtor ? new ResizeObserverCtor(scheduleUpdate) : null;
    observer?.observe(element);
    Array.from(element.children).forEach((child) => observer?.observe(child));

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      element.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      observer?.disconnect();
    };
  }, [children, scroll]);

  return (
    <Tag
      {...props}
      aria-label={props['aria-label'] ?? label}
      className={['sg-ds-library-scope', 'story-strip', className].filter(Boolean).join(' ')}
      data-scroll={resolvedScroll === 'both' ? undefined : resolvedScroll}
      ref={stripRef}
    >
      {children ?? (
        <>
          <SgDsLibraryStory avatarTone="brand" initials="HL" label="Hailey" />
          <SgDsLibraryStory avatarTone="teal" badge="ON" initials="NV" label="NeoVoice" />
          <SgDsLibraryStory avatarTone="amber" badge="" initials="KO" label="Koda" state="seen" />
        </>
      )}
    </Tag>
  );
}

function getStoryStripAutoScroll(element: HTMLElement): SgDsLibraryStoryStripResolvedScroll {
  const maxScrollLeft = Math.max(0, element.scrollWidth - element.clientWidth);
  const edgeTolerance = getStoryStripScrollEdgeTolerance(element);
  if (maxScrollLeft <= edgeTolerance) return 'none';

  const scrollLeft = Math.max(0, Math.min(maxScrollLeft, element.scrollLeft));
  const canScrollStart = scrollLeft > edgeTolerance;
  const canScrollEnd = maxScrollLeft - scrollLeft > edgeTolerance;
  if (canScrollStart && canScrollEnd) return 'both';
  if (canScrollEnd) return 'start';
  if (canScrollStart) return 'end';
  return 'none';
}

function getStoryStripScrollEdgeTolerance(element: HTMLElement): number {
  const style = window.getComputedStyle(element);
  return Math.max(
    1,
    parseCssPixelValue(style.paddingInlineStart),
    parseCssPixelValue(style.paddingLeft),
    parseCssPixelValue(style.scrollPaddingInlineStart),
    parseCssPixelValue(style.scrollPaddingLeft),
  ) + 1;
}

function parseCssPixelValue(value: string): number {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export default SgDsLibraryStory;
