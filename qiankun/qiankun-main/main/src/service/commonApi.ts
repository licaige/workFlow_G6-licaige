import http from './http'

const commonApi = {
  // 获取动态路由
  getMenuList: () => http.post(`/common/getMenuList`),
}

export { commonApi }
