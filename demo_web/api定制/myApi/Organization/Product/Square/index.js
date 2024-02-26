import myAxios from '@/myApi/axios.js'
import { v1 } from '@api/url_prefix'
import { session } from '@utils/session/index.js'
const { userInfo } = session
// 标签管理-一级标签列表
export function getFirstLabels (params) {
  return myAxios({
    url: `${v1}/org/${userInfo().organization.id}/category`,
    method: 'get',
    params
  })
}
// 标签管理-二级标签列表
export function getSecondLabels (categoryId, params) {
  return myAxios({
    url: `${v1}/org/${userInfo().organization.id}/category/${categoryId}/second`,
    method: 'get',
    params
  })
}

// 标签管理-新增一级标签
export function addFirstLabels (data) {
  return myAxios({
    url: `${v1}/org/${userInfo().organization.id}/category`,
    method: 'POST',
    data
  })
}

// 标签管理-新增二级标签
export function addSecondLabels (categoryId, data) {
  return myAxios({
    url: `${v1}/org/${userInfo().organization.id}/category/${categoryId}/second`,
    method: 'POST',
    data
  })
}

// 标签管理-编辑标签
export function editLabels (categoryId, data) {
  return myAxios({
    url: `${v1}/org/${userInfo().organization.id}/category/${categoryId}`,
    method: 'PUT',
    data
  })
}

// 标签管理-删除标签
export function deleteLabels (categoryId) {
  return myAxios({
    url: `${v1}/org/${userInfo().organization.id}/category/${categoryId}`,
    method: 'delete'
  })
}
// 标签树形结构  标签类型，1-数据，2-模型，3-组件, 7-产品
export function getTreeLabels (params) {
  return myAxios({
    url: `${v1}/org/${userInfo().organization.id}/category/tree`,
    method: 'get',
    params
  }, {
    repeat_request_cancel: true
    // loading: true
    // params: true
  }, {
    text: '获取列表数据....'
  })
}

// 广场管理-数据列表
export function getList (params) {
  return myAxios({
    url: `${v1}/org/${userInfo().organization.id}/plaza/data`,
    method: 'get',
    params
  }, {
    repeat_request_cancel: true
    // loading: true
    // params: true
  }, {
    text: '获取列表数据....'
  })
}
// 修改分享
export function editShare (data) {
  return myAxios({
    url: `${v1}/org/${userInfo().organization.id}/plaza/share`,
    method: 'PUT',
    data
  })
}

// 创建分享
export function creatShare (data) {
  return myAxios({
    url: `${v1}/org/${userInfo().organization.id}/plaza/share`,
    method: 'POST',
    data
  })
}
