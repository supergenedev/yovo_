<script setup>
import {
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
import { onMounted, ref, watch } from 'vue'
import { useLibraryStore } from '@/stores/library'

const libraryStore = useLibraryStore()
const selectedTab = ref(0)

onMounted(() => {
  libraryStore.fetchPurchased()
})

watch(selectedTab, (val) => {
  if (val === 1 && libraryStore.bookmarks.length === 0) libraryStore.fetchBookmarks()
})

function timeAgo(ms) {
  if (!ms) return ''
  const diff = Date.now() - ms
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return '방금 전'
  if (mins < 60) return `${mins}분 전`
  const hours = Math.floor(mins / 60)
  return hours < 24 ? `${hours}시간 전` : `${Math.floor(hours / 24)}일 전`
}
</script>

<template>
  <Stack
    :style="{ width: '100%', height: '100%', overflow: 'hidden' }"
    as="main"
    direction="row"
    align="stretch"
    gap="lg"
  >
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
                <Tab leadingIcon="list-video" badgeText="10" :badge="true" badgeVariant="neutral" :selected="selectedTab === 0" @click="selectedTab = 0">구매한 작품</Tab>
                <Tab leadingIcon="bookmark" badgeText="8" :badge="true" badgeVariant="neutral" :selected="selectedTab === 1" @click="selectedTab = 1">즐겨찾기</Tab>
                <Tab leadingIcon="clock" badgeText="12" :badge="true" badgeVariant="neutral" :selected="selectedTab === 2" @click="selectedTab = 2">최근 본</Tab>
              </TabsList>
            </TabsBar>

            <TabsPanel :style="{ width: '100%', paddingTop: 'var(--ds-spacing-space-4)' }" :selected="selectedTab === 0">
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

                <!-- 로딩 -->
                <Text v-if="libraryStore.loading && libraryStore.purchased.length === 0" tone="tertiary">불러오는 중...</Text>

                <!-- 빈 상태 -->
                <Text v-else-if="!libraryStore.loading && libraryStore.purchased.length === 0" tone="tertiary">구매한 작품이 없습니다.</Text>

                <CardGrid
                  v-else
                  itemMinSize="200px"
                  itemMaxSize="280px"
                  :style="{ width: '100%' }"
                  cols="4"
                  :count="libraryStore.purchased.length"
                  itemSize="auto"
                  layout="grid"
                  gap="sm"
                  :arrows="false"
                  scroll="smooth"
                >
                  <Stack
                    v-for="post in libraryStore.purchased"
                    :key="post.id"
                    as="article"
                    direction="column"
                    gap="xxs"
                    :style="{ width: '100%', height: 'fit-content' }"
                  >
                    <VideoListCard
                      :thumbnailImageUrl="post.locked_thumbnail_url ?? undefined"
                      :avatarSrc="post.creator_user?.profile_image ?? undefined"
                      :style="{ height: 'fit-content' }"
                      :title="post.title_ko ?? post.title ?? ''"
                      :creatorName="post.creator_user?.nickname ?? ''"
                      :meta="timeAgo(post.created_at)"
                      thumbnailAspect="16/9"
                      :avatarAlt="post.creator_user?.nickname ?? ''"
                      :avatarInitials="(post.creator_user?.nickname ?? '?')[0]"
                      :showGrain="true"
                      variant="vertical"
                      avatarTone="neutral"
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
                <Stack v-if="libraryStore.hasPurchasedMore" direction="row" justify="center" padding="lg" :style="{ width: '100%' }">
                  <Button variant="soft" shape="pill" size="md" trailingIcon="chevron-down" :disabled="libraryStore.loading" @click="libraryStore.fetchPurchased((libraryStore.purchasedMeta?.page ?? 1) + 1)">더 많은 작품 불러오기</Button>
                </Stack>
              </Stack>
            </TabsPanel>

            <!-- 즐겨찾기 패널 -->
            <TabsPanel :style="{ width: '100%', paddingTop: 'var(--ds-spacing-space-4)' }" :selected="selectedTab === 1">
              <Stack :scrollFade="false" :style="{ width: '100%' }" direction="column" gap="md">
                <Text v-if="libraryStore.loading && libraryStore.bookmarks.length === 0" tone="tertiary">불러오는 중...</Text>
                <Text v-else-if="!libraryStore.loading && libraryStore.bookmarks.length === 0" tone="tertiary">즐겨찾기한 작품이 없습니다.</Text>
                <CardGrid
                  v-else
                  itemMinSize="200px"
                  itemMaxSize="280px"
                  :style="{ width: '100%' }"
                  cols="4"
                  :count="libraryStore.bookmarks.length"
                  itemSize="auto"
                  layout="grid"
                  gap="sm"
                  :arrows="false"
                  scroll="smooth"
                >
                  <Stack v-for="post in libraryStore.bookmarks" :key="post.id" as="article" direction="column" gap="xxs" :style="{ width: '100%', height: 'fit-content' }">
                    <VideoListCard
                      :thumbnailImageUrl="post.locked_thumbnail_url ?? undefined"
                      :avatarSrc="post.creator_user?.profile_image ?? undefined"
                      :style="{ height: 'fit-content' }"
                      :title="post.title_ko ?? post.title ?? ''"
                      :creatorName="post.creator_user?.nickname ?? ''"
                      :meta="timeAgo(post.created_at)"
                      thumbnailAspect="16/9"
                      :avatarAlt="post.creator_user?.nickname ?? ''"
                      :avatarInitials="(post.creator_user?.nickname ?? '?')[0]"
                      :showGrain="true"
                      variant="vertical"
                      avatarTone="neutral"
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
                <Stack v-if="libraryStore.hasMore" direction="row" justify="center" padding="lg">
                  <Button variant="soft" shape="pill" size="md" trailingIcon="chevron-down" :disabled="libraryStore.loading" @click="libraryStore.loadMore()">더 많은 작품 불러오기</Button>
                </Stack>
              </Stack>
            </TabsPanel>

            <!-- 최근 본 패널 -->
            <TabsPanel :style="{ width: '100%', paddingTop: 'var(--ds-spacing-space-4)' }" :selected="selectedTab === 2">
              <Stack align="center" justify="center" padding="2xl" direction="column" gap="sm">
                <Text tone="tertiary" variant="body-lg">최근 본 기록이 없습니다.</Text>
                <Text tone="tertiary" variant="body-sm">작품을 감상하면 여기에 기록됩니다.</Text>
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
