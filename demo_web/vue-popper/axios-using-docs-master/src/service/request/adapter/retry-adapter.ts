import { AxiosAdapter, AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { RequestConfig } from '..';

export interface RetryAdapterOption {
  retryTimes: number;
  retryInterval: number;
}

const judgeError = (error: any) => {
  return (
    error instanceof AxiosError &&
    (error.message.startsWith('timeout') || error.message.startsWith('Network Error'))
  );
};

const retryAdapter = (adapter: AxiosAdapter, retryAdapterOption?: Partial<RetryAdapterOption>) => {
  const retryTimes =
    retryAdapterOption?.retryTimes === undefined ? 3 : retryAdapterOption?.retryTimes;
  const retryInterval =
    retryAdapterOption?.retryInterval === undefined ? 500 : retryAdapterOption?.retryInterval;
  return (config: AxiosRequestConfig): Promise<AxiosResponse<any>> => {
    const { retry } = config as RequestConfig;
    if (retry) {
      let count = 0;
      let finalRetryTimes = retryTimes;
      let finalRetryInterval = retryInterval;
      if (typeof retry === 'object') {
        finalRetryTimes = typeof retry.retryTimes === 'number' ? retry.retryTimes : retryTimes;
        finalRetryInterval =
          typeof retry.retryInterval === 'number' ? retry.retryInterval : retryInterval;
      }
      const request = async (): Promise<AxiosResponse<any>> => {
        try {
          return await adapter(config);
        } catch (err) {
          if (!judgeError(err)) {
            return Promise.reject(err);
          }
          count++;
          if (count > finalRetryTimes) {
            return Promise.reject(err);
          }
          await new Promise((resolve) => {
            setTimeout(() => {
              resolve(null);
            }, finalRetryInterval);
          });
          return request();
        }
      };
      return request();
    } else {
      return adapter(config);
    }
  };
};

export default retryAdapter;
