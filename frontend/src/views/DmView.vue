<script setup>
import { ref, onMounted } from 'vue'
import { Stack, Text, Input, Button, UserBlock, Badge } from '@/components'
import { useDmStore } from '@/stores/dm'
import { useAuthStore } from '@/stores/auth'

const dmStore = useDmStore()
const authStore = useAuthStore()

const messageInput = ref('')

onMounted(() => {
  dmStore.fetchChatRooms()
})

async function handleSelectRoom(room) {
  await dmStore.selectRoom(room)
}

async function handleSend() {
  if (!messageInput.value.trim() || !dmStore.currentRoom) return
  await dmStore.sendMessage(dmStore.currentRoom.id, messageInput.value.trim())
  messageInput.value = ''
}

function formatTime(ms) {
  if (!ms) return ''
  const d = new Date(ms)
  const now = new Date()
  const diff = now - d
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return '방금'
  if (mins < 60) return `${mins}분 전`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}시간 전`
  return `${Math.floor(hours / 24)}일 전`
}

function isMine(chat) {
  // sender_type 'user' and sender_id matches current user
  return chat.sender_type === 'user' && String(chat.sender_id) === String(authStore.userId)
}
</script>

<template>
  <Stack
    direction="row"
    align="stretch"
    :style="{ width: '100%', height: '100vh', overflow: 'hidden' }"
  >
    <!-- LEFT: Chat room list -->
    <Stack
      direction="column"
      align="stretch"
      gap="none"
      :style="{
        width: '300px',
        minWidth: '300px',
        borderRight: '1px solid var(--ds-color-border-default)',
        height: '100%',
        overflow: 'hidden',
      }"
    >
      <!-- Header -->
      <Stack
        direction="row"
        align="center"
        justify="between"
        padding="lg"
        :style="{ borderBottom: '1px solid var(--ds-color-border-default)', flex: '0 0 auto' }"
      >
        <Text as="h2" variant="heading-4" weight="semibold">메시지</Text>
      </Stack>

      <!-- Loading -->
      <Stack v-if="dmStore.loading" align="center" justify="center" padding="xl">
        <Text tone="tertiary">불러오는 중...</Text>
      </Stack>

      <!-- Empty -->
      <Stack
        v-else-if="dmStore.chatRooms.length === 0"
        direction="column"
        align="center"
        justify="center"
        padding="xl"
        gap="sm"
        :style="{ flex: '1 1 auto' }"
      >
        <Text tone="tertiary">대화가 없습니다.</Text>
      </Stack>

      <!-- Room list -->
      <Stack
        v-else
        direction="column"
        align="stretch"
        gap="none"
        :style="{ flex: '1 1 auto', overflowY: 'auto' }"
      >
        <button
          v-for="room in dmStore.chatRooms"
          :key="room.id"
          :style="{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: 'var(--ds-spacing-space-3) var(--ds-spacing-space-4)',
            background: dmStore.currentRoom?.id === room.id
              ? 'var(--ds-color-background-selected)'
              : 'transparent',
            border: 'none',
            borderBottom: '1px solid var(--ds-color-border-subtle)',
            cursor: 'pointer',
            textAlign: 'left',
            width: '100%',
          }"
          @click="handleSelectRoom(room)"
        >
          <Stack direction="row" align="center" gap="sm" :style="{ flex: '1 1 auto', minWidth: 0 }">
            <UserBlock
              :name="room.creator_user?.nickname ?? '알 수 없음'"
              :avatar-src="room.creator_user?.profile_image ?? undefined"
              :initials="(room.creator_user?.nickname ?? 'UN').slice(0, 2).toUpperCase()"
              avatar-tone="brand"
              avatar-size="sm"
              size="sm"
              :meta="room.last_message ? (room.last_message.length > 30 ? room.last_message.slice(0, 30) + '…' : room.last_message) : ''"
              :style="{ flex: '1 1 auto', minWidth: 0 }"
            />
            <Stack direction="column" align="end" gap="xs" :style="{ flex: '0 0 auto' }">
              <Text variant="body-xs" tone="tertiary">{{ formatTime(room.last_messaged_at) }}</Text>
              <Badge
                v-if="room.unread_count > 0"
                variant="danger"
                :label="String(room.unread_count)"
              />
            </Stack>
          </Stack>
        </button>
      </Stack>
    </Stack>

    <!-- RIGHT: Chat messages -->
    <Stack
      direction="column"
      align="stretch"
      gap="none"
      :style="{ flex: '1 1 auto', height: '100%', overflow: 'hidden' }"
    >
      <!-- No room selected -->
      <Stack
        v-if="!dmStore.currentRoom"
        direction="column"
        align="center"
        justify="center"
        gap="sm"
        :style="{ flex: '1 1 auto' }"
      >
        <Text tone="tertiary" variant="body-lg">대화를 선택하세요</Text>
      </Stack>

      <template v-else>
        <!-- Room header -->
        <Stack
          direction="row"
          align="center"
          gap="md"
          padding="lg"
          :style="{ borderBottom: '1px solid var(--ds-color-border-default)', flex: '0 0 auto' }"
        >
          <Text as="h3" variant="heading-4" weight="semibold">
            {{ dmStore.currentRoom.creator_user?.nickname ?? '대화' }}
          </Text>
        </Stack>

        <!-- Messages -->
        <Stack
          direction="column"
          align="stretch"
          gap="sm"
          padding="lg"
          :style="{ flex: '1 1 auto', overflowY: 'auto' }"
        >
          <Stack v-if="dmStore.messagesLoading" align="center" justify="center" padding="xl">
            <Text tone="tertiary">메시지를 불러오는 중...</Text>
          </Stack>

          <Stack
            v-else-if="dmStore.messages.length === 0"
            align="center"
            justify="center"
            padding="xl"
          >
            <Text tone="tertiary">메시지가 없습니다. 첫 메시지를 보내보세요.</Text>
          </Stack>

          <template v-else>
            <Stack
              v-for="chat in dmStore.messages"
              :key="chat.id"
              direction="row"
              :justify="isMine(chat) ? 'end' : 'start'"
              :style="{ width: '100%' }"
            >
              <div
                :style="{
                  maxWidth: '70%',
                  padding: 'var(--ds-spacing-space-2) var(--ds-spacing-space-3)',
                  borderRadius: 'var(--ds-radius-lg)',
                  background: isMine(chat)
                    ? 'var(--ds-color-background-brand)'
                    : 'var(--ds-color-background-sunken)',
                  color: isMine(chat)
                    ? 'var(--ds-color-text-on-brand)'
                    : 'var(--ds-color-text-default)',
                  wordBreak: 'break-word',
                }"
              >
                <Text variant="body-sm">{{ chat.message }}</Text>
                <Text
                  variant="body-xs"
                  :style="{
                    display: 'block',
                    marginTop: '2px',
                    opacity: '0.65',
                    textAlign: isMine(chat) ? 'right' : 'left',
                  }"
                >
                  {{ formatTime(chat.created_at) }}
                </Text>
              </div>
            </Stack>
          </template>
        </Stack>

        <!-- Message input -->
        <Stack
          direction="row"
          align="center"
          gap="sm"
          padding="lg"
          :style="{ borderTop: '1px solid var(--ds-color-border-default)', flex: '0 0 auto' }"
        >
          <Input
            v-model="messageInput"
            type="text"
            placeholder="메시지 입력..."
            size="md"
            :style="{ flex: '1 1 auto' }"
            @keydown.enter="handleSend"
          />
          <Button
            variant="primary"
            size="md"
            label="전송"
            :disabled="!messageInput.trim()"
            @click="handleSend"
          />
        </Stack>
      </template>
    </Stack>
  </Stack>
</template>
