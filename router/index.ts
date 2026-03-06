import type { RouteRecordRaw } from 'vue-router'

const themeRoutes: RouteRecordRaw[] = [
  {
    path: '/admin/theme',
    name: 'themes',
    component: () => import('../views/ThemeIndex.vue'),
    meta: { requiresAuth: true },
  },
]

export default themeRoutes

