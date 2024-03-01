import http from './http'
import { type UserParams } from '@/models/instance'

const IndexHttp = {
  // 获取用户信息
  getUserInfo: (data: UserParams) => http.post(`/vue3/getUser`, data)
}

export { IndexHttp }
