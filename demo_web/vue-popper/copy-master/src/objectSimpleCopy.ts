import { Obj } from './types'

/**
 * @description Deep copy, cannot deal nested loop
 * */
export default function objectSimpleCopy(obj: Obj) {
  return JSON.parse(JSON.stringify(obj))
}
