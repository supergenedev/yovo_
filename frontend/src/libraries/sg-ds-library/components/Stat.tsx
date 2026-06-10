import type { LiHTMLAttributes } from 'react';
import { SgDsLibraryIcon } from './Icon';
import { SgDsLibraryText } from './Text';
import { resolveWorkbenchModeProps } from './_shared';

export type SgDsLibraryStatTone = 'default' | 'brand';

export type SgDsLibraryStatProps = Omit<LiHTMLAttributes<HTMLLIElement>, 'children'> & {
  icon?: string;
  label?: string;
  tone?: SgDsLibraryStatTone;
  value?: string | number;
};

export function SgDsLibraryStat(rawProps: SgDsLibraryStatProps) {
  const {
  className = '',
  icon,
  label = 'plays',
  tone = 'default',
  value = '124K',
  ...props
} = resolveWorkbenchModeProps(rawProps);
  return (
    <li
      {...props}
      className={['sg-ds-library-scope', 'stat', className].filter(Boolean).join(' ')}
      data-tone={tone === 'brand' ? 'brand' : undefined}
    >
      {icon ? <SgDsLibraryIcon name={icon} size="1em" /> : null}
      <SgDsLibraryText as="strong" tone="inherit" variant="ui" weight="semibold">{value}</SgDsLibraryText>
      <SgDsLibraryText as="span" tone="inherit" variant="ui-sm">{label}</SgDsLibraryText>
    </li>
  );
}

export default SgDsLibraryStat;
