import { RootObject } from '@/model/rootObject'
import https from '@/utils/https'
import { userModel } from '@/views/user/model/userModel'
import { ContentType, Method } from 'axios-mapper'

export const fetchAdminInfo = () => {
  return https(false).request<RootObject<userModel>>(
    '/userinfo',
    Method.GET,
    undefined,
    ContentType.json,
  )
}
