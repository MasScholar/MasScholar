import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'base',
      component: () => import('../views/LaunchView.vue'),
    },
    {
      path: '/launch',
      name: 'launch',
      component: () => import('../views/LaunchView.vue'),
    },
    {
      path: '/quick-start',
      name: 'quick-start',
      component: () => import('../views/QuickStartView.vue'),
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/SettingView.vue'),
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('../views/ProjectView.vue'),
    },
    {
      path: '/learn-explore',
      name: 'learn-explore',
      component: () => import('../views/LearnExploreView.vue'),
    },
    {
      path: '/create-project',
      name: 'create-project',
      component: () => import('../views/CreateProjectView.vue'),
    }
  ],
})

export default router
