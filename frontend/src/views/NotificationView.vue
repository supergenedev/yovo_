<script setup>
import {
  UserBlock,
  Stack,
  ButtonPopover,
  PopoverList,
  PopoverItem,
  UserCardHead,
  UserCard,
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
import { onMounted, ref } from 'vue'
import { useNotificationStore } from '@/stores/notification'

const notifStore = useNotificationStore()
const selectedNotifTab = ref(0)

onMounted(() => {
  notifStore.fetchNotifications()
  notifStore.fetchUnreadCount()
  notifStore.fetchTabCounts()
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
                  <Tab id="notifications-tab-all" controls="notifications-panel-all" :selected="selectedNotifTab === 0" leadingIcon="inbox" @click="selectedNotifTab = 0">전체 {{ notifStore.tabCounts.total || '' }}</Tab>
                  <Tab id="notifications-tab-new" controls="notifications-panel-new" :selected="selectedNotifTab === 1" leadingIcon="sparkles" @click="selectedNotifTab = 1">새 작품 {{ notifStore.tabCounts.new_post || '' }}</Tab>
                  <Tab id="notifications-tab-replies" controls="notifications-panel-replies" :selected="selectedNotifTab === 2" leadingIcon="message-circle" @click="selectedNotifTab = 2">답글 {{ notifStore.tabCounts.replies || '' }}</Tab>
                  <Tab id="notifications-tab-yovo" controls="notifications-panel-yovo" :selected="selectedNotifTab === 3" leadingIcon="megaphone" @click="selectedNotifTab = 3">yovo 소식</Tab>
                </TabsList>
                <ButtonPopover trailingIcon="chevron-down" placement="bottom-end" buttonLabel="최신순" buttonShape="pill" buttonSize="sm" buttonVariant="soft" :closeOnItemClick="true">
                  <PopoverList>
                    <PopoverItem icon="clock">최신순</PopoverItem>
                    <PopoverItem icon="bell-dot">안읽음 먼저</PopoverItem>
                  </PopoverList>
                </ButtonPopover>
              </TabsBar>

              <!-- ── 전체 패널 ─────────────────────────────────────────────── -->
              <TabsPanel id="notifications-panel-all" labelledBy="notifications-tab-all" :selected="selectedNotifTab === 0" :style="{ width: '100%' }">
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
              <TabsPanel id="notifications-panel-new" labelledBy="notifications-tab-new" :selected="selectedNotifTab === 1" :style="{ width: '100%' }">
                <Stack :style="{ paddingTop: 'var(--ds-spacing-space-4)' }" direction="column" align="stretch" justify="start" gap="xl" padding="none" background="none">
                  <Text v-if="notifStore.loading && notifStore.notifications.length === 0" tone="tertiary">불러오는 중...</Text>
                  <Text v-else-if="!notifStore.loading && notifStore.notifications.filter(n => n.notification_type === 'new_post').length === 0" tone="tertiary">새 작품 알림이 없습니다.</Text>
                  <Card v-else variant="bare" padding="xs" gap="none">
                    <template v-for="(notif, idx) in notifStore.notifications.filter(n => n.notification_type === 'new_post')" :key="notif.id">
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
                          <Stack width="auto" radius="pill" :style="{ width: '8px', height: '8px', flex: '0 0 auto', background: notif.read ? 'transparent' : 'var(--ds-color-brand-bg)' }" />
                          <Avatar :src="notif.notifiable?.profile_image ?? undefined" :initials="(notif.notifiable?.nickname ?? '?')[0]" size="md" shape="circle" tone="neutral" :alt="notif.notifiable?.nickname ?? ''" />
                        </Stack>
                        <Stack direction="column" gap="xxs" :style="{ flex: '1 1 auto', minWidth: '0' }">
                          <Stack direction="row" align="center" gap="xxs" :wrap="true">
                            <Text as="span" variant="body" weight="semibold">{{ notif.notifiable?.nickname ?? 'yovo' }}</Text>
                            <Badge status="danger" variant="subtle" size="sm" shape="pill">새 작품</Badge>
                          </Stack>
                          <Text as="p" variant="body-sm" tone="secondary">{{ notif.body || '새 작품을 업로드했어요' }}</Text>
                          <Text v-if="notif.title" as="p" variant="caption" tone="tertiary" :truncate="true" truncateLines="1">{{ notif.title }}</Text>
                        </Stack>
                        <Text as="span" variant="caption" tone="tertiary">{{ timeAgo(notif.created_at) }}</Text>
                      </Stack>
                      <Divider v-if="idx < notifStore.notifications.filter(n => n.notification_type === 'new_post').length - 1" orientation="horizontal" variant="solid" inset="none" />
                    </template>
                  </Card>
                </Stack>
              </TabsPanel>

              <!-- ── 답글 패널 ─────────────────────────────────────────────── -->
              <TabsPanel id="notifications-panel-replies" labelledBy="notifications-tab-replies" :selected="selectedNotifTab === 2" :style="{ width: '100%' }">
                <Stack :style="{ paddingTop: 'var(--ds-spacing-space-4)' }" direction="column" align="stretch" justify="start" gap="xl" padding="none" background="none">
                  <Text v-if="notifStore.loading && notifStore.notifications.length === 0" tone="tertiary">불러오는 중...</Text>
                  <Text v-else-if="!notifStore.loading && notifStore.notifications.filter(n => n.notification_type === 'post_commented').length === 0" tone="tertiary">답글 알림이 없습니다.</Text>
                  <Card v-else variant="bare" padding="xs" gap="none">
                    <template v-for="(notif, idx) in notifStore.notifications.filter(n => n.notification_type === 'post_commented')" :key="notif.id">
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
                          <Stack width="auto" radius="pill" :style="{ width: '8px', height: '8px', flex: '0 0 auto', background: notif.read ? 'transparent' : 'var(--ds-color-brand-bg)' }" />
                          <Avatar :src="notif.notifiable?.profile_image ?? undefined" :initials="(notif.notifiable?.nickname ?? '?')[0]" size="md" shape="circle" tone="neutral" :alt="notif.notifiable?.nickname ?? ''" />
                        </Stack>
                        <Stack direction="column" gap="xxs" :style="{ flex: '1 1 auto', minWidth: '0' }">
                          <Stack direction="row" align="center" gap="xxs" :wrap="true">
                            <Text as="span" variant="body" weight="semibold">{{ notif.notifiable?.nickname ?? 'yovo' }}</Text>
                            <Badge status="info" variant="subtle" size="sm" shape="pill">댓글</Badge>
                          </Stack>
                          <Text as="p" variant="body-sm" tone="secondary">{{ notif.body || '댓글이 달렸습니다' }}</Text>
                          <Text v-if="notif.title" as="p" variant="caption" tone="tertiary" :truncate="true" truncateLines="1">{{ notif.title }}</Text>
                        </Stack>
                        <Text as="span" variant="caption" tone="tertiary">{{ timeAgo(notif.created_at) }}</Text>
                      </Stack>
                      <Divider v-if="idx < notifStore.notifications.filter(n => n.notification_type === 'post_commented').length - 1" orientation="horizontal" variant="solid" inset="none" />
                    </template>
                  </Card>
                </Stack>
              </TabsPanel>

              <!-- ── yovo 소식 패널 ────────────────────────────────────────── -->
              <TabsPanel id="notifications-panel-yovo" labelledBy="notifications-tab-yovo" :selected="selectedNotifTab === 3" :style="{ width: '100%' }">
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
