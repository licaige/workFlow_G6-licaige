import { AxiosAdapter, AxiosPromise } from 'axios';
import LRUCache from 'lru-cache'; // lru算法缓存对象
import { MemoryCache, generateReqUrlKey, isCacheObj, type IsCacheObj } from './utils';

declare module 'axios' {
	interface AxiosRequestConfig {
		forceUpdate?: boolean;
		cache?: boolean | IsCacheObj<any>;
	}
}

const FIVE_MINUTES = 1000 * 60 * 5;
const CAPACITY = 100;

export type Options = {
	enabledByDefault?: boolean;
	cacheFlag?: string;
	defaultCache?: IsCacheObj<AxiosPromise>;
};

export default function cacheAdapterEnhancer(adapter: AxiosAdapter, options: Options = {}): AxiosAdapter {
	const {
		// maxExpires,
		enabledByDefault = true,
		cacheFlag = 'cache',
		// defaultCache = MemoryCache,
		defaultCache = new LRUCache({ ttl: FIVE_MINUTES, max: CAPACITY }),
	} = options;

	return config => {
		const { url, method, params, paramsSerializer, forceUpdate } = config;

		const useCache = (config as any)[cacheFlag] !== void 0 && (config as any)[cacheFlag] !== null ? (config as any)[cacheFlag] : enabledByDefault;

		if (method === 'get' && useCache) {
			const cache: IsCacheObj<AxiosPromise> = isCacheObj(useCache) ? useCache : defaultCache;
			// 生成请求Key
			let requestKey = generateReqUrlKey({ url, method, params, paramsSerializer });
			let responsePromise = cache.get(requestKey); // 从缓存中获取请求key对应的响应对象

			if (!responsePromise || forceUpdate) {
				// 缓存未命中/失效或强制更新时，则重新请求数据

				responsePromise = (async () => {
					try {
						return await adapter(config); // 使用默认的xhrAdapter发送请求
					} catch (reason) {
						'delete' in cache ? cache.delete(requestKey) : cache.del(requestKey);
						throw reason;
					}
				})();

				cache.set(requestKey, responsePromise); // 保存请求返回的响应对象

				return responsePromise; // 返回已保存的响应对象
			}

			/* istanbul ignore next */
			if (process.env.LOGGER_LEVEL === 'info') {
				// eslint-disable-next-line no-console
				console.info(`[axios-extensions] request cached by cache adapter --> url: ${requestKey}`);
			}

			return responsePromise;
		}

		return adapter(config); // 使用默认的xhrAdapter发送请求
	};
}
