import router from './router'
import { store } from './store'
import whiteList from './utils/config/whiteList'
import { UserActionTypes } from '@/store/modules/user/action-types'
import { PermissionActionType } from '@/store/modules/permission/action-types'

router.beforeEach(async (to, from, next) => {
  if (store.state.user.token) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (store.state.user.roles.length === 0) {
        try {
          const { routes } = await store.dispatch(
            UserActionTypes.ACTION_GET_ADMIN_INFO,
          )
          const accessRoutes = await store.dispatch(
            PermissionActionType.ACTION_SET_ROUTES,
            routes,
          )

          accessRoutes.forEach((route: any) => {
            router.addRoute(route)
          })

          next({ ...to, replace: true })
        } catch (error) {
          //await store.dispatch('user/resetToken')
          next(`login?redirect=${to.path}`)
        }
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})
