import { defineStore } from 'pinia'
import { ref } from 'vue'
import { apiFetch } from '@/utils/api/apiFetch'

export const useDmStore = defineStore('dm', () => {
  const chatRooms = ref([])
  const currentRoom = ref(null)
  const messages = ref([])
  const loading = ref(false)
  const messagesLoading = ref(false)
  const error = ref(null)

  async function fetchChatRooms() {
    loading.value = true
    error.value = null
    try {
      const res = await apiFetch('/api/v/chat_rooms')
      chatRooms.value = res.data ?? []
    } catch (e) {
      error.value = e
    } finally {
      loading.value = false
    }
  }

  async function fetchMessages(roomId) {
    messagesLoading.value = true
    error.value = null
    try {
      const res = await apiFetch(`/api/v/chat_rooms/${roomId}/chats`)
      messages.value = res.data ?? []
    } catch (e) {
      error.value = e
    } finally {
      messagesLoading.value = false
    }
  }

  async function sendMessage(roomId, message) {
    try {
      const res = await apiFetch(`/api/v/chat_rooms/${roomId}/chats`, {
        method: 'POST',
        body: { message },
      })
      messages.value = [...messages.value, res.data ?? res]
    } catch (e) {
      error.value = e
    }
  }

  async function markSeen(roomId) {
    try {
      await apiFetch(`/api/v/chat_rooms/${roomId}/seen`, { method: 'POST' })
      const room = chatRooms.value.find((r) => r.id === roomId)
      if (room) room.unread_count = 0
    } catch {
      // ignore
    }
  }

  async function selectRoom(room) {
    currentRoom.value = room
    await fetchMessages(room.id)
    await markSeen(room.id)
  }

  return {
    chatRooms,
    currentRoom,
    messages,
    loading,
    messagesLoading,
    error,
    fetchChatRooms,
    fetchMessages,
    sendMessage,
    markSeen,
    selectRoom,
  }
})
