import { RootObject } from '@/model/rootObject'
import https from '@/utils/https'
import { LoginModel } from '@/views/login/model/loginModel'
import { RequestParams, ContentType, Method } from 'axios-mapper'

export const loginRequest = (userInfo: RequestParams) => {
  return https(false).request<RootObject<LoginModel>>(
    '/login',
    Method.POST,
    userInfo,
    ContentType.json,
  )
}
