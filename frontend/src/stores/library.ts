import { create } from 'zustand'
import { apiFetch, type PageMeta } from '@/lib/api'

interface LibraryState {
  bookmarks: any[]
  bookmarksMeta: PageMeta | null
  purchased: any[]
  purchasedMeta: PageMeta | null
  loading: boolean
  hasMore: () => boolean
  hasPurchasedMore: () => boolean
  fetchBookmarks: (page?: number) => Promise<void>
  fetchPurchased: (page?: number) => Promise<void>
  loadMore: () => void
}

export const useLibraryStore = create<LibraryState>((set, get) => ({
  bookmarks: [],
  bookmarksMeta: null,
  purchased: [],
  purchasedMeta: null,
  loading: false,

  hasMore: () => get().bookmarksMeta?.next != null,
  hasPurchasedMore: () => get().purchasedMeta?.next != null,

  async fetchBookmarks(page = 1) {
    set({ loading: true })
    try {
      const res = await apiFetch('/api/v/me/posts', { query: { filter: 'saved', page } })
      set((s) => ({
        bookmarks: page === 1 ? res.data : [...s.bookmarks, ...res.data],
        bookmarksMeta: res.meta,
      }))
    } catch (e) {
      console.error('fetchBookmarks error:', e)
    } finally {
      set({ loading: false })
    }
  },

  async fetchPurchased(page = 1) {
    set({ loading: true })
    try {
      const res = await apiFetch('/api/v/me/posts', { query: { filter: 'purchased', page } })
      set((s) => ({
        purchased: page === 1 ? res.data : [...s.purchased, ...res.data],
        purchasedMeta: res.meta,
      }))
    } catch (e) {
      console.error('fetchPurchased error:', e)
    } finally {
      set({ loading: false })
    }
  },

  loadMore() {
    const { bookmarksMeta, loading, fetchBookmarks } = get()
    if (bookmarksMeta?.next != null && !loading) {
      fetchBookmarks((bookmarksMeta.page ?? 1) + 1)
    }
  },
}))
