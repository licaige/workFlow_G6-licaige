/*
 * @Descripttion:
 * @version:
 * @Author: chunwen
 * @Date: 2021-11-10 18:16:50
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-11 17:03:57
 */
import request from '@/utils/system/request'

// 登录api
export function loginApi(data) {
  return request({
    url: '/user/login',
    method: 'post',
    baseURL: '/mock',
    data,
  })
}

// 获取用户信息Api
export function getInfoApi(data) {
  return request({
    url: '/user/info',
    method: 'post',
    baseURL: '/mock',
    data,
  })
}

// 退出登录Api
export function loginOutApi() {
  return request({
    url: '/user/out',
    method: 'post',
    baseURL: '/mock',
  })
}

// 获取用户信息Api
export function passwordChange(data) {
  return request({
    url: '/user/passwordChange',
    method: 'post',
    baseURL: '/mock',
    data,
  })
}
