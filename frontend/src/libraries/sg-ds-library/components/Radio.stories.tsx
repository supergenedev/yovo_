import { SgDsLibraryRadio, SgDsLibraryRadioGroup } from './Radio';
import type { ReactNode } from 'react';

type Args = Record<string, boolean | string>;

const SIZES = ['sm', 'md', 'lg'] as const;
const VALUES = ['free', 'creator', 'studio'] as const;
const RADIO_ARG_TYPES = {
  label: { control: 'text' },
  defaultChecked: { control: 'boolean' },
  disabled: { control: 'boolean' },
  size: { control: 'select', options: SIZES },
};
const GROUP_ARG_TYPES = {
  legend: { control: 'text' },
  defaultValue: { control: 'select', options: VALUES },
  disabled: { control: 'boolean' },
  size: { control: 'select', options: SIZES },
};

const meta = {
  title: 'SgDsLibrary/Radio',
  component: SgDsLibraryRadio,
};
export default meta;

export const Default = {
  name: 'Radio',
  args: {
    label: 'Creator plan',
    defaultChecked: true,
    disabled: false,
    size: 'md',
  },
  argTypes: RADIO_ARG_TYPES,
  sourceInsert: {
    props: {
      label: 'Creator plan',
      defaultChecked: true,
      disabled: false,
      size: 'md',
    },
  },
  render: (args: Args) => (
    <PreviewSurface>
      <SgDsLibraryRadio
        key={`${asText(args.label)}-${asBoolean(args.defaultChecked)}`}
        defaultChecked={asBoolean(args.defaultChecked)}
        disabled={asBoolean(args.disabled)}
        label={asText(args.label, 'Creator plan')}
        size={asOption(args.size, SIZES, 'md')}
      />
    </PreviewSurface>
  ),
};

export const RadioGroup = {
  args: {
    legend: 'Choose a plan',
    defaultValue: 'creator',
    disabled: false,
    size: 'md',
  },
  argTypes: GROUP_ARG_TYPES,
  sourceInsert: {
    props: {
      legend: 'Choose a plan',
      defaultValue: 'creator',
      disabled: false,
      size: 'md',
    },
  },
  render: (args: Args) => (
    <PreviewSurface>
      <SgDsLibraryRadioGroup
        key={`${asText(args.defaultValue)}-${asText(args.legend)}`}
        defaultValue={asOption(args.defaultValue, VALUES, 'creator')}
        disabled={asBoolean(args.disabled)}
        legend={asText(args.legend, 'Choose a plan')}
        size={asOption(args.size, SIZES, 'md')}
      />
    </PreviewSurface>
  ),
};

export const Small = {
  args: { size: 'sm' },
  render: Default.render,
};

export const RadioGroupSmall = {
  args: { size: 'sm' },
  argTypes: GROUP_ARG_TYPES,
  render: RadioGroup.render,
};

function asBoolean(value: unknown): boolean {
  return typeof value === 'boolean' ? value : value === 'true';
}

function asOption<T extends string>(value: unknown, options: readonly T[], fallback: T): T {
  return typeof value === 'string' && options.includes(value as T) ? (value as T) : fallback;
}

function asText(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}

function PreviewSurface({ children }: { children: ReactNode }) {
  return (
    <div
      className="sg-ds-library-scope"
      style={{
        background: 'var(--s-surface-page)',
        borderRadius: 'var(--s-radius-md)',
        color: 'var(--s-text-primary)',
        display: 'inline-flex',
        padding: 'var(--s-space-stack-md)',
      }}
    >
      {children}
    </div>
  );
}
