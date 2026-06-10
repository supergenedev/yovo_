import { create } from 'zustand'
import { apiFetch } from '@/lib/api'

interface DmState {
  chatRooms: any[]
  currentRoom: any | null
  messages: any[]
  loading: boolean
  messagesLoading: boolean
  error: unknown
  fetchChatRooms: () => Promise<void>
  fetchMessages: (roomId: string | number) => Promise<void>
  sendMessage: (roomId: string | number, message: string) => Promise<void>
  markSeen: (roomId: string | number) => Promise<void>
  selectRoom: (room: any) => Promise<void>
}

export const useDmStore = create<DmState>((set, get) => ({
  chatRooms: [],
  currentRoom: null,
  messages: [],
  loading: false,
  messagesLoading: false,
  error: null,

  async fetchChatRooms() {
    set({ loading: true, error: null })
    try {
      const res = await apiFetch('/api/v/chat_rooms')
      set({ chatRooms: res.data ?? [] })
    } catch (e) {
      set({ error: e })
    } finally {
      set({ loading: false })
    }
  },

  async fetchMessages(roomId) {
    set({ messagesLoading: true, error: null })
    try {
      const res = await apiFetch(`/api/v/chat_rooms/${roomId}/chats`)
      set({ messages: res.data ?? [] })
    } catch (e) {
      set({ error: e })
    } finally {
      set({ messagesLoading: false })
    }
  },

  async sendMessage(roomId, message) {
    try {
      const res = await apiFetch(`/api/v/chat_rooms/${roomId}/chats`, {
        method: 'POST',
        body: { message },
      })
      set((s) => ({ messages: [...s.messages, res.data ?? res] }))
    } catch (e) {
      set({ error: e })
    }
  },

  async markSeen(roomId) {
    try {
      await apiFetch(`/api/v/chat_rooms/${roomId}/seen`, { method: 'POST' })
      set((s) => ({
        chatRooms: s.chatRooms.map((r) => (r.id === roomId ? { ...r, unread_count: 0 } : r)),
      }))
    } catch {
      // ignore
    }
  },

  async selectRoom(room) {
    set({ currentRoom: room })
    await get().fetchMessages(room.id)
    await get().markSeen(room.id)
  },
}))
