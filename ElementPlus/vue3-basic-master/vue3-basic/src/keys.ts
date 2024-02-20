import { InjectionKey, Ref } from 'vue'

export const langKey = Symbol() as InjectionKey<Ref<string>>
export const userkey = Symbol() as InjectionKey<{name: string}>