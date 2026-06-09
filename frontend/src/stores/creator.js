import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { apiFetch } from '@/utils/api/apiFetch'

export const useCreatorStore = defineStore('creator', () => {
  const currentCreator = ref(null)
  const posts = ref([])
  const recommended = ref([])
  const discover = ref([])
  const postsMeta = ref(null)
  const discoverMeta = ref(null)

  // 작업별 로딩 플래그 (단일 플래그 경쟁 조건 방지)
  const creatorLoading = ref(false)
  const postsLoading = ref(false)
  const listLoading = ref(false)

  const hasMorePosts = computed(() => postsMeta.value?.next != null)
  const hasMoreDiscover = computed(() => discoverMeta.value?.next != null)

  async function fetchCreatorUser(id) {
    creatorLoading.value = true
    try {
      const res = await apiFetch(`/api/v/creator_users/${id}`)
      currentCreator.value = res.creator_user
    } catch (e) {
      console.error('fetchCreatorUser error:', e)
    } finally {
      creatorLoading.value = false
    }
  }

  async function fetchCreatorPosts(id, page = 1) {
    postsLoading.value = true
    try {
      const res = await apiFetch(`/api/v/creator_users/${id}/posts`, { query: { page } })
      posts.value = page === 1 ? res.data : [...posts.value, ...res.data]
      postsMeta.value = res.meta
    } catch (e) {
      console.error('fetchCreatorPosts error:', e)
    } finally {
      postsLoading.value = false
    }
  }

  async function fetchRecommended() {
    listLoading.value = true
    try {
      const res = await apiFetch('/api/v/creator_users/recommend')
      recommended.value = res.creator_users ?? []
    } catch (e) {
      console.error('fetchRecommended error:', e)
    } finally {
      listLoading.value = false
    }
  }

  async function fetchDiscover(page = 1) {
    listLoading.value = true
    try {
      const res = await apiFetch('/api/v/creator_users/discover', { query: { page } })
      // discover는 페이지네이션 없이 배열 반환 (render_with_pagy 미사용)
      discover.value = res.creator_users ?? []
    } catch (e) {
      console.error('fetchDiscover error:', e)
    } finally {
      listLoading.value = false
    }
  }

  async function search(query) {
    listLoading.value = true
    try {
      const res = await apiFetch('/api/v/creator_users/search', { query: { query } })
      discover.value = res.creator_users ?? []
    } catch (e) {
      console.error('search error:', e)
    } finally {
      listLoading.value = false
    }
  }

  return {
    currentCreator, posts, recommended, discover,
    postsMeta, discoverMeta,
    creatorLoading, postsLoading, listLoading,
    hasMorePosts, hasMoreDiscover,
    fetchCreatorUser, fetchCreatorPosts, fetchRecommended, fetchDiscover, search,
  }
})
