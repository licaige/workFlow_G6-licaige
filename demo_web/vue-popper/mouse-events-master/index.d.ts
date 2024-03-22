import * as MouseWheel from '@livelybone/mouse-wheel'

declare const $isMobile: boolean

interface CustomListener<T = Event> {
  (ev: T): any
}

interface RemoveListener {
  (): void
}

declare function $addListener<T extends Event = Event>(
  element: Element | Window,
  eventName: string,
  listener: CustomListener<T>,
  useCapture?: boolean,
): RemoveListener

declare const Utils$isMobile: typeof $isMobile
type UtilsCustomListener = CustomListener
type UtilsRemoveListener = RemoveListener
declare const Utils$addListener: typeof $addListener
declare namespace Utils {
  export {
    Utils$isMobile as $isMobile,
    UtilsCustomListener as CustomListener,
    UtilsRemoveListener as RemoveListener,
    Utils$addListener as $addListener,
  }
}

declare type OriginalEvent = MouseEvent | TouchEvent
declare type DragMoveEventType = 'dragMoveStart' | 'dragMove' | 'dragMoveEnd'

interface DragMoveEvent {
  type: DragMoveEventType
  deltaX: number
  deltaY: number
  originalEvent: OriginalEvent
}

interface DragMoveListener {
  (ev: DragMoveEvent): any
}

declare function bind(
  element: Element | Window,
  listener: DragMoveListener,
  useCapture?: boolean,
): RemoveListener
declare function bind(
  listener: DragMoveListener,
  useCapture?: boolean,
): RemoveListener

declare const DragMoveOriginalEvent: typeof OriginalEvent
declare const DragMoveDragMoveEventType: typeof DragMoveEventType
type DragMoveDragMoveEvent = DragMoveEvent
type DragMoveDragMoveListener = DragMoveListener
declare const DragMovebind: typeof bind
declare namespace DragMove {
  export {
    DragMoveOriginalEvent as OriginalEvent,
    DragMoveDragMoveEventType as DragMoveEventType,
    DragMoveDragMoveEvent as DragMoveEvent,
    DragMoveDragMoveListener as DragMoveListener,
    DragMovebind as bind,
  }
}

export { DragMove, MouseWheel, Utils }
