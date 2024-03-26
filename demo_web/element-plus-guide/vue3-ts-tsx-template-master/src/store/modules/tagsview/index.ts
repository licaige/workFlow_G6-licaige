import {
  Store as VuexStore,
  CommitOptions,
  DispatchOptions,
  Module,
} from 'vuex'

import { RootState } from '@/store'
import { state } from './state'
import { mutations, Mutations } from './mutations'
import { actions, Actions } from './actions'
import type { TagsViewState } from './state'

export { TagsViewState }

export type TagsStore<S = TagsViewState> = Omit<
  VuexStore<S>,
  'getters' | 'commit' | 'dispatch'
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions,
  ): ReturnType<Mutations[K]>
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload: Parameters<Actions[K]>[1],
    options?: DispatchOptions,
  ): ReturnType<Actions[K]>
}
export const store: Module<TagsViewState, RootState> = {
  state,
  mutations,
  actions,
}
