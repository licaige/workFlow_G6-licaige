import { Obj } from './types'
import { circularStructureIndex, expectedObjType, newObj } from './utils'

/**
 * @description Deep copy, deal nested loop
 * @param target
 * @param {Array} tParents - Target parents
 * @param {Array} tCurParents - Current result parents
 * */
function copyFn<T extends Obj = Obj>(
  target: T,
  tParents?: Obj[],
  tCurParents?: Obj[],
) {
  if (expectedObjType(target)) {
    const result: typeof target = newObj(target) as T

    const parents = tParents ? [...tParents, target] : [target]
    const curParents = tCurParents ? [...tCurParents, result] : [result]

    Object.keys(target).forEach((key: keyof T) => {
      const isCircular = circularStructureIndex(target[key], parents)
      if (isCircular) {
        result[key] = curParents[isCircular.index] as any
      } else {
        result[key] = copyFn(target[key], parents, curParents)
      }
    })

    return result
  }

  return target
}

/**
 * @description Deep copy, has the ability to deal nested loop
 * */
function objectDeepCopy<T extends Obj = Obj>(obj: T): T {
  return copyFn(obj)
}

export default objectDeepCopy
