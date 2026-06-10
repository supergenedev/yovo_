import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { SgDsLibraryIcon } from './Icon';
import { resolveWorkbenchModeProps } from './_shared';

export type SgDsLibraryLinkVariant = 'default' | 'subtle' | 'standalone';
export type SgDsLibraryLinkSize = 'sm' | 'md' | 'lg';

export type SgDsLibraryLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children?: ReactNode;
  variant?: SgDsLibraryLinkVariant;
  size?: SgDsLibraryLinkSize;
  /** Icon name from the project asset picker (workbench `control: 'icon'`). */
  tailIcon?: string;
  /** Direct React node override for the tail icon slot. */
  tailIconNode?: ReactNode;
  /** @deprecated Use `tailIcon` for the visual affordance. */
  external?: boolean;
  /** @deprecated Use `tailIconNode` for custom icon content. */
  externalIcon?: ReactNode;
};

function renderTailIconSlot({
  external,
  externalIcon,
  tailIcon,
  tailIconNode,
}: {
  external: boolean;
  externalIcon?: ReactNode;
  tailIcon?: string;
  tailIconNode?: ReactNode;
}): ReactNode {
  if (tailIconNode !== undefined) return tailIconNode;
  if (tailIcon) return <SgDsLibraryIcon name={tailIcon} size="1em" />;
  if (externalIcon !== undefined) return externalIcon;
  if (external) return <SgDsLibraryIcon name="external-link" size="1em" />;
  return null;
}

export function SgDsLibraryLink(rawProps: SgDsLibraryLinkProps) {
  const {
  children = 'Link',
  className = '',
  external = false,
  externalIcon,
  href = '#',
  rel,
  size,
  tailIcon,
  tailIconNode,
  target,
  variant = 'default',
  ...props
} = resolveWorkbenchModeProps(rawProps);
  const externalAttrs = external
    ? { target: target ?? '_blank', rel: rel ?? 'noopener noreferrer' }
    : { target, rel };
  const renderedTailIcon = renderTailIconSlot({ external, externalIcon, tailIcon, tailIconNode });

  return (
    <a
      {...props}
      {...externalAttrs}
      href={href}
      className={['sg-ds-library-scope', 'link', className].filter(Boolean).join(' ')}
      data-variant={variant === 'default' ? undefined : variant}
      data-size={size}
      data-tail-icon={renderedTailIcon ? true : undefined}
    >
      {children}
      {renderedTailIcon ? (
        <span className="link-tail-icon" aria-hidden="true">
          {renderedTailIcon}
        </span>
      ) : null}
    </a>
  );
}

export default SgDsLibraryLink;
