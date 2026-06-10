import { SgDsLibrarySwitch } from './Switch';
import type { ReactNode } from 'react';

type Args = Record<string, boolean | string>;

const SIZES = ['sm', 'md', 'lg'] as const;

const meta = {
  title: 'SgDsLibrary/Switch',
  component: SgDsLibrarySwitch,
  args: {
    label: 'Enable notifications',
    defaultChecked: true,
    disabled: false,
    size: 'md',
  },
  argTypes: {
    label: { control: 'text' },
    defaultChecked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    size: { control: 'select', options: SIZES },
  },
  sourceInsert: {
    props: {
      label: 'Enable notifications',
      defaultChecked: true,
      disabled: false,
      size: 'md',
    },
  },
};
export default meta;

export const Default = {
  name: 'Switch',
  render: (args: Args) => (
    <PreviewSurface>
      <SgDsLibrarySwitch
        key={`${asBoolean(args.defaultChecked)}-${asText(args.label)}`}
        defaultChecked={asBoolean(args.defaultChecked)}
        disabled={asBoolean(args.disabled)}
        label={asText(args.label, 'Enable notifications')}
        size={asOption(args.size, SIZES, 'md')}
      />
    </PreviewSurface>
  ),
};

export const Off = {
  args: { label: 'Share analytics', defaultChecked: false },
  render: Default.render,
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
