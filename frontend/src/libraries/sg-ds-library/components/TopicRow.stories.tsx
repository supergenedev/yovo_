import { SgDsLibraryTopicRow } from './TopicRow';

type Args = Record<string, unknown>;

function asText(value: unknown, fallback: string): string {
  return typeof value === 'string' && value.trim() ? value : fallback;
}

function asBoolean(value: unknown, fallback = true): boolean {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    if (value === 'true') return true;
    if (value === 'false') return false;
  }
  return fallback;
}

const DELTA_TONES = ['neutral', 'brand', 'success', 'warning', 'danger'] as const;

function asTone(value: unknown): (typeof DELTA_TONES)[number] {
  return DELTA_TONES.includes(value as never) ? (value as (typeof DELTA_TONES)[number]) : 'neutral';
}

export default {
  title: 'SgDsLibrary/TopicRow',
  component: SgDsLibraryTopicRow,
};

export const Default = {
  args: {
    title: '달이 지는 도시',
    delta: '+218%',
    deltaTone: 'brand',
    eyebrow: '콜라보 · TRENDING',
    divider: true,
    sub: '317K 시청 · 1,840 후원자',
  },
  argTypes: {
    title: { control: 'text' },
    delta: { control: 'text' },
    deltaTone: { control: 'select', options: DELTA_TONES },
    eyebrow: { control: 'text' },
    divider: { control: 'boolean' },
    sub: { control: 'text' },
  },
  sourceInsert: {
    props: {
      title: '달이 지는 도시',
      delta: '+218%',
      deltaTone: 'brand',
      eyebrow: '콜라보 · TRENDING',
      divider: true,
      sub: '317K 시청 · 1,840 후원자',
    },
  },
  render: (args: Args) => (
    <SgDsLibraryTopicRow
      divider={asBoolean(args.divider)}
      eyebrow={asText(args.eyebrow, '')}
      title={asText(args.title, 'Topic title')}
      sub={asText(args.sub, '')}
      delta={args.delta ? asText(args.delta, '') : null}
      deltaTone={asTone(args.deltaTone)}
    />
  ),
};

export const NoDelta = {
  args: {
    title: '#synthwave',
    eyebrow: 'AI 음악',
    divider: true,
    sub: '이번 주 새 트랙 218개',
  },
  render: (args: Args) => (
    <SgDsLibraryTopicRow
      divider={asBoolean(args.divider)}
      eyebrow={asText(args.eyebrow, '')}
      title={asText(args.title, 'Topic title')}
      sub={asText(args.sub, '')}
    />
  ),
};

export const Last = {
  args: {
    title: 'aether.studio',
    delta: '새 ✦',
    deltaTone: 'brand',
    eyebrow: '감독 · NEW',
    divider: false,
    sub: '「여름 끝의 라디오」 응답 모집',
  },
  argTypes: {
    title: { control: 'text' },
    delta: { control: 'text' },
    deltaTone: { control: 'select', options: DELTA_TONES },
    eyebrow: { control: 'text' },
    divider: { control: 'boolean' },
    sub: { control: 'text' },
  },
  render: (args: Args) => (
    <SgDsLibraryTopicRow
      divider={asBoolean(args.divider)}
      eyebrow={asText(args.eyebrow, '')}
      title={asText(args.title, 'Topic title')}
      sub={asText(args.sub, '')}
      delta={args.delta ? asText(args.delta, '') : null}
      deltaTone={asTone(args.deltaTone)}
    />
  ),
};
