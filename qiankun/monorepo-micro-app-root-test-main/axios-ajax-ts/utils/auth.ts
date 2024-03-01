import { cookiesFn, storageSessionFn } from './storagecookies/index';

const { get: getCookie, set: setCookie, remove: delCookie } = cookiesFn;
const { get: getSession, set: setSession, remove: delSession, clear: clearSession } = storageSessionFn;

export interface AuthInfo<T> {
	/** token */
	accessToken: string;
	/** 用于调用刷新accessToken的接口时所需的key */
	refreshToken: string;
	/** refreshToken 的过期时间  */
	expires: T;
}

/** 格式化token（jwt格式） */
export const formatToken = (token: string): string => {
	return 'Bearer ' + token;
};

// 从sessionStorage中获取token
export function getUserToken(tokenkey: string = 'user_token', refreshkey: string = 'refresh_key'): any {
	// clearCookie('user_token');
	const userToken = getSession(tokenkey);
	return {
		accessToken: userToken ? userToken : '',
		refreshToken: getCookie(refreshkey),
	};
}

export function setToken(data: AuthInfo<string | number>, tokenkey: string = 'user_token', refreshkey: string = 'refresh_key') {
	// | Date
	const { accessToken, refreshToken, expires } = data;
	// 如果后端直接设置时间戳，将此处代码改为expires = data.expires，然后把上面的AuthInfo<Date>改成AuthInfo<number>即可
	// let expires = new Date(data.expires).getTime();
	// const cookieString = JSON.stringify({ accessToken, expires });
	// setCookie(tokenKey, cookieString, expires);
	// {
	// 	expires: (expires - Date.now()) / 86400000,
	// });
	delSession(tokenkey);
	setSession(tokenkey, accessToken);
	setCookie(refreshkey, {
		refreshToken,
		expires,
	});
}

export function removeToken(tokenkey: string = 'user_token', refreshkey: string = 'refresh_key'): void {
	delSession(tokenkey);
	delCookie(refreshkey);
}

export function updateRefreshToken(rfdata: AuthInfo<any>, tokenkey?: string, refreshkey?: string) {
	const { accessToken, refreshToken, expires } = rfdata;
	if (accessToken && refreshToken && expires) {
		removeToken(tokenkey, refreshkey);
		setToken({ accessToken, refreshToken, expires }, tokenkey, refreshkey);
	}
}
