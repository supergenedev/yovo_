import { SgDsLibraryButton } from './Button';
import { SgDsLibraryCard } from './Card';
import { SgDsLibraryMediaFrame } from './MediaFrame';

type Args = Record<string, boolean | string>;

const meta = {
  title: 'SgDsLibrary/Card',
  component: SgDsLibraryCard,
  args: {
    children: 'You currently use 47 GB of 50 GB on the free plan.',
    title: 'Plan upgrade',
    subtitle: 'Choose a plan to continue',
    interactive: false,
    variant: 'solid',
    gap: 'md',
    padding: 'md',
  },
  argTypes: {
    children: { control: 'text' },
    title: { control: 'text' },
    subtitle: { control: 'text' },
    interactive: { control: 'boolean' },
    variant: { control: 'select', options: ['solid', 'outline', 'raised', 'bare'] },
    gap: { control: 'select', options: ['none', 'xs', 'sm', 'md', 'lg'] },
    padding: { control: 'select', options: ['none', 'sm', 'md', 'lg'] },
  },
  sourceInsert: {
    props: {
      children: 'You currently use 47 GB of 50 GB on the free plan.',
      title: 'Plan upgrade',
      subtitle: 'Choose a plan to continue',
      interactive: false,
      variant: 'solid',
      gap: 'md',
      padding: 'md',
    },
  },
};
export default meta;

export const Default = {
  name: 'Card',
  render: (args: Args) => (
    <SgDsLibraryCard
      interactive={asBoolean(args.interactive)}
      gap={asOption(args.gap, ['none', 'xs', 'sm', 'md', 'lg'], 'md')}
      padding={asOption(args.padding, ['none', 'sm', 'md', 'lg'], 'md')}
      subtitle={asText(args.subtitle)}
      title={asText(args.title)}
      variant={asOption(args.variant, ['solid', 'outline', 'raised', 'bare'], 'solid')}
      footerSlot={(
        <>
          <SgDsLibraryButton size="sm">Upgrade</SgDsLibraryButton>
          <SgDsLibraryButton size="sm" variant="ghost">Maybe later</SgDsLibraryButton>
        </>
      )}
    >
      <p style={{ margin: 0 }}>{asText(args.children)}</p>
    </SgDsLibraryCard>
  ),
};

export const MediaLed = {
  args: {
    children: 'The media slot keeps the source card contract intact.',
    title: 'Cover-led card',
    subtitle: 'Media bleeds to the card edge',
    interactive: false,
    variant: 'solid',
    gap: 'md',
    padding: 'md',
  },
  render: (args: Args) => (
    <SgDsLibraryCard
      gap={asOption(args.gap, ['none', 'xs', 'sm', 'md', 'lg'], 'md')}
      interactive={asBoolean(args.interactive)}
      padding={asOption(args.padding, ['none', 'sm', 'md', 'lg'], 'md')}
      title={asText(args.title)}
      subtitle={asText(args.subtitle)}
      variant={asOption(args.variant, ['solid', 'outline', 'raised', 'bare'], 'solid')}
      mediaSlot={<SgDsLibraryMediaFrame captionTitle="" showPlay={false} />}
    >
      <p style={{ margin: 0 }}>{asText(args.children, 'The media slot keeps the source card contract intact.')}</p>
    </SgDsLibraryCard>
  ),
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
