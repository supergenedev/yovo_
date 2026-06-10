import { ofetch, type FetchOptions } from 'ofetch'
import { useAuthStore } from '@/stores/auth'

// Rails API 클라이언트. JWT는 auth 스토어에서 읽어 Bearer 헤더로 전달하고,
// 401 응답이면 토큰을 폐기한다 (라우터 가드가 /auth로 보냄).
export async function apiFetch<T = any>(url: string, options: FetchOptions<'json'> = {}): Promise<T> {
  const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
  const { token, clearAuth } = useAuthStore.getState()

  const headers: Record<string, string> = (options.headers as Record<string, string>) ?? {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }
  if (token) headers.Authorization = `Bearer ${token}`

  const fetch = ofetch.create({
    baseURL,
    headers,
    onResponseError({ response }) {
      if (response.status === 401) {
        clearAuth()
      }
    },
  })

  return fetch<T>(url, options)
}

export async function apiFormFetch<T = any>(url: string, options: FetchOptions<'json'> = {}): Promise<T> {
  return apiFetch<T>(url, { ...options, headers: {} })
}

// 페이지네이션 메타 (백엔드 render_with_pagy 형식)
export interface PageMeta {
  page: number
  next: number | null
  [key: string]: unknown
}
