import { create } from 'zustand'
import { apiFetch } from '@/lib/api'

interface AuthState {
  userId: string | null
  token: string | null
  setAuth: (info: { id: string; token: string }) => void
  clearAuth: () => void
  login: (email: string, password: string) => Promise<any>
  signup: (email: string, password: string, nickname: string) => Promise<any>
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set, get) => ({
  // 새로고침 후에도 DM 발신자 판별 등이 동작하도록 userId도 영속화한다
  userId: localStorage.getItem('auth_user_id'),
  token: localStorage.getItem('auth_token'),

  setAuth({ id, token }) {
    localStorage.setItem('auth_token', token)
    localStorage.setItem('auth_user_id', String(id))
    set({ userId: String(id), token })
  },

  clearAuth() {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user_id')
    set({ userId: null, token: null })
  },

  async login(email, password) {
    const res = await apiFetch('/api/v/users/sign_in', {
      method: 'POST',
      body: { user: { email, password } },
    })
    get().setAuth({ id: res.user.id, token: res.user.access_token })
    return res
  },

  async signup(email, password, nickname) {
    const res = await apiFetch('/api/v/users/sign_up', {
      method: 'POST',
      body: { user: { email, password, nickname } },
    })
    get().setAuth({ id: res.user.id, token: res.user.access_token })
    return res
  },

  async logout() {
    await apiFetch('/api/v/users/sign_out', { method: 'DELETE' }).catch(() => {})
    get().clearAuth()
  },
}))
