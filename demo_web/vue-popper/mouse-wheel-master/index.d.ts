declare type CustomEventType = 'wheelStart' | 'wheelMove' | 'wheelEnd'
declare type CustomListener = (ev: CustomWheelEvent) => any

interface CustomWheelEvent {
  /**
   * Pixel delta
   * */
  dx: number
  dy: number
  dz: number
  /**
   * Delta time
   * */
  dTime: number
  /**
   * `wheelEnd` event data only have prop timeStamp
   * */
  originalEvent:
    | WheelEvent
    | {
        timeStamp: number
      }
  type: CustomEventType
}

interface BindOptions {
  /**
   * The threshold interval between two event
   * used to determine whether the event should be ignored
   *
   * Default to 0
   * */
  debounceTime?: number
  /**
   * The threshold interval between two event
   * used to determine whether the event type is wheelStart/wheelEnd
   *
   * Default to 500
   * */
  interval?: number
  useCapture?: boolean
}

interface UnbindFn {
  (): void
}

interface BindFn {
  (el: Element, listener: CustomListener, options?: BindOptions): UnbindFn

  (listener: CustomListener, options?: BindOptions): UnbindFn
}

declare const bind: BindFn

export {
  BindFn,
  BindOptions,
  CustomEventType,
  CustomListener,
  CustomWheelEvent,
  UnbindFn,
  bind,
}
