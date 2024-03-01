import axios, { isCancel, AxiosError, type AxiosRequestConfig } from 'axios'
import { RES_CODE_ERR, RES_CODE_OK } from './constant'
import { ElLoading } from 'element-plus'
import { getSession } from '@/utils'

const loading = ElLoading.service

// console.log(isCancel('---something'), new AxiosError('---AxiosError'))

const instance = axios.create({
  baseURL: import.meta.env.VITE_HOST_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
})

instance.interceptors.request.use(
  (config) => {
    loading()

    config.headers.Authorization = 'Bearer ' + getSession('qiankunToken')

    return Promise.resolve(config)
  },
  (error) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    const {
      data: { code, message },
    } = response

    switch (code) {
      case RES_CODE_OK:
        loading().close()
        return Promise.resolve(response.data)

      case RES_CODE_ERR:
        alert(message)
        loading().close()
        return Promise.reject(message)

      default:
        loading().close()
        return Promise.resolve(response.data)
    }
  },
  (error) => {
    loading().close()
    return Promise.reject(error)
  }
)

const http = {
  get: <T, D>(api: string, data?: D, config?: AxiosRequestConfig): Promise<T> =>
    instance.get(api, { data, ...config }),
  post: <T, D>(
    api: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> => instance.post(api, data, config),
}

export default http
