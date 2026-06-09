import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { apiFetch } from '@/utils/api/apiFetch'

export const useVideoStore = defineStore('video', () => {
  const posts = ref([])
  const meta = ref(null)
  const loading = ref(false)
  const currentPost = ref(null)
  const postLoading = ref(false)

  const hasMore = computed(() => meta.value?.next != null)

  async function fetchVideoPosts(page = 1) {
    loading.value = true
    try {
      const res = await apiFetch('/api/v/feeds/discover', { query: { page } })
      posts.value = page === 1 ? res.data : [...posts.value, ...res.data]
      meta.value = res.meta
    } catch (e) {
      console.error('fetchVideoPosts error:', e)
    } finally {
      loading.value = false
    }
  }

  async function fetchPost(id) {
    postLoading.value = true
    try {
      const res = await apiFetch(`/api/v/posts/${id}`)
      currentPost.value = res.post
    } catch (e) {
      console.error('fetchPost error:', e)
    } finally {
      postLoading.value = false
    }
  }

  async function likePost(id) {
    try {
      await apiFetch(`/api/v/posts/${id}/post_likes`, { method: 'POST' })
      if (currentPost.value && String(currentPost.value.id) === String(id)) {
        currentPost.value = { ...currentPost.value, likes_count: (currentPost.value.likes_count ?? 0) + 1, interaction_with_me: { ...currentPost.value.interaction_with_me, liked: true } }
      }
    } catch (e) { console.error('likePost error:', e) }
  }

  async function unlikePost(id) {
    try {
      await apiFetch(`/api/v/posts/${id}/post_likes`, { method: 'DELETE' })
      if (currentPost.value && String(currentPost.value.id) === String(id)) {
        currentPost.value = { ...currentPost.value, likes_count: Math.max(0, (currentPost.value.likes_count ?? 1) - 1), interaction_with_me: { ...currentPost.value.interaction_with_me, liked: false } }
      }
    } catch (e) { console.error('unlikePost error:', e) }
  }

  async function bookmarkPost(id) {
    try {
      await apiFetch(`/api/v/posts/${id}/bookmarks`, { method: 'POST' })
      if (currentPost.value && String(currentPost.value.id) === String(id)) {
        currentPost.value = { ...currentPost.value, interaction_with_me: { ...currentPost.value.interaction_with_me, bookmarked: true } }
      }
    } catch (e) { console.error('bookmarkPost error:', e) }
  }

  async function unbookmarkPost(id) {
    try {
      await apiFetch(`/api/v/posts/${id}/bookmarks`, { method: 'DELETE' })
      if (currentPost.value && String(currentPost.value.id) === String(id)) {
        currentPost.value = { ...currentPost.value, interaction_with_me: { ...currentPost.value.interaction_with_me, bookmarked: false } }
      }
    } catch (e) { console.error('unbookmarkPost error:', e) }
  }

  function loadMore() {
    if (hasMore.value && !loading.value) {
      const nextPage = (meta.value?.page ?? 1) + 1
      fetchVideoPosts(nextPage)
    }
  }

  return { posts, meta, loading, hasMore, currentPost, postLoading, fetchVideoPosts, loadMore, fetchPost, likePost, unlikePost, bookmarkPost, unbookmarkPost }
})
