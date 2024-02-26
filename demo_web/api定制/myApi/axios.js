import axios from 'axios'
import { Loading, Message } from 'element-ui'
import router from '@/router'
import store from '@store'
const pendingMap = new Map()

const LoadingInstance = {
  _target: null,
  _count: 0
}

function myAxios (axiosConfig, customOptions, loadingOptions) {
  const service = axios.create({})
  // 自定义配置
  // eslint-disable-next-line camelcase
  const custom_options = Object.assign({
    // 是否开启取消重复请求, 默认为 true
    repeat_request_cancel: true,
    // 是否开启loading层效果, 默认为false
    loading: false,
    // 是否开启简洁的数据结构响应, 默认为false
    reduct_data_format: false,
    // 是否开启接口错误信息展示,默认为false
    error_message_show: false,
    // 是否开启code不为0时的信息提示, 默认为false
    code_message_show: false,
    // 取消响应的依据参数
    url: true,
    method: true,
    params: false,
    data: false
  }, customOptions)

  // 请求拦截
  service.interceptors.request.use(
    config => {
      // 检查是否存在重复请求，若存在则取消已发的请求
      removePending(config, custom_options)
      // 如果开启取消重复请求，把当前请求信息添加到pendingMap对象中
      custom_options.repeat_request_cancel && addPending(config, custom_options)
      // 创建loading实例
      if (custom_options.loading) {
        LoadingInstance._count++
        if (LoadingInstance._count === 1) {
          LoadingInstance._target = Loading.service(loadingOptions)
        }
      }
      const TOKEN = window.localStorage.getItem('Authorization') || window.sessionStorage.getItem('Authorization')
      TOKEN && (config.headers.Authorization = TOKEN)
      config.headers.node = 'cabits' // 单点登录
      // 国际化请求头处理
      const language = store.getters.language
      language && (config.headers.LANGUAGES = language)
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )

  // 响应拦截
  service.interceptors.response.use(
    response => {
      // 如果相应成功，就从当前pendingMap对象中删除对应接口请求，因为已经有接口返回值了
      removePending(response.config, custom_options)
      // 关闭loading
      custom_options.loading && closeLoading(custom_options)
      // code不等于1000, 页面具体逻辑就不执行了
      if (custom_options.code_message_show && response.data && response.data.code !== 1000) {
        Message({
          type: 'error',
          message: response.data.message
        })
        return Promise.reject(response.data)
      }
      // 常规逻辑
      if (response) {
        const res = response.data
        switch (res.code) {
          // 1004  单点登录以及无效 token 或 token 已过期，都返回1004
          case 1004:
            window.localStorage.clear() // 删除用户信息
            window.sessionStorage.clear()
            // 如果超时就处理 ，指定要跳转的页面(比如登陆页)
            router.replace({
              path: '/login'
            }).catch(() => {})
            break
        }
      }
      // 是否开启简洁的数据结构响应, 默认为true
      return custom_options.reduct_data_format ? response.data : response
    },
    error => {
      // 从pendingMap对象中移除请求，错误也是有返回值了
      error.config && removePending(error.config || {}, custom_options)
      // 此处将error状态特殊处理，返回Promise的pending状态，目的是为了中断promise链式执行代码，这样就不会执行后面的then和catch了
      if (axios.isCancel(error)) {
        console.log('被取消的重复请求：' + error.message)
        return new Promise(() => {})
      }
      // 关闭loading
      custom_options.loading && closeLoading(custom_options)
      // 处理错误状态码
      custom_options.error_message_show && httpErrorStatusHandle(error)
      // 错误继续返回给到具体页面
      // return Promise.reject(error)
      const { response } = error
      if (response) {
        switch (response.status) {
          case 401:
            break
          case 403:
            break
          case 404:
            break
        }
      } else {
        if (!window.navigator.onLine) {
          // 断网处理：跳转到断网页面
          return false
        }
        return Promise.reject(response.data)
      }
    }
  )

  return service(axiosConfig)
}

export default myAxios

/**
 * 处理异常
 * @param {*} error
 */
function httpErrorStatusHandle (error) {
  // 处理被取消的请求
  if (axios.isCancel(error)) return console.error('请求的重复请求：' + error.message)
  let message = ''
  if (error && error.response) {
    switch (error.response.status) {
      case 302:
        message = '接口重定向了！'
        break
      case 400:
        message = '参数不正确！'
        break
      case 401:
        message = '您未登录，或者登录已经超时，请先登录！'
        break
      case 403:
        message = '您没有权限操作！'
        break
      case 404:
        message = `请求地址出错: ${error.response.config.url}`
        break // 在正确域名下
      case 408:
        message = '请求超时！'
        break
      case 409:
        message = '系统已存在相同数据！'
        break
      case 500:
        message = '服务器内部错误！'
        break
      case 501:
        message = '服务未实现！'
        break
      case 502:
        message = '网关错误！'
        break
      case 503:
        message = '服务不可用！'
        break
      case 504:
        message = '服务暂时无法访问，请稍后再试！'
        break
      case 505:
        message = 'HTTP版本不受支持！'
        break
      default:
        message = '异常问题，请联系管理员！'
        break
    }
  }
  if (error.message.includes('timeout')) message = '网络请求超时！'
  if (error.message.includes('Network')) message = window.navigator.onLine ? '服务端异常！' : '您断网了！'

  Message({
    type: 'error',
    message
  })
}

/**
 * 关闭Loading层实例
 * @param {*} _options
 */
function closeLoading (_options) {
  if (_options.loading && LoadingInstance._count > 0) LoadingInstance._count--
  if (LoadingInstance._count === 0) {
    LoadingInstance._target.close()
    LoadingInstance._target = null
  }
}

/**
 * 储存每个请求的唯一cancel回调, 以此为标识
 * @param {*} config
 */
function addPending (config, customOptions) {
  const pendingKey = getPendingKey(config, customOptions)
  config.cancelToken = config.cancelToken || new axios.CancelToken((cancel) => {
    if (!pendingMap.has(pendingKey)) {
      pendingMap.set(pendingKey, cancel)
    }
  })
}

/**
 * 删除重复的请求
 * @param {*} config
 */
function removePending (config, customOptions) {
  const pendingKey = getPendingKey(config, customOptions)
  if (pendingMap.has(pendingKey)) {
    const cancelToken = pendingMap.get(pendingKey)
    // 调用回调函数，进行接口请求取消处理
    cancelToken(pendingKey)
    // 将前一次重复的请求移除
    pendingMap.delete(pendingKey)
  }
}

/**
 * 生成唯一的每个请求的唯一key
 * @param {*} config
 * @returns
 */
function getPendingKey (config, customOptions) {
  let { url, method, params, data } = config
  // response里面返回的config.data是个字符串对象
  if (typeof data === 'string') {
    data = JSON.parse(data)
  }
  let arr = [url, method]
  if (customOptions.params) {
    arr = arr.concat(JSON.stringify(params))
  }
  if (customOptions.data) {
    arr = arr.concat(JSON.stringify(data))
  }
  console.log('arr ', arr)
  console.log('arr & 李琦', arr.join('&'))
  // return [url, method, JSON.stringify(params), JSON.stringify(data)].join('&')
  return arr.join('&')
}
