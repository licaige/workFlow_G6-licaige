// import type { AxiosResponse, AxiosError } from 'axios';
import { HttpAxios, type ReqOpts, type ResDataTypeMode } from 'axios-ajax-ts';
import type { ReqItem, ApiFnMap } from '../typings/axios';
import { message } from 'antd';
// import React, { useReducer, type Dispatch, type PropsWithChildren } from 'react';
import HistoryRule from '../router/history';

import { refreshToken } from './modules/auth';

const isProd = ['production', 'staging', 'testing'].includes(import.meta.env.MODE);
const envBaseUrl = import.meta.env.APP_API_BASE_URL;
const { HrefTo } = HistoryRule();
// export type UserResult = {
//   success: boolean
//   data: {
//     /** 用户名 */
//     username: string
//     /** `token` */
//     accessToken: string
//     /** 用于调用刷新`accessToken`的接口时所需的`token` */
//     refreshToken: string
//     /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
//     expires: Date
//   }
// }

export const httpAxios = new HttpAxios({
	isProd,
	envBaseUrl: isProd ? envBaseUrl : import.meta.env.BASE_URL,
	// envUploadUrl: '',
	// envTokenKey: 'access_token',
	// envRefreshKey?: string,
	// router: any;
	// store: any;
	// loading?: ((target: string) => void);
	// closeLoading?: any | (() => void);
	message,
	goToLogin: () => HrefTo('/auth/login'),
	refreshTokenFn: refreshToken,
});

export function asyncApi(req: ReqItem) {
	const { headers, url, method, authtoken } = req;

	return async <G = any>(opts: ReqOpts, sucmsg?: string, errmsg?: string): Promise<false | G | undefined> => {
		let queryData = JSON.parse(JSON.stringify(opts));
		console.log('api-opts:', opts);

		if (authtoken) {
			queryData = {
				...queryData,
				authtoken,
			};
		}

		try {
			const { code, data }: ResDataTypeMode<G> = await httpAxios.ajax({
				method: method || 'get',
				// url: (opts && opts.paramId) ? (url + opts.paramId) : url,
				url: opts?.paramId ? url + opts.paramId : url,
				headers: (headers as any) || {},
				...queryData,
			});
			if (code === 'success') {
				if (sucmsg) {
					message.success(sucmsg);
				}
				return data;
			}
		} catch (error: any) {
			message.error(`${error.message ? `${error.message},` : undefined}${errmsg}`);
			return false;
		}
	};
}

export function asyncModuleApi(reqs: ReqItem[]) {
	const apiFnMap: ApiFnMap = {};
	// this.reqlis.forEach((req: any) => {
	for (const req of reqs) {
		const { name } = req;

		apiFnMap[name!] = asyncApi(req);
	}

	return apiFnMap;
}
