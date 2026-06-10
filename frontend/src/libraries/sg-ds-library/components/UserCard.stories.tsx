import { SgDsLibraryButtonPopover } from './ButtonPopover';
import {
  SgDsLibraryCreditBalanceCard,
  SgDsLibraryCreditBalanceCardBalance,
  SgDsLibraryCreditBalanceCardRow,
} from './CreditBalanceCard';
import { SgDsLibraryPopoverItem, SgDsLibraryPopoverList } from './Popover';
import { SgDsLibraryUserBlock } from './UserBlock';
import {
  SgDsLibraryUserCard,
  SgDsLibraryUserCardHead,
  SgDsLibraryUserCardSection,
  SgDsLibraryUserCardStat,
  SgDsLibraryUserCardStats,
} from './UserCard';

type Args = Record<string, boolean | string>;

const TINTS = ['default', 'sunken', 'brand'] as const;
const VARIANTS = ['solid', 'outline', 'raised', 'bare'] as const;

const meta = {
  title: 'SgDsLibrary/UserCard',
  component: SgDsLibraryUserCard,
};
export default meta;

const USER_CARD_ARGS = {
  name: 'Hailey Luna',
  initials: 'HL',
  meta: 'Creator · live now',
  variant: 'solid',
  tint: 'sunken',
};

const USER_CARD_STATS_ARGS = {
  followersLabel: '팔로워',
  followersValue: '12.4K',
  followingLabel: '팔로잉',
  followingValue: '384',
  postsLabel: '포스트',
  postsValue: '128',
};

const USER_CARD_ARG_TYPES = {
  name: { control: 'text' },
  initials: { control: 'text' },
  meta: { control: 'text' },
  variant: { control: 'select', options: VARIANTS },
  tint: { control: 'select', options: TINTS },
};

export const Default = {
  name: 'UserCard',
  args: USER_CARD_ARGS,
  argTypes: USER_CARD_ARG_TYPES,
  sourceInsert: {
    imports: [
      { names: ['SgDsLibraryUserCardHead', 'SgDsLibraryUserCardSection', 'SgDsLibraryUserCardStats'] },
      { names: ['SgDsLibraryUserBlock'] },
      { names: ['SgDsLibraryButtonPopover'] },
      { names: ['SgDsLibraryPopoverItem', 'SgDsLibraryPopoverList'] },
      { names: ['SgDsLibraryCreditBalanceCard', 'SgDsLibraryCreditBalanceCardBalance', 'SgDsLibraryCreditBalanceCardRow'] },
    ],
    jsxChildren: [
      '<SgDsLibraryUserCardHead>',
      '  <SgDsLibraryUserBlock name="Hailey Luna" meta="Creator · live now" initials="HL" verified />',
      '  <SgDsLibraryButtonPopover buttonAriaLabel="유저 카드 더보기 메뉴 열기" buttonLabel="더보기" buttonShape="pill" buttonSize="sm" buttonVariant="ghost" iconOnly leadingIcon="ellipsis" placement="bottom-end">',
      '    <SgDsLibraryPopoverList>',
      '      <SgDsLibraryPopoverItem icon="share-2">프로필 공유</SgDsLibraryPopoverItem>',
      '      <SgDsLibraryPopoverItem icon="bell">알림 설정</SgDsLibraryPopoverItem>',
      '      <SgDsLibraryPopoverItem icon="flag" tone="danger">신고하기</SgDsLibraryPopoverItem>',
      '    </SgDsLibraryPopoverList>',
      '  </SgDsLibraryButtonPopover>',
      '</SgDsLibraryUserCardHead>',
      '<SgDsLibraryUserCardSection>',
      '  <SgDsLibraryUserCardStats postsValue="128" followersValue="12.4K" followingValue="384" />',
      '</SgDsLibraryUserCardSection>',
      '<SgDsLibraryUserCardSection tint="sunken">',
      '  <SgDsLibraryCreditBalanceCard>',
      '    <SgDsLibraryCreditBalanceCardBalance balance="2,480" unit="CRD" />',
      '    <SgDsLibraryCreditBalanceCardRow label="This month" value="1,240" delta="+18%" deltaTone="positive" />',
      '    <SgDsLibraryCreditBalanceCardRow label="Pending" value="320" />',
      '  </SgDsLibraryCreditBalanceCard>',
      '</SgDsLibraryUserCardSection>',
    ].join('\n'),
    props: USER_CARD_ARGS,
  },
  render: (args: Args) => (
    <SgDsLibraryUserCard
      initials={asText(args.initials, 'HL')}
      meta={asText(args.meta, 'Creator · live now')}
      name={asText(args.name, 'Hailey Luna')}
      tint={asOption(args.tint, TINTS, 'sunken')}
      variant={asOption(args.variant, VARIANTS, 'solid')}
    />
  ),
};

