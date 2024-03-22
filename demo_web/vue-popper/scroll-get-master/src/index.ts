export function getRect(el: Element) {
  return el.getBoundingClientRect()
}

export function posRelativeToPage(el: HTMLElement) {
  const o = { pageLeft: 0, pageTop: 0 }
  let $el = el
  while ($el) {
    o.pageLeft += $el.offsetLeft
    o.pageTop += $el.offsetTop
    $el = $el.offsetParent as HTMLElement
  }
  return o
}

export function posRelativeToClient(el: Element) {
  const rect = getRect(el)
  return { clientLeft: rect.left, clientTop: rect.top }
}

/**
 * @desc if el === window || el === undefined, return the global scrollbar width info
 *       if el is an Element, return the scrollbar width info of the Element
 *
 * x: width of horizontal scrollbar
 * y: width of vertical scrollbar
 * */
export function getNativeScrollbarWidth(el?: Window | HTMLElement) {
  const $el = el || window
  const isWindow = $el === window
  try {
    let info: { x: number; y: number } | null = isWindow
      ? (window as any).nativeScrollbarWidth
      : null
    if (!(info && typeof info.y === 'number' && typeof info.x === 'number')) {
      // If nativeScrollbarWidth is illegal, reset it
      const doc = el && 'ownerDocument' in el ? el.ownerDocument : document
      const wrapper = isWindow ? doc.createElement('div') : ($el as HTMLElement)
      if (isWindow) {
        wrapper.setAttribute(
          'style',
          'position:fixed;top:0;left:0;opacity:0;pointer-events:none;width:200px;height:200px;overflow:scroll',
        )
        doc.body.appendChild(wrapper)
      }
      info = {
        y: wrapper.offsetWidth - wrapper.clientWidth,
        x: wrapper.offsetHeight - wrapper.clientHeight,
      }
      if (isWindow) {
        ;(window as any).nativeScrollbarWidth = info
        doc.body.removeChild(wrapper)
      }
    }
    return info
  } catch (e) {
    // For server render
    return { y: 17, x: 17 }
  }
}

/**
 * This affects the performance of the animation by modifying the rate
 *
 * rate >= 0 && rate <= 1
 * */
export type RateFactor = (rate: number) => number

function defaultRateFactor(rate: number) {
  return rate + (1 - rate) * rate
}

export function animation(
  time: number,
  cb: (rate: number) => void,
  rateFactor?: RateFactor,
) {
  const $rateFactor = rateFactor || defaultRateFactor
  const run = ($cb: () => boolean) => {
    window.requestAnimationFrame(() => {
      if ($cb()) run($cb)
    })
  }

  return new Promise(res => {
    const start = Date.now()
    run(() => {
      const rate = $rateFactor(Math.min(1, (Date.now() - start) / time))
      cb(rate)
      if (rate >= 1) {
        res()
        return false
      }
      return true
    })
  })
}

/**
 * 获取元素的可能达到的最大的 scrollTop 和 scrollLeft 值
 *
 * Gets the maximum possible scrollTop ans scrollLeft value for the element
 * */
export function getMaxScrollOffset(el: HTMLElement) {
  const style = window.getComputedStyle(el)
  const offset = { top: 0, left: 0 }
  if (
    el.nodeName === 'HTML' ||
    ['scroll', 'auto', 'overlay'].includes(style.overflowX)
  ) {
    offset.left = Math.max(0, el.scrollWidth - el.clientWidth)
  }
  if (
    el.nodeName === 'HTML' ||
    ['scroll', 'auto', 'overlay'].includes(style.overflowY)
  ) {
    offset.top = Math.max(0, el.scrollHeight - el.clientHeight)
  }
  return offset
}

function nonScrollOffset(offset: { top: number; left: number }) {
  return !offset.top && !offset.left
}

/**
 * 向上遍历元素的祖先，获取第一个能滚动的祖先元素
 *
 * Traverse up the ancestor of the element to get the first scrollable ancestor element
 * */
export function getScrollParent(
  $el?: HTMLElement | null,
): HTMLElement | undefined {
  if (!$el?.style) return undefined
  const style = window.getComputedStyle($el)

  if (style.position === 'fixed') return undefined

  const doc = $el.ownerDocument
  if (style.position === 'absolute') {
    if ($el.offsetParent) {
      return getScrollParent($el.offsetParent as HTMLElement)
    }
    return !nonScrollOffset(getMaxScrollOffset(doc.body))
      ? doc.body
      : getScrollParent(doc.body)
  }

  const scrollParent = $el.parentElement as HTMLElement
  if (scrollParent) {
    return !nonScrollOffset(getMaxScrollOffset(scrollParent)) ||
      scrollParent === doc.documentElement
      ? scrollParent
      : getScrollParent(scrollParent)
  }
  return undefined
}

