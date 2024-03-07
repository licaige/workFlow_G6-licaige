import microApp from '../micro_app'
import { logError, isFunction, removeDomScope, getRootContainer } from '../libs/utils'

function formatEventInfo (event: CustomEvent, element: HTMLElement): void {
  Object.defineProperties(event, {
    currentTarget: {
      get () {
        return element
      }
    },
    target: {
      get () {
        return element
      }
    },
  })
}

/**
 * dispatch lifeCycles event to base app
 * created, beforemount, mounted, unmount, error
 * @param element container
 * @param appName app.name
 * @param lifecycleName lifeCycle name
 * @param error param from error hook
 */
export default function dispatchLifecyclesEvent (
  element: HTMLElement | ShadowRoot,
  appName: string,
  lifecycleName: string,
  error?: Error,
): void {
  if (!element) {
    return logError(`element does not exist in lifecycle ${lifecycleName}`, appName)
  }

  element = getRootContainer(element)

  // clear dom scope before dispatch lifeCycles event to base app, especially mounted & unmount
  removeDomScope()

  const detail = Object.assign({
    name: appName,
    container: element,
  }, error && {
    error
  })

  const event = new CustomEvent(lifecycleName, {
    detail,
  })

  formatEventInfo(event, element)
  // global hooks
  // @ts-ignore
  if (isFunction(microApp.lifeCycles?.[lifecycleName])) {
    // @ts-ignore
    microApp.lifeCycles[lifecycleName](event)
  }

  element.dispatchEvent(event)
}

/**
 * Dispatch custom event to micro app
 * @param eventName event name
 * @param appName app name
 * @param detail event detail
 */
export function dispatchCustomEventToMicroApp (
  eventName: string,
  appName: string,
  detail: Record<string, any> = {},
): void {
  const event = new CustomEvent(`${eventName}-${appName}`, {
    detail,
  })
  window.dispatchEvent(event)
}
