import { SgDsLibraryText } from './Text';

type Args = Record<string, boolean | number | string>;

const ALIGNS = ['start', 'center', 'end', 'justify'] as const;
const AS_OPTIONS = ['span', 'p', 'div', 'strong', 'em', 'small', 'label', 'time', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
const TONES = ['primary', 'secondary', 'tertiary', 'disabled', 'inverse', 'brand', 'link', 'success', 'warning', 'danger', 'static-dark', 'static-light', 'inherit'] as const;
const TRANSFORMS = ['none', 'uppercase'] as const;
const VARIANTS = ['display', 'heading-1', 'heading-2', 'heading-3', 'heading-4', 'heading-5', 'heading-6', 'body', 'body-sm', 'ui', 'ui-sm', 'caption', 'eyebrow', 'inherit'] as const;
const WEIGHTS = ['regular', 'medium', 'semibold', 'bold', 'inherit'] as const;

const meta = {
  title: 'SgDsLibrary/Text',
  component: SgDsLibraryText,
};
export default meta;

export const Default = {
  name: 'Text',
  args: {
    children: 'Design-system typography stays tied to semantic text tokens.',
    as: 'p',
    tone: 'primary',
    variant: 'body',
    transform: 'none',
    weight: 'inherit',
    truncate: false,
    truncateLines: 1,
    align: 'start',
    lineHeight: '',
  },
  argTypes: {
    children: { control: 'text' },
    as: { control: 'select', options: AS_OPTIONS },
    tone: { control: 'select', options: TONES },
    variant: { control: 'select', options: VARIANTS },
    transform: { control: 'select', options: TRANSFORMS },
    weight: { control: 'select', options: WEIGHTS },
    truncate: { control: 'boolean' },
    truncateLines: { name: 'Truncate lines', control: 'number', min: 1, step: 1, when: { key: 'truncate', value: true } },
    align: { control: 'select', options: ALIGNS },
    lineHeight: { name: 'Line height', control: 'text' },
  },
  sourceInsert: {
    props: {
      children: 'Design-system typography stays tied to semantic text tokens.',
      as: 'p',
      tone: 'primary',
      variant: 'body',
      transform: 'none',
      weight: 'inherit',
      truncate: false,
      truncateLines: 1,
      align: 'start',
      lineHeight: '',
    },
  },
  render: (args: Args) => (
    <SgDsLibraryText
      align={asOption(args.align, ALIGNS, 'start')}
      as={asOption(args.as, AS_OPTIONS, 'p')}
      tone={asOption(args.tone, TONES, 'primary')}
      lineHeight={asText(args.lineHeight)}
      transform={asOption(args.transform, TRANSFORMS, 'none')}
      truncate={asBoolean(args.truncate, false)}
      truncateLines={asPositiveInteger(args.truncateLines, 1)}
      variant={asOption(args.variant, VARIANTS, 'body')}
      weight={asOption(args.weight, WEIGHTS, 'inherit')}
    >
      {asText(args.children, 'Design-system typography stays tied to semantic text tokens.')}
    </SgDsLibraryText>
  ),
};

export const Heading = {
  args: { children: 'Creator dashboard', as: 'h2', variant: 'heading-2', weight: 'semibold' },
  render: Default.render,
};

export const Eyebrow = {
  args: { children: 'LIVE SESSION', as: 'span', tone: 'brand', variant: 'eyebrow', transform: 'uppercase' },
  render: Default.render,
};

export const Caption = {
  args: { children: 'Updated 2 minutes ago', as: 'small', tone: 'tertiary', variant: 'caption' },
  render: Default.render,
};

function asBoolean(value: unknown, fallback: boolean): boolean {
  if (value === true || value === 'true') return true;
  if (value === false || value === 'false') return false;
  return fallback;
}

function asOption<T extends string>(value: unknown, options: readonly T[], fallback: T): T {
  return typeof value === 'string' && options.includes(value as T) ? (value as T) : fallback;
}

function asPositiveInteger(value: unknown, fallback: number): number {
  const numericValue = typeof value === 'number'
    ? value
    : typeof value === 'string' && value.trim()
      ? Number(value)
      : fallback;
  if (!Number.isFinite(numericValue)) return fallback;
  return Math.max(1, Math.floor(numericValue));
}

function asText(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}
