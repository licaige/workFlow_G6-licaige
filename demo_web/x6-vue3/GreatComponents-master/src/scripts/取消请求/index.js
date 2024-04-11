/**
 * 取消请求工厂：
 * 应用一：跟随输入查询时后请求的先响应了，导致查询结果不匹配，使用取消接口可以解决
 * 应用二：跳转页面时也可以把上个页面还没加载的接口给取消
 * @param {String} url 请求地址
 * @param {*} fn 回调函数
 * @returns {Function} 可以连续调用的函数，下次调用会取消上次未完成的接口
 */
export const cancelFetch = function(url, fn=(res)=>res.json()) {
  let controller
  return async function() {
    controller && controller.abort()
    controller = new AbortController()
    try {
      const data = await fetch(
        url,
        {
          signal: controller.signal
        }
      )
      fn(data)
    } catch{
      console.log('abort')
    }
  }
}

/**
 * promise.race结合AbortController API 设置超时
 * @param {Function} fn 回调函数
 * @param {string} url 请求路径
 * @param {object} param 请求参数
 * @param {number} timeout 超时时间
 * @returns {Function}
 */
export const setFetchTimeout = async function(fn, url, param = {}, timeout = 2000) {
  const controller = new AbortController()
  try {
    const data = await Promise.race([
      fetch(url, { ...param, signal: controller.signal }),
      new Promise((_, reject) => setTimeout(reject, timeout))
    ])
    fn(data)
  } catch(e) {
    controller.abort()
  }
}