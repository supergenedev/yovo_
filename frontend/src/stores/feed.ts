import { create } from 'zustand'
import { apiFetch, type PageMeta } from '@/lib/api'

interface FeedState {
  posts: any[]
  meta: PageMeta | null
  loading: boolean
  error: unknown
  hasMore: () => boolean
  fetchFeed: (page?: number) => Promise<void>
  fetchDiscover: (page?: number) => Promise<void>
  loadMore: () => void
}

export const useFeedStore = create<FeedState>((set, get) => ({
  posts: [],
  meta: null,
  loading: false,
  error: null,

  hasMore: () => get().meta?.next != null,

  async fetchFeed(page = 1) {
    set({ loading: true, error: null })
    try {
      const res = await apiFetch('/api/v/feeds', { query: { page } })
      set((s) => ({
        posts: page === 1 ? res.data : [...s.posts, ...res.data],
        meta: res.meta,
      }))
    } catch (e) {
      set({ error: e })
    } finally {
      set({ loading: false })
    }
  },

  async fetchDiscover(page = 1) {
    set({ loading: true, error: null })
    try {
      const res = await apiFetch('/api/v/feeds/discover', { query: { page } })
      set((s) => ({
        posts: page === 1 ? res.data : [...s.posts, ...res.data],
        meta: res.meta,
      }))
    } catch (e) {
      set({ error: e })
    } finally {
      set({ loading: false })
    }
  },

  loadMore() {
    const { meta, loading, fetchFeed } = get()
    if (meta?.next != null && !loading) {
      fetchFeed((meta.page ?? 1) + 1)
    }
  },
}))
