import { AxiosError, AxiosResponse } from 'axios';
import { BackendResultFormat, RequestConfig } from '..';

export type SameAbort = boolean | { key: object };

const DEFAULT_KEY = {};

const record = new WeakMap<object, Record<string, AbortController | null>>();

const generateUrlKey = ({ url, method, args }: RequestConfig) =>
  `${url}~${method}~${JSON.stringify(args)}`;

const sameAborter = {
  request: {
    onFulfilled: (config: RequestConfig) => {
      const { sameAbort } = config;
      if (sameAbort) {
        const key = typeof sameAbort === 'object' ? sameAbort.key : DEFAULT_KEY;
        if (!record.has(key)) {
          record.set(key, {});
        }
        const componentRecord = record.get(key)!;
        const urlKey = generateUrlKey(config);
        if (componentRecord[urlKey]) {
          // TODO 查看源码 决定是否加await
          componentRecord[urlKey]!.abort();
        }
        const controller = new AbortController();
        componentRecord[urlKey] = controller;
        config.signal = controller.signal;
      }
      return config;
    },
  },
  response: {
    onFulfilled: (response: AxiosResponse<BackendResultFormat>) => {
      const config = response.config as RequestConfig;
      const { sameAbort } = config;
      if (sameAbort) {
        const key = typeof sameAbort === 'object' ? sameAbort.key : DEFAULT_KEY;
        const componentRecord = record.get(key)!;
        const urlKey = generateUrlKey(config);
        componentRecord[urlKey] = null;
      }
      return response;
    },
    onRejected: (error: AxiosError<BackendResultFormat>) => {
      const config = error.config as RequestConfig;
      const { sameAbort } = config;
      if (sameAbort) {
        const key = typeof sameAbort === 'object' ? sameAbort.key : DEFAULT_KEY;
        const componentRecord = record.get(key)!;
        const urlKey = generateUrlKey(config);
        componentRecord[urlKey] = null;
      }
      return error;
    },
  },
};

export default sameAborter;
