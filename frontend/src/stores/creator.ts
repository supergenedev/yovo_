import { create } from 'zustand'
import { apiFetch, type PageMeta } from '@/lib/api'

interface CreatorState {
  currentCreator: any | null
  posts: any[]
  recommended: any[]
  discover: any[]
  postsMeta: PageMeta | null
  discoverMeta: PageMeta | null
  // 작업별 로딩 플래그 (단일 플래그 경쟁 조건 방지)
  creatorLoading: boolean
  postsLoading: boolean
  listLoading: boolean
  hasMorePosts: () => boolean
  fetchCreatorUser: (id: string | number) => Promise<void>
  fetchCreatorPosts: (id: string | number, page?: number) => Promise<void>
  fetchRecommended: () => Promise<void>
  fetchDiscover: (page?: number) => Promise<void>
  search: (query: string) => Promise<void>
  follow: (creatorId: string | number) => Promise<any>
  unfollow: (followId: string | number, creatorId: string | number) => Promise<void>
}

export const useCreatorStore = create<CreatorState>((set, get) => ({
  currentCreator: null,
  posts: [],
  recommended: [],
  discover: [],
  postsMeta: null,
  discoverMeta: null,
  creatorLoading: false,
  postsLoading: false,
  listLoading: false,

  hasMorePosts: () => get().postsMeta?.next != null,

  async fetchCreatorUser(id) {
    // 프로필 간 이동 시 이전 크리에이터가 잠깐 표시되는 문제 방지
    set({ creatorLoading: true, currentCreator: null })
    try {
      const res = await apiFetch(`/api/v/creator_users/${id}`)
      set({ currentCreator: res.creator_user })
    } catch (e) {
      console.error('fetchCreatorUser error:', e)
    } finally {
      set({ creatorLoading: false })
    }
  },

  async fetchCreatorPosts(id, page = 1) {
    if (page === 1) set({ posts: [], postsMeta: null })
    set({ postsLoading: true })
    try {
      const res = await apiFetch(`/api/v/creator_users/${id}/posts`, { query: { page } })
      set((s) => ({
        posts: page === 1 ? res.data : [...s.posts, ...res.data],
        postsMeta: res.meta,
      }))
    } catch (e) {
      console.error('fetchCreatorPosts error:', e)
    } finally {
      set({ postsLoading: false })
    }
  },

  async fetchRecommended() {
    set({ listLoading: true })
    try {
      const res = await apiFetch('/api/v/creator_users/recommend')
      set({ recommended: res.creator_users ?? [] })
    } catch (e) {
      console.error('fetchRecommended error:', e)
    } finally {
      set({ listLoading: false })
    }
  },

  async fetchDiscover(page = 1) {
    set({ listLoading: true })
    try {
      // discover는 페이지네이션 없이 배열 반환 (render_with_pagy 미사용)
      const res = await apiFetch('/api/v/creator_users/discover', { query: { page } })
      set({ discover: res.creator_users ?? [] })
    } catch (e) {
      console.error('fetchDiscover error:', e)
    } finally {
      set({ listLoading: false })
    }
  },

  async search(query) {
    set({ listLoading: true })
    try {
      const res = await apiFetch('/api/v/creator_users/search', { query: { query } })
      set({ discover: res.creator_users ?? [] })
    } catch (e) {
      console.error('search error:', e)
    } finally {
      set({ listLoading: false })
    }
  },

  async follow(creatorId) {
    try {
      const res = await apiFetch('/api/v/follows', {
        method: 'POST',
        body: { creator_user_id: creatorId },
      })
      set((s) => ({
        // 추천 목록은 팔로우한 크리에이터를 제외하므로 즉시 제거
        recommended: s.recommended.filter((c) => String(c.id) !== String(creatorId)),
        discover: s.discover.map((c) =>
          String(c.id) === String(creatorId)
            ? { ...c, interaction_with_me: { ...c.interaction_with_me, is_following: true } }
            : c,
        ),
      }))
      return res
    } catch (e) {
      console.error('follow error:', e)
    }
  },

  async unfollow(followId, creatorId) {
    try {
      await apiFetch(`/api/v/follows/${followId}`, { method: 'DELETE' })
      set((s) => ({
        discover: s.discover.map((c) =>
          String(c.id) === String(creatorId)
            ? { ...c, interaction_with_me: { ...c.interaction_with_me, is_following: false } }
            : c,
        ),
      }))
    } catch (e) {
      console.error('unfollow error:', e)
    }
  },
}))
