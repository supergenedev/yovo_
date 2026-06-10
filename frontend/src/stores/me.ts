import { create } from 'zustand'
import { apiFetch } from '@/lib/api'

interface MeState {
  user: any | null
  following: any[]
  loading: boolean
  fetchMe: () => Promise<void>
  fetchFollowing: () => Promise<void>
}

export const useMeStore = create<MeState>((set) => ({
  user: null,
  following: [],
  loading: false,

  async fetchMe() {
    set({ loading: true })
    try {
      const res = await apiFetch('/api/v/me')
      set({ user: res.user })
    } catch (e) {
      console.error('fetchMe error:', e)
    } finally {
      set({ loading: false })
    }
  },

  async fetchFollowing() {
    try {
      const res = await apiFetch('/api/v/follows/following')
      set({ following: res.creator_users ?? [] })
    } catch (e) {
      console.error('fetchFollowing error:', e)
    }
  },
}))