export interface ScrollToElementOptions {
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
  offset?: number | { left?: number; top?: number }
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
export function scrollToElement(
  el: HTMLElement,
  options?: ScrollToElementOptions,
): Promise<void> {
  const { offset: $offset = 0, time = 300, ...resOptions } = options || {}
  const offset =
    typeof $offset === 'number'
      ? { left: $offset, top: $offset }
      : {
          left: $offset.left || 0,
          top: $offset.top || 0,
        }
  const scrollParent = getScrollParent(el)
  if (scrollParent && (!resOptions.topDisabled || !resOptions.leftDisabled)) {
    const parentScroll = () =>
      scrollToElement(scrollParent!, { time, ...resOptions })

    const maxScrollOffset = getMaxScrollOffset(scrollParent)
    const originScrollOffset = {
      scrollLeft: scrollParent.scrollLeft,
      scrollTop: scrollParent.scrollTop,
    }

    const rect = getRect(el)
    const scrollParentRect = getRect(scrollParent)
    if (scrollParent.nodeName === 'HTML') {
      scrollParentRect.y = 0
    }
    const delta = {
      left: Math.min(
        rect.left - scrollParentRect.left + offset.left,
        maxScrollOffset.left - scrollParent.scrollLeft,
      ),
      top: Math.min(
        rect.top - scrollParentRect.top + offset.top,
        maxScrollOffset.top - scrollParent.scrollTop,
      ),
    }
    if (
      (delta.left && !resOptions.leftDisabled) ||
      (delta.top && !resOptions.topDisabled)
    ) {
      return animation(
        time,
        rate => {
          if (!resOptions.topDisabled) {
            scrollParent!.scrollTop =
              originScrollOffset.scrollTop + delta.top * rate
          }
          if (!resOptions.leftDisabled) {
            scrollParent!.scrollLeft =
              originScrollOffset.scrollLeft + delta.left * rate
          }
        },
        resOptions.rateFactor,
      ).then(resOptions.affectParent ? parentScroll : null)
    }

    if (resOptions.affectParent) {
      return parentScroll()
    }
  }
  return Promise.resolve()
}

export interface ElementInfo {
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
export type GetViewElementsWhenScrollCb = (
  viewElements: ElementInfo[],
  scrollParentRect: DOMRect,
  ev?: Event,
) => any

export function getViewElementsWhenScroll(
  scrollElement: HTMLElement,
  targetElements: HTMLElement[],
  cb: GetViewElementsWhenScrollCb,
) {
  if (targetElements.length > 0) {
    let oldEl: ElementInfo[] = []

    const scroll = (ev?: Event) => {
      const scrollRect = getRect(scrollElement)
      const elementsRect = targetElements.map(getRect)

      // 重新计算元素当前的区域高度及可见区域高度
      const rects = elementsRect.map((rect, i) => {
        const $rect = rect as ElementInfo['rect']
        $rect.viewHeight = Math.max(
          0,
          Math.min(
            $rect.top + $rect.height,
            scrollRect.top + scrollRect.height,
          ) - Math.max(scrollRect.top, $rect.top),
        )
        $rect.viewWidth = Math.max(
          0,
          Math.min(
            $rect.left + $rect.width,
            scrollRect.left + scrollRect.width,
          ) - Math.max(scrollRect.left, $rect.left),
        )
        if ($rect.height && $rect.width) {
          $rect.viewPercent =
            (($rect.viewHeight * $rect.viewWidth) / $rect.height) * $rect.width
        } else if (!$rect.height && !$rect.width) {
          $rect.viewPercent = 0
        } else if (!$rect.height) {
          $rect.viewPercent = $rect.viewWidth / $rect.width
        } else {
          $rect.viewPercent = $rect.viewHeight / $rect.height
        }
        return { rect: $rect, element: targetElements[i] }
      })

      // 通过比较各自当前的可见区域的大小获得当前的最近元素
      const viewElements = rects
        .filter(el => {
          return el.rect.viewPercent > 0
        })
        .sort((a, b) => {
          const l1 = b.rect.viewPercent - a.rect.viewPercent
          if (l1) return l1
          return (
            b.rect.viewHeight * b.rect.viewWidth -
            a.rect.viewHeight * a.rect.viewWidth
          )
        })

      if (
        viewElements.length !== oldEl.length ||
        viewElements.some((el, i) => el.element !== oldEl[i].element)
      ) {
        cb((oldEl = viewElements), scrollRect, ev)
      }
    }
    scroll()
    scrollElement.addEventListener('scroll', scroll)
    return () => scrollElement.removeEventListener('scroll', scroll)
  }
  return () => {}
}

/**
 * Judge whether the element is in current page view
 * */
export function isElementInView(el?: HTMLElement | null) {
  if (!el) return false
  const rect = el.getBoundingClientRect()
  const x = rect.x + rect.width / 2
  const y = rect.y + rect.height / 2
  const points: [number, number][] = [
    [x, rect.y],
    [x, rect.y + rect.height - 1],
    [rect.x, y],
    [rect.x + rect.width - 1, y],
    [x, y],
  ]
  return points.some(point =>
    el.contains(el.ownerDocument.elementFromPoint(...point)),
  )
}
