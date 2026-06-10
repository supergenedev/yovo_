import { create } from 'zustand'
import { apiFetch, type PageMeta } from '@/lib/api'

interface VideoState {
  posts: any[]
  meta: PageMeta | null
  loading: boolean
  currentPost: any | null
  postLoading: boolean
  hasMore: () => boolean
  fetchVideoPosts: (page?: number) => Promise<void>
  fetchPost: (id: string | number) => Promise<void>
  likePost: (id: string | number) => Promise<void>
  unlikePost: (id: string | number) => Promise<void>
  bookmarkPost: (id: string | number) => Promise<void>
  unbookmarkPost: (id: string | number) => Promise<void>
  loadMore: () => void
}

export const useVideoStore = create<VideoState>((set, get) => ({
  posts: [],
  meta: null,
  loading: false,
  currentPost: null,
  postLoading: false,

  hasMore: () => get().meta?.next != null,

  async fetchVideoPosts(page = 1) {
    set({ loading: true })
    try {
      const res = await apiFetch('/api/v/feeds/discover', { query: { page } })
      set((s) => ({
        posts: page === 1 ? res.data : [...s.posts, ...res.data],
        meta: res.meta,
      }))
    } catch (e) {
      console.error('fetchVideoPosts error:', e)
    } finally {
      set({ loading: false })
    }
  },

  async fetchPost(id) {
    // 이전 포스트가 잠깐 보이거나 <video>가 백그라운드에서 계속 재생되는 문제 방지:
    // 새 포스트 로드 시작 시 즉시 비운다 (video 엘리먼트 언마운트 유도)
    set({ postLoading: true, currentPost: null })
    try {
      const res = await apiFetch(`/api/v/posts/${id}`)
      set({ currentPost: res.post })
    } catch (e) {
      console.error('fetchPost error:', e)
    } finally {
      set({ postLoading: false })
    }
  },

  async likePost(id) {
    try {
      await apiFetch(`/api/v/posts/${id}/post_likes`, { method: 'POST' })
      const cur = get().currentPost
      if (cur && String(cur.id) === String(id)) {
        set({
          currentPost: {
            ...cur,
            likes_count: (cur.likes_count ?? 0) + 1,
            interaction_with_me: { ...cur.interaction_with_me, liked: true },
          },
        })
      }
    } catch (e) {
      console.error('likePost error:', e)
    }
  },

  async unlikePost(id) {
    try {
      await apiFetch(`/api/v/posts/${id}/post_likes`, { method: 'DELETE' })
      const cur = get().currentPost
      if (cur && String(cur.id) === String(id)) {
        set({
          currentPost: {
            ...cur,
            likes_count: Math.max(0, (cur.likes_count ?? 1) - 1),
            interaction_with_me: { ...cur.interaction_with_me, liked: false },
          },
        })
      }
    } catch (e) {
      console.error('unlikePost error:', e)
    }
  },

  async bookmarkPost(id) {
    try {
      await apiFetch(`/api/v/posts/${id}/bookmarks`, { method: 'POST' })
      const cur = get().currentPost
      if (cur && String(cur.id) === String(id)) {
        set({ currentPost: { ...cur, interaction_with_me: { ...cur.interaction_with_me, bookmarked: true } } })
      }
    } catch (e) {
      console.error('bookmarkPost error:', e)
    }
  },

  async unbookmarkPost(id) {
    try {
      await apiFetch(`/api/v/posts/${id}/bookmarks`, { method: 'DELETE' })
      const cur = get().currentPost
      if (cur && String(cur.id) === String(id)) {
        set({ currentPost: { ...cur, interaction_with_me: { ...cur.interaction_with_me, bookmarked: false } } })
      }
    } catch (e) {
      console.error('unbookmarkPost error:', e)
    }
  },

  loadMore() {
    const { meta, loading, fetchVideoPosts } = get()
    if (meta?.next != null && !loading) {
      fetchVideoPosts((meta.page ?? 1) + 1)
    }
  },
}))
