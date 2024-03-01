import { asyncApi } from '../index';
// import type { ApiFnMap } from '../../typings';

/**
 * 登录接口
 */
export function loginApi() {
	return asyncApi({
		url: '/auth/login',
		method: 'post',
	});
}

/**
 * 登出api
 */
export function logoutApi() {
	return asyncApi({
		url: '/auth/logout',
		method: 'post',
	});
}

// 更新刷新token
export function refreshToken() {
	return asyncApi({
		url: '/auth/refreshToken',
		method: 'post',
	});
}

// export async function fetchRefreshToken(token: string, message: (obj: object) => void): Promise<any> {
// 	try {
// 		const resData: any = await httpAxios.ajax({
// 			url: '/auth/refreshToken',
// 			method: 'post',
// 			data: {
// 				token,
// 			},
// 		});
// 		const {
// 			code,
// 			data: { user_token, refresh_key, expires },
// 		} = resData;
// 		if (code === 'success') {
// 			// return {
// 			//   user_token,
// 			//   refresh_key,
// 			//   expires
// 			// };
// 		}
// 	} catch (error: any) {
// 		message({
// 			type: 'error',
// 			content: `${error.message || 'token更新失败！'}`,
// 		});
// 	}
// }
