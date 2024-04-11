import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  { path: '/split', name: '分裂组件', component: () => import('@/views/split') },
  { path: '/pieBarChart', name: '饼柱图', component: () => import('@/views/PieBarChart') },
  { path: '/maze', name: '迷宫', component: () => import('@/views/maze') },
  { path: '/Panal', name: '面板', component: () => import('@/views/Panal') },
  { path: '/WaterfallFlow', name: '瀑布流', component: () => import('@/views/WaterfallFlow') },
  { path: '/smallTest', name: '小实验', component: () => import('@/views/SmallTest') },
  {
    path: '/bigTest',
    name: '大实验',
    component: () => import('@/views/BigTest'),
    redirect: '/walkControl',
    children: [
      { path: '/walkControl', name: '小人走路', component: () => import('@/views/BigTest/WalkControl') },
      { path: '/TransFile', name: '文件转格式', component: () => import('@/views/BigTest/TransFile') },
      { path: '/Radar', name: '雷达图', component: () => import('@/views/BigTest/Radar') },
      { path: '/Equation', name: '解方程', component: () => import('@/views/BigTest/Equation') },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
