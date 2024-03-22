import objectSimpleCopy from './objectSimpleCopy'
import { Obj } from './types'
import { expectedObjType, ExpectedObjType, isCircularStructure } from './utils'

function merge(target: any, ...rest: any[]) {
  rest.forEach(obj => {
    Object.entries(obj).forEach(([key, val]: [string, any]) => {
      if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
        return target
      }
      const obj1 = target[key]
      if (expectedObjType(val) && expectedObjType(obj1)) {
        merge(obj1, val)
      } else {
        target[key] = typeof val === 'object' ? objectSimpleCopy(val) : val
      }
    })
  })

  return target
}

/**
 * @description Deep merge, cannot deal nested loop
 * @return The first parameter object which has been merged
 * */
export default function objectDeepMerge<T extends Obj = Obj>(
  target: T,
  ...rest: T[]
) {
  let allTypeIs: ExpectedObjType | 'same' | 'no-same' = 'same'
  const args = [target, ...rest]
  args.forEach((obj, i) => {
    const paths = isCircularStructure(obj)
    if (paths) {
      const pathsStr = JSON.stringify(paths)
      throw new Error(
        `objectDeepMerge: Circular structure is not supported, the ${i}th parameter is a circular structure with CircularStructurePaths(${pathsStr})`,
      )
    }

    const type = expectedObjType(obj)

    if (!type || (allTypeIs !== 'same' && allTypeIs !== type)) {
      throw new Error(
        'objectDeepMerge: Please ensure that parameters are all Array or normal Object',
      )
    } else allTypeIs = type
  })

  return merge(target, ...rest)
}
