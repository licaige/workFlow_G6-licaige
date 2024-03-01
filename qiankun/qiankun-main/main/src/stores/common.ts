import { defineStore } from 'pinia'
import { commonApi } from '@/service/commonApi'
import { type RouteRecordRaw } from 'vue-router'
import { concatRoutes, formatRoutes } from '@/utils'

/**
 * @param { 组合式 }
 */
export const commonStore = defineStore('common', {
  state: () => ({
    collapse: false,
    menuActive: {
      to: '',
      path: '',
      meta: {
        title: '',
        icon: '',
      },
    },
    routes: [] as Array<RouteRecordRaw>,
  }),
  actions: {
    submitCollapse(val: boolean) {
      this.collapse = val
    },
    submitMenuActive(to: any) {
      this.menuActive = to
    },
    async submitMenus(basicRoutes: any, router: any, to: any) {
      const { data }: any = await commonApi.getMenuList()
      const dynamicRoutes = formatRoutes(data.list)
      dynamicRoutes.forEach((item: any) => {
        router.addRoute('Layout', item)
      })
      this.routes = concatRoutes(basicRoutes, dynamicRoutes)
      // 解决刷新问题
      router.push({ path: to.path })
    },
  },
})
