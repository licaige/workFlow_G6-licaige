import { ActionTree, ActionContext } from 'vuex'
import { RootState } from '@/store'
import { UserState } from './state'
import { Mutations } from './mutations'
import { UserActionTypes } from './action-types'
import { UserMutationTypes } from './mutation-types'
import { fetchAdminInfo } from '@/api/user'

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<UserState, RootState>, 'commit'>

export interface Actions {
  [UserActionTypes.ACTION_RESET_TOKEN]({ commit }: AugmentedActionContext): void
  [UserActionTypes.ACTION_GET_ADMIN_INFO]({
    commit,
  }: AugmentedActionContext): void
}

export const actions: ActionTree<UserState, RootState> & Actions = {
  [UserActionTypes.ACTION_LOGIN](
    { commit }: AugmentedActionContext,
    token: string,
  ) {
    commit(UserMutationTypes.SET_TOKEN, token)
  },
  [UserActionTypes.ACTION_RESET_TOKEN]({ commit }: AugmentedActionContext) {
    commit(UserMutationTypes.SET_TOKEN, '')
  },
  [UserActionTypes.ACTION_GET_ADMIN_INFO]({ commit }: AugmentedActionContext) {
    return new Promise((resolve, reject) => {
      fetchAdminInfo()
        .then((response) => {
          const { data } = response

          if (!data) {
            reject('验证失败，请从新登录')
          }

          commit(UserMutationTypes.SET_ROLES, data.roles)
          commit(UserMutationTypes.SET_NICKNAME, data.nickname)

          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}
