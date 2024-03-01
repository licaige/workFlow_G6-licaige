import { createRouter, createWebHistory } from 'vue-router'
import { getSession } from '@/utils'
import { commonStore } from '@/stores/common'
import Layout from '@/layout/Layout.vue'

const basicRoutes = [
  {
    path: '/',
    name: 'Layout',
    redirect: '/home',
    component: Layout,
    children: [
      {
        path: '/home',
        name: 'Home',
        meta: {
          title: '首页',
          /**
           * @description 自动导入 icon,
           * @description vite.config.ts 有ep 前缀
           * @description 页面中直接使用需要<IconEpOperation />或<i-ep-peration />
           * */
          icon: 'home',
        },
        component: () => import('@/views/Home.vue'),
      },
      // 接口参照格式
      // {
      //   path: '/app/app-1',
      //   name: 'app-1',
      //   meta: {
      //     title: '微应用-1',
      //     icon: IconEpMenu,
      //   },
      //   children: [
      //     {
      //       // 如果需要，history模式需要通配所有路由，详见vue-router文档
      //       // path: '/app/app-1/:pathMatch(.*)*',
      //       path: '/app/app-1/home',
      //       name: 'app-1-home',
      //       meta: {
      //         title: '路由一',
      //         icon: IconEpOperation,
      //       },
      //       component: () => import('@/components/SubContainer.vue'),
      //     },
      //     {
      //       // 如果需要，history模式需要通配所有路由，详见vue-router文档
      //       // path: '/app/app-1/:pathMatch(.*)*',
      //       path: '/app/app-1/about',
      //       name: 'app-1-about',
      //       meta: {
      //         title: '路由二',
      //         icon: IconEpOperation,
      //       },
      //       component: () => import('@/components/SubContainer.vue'),
      //     },
      //   ],
      // },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录',
      hide: true,
    },
    component: () => import('@/views/Login.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: basicRoutes,
})

router.beforeEach(async (to, from, next) => {
  const common = commonStore()
  common.submitMenuActive(to)

  if (!getSession('qiankunToken')) {
    if (to.path !== '/login') {
      next('/login')
    } else {
      next()
    }
  } else {
    if (to.path !== '/login') {
      if (!common.routes.length) {
        await common.submitMenus(basicRoutes, router, to)
      }
      next()
    } else {
      next('/')
    }
  }
})

export default router
