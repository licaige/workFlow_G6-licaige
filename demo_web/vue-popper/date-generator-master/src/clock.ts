import { DefaultMax } from './types'
import { getIntervalVal } from './utils'

export const getHour = getIntervalVal(DefaultMax.Hour)
export const getMinute = getIntervalVal(DefaultMax.Minute)
export const getSecond = getIntervalVal(DefaultMax.Second)
