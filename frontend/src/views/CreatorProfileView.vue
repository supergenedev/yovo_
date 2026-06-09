<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  Stack,
  Text,
  Button,
  Avatar,
  Badge,
  Chip,
  CardGrid,
  VideoListCard,
} from '@/components'
import { useCreatorStore } from '@/stores/creator'
import { apiFetch } from '@/utils/api/apiFetch'

const route = useRoute()
const router = useRouter()
const creatorStore = useCreatorStore()

const posts = ref([])
const postsMeta = ref(null)
const postsLoading = ref(false)
const following = ref(false)
const followId = ref(null)

const creator = computed(() => creatorStore.currentCreator)

onMounted(async () => {
  const id = route.params.id
  await creatorStore.fetchCreatorUser(id)
  following.value = creator.value?.interaction_with_me?.is_following ?? false
  await fetchPosts(id)
})

async function fetchPosts(id, page = 1) {
  postsLoading.value = true
  try {
    const res = await apiFetch(`/api/v/creator_users/${id}/posts`, { query: { page } })
    posts.value = page === 1 ? res.data : [...posts.value, ...res.data]
    postsMeta.value = res.meta
  } finally {
    postsLoading.value = false
  }
}

async function handleFollow() {
  if (following.value) {
    await creatorStore.unfollow(followId.value, creator.value.id)
    following.value = false
  } else {
    const res = await creatorStore.follow(creator.value.id)
    followId.value = res?.id ?? null
    following.value = true
  }
}

async function handleDm() {
  try {
    const res = await apiFetch('/api/v/chat_rooms', {
      method: 'POST',
      body: { creator_user_id: creator.value.id },
    })
    router.push('/dm')
  } catch (e) {
    router.push('/dm')
  }
}

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
    :style="{ width: '100%', height: '100%', overflowY: 'auto' }"
    direction="column"
    align="center"
    gap="none"
  >
    <!-- Loading -->
    <Stack v-if="!creator" align="center" justify="center" padding="2xl">
      <Text tone="tertiary">불러오는 중...</Text>
    </Stack>

    <template v-else>
      <!-- Header banner -->
      <div
        :style="{
          width: '100%',
          height: '200px',
          background: creator.profile_image
            ? `url(${creator.profile_image}) center/cover`
            : (creator.background_color ?? 'linear-gradient(135deg, #1e1b4b, #4c1d95)'),
          flexShrink: '0',
        }"
      />

      <!-- Profile section -->
      <Stack
        direction="column"
        align="start"
        gap="lg"
        padding="lg"
        :style="{ width: '100%', maxWidth: '900px', marginTop: '-40px', boxSizing: 'border-box' }"
      >
        <Stack direction="row" align="end" justify="between" :style="{ width: '100%' }">
          <Avatar
            :src="creator.profile_image ?? undefined"
            :initials="(creator.nickname ?? '?').slice(0, 2).toUpperCase()"
            size="2xl"
            shape="circle"
            tone="brand"
            :alt="creator.nickname"
            :style="{ border: '4px solid var(--ds-color-background-default)', background: 'var(--ds-color-background-default)' }"
          />
          <Stack v-if="!creator.interaction_with_me?.is_my_account" direction="row" gap="sm" align="center">
            <Button
              :variant="following ? 'primary' : 'secondary'"
              size="md"
              shape="pill"
              :leadingIcon="following ? 'check' : 'plus'"
              @click="handleFollow"
            >{{ following ? '팔로잉' : '팔로우' }}</Button>
            <Button variant="soft" size="md" shape="pill" leadingIcon="message-circle" @click="handleDm">메시지</Button>
          </Stack>
        </Stack>

        <!-- Name + badges -->
        <Stack direction="column" gap="xs">
          <Stack direction="row" align="center" gap="xs">
            <Text as="h1" variant="heading-3" weight="bold">{{ creator.nickname }}</Text>
            <Badge v-if="creator.creator_type === 'official'" status="info" variant="solid" size="sm" shape="pill">공식</Badge>
          </Stack>
          <Text v-if="creator.username" tone="tertiary" variant="body-sm">@{{ creator.username }}</Text>
          <Text v-if="creator.introduction" tone="secondary" variant="body-sm" :style="{ maxWidth: '600px' }">{{ creator.introduction }}</Text>

          <!-- Stats -->
          <Stack direction="row" gap="lg" :style="{ marginTop: '4px' }">
            <Stack direction="column" gap="none" width="auto">
              <Text as="span" variant="body" weight="bold">{{ (creator.followers_count ?? 0).toLocaleString() }}</Text>
              <Text as="span" variant="caption" tone="tertiary">팔로워</Text>
            </Stack>
            <Stack direction="column" gap="none" width="auto">
              <Text as="span" variant="body" weight="bold">{{ (creator.posts_count ?? 0).toLocaleString() }}</Text>
              <Text as="span" variant="caption" tone="tertiary">작품</Text>
            </Stack>
            <Stack direction="column" gap="none" width="auto">
              <Text as="span" variant="body" weight="bold">{{ (creator.likes_count ?? 0).toLocaleString() }}</Text>
              <Text as="span" variant="caption" tone="tertiary">좋아요</Text>
            </Stack>
          </Stack>

          <!-- Tags -->
          <Stack v-if="creator.tags?.length" direction="row" gap="xs" :wrap="true">
            <Chip v-for="tag in creator.tags" :key="tag" size="sm">#{{ tag }}</Chip>
          </Stack>
        </Stack>

        <!-- Posts section -->
        <Stack direction="column" gap="md" :style="{ width: '100%' }">
          <Text as="h2" variant="heading-5" weight="semibold">작품</Text>

          <Text v-if="postsLoading && posts.length === 0" tone="tertiary">불러오는 중...</Text>
          <Text v-else-if="!postsLoading && posts.length === 0" tone="tertiary">아직 작품이 없습니다.</Text>

          <CardGrid
            v-else
            cols="4"
            :count="posts.length"
            itemSize="custom"
            itemSizeOverride="240px"
            layout="grid"
            gap="md"
            :arrows="false"
          >
            <VideoListCard
              v-for="post in posts"
              :key="post.id"
              :thumbnailImageUrl="post.locked_thumbnail_url ?? undefined"
              :title="post.title_ko ?? post.title ?? ''"
              :creatorName="creator.nickname ?? ''"
              :meta="timeAgo(post.created_at)"
              thumbnailAspect="16/9"
              :avatarAlt="creator.nickname ?? ''"
              :avatarInitials="(creator.nickname ?? '?').slice(0, 2).toUpperCase()"
              :avatarSrc="creator.profile_image ?? undefined"
              :showGrain="true"
              variant="vertical"
              avatarTone="brand"
              titleLines="2"
              size="sm"
              avatarSize="sm"
              avatarShape="circle"
              thumbnailBackground="linear-gradient(140deg, #0c1429, #4c1d95 50%, #be185d)"
              actionIcon="ellipsis"
              :showAction="true"
            />
          </CardGrid>

          <Stack v-if="postsMeta?.next" direction="row" justify="center" padding="lg">
            <Button variant="ghost" size="sm" trailingIcon="chevron-down" :disabled="postsLoading" @click="fetchPosts(route.params.id, (postsMeta?.page ?? 1) + 1)">더 불러오기</Button>
          </Stack>
        </Stack>
      </Stack>
    </template>
  </Stack>
</template>
