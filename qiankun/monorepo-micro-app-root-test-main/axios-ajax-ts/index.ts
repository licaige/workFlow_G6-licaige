import Axios, {
	type AxiosInstance,
	type AxiosRequestTransformer,
	type AxiosResponseTransformer,
	type AxiosRequestConfig,
	// type AxiosResponse,
	// AxiosError,
} from 'axios';
import qs from 'qs';

// import { addPendingRequest, removePendingRequest } from './utils/cancelRepeatRquest'; // 取消重复请求
// import { againRequest } from './utils/requestAgainSend'; // 请求重发
// import {
// 	requestInterceptor as cacheReqInterceptor,
// 	responseInterceptor as cacheResInterceptor,
// } from './utils/requestCache';
import type {
	NewAxiosReqConfig,
	NewInternalAxiosReqConfig,
	NewAxiosResponse,
	NewAxiosError,
	ReqOptsConfig,
	ResDataTypeMode,
	ExtraTypeOpts,
	UploadFileItemType,
	UploadReqConfig,
} from './types';

import { isPlainObject } from './utils/index';
import { getUserToken, formatToken } from './utils/auth';
import { handleErrorFn, handleErrMessage } from './utils/do-errs';
// import CookieStorage from './utils/storagecookies/index';
import { showLoading, hideLoading } from './utils/loading';

import { StreamPost, StreamGet, convertRes2Blob } from './upDownloadFile';
import { FetchCacheCanceler } from './fetchCacheCancel';

// 是否开启请求锁。
let fetchLock = true;
// 是否静态提示信息
let $quietMsg = false;

const fetchCacheCanceler = new FetchCacheCanceler();

export class HttpAxios {
	// 基础默认配置
	axiosConfig: NewAxiosReqConfig = {
		baseURL: '/', // isProd ? envBaseUrl : import.meta.env.BASE_URL,
		// 是否跨域携带cookie
		withCredentials: true,
		// 请求超时
		timeout: 10 * 1000,
		headers: {
			// 'x-channel': 'PC',
			/**
			 * 'no-store' 客户端完全不缓存响应;
			 * 'must-revalidate' 使用缓存前先校验一遍(注：浏览器的后退前进功能,缓存过期不会revalidate);
			 * ‘no-cache'，并不是指不能用cache，客户端仍会把带有no-cache的响应缓存下来，只不过每次不会直接用缓存，而得先revalidate */
			'Cache-Control': 'no-cache', // 'max-age=86400, must-revalidate' // “再次校验”
			// Expires: 0,
			'accept-language': 'zh-cn,zh',
			// Accept: 'application/json, text/plain, */*',
			// 'Content-Type': 'application/json',
			'X-Requested-With': 'XMLHttpRequest',
			// withCredentials: false, // default
		},
	};
	// 来自前端框架和项目相关的额外配置
	otherOpts: ExtraTypeOpts;
	axiosInstance: AxiosInstance;
	loading: boolean;

	constructor(options: ExtraTypeOpts, config?: AxiosRequestConfig) {
		// axios实例配置
		this.axiosConfig = {
			...this.axiosConfig,
			...config,
			transformRequest: [
				...(Axios.defaults.transformRequest as AxiosRequestTransformer[]),
				(data: any, headers: any): any => {
					if (!headers.isFormdata || headers['Content-Type'] === 'application/json') {
						headers.post['Content-Type'] = 'application/json';
						headers.put['Content-Type'] = 'application/json';
						headers.patch['Content-Type'] = 'application/json';
						if (isPlainObject(data)) {
							return JSON.stringify(data);
						}
						return data;
					}
					// 参数序列化
					return qs.stringify(data);
				},
			],
			transformResponse: [
				...(Axios.defaults.transformResponse as AxiosResponseTransformer[]),
				(data: any): any => {
					if (typeof data === 'string') {
						try {
							data = JSON.parse(data);
						} catch (e) {
							/* Ignore */
						}
					}
					return data;
				},
			],
		};
		// this.loading = options.loading ?? true;
		/** 保存当前Axios实例对象 */
		this.axiosInstance = Axios.create(this.axiosConfig);
		this.otherOpts = options;
		this.loading = options.loading ?? true;
		// 配置请求拦截器
		this.interceptorsRequest();
		// 配置响应拦截器
		this.interceptorsResponse();
	}

	/** token过期后，暂存待执行的请求 */
	public static requests = [] as any[];

