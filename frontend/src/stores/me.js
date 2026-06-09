import { defineStore } from 'pinia'
import { ref } from 'vue'
import { apiFetch } from '@/utils/api/apiFetch'

export const useMeStore = defineStore('me', () => {
  const user = ref(null)
  const following = ref([])
  const loading = ref(false)

  async function fetchMe() {
    loading.value = true
    try {
      const res = await apiFetch('/api/v/me')
      user.value = res.user
    } catch (e) {
      console.error('fetchMe error:', e)
    } finally {
      loading.value = false
    }
  }

  async function fetchFollowing() {
    try {
      const res = await apiFetch('/api/v/follows/following')
      following.value = res.creator_users ?? []
    } catch (e) {
      console.error('fetchFollowing error:', e)
    }
  }

  return { user, following, loading, fetchMe, fetchFollowing }
})
