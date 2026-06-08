import { ofetch } from 'ofetch'
import { useAuthStore } from '@/stores/auth'

async function apiFetch(url, options = {}) {
  const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
  const authStore = useAuthStore()

  const headers = options.headers ?? {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }

  if (authStore.token) {
    Object.assign(headers, { Authorization: `Bearer ${authStore.token}` })
  }

  const fetch = ofetch.create({
    baseURL,
    headers,
    onResponseError({ response }) {
      if (response.status === 401) {
        authStore.deleteAuthInfo()
      }
    },
  })

  return fetch(url, options)
}

async function apiFormFetch(url, options = {}) {
  return apiFetch(url, { ...options, headers: {} })
}

export { apiFetch, apiFormFetch }
