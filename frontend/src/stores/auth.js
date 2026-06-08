import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

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

  return { userId, token, isLoggedIn, setAuthInfo, deleteAuthInfo }
})
