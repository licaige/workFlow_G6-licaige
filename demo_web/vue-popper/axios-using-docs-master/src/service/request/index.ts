import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

import notify from './interceptor/notify';
import limiter from './interceptor/limiter';
import urlArgs from './interceptor/url-args';
import sameAborter from './interceptor/same-aborter';
import { SameAbort } from './interceptor/same-aborter';

import { cacheAdapterEnhancer } from 'axios-extensions';
import { RetryAdapterOption } from './adapter/retry-adapter';

/**
 * @description 先不写类型，因为比较繁琐
 */
export function compose(adapters: any[]) {
  return adapters.reduceRight((pre, cur) => cur(pre));
}

const instance = axios.create({
  timeout: 10000,
  baseURL: '/api',
  adapter: cacheAdapterEnhancer(axios.defaults.adapter!, { enabledByDefault: false }),
  // adapter: compose([
  //   cacheAdapter({ cacheAge: 5000 }),
  //   retryAdapter({ retryTimes: 3, retryInterval: 1000 }),
  //   axios.defaults.adapter,
  // ]),
});

instance.interceptors.response.use(notify.response.onFulfilled, notify.response.onRejected);
instance.interceptors.request.use(
  // @ts-ignore
  limiter.request.onFulfilled,
  undefined,
);
instance.interceptors.response.use(limiter.response.onFulfilled, limiter.response.onRejected);
instance.interceptors.request.use(urlArgs.request.onFulfilled, undefined);
// @ts-ignore
instance.interceptors.request.use(sameAborter.request.onFulfilled, undefined);
instance.interceptors.response.use(
  sameAborter.response.onFulfilled,
  sameAborter.response.onRejected,
);

export class CodeNotZeroError extends Error {
  code: number;

  constructor(code: number, message: string) {
    super(message);
    this.code = code;
  }
}

export interface ResultFormat<T = any> {
  data: null | T;
  err: AxiosError | CodeNotZeroError | null;
  response: AxiosResponse<T> | null;
}

export interface BackendResultFormat<T = any> {
  code: number;
  data: T;
  message: string;
}

export interface RequestConfig extends AxiosRequestConfig {
  url: NonNullable<AxiosRequestConfig['url']>;
  desc?: string;
  notifyWhenSuccess?: boolean;
  notifyWhenFailure?: boolean;
  limit?: number;
  args?: Record<string, any>;
  sameAbort?: SameAbort;
  retry?: boolean | Partial<RetryAdapterOption>;
}

/**
 * 允许定义三个泛型参数：
 *    Payload为响应数据
 *    Data为请求体参数，对应config.data
 *    Params对应URL的请求参数，对应config.params
 */
interface MakeRequest {
  <Payload = any>(config: RequestConfig): (
    requestConfig?: Partial<RequestConfig>,
  ) => Promise<ResultFormat<Payload>>;

  <Payload, Data>(config: RequestConfig): (
    requestConfig: Partial<Omit<RequestConfig, 'data'>> & { data: Data },
  ) => Promise<ResultFormat<Payload>>;

  <Payload, Data, Params>(config: RequestConfig): (
    requestConfig: Partial<Omit<RequestConfig, 'data' | 'params'>> &
      (Data extends undefined ? { data?: undefined } : { data: Data }) & { params: Params },
  ) => Promise<ResultFormat<Payload>>;

  <Payload, Data, Params, Args>(config: RequestConfig): (
    requestConfig: Partial<Omit<RequestConfig, 'data' | 'params' | 'args'>> &
      (Data extends undefined ? { data?: undefined } : { data: Data }) &
      (Params extends undefined ? { params?: undefined } : { params: Params }) & {
        args: Args;
      },
  ) => Promise<ResultFormat<Payload>>;
}

const makeRequest: MakeRequest = <T>(config: RequestConfig) => {
  return async (requestConfig?: Partial<RequestConfig>) => {
    // 合并在service中定义的option和调用时从外部传入的option
    const mergedConfig: RequestConfig = {
      ...config,
      ...requestConfig,
      headers: {
        ...config.headers,
        ...requestConfig?.headers,
      },
    };
    // 统一处理返回类型
    try {
      const response: AxiosResponse<BackendResultFormat<T>, RequestConfig> = await instance.request<
        BackendResultFormat<T>
      >(mergedConfig);
      const res = response.data;
      if (res.code !== 0) {
        const error = new CodeNotZeroError(res.code, res.message);
        return { err: error, data: null, response };
      }
      return { err: null, data: res.data, response };
    } catch (err: any) {
      return { err, data: null, response: null };
    }
  };
};

export default makeRequest;
