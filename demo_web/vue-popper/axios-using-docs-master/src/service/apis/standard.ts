import makeRequest from '../request';

export default {
  getAdmins: makeRequest<{ admins: string[] }>({
    url: '/admins',
    desc: '获取管理员列表',
  }),

  register: makeRequest<null, { username: string; password: string }>({
    url: '/register',
    method: 'post',
    desc: '注册新用户',
  }),

  updatePassword: makeRequest<null, { password: string }, { username: string }>({
    url: '/password',
    method: 'put',
    desc: '更换密码',
  }),

  getDelay: makeRequest({
    url: '/delay',
    desc: '延时测试请求',
  }),

  getAccount: makeRequest<
    { id: string; name: string; role: string },
    undefined,
    undefined,
    { username: string }
  >({
    url: '/account/{username}',
    desc: '获取账号详情信息',
  }),
};
