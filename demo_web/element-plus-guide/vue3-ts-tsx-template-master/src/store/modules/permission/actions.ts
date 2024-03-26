import { ActionTree, ActionContext } from 'vuex'
import { RootState } from '@/store'
import { PermissionState } from './state'
import { Mutations } from './mutations'
import { PermissionMutationType } from './mutation-types'
import { PermissionActionType } from './action-types'
import { asyncRoutes } from '@/router'
import { RouteRecordRaw } from 'vue-router'

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<PermissionState, RootState>, 'commit'>

export function filterAsyncRoutes(routes: Array<RouteRecordRaw>, roles: any) {
  const res: Array<RouteRecordRaw> = []
  console.log('rolesroles', roles)
  routes.forEach((route: any) => {
    const tmp = { ...route }
    console.log('tmp', tmp)
    roles.map((o) => {
      if (o.menu_name === tmp.meta.title) {
        if (tmp.children) {
          tmp.children = filterAsyncRoutes(tmp.children, o.child)
        }
        res.push(tmp)
      }
    })
  })
  console.log('res', res)
  return res
}

export interface Actions {
  [PermissionActionType.ACTION_SET_ROUTES](
    { commit }: AugmentedActionContext,
    routes: Array<RouteRecordRaw>,
  ): void
}

export const actions: ActionTree<PermissionState, RootState> & Actions = {
  [PermissionActionType.ACTION_SET_ROUTES](
    { commit }: AugmentedActionContext,
    routes: Array<RouteRecordRaw>,
  ) {
    return new Promise((resolve) => {
      const accessedRoutes = filterAsyncRoutes(asyncRoutes, routes)
      commit(PermissionMutationType.SET_ROUTES, accessedRoutes)

      resolve(accessedRoutes)
    })
  },
}
