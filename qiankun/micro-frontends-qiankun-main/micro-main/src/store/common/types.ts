import { TMicroApp } from 'microApp/types'

export type TCommonState = {
  currentApp: TMicroApp | undefined
  microAppIsLoading: boolean
}
