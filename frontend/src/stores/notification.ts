import { create } from 'zustand'
import { apiFetch, type PageMeta } from '@/lib/api'

interface TabCounts {
  total: number
  new_post: number
  replies: number
  yovo: number
}

interface NotificationState {
  notifications: any[]
  meta: PageMeta | null
  unreadCount: number
  tabCounts: TabCounts
  loading: boolean
  hasMore: () => boolean
  fetchNotifications: (page?: number) => Promise<void>
  fetchUnreadCount: () => Promise<void>
  fetchTabCounts: () => Promise<void>
  readAll: () => Promise<void>
  markRead: (id: string | number) => Promise<void>
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  meta: null,
  unreadCount: 0,
  tabCounts: { total: 0, new_post: 0, replies: 0, yovo: 0 },
  loading: false,

  hasMore: () => get().meta?.next != null,

  async fetchNotifications(page = 1) {
    set({ loading: true })
    try {
      const res = await apiFetch('/api/v/notifications', { query: { page } })
      set((s) => ({
        notifications: page === 1 ? res.data : [...s.notifications, ...res.data],
        meta: res.meta,
      }))
    } catch (e) {
      console.error('fetchNotifications error:', e)
    } finally {
      set({ loading: false })
    }
  },

  async fetchUnreadCount() {
    try {
      const res = await apiFetch('/api/v/notifications/unread_count')
      set({ unreadCount: res.count ?? 0 })
    } catch (e) {
      console.error('fetchUnreadCount error:', e)
    }
  },

  async fetchTabCounts() {
    try {
      const res = await apiFetch('/api/v/notifications/tab_counts')
      set({ tabCounts: res })
    } catch (e) {
      console.error('fetchTabCounts error:', e)
    }
  },

  async readAll() {
    try {
      await apiFetch('/api/v/notifications/read_all', { method: 'POST' })
      set((s) => ({
        notifications: s.notifications.map((n) => ({ ...n, read: true })),
        unreadCount: 0,
      }))
    } catch (e) {
      console.error('readAll error:', e)
    }
  },

  async markRead(id) {
    try {
      await apiFetch(`/api/v/notifications/${id}`, { method: 'PATCH', body: { read: true } })
      set((s) => {
        // id가 문자열/숫자 혼재할 수 있어 String으로 통일 비교
        const target = s.notifications.find((n) => String(n.id) === String(id))
        if (!target || target.read) return s
        return {
          notifications: s.notifications.map((n) => (String(n.id) === String(id) ? { ...n, read: true } : n)),
          unreadCount: Math.max(0, s.unreadCount - 1),
        }
      })
    } catch (e) {
      console.error('markRead error:', e)
    }
  },
}))
