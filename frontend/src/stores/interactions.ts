import { create } from 'zustand'
import { apiFetch } from '@/lib/api'

interface InteractionsState {
  likedPostIds: Set<string>
  bookmarkedPostIds: Set<string>
  initFromPosts: (posts: any[]) => void
  toggleLike: (postId: string | number) => Promise<void>
  toggleBookmark: (postId: string | number) => Promise<void>
  isLiked: (postId: string | number) => boolean
  isBookmarked: (postId: string | number) => boolean
}

export const useInteractionsStore = create<InteractionsState>((set, get) => ({
  likedPostIds: new Set<string>(),
  bookmarkedPostIds: new Set<string>(),

  initFromPosts(posts) {
    set((s) => {
      const liked = new Set(s.likedPostIds)
      const bookmarked = new Set(s.bookmarkedPostIds)
      posts.forEach((post) => {
        const id = String(post.id)
        if (post.interaction_with_me?.liked) liked.add(id)
        else liked.delete(id)
        if (post.interaction_with_me?.bookmarked) bookmarked.add(id)
        else bookmarked.delete(id)
      })
      return { likedPostIds: liked, bookmarkedPostIds: bookmarked }
    })
  },

  async toggleLike(postId) {
    const id = String(postId)
    const wasLiked = get().likedPostIds.has(id)
    const apply = (liked: boolean) =>
      set((s) => {
        const next = new Set(s.likedPostIds)
        if (liked) next.add(id)
        else next.delete(id)
        return { likedPostIds: next }
      })
    apply(!wasLiked) // 낙관적 업데이트
    try {
      await apiFetch(`/api/v/posts/${postId}/post_likes`, { method: wasLiked ? 'DELETE' : 'POST' })
    } catch {
      apply(wasLiked) // 실패 시 롤백
    }
  },

  async toggleBookmark(postId) {
    const id = String(postId)
    const wasBookmarked = get().bookmarkedPostIds.has(id)
    const apply = (bookmarked: boolean) =>
      set((s) => {
        const next = new Set(s.bookmarkedPostIds)
        if (bookmarked) next.add(id)
        else next.delete(id)
        return { bookmarkedPostIds: next }
      })
    apply(!wasBookmarked)
    try {
      await apiFetch(`/api/v/posts/${postId}/bookmarks`, { method: wasBookmarked ? 'DELETE' : 'POST' })
    } catch {
      apply(wasBookmarked)
    }
  },

  isLiked: (postId) => get().likedPostIds.has(String(postId)),
  isBookmarked: (postId) => get().bookmarkedPostIds.has(String(postId)),
}))
