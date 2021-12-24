import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    redirect: '/recommend' // 重定向
  },
  {
    path: '/recommend',
    name: 'recommend',
    component: () => import(/* webpackChunkName: "recommend" */ '@/views/Recommend/index'),
    children: [{
      path: ':id',
      name: 'recommend-detail',
      component: () => import(/* webpackChunkName: "recommend-detail" */ '@/views/Recommend/components/recommend-detail')
    }]
  },
  {
    path: '/singer',
    name: 'singer',
    component: () => import(/* webpackChunkName: "singer" */ '@/views/Singer/index'),
    children: [{
      path: ':id',
      name: 'singer-detail',
      component: () => import(/* webpackChunkName: "singer-detail" */ '@/views/Singer/components/singer-detail')
    }]
  },
  {
    path: '/rank',
    name: 'rank',
    component: () => import(/* webpackChunkName: "rank" */ '@/views/Rank/index'),
    children: [{
      path: ':id',
      name: 'rank-detail',
      component: () => import(/* webpackChunkName: "rank-detail" */ '@/views/Rank/components/rank-detail')
    }]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import(/* webpackChunkName: "search" */ '@/views/Search/index'),
    children: [{
      path: ':id',
      name: 'search-detail',
      component: () => import(/* webpackChunkName: "search-detail" */ '@/views/Singer/components/singer-detail')
    }]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
