/*
 * @Descripttion:
 * @version:
 * @Author: chunwen
 * @Date: 2021-11-09 23:10:43
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-11 17:04:17
 */
import axios from 'axios'
import { ElMessage } from 'element-plus'
import store from '@/store'

const baseURL = ''

const service = axios.create({
  baseURL,
  timeout: 5000,
})

function showError(error) {
  if (error.code === 403) {
    // to re-login
    store.dispatch('user/loginOut')
  } else {
    ElMessage({
      message: error.msg || error.message || '服务异常',
      type: 'error',
      duration: 3 * 1000,
    })
  }
}

// 请求前的统一处理
service.interceptors.request.use(
  (config) => {
    // JWT鉴权处理
    if (store.getters['user/token']) {
      config.headers.token = store.state.user.token
    }
    return config
  },
  (error) => {
    console.log(error) // for debug
    return Promise.reject(error)
  },
)

service.interceptors.response.use(
  (response) => {
    const res = response.data
    if (res.code === 200) {
      return res
    }
    showError(res)
    return Promise.reject(res)
  },
  (error) => {
    console.log(error)
    const badMessage = error.message || error
    const code = parseInt(badMessage.toString().replace('Error: Request failed with status code ', ''), 10)
    showError({ code, message: badMessage })
    return Promise.reject(error)
  },
)

export default service
