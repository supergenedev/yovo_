import { create } from 'zustand'
import { apiFetch, apiFormFetch } from '@/lib/api'

interface MeState {
  user: any | null
  following: any[]
  coin: number | null
  loading: boolean
  fetchMe: () => Promise<void>
  fetchFollowing: () => Promise<void>
  fetchCoin: () => Promise<void>
  updateMe: (params: { nickname?: string; username?: string; introduction?: string }) => Promise<any>
  uploadProfileImage: (file: File) => Promise<any>
  applyCreator: () => Promise<any>
}

export const useMeStore = create<MeState>((set) => ({
  user: null,
  following: [],
  coin: null,
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

  async fetchCoin() {
    try {
      const res = await apiFetch('/api/v/me/coin')
      set({ coin: res.user_coin?.coin ?? 0 })
    } catch (e) {
      console.error('fetchCoin error:', e)
    }
  },

  async updateMe(params) {
    const res = await apiFetch('/api/v/me', { method: 'PATCH', body: params })
    set({ user: res.user })
    return res
  },

  async uploadProfileImage(file) {
    const form = new FormData()
    form.append('profile_image', file)
    const res = await apiFormFetch('/api/v/me', { method: 'PATCH', body: form })
    set({ user: res.user })
    return res
  },

  async applyCreator() {
    const res = await apiFetch('/api/v/me/apply_creator', { method: 'POST' })
    // 신청 직후 user.creator_user 상태 갱신
    const me = await apiFetch('/api/v/me')
    set({ user: me.user })
    return res
  },
}))
