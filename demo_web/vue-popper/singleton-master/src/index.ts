type Fn<T = any> = () => T

/**
 * 每个单例的 id
 *
 * The id of a singleton
 * */
type ID = string | number

export interface PromiseOnPendingOptions {
  id?: ID

  /**
   * 用于延迟 Promise 实例删除，
   * 如果为 undefined，则在 promise 状态改变之后立即删除
   *
   * Used to delay the deletion of Promise instance,
   * if it is undefined, the promise will be deleted immediately after the state changed
   *
   * This option will be deprecated in next version
   * */
  delayTime?: number
  /**
   * 同 delayTime
   * 推荐使用这个属性
   *
   * As same as delayTime
   * */
  cacheTime?: number
}

function getIdsMap() {
  const $global: any = typeof window !== 'undefined' ? window : global
  if (
    !$global.$$SingletonIdsMap ||
    !($global.$$SingletonIdsMap instanceof Map)
  ) {
    $global.$$SingletonIdsMap = new Map()
  }
  return $global.$$SingletonIdsMap
}

/**
 * @deprecated 这个方法使用多了会导致内存泄漏，建议使用 singleton 方法代替
 * @desc 返回 id 对应的一个单例对象
 *
 *       Return a singleton of an object(such as Promise, Function, Object...) corresponding to the id.
 * */
export function singletonObj<T extends any>(id: ID, defaultValue?: () => T): T {
  const ids = getIdsMap()
  const k = `singleton-any-${id || 'default'}`
  if (!ids.has(k)) {
    ids.set(k, defaultValue ? defaultValue() : {})
  }
  return ids.get(k)
}

/**
 * @desc 返回 id 对应的一个单例对象，这个方法应当配合返回的 delete 方法一起使用，否则使用多了会导致内存泄漏
 *
 *       Return a singleton of an object(such as Promise, Function, Object...) corresponding to the id.
 *       This method will cause OOM if it's used too much without calling `delete`.
 * */
export function singleton<T extends any>(
  id: ID,
  defaultValue?: () => T,
): { value: T; delete(): void; update(action: T | ((pre: T) => T)): T } {
  const ids = getIdsMap()
  const k = `singleton-any-${id || 'default'}`
  if (!ids.has(k)) {
    ids.set(k, defaultValue ? defaultValue() : {})
  }
  return {
    value: ids.get(k),
    delete: () => ids.delete(k),
    update: (action: T | ((pre: T) => T)) => {
      // @ts-ignore
      const v = typeof action === 'function' ? action(ids.get()) : action
      ids.set(k, v)
      return v
    },
  }
}

/**
 * @desc 保证一个 id 对应的 promise 在同一时间只存在一个，
 *       并且生成 promise 的函数在 promise pending 状态的时间段内只执行一次，
 *       这个方法可以用来减少同一时间的多余请求
 *
 *       Ensure that only one promise corresponding to the id exists at the same time,
 *       and the function that generates the promise executes only once
 *       during the period of promise pending.
 *       This method can be used to reduce redundant requests at the same time
 * */
export function promiseOnPending<P extends PromiseLike<any>>(
  proFn: () => P,
  options: PromiseOnPendingOptions,
): P {
  const ids = getIdsMap()
  const { id } = options
  const cacheTime = options.cacheTime || options.delayTime
  const k = id ? `promise-${id}` : proFn

  const del = () => ids.delete(k)

  const del1 = () => {
    if (cacheTime === undefined) del()
    else setTimeout(del, cacheTime)
    return true
  }

  if (!ids.has(k)) {
    ids.set(
      k,
      proFn().then(
        res => del1() && res,
        e => Promise.reject(del1() && e),
      ),
    )
  }
  return ids.get(k)
}

/**
 * @desc 封装 setInterval 函数，
 *       保证同一个 id 对应的计时器只有一个在运行，
 *       并且返回一个清除计时器的函数，方便随时终止计时器
 *
 *       A wrapper of the setInterval function,
 *       make sure only one timer for the same id is running,
 *       and returns a function to clear the timer so it can be terminated at any time
 * */
export function runInterval(id: ID, createFn: Fn): () => void {
  const ids = getIdsMap()
  const k = `timer-${id || 'default'}`
  if (ids.has(k)) {
    // clear old interval
    ids.get(k)()
  }
  const $id = createFn()
  ids.set(k, () => {
    clearInterval($id)
    ids.delete(k)
  })
  return ids.get(k)
}

/**
 * @desc 保证传入的函数在程序的运行期间只运行一次
 *
 *       Ensure that the incoming function runs only once during the run time of the program
 * */
export function onceRun(fn: Fn, id?: any): void {
  const ids = getIdsMap()
  const k = id ? `once-run-${id}` : fn
  if (!ids.has(k)) {
    ids.set(k, fn())
  }
}