	/** 是否正在刷新请求token, 防止重复刷新 */
	public static isRefreshToken = false;

	//当前正在请求的数量
	public static loadingReqCount = 0;

	/** 重连原始请求 */
	public static retryOrigRequest(config: NewInternalAxiosReqConfig, tokenkey: string | undefined) {
		return new Promise(resolve => {
			this.requests.push((token: string) => {
				config.headers![tokenkey || 'Authorization'] = formatToken(token);
				resolve(config);
			});
		});
	}

	/** 请求拦截器 */
	private interceptorsRequest() {
		// 设置请求拦截器
		this.axiosInstance.interceptors.request.use(
			// <T extends InternalAxiosRequestConfig>
			(config: NewInternalAxiosReqConfig): NewInternalAxiosReqConfig | Promise<NewInternalAxiosReqConfig> => {
				// NProgress.start();
				// 有loading组件则显示
				if (this.loading) {
					showLoading(HttpAxios, this, config?.loadTarget);
				}

				/** 请求白名单，放置一些不需要token的接口（通过设置请求白名单，防止token过期后再请求造成的死循环问题） */
				const whiteList = ['/refreshToken', '/auth/login'];
				if (whiteList.some(v => config?.url!.indexOf(v) > -1)) {
					return config;
				}

				// 是否静态提示响应信息
				$quietMsg = config.quiet ? config.quiet : false;
				// 请求锁
				fetchLock = config.fetchLock !== undefined ? config.fetchLock : true;

				if (fetchLock) {
					fetchCacheCanceler.addPending(config);
				}

				// 判断是否需要token，如果存在的话，则每个http header都加上token
				if (config.authtoken) {
					let getTokenKey = getUserToken(this.otherOpts?.envTokenKey, this.otherOpts?.envRefreshKey); // localStorage.getItem('user_token');
					getTokenKey.accessToken && config.headers && (config.headers[this.otherOpts?.envTokenKey || 'Authorization'] = formatToken(getTokenKey.accessToken));
					Reflect.deleteProperty(config, 'authtoken');
				}

				// 处理请求之前的配置
				console.log('interceptors_config:', config);
				return config;
			},
			(error: NewAxiosError) => {
				// 有loading组件则关闭
				if (this.loading) {
					hideLoading(HttpAxios, this);
				}
				// 请求错误处理
				console.log('request_err:', error);
				return Promise.reject(error);
			},
			{
				/**
				 * synchronous: 是否同步, false
				 * runWhen: 接收一个类型为NewInternalAxiosReqConfig的 config 参数，返回一个 boolean。
				 * 触发时机为每次请求触发拦截器之前，当runWhen返回true, 则执行本请求拦截器里的方法, 否则不执行
				 **/
				synchronous: this.axiosConfig?.isSync || false, // 默认异步 Async
				runWhen: (config: NewInternalAxiosReqConfig): boolean => {
					// if return true, axios will execution interceptor method
					if (!config?.isSync) return true;
					return false;
				},
			},
		);
	}

	/** 响应拦截器 */
	private interceptorsResponse() {
		// 设置响应拦截器
		this.axiosInstance.interceptors.response.use(
			(response: NewAxiosResponse): NewAxiosResponse | Promise<NewAxiosResponse> | any => {
				// NProgress.done();
				// return response.data;

				const { status, headers, config, data } = response || {};
				// responseLock(response.config);
				if (fetchLock) {
					// ApiCache.deleteTask(config, false);
					// ApiCache.updateCach(response);
					fetchCacheCanceler.removePending(response.config);
				}

				// 处理字节流
				if (headers && headers['content-type'] === 'application/octet-stream') {
					if (config.method === 'post') {
						StreamPost(config);
					} else if (config.method === 'get') {
						if (config.readType === 'dowload') {
							convertRes2Blob(response);
						} else {
							// StreamGet(config);
							convertRes2Blob(response, 'read');
						}
						// return response;
					}
					return; // | false
				}

				// 后端约定当4013时表示token过期了，要求刷新token
				// if (data.code === 4013) {
				// }

				if (status && status !== 200) {
					// 追踪错误信息
					!$quietMsg && handleErrMessage(this.otherOpts, data.message, headers.traceId);
					return Promise.reject(new Error(data.message || '系统错误，稍后再试'));
				}

				// 处理响应数据
				!this.otherOpts.isProd && console.log('interceptors.res:', data);

				// 有loading组件则关闭
				if (this.loading) {
					hideLoading(HttpAxios, this);
				}

				return response;
			},
			(error: NewAxiosError<ResDataTypeMode, any>) => {
				// NProgress.done();
				console.log('interceptors-err:', error);
				if (Axios.isCancel(error)) {
					// 中断promise链接
					return new Promise(() => null);
				}

				const {
					// code,
					status,
					response,
					message,
				} = error;

				if (error && response && status) {
					handleErrorFn(error, status, HttpAxios, this.otherOpts);
				}
				const { headers }: any = response;
				// 追踪错误信息
				!$quietMsg && handleErrMessage(this.otherOpts, message, headers?.traceId);

				// 有loading组件则关闭
				if (this.loading) {
					hideLoading(HttpAxios, this);
				}

				// 处理响应失败
				return Promise.reject(error);
			},
		);
	}

