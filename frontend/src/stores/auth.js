import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { apiFetch } from '@/utils/api/apiFetch'

export const useAuthStore = defineStore('auth', () => {
  const userId = ref(null)
  const token = ref(localStorage.getItem('auth_token'))

  function setAuthInfo({ id, token: t }) {
    userId.value = id
    token.value = t
    localStorage.setItem('auth_token', t)
  }

  function deleteAuthInfo() {
    userId.value = null
    token.value = null
    localStorage.removeItem('auth_token')
  }

  const isLoggedIn = computed(() => !!token.value)

  async function login(email, password) {
    const res = await apiFetch('/api/v/users/sign_in', {
      method: 'POST',
      body: { user: { email, password } },
    })
    setAuthInfo({ id: res.id, token: res.token })
    return res
  }

  async function signup(email, password, nickname) {
    const res = await apiFetch('/api/v/users/sign_up', {
      method: 'POST',
      body: { user: { email, password, nickname } },
    })
    setAuthInfo({ id: res.id, token: res.token })
    return res
  }

  async function logout() {
    await apiFetch('/api/v/users/sign_out', { method: 'DELETE' }).catch(() => {})
    deleteAuthInfo()
  }

  return { userId, token, isLoggedIn, setAuthInfo, deleteAuthInfo, login, signup, logout }
})
