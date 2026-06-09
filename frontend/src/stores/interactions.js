import { defineStore } from 'pinia'
import { ref } from 'vue'
import { apiFetch } from '@/utils/api/apiFetch'

export const useInteractionsStore = defineStore('interactions', () => {
  const likedPostIds = ref(new Set())
  const bookmarkedPostIds = ref(new Set())

  function initFromPosts(posts) {
    posts.forEach((post) => {
      const id = String(post.id)
      if (post.interaction_with_me?.liked) likedPostIds.value.add(id)
      else likedPostIds.value.delete(id)

      if (post.interaction_with_me?.bookmarked) bookmarkedPostIds.value.add(id)
      else bookmarkedPostIds.value.delete(id)
    })
  }

  async function toggleLike(postId) {
    const id = String(postId)
    const wasLiked = likedPostIds.value.has(id)
    // Optimistic update
    if (wasLiked) {
      likedPostIds.value.delete(id)
    } else {
      likedPostIds.value.add(id)
    }
    try {
      if (wasLiked) {
        await apiFetch(`/api/v/posts/${postId}/post_likes`, { method: 'DELETE' })
      } else {
        await apiFetch(`/api/v/posts/${postId}/post_likes`, { method: 'POST' })
      }
    } catch {
      // Revert on error
      if (wasLiked) {
        likedPostIds.value.add(id)
      } else {
        likedPostIds.value.delete(id)
      }
    }
  }

  async function toggleBookmark(postId) {
    const id = String(postId)
    const wasBookmarked = bookmarkedPostIds.value.has(id)
    // Optimistic update
    if (wasBookmarked) {
      bookmarkedPostIds.value.delete(id)
    } else {
      bookmarkedPostIds.value.add(id)
    }
    try {
      if (wasBookmarked) {
        await apiFetch(`/api/v/posts/${postId}/bookmarks`, { method: 'DELETE' })
      } else {
        await apiFetch(`/api/v/posts/${postId}/bookmarks`, { method: 'POST' })
      }
    } catch {
      // Revert on error
      if (wasBookmarked) {
        bookmarkedPostIds.value.add(id)
      } else {
        bookmarkedPostIds.value.delete(id)
      }
    }
  }

  function isLiked(postId) {
    return likedPostIds.value.has(String(postId))
  }

  function isBookmarked(postId) {
    return bookmarkedPostIds.value.has(String(postId))
  }

  return {
    likedPostIds,
    bookmarkedPostIds,
    initFromPosts,
    toggleLike,
    toggleBookmark,
    isLiked,
    isBookmarked,
  }
})
