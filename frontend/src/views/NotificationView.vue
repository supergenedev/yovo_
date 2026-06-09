<script setup>
import {
  Sidebar,
  SidebarGroup,
  SidebarItem,
  SidebarFollowRow,
  UserBlock,
  Stack,
  ButtonPopover,
  PopoverList,
  PopoverItem,
  UserCardHead,
  UserCard,
  SidebarFooter,
  Switch,
  Card,
  Tab,
  TabsBar,
  TabsList,
  Tabs,
  TabsPanel,
  Divider,
  Icon,
  Badge,
  Avatar,
  Button,
  Text,
} from '@/components'
import { onMounted } from 'vue'
import { useNotificationStore } from '@/stores/notification'

const notifStore = useNotificationStore()

onMounted(() => {
  notifStore.fetchNotifications()
  notifStore.fetchUnreadCount()
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

const typeConfig = {
  post_liked:    { icon: 'heart',          label: '포스트에 좋아요가 달렸습니다' },
  post_commented:{ icon: 'message-circle', label: '댓글이 달렸습니다' },
  new_follower:  { icon: 'user-plus',      label: '팔로우했습니다' },
  new_post:      { icon: 'file-text',      label: '새 포스트를 올렸습니다' },
  post_tipped:   { icon: 'gem',            label: '팁을 보냈습니다' },
}

function getTypeConfig(type) {
  return typeConfig[type] ?? { icon: 'bell', label: type }
}

function handleNotifClick(id) {
  notifStore.markRead(id)
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
    <!-- LEFT — SIDEBAR -->

    <!-- CENTER -->
    <Sidebar
      :style="{ width: '72px' }"
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
        <SidebarItem icon="house" label="홈" :active="true" />
        <SidebarItem icon="layout-grid" label="탐색" :active="false" />
        <SidebarItem icon="book-marked" label="구매목록" :active="false" />
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

    <!-- RIGHT — aside -->

    <Stack
      justify="start"
      :scrollFade="false"
      align="center"
      :style="{ width: '100%', minWidth: 'var(--ds-spacing-dialog-max-width-md)', paddingTop: '0.75rem', overflow: 'hidden', height: '100%', flex: '1 1 auto', paddingRight: 'var(--ds-spacing-space-4)' }"
      direction="column"
      gap="none"
    >
      <!-- Hero details -->
      <Stack
        :style="{ height: '100%', overflow: 'hidden', width: '100%', maxWidth: '1200px' }"
        as="div"
        radius="none"
        direction="column"
        align="center"
        justify="start"
        gap="xs"
        padding="none"
        background="none"
        mask="none"
        maskStart="45"
        maskEnd="100"
        maskAngle="0"
        glassBlur="18"
      >
        <Stack
          background="none"
          :style="{ height: 'fit-content', width: '100%', paddingTop: 'var(--ds-spacing-space-2)', top: '0px', position: 'sticky', zIndex: '1', paddingBottom: 'var(--ds-spacing-space-3)' }"
          as="header"
          direction="row"
          align="center"
          gap="md"
          :wrap="false"
        >
          <Stack as="div" radius="none" direction="row" align="center" justify="start" gap="xs" padding="none" background="none" mask="none" maskStart="45" maskEnd="100" maskAngle="0" glassBlur="18">
            <Text :style="{ width: 'fit-content' }" as="h1" variant="heading-1" weight="bold">알림</Text>
            <Badge v-if="notifStore.unreadCount > 0" :style="{ width: 'fit-content' }" status="danger" variant="subtle" size="md" shape="pill">{{ notifStore.unreadCount }}개 안읽음</Badge>
          </Stack>
          <Button v-if="notifStore.unreadCount > 0" shape="pill" variant="soft" size="sm" @click="notifStore.readAll()">모두 읽음</Button>
          <Button shape="pill" variant="soft" size="md" leadingIcon="ellipsis" iconOnly aria-label="더보기" />
        </Stack>

        <Stack
          :scrollFade="false"
          :style="{ width: '100%', height: '1132px', overflow: 'scroll' }"
          as="div"
          radius="md"
          direction="row"
          align="stretch"
          justify="start"
          gap="2xl"
          padding="none"
          background="none"
          mask="none"
          maskStart="45"
          maskEnd="100"
          maskAngle="0"
          glassBlur="18"
        >
          <Stack
            :scrollFade="false"
            :style="{ width: '100%', overflow: 'scroll', flex: '1 1 auto' }"
            as="div"
            radius="md"
            direction="column"
            align="center"
            justify="start"
            gap="md"
            padding="none"
            background="none"
          >
            <Tabs :sticky="true" :style="{ width: '100%', height: 'fit-content', paddingBottom: 'var(--ds-spacing-space-8)' }" variant="pill" size="md">

              <!-- ── 탭 바 ─────────────────────────────────────────────────── -->
              <TabsBar :style="{ width: '100%', display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-space-3)', paddingBottom: 'var(--ds-spacing-space-4)' }">
                <TabsList label="알림 필터" :style="{ flex: '1 1 auto', minWidth: '0' }">
                  <Tab id="notifications-tab-all" controls="notifications-panel-all" :selected="true" leadingIcon="inbox">전체 10</Tab>
                  <Tab id="notifications-tab-new" controls="notifications-panel-new" :selected="false" leadingIcon="sparkles">새 작품 4</Tab>
                  <Tab id="notifications-tab-replies" controls="notifications-panel-replies" :selected="false" leadingIcon="message-circle">답글 1</Tab>
                  <Tab id="notifications-tab-yovo" controls="notifications-panel-yovo" :selected="false" leadingIcon="megaphone">yovo 소식 1</Tab>
                </TabsList>
                <ButtonPopover trailingIcon="chevron-down" placement="bottom-end" buttonLabel="최신순" buttonShape="pill" buttonSize="sm" buttonVariant="soft" :closeOnItemClick="true">
                  <PopoverList>
                    <PopoverItem icon="clock">최신순</PopoverItem>
                    <PopoverItem icon="bell-dot">안읽음 먼저</PopoverItem>
                  </PopoverList>
                </ButtonPopover>
              </TabsBar>

              <!-- ── 전체 패널 ─────────────────────────────────────────────── -->
              <TabsPanel id="notifications-panel-all" labelledBy="notifications-tab-all" :selected="true" :style="{ width: '100%' }">
                <Stack :style="{ paddingTop: 'var(--ds-spacing-space-4)' }" direction="column" align="stretch" justify="start" gap="xl" padding="none" background="none">

                  <!-- 로딩 상태 -->
                  <Text v-if="notifStore.loading && notifStore.notifications.length === 0" tone="tertiary">불러오는 중...</Text>

                  <!-- 빈 상태 -->
                  <Text v-else-if="!notifStore.loading && notifStore.notifications.length === 0" tone="tertiary">알림이 없습니다.</Text>

                  <!-- 알림 목록 -->
                  <Card v-else variant="bare" padding="xs" gap="none">
                    <template v-for="(notif, idx) in notifStore.notifications" :key="notif.id">
                      <Stack
                        as="article"
                        :background="notif.read ? 'none' : 'surface'"
                        direction="row"
                        align="start"
                        justify="start"
                        gap="md"
                        padding="md"
                        width="100%"
                        :radius="notif.read ? 'none' : 'md'"
                        style="cursor: pointer;"
                        @click="handleNotifClick(notif.id)"
                      >
                        <Stack direction="row" align="center" gap="xs" width="auto" :style="{ flex: '0 0 auto' }">
                          <Stack
                            width="auto"
                            radius="pill"
                            :style="{
                              width: '8px',
                              height: '8px',
                              flex: '0 0 auto',
                              background: notif.read ? 'transparent' : 'var(--ds-color-brand-bg)',
                            }"
                          />
                          <Avatar
                            :src="notif.notifiable?.profile_image ?? undefined"
                            :initials="(notif.notifiable?.nickname ?? '?')[0]"
                            size="md"
                            shape="circle"
                            tone="neutral"
                            :alt="notif.notifiable?.nickname ?? ''"
                          />
                        </Stack>
                        <Stack direction="column" gap="xxs" :style="{ flex: '1 1 auto', minWidth: '0' }">
                          <Stack direction="row" align="center" gap="xxs" :wrap="true">
                            <Text as="span" variant="body" weight="semibold">{{ notif.notifiable?.nickname ?? 'yovo' }}</Text>
                            <Icon :name="getTypeConfig(notif.notification_type).icon" size="14px" />
                          </Stack>
                          <Text as="p" variant="body-sm" tone="secondary">{{ notif.body || getTypeConfig(notif.notification_type).label }}</Text>
                          <Text v-if="notif.title" as="p" variant="caption" tone="tertiary" :truncate="true" truncateLines="1">{{ notif.title }}</Text>
                        </Stack>
                        <Stack direction="column" align="end" gap="xs" width="auto" :style="{ flex: '0 0 auto' }">
                          <Text as="span" variant="caption" tone="tertiary">{{ timeAgo(notif.created_at) }}</Text>
                        </Stack>
                      </Stack>
                      <Divider v-if="idx < notifStore.notifications.length - 1" orientation="horizontal" variant="solid" inset="none" />
                    </template>
                  </Card>

                  <!-- Load more -->
                  <Stack v-if="notifStore.hasMore" direction="row" justify="center" marginTop="var(--ds-spacing-space-4)" padding="var(--wb-spacing-space-4)" height="40px">
                    <Button
                      variant="ghost"
                      size="sm"
                      label="이전 알림 더 보기"
                      trailingIcon="chevron-down"
                      :disabled="notifStore.loading"
                      @click="notifStore.fetchNotifications((notifStore.meta?.page ?? 1) + 1)"
                    />
                  </Stack>

                </Stack>
              </TabsPanel>

              <!-- ── 새 작품 패널 ───────────────────────────────────────────── -->
              <TabsPanel id="notifications-panel-new" labelledBy="notifications-tab-new" :selected="false" :style="{ width: '100%' }">
                <Stack direction="column" gap="xs" width="100%">
                  <Text as="p" variant="caption" tone="tertiary" weight="semibold" transform="uppercase" :style="{ paddingLeft: 'var(--ds-spacing-space-1)' }">새 작품</Text>
                  <Card variant="bare" padding="xs" gap="xs">

                    <Stack background="surface" as="article" direction="row" align="start" justify="start" gap="md" padding="md" radius="md">
                      <Avatar src="https://i.pinimg.com/736x/3e/36/00/3e3600f33f0c190104d30d2a971e1659.jpg" initials="R" size="md" shape="circle" tone="pink" alt="RINA" />
                      <Stack direction="column" gap="xxs" :style="{ flex: '1 1 auto', minWidth: '0' }">
                        <Stack direction="row" align="center" gap="xxs" :wrap="true">
                          <Text as="span" variant="body" weight="semibold">RINA</Text>
                          <Badge status="danger" variant="subtle" size="sm" shape="pill">새 작품</Badge>
                        </Stack>
                        <Text as="p" variant="body-sm" tone="secondary">새 작품을 업로드했어요</Text>
                        <Text as="p" variant="caption" tone="tertiary" :truncate="true" truncateLines="1">〈루나의 첫 등장〉 1화 · 보이스드라마</Text>
                      </Stack>
                      <Text as="span" variant="caption" tone="tertiary">5분 전</Text>
                    </Stack>

                    <Stack background="surface" as="article" direction="row" align="start" justify="start" gap="md" padding="md" width="100%" radius="md">
                      <Avatar initials="N" size="md" shape="circle" tone="blue" alt="Noel ASMR" />
                      <Stack direction="column" gap="xxs" :style="{ flex: '1 1 auto', minWidth: '0' }">
                        <Stack direction="row" align="center" gap="xxs" :wrap="true">
                          <Text as="span" variant="body" weight="semibold">Noel ASMR</Text>
                          <Badge status="danger" variant="subtle" size="sm" shape="pill">새 작품</Badge>
                        </Stack>
                        <Text as="p" variant="body-sm" tone="secondary">새 ASMR 트랙이 도착했어요</Text>
                        <Text as="p" variant="caption" tone="tertiary" :truncate="true" truncateLines="1">빗소리 30분 — 헤드폰 전용</Text>
                      </Stack>
                      <Text as="span" variant="caption" tone="tertiary">3시간 전</Text>
                    </Stack>

                    <Stack as="article" direction="row" align="start" justify="start" gap="md" padding="md" width="100%">
                      <Avatar initials="D" size="md" shape="circle" tone="amber" alt="DAISY" />
                      <Stack direction="column" gap="xxs" :style="{ flex: '1 1 auto', minWidth: '0' }">
                        <Stack direction="row" align="center" gap="xxs" :wrap="true">
                          <Text as="span" variant="body" weight="semibold">DAISY</Text>
                          <Badge status="danger" variant="subtle" size="sm" shape="pill">새 작품</Badge>
                        </Stack>
                        <Text as="p" variant="body-sm" tone="secondary">새 에피소드가 공개됐어요</Text>
                        <Text as="p" variant="caption" tone="tertiary" :truncate="true" truncateLines="1">새벽 라디오 드라마 EP.07</Text>
                      </Stack>
                      <Text as="span" variant="caption" tone="tertiary">2일 전</Text>
                    </Stack>

                    <Stack as="article" direction="row" align="start" justify="start" gap="md" padding="md" width="100%">
                      <Avatar initials="M" size="md" shape="circle" tone="amber" alt="MIKO Studio" />
                      <Stack direction="column" gap="xxs" :style="{ flex: '1 1 auto', minWidth: '0' }">
                        <Stack direction="row" align="center" gap="xxs" :wrap="true">
                          <Text as="span" variant="body" weight="semibold">MIKO Studio</Text>
                          <Badge status="danger" variant="subtle" size="sm" shape="pill">새 작품</Badge>
                        </Stack>
                        <Text as="p" variant="body-sm" tone="secondary">구독자 전용 비하인드를 공개했어요</Text>
                        <Text as="p" variant="caption" tone="tertiary" :truncate="true" truncateLines="1">〈한여름의 끝〉 메이킹 영상 · 12분</Text>
                      </Stack>
                      <Text as="span" variant="caption" tone="tertiary">5일 전</Text>
                    </Stack>

                  </Card>
                </Stack>
              </TabsPanel>

              <!-- ── 답글 패널 ─────────────────────────────────────────────── -->
              <TabsPanel id="notifications-panel-replies" labelledBy="notifications-tab-replies" :selected="false" :style="{ width: '100%' }">
                <Stack direction="column" gap="xs" width="100%">
                  <Text as="p" variant="caption" tone="tertiary" weight="semibold" transform="uppercase" :style="{ paddingLeft: 'var(--ds-spacing-space-1)' }">답글</Text>
                  <Card variant="bare" padding="xs" gap="none">
                    <Stack as="article" direction="row" align="start" justify="start" gap="md" padding="md" width="100%">
                      <Avatar initials="J" size="md" shape="circle" tone="purple" alt="Jinx Comix" />
                      <Stack direction="column" gap="xs" :style="{ flex: '1 1 auto', minWidth: '0' }">
                        <Stack direction="row" align="center" gap="xxs" :wrap="true">
                          <Text as="span" variant="body" weight="semibold">Jinx Comix</Text>
                          <Badge status="info" variant="subtle" size="sm" shape="pill">답글</Badge>
                        </Stack>
                        <Text as="p" variant="body-sm" tone="secondary">내 댓글에 답글을 남겼어요</Text>
                        <Stack direction="row" align="start" gap="xs" padding="sm" radius="md" width="100%" :style="{ background: 'var(--ds-color-surface-subtle, rgba(148,163,184,0.10))' }">
                          <Text as="p" variant="body-sm" tone="secondary" :style="{ flex: '1 1 auto', minWidth: '0' }">맞아요! 다음 화에서 그 떡밥 풀 예정이에요.</Text>
                        </Stack>
                      </Stack>
                      <Text as="span" variant="caption" tone="tertiary">어제</Text>
                    </Stack>
                  </Card>
                </Stack>
              </TabsPanel>

              <!-- ── yovo 소식 패널 ────────────────────────────────────────── -->
              <TabsPanel id="notifications-panel-yovo" labelledBy="notifications-tab-yovo" :selected="false" :style="{ width: '100%' }">
                <Stack direction="column" gap="xs" width="100%">
                  <Text as="p" variant="caption" tone="tertiary" weight="semibold" transform="uppercase" :style="{ paddingLeft: 'var(--ds-spacing-space-1)' }">yovo 소식</Text>
                  <Card variant="bare" padding="xs" gap="none">
                    <Stack as="article" direction="row" align="start" justify="start" gap="md" padding="md" width="100%">
                      <Avatar initials="Y" size="md" shape="circle" tone="neutral" alt="yovo team" />
                      <Stack direction="column" gap="xxs" :style="{ flex: '1 1 auto', minWidth: '0' }">
                        <Stack direction="row" align="center" gap="xxs" :wrap="true">
                          <Text as="span" variant="body" weight="semibold">yovo team</Text>
                          <Badge status="neutral" variant="solid" size="sm" shape="pill">OFFICIAL</Badge>
                          <Badge status="neutral" variant="subtle" size="sm" shape="pill">yovo 소식</Badge>
                        </Stack>
                        <Text as="p" variant="body-sm" tone="secondary">이번 주 Featured 작품이 도착했어요</Text>
                        <Text as="p" variant="caption" tone="tertiary" :truncate="true" truncateLines="1">yovo가 직접 큐레이션한 이번 주 추천작 12편을 확인해보세요.</Text>
                      </Stack>
                      <Text as="span" variant="caption" tone="tertiary">4일 전</Text>
                    </Stack>
                  </Card>
                </Stack>
              </TabsPanel>

            </Tabs>
          </Stack>

          <!-- RIGHT aside -->
          <Stack
            :style="{ height: '1135px', paddingBottom: '1rem', maxWidth: '240px', minWidth: '160px', position: 'sticky', top: '0' }"
            as="aside"
            align="stretch"
            gap="2xl"
            padding="none"
          >
            <Stack background="soft" padding="lg" as="section" direction="column" gap="md" aria-label="알림 설정">
              <Stack direction="row" align="center" justify="between">
                <Text lineHeight="1em" as="h3" variant="ui" weight="semibold">알림 설정</Text>
              </Stack>
              <Stack direction="column" gap="sm">
                <Switch :defaultChecked="true" size="md" label="새 작품" />
                <Switch defaultChecked size="md" label="구독 갱신 안내" />
                <Switch defaultChecked size="md" label="답글·댓글" />
                <Switch size="md" label="yovo 소식" />
              </Stack>
            </Stack>
          </Stack>

        </Stack>
      </Stack>
    </Stack>

  </Stack>
</template>
