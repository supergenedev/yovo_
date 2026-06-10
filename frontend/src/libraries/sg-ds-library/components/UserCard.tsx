import { Children, cloneElement, isValidElement, type HTMLAttributes, type ReactElement, type ReactNode } from 'react';
import type { SgDsLibraryCardVariant } from './Card';
import { SgDsLibraryCreditBalanceCard } from './CreditBalanceCard';
import { resolveWorkbenchModeProps } from './_shared';
import {
  SgDsLibraryUserBlock,
  type SgDsLibraryUserBlockProps,
} from './UserBlock';

export type SgDsLibraryUserCardSectionTint = 'default' | 'sunken' | 'brand';
type SgDsLibraryUserCardIdentityProps = Pick<
  SgDsLibraryUserBlockProps,
  | 'action1AriaLabel'
  | 'action1Icon'
  | 'action1Label'
  | 'action1Variant'
  | 'action2AriaLabel'
  | 'action2Icon'
  | 'action2Label'
  | 'action2Variant'
  | 'action3AriaLabel'
  | 'action3Icon'
  | 'action3Label'
  | 'action3Variant'
  | 'avatarAlt'
  | 'avatarQuietStatus'
  | 'avatarShape'
  | 'avatarSize'
  | 'avatarSrc'
  | 'avatarStatus'
  | 'avatarStatusLabel'
  | 'avatarTone'
  | 'direction'
  | 'initials'
  | 'meta'
  | 'name'
  | 'size'
  | 'verified'
>;

export type SgDsLibraryUserCardProps = HTMLAttributes<HTMLElement> & SgDsLibraryUserCardIdentityProps & {
  children?: ReactNode;
  sectionSlot?: ReactNode;
  tint?: SgDsLibraryUserCardSectionTint;
  variant?: SgDsLibraryCardVariant;
};

export type SgDsLibraryUserCardHeadProps = HTMLAttributes<HTMLElement> & SgDsLibraryUserCardIdentityProps & {
  children?: ReactNode;
};

export type SgDsLibraryUserCardSectionProps = HTMLAttributes<HTMLElement> & {
  children?: ReactNode;
  tint?: SgDsLibraryUserCardSectionTint;
};

export type SgDsLibraryUserCardStatsProps = HTMLAttributes<HTMLDListElement> & {
  children?: ReactNode;
  followersLabel?: ReactNode;
  followersValue?: ReactNode;
  followingLabel?: ReactNode;
  followingValue?: ReactNode;
  postsLabel?: ReactNode;
  postsValue?: ReactNode;
};

export type SgDsLibraryUserCardStatProps = HTMLAttributes<HTMLDivElement> & {
  label?: ReactNode;
  value?: ReactNode;
};

export function SgDsLibraryUserCard(rawProps: SgDsLibraryUserCardProps) {
  const {
  action1AriaLabel,
  action1Icon,
  action1Label,
  action1Variant,
  action2AriaLabel,
  action2Icon,
  action2Label,
  action2Variant,
  action3AriaLabel,
  action3Icon,
  action3Label,
  action3Variant,
  avatarAlt,
  avatarQuietStatus,
  avatarShape,
  avatarSize,
  avatarSrc,
  avatarStatus,
  avatarStatusLabel,
  avatarTone,
  children,
  className = '',
  direction,
  initials,
  meta,
  name,
  sectionSlot,
  tint = 'sunken',
  variant = 'solid',
  size,
  verified,
  ...props
} = resolveWorkbenchModeProps(rawProps);
  const identityProps = getDefinedProps({
    action1AriaLabel,
    action1Icon,
    action1Label,
    action1Variant,
    action2AriaLabel,
    action2Icon,
    action2Label,
    action2Variant,
    action3AriaLabel,
    action3Icon,
    action3Label,
    action3Variant,
    avatarAlt,
    avatarQuietStatus,
    avatarShape,
    avatarSize,
    avatarSrc,
    avatarStatus,
    avatarStatusLabel,
    avatarTone,
    direction,
    initials,
    meta,
    name,
    size,
    verified,
  });
  const resolvedIdentityProps = {
    initials: 'HL',
    meta: 'Creator · live now',
    name: 'Hailey Luna',
    verified: true,
    ...identityProps,
  };
  const hasProvidedChildren = hasRenderableChildren(children);

  return (
    <article
      {...props}
      className={['sg-ds-library-scope', 'card', 'user-card', className].filter(Boolean).join(' ')}
      data-variant={variant}
    >
      {hasProvidedChildren ? enhanceUserCardChildren(children, identityProps, tint) : (
        <>
          <SgDsLibraryUserCardHead {...resolvedIdentityProps} />
          <SgDsLibraryUserCardSection tint="default">
            <SgDsLibraryUserCardStats />
          </SgDsLibraryUserCardSection>
          <SgDsLibraryUserCardSection tint={tint}>
            {sectionSlot ?? <SgDsLibraryCreditBalanceCard />}
          </SgDsLibraryUserCardSection>
        </>
      )}
    </article>
  );
}

