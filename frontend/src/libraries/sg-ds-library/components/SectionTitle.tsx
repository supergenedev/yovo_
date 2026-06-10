import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { SgDsLibraryButton, type SgDsLibraryButtonSize, type SgDsLibraryButtonVariant } from './Button';
import { SgDsLibraryIcon } from './Icon';
import {
  SgDsLibraryText,
  type SgDsLibraryTextAs,
  type SgDsLibraryTextTone,
  type SgDsLibraryTextVariant,
  type SgDsLibraryTextWeight,
} from './Text';
import { resolveWorkbenchModeProps } from './_shared';

export type SgDsLibrarySectionTitleAs = 'header' | 'div' | 'section';
export type SgDsLibrarySectionTitleAlign = 'start' | 'center';
export type SgDsLibrarySectionTitleIconTone =
  | 'brand'
  | 'purple'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'neutral'
  | 'none';
export type SgDsLibrarySectionTitleIconPosition = 'leading' | 'trailing';
export type SgDsLibrarySectionTitleGroupAlign = 'start' | 'end';

export type SgDsLibrarySectionTitleProps = Omit<HTMLAttributes<HTMLElement>, 'title'> & {
  action1Icon?: string;
  action1IconPosition?: SgDsLibrarySectionTitleIconPosition;
  action1Label?: string;
  action1Variant?: SgDsLibraryButtonVariant;
  action2Icon?: string;
  action2IconPosition?: SgDsLibrarySectionTitleIconPosition;
  action2Label?: string;
  action2Variant?: SgDsLibraryButtonVariant;
  actionSize?: SgDsLibraryButtonSize;
  align?: SgDsLibrarySectionTitleAlign;
  as?: SgDsLibrarySectionTitleAs;
  children?: ReactNode;
  icon?: string;
  iconAction1Icon?: string;
  iconAction1Label?: string;
  iconAction2Icon?: string;
  iconAction2Label?: string;
  iconActionVariant?: SgDsLibraryButtonVariant;
  iconColor?: string;
  iconColorToken?: string;
  iconColorTokenCollection?: string;
  iconLabel?: string;
  iconTone?: SgDsLibrarySectionTitleIconTone;
  showIcon?: boolean;
  subtitle?: ReactNode;
  subtitleTone?: SgDsLibraryTextTone;
  subtitleVariant?: SgDsLibraryTextVariant;
  title?: ReactNode;
  titleAs?: SgDsLibraryTextAs;
  titleVariant?: SgDsLibraryTextVariant;
  titleWeight?: SgDsLibraryTextWeight;
  wrapActions?: boolean;
};