export const UserCardHead = {
  sourceInsert: {
    imports: [
      { names: ['SgDsLibraryUserBlock'] },
      { names: ['SgDsLibraryButtonPopover'] },
      { names: ['SgDsLibraryPopoverItem', 'SgDsLibraryPopoverList'] },
    ],
    jsxChildren: [
      '<SgDsLibraryUserBlock name="Hailey Luna" meta="Creator" verified />',
      '<SgDsLibraryButtonPopover buttonAriaLabel="유저 카드 더보기 메뉴 열기" buttonLabel="더보기" buttonShape="pill" buttonSize="sm" buttonVariant="ghost" iconOnly leadingIcon="ellipsis" placement="bottom-end">',
      '  <SgDsLibraryPopoverList>',
      '    <SgDsLibraryPopoverItem icon="share-2">프로필 공유</SgDsLibraryPopoverItem>',
      '    <SgDsLibraryPopoverItem icon="bell">알림 설정</SgDsLibraryPopoverItem>',
      '    <SgDsLibraryPopoverItem icon="flag" tone="danger">신고하기</SgDsLibraryPopoverItem>',
      '  </SgDsLibraryPopoverList>',
      '</SgDsLibraryButtonPopover>',
    ].join('\n'),
  },
  render: () => (
    <SgDsLibraryUserCardHead
    >
      <SgDsLibraryUserBlock name="Hailey Luna" meta="Creator" verified />
      <SgDsLibraryButtonPopover
        buttonAriaLabel="유저 카드 더보기 메뉴 열기"
        buttonLabel="더보기"
        buttonShape="pill"
        buttonSize="sm"
        buttonVariant="ghost"
        iconOnly
        leadingIcon="ellipsis"
        placement="bottom-end"
      >
        <SgDsLibraryPopoverList>
          <SgDsLibraryPopoverItem icon="share-2">프로필 공유</SgDsLibraryPopoverItem>
          <SgDsLibraryPopoverItem icon="bell">알림 설정</SgDsLibraryPopoverItem>
          <SgDsLibraryPopoverItem icon="flag" tone="danger">신고하기</SgDsLibraryPopoverItem>
        </SgDsLibraryPopoverList>
      </SgDsLibraryButtonPopover>
    </SgDsLibraryUserCardHead>
  ),
};

export const UserCardStats = {
  args: USER_CARD_STATS_ARGS,
  argTypes: {
    followersLabel: { control: 'text' },
    followersValue: { control: 'text' },
    followingLabel: { control: 'text' },
    followingValue: { control: 'text' },
    postsLabel: { control: 'text' },
    postsValue: { control: 'text' },
  },
  sourceInsert: {
    props: USER_CARD_STATS_ARGS,
  },
  render: (args: Args) => (
    <SgDsLibraryUserCardStats
      followersLabel={asText(args.followersLabel, '팔로워')}
      followersValue={asText(args.followersValue, '12.4K')}
      followingLabel={asText(args.followingLabel, '팔로잉')}
      followingValue={asText(args.followingValue, '384')}
      postsLabel={asText(args.postsLabel, '포스트')}
      postsValue={asText(args.postsValue, '128')}
    />
  ),
};

export const UserCardStat = {
  args: {
    label: '팔로워',
    value: '12.4K',
  },
  argTypes: {
    label: { control: 'text' },
    value: { control: 'text' },
  },
  sourceInsert: {
    props: {
      label: '팔로워',
      value: '12.4K',
    },
  },
  render: (args: Args) => (
    <SgDsLibraryUserCardStat
      label={asText(args.label, '팔로워')}
      value={asText(args.value, '12.4K')}
    />
  ),
};

export const UserCardSection = {
  args: { tint: 'sunken' },
  argTypes: {
    tint: { control: 'select', options: TINTS },
  },
  sourceInsert: {
    imports: [{ names: ['SgDsLibraryCreditBalanceCard', 'SgDsLibraryCreditBalanceCardBalance', 'SgDsLibraryCreditBalanceCardRow'] }],
    jsxChildren: [
      '<SgDsLibraryCreditBalanceCard>',
      '  <SgDsLibraryCreditBalanceCardBalance balance="2,480" unit="CRD" />',
      '  <SgDsLibraryCreditBalanceCardRow label="This month" value="1,240" delta="+18%" deltaTone="positive" />',
      '  <SgDsLibraryCreditBalanceCardRow label="Pending" value="320" />',
      '</SgDsLibraryCreditBalanceCard>',
    ].join('\n'),
    props: { tint: 'sunken' },
  },
  render: (args: Args) => (
    <SgDsLibraryUserCardSection tint={asOption(args.tint, TINTS, 'sunken')}>
      <SgDsLibraryCreditBalanceCard>
        <SgDsLibraryCreditBalanceCardBalance balance="2,480" unit="CRD" />
        <SgDsLibraryCreditBalanceCardRow label="This month" value="1,240" delta="+18%" deltaTone="positive" />
        <SgDsLibraryCreditBalanceCardRow label="Pending" value="320" />
      </SgDsLibraryCreditBalanceCard>
    </SgDsLibraryUserCardSection>
  ),
};

function asOption<T extends string>(value: unknown, options: readonly T[], fallback: T): T {
  return typeof value === 'string' && options.includes(value as T) ? (value as T) : fallback;
}

function asText(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}
