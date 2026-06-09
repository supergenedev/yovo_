import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { apiFetch } from '@/utils/api/apiFetch'

export const useFeedStore = defineStore('feed', () => {
  const posts = ref([])
  const meta = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const hasMore = computed(() => meta.value?.next != null)

  async function fetchFeed(page = 1) {
    loading.value = true
    error.value = null
    try {
      const res = await apiFetch('/api/v/feeds', { query: { page } })
      posts.value = page === 1 ? res.data : [...posts.value, ...res.data]
      meta.value = res.meta
    } catch (e) {
      error.value = e
    } finally {
      loading.value = false
    }
  }

  async function fetchDiscover(page = 1) {
    loading.value = true
    error.value = null
    try {
      const res = await apiFetch('/api/v/feeds/discover', { query: { page } })
      posts.value = page === 1 ? res.data : [...posts.value, ...res.data]
      meta.value = res.meta
    } catch (e) {
      error.value = e
    } finally {
      loading.value = false
    }
  }

  function loadMore() {
    if (hasMore.value && !loading.value) {
      const nextPage = (meta.value?.page ?? 1) + 1
      fetchFeed(nextPage)
    }
  }

  return { posts, meta, loading, error, hasMore, fetchFeed, fetchDiscover, loadMore }
})
