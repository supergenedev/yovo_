import { SgDsLibraryDivider } from './Divider';

type Args = Record<string, boolean | string>;

const ORIENTATIONS = ['horizontal', 'vertical'] as const;
const VARIANTS = ['solid', 'dashed', 'dotted'] as const;
const INSETS = ['none', 'start', 'end', 'both'] as const;
const LABEL_POSITIONS = ['left', 'center', 'right'] as const;

const meta = {
  title: 'SgDsLibrary/Divider',
  component: SgDsLibraryDivider,
  // Prop order follows the shared SG DS story order: label first, then
  // visual style, orientation, and conditional label position.
  // `labelPosition` only takes effect when a label is
  // set AND orientation is horizontal (vertical dividers can't host a
  // label in the source design system).
  args: {
    label: '',
    variant: 'solid',
    orientation: 'horizontal',
    labelPosition: 'center',
    inset: 'none',
  },
  argTypes: {
    label: { control: 'text' },
    variant: { control: 'select', options: VARIANTS },
    orientation: { control: 'select', options: ORIENTATIONS },
    labelPosition: { control: 'select', options: LABEL_POSITIONS, when: { key: 'orientation', value: 'horizontal' } },
    inset: { control: 'select', options: INSETS },
  },
  sourceInsert: {
    props: {
      label: '',
      variant: 'solid',
      orientation: 'horizontal',
      labelPosition: 'center',
      inset: 'none',
    },
  },
};
export default meta;

export const Default = {
  name: 'Divider',
  render: (args: Args) => {
    const orientation = asOption(args.orientation, ORIENTATIONS, 'horizontal');
    // Wrap horizontal dividers in a constrained container so `inset`
    // is actually visible. Without a bounded parent the divider stretches
    // across the full stage and the 16px inset margin reads as noise.
    // Vertical dividers need a flex parent with cross-axis height.
    const containerStyle: React.CSSProperties = orientation === 'horizontal'
      ? { width: 320, padding: '12px 0' }
      : { display: 'flex', alignItems: 'center', height: 120, gap: 12 };
    return (
      <div style={containerStyle}>
        {orientation === 'vertical' ? <span style={{ opacity: 0.4 }}>before</span> : null}
        <SgDsLibraryDivider
          inset={asOption(args.inset, INSETS, 'none')}
          label={asText(args.label, '') || undefined}
          labelPosition={asOption(args.labelPosition, LABEL_POSITIONS, 'center')}
          orientation={orientation}
          variant={asOption(args.variant, VARIANTS, 'solid')}
        />
        {orientation === 'vertical' ? <span style={{ opacity: 0.4 }}>after</span> : null}
      </div>
    );
  },
};

export const LabeledCenter = { args: { label: 'OR', labelPosition: 'center' }, render: Default.render };
export const LabeledLeft = { args: { label: 'Section A', labelPosition: 'left' }, render: Default.render };
export const LabeledRight = { args: { label: 'More', labelPosition: 'right' }, render: Default.render };

function asOption<T extends string>(value: unknown, options: readonly T[], fallback: T): T {
  return typeof value === 'string' && options.includes(value as T) ? (value as T) : fallback;
}

function asText(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}