export function SgDsLibrarySectionTitle(rawProps: SgDsLibrarySectionTitleProps) {
  const {
    action1Icon = '',
    action1IconPosition = 'trailing',
    action1Label = '',
    action1Variant = 'soft',
    action2Icon = '',
    action2IconPosition = 'trailing',
    action2Label = '',
    action2Variant = 'soft',
    actionSize = 'sm',
    align = 'start',
    as: Component = 'header',
    children,
    className = '',
    icon = 'sparkles',
    iconAction1Icon = '',
    iconAction1Label = '',
    iconAction2Icon = '',
    iconAction2Label = '',
    iconActionVariant = 'soft',
    iconColor = '',
    iconColorToken = '',
    iconColorTokenCollection = '',
    iconLabel = '',
    iconTone = 'brand',
    showIcon = true,
    subtitle = '',
    subtitleTone = 'tertiary',
    subtitleVariant = 'body-sm',
    title = '섹션 타이틀',
    titleAs = 'h3',
    titleVariant = 'heading-3',
    titleWeight = 'bold',
    wrapActions = true,
    ...props
  } = resolveWorkbenchModeProps(rawProps);
  const showMainIcon = showIcon && Boolean(icon);
  const hasTitle = title !== null && title !== undefined && title !== '';
  const hasSubtitle = subtitle !== null && subtitle !== undefined && subtitle !== '';
  const hasTextAction1 = Boolean(action1Label);
  const hasTextAction2 = Boolean(action2Label);
  const hasIconAction1 = Boolean(iconAction1Icon && iconAction1Label);
  const hasIconAction2 = Boolean(iconAction2Icon && iconAction2Label);
  const hasActions = hasTextAction1 || hasTextAction2 || hasIconAction1 || hasIconAction2;
  const hasCustomGroups = Boolean(children);
  const resolvedIconColor = formatSectionTitleTokenReference(iconColorTokenCollection, iconColorToken) ?? iconColor;
  const iconStyle = resolvedIconColor
    ? ({ '--c-section-title-icon-color': resolvedIconColor } as CSSProperties)
    : undefined;

  return (
    <Component
      {...props}
      className={['sg-ds-library-scope', 'section-title', className].filter(Boolean).join(' ')}
      data-align={align}
      data-custom-actions={hasCustomGroups || undefined}
      data-wrap-actions={wrapActions || undefined}
    >
      <div className="section-title-copy">
        <div className="section-title-main">
          {showMainIcon ? (
            <span
              aria-hidden={iconLabel ? undefined : true}
              aria-label={iconLabel || undefined}
              className="section-title-icon"
              data-tone={iconTone}
              role={iconLabel ? 'img' : undefined}
              style={iconStyle}
            >
              <SgDsLibraryIcon name={icon} size="1em" />
            </span>
          ) : null}
          {hasTitle ? (
            <SgDsLibraryText
              as={titleAs}
              className="section-title-heading"
              variant={titleVariant}
              weight={titleWeight}
            >
              {title}
            </SgDsLibraryText>
          ) : null}
        </div>
        {hasSubtitle ? (
          <SgDsLibraryText
            as="span"
            className="section-title-subtitle"
            tone={subtitleTone}
            variant={subtitleVariant}
          >
            {subtitle}
          </SgDsLibraryText>
        ) : null}
      </div>

      {hasCustomGroups ? (
        <div className="section-title-groups">
          {children}
        </div>
      ) : hasActions ? (
        <div className="section-title-actions">
          {hasTextAction1 ? (
            <SgDsLibraryButton
              leadingIcon={action1IconPosition === 'leading' ? action1Icon : undefined}
              size={actionSize}
              trailingIcon={action1IconPosition === 'trailing' ? action1Icon : undefined}
              variant={action1Variant}
            >
              {action1Label}
            </SgDsLibraryButton>
          ) : null}
          {hasTextAction2 ? (
            <SgDsLibraryButton
              leadingIcon={action2IconPosition === 'leading' ? action2Icon : undefined}
              size={actionSize}
              trailingIcon={action2IconPosition === 'trailing' ? action2Icon : undefined}
              variant={action2Variant}
            >
              {action2Label}
            </SgDsLibraryButton>
          ) : null}
          {hasIconAction1 ? (
            <SgDsLibraryButton
              aria-label={iconAction1Label}
              iconOnly
              leadingIcon={iconAction1Icon}
              shape="pill"
              size={actionSize}
              variant={iconActionVariant}
            />
          ) : null}
          {hasIconAction2 ? (
            <SgDsLibraryButton
              aria-label={iconAction2Label}
              iconOnly
              leadingIcon={iconAction2Icon}
              shape="pill"
              size={actionSize}
              variant={iconActionVariant}
            />
          ) : null}
        </div>
      ) : null}
    </Component>
  );
}

export type SgDsLibrarySectionTitleGroupProps = HTMLAttributes<HTMLDivElement> & {
  align?: SgDsLibrarySectionTitleGroupAlign;
  children?: ReactNode;
};

export function SgDsLibrarySectionTitleGroup(rawProps: SgDsLibrarySectionTitleGroupProps) {
  const {
    align = 'start',
    children,
    className = '',
    ...props
  } = resolveWorkbenchModeProps(rawProps);

  return (
    <div
      {...props}
      className={['sg-ds-library-scope', 'section-title-group', className].filter(Boolean).join(' ')}
      data-align={align === 'end' ? 'end' : undefined}
    >
      {children}
    </div>
  );
}

function formatSectionTitleTokenReference(collectionId: string | undefined, tokenId: string | undefined): string | null {
  const collection = collectionId?.trim();
  const token = tokenId?.trim();
  return collection && token ? `var(--ds-token-${collection}-${token})` : null;
}

export default SgDsLibrarySectionTitle;
