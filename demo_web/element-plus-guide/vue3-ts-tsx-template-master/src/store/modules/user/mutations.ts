import { MutationTree } from 'vuex'
import { UserState } from './state'
import { UserMutationTypes } from './mutation-types'

export type Mutations<S = UserState> = {
  [UserMutationTypes.SET_TOKEN](state: S, token: string): void
  [UserMutationTypes.SET_ROLES](state: S, token: string): void
  [UserMutationTypes.SET_NICKNAME](state: S, token: string): void
}
export const mutations: MutationTree<UserState> & Mutations = {
  [UserMutationTypes.SET_TOKEN](state: UserState, token: string) {
    state.token = token
  },
  [UserMutationTypes.SET_ROLES](state: UserState, roles: string) {
    state.roles = roles
  },
  [UserMutationTypes.SET_NICKNAME](state: UserState, nickname: string) {
    state.nickname = nickname
  },
}
