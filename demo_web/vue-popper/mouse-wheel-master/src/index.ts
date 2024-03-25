export type CustomEventType = 'wheelStart' | 'wheelMove' | 'wheelEnd'

export type CustomListener = (ev: CustomWheelEvent) => any

export interface CustomWheelEvent {
  /**
   * Pixel delta
   * 增量像素
   * */
  dx: number
  dy: number
  dz: number
  /**
   * Delta time
   * 我的三角洲
   * */
  dTime: number
  /**
   * `wheelEnd` event data only have prop timeStamp
   *
   * “wheelEnd”事件数据只有prop timeStamp
   * */
  originalEvent: WheelEvent | { timeStamp: number }
  type: CustomEventType
}

export interface BindOptions {
  /**
   * The threshold interval between two event
   * used to determine whether the event should be ignored
   *
   * 两个事件之间的阈值间隔，用于确定是否应忽略该事件
   *
   * Default to 0  默认为0
   * */
  debounceTime?: number
  /**
   * The threshold interval between two event
   * used to determine whether the event type is wheelStart/wheelEnd
   *
   * 两个事件之间的阈值间隔，用于确定事件类型是否为wheelStart/wheelEnd
   *
   * Default to 500  默认为500
   * */
  interval?: number
  useCapture?: boolean
}

export interface UnbindFn {
  (): void
}

export interface BindFn {
  (el: Element, listener: CustomListener, options?: BindOptions): UnbindFn

  (listener: CustomListener, options?: BindOptions): UnbindFn
}

let prefix: string = ''
let $addEventListener: 'addEventListener' | 'attachEvent' = 'addEventListener'
let $removeEventListener: 'removeEventListener' | 'detachEvent' =
  'removeEventListener'
let support: string = 'wheel'

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  // detect event model  选择要播放的事件模型。检测事件模型
  if ('addEventListener' in window) {
    $addEventListener = 'addEventListener'
    $removeEventListener = 'removeEventListener'
  } else {
    $addEventListener = 'attachEvent'
    $removeEventListener = 'detachEvent'
    prefix = 'on'
  }

  // detect available wheel event  启用
  if ('onwheel' in document.createElement('div')) {
    // "Wheel" is supported by most higher versions of browsers
    // 大多数更高版本的浏览器都支持“轮子”
    // 各个厂商的高版本浏览器都支持"wheel"
    support = 'wheel'
  } else if (window.onmousewheel !== undefined) {
    // Webkit and IE always support "mousewheel"  Webkit和IE始终支持“鼠标滚轮”
    // Webkit 和 IE一定支持"mousewheel"
    support = 'mousewheel'
  } else {
    // Low version of firefox
    // 低版本firefox
    support = 'DOMMouseScroll'
  }
}

function dealOriginalEvent(ev: any): WheelEvent {
  const originalEvent = ev || window.event

  // create a normalized event object
  // 创建规范化的事件对象
  const event = {
    // keep a ref to the original event object
    // 保留对原始事件对象的引用
    originalEvent,
    timeStamp: originalEvent.timeStamp,
    target: originalEvent.target || originalEvent.srcElement,
    type: 'wheel',
    deltaMode: originalEvent.type === 'MozMousePixelScroll' ? 0 : 1,
    deltaX: 0,
    deltaY: 0,
    deltaZ: 0,
    preventDefault() {
      if (originalEvent.preventDefault) originalEvent.preventDefault()
      else originalEvent.returnValue = false
    },
  }

  // calculate deltaY (and deltaX) according to the event
  // 根据事件计算deltaY（和deltaX）
  if (support === 'mousewheel') {
    event.deltaY = (-1 / 40) * originalEvent.wheelDelta

    if (originalEvent.wheelDeltaX) {
      // Webkit also support wheelDeltaX
      // Webkit还支持wheelDeltaX
      event.deltaX = (-1 / 40) * originalEvent.wheelDeltaX
    }
  } else {
    event.deltaY = originalEvent.detail
  }

  return event as any
}

function getExHeight(elem: Element | Window) {
  const el = elem instanceof Window ? document.documentElement : elem
  const fontSize = window.getComputedStyle(el).fontSize || '16px'
  return parseInt(fontSize, 10)
}

function $addWheelListener(
  element: Element | Window,
  eventName: string,
  listener: CustomListener,
  $options: BindOptions = {},
): UnbindFn {
  const options = {
    debounceTime: $options.debounceTime || 0,
    interval: $options.interval || 500,
    useCapture: $options.useCapture || false,
  }
  let timer: any
  let lastTime = 0

  function $listener(ev: WheelEvent) {
    const e = support === 'wheel' ? ev : dealOriginalEvent(ev)

    const timeDelta = e.timeStamp - lastTime
    let type: CustomEventType = 'wheelMove'
    if (timeDelta < options.debounceTime) return
    if (timeDelta > options.interval) type = 'wheelStart'

    // deltaMode: https://developer.mozilla.org/zh-CN/docs/Web/API/WheelEvent/deltaMode
    let scale = 1
    if (e.deltaMode === 1) {
      scale = getExHeight(element)
    } else if (e.deltaMode === 2) {
      scale = window.innerHeight
    }

    const dTime = type !== 'wheelStart' ? timeDelta : 0
    listener({
      dx: e.deltaX * scale || 0,
      dy: e.deltaY * scale || 0,
      dz: e.deltaZ * scale || 0,
      dTime,
      originalEvent: e,
      type,
    })

    lastTime = e.timeStamp
    clearTimeout(timer)
    timer = setTimeout(() => {
      listener({
        dx: 0,
        dy: 0,
        dz: 0,
        dTime: dTime + options.interval,
        originalEvent: { timeStamp: e.timeStamp + options.interval },
        type: 'wheelEnd',
      })
    }, options.interval)
  }

  type OperateListener = (
    eventType: string,
    listener: (ev: WheelEvent) => any,
    useCapture?: boolean,
  ) => any
  const addListener: OperateListener = (element as any)[$addEventListener]
  addListener(prefix + eventName, $listener, options.useCapture)

  return () => {
    const removeListener: OperateListener = (element as any)[
      $removeEventListener
    ]
    removeListener(prefix + eventName, $listener, options.useCapture)
  }
}

export const bind: BindFn = (element: any, listener: any, options?: any) => {
  /* eslint-disable no-param-reassign */
  if (typeof element === 'function') {
    options = listener
    listener = element
    element = window
  }

  if (support === 'DOMMouseScroll') {
    // handle MozMousePixelScroll in older Firefox
    // 在旧版Firefox中处理MozMousePixelScroll
    return $addWheelListener(element, 'MozMousePixelScroll', listener, options)
  }
  return $addWheelListener(element, support, listener, options)
}
