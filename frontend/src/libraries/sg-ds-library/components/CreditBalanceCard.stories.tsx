import {
  SgDsLibraryCreditBalanceCard,
  SgDsLibraryCreditBalanceCardBalance,
  SgDsLibraryCreditBalanceCardRow,
} from './CreditBalanceCard';

type Args = Record<string, boolean | string>;

const BUTTON_VARIANTS = ['primary', 'secondary', 'outline', 'soft', 'ghost', 'danger'] as const;
const DELTA_TONES = ['positive', 'negative'] as const;

const CREDIT_BALANCE_CARD_ARGS = {
  balance: '2,480',
  unit: 'CRD',
  eyebrow: 'Credit balance',
  action1Label: 'Top up',
  action1Variant: 'primary',
  action2Label: 'History',
  action2Variant: 'secondary',
  showActions: true,
  showRows: true,
};

const CREDIT_BALANCE_CARD_SOURCE_PROPS = {
  eyebrow: 'Credit balance',
  action1Label: 'Top up',
  action1Variant: 'primary',
  action2Label: 'History',
  action2Variant: 'secondary',
  showActions: true,
  showRows: true,
};

const CREDIT_BALANCE_CARD_ARG_TYPES = {
  balance: { control: 'text' },
  unit: { control: 'text' },
  eyebrow: { control: 'text' },
  action1Label: { name: 'Action 1 label', control: 'text' },
  action1Variant: { name: 'Action 1 variant', control: 'select', options: BUTTON_VARIANTS },
  action2Label: { name: 'Action 2 label', control: 'text' },
  action2Variant: { name: 'Action 2 variant', control: 'select', options: BUTTON_VARIANTS },
  showActions: { name: 'Show actions', control: 'boolean' },
  showRows: { name: 'Show rows', control: 'boolean' },
};

const meta = {
  title: 'SgDsLibrary/CreditBalanceCard',
  component: SgDsLibraryCreditBalanceCard,
};
export default meta;

export const Default = {
  name: 'CreditBalanceCard',
  args: CREDIT_BALANCE_CARD_ARGS,
  argTypes: CREDIT_BALANCE_CARD_ARG_TYPES,
  sourceInsert: {
    imports: [{ names: ['SgDsLibraryCreditBalanceCardBalance', 'SgDsLibraryCreditBalanceCardRow'] }],
    jsxChildren: [
      '<SgDsLibraryCreditBalanceCardBalance balance="2,480" unit="CRD" />',
      '<SgDsLibraryCreditBalanceCardRow label="This month" value="1,240" delta="+18%" deltaTone="positive" />',
      '<SgDsLibraryCreditBalanceCardRow label="Pending" value="320" />',
    ].join('\n'),
    props: CREDIT_BALANCE_CARD_SOURCE_PROPS,
  },
  render: (args: Args) => (
    <SgDsLibraryCreditBalanceCard
      action1Label={asText(args.action1Label, 'Top up')}
      action1Variant={asOption(args.action1Variant, BUTTON_VARIANTS, 'primary')}
      action2Label={asText(args.action2Label, 'History')}
      action2Variant={asOption(args.action2Variant, BUTTON_VARIANTS, 'secondary')}
      balance={asText(args.balance, '2,480')}
      eyebrow={asText(args.eyebrow, 'Credit balance')}
      showActions={asBoolean(args.showActions)}
      showRows={asBoolean(args.showRows)}
      unit={asText(args.unit, 'CRD')}
    >
      <SgDsLibraryCreditBalanceCardBalance balance={asText(args.balance, '2,480')} unit={asText(args.unit, 'CRD')} />
      <SgDsLibraryCreditBalanceCardRow label="This month" value="1,240" delta="+18%" deltaTone="positive" />
      <SgDsLibraryCreditBalanceCardRow label="Pending" value="320" />
    </SgDsLibraryCreditBalanceCard>
  ),
};

export const CreditBalanceCardBalance = {
  args: {
    balance: '2,480',
    unit: 'CRD',
  },
  argTypes: {
    balance: { control: 'text' },
    unit: { control: 'text' },
  },
  sourceInsert: {
    props: {
      balance: '2,480',
      unit: 'CRD',
    },
  },
  render: (args: Args) => (
    <div className="sg-ds-library-scope" style={balancePreviewStyle}>
      <SgDsLibraryCreditBalanceCardBalance
        balance={asText(args.balance, '2,480')}
        unit={asText(args.unit, 'CRD')}
      />
    </div>
  ),
};

export const CreditBalanceCardRow = {
  args: {
    label: 'This month',
    value: '1,240',
    delta: '+18%',
    deltaTone: 'positive',
  },
  argTypes: {
    label: { control: 'text' },
    value: { control: 'text' },
    delta: { control: 'text' },
    deltaTone: { control: 'select', options: DELTA_TONES },
  },
  sourceInsert: {
    props: {
      label: 'This month',
      value: '1,240',
      delta: '+18%',
      deltaTone: 'positive',
    },
  },
  render: (args: Args) => (
    <div className="sg-ds-library-scope" style={rowPreviewStyle}>
      <ul className="credit-balance-card-rows" style={rowListPreviewStyle} aria-label="Credit balance row preview">
        <SgDsLibraryCreditBalanceCardRow
          delta={asText(args.delta, '+18%')}
          deltaTone={asOption(args.deltaTone, DELTA_TONES, 'positive')}
          label={asText(args.label, 'This month')}
          value={asText(args.value, '1,240')}
        />
      </ul>
    </div>
  ),
};

function asBoolean(value: unknown): boolean {
  return typeof value === 'boolean' ? value : value === 'true';
}

function asOption<T extends string>(value: unknown, options: readonly T[], fallback: T): T {
  return typeof value === 'string' && options.includes(value as T) ? (value as T) : fallback;
}

const rowPreviewStyle = {
  width: 'min(360px, calc(100vw - 48px))',
  padding: '16px',
  border: '1px solid var(--s-border-subtle)',
  borderRadius: '12px',
  background: 'var(--s-surface-card)',
};

const balancePreviewStyle = {
  width: 'min(360px, calc(100vw - 48px))',
  padding: '16px',
  border: '1px solid var(--s-border-subtle)',
  borderRadius: '12px',
  background: 'var(--s-surface-card)',
};

const rowListPreviewStyle = {
  margin: 0,
};

function asText(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}
