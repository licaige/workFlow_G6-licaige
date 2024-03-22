interface Obj extends Object {
  [key: string]: any

  [key: number]: any
}

declare type UnexpectType =
  | undefined
  | null
  | string
  | number
  | boolean
  | Date
  | Error
  | RegExp
  | FileList
  | File
  | Element
  | Window
  | Document
declare type ReferencedPath = string
declare type QuotePath = string
declare type CircularStructurePaths = [ReferencedPath, QuotePath]

interface CopyDomOptions {
  /**
   * Should clear selection after copy
   *
   * Default to false
   * */
  clearSelect?: boolean
  /**
   * Should cut the dom(like <input>) value after copy
   *
   * Default to false
   * */
  cut?: boolean
}

/**
 * @param {Element} dom
 * @param {Object} options - Optional
 * @returns {Boolean}
 * */
declare function copyDom(dom: Element, options?: CopyDomOptions): boolean

/**
 * @param {String} text
 * @return {Promise<boolean>}
 * */
declare function copyText(text: string): Promise<true>

/**
 * @description Deep copy, has the ability to deal nested loop
 * */
declare function objectDeepCopy<T extends Obj = Obj>(obj: T): T

/**
 * @description Deep copy, cannot deal nested loop
 * */
declare function objectSimpleCopy(obj: Obj): any

/**
 * @description Deep merge, cannot deal nested loop
 * @return The first parameter object which has been merged
 * */
declare function objectDeepMerge<T extends Obj = Obj>(
  target: T,
  ...rest: T[]
): any

/**
 * @description Returns the start dimension of the nested loop
 * */
declare function isCircularStructure(obj: Obj): CircularStructurePaths | null

export {
  CircularStructurePaths,
  CopyDomOptions,
  Obj,
  QuotePath,
  ReferencedPath,
  UnexpectType,
  copyDom,
  copyText,
  isCircularStructure,
  objectDeepCopy,
  objectDeepMerge,
  objectSimpleCopy,
}
