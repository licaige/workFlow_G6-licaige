import type { ExtraTypeOpts, UploadFileItemType, UploadReqConfig } from '../types';
import { getUserToken, removeToken, updateRefreshToken } from './auth';

// 错误状态信息
export const errStatusInfo: object = {
	302: '接口重定向了',
	400: '错误请求', // '参数不正确！'
	401: '未授权，或者登录已经超时，请先登录', // 指示身份验证是必需的，没有提供身份验证或身份验证失败。 如果请求已经包含授权凭据（过期了），那么401状态码表示不接受这些凭据。
	403: '拒绝访问，没有权限操作', // 指示尽管请求有效，但服务器拒绝响应它。 与401状态码不同，提供身份验证不会改变结果。
	404: '请求出错，未找到资源',
	405: '请求方法未允许',
	408: '请求超时',
	409: '系统已存在相同数据',
	500: '服务端出错',
	501: '服务未实现',
	502: '网络错误',
	503: '服务不可用',
	504: '网络超时', // '服务暂时无法访问，请稍后再试！'
	505: 'http版本不支持该请求',
};

export const doneErrStatusMap = (fhttp: any, extra: ExtraTypeOpts) =>
	new Map([
		[
			401,
			(response: { headers?: any; config?: any; code?: any }) => {
				// const authErrCodes: any = {
				//   40101: 'access_token失效，需要重新登录',
				//   40102: 'refresh_token无效,需要更新token',
				//   40103: '账户未绑定角色，请联系管理员绑定角色',
				//   40104: '该用户未注册，请联系管理员注册用户',
				//   40105: 'code 无法获取对应第三方平台用户',
				//   40106: '该账户未关联手机，请联系管理员做关联',
				//   40107: '账号已无效',
				//   40108: '账号未找到',
				// }

				if (response.headers.authorization) {
					const { config, code } = response;
					return new Promise(async resolve => {
						if (!fhttp.isRefreshToken) {
							fhttp.isRefreshToken = true;

							try {
								const refreshData = await extra.refreshTokenFn(getUserToken(extra?.envTokenKey, extra?.envRefreshKey).accessToken);
								updateRefreshToken(refreshData, extra?.envTokenKey, extra?.envRefreshKey);
								// 已经刷新了token，将所有队列中的请求进行重试
								fhttp.requests.forEach((cb: any) => cb(getUserToken().accessToken));
								fhttp.requests = [];

								// 重试当前请求并返回promise
								resolve(fhttp.retryOrigRequest(config, extra?.envTokenKey) as any);
							} catch (err) {
								console.error('refreshtoken error =>', err);
								// window.location.href = '/';
								// 返回 401 清除过期token信息并跳转到登录页
								removeToken();
								extra.goToLogin();
								return Promise.reject();
							}

							fhttp.isRefreshToken = false;
						}
						resolve(fhttp.axiosInstance(config) as any);
					});
				}

				// 返回 401 清除过期token信息并跳转到登录页
				return extra.goToLogin();
			},
		],
		[
			403,
			(response: any) => {
				if (response.headers.authorization) {
					// getRefreshToken();
					// $store.dispatch('auth/update');
				}
			},
		],
	]);

export const handleErrorFn = (error: any, status: number, fhttp: any, extra: ExtraTypeOpts) => {
	let errMsg: string = (errStatusInfo as any)[status] || `服务连接出错${status}`;
	if (error.response) {
		// const ErrRes = error.response  data
		!extra.isProd && console.log('interceptors.err:', error.response, error.config);
		// error.response.msg = errMsg + '，请检查网络或联系管理员！';
		doneErrStatusMap(fhttp, extra).get(status)!(error.response);
	}
	error.message = errMsg + '，请检查网络或联系管理员！';
};

export const handleErrMessage = (extra: ExtraTypeOpts, msg: string, traceId = '') => {
	extra?.message({
		type: 'error',
		content: `${msg}${traceId}` || '系统错误，稍后再试',
		duration: 5,
	});
};
