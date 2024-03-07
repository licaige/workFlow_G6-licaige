import type { prefetchParamList, prefetchParam, globalAssetsType } from '@micro-app/types'
import CreateApp, { appInstanceMap } from './create_app'
import {
  requestIdleCallback,
  formatAppURL,
  formatAppName,
  promiseStream,
  logError,
  isBrowser,
  isArray,
  isPlainObject,
  isString,
  isFunction,
} from './libs/utils'
import { fetchSource } from './source/fetch'
import { globalLinks } from './source/links'
import { globalScripts } from './source/scripts'
import microApp from './micro_app'

/**
 * preFetch([
 *  {
 *    name: string,
 *    url: string,
 *    disableScopecss?: boolean,
 *    disableSandbox?: boolean,
 *  },
 *  ...
 * ])
 * Note:
 *  1: preFetch is asynchronous and is performed only when the browser is idle
 *  2: disableScopecss, disableSandbox must be same with micro-app element, if conflict, the one who executes first shall prevail
 * @param apps micro apps
 */
export default function preFetch (apps: prefetchParamList): void {
  if (!isBrowser) {
    return logError('preFetch is only supported in browser environment')
  }
  requestIdleCallback(() => {
    isFunction(apps) && (apps = (apps as Function)())

    if (isArray(apps)) {
      apps.reduce((pre, next) => pre.then(() => preFetchInSerial(next)), Promise.resolve())
    }
  })
}

// sequential preload app
function preFetchInSerial (prefetchApp: prefetchParam): Promise<void> {
  return new Promise((resolve) => {
    requestIdleCallback(() => {
      if (isPlainObject(prefetchApp) && navigator.onLine) {
        prefetchApp.name = formatAppName(prefetchApp.name)
        prefetchApp.url = formatAppURL(prefetchApp.url, prefetchApp.name)
        if (prefetchApp.name && prefetchApp.url && !appInstanceMap.has(prefetchApp.name)) {
          const app = new CreateApp({
            name: prefetchApp.name,
            url: prefetchApp.url,
            scopecss: !(prefetchApp.disableScopecss ?? microApp.disableScopecss),
            useSandbox: !(prefetchApp.disableSandbox ?? microApp.disableSandbox),
          })

          app.isPrefetch = true
          app.prefetchResolve = resolve
          appInstanceMap.set(prefetchApp.name, app)
        } else {
          resolve()
        }
      } else {
        resolve()
      }
    })
  })
}

/**
 * load global assets into cache
 * @param assets global assets of js, css
 */
export function getGlobalAssets (assets: globalAssetsType): void {
  if (isPlainObject(assets)) {
    requestIdleCallback(() => {
      fetchGlobalResources(assets.js, 'js', globalScripts)
      fetchGlobalResources(assets.css, 'css', globalLinks)
    })
  }
}

// TODO: requestIdleCallback for every file
function fetchGlobalResources (resources:string[] | undefined, suffix:string, cache:Map<string, string>) {
  if (isArray(resources)) {
    const effectiveResource = resources!.filter((path) => isString(path) && path.includes(`.${suffix}`) && !cache.has(path))

    const fetchResourcePromise = effectiveResource.map((path) => fetchSource(path))

    // fetch resource with stream
    promiseStream<string>(fetchResourcePromise, (res: {data: string, index: number}) => {
      const path = effectiveResource[res.index]
      if (!cache.has(path)) {
        cache.set(path, res.data)
      }
    }, (err: {error: Error, index: number}) => {
      logError(err)
    })
  }
}
