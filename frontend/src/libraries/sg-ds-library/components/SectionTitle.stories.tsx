import type { ReactNode } from 'react';
import { SgDsLibraryButton } from './Button';
import { SgDsLibrarySectionTitle, SgDsLibrarySectionTitleGroup } from './SectionTitle';

type Args = Record<string, unknown>;

const AS_OPTIONS = ['header', 'div', 'section'] as const;
const ALIGN_OPTIONS = ['start', 'center'] as const;
const ICON_TONES = ['brand', 'purple', 'success', 'warning', 'danger', 'info', 'neutral', 'none'] as const;
const SUBTITLE_TONES = ['primary', 'secondary', 'tertiary', 'disabled', 'inverse', 'brand', 'link', 'success', 'warning', 'danger', 'inherit'] as const;
const TEXT_AS_OPTIONS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'div'] as const;
const TEXT_VARIANTS = ['display', 'heading-1', 'heading-2', 'heading-3', 'heading-4', 'heading-5', 'heading-6', 'body', 'body-sm', 'ui', 'ui-sm', 'caption', 'eyebrow', 'inherit'] as const;
const TEXT_WEIGHTS = ['regular', 'medium', 'semibold', 'bold', 'inherit'] as const;

function ordered<T extends Record<string, unknown>>(order: number, config: T): T & { order: number } {
  return { ...config, order };
}

function asBoolean(value: unknown, fallback = false): boolean {
  if (typeof value === 'boolean') return value;
  if (value === 'true') return true;
  if (value === 'false') return false;
  return fallback;
}

function asOption<T extends string>(value: unknown, options: readonly T[], fallback: T): T {
  return typeof value === 'string' && options.includes(value as T) ? (value as T) : fallback;
}

function asText(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}

const SECTION_TITLE_ARG_TYPES = {
  title: ordered(10, { control: 'text' }),
  subtitle: ordered(20, { control: 'text' }),
  icon: ordered(40, { control: 'icon' }),
  as: ordered(1, { control: 'select', options: AS_OPTIONS }),
  align: ordered(3, { control: 'select', options: ALIGN_OPTIONS }),
  iconColor: ordered(55, { name: 'Icon color', control: 'text' }),
  iconLabel: ordered(60, { name: 'Icon aria label', control: 'text' }),
  iconTone: ordered(50, { name: 'Icon tone', control: 'select', options: ICON_TONES }),
  showIcon: ordered(30, { name: 'Show icon', control: 'boolean' }),
  subtitleTone: ordered(90, { name: 'Subtitle tone', control: 'select', options: SUBTITLE_TONES }),
  subtitleVariant: ordered(80, { name: 'Subtitle variant', control: 'select', options: TEXT_VARIANTS }),
  titleAs: ordered(70, { name: 'Title element', control: 'select', options: TEXT_AS_OPTIONS }),
  titleVariant: ordered(75, { name: 'Title variant', control: 'select', options: TEXT_VARIANTS }),
  titleWeight: ordered(76, { name: 'Title weight', control: 'select', options: TEXT_WEIGHTS }),
  wrapActions: ordered(4, { name: 'Wrap actions', control: 'boolean' }),
};

const SHARED_ARGS = {
  title: '에디터 추천',
  subtitle: 'yovo 에디터가 이번 주 직접 골라낸 작품',
  icon: 'sparkles',
  as: 'header',
  align: 'start',
  iconColor: '',
  iconLabel: '',
  iconTone: 'purple',
  showIcon: true,
  subtitleTone: 'tertiary',
  subtitleVariant: 'body-sm',
  titleAs: 'h3',
  titleVariant: 'heading-3',
  titleWeight: 'bold',
  wrapActions: true,
};

export default {
  title: 'SgDsLibrary/SectionTitle',
  component: SgDsLibrarySectionTitle,
};

export const Default = {
  args: SHARED_ARGS,
  argTypes: SECTION_TITLE_ARG_TYPES,
  sourceInsert: {
    imports: [{ names: ['SgDsLibraryButton', 'SgDsLibrarySectionTitleGroup'] }],
    jsxChildren: '<SgDsLibrarySectionTitleGroup align="end"><SgDsLibraryButton trailingIcon="chevron-down" size="sm" variant="soft">타입</SgDsLibraryButton><SgDsLibraryButton trailingIcon="chevron-down" size="sm" variant="soft">최신순</SgDsLibraryButton><SgDsLibraryButton aria-label="이전 추천" iconOnly leadingIcon="list-filter" shape="pill" size="sm" variant="soft" /><SgDsLibraryButton aria-label="다음 추천" iconOnly leadingIcon="ellipsis" shape="pill" size="sm" variant="soft" /></SgDsLibrarySectionTitleGroup>',
    props: SHARED_ARGS,
  },
  render: renderDefaultSectionTitle,
};

