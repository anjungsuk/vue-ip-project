import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: HomeView,
    children: [
      {
        path: '/notice',
        // component: NoticeList,
        component: () => import('../views/notice/NoticeList.vue'),
      },
      {
        path: '/noticeRegistration',
        // component: NoticeList,
        component: () => import('../views/notice/NoticeRegistration.vue'),
      },
      {
        path: '/noticeDetail/:id',
        // component: NoticeList,
        component: () => import('../views/notice/NoticeListDetail.vue'),
      },
    ],
  },
  {
    path: '/about',
    component: () => import('../views/AboutView.vue'),
  },
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
