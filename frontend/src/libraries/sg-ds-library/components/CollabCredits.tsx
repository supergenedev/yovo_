import type { HTMLAttributes, LiHTMLAttributes, ReactNode } from 'react';
import { SgDsLibraryAvatar, type SgDsLibraryAvatarTone } from './Avatar';
import { SgDsLibraryIcon } from './Icon';
import { resolveWorkbenchModeProps } from './_shared';

export type SgDsLibraryCollabCredit = {
  avatarTone?: SgDsLibraryAvatarTone;
  credit?: string;
  initials?: string;
  name: string;
  role: string;
  verified?: boolean;
};

export type SgDsLibraryCollabCreditItemProps = Omit<LiHTMLAttributes<HTMLLIElement>, 'children'> &
  Omit<SgDsLibraryCollabCredit, 'name' | 'role'> & {
    name?: string;
    role?: string;
  };

export type SgDsLibraryCollabCreditsGroupProps = HTMLAttributes<HTMLElement> & {
  ariaLabel?: string;
  avatarTone?: SgDsLibraryAvatarTone;
  children?: ReactNode;
  credit?: string;
  initials?: string;
  items?: SgDsLibraryCollabCredit[];
  name?: string;
  role?: string;
  title?: string;
  verified?: boolean;
};

export type SgDsLibraryCollabCreditsProps = SgDsLibraryCollabCreditsGroupProps;

const DEFAULT_ITEMS: SgDsLibraryCollabCredit[] = [
  { avatarTone: 'brand', credit: '+820 crd', initials: 'HL', name: 'Hailey Luna', role: 'VOICE', verified: true },
  { avatarTone: 'teal', credit: '+420 crd', initials: 'NV', name: 'NeoVoice', role: 'AI', verified: true },
  { avatarTone: 'amber', credit: '+260 crd', initials: 'KO', name: 'Koda', role: 'MIX' },
];

export function SgDsLibraryCollabCreditItem(rawProps: SgDsLibraryCollabCreditItemProps) {
  const {
  avatarTone = 'neutral',
  className = '',
  credit,
  initials,
  name = 'Hailey Luna',
  role = 'VOICE',
  verified = false,
  ...props
} = resolveWorkbenchModeProps(rawProps);
  return (
    <li {...props} className={['collab-credits-row', className].filter(Boolean).join(' ')}>
      <SgDsLibraryAvatar size="xs" tone={avatarTone} initials={initials ?? getInitials(name)} />
      <span className="collab-credits-identity">
        <span className="collab-credits-name">
          {name}
          {verified ? (
            <span className="collab-credits-verified" aria-label="Verified">
              <SgDsLibraryIcon name="badge-check" size="1em" />
            </span>
          ) : null}
        </span>
        <span className="collab-credits-role">{role}</span>
      </span>
      {credit ? <span className="collab-credits-credit">{credit}</span> : null}
    </li>
  );
}

export function SgDsLibraryCollabCreditsGroup(rawProps: SgDsLibraryCollabCreditsGroupProps) {
  const {
  ariaLabel = 'Collaborators',
  avatarTone,
  children,
  className = '',
  credit,
  initials,
  items,
  name,
  role,
  title = 'Collaborators',
  verified,
  ...props
} = resolveWorkbenchModeProps(rawProps);
  const hasSingleItemProps = [avatarTone, credit, initials, name, role, verified].some((value) => value !== undefined);
  const renderedItems = hasSingleItemProps
    ? [{ avatarTone, credit, initials, name: name ?? 'Hailey Luna', role: role ?? 'VOICE', verified }]
    : items ?? DEFAULT_ITEMS;

  return (
    <section
      {...props}
      className={['sg-ds-library-scope', 'collab-credits-section', className].filter(Boolean).join(' ')}
    >
      {title ? <h3 className="collab-credits-title">{title}</h3> : null}
      <ul aria-label={ariaLabel} className="collab-credits">
        {children ?? renderedItems.map((item) => (
          <SgDsLibraryCollabCreditItem {...item} key={`${item.role}-${item.name}`} />
        ))}
      </ul>
    </section>
  );
}

export function SgDsLibraryCollabCredits(props: SgDsLibraryCollabCreditsProps) {
  props = resolveWorkbenchModeProps(props);
  return <SgDsLibraryCollabCreditsGroup {...props} />;
}

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || '?';
}

export default SgDsLibraryCollabCredits;
