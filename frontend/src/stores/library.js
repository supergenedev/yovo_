import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { apiFetch } from '@/utils/api/apiFetch'

export const useLibraryStore = defineStore('library', () => {
  const bookmarks = ref([])
  const meta = ref(null)
  const loading = ref(false)

  const hasMore = computed(() => meta.value?.next != null)

  // TODO: /api/v/me/bookmarks 엔드포인트 생성 시 교체
  async function fetchBookmarks(page = 1) {
    loading.value = true
    try {
      const res = await apiFetch('/api/v/feeds/discover', { query: { page } })
      bookmarks.value = page === 1 ? res.data : [...bookmarks.value, ...res.data]
      meta.value = res.meta
    } catch (e) {
      console.error('fetchBookmarks error:', e)
    } finally {
      loading.value = false
    }
  }

  function loadMore() {
    if (hasMore.value && !loading.value) {
      const nextPage = (meta.value?.page ?? 1) + 1
      fetchBookmarks(nextPage)
    }
  }

  return { bookmarks, meta, loading, hasMore, fetchBookmarks, loadMore }
})
