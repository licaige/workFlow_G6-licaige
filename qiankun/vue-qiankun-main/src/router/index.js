/*
 * @Descripttion:
 * @version:
 * @Author: chunwen
 * @Date: 2021-11-09 22:36:47
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-28 15:14:17
 */
import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

import routerView from '@/layout/router-view.vue'

const routes = [
  {
    path: '/home',
    name: 'Home',
    meta: { title: '首页', icon: 'icon-Mechanical_lock' },
    component: () => import(/* webpackChunkName: "about" */ '@/views/Home.vue'),
  },
  {
    path: '/about',
    name: 'About',
    meta: { title: '关于', icon: 'icon-Intelligent_lock' },
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
  },
  {
    path: '/directive',
    component: routerView,
    redirect: '/directive/copy',
    meta: { title: '指令集合', icon: 'icon-door' },
    children: [
      {
        path: 'dragable',
        name: 'dragable',
        component: () => import('@/views/directive/dragable.vue'),
        meta: { title: '拖拽', icon: 'icon-wall-11' },
      },
      {
        path: 'copy',
        name: 'copy',
        component: () => import('@/views/directive/copy.vue'),
        meta: { title: '复制', icon: 'icon-electric' },
      },
      {
        path: 'waterMarker',
        name: 'waterMarker',
        component: () => import('@/views/directive/waterMarker.vue'),
        meta: { title: '水印', icon: 'icon-Washstand' },
      },
      {
        path: 'longpress',
        name: 'longpress',
        component: () => import('@/views/directive/longpress.vue'),
        meta: { title: '长按', icon: 'icon-Scenery' },
      },
      {
        path: 'debounce',
        name: 'debounce',
        component: () => import('@/views/directive/debounce.vue'),
        meta: { title: '防抖', icon: 'icon-window' },
      },
      {
        path: 'scroll',
        name: 'scroll',
        component: () => import('@/views/directive/infiniteScroll.vue'),
        meta: { title: '无限滚动', icon: 'icon-Video_room' },
      },
      {
        path: 'clickOutside',
        name: 'clickOutside',
        component: () => import('@/views/directive/clickOutside.vue'),
        meta: { title: '点外', icon: 'icon-paint' },
      },
    ],
  },
  {
    path: '/:micro(micro_vue|micro_react):endPath(.*)',
    name: 'MicroApp',
    meta: { title: '微前端应用' },
    component: () => import('@/micro/MicroApp.vue'),
  },
  {
    path: '/',
    redirect: '/home',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  next()
})

router.afterEach((to) => {
  const keepAliveComponentsName = store.getters['keepAlive/keepAliveComponentsName'] || []
  const { name } = to.matched[to.matched.length - 1].components.default
  if (to.meta && to.meta.cache && name && !keepAliveComponentsName.includes(name)) {
    store.commit('keepAlive/addKeepAliveComponentsName', name)
  }
})
export default router
