import type { Uppy } from '@uppy/core'

// Helper to exclude a key
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

// If I use the helper it doesn't work, I think because 'target' is not a `keyof T` while
// the generic T is unknown, so will just use the expansion here
type OmitTarget<T> = Pick<T, Exclude<keyof T, 'target'>>

export type WithBaseUppyProps<T> = T & { uppy: Uppy }
export type ToUppyProps<T> = WithBaseUppyProps<OmitTarget<T>>
