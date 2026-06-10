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
    // 탭 전환 시 이전 탭 포스트가 잠깐 보였다가 교체되는 '따닥' 현상 방지:
    // 1페이지 로드는 목록을 즉시 비우고 로딩 상태로 전환한다
    set({ loading: true, error: null, ...(page === 1 ? { posts: [], meta: null } : {}) })
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
    set({ loading: true, error: null, ...(page === 1 ? { posts: [], meta: null } : {}) })
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
