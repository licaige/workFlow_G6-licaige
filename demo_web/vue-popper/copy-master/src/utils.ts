/**
 * @description If param obj is expected that can be copied
 * */
import { Obj, CircularStructurePaths } from './types'

export enum ExpectedObjType {
  NormalObj = 'object',
  Array = 'Array',
}

export function expectedObjType(obj: Obj) {
  const unexpectedObjConstructors = [
    typeof Promise !== 'undefined' && Promise,
    typeof Date !== 'undefined' && Date,
    typeof Error !== 'undefined' && Error,
    typeof RegExp !== 'undefined' && RegExp,
    typeof FileList !== 'undefined' && FileList,
    typeof File !== 'undefined' && File,
    typeof Element !== 'undefined' && Element,
    typeof Window !== 'undefined' && Window,
    typeof Document !== 'undefined' && Document,
  ]
  return typeof obj === 'object' &&
    !(
      obj === null ||
      unexpectedObjConstructors.some(it => it && obj instanceof it)
    )
    ? obj instanceof Array
      ? ExpectedObjType.Array
      : ExpectedObjType.NormalObj
    : false
}

export function newObj(target: Obj) {
  return target instanceof Array ? [] : {}
}

/**
 * @description Returns the start dimension of the nested loop
 * @param {Object} obj
 * @param {Array} tParents - Target parents
 * */
export function circularStructureIndex(obj: Obj, tParents: Obj[]) {
  const index = Object.keys(tParents).find(i => {
    return tParents[+i] === obj
  })
  return index !== undefined ? { index: +index } : undefined
}

/**
 * @description Returns the start dimension of the nested loop
 * */
export function isCircularStructure(obj: Obj): CircularStructurePaths | null {
  const paths: CircularStructurePaths = ['', '']

  const isCircular = (
    object: Obj,
    path: string[] = ['Object'],
    oParents?: Obj[],
  ): boolean => {
    if (typeof object !== 'object' || object === null) return false

    const parents = oParents ? [...oParents, object] : [object]

    return Object.entries(object).some(([key, value]) => {
      const cPath = [...path, key]
      const circularIndex = circularStructureIndex(value, parents)
      if (circularIndex) {
        paths[0] = cPath
          .slice(0, circularIndex.index + 1)
          .reduce((pre, p) => `${pre}.${p}`, '')
          .replace(/^\./, '')
        paths[1] = cPath
          .reduce((pre, p) => `${pre}.${p}`, '')
          .replace(/^\./, '')
        return true
      }
      return isCircular(value, cPath, parents)
    })
  }

  return isCircular(obj) ? paths : null
}
