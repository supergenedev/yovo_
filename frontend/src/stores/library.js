import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { apiFetch } from '@/utils/api/apiFetch'

export const useLibraryStore = defineStore('library', () => {
  const bookmarks = ref([])
  const bookmarksMeta = ref(null)
  const purchased = ref([])
  const purchasedMeta = ref(null)
  const loading = ref(false)

  const hasMore = computed(() => bookmarksMeta.value?.next != null)
  const hasPurchasedMore = computed(() => purchasedMeta.value?.next != null)

  async function fetchBookmarks(page = 1) {
    loading.value = true
    try {
      const res = await apiFetch('/api/v/me/posts', { query: { filter: 'saved', page } })
      bookmarks.value = page === 1 ? res.data : [...bookmarks.value, ...res.data]
      bookmarksMeta.value = res.meta
    } catch (e) {
      console.error('fetchBookmarks error:', e)
    } finally {
      loading.value = false
    }
  }

  async function fetchPurchased(page = 1) {
    loading.value = true
    try {
      const res = await apiFetch('/api/v/me/posts', { query: { filter: 'purchased', page } })
      purchased.value = page === 1 ? res.data : [...purchased.value, ...res.data]
      purchasedMeta.value = res.meta
    } catch (e) {
      console.error('fetchPurchased error:', e)
    } finally {
      loading.value = false
    }
  }

  function loadMore() {
    if (hasMore.value && !loading.value) {
      fetchBookmarks((bookmarksMeta.value?.page ?? 1) + 1)
    }
  }

  return { bookmarks, bookmarksMeta, purchased, purchasedMeta, loading, hasMore, hasPurchasedMore, fetchBookmarks, fetchPurchased, loadMore }
})
