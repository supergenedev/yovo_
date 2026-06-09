<script setup>
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  Sidebar,
  SidebarGroup,
  SidebarItem,
  SidebarFollowRow,
  UserBlock,
  ButtonPopover,
  PopoverList,
  PopoverItem,
} from '@/components'
import { useMeStore } from '@/stores/me'
import { useNotificationStore } from '@/stores/notification'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const meStore = useMeStore()
const notifStore = useNotificationStore()
const authStore = useAuthStore()

onMounted(() => {
  meStore.fetchMe()
  meStore.fetchFollowing()
  notifStore.fetchUnreadCount()
})

function getInitials(name) {
  if (!name) return '?'
  const words = name.trim().split(/\s+/)
  return words.length >= 2
    ? (words[0][0] + words[1][0]).toUpperCase()
    : name.slice(0, 2).toUpperCase()
}

function handleLogout() {
  authStore.logout()
  router.push('/auth')
}
</script>

<template>
  <Sidebar
    :style="{ height: '100%' }"
    :collapsed="false"
    collapsedWidth="64"
    presentation="sidebar"
    width="272px"
    background="none"
    :bordered="false"
    radius="none"
    brandMarkText="Y"
    expandedBrandDisplay="symbol-logo"
    height="100vh"
  >
    <SidebarGroup :style="{ height: 'fit-content' }">
      <SidebarItem :emphasized="true" badgeVariant="subtle" icon="plus" label="작품 만들기" :active="route.path === '/create'" @click="router.push('/create')" />
    </SidebarGroup>

    <SidebarGroup>
      <SidebarItem icon="house" label="홈" :active="route.path === '/'" @click="router.push('/')" />
      <SidebarItem icon="video" label="VIDEO" :active="route.path === '/video'" @click="router.push('/video')" />
      <SidebarItem icon="user-star" label="크리에이터" badgeStatus="info" badgeVariant="subtle" :active="route.path === '/creator'" @click="router.push('/creator')" />
      <SidebarItem icon="messages-square" label="채팅" :active="route.path === '/dm'" @click="router.push('/dm')" />
      <SidebarItem :badge="notifStore.unreadCount > 0 ? String(notifStore.unreadCount) : undefined" icon="bell-dot" label="알림" :active="route.path === '/notification'" @click="router.push('/notification')" />
      <SidebarItem icon="book-marked" label="라이브러리" :active="route.path === '/library'" @click="router.push('/library')" />
    </SidebarGroup>

    <SidebarGroup :count="meStore.following.length || undefined" seeAllLabel="모두보기" label="팔로잉">
      <SidebarFollowRow
        v-for="creator in meStore.following"
        :key="creator.id"
        :avatarSrc="creator.profile_image ?? undefined"
        :name="creator.nickname ?? ''"
        :initials="getInitials(creator.nickname)"
        size="sm"
        avatarTone="brand"
        as="button"
        @click="router.push('/creator/' + creator.id)"
      />
    </SidebarGroup>

    <SidebarGroup :style="{ height: '100%' }" label="프로필" seeAllIcon="chevron-right">
      <UserBlock
        action3Icon=""
        action3Variant="ghost"
        action2Icon=""
        avatarSize="md"
        :avatarSrc="meStore.user?.profile_image ?? undefined"
        :style="{ width: '100%' }"
        :name="meStore.user?.nickname ?? ''"
        :meta="meStore.user?.username ? '@' + meStore.user.username : '팬'"
        :initials="getInitials(meStore.user?.nickname)"
        avatarTone="brand"
        size="md"
      >
        <ButtonPopover leadingIcon="ellipsis" :iconOnly="true" trailingIcon="chevron-down" placement="top-end" buttonLabel="메뉴" buttonShape="pill" buttonSize="sm" buttonVariant="ghost" :closeOnItemClick="true">
          <PopoverList>
            <PopoverItem icon="circle-user">프로필</PopoverItem>
            <PopoverItem icon="layout-dashboard">대시보드</PopoverItem>
            <PopoverItem icon="log-out" @click="handleLogout">로그아웃</PopoverItem>
          </PopoverList>
        </ButtonPopover>
      </UserBlock>
    </SidebarGroup>
  </Sidebar>
</template>
