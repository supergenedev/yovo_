import { Children, isValidElement } from 'react';
import type { HTMLAttributes, ReactElement, ReactNode } from 'react';
import { SgDsLibraryButton, type SgDsLibraryButtonProps } from './Button';
import { SgDsLibraryText } from './Text';
import { resolveWorkbenchModeProps } from './_shared';

export type SgDsLibraryCreditBalanceRow = {
  delta?: string;
  deltaTone?: 'positive' | 'negative';
  label: string;
  value: ReactNode;
};

export type SgDsLibraryCreditBalanceCardProps = HTMLAttributes<HTMLDivElement> & {
  action1Label?: string;
  action1Variant?: SgDsLibraryButtonProps['variant'];
  action2Label?: string;
  action2Variant?: SgDsLibraryButtonProps['variant'];
  actionsSlot?: ReactNode;
  balance?: ReactNode;
  children?: ReactNode;
  eyebrow?: ReactNode;
  rows?: SgDsLibraryCreditBalanceRow[];
  showActions?: boolean;
  showRows?: boolean;
  unit?: ReactNode;
};

export type SgDsLibraryCreditBalanceCardBalanceProps = HTMLAttributes<HTMLDivElement> & {
  balance?: ReactNode;
  unit?: ReactNode;
};

export type SgDsLibraryCreditBalanceCardRowProps = HTMLAttributes<HTMLLIElement> & SgDsLibraryCreditBalanceRow;

export function SgDsLibraryCreditBalanceCardBalance(rawProps: SgDsLibraryCreditBalanceCardBalanceProps) {
  const {
  balance = '2,480',
  className = '',
  unit = 'CRD',
  ...props
} = resolveWorkbenchModeProps(rawProps);
  return (
    <div {...props} className={['sg-ds-library-scope', 'credit-balance-card-balance', className].filter(Boolean).join(' ')}>
      {balance}
      {unit ? <SgDsLibraryText as="span" className="credit-balance-card-unit" tone="secondary" variant="caption">{unit}</SgDsLibraryText> : null}
    </div>
  );
}

export function SgDsLibraryCreditBalanceCard(rawProps: SgDsLibraryCreditBalanceCardProps) {
  const {
  action1Label = 'Top up',
  action1Variant = 'primary',
  action2Label = 'History',
  action2Variant = 'secondary',
  actionsSlot,
  balance = '2,480',
  children,
  className = '',
  eyebrow = 'Credit balance',
  rows,
  showActions = true,
  showRows = true,
  unit = 'CRD',
  ...props
} = resolveWorkbenchModeProps(rawProps);
  const childItems = Children.toArray(children);
  const balanceChildren = childItems.filter(isCreditBalanceCardBalanceElement);
  const rowChildren = childItems.filter((child) => !isCreditBalanceCardBalanceElement(child));
  const resolvedRows = rows ?? [
    { delta: '+18%', deltaTone: 'positive' as const, label: 'This month', value: '1,240' },
    { label: 'Pending', value: '320' },
  ];
  const actionContent =
    actionsSlot === undefined ? (
      <>
        {action1Label ? <SgDsLibraryButton size="sm" variant={action1Variant}>{action1Label}</SgDsLibraryButton> : null}
        {action2Label ? <SgDsLibraryButton size="sm" variant={action2Variant}>{action2Label}</SgDsLibraryButton> : null}
      </>
    ) : (
      actionsSlot
    );

  return (
    <div {...props} className={['sg-ds-library-scope', 'credit-balance-card', className].filter(Boolean).join(' ')}>
      {eyebrow ? <SgDsLibraryText as="div" className="credit-balance-card-eyebrow" tone="tertiary" variant="eyebrow">{eyebrow}</SgDsLibraryText> : null}
      {balanceChildren.length > 0 ? balanceChildren : <SgDsLibraryCreditBalanceCardBalance balance={balance} unit={unit} />}
      {showRows && rowChildren.length > 0 ? <ul className="credit-balance-card-rows">{rowChildren}</ul> : null}
      {showRows && childItems.length === 0 && resolvedRows.length > 0 ? (
        <ul className="credit-balance-card-rows">
          {resolvedRows.map((row, index) => (
            <SgDsLibraryCreditBalanceCardRow
              delta={row.delta}
              deltaTone={row.deltaTone}
              key={`${row.label}-${index}`}
              label={row.label}
              value={row.value}
            />
          ))}
        </ul>
      ) : null}
      {showActions && actionContent ? <div className="credit-balance-card-actions">{actionContent}</div> : null}
    </div>
  );
}

function isCreditBalanceCardBalanceElement(
  child: ReactNode,
): child is ReactElement<SgDsLibraryCreditBalanceCardBalanceProps> {
  return isValidElement(child) &&
    (child.type === SgDsLibraryCreditBalanceCardBalance ||
      getElementTypeName(child) === 'SgDsLibraryCreditBalanceCardBalance' ||
      hasCreditBalanceCardBalanceProps(child));
}

function isCreditBalanceCardRowElement(
  child: ReactNode,
): child is ReactElement<SgDsLibraryCreditBalanceCardRowProps> {
  return isValidElement(child) &&
    (child.type === SgDsLibraryCreditBalanceCardRow ||
      getElementTypeName(child) === 'SgDsLibraryCreditBalanceCardRow' ||
      hasCreditBalanceCardRowProps(child));
}

function getElementTypeName(child: ReactElement): string | null {
  if (typeof child.type === 'string') return child.type;
  if (typeof child.type !== 'function') return null;
  return child.type.displayName ?? child.type.name ?? null;
}

function hasCreditBalanceCardBalanceProps(child: ReactElement): child is ReactElement<SgDsLibraryCreditBalanceCardBalanceProps> {
  const props = child.props as Partial<SgDsLibraryCreditBalanceCardBalanceProps>;
  return props.balance !== undefined || props.unit !== undefined;
}

function hasCreditBalanceCardRowProps(child: ReactElement): child is ReactElement<SgDsLibraryCreditBalanceCardRowProps> {
  const props = child.props as Partial<SgDsLibraryCreditBalanceCardRowProps>;
  return props.label !== undefined && props.value !== undefined;
}

export function SgDsLibraryCreditBalanceCardRow(rawProps: SgDsLibraryCreditBalanceCardRowProps) {
  const {
  className = '',
  delta,
  deltaTone = 'positive',
  label = 'Label',
  value = '0',
  ...props
} = resolveWorkbenchModeProps(rawProps);
  return (
    <li {...props} className={['sg-ds-library-scope', 'credit-balance-card-row', className].filter(Boolean).join(' ')}>
      <SgDsLibraryText as="span" tone="secondary" variant="ui-sm">{label}</SgDsLibraryText>
      <span>
        <SgDsLibraryText as="strong" variant="ui" weight="semibold">{value}</SgDsLibraryText>
        {delta ? <span className="credit-balance-card-delta" data-tone={deltaTone}>{delta}</span> : null}
      </span>
    </li>
  );
}

SgDsLibraryCreditBalanceCardBalance.displayName = 'SgDsLibraryCreditBalanceCardBalance';
SgDsLibraryCreditBalanceCardRow.displayName = 'SgDsLibraryCreditBalanceCardRow';

export default SgDsLibraryCreditBalanceCard;
