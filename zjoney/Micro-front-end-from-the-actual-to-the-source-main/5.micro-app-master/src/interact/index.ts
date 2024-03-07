import { CallableFunctionForInteract } from '@micro-app/types'
import EventCenter from './event_center'
import { appInstanceMap } from '../create_app'
import {
  removeDomScope,
  isString,
  isFunction,
  isPlainObject,
  formatAppName,
  logError,
  getRootContainer,
} from '../libs/utils'

const eventCenter = new EventCenter()

/**
 * Format event name
 * @param appName app.name
 * @param fromBaseApp is from base app
 */
function formatEventName (appName: string, fromBaseApp: boolean): string {
  if (!isString(appName) || !appName) return ''
  return fromBaseApp ? `__from_base_app_${appName}__` : `__from_micro_app_${appName}__`
}

// Global data
class EventCenterForGlobal {
  /**
   * add listener of global data
   * @param cb listener
   * @param autoTrigger If there is cached data when first bind listener, whether it needs to trigger, default is false
   */
  addGlobalDataListener (cb: CallableFunctionForInteract, autoTrigger?: boolean): void {
    const appName = (this as any).appName
    // if appName exists, this is in sub app
    if (appName) {
      cb.__APP_NAME__ = appName
      cb.__AUTO_TRIGGER__ = autoTrigger
    }
    eventCenter.on('global', cb, autoTrigger)
  }

  /**
   * remove listener of global data
   * @param cb listener
   */
  removeGlobalDataListener (cb: CallableFunctionForInteract): void {
    isFunction(cb) && eventCenter.off('global', cb)
  }

  /**
   * dispatch global data
   * @param data data
   */
  setGlobalData (data: Record<PropertyKey, unknown>): void {
    // clear dom scope before dispatch global data, apply to micro app
    removeDomScope()

    eventCenter.dispatch('global', data)
  }

  /**
   * get global data
   */
  getGlobalData (): Record<PropertyKey, unknown> | null {
    return eventCenter.getData('global')
  }

  /**
   * clear all listener of global data
   * if appName exists, only the specified functions is cleared
   * if appName not exists, only clear the base app functions
   */
  clearGlobalDataListener (): void {
    const appName = (this as any).appName
    const eventInfo = eventCenter.eventList.get('global')
    if (eventInfo) {
      for (const cb of eventInfo.callbacks) {
        if (
          (appName && appName === cb.__APP_NAME__) ||
          !(appName || cb.__APP_NAME__)
        ) {
          eventInfo.callbacks.delete(cb)
        }
      }
    }
  }
}

// Event center for base app
export class EventCenterForBaseApp extends EventCenterForGlobal {
  /**
   * add listener
   * @param appName app.name
   * @param cb listener
   * @param autoTrigger If there is cached data when first bind listener, whether it needs to trigger, default is false
   */
  addDataListener (appName: string, cb: CallableFunction, autoTrigger?: boolean): void {
    eventCenter.on(formatEventName(formatAppName(appName), false), cb, autoTrigger)
  }

  /**
   * remove listener
   * @param appName app.name
   * @param cb listener
   */
  removeDataListener (appName: string, cb: CallableFunction): void {
    isFunction(cb) && eventCenter.off(formatEventName(formatAppName(appName), false), cb)
  }

  /**
   * get data from micro app or base app
   * @param appName app.name
   * @param fromBaseApp whether get data from base app, default is false
   */
  getData (appName: string, fromBaseApp = false): Record<PropertyKey, unknown> | null {
    return eventCenter.getData(formatEventName(formatAppName(appName), fromBaseApp))
  }

  /**
   * Dispatch data to the specified micro app
   * @param appName app.name
   * @param data data
   */
  setData (appName: string, data: Record<PropertyKey, unknown>): void {
    eventCenter.dispatch(formatEventName(formatAppName(appName), true), data)
  }

  /**
   * clear all listener for specified micro app
   * @param appName app.name
   */
  clearDataListener (appName: string): void {
    eventCenter.off(formatEventName(formatAppName(appName), false))
  }
}

// Event center for sub app
export class EventCenterForMicroApp extends EventCenterForGlobal {
  appName: string
  umdDataListeners?: {
    global: Set<CallableFunctionForInteract>,
    normal: Set<CallableFunctionForInteract>,
  }

  constructor (appName: string) {
    super()
    this.appName = formatAppName(appName)
    !this.appName && logError(`Invalid appName ${appName}`)
  }

  /**
   * add listener, monitor the data sent by the base app
   * @param cb listener
   * @param autoTrigger If there is cached data when first bind listener, whether it needs to trigger, default is false
   */
  addDataListener (cb: CallableFunctionForInteract, autoTrigger?: boolean): void {
    cb.__AUTO_TRIGGER__ = autoTrigger
    eventCenter.on(formatEventName(this.appName, true), cb, autoTrigger)
  }

  /**
   * remove listener
   * @param cb listener
   */
  removeDataListener (cb: CallableFunctionForInteract): void {
    isFunction(cb) && eventCenter.off(formatEventName(this.appName, true), cb)
  }

  /**
   * get data from base app
   */
  getData (): Record<PropertyKey, unknown> | null {
    return eventCenter.getData(formatEventName(this.appName, true))
  }

  /**
   * dispatch data to base app
   * @param data data
   */
  dispatch (data: Record<PropertyKey, unknown>): void {
    removeDomScope()

    eventCenter.dispatch(formatEventName(this.appName, false), data)

    const app = appInstanceMap.get(this.appName)
    if (app?.container && isPlainObject(data)) {
      const event = new CustomEvent('datachange', {
        detail: {
          data,
        }
      })

      getRootContainer(app.container).dispatchEvent(event)
    }
  }

  /**
   * clear all listeners
   */
  clearDataListener (): void {
    eventCenter.off(formatEventName(this.appName, true))
  }
}

/**
 * Record UMD function before exec umdHookMount
 * @param microAppEventCenter
 */
export function recordDataCenterSnapshot (microAppEventCenter: EventCenterForMicroApp): void {
  const appName = microAppEventCenter.appName
  microAppEventCenter.umdDataListeners = { global: new Set(), normal: new Set() }

  const globalEventInfo = eventCenter.eventList.get('global')
  if (globalEventInfo) {
    for (const cb of globalEventInfo.callbacks) {
      if (appName === cb.__APP_NAME__) {
        microAppEventCenter.umdDataListeners.global.add(cb)
      }
    }
  }

  const subAppEventInfo = eventCenter.eventList.get(formatEventName(appName, true))
  if (subAppEventInfo) {
    microAppEventCenter.umdDataListeners.normal = new Set(subAppEventInfo.callbacks)
  }
}

/**
 * Rebind the UMD function of the record before remount
 * @param microAppEventCenter instance of EventCenterForMicroApp
 */
export function rebuildDataCenterSnapshot (microAppEventCenter: EventCenterForMicroApp): void {
  for (const cb of microAppEventCenter.umdDataListeners!.global) {
    microAppEventCenter.addGlobalDataListener(cb, cb.__AUTO_TRIGGER__)
  }

  for (const cb of microAppEventCenter.umdDataListeners!.normal) {
    microAppEventCenter.addDataListener(cb, cb.__AUTO_TRIGGER__)
  }
}
