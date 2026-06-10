import { SgDsLibraryButton } from './Button';
import { SgDsLibrarySectionTitle, SgDsLibrarySectionTitleGroup } from './SectionTitle';

type Args = Record<string, string>;

const ALIGN_OPTIONS = ['start', 'end'] as const;

const meta = {
  title: 'SgDsLibrary/SectionTitleGroup',
  component: SgDsLibrarySectionTitleGroup,
  args: {
    align: 'end',
  },
  argTypes: {
    align: { control: 'select', options: ALIGN_OPTIONS },
  },
  sourceInsert: {
    imports: [{ names: ['SgDsLibraryButton'] }],
    jsxChildren: '<SgDsLibraryButton size="sm" variant="soft">액션</SgDsLibraryButton>',
    props: {
      align: 'end',
    },
  },
};
export default meta;

export const Default = {
  name: 'SectionTitleGroup',
  render: (args: Args) => (
    <SgDsLibrarySectionTitle
      icon="sparkles"
      iconTone="purple"
      subtitle="그룹 안에는 버튼, 탭, 칩 등 원하는 컴포넌트를 넣을 수 있어요"
      title="섹션 타이틀"
    >
      <SgDsLibrarySectionTitleGroup align="start">
        <SgDsLibraryButton leadingIcon="filter" size="sm" variant="ghost">필터</SgDsLibraryButton>
      </SgDsLibrarySectionTitleGroup>
      <SgDsLibrarySectionTitleGroup align={asOption(args.align, ALIGN_OPTIONS, 'end')}>
        <SgDsLibraryButton trailingIcon="chevron-down" size="sm" variant="soft">최신순</SgDsLibraryButton>
        <SgDsLibraryButton aria-label="더보기" iconOnly leadingIcon="ellipsis" shape="pill" size="sm" variant="soft" />
      </SgDsLibrarySectionTitleGroup>
    </SgDsLibrarySectionTitle>
  ),
};

function asOption<T extends string>(value: unknown, options: readonly T[], fallback: T): T {
  return typeof value === 'string' && options.includes(value as T) ? (value as T) : fallback;
}
