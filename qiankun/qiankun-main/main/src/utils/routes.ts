import { type RouteRecordRaw } from 'vue-router'

export const concatRoutes = (
  basicRoutes: Array<RouteRecordRaw>,
  dynamicRoutes: Array<RouteRecordRaw>
) => {
  return basicRoutes.map((item: any) => {
    if (item.name === 'Layout') {
      item.children = [...item.children, ...dynamicRoutes]
    }
    return item
  })
}

export const formatRoutes = (dynamicRoutes: Array<RouteRecordRaw>) => {
  return dynamicRoutes.map((item: any) => {
    if (!item.children) {
      item = {
        ...item,
        component: () => import(`@/views/${item.name}.vue`),
      }
    } else {
      const children = item.children.map((ele: any) => {
        return {
          ...ele,
          component: () => import(`@/components/SubContainer.vue`),
        }
      })
      item = { ...item, children }
    }
    return item
  })
}
