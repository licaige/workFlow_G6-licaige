import { AxiosRequestConfig } from 'axios';
import Qs from 'qs';

/** 序列化请求等待参数 */
export function generateReqUrlKey(config: AxiosRequestConfig) {
	const { method, url, params, data } = config;
	return [method, url, Qs.stringify(params), Qs.stringify(data)].join('&');
}

/** 判断值是否为某个类型 */
export function isTypeFn(val: unknown, type: string) {
	return toString.call(val) === `[object ${type}]`;
}

/** 是否为函数 */
export function isFunction<T = Function>(val: unknown): val is T {
	return isTypeFn(val, 'Function');
}

export type IsCacheObj<T> = {
	get(key: string): T | undefined;
	set(key: string, value: T): void;
} & ({ del(key: string): void } | { delete(key: string): void });

export function isCacheObj(cache: any): cache is IsCacheObj<any> {
	return typeof cache.get === 'function' && typeof cache.set === 'function' && (typeof cache.delete === 'function' || typeof cache.del === 'function');
}

export const MemoryCache = {
	data: {},
	set(key, value, maxAge) {
		// 保存数据
		this.data[key] = {
			maxAge: maxAge || 0,
			value,
			now: Date.now(),
		};
	},
	get(key) {
		// 从缓存中获取指定 key 对应的值。
		const cachedItem = this.data[key];
		if (!cachedItem) return null;
		const isExpired = Date.now() - cachedItem.now > cachedItem.maxAge;
		isExpired && this.delete(key);
		return isExpired ? null : cachedItem.value;
	},
	delete(key) {
		// 从缓存中删除指定 key 对应的值。
		return delete this.data[key];
	},
	clear() {
		// 清空已缓存的数据。
		this.data = {};
	},
};

export function isPlainObject(val: any): val is Object {
	return toString.call(val) === '[object Object]';
}

export function isFormData(val: any): val is Object {
	return typeof val !== 'undefined' && val instanceof FormData;
}
