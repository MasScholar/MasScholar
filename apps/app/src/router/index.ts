import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'base',
      redirect: '/launch',
    },
    {
      path: '/launch',
      name: 'launch',
      component: () => import('../views/LaunchView.vue'),
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
      path: '/learnexplore',
      name: 'learnexplore',
      component: () => import('../views/LearnExplore.vue'),
    }
  ],
})

export default router
