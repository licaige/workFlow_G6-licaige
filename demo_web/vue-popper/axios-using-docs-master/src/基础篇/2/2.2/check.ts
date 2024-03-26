import { makeRequest } from './api';

/**
 * @description 只定义Payload生成的请求函数
 */
const getNamesBySearch = makeRequest<{ names: string[] }>({
  url: '/names',
  method: 'get',
});
// ts校验通过情况
// 没有传入config
getNamesBySearch();
// 传入config也不会报错
getNamesBySearch({});
getNamesBySearch({ params: { search: '1' } });

/**
 * @description 定义Payload,Data生成的请求函数
 */
const register = makeRequest<null, { username: string; password: string }>({
  url: '/register',
  method: 'post',
});

// ts报错情况
// 没有传入config
register();
// 没有传入config.data
register({});
// 没有传入config.data.password
register({
  data: { username: 'admin' },
});
//  config.data.username和config.data.password类型错误
register({
  data: {
    username: null,
    password: 123,
  },
});

// ts校验通过情况
register({
  data: { username: 'admin', password: 'admin' },
});

/**
 * @description 定义Payload和Data和Param生成的请求函数
 */
const changePassword = makeRequest<null, { password: string }, { username: string }>({
  url: '/password',
  method: 'put',
});

// ts报错情况
// 没传config
changePassword();
// 没传config.data和config.params
changePassword({});
// 没传config.data.password和config.params.username
changePassword({
  data: {},
  params: {},
});
// 没传config.data.password或config.params.username
changePassword({
  data: {
    password: '123',
  },
  params: {},
});
changePassword({
  data: {},
  params: {
    username: 'admin',
  },
});

// ts校验通过情况
changePassword({
  data: { password: '123' },
  params: { username: 'admin' },
});

/**
 * @description 只定义Payload，Param生成的请求函数
 */
const unregister = makeRequest<null, undefined, { username: string }>({
  url: '/unregister',
  method: 'delete',
});

// ts通过情况
unregister({
  params: {
    username: 'admin',
  },
});
