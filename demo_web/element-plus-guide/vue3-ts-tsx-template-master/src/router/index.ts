import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/library/layout/index'

export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () =>
          import(/* webpackChunkName: "dashboard" */ '@/views/Home'),
        name: 'Dashboard',
        meta: { title: '首页概况', icon: 'dashboard', affix: true },
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "login" */ '@/views/login/Index'),
  },
]

export const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: '/goods-pricing',
    component: Layout,
    name: 'GoodsPricing',
    meta: {
      title: '商品核价',
      icon: 'lock',
    },
    children: [
      {
        path: 'goods-live',
        component: () =>
          import(/* webpackChunkName: "goodsLive" */ '@/views/Test2'),
        name: 'goodsLive',
        meta: { title: '直播列表', icon: 'dashboard', affix: false },
      },
      {
        path: 'goods-list',
        component: () =>
          import(/* webpackChunkName: "goodsList" */ '@/views/Test'),
        name: 'goodsList',
        meta: { title: '商品列表', icon: 'dashboard', affix: false },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
})

export default router
