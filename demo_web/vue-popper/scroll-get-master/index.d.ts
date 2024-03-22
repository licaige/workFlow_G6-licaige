declare function getRect(el: Element): DOMRect
declare function posRelativeToPage(
  el: HTMLElement,
): {
  pageLeft: number
  pageTop: number
}
declare function posRelativeToClient(
  el: Element,
): {
  clientLeft: number
  clientTop: number
}
/**
 * @desc if el === window || el === undefined, return the global scrollbar width info
 *       if el is an Element, return the scrollbar width info of the Element
 *
 * x: width of horizontal scrollbar
 * y: width of vertical scrollbar
 * */
declare function getNativeScrollbarWidth(
  el?: Window | HTMLElement,
): {
  x: number
  y: number
}
/**
 * This affects the performance of the animation by modifying the rate
 *
 * rate >= 0 && rate <= 1
 * */
declare type RateFactor = (rate: number) => number
declare function animation(
  time: number,
  cb: (rate: number) => void,
  rateFactor?: RateFactor,
): Promise<unknown>
/**
 * 获取元素的可能达到的最大的 scrollTop 和 scrollLeft 值
 *
 * Gets the maximum possible scrollTop ans scrollLeft value for the element
 * */
declare function getMaxScrollOffset(
  el: HTMLElement,
): {
  top: number
  left: number
}
/**
 * 向上遍历元素的祖先，获取第一个能滚动的祖先元素
 *
 * Traverse up the ancestor of the element to get the first scrollable ancestor element
 * */
declare function getScrollParent(
  $el?: HTMLElement | null,
): HTMLElement | undefined
interface ScrollToElementOptions {
  /**
   * Interval
   *
   * Default: 300
   * */
  time?: number
  /**
   * Whether affect the scrollParent, when it is true the scrollParent will also scroll to the visible area
   * */
  affectParent?: boolean
  /**
   * RateFactor
   * */
  rateFactor?: RateFactor
  offset?:
    | number
    | {
        left?: number
        top?: number
      }
  /**
   * forbidden x scroll
   * */
  leftDisabled?: boolean
  /**
   * forbidden y scroll
   * */
  topDisabled?: boolean
}
/**
 * @param el                The target element you want scroll to
 * @param [options]         ScrollToElementOptions
 * */
declare function scrollToElement(
  el: HTMLElement,
  options?: ScrollToElementOptions,
): Promise<void>
interface ElementInfo {
  element: HTMLElement
  /**
   * @prop height           元素对应区域的高度
   * @prop viewHeight       元素对应可视区域的高度，在页面上可以被看到的高度
   * @prop width            元素对应区域的宽度
   * @prop viewWidth        元素对应可视区域的宽度，在页面上可以被看到的宽度
   * @prop viewPercent      viewHeight * viewWidth / height * width
   *
   * @prop height           The height of an element's area
   * @prop viewHeight       The height of the visible area of the element on the page
   * @prop width            The width of an element's area
   * @prop viewWidth        The width of the visible area of the element on the page
   * @prop viewPercent      viewHeight * viewWidth / height * width
   * */
  rect: DOMRect & {
    viewHeight: number
    viewWidth: number
    viewPercent: number
  }
}
/**
 * @param viewElements   当前可见区域代表的元素，通过对比各自排序
 * */
declare type GetViewElementsWhenScrollCb = (
  viewElements: ElementInfo[],
  scrollParentRect: DOMRect,
  ev?: Event,
) => any
declare function getViewElementsWhenScroll(
  scrollElement: HTMLElement,
  targetElements: HTMLElement[],
  cb: GetViewElementsWhenScrollCb,
): () => void
/**
 * Judge whether the element is in current page view
 * */
declare function isElementInView(el?: HTMLElement | null): boolean

export {
  ElementInfo,
  GetViewElementsWhenScrollCb,
  RateFactor,
  ScrollToElementOptions,
  animation,
  getMaxScrollOffset,
  getNativeScrollbarWidth,
  getRect,
  getScrollParent,
  getViewElementsWhenScroll,
  isElementInView,
  posRelativeToClient,
  posRelativeToPage,
  scrollToElement,
}