export const Compact = {
  args: {
    ...SHARED_ARGS,
    title: '지금 무료 감상',
    subtitle: '구독하지 않아도 바로 감상할 수 있어요',
    icon: 'play-circle',
    iconTone: 'success',
  },
  argTypes: SECTION_TITLE_ARG_TYPES,
  sourceInsert: {
    imports: [{ names: ['SgDsLibraryButton', 'SgDsLibrarySectionTitleGroup'] }],
    jsxChildren: '<SgDsLibrarySectionTitleGroup align="end"><SgDsLibraryButton aria-label="이전" iconOnly leadingIcon="chevron-left" shape="pill" size="sm" variant="soft" /><SgDsLibraryButton aria-label="다음" iconOnly leadingIcon="chevron-right" shape="pill" size="sm" variant="soft" /></SgDsLibrarySectionTitleGroup>',
    props: {
      ...SHARED_ARGS,
      title: '지금 무료 감상',
      subtitle: '구독하지 않아도 바로 감상할 수 있어요',
      icon: 'play-circle',
      iconColor: '',
      iconTone: 'success',
    },
  },
  render: renderCompactSectionTitle,
};

export const TextOnly = {
  args: {
    ...SHARED_ARGS,
    title: '최신작품',
    subtitle: '모든 카테고리의 따끈한 신작',
    showIcon: false,
  },
  argTypes: SECTION_TITLE_ARG_TYPES,
  sourceInsert: {
    props: {
      ...SHARED_ARGS,
      title: '최신작품',
      subtitle: '모든 카테고리의 따끈한 신작',
      iconColor: '',
      showIcon: false,
    },
  },
  render: renderSectionTitle,
};

function renderDefaultSectionTitle(args: Args) {
  return renderSectionTitle(args, (
    <SgDsLibrarySectionTitleGroup align="end">
      <SgDsLibraryButton trailingIcon="chevron-down" size="sm" variant="soft">타입</SgDsLibraryButton>
      <SgDsLibraryButton trailingIcon="chevron-down" size="sm" variant="soft">최신순</SgDsLibraryButton>
      <SgDsLibraryButton aria-label="이전 추천" iconOnly leadingIcon="list-filter" shape="pill" size="sm" variant="soft" />
      <SgDsLibraryButton aria-label="다음 추천" iconOnly leadingIcon="ellipsis" shape="pill" size="sm" variant="soft" />
    </SgDsLibrarySectionTitleGroup>
  ));
}

function renderCompactSectionTitle(args: Args) {
  return renderSectionTitle(args, (
    <SgDsLibrarySectionTitleGroup align="end">
      <SgDsLibraryButton aria-label="이전" iconOnly leadingIcon="chevron-left" shape="pill" size="sm" variant="soft" />
      <SgDsLibraryButton aria-label="다음" iconOnly leadingIcon="chevron-right" shape="pill" size="sm" variant="soft" />
    </SgDsLibrarySectionTitleGroup>
  ));
}

function renderSectionTitle(args: Args, children?: ReactNode) {
  return (
    <SgDsLibrarySectionTitle
      title={asText(args.title, '섹션 타이틀')}
      subtitle={asText(args.subtitle, '')}
      icon={asText(args.icon, '')}
      as={asOption(args.as, AS_OPTIONS, 'header')}
      align={asOption(args.align, ALIGN_OPTIONS, 'start')}
      iconColor={asText(args.iconColor, '')}
      iconLabel={asText(args.iconLabel, '')}
      iconTone={asOption(args.iconTone, ICON_TONES, 'brand')}
      showIcon={asBoolean(args.showIcon, true)}
      subtitleTone={asOption(args.subtitleTone, SUBTITLE_TONES, 'tertiary')}
      subtitleVariant={asOption(args.subtitleVariant, TEXT_VARIANTS, 'body-sm')}
      titleAs={asOption(args.titleAs, TEXT_AS_OPTIONS, 'h3')}
      titleVariant={asOption(args.titleVariant, TEXT_VARIANTS, 'heading-3')}
      titleWeight={asOption(args.titleWeight, TEXT_WEIGHTS, 'bold')}
      wrapActions={asBoolean(args.wrapActions, true)}
    >
      {children}
    </SgDsLibrarySectionTitle>
  );
}
