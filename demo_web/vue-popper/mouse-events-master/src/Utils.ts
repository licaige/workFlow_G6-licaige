import { isMobile } from 'is-mobile'

export const $isMobile = isMobile()

let prefix: 'on' | '' = ''
let $addEventListener: 'addEventListener' | 'attachEvent' = 'addEventListener'
let $removeEventListener: 'removeEventListener' | 'detachEvent' =
  'removeEventListener'

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  // detect event model
  if ('addEventListener' in window) {
    $addEventListener = 'addEventListener'
    $removeEventListener = 'removeEventListener'
  } else {
    $addEventListener = 'attachEvent'
    $removeEventListener = 'detachEvent'
    prefix = 'on'
  }
}

export interface CustomListener<T = Event> {
  (ev: T): any
}

export interface RemoveListener {
  (): void
}

export function $addListener<T extends Event = Event>(
  element: Element | Window,
  eventName: string,
  listener: CustomListener<T>,
  useCapture?: boolean,
): RemoveListener {
  const eName = prefix + eventName
  const addListener = (element as any)[$addEventListener].bind(element)
  addListener(eName, listener, useCapture)

  return () => {
    const removeListener = (element as any)[$removeEventListener].bind(element)
    removeListener(eName, listener, useCapture)
  }
}
