import { createStore } from 'vuex'
import {
  store as permission,
  PermissionStore,
  PermissionState,
} from '@/store/modules/permission'
import { store as user, UserState, UserStore } from '@/store/modules/user'
import {
  store as tagViews,
  TagsStore,
  TagsViewState,
} from '@/store/modules/tagsview'
import getters from './getters'

export interface RootState {
  permission: PermissionState
  user: UserState
  tagViews: TagsViewState
}

export type Store = PermissionStore<Pick<RootState, 'permission'>> &
  UserStore<Pick<RootState, 'user'>> &
  TagsStore<Pick<RootState, 'tagViews'>>

export const store = createStore<RootState>({
  modules: {
    permission,
    user,
    tagViews,
  },
  getters,
})

export function useStore(): Store {
  return store as Store
}
