import { ofetch, type FetchOptions } from 'ofetch'
import { useAuthStore } from '@/stores/auth'

// 기본은 같은 오리진(상대 경로) — dev는 vite 프록시, 운영은 nginx가 /api·/rails를
// backend로 중계한다. 별도 API 도메인을 쓸 때만 VITE_API_BASE_URL을 지정.
const baseURL = import.meta.env.VITE_API_BASE_URL ?? ''

// Rails API 클라이언트. JWT는 auth 스토어에서 읽어 Bearer 헤더로 전달하고,
// 401 응답이면 토큰을 폐기한다 (라우터 가드가 /auth로 보냄).
// 호출자가 넘긴 headers는 기본 헤더와 병합된다 (이전엔 통째로 대체되던 버그).
export async function apiFetch<T = any>(url: string, options: FetchOptions<'json'> = {}): Promise<T> {
  const { token, clearAuth } = useAuthStore.getState()

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(options.headers as Record<string, string> | undefined),
  }
  if (token) headers.Authorization = `Bearer ${token}`

  return ofetch<T>(url, {
    baseURL,
    ...options,
    headers,
    onResponseError({ response }) {
      if (response.status === 401) {
        clearAuth()
      }
    },
  })
}

// FormData 업로드용: Content-Type을 지정하지 않아 브라우저가 boundary를 채우게 한다.
export async function apiFormFetch<T = any>(url: string, options: FetchOptions<'json'> = {}): Promise<T> {
  const { token, clearAuth } = useAuthStore.getState()

  const headers: Record<string, string> = {
    Accept: 'application/json',
    ...(options.headers as Record<string, string> | undefined),
  }
  if (token) headers.Authorization = `Bearer ${token}`

  return ofetch<T>(url, {
    baseURL,
    ...options,
    headers,
    onResponseError({ response }) {
      if (response.status === 401) {
        clearAuth()
      }
    },
  })
}

// 페이지네이션 메타 (백엔드 render_with_pagy 형식)
export interface PageMeta {
  page: number
  next: number | null
  [key: string]: unknown
}
