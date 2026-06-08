<script setup>
import {
  Sidebar,
  SidebarFollowRow,
  SidebarGroup,
  SidebarItem,
  SidebarFooter,
  Stack,
  Text,
  UserBlock,
  UserCard,
  UserCardHead,
  PopoverList,
  PopoverItem,
  ButtonPopover,
  Button,
  Link,
  Tabs,
  TabsList,
  Tab,
  TabsBar,
  TabsPanel,
  CardGrid,
  VideoListCard,
  SectionTitleGroup,
} from '@/components'
</script>

<template>
  <Stack
    :style="{ width: '100%', height: '100%', overflow: 'hidden' }"
    as="main"
    direction="row"
    align="stretch"
    gap="lg"
  >
    <!-- LEFT — SIDEBAR -->
    <Sidebar
      :style="{ width: '272px' }"
      :collapsed="false"
      collapsedWidth="72"
      headerLogoImage="/workbench-assets/icons/logo-mpks329o.svg"
      headerSymbolImage="/workbench-assets/icons/symbol-mpks329n.svg"
      presentation="sidebar"
      width="272px"
      background="none"
      :bordered="false"
      radius="none"
      brandMarkText="Y"
      expandedBrandDisplay="symbol-logo"
      height="100vh"
    >
      <SidebarGroup seeAllIcon="chevron-right">
        <UserCard name="Hailey Luna" initials="HL" meta="Creator · live now" variant="outline" tint="sunken">
          <UserCardHead>
            <UserBlock
              action3Icon=""
              action3Variant="ghost"
              action2Icon=""
              avatarSize="sm"
              avatarSrc="https://i.pinimg.com/736x/cb/12/b2/cb12b2f39982bf66734cd7e5a34eb891.jpg"
              :style="{ width: '100%' }"
              name="Munhee J"
              meta="@munhee · 크리에이터"
              initials="MJ"
              avatarTone="purple"
              :verified="true"
              size="md"
            >
              <ButtonPopover
                :style="{ width: '32px' }"
                leadingIcon="ellipsis"
                :iconOnly="true"
                trailingIcon="chevron-down"
                placement="bottom-start"
                buttonLabel="최신순"
                buttonShape="pill"
                buttonSize="sm"
                buttonVariant="ghost"
                :closeOnItemClick="true"
              >
                <PopoverList>
                  <PopoverItem icon="circle-user">프로필</PopoverItem>
                  <PopoverItem icon="layout-dashboard">대시보드</PopoverItem>
                  <PopoverItem icon="settings">설정</PopoverItem>
                </PopoverList>
              </ButtonPopover>
            </UserBlock>
          </UserCardHead>
        </UserCard>
      </SidebarGroup>

      <SidebarGroup seeAllIcon="chevron-right">
        <SidebarItem :emphasized="false" badgeVariant="subtle" icon="plus" label="작품 만들기" :active="false" />
      </SidebarGroup>

      <SidebarGroup>
        <SidebarItem icon="house" label="홈" :active="false" />
        <SidebarItem icon="layout-grid" label="탐색" :active="false" />
        <SidebarItem icon="book-marked" label="구매목록" :active="true" />
        <SidebarItem badge="12" icon="bell-dot" label="알림" :active="false" />
      </SidebarGroup>

      <SidebarGroup count="45" seeAllLabel="모두보기" label="팔로잉">
        <SidebarFollowRow avatarSrc="https://i.pinimg.com/736x/ac/30/ad/ac30ad5b4d550027ff5be9fe95e3f196.jpg" size="sm" name="Hailey Luna" initials="HL" avatarTone="brand" status="live" tail="LIVE" tailStatus="live" tailVariant="plain" as="button" />
        <SidebarFollowRow avatarSrc="https://i.pinimg.com/1200x/b9/45/02/b94502342dfd29c213a99bb1d93c151d.jpg" size="sm" name="NeoVoice" initials="NV" avatarTone="teal" tail="방송중" as="button" />
        <SidebarFollowRow avatarSrc="https://i.pinimg.com/1200x/e8/df/8e/e8df8ee3fd256e1fa1b1714a59d03517.jpg" size="sm" name="코다 / Koda" initials="KO" avatarTone="amber" tail="작업중" as="button" />
        <SidebarFollowRow avatarSrc="https://i.pinimg.com/1200x/ca/70/2c/ca702cddd216a2990f402aa303f4a03e.jpg" size="sm" name="Ren Morimoto" initials="RM" avatarTone="purple" tail="5분" as="button" />
        <SidebarFollowRow avatarSrc="https://i.pinimg.com/736x/ac/30/ad/ac30ad5b4d550027ff5be9fe95e3f196.jpg" size="sm" name="aether.studio" initials="AT" avatarTone="coral" tail="3시간" as="button" />
      </SidebarGroup>

      <SidebarFooter primaryLabel="다크모드" primaryIcon="moon" secondaryLabel="설정" secondaryIcon="settings" />
    </Sidebar>

    <!-- MAIN COLUMN -->
    <Stack
      align="center"
      :style="{ width: '100%', paddingTop: '0.75rem', overflow: 'hidden', height: '100%', flex: '1 1 auto', paddingRight: '1rem', minWidth: '600px' }"
      direction="column"
      gap="none"
    >
      <Stack
        :style="{ height: '100%', width: '100%', maxWidth: '1960px' }"
        as="div"
        radius="none"
        direction="column"
        align="stretch"
        justify="start"
        gap="sm"
        padding="none"
        background="none"
      >
        <!-- STICKY PAGE HEADER -->
        <Stack
          justify="between"
          background="none"
          :style="{ width: '100%', paddingTop: 'var(--ds-spacing-space-2)', top: '0px', zIndex: '2', paddingBottom: 'var(--ds-spacing-space-3)' }"
          as="header"
          direction="row"
          align="center"
          gap="md"
          :wrap="false"
        >
          <Stack direction="column" gap="xs" flex="1 1 auto">
            <Text as="h1" tone="primary" variant="heading-1" weight="bold" truncateLines="1" align="start">구매목록</Text>
          </Stack>
          <Button shape="pill" variant="soft" size="md" leadingIcon="sliders-horizontal" iconOnly aria-label="라이브러리 설정" />
        </Stack>

        <!-- SCROLLING CONTENT -->
        <Stack
          :scrollFade="false"
          :style="{ width: '100%', overflow: 'hidden', flex: '1 1 auto' }"
          as="div"
          radius="md"
          direction="column"
          align="center"
          justify="start"
          gap="2xl"
          padding="none"
          background="none"
        >
          <Tabs
            :sticky="true"
            :style="{ width: '100%', flexDirection: 'column', overflow: 'scroll' }"
            variant="underline"
            size="lg"
          >
            <TabsBar
              :style="{ width: '100%', display: 'flex', alignItems: 'center', height: 'fit-content' }"
              label="라이브러리 탭"
            >
              <TabsList :style="{ width: '100%', paddingTop: 'var(--ds-spacing-space-1)', height: 'fit-content', borderStyle: 'none' }">
                <Tab leadingIcon="list-video" badgeText="10" :badge="true" badgeVariant="neutral" :selected="true">구매한 작품</Tab>
                <Tab leadingIcon="bookmark" badgeText="8" :badge="true" badgeVariant="neutral" :selected="false">즐겨찾기</Tab>
                <Tab leadingIcon="clock" badgeText="12" :badge="true" badgeVariant="neutral" :selected="false">최근 본</Tab>
              </TabsList>
            </TabsBar>

            <TabsPanel :style="{ width: '100%', paddingTop: 'var(--ds-spacing-space-4)' }" :selected="true">
              <Stack :scrollFade="false" :style="{ width: '100%' }" direction="column" gap="md">

                <!-- CARD GRID -->
                <Stack direction="row" align="center" gap="md" :wrap="false">
                  <Stack flex="1 1 auto" minWidth="0">
                    <Tabs ariaLabel="카테고리 필터" size="md" variant="pill">
                      <TabsList>
                        <Tab selected leadingIcon="layout-grid">전체</Tab>
                        <Tab leadingIcon="headphones">보이스드라마</Tab>
                        <Tab leadingIcon="clapperboard">시네마틱</Tab>
                        <Tab leadingIcon="ear">ASMR</Tab>
                        <Tab leadingIcon="film">단편영상</Tab>
                        <Tab leadingIcon="sparkles">애니메이션</Tab>
                        <Tab leadingIcon="play">MV</Tab>
                        <Tab leadingIcon="video">Vlog</Tab>
                      </TabsList>
                    </Tabs>
                  </Stack>
                  <SectionTitleGroup align="end">
                    <ButtonPopover
                      trailingIcon="chevron-down"
                      placement="bottom-end"
                      buttonLabel="최신순"
                      buttonShape="default"
                      buttonSize="sm"
                      buttonVariant="ghost"
                      :closeOnItemClick="true"
                    >
                      <PopoverList>
                        <PopoverItem icon="clock">최신순</PopoverItem>
                        <PopoverItem icon="flame">인기순</PopoverItem>
                        <PopoverItem icon="sparkles">추천순</PopoverItem>
                      </PopoverList>
                    </ButtonPopover>
                  </SectionTitleGroup>
                </Stack>

                <CardGrid
                  itemMinSize="200px"
                  itemMaxSize="280px"
                  :style="{ width: '100%' }"
                  cols="4"
                  count="20"
                  itemSize="auto"
                  layout="grid"
                  gap="sm"
                  :arrows="false"
                  scroll="smooth"
                >
                  <!-- 1 — Purple, 19+, 3h -->
                  <Stack as="article" direction="column" gap="xxs" :style="{ width: '100%', height: 'fit-content' }">
                    <Stack direction="row" align="center" gap="xs" :wrap="false">
                      <Text as="span" tone="success" variant="body-sm" weight="medium">✓ 구매 완료</Text>
                      <Text as="span" tone="tertiary" variant="body-sm" weight="regular">· 2026.08.15</Text>
                    </Stack>
                    <VideoListCard
                      thumbnailImageUrl="https://i.pinimg.com/736x/64/35/1b/64351bf5a15fdc1674758340556a1967.jpg"
                      avatarSrc="https://i.pinimg.com/1200x/ab/5b/0c/ab5b0cd28321dfb14b3e0311c3616207.jpg"
                      :style="{ height: 'fit-content' }"
                      title="새벽이 떠오를 때 — 2인 콜라보 단편"
                      creatorName="코다 / Koda"
                      meta="92K 시청 · 1주 전"
                      duration="17:02"
                      progress="64"
                      progressLabel="Media progress"
                      actionLabel="More options"
                      actionSize="sm"
                      thumbnailAspect="16/9"
                      avatarAlt="코다 / Koda"
                      avatarInitials="코다"
                      creatorBadge="후원자 145k"
                      creatorBadgeStatus="neutral"
                      creatorBadgeVariant="flat"
                      badgeText="15+"
                      badgeVariant="solid"
                      badgeStatus="warning"
                      :creatorVerified="true"
                      :showGrain="true"
                      variant="vertical"
                      avatarTone="brand"
                      titleLines="3"
                      size="sm"
                      avatarSize="sm"
                      avatarShape="circle"
                      thumbnailBackground="linear-gradient(140deg, #0c1429, #4c1d95 50%, #be185d)"
                      actionIcon="ellipsis"
                      mediaSize="sm"
                      :showAction="true"
                    />
                  </Stack>
                </CardGrid>

                <!-- LOAD MORE -->
                <Stack direction="row" justify="center" padding="lg" :style="{ width: '100%' }">
                  <Button variant="soft" shape="pill" size="md" trailingIcon="chevron-down">더 많은 작품 불러오기</Button>
                </Stack>
              </Stack>
            </TabsPanel>

            <!-- FOOTER -->
            <Stack
              :style="{ height: 'fit-content', marginTop: 'auto', width: '100%' }"
              justify="center"
              align="center"
              padding="xl"
              background="none"
              direction="row"
              :wrap="true"
              gap="none"
            >
              <Stack :wrap="true" as="div" radius="none" direction="row" align="stretch" justify="center" gap="sm" padding="none" background="none">
                <Link variant="subtle" size="sm">소개</Link>
                <Link variant="subtle" size="sm">크리에이터 가이드</Link>
                <Link variant="subtle" size="sm">크레딧 정책</Link>
                <Link variant="subtle" size="sm">고객지원</Link>
                <Link variant="subtle" size="sm">한국어</Link>
              </Stack>
              <Stack justify="center" direction="row" width="100%" marginTop="12px">© 2026 YOVO</Stack>
            </Stack>
          </Tabs>
        </Stack>
      </Stack>
    </Stack>
  </Stack>
</template>