export function SgDsLibraryUserCardHead(rawProps: SgDsLibraryUserCardHeadProps) {
  const {
  action1AriaLabel,
  action1Icon,
  action1Label,
  action1Variant,
  action2AriaLabel,
  action2Icon,
  action2Label,
  action2Variant,
  action3AriaLabel,
  action3Icon,
  action3Label,
  action3Variant,
  avatarAlt,
  avatarQuietStatus,
  avatarShape,
  avatarSize,
  avatarSrc,
  avatarStatus,
  avatarStatusLabel,
  avatarTone,
  children,
  className = '',
  direction,
  initials,
  meta,
  name,
  size,
  verified,
  ...props
} = resolveWorkbenchModeProps(rawProps);
  const identityProps = getDefinedProps({
    action1AriaLabel,
    action1Icon,
    action1Label,
    action1Variant,
    action2AriaLabel,
    action2Icon,
    action2Label,
    action2Variant,
    action3AriaLabel,
    action3Icon,
    action3Label,
    action3Variant,
    avatarAlt,
    avatarQuietStatus,
    avatarShape,
    avatarSize,
    avatarSrc,
    avatarStatus,
    avatarStatusLabel,
    avatarTone,
    direction,
    initials,
    meta,
    name,
    size,
    verified,
  });
  const identityContent = hasRenderableChildren(children)
    ? enhanceUserCardHeadChildren(children, identityProps)
    : <SgDsLibraryUserBlock initials="HL" meta="Creator" name="Hailey Luna" verified {...omitUserCardHeadMoreAction(identityProps)} />;

  return <header {...props} className={['sg-ds-library-scope', 'user-card-head', className].filter(Boolean).join(' ')}>{identityContent}</header>;
}

export function SgDsLibraryUserCardSection(rawProps: SgDsLibraryUserCardSectionProps) {
  const {
  children,
  className = '',
  tint = 'default',
  ...props
} = resolveWorkbenchModeProps(rawProps);
  return (
    <section {...props} className={['sg-ds-library-scope', 'user-card-section', className].filter(Boolean).join(' ')} data-tint={tint === 'default' ? undefined : tint}>
      {children}
    </section>
  );
}

export function SgDsLibraryUserCardStats(rawProps: SgDsLibraryUserCardStatsProps) {
  const {
    children,
    className = '',
    followersLabel = '팔로워',
    followersValue = '12.4K',
    followingLabel = '팔로잉',
    followingValue = '384',
    postsLabel = '포스트',
    postsValue = '128',
    ...props
  } = resolveWorkbenchModeProps(rawProps);
  const content = hasRenderableChildren(children) ? children : (
    <>
      <SgDsLibraryUserCardStat label={postsLabel} value={postsValue} />
      <SgDsLibraryUserCardStat label={followersLabel} value={followersValue} />
      <SgDsLibraryUserCardStat label={followingLabel} value={followingValue} />
    </>
  );

  return (
    <dl {...props} className={['sg-ds-library-scope', 'user-card-stats', className].filter(Boolean).join(' ')}>
      {content}
    </dl>
  );
}

export function SgDsLibraryUserCardStat(rawProps: SgDsLibraryUserCardStatProps) {
  const {
    className = '',
    label = '팔로워',
    value = '12.4K',
    ...props
  } = resolveWorkbenchModeProps(rawProps);

  return (
    <div {...props} className={['sg-ds-library-scope', 'user-card-stat', className].filter(Boolean).join(' ')}>
      <dd className="user-card-stat-value">{value}</dd>
      <dt className="user-card-stat-label">{label}</dt>
    </div>
  );
}

function hasRenderableChildren(children: ReactNode): boolean {
  if (children === null || children === undefined || children === false) return false;
  if (typeof children === 'string') return children.trim().length > 0;
  if (Array.isArray(children)) return children.some(hasRenderableChildren);
  return true;
}

function enhanceUserCardChildren(
  children: ReactNode,
  identityProps: Partial<SgDsLibraryUserCardIdentityProps>,
  tint: SgDsLibraryUserCardSectionTint | undefined,
): ReactNode {
  return Children.map(children, (child) => {
    if (!isValidElement(child)) return child;
    if (child.type === SgDsLibraryUserCardHead) {
      const childProps = child.props as SgDsLibraryUserCardHeadProps;
      return cloneElement(child as ReactElement<SgDsLibraryUserCardHeadProps>, {
        ...identityProps,
        ...childProps,
      }, childProps.children);
    }
    if (child.type === SgDsLibraryUserCardSection && tint !== undefined) {
      return cloneElement(child as ReactElement<SgDsLibraryUserCardSectionProps>, {
        ...child.props,
        tint: child.props.tint ?? tint,
      });
    }
    return child;
  });
}

function enhanceUserCardHeadChildren(
  children: ReactNode,
  identityProps: Partial<SgDsLibraryUserCardIdentityProps>,
): ReactNode {
  return Children.map(children, (child) => {
    if (!isValidElement(child)) return child;
    if (child.type === SgDsLibraryUserBlock) {
      const childProps = child.props as SgDsLibraryUserBlockProps;
      return cloneElement(child as ReactElement<SgDsLibraryUserBlockProps>, {
        ...omitUserCardHeadMoreAction({
          ...identityProps,
          ...childProps,
        }),
      }, childProps.children);
    }
    return child;
  });
}

function getDefinedProps<T extends Record<string, unknown>>(props: T): Partial<T> {
  return Object.fromEntries(Object.entries(props).filter(([, value]) => value !== undefined)) as Partial<T>;
}

function omitUserCardHeadMoreAction<T extends Partial<SgDsLibraryUserBlockProps>>(props: T): T {
  const action3Icon = typeof props.action3Icon === 'string' ? props.action3Icon.trim() : '';
  if (!['ellipsis', 'ellipsis-vertical', 'more-horizontal', 'more-vertical'].includes(action3Icon)) return props;
  const {
    action3AriaLabel: _action3AriaLabel,
    action3Icon: _action3Icon,
    action3Label: _action3Label,
    action3Variant: _action3Variant,
    ...rest
  } = props;
  return rest as T;
}

export default SgDsLibraryUserCard;
