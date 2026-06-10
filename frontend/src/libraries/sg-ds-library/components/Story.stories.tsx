import { SgDsLibraryStory, SgDsLibraryStoryStrip } from './Story';

type Args = Record<string, string>;

const SIZES = ['sm', 'md', 'lg'] as const;
const STATES = ['unseen', 'seen', 'muted'] as const;
const STRIP_SCROLLS = ['auto', 'start', 'end', 'none', 'both'] as const;
const TONES = ['brand', 'teal', 'amber', 'purple', 'coral', 'blue', 'pink', 'green'] as const;

const meta = {
  title: 'SgDsLibrary/Story',
  component: SgDsLibraryStory,
};
export default meta;

const STORY_ARGS = {
  label: 'Hailey',
  initials: 'HL',
  avatarSrc: '',
  badge: 'LIVE',
  state: 'unseen',
  avatarTone: 'brand',
  size: 'md',
};

const STORY_ARG_TYPES = {
  label: { control: 'text' },
  initials: { control: 'text' },
  avatarSrc: { name: 'Avatar src', control: 'text' },
  badge: { control: 'text' },
  state: { control: 'select', options: STATES },
  avatarTone: { control: 'select', options: TONES },
  size: { control: 'select', options: SIZES },
};

export const Default = {
  name: 'Story',
  args: STORY_ARGS,
  argTypes: STORY_ARG_TYPES,
  sourceInsert: {
    props: STORY_ARGS,
  },
  render: (args: Args) => (
    <SgDsLibraryStory
      avatarSrc={asText(args.avatarSrc) || undefined}
      avatarTone={asOption(args.avatarTone, TONES, 'brand')}
      badge={asText(args.badge, 'LIVE')}
      initials={asText(args.initials, 'HL')}
      label={asText(args.label, 'Hailey')}
      size={asOption(args.size, SIZES, 'md')}
      state={asOption(args.state, STATES, 'unseen')}
    />
  ),
};

export const StoryStrip = {
  args: {
    label: 'Live creators',
    scroll: 'auto',
  },
  argTypes: {
    label: { control: 'text' },
    scroll: { control: 'select', options: STRIP_SCROLLS },
  },
  sourceInsert: {
    props: {
      label: 'Live creators',
      scroll: 'auto',
    },
  },
  render: (args: Args) => (
    <SgDsLibraryStoryStrip
      label={asText(args.label, 'Live creators')}
      scroll={asOption(args.scroll, STRIP_SCROLLS, 'auto')}
    />
  ),
};

function asOption<T extends string>(value: unknown, options: readonly T[], fallback: T): T {
  return typeof value === 'string' && options.includes(value as T) ? (value as T) : fallback;
}

function asText(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}
