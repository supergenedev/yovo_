import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { apiFetch } from '@/utils/api/apiFetch'

export const useNotificationStore = defineStore('notification', () => {
  const notifications = ref([])
  const meta = ref(null)
  const unreadCount = ref(0)
  const tabCounts = ref({ total: 0, new_post: 0, replies: 0, yovo: 0 })
  const loading = ref(false)

  const hasMore = computed(() => meta.value?.next != null)

  async function fetchNotifications(page = 1) {
    loading.value = true
    try {
      const res = await apiFetch('/api/v/notifications', { query: { page } })
      notifications.value = page === 1 ? res.data : [...notifications.value, ...res.data]
      meta.value = res.meta
    } catch (e) {
      console.error('fetchNotifications error:', e)
    } finally {
      loading.value = false
    }
  }

  async function fetchUnreadCount() {
    try {
      const res = await apiFetch('/api/v/notifications/unread_count')
      unreadCount.value = res.count ?? 0
    } catch (e) {
      console.error('fetchUnreadCount error:', e)
    }
  }

  async function fetchTabCounts() {
    try {
      const res = await apiFetch('/api/v/notifications/tab_counts')
      tabCounts.value = res
    } catch (e) {
      console.error('fetchTabCounts error:', e)
    }
  }

  async function readAll() {
    try {
      await apiFetch('/api/v/notifications/read_all', { method: 'POST' })
      notifications.value = notifications.value.map(n => ({ ...n, read: true }))
      unreadCount.value = 0
    } catch (e) {
      console.error('readAll error:', e)
    }
  }

  async function markRead(id) {
    try {
      await apiFetch(`/api/v/notifications/${id}`, { method: 'PATCH', body: { read: true } })
      const notif = notifications.value.find(n => n.id === id)
      if (notif && !notif.read) {
        notif.read = true
        unreadCount.value = Math.max(0, unreadCount.value - 1)
      }
    } catch (e) {
      console.error('markRead error:', e)
    }
  }

  return { notifications, meta, unreadCount, tabCounts, loading, hasMore, fetchNotifications, fetchUnreadCount, fetchTabCounts, readAll, markRead }
})
