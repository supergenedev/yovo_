import { create } from 'zustand'
import { apiFormFetch } from '@/lib/api'

// 크리에이터(스튜디오) 전용 스토어. 포스트 업로드는 미디어 첨부가 있어
// multipart/form-data(apiFormFetch)로 보낸다.
export interface CreatePostInput {
  title_ko: string
  body_ko?: string
  content_type: 'text' | 'image' | 'video' | 'episode'
  view_type: 'everyone' | 'subscriber_only' | 'buyer_only'
  content_price?: number
  status?: 'draft' | 'published'
  media?: File[]
}

interface StudioState {
  submitting: boolean
  createPost: (input: CreatePostInput) => Promise<any>
}

export const useStudioStore = create<StudioState>((set) => ({
  submitting: false,

  async createPost(input) {
    set({ submitting: true })
    try {
      const form = new FormData()
      form.append('title_ko', input.title_ko)
      if (input.body_ko) form.append('body_ko', input.body_ko)
      form.append('content_type', input.content_type)
      form.append('view_type', input.view_type)
      form.append('status', input.status ?? 'published')
      if (input.view_type === 'buyer_only' && input.content_price != null) {
        form.append('content_price', String(input.content_price))
      }
      for (const file of input.media ?? []) {
        form.append('media[]', file)
      }
      const res = await apiFormFetch('/api/studio/posts', { method: 'POST', body: form })
      return res
    } finally {
      set({ submitting: false })
    }
  },
}))
