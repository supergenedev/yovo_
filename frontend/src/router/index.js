import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('@/views/MainView.vue') },
  { path: '/home', component: () => import('@/views/HomeView.vue') },
  { path: '/video', component: () => import('@/views/VideoMainView.vue') },
  { path: '/video/:id', component: () => import('@/views/VideoView.vue') },
  { path: '/creator', component: () => import('@/views/CreatorView.vue') },
  { path: '/library', component: () => import('@/views/LibraryView.vue') },
  { path: '/notification', component: () => import('@/views/NotificationView.vue') },
  { path: '/create', component: () => import('@/views/CreateView.vue') },
  { path: '/guide/2col', component: () => import('@/views/guide/TwoColumnView.vue') },
  { path: '/guide/3col', component: () => import('@/views/guide/ThreeColumnView.vue') },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
