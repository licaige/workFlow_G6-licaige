import { isFunction } from '../libs/utils'
import microApp from '../micro_app'

/**
 * fetch source of html, js, css
 * @param url source path
 * @param appName app name
 * @param config config of fetch
 */
export function fetchSource (url: string, appName: string | null = null, options = {}): Promise<string> {
  if (isFunction(microApp.fetch)) {
    return microApp.fetch!(url, options, appName)
  }
  return fetch(url, options).then((res) => {
    return res.text()
  })
}
