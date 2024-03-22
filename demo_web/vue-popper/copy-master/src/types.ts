export interface Obj extends Object {
  [key: string]: any

  [key: number]: any
}

export type UnexpectType =
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

export type ReferencedPath = string
export type QuotePath = string
export type CircularStructurePaths = [ReferencedPath, QuotePath]

export interface CopyDomOptions {
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
