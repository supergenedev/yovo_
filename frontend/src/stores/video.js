import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { apiFetch } from '@/utils/api/apiFetch'

export const useVideoStore = defineStore('video', () => {
  const posts = ref([])
  const meta = ref(null)
  const loading = ref(false)

  const hasMore = computed(() => meta.value?.next != null)

  async function fetchVideoPosts(page = 1) {
    loading.value = true
    try {
      const res = await apiFetch('/api/v/feeds/discover', { query: { page } })
      posts.value = page === 1 ? res.data : [...posts.value, ...res.data]
      meta.value = res.meta
    } catch (e) {
      console.error('fetchVideoPosts error:', e)
    } finally {
      loading.value = false
    }
  }

  function loadMore() {
    if (hasMore.value && !loading.value) {
      const nextPage = (meta.value?.page ?? 1) + 1
      fetchVideoPosts(nextPage)
    }
  }

  return { posts, meta, loading, hasMore, fetchVideoPosts, loadMore }
})