	/** 定义通用请求方法 */
	// public ajax<T>(opts: ReqOptsConfig): Promise<T> {
	// return new Promise((resolve, reject) =>
	// 	this.axiosInstance(config)
	// 		.then(response => {
	// 			const { status, data } = response;
	// 			const success = status === 200 ? true : false;
	// 			if (!success && typeof window !== 'undefined') {
	// 				throw '系统错误或找不到window对象！';
	// 			}
	// 			resolve(data);
	// 		})
	// 		.catch(error => {
	// 			reject(error);
	// 		}),
	// ); }

	public ajax<T = any, R = NewAxiosResponse<ResDataTypeMode<T>, any>, D = any>(opts: ReqOptsConfig<D>): Promise<R> {
		const { headers, url, method, authtoken, params, data } = opts;

		const config = {
			method: method || 'get',
			// url: (opts && opts.paramId) ? (url + opts.paramId) : url,
			url: opts?.paramId ? opts.url + opts.paramId : url,
			headers: (headers as any) || {}, // isFormdata在headers里
			authtoken,
			params,
			data,
			// ...requestConfig,
		} as NewAxiosReqConfig<D>;

		// return this.axiosInstance.request<ResDataTypeMode<T>, R, D>(config);
		return new Promise((resolve, reject) =>
			this.axiosInstance
				.request<ResDataTypeMode<T>, R, D>(config)
				.then((response: R): NewAxiosResponse['data'] => {
					const { status, data }: any = response;
					const success = status === 200 ? true : false;
					if (!success && typeof window !== 'undefined') {
						throw '系统错误或找不到window对象！';
					}
					resolve(data as NewAxiosResponse['data']);
				})
				.catch(error => {
					reject(error);
				}),
		);
	}

	public get<T = any, R = NewAxiosResponse<ResDataTypeMode<T>, any>, D = any>(opts: ReqOptsConfig<D>): Promise<R> {
		return this.ajax({ method: 'GET', ...opts });
	}
	public post<T = any, R = NewAxiosResponse<ResDataTypeMode<T>, any>, D = any>(opts: ReqOptsConfig<D>): Promise<R> {
		return this.ajax({ method: 'POST', ...opts });
	}
	public put<T = any, R = NewAxiosResponse<ResDataTypeMode<T>, any>, D = any>(opts: ReqOptsConfig<D>): Promise<R> {
		return this.ajax({ method: 'PUT', ...opts });
	}
	public delete<T = any, R = NewAxiosResponse<ResDataTypeMode<T>, any>, D = any>(opts: ReqOptsConfig<D>): Promise<R> {
		return this.ajax({ method: 'DELETE', ...opts });
	}
	public upload<T = string, R = NewAxiosResponse<ResDataTypeMode<T>, any>>(fileItem: UploadFileItemType, opts?: UploadReqConfig): Promise<R> | null {
		if (!this.otherOpts?.envUploadUrl) return null;

		let uploadFD = new FormData();
		uploadFD.append(fileItem.name, fileItem.value);

		let uploadOpts: UploadReqConfig;
		if (!opts) {
			uploadOpts = {
				method: 'POST',
				url: this.otherOpts?.envUploadUrl,
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			};
		} else {
			opts.headers!['Content-Type'] = 'multipart/form-data';
			uploadOpts = { method: 'POST', ...opts, url: this.otherOpts?.envUploadUrl + opts.url };
		}
		return this.ajax({ ...uploadOpts, data: uploadFD });
	}
}

// export const httpAxios = new HttpAxios();
