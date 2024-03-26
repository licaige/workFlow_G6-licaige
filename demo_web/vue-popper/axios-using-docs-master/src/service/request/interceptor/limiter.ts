import type { BackendResultFormat, RequestConfig } from '..';
import type { AxiosResponse, AxiosError } from 'axios';

type ResolveFn = (value: unknown) => void;

const records: Record<string, { count: number; queue: ResolveFn[] }> = {};

const generateKey = (config: RequestConfig) => `${config.url}-${config.method}`;

const limiter = {
  request: {
    onFulfilled: async (config: RequestConfig) => {
      const { limit } = config;
      if (typeof limit === 'number') {
        const key = generateKey(config);
        if (!records[key]) {
          records[key] = {
            count: 0,
            queue: [],
          };
        }
        const record = records[key];
        record.count += 1;
        if (record.count <= limit) {
          return config;
        }
        await new Promise((resolve) => {
          record.queue.push(resolve);
        });
        return config;
      }
      return config;
    },
  },
  response: {
    onFulfilled: (response: AxiosResponse<BackendResultFormat>) => {
      const config = response.config as RequestConfig;
      const { limit } = config;
      if (typeof limit === 'number') {
        const key = generateKey(config);
        const record = records[key];
        record.count -= 1;
        if (record.queue.length) {
          record.queue.shift()!(null);
        }
      }
      return response;
    },
    onRejected: (error: AxiosError<BackendResultFormat>) => {
      const config = error.config as RequestConfig;
      const { limit } = config as RequestConfig;
      if (typeof limit === 'number') {
        const key = generateKey(config);
        const record = records[key];
        record.count -= 1;
        if (record.queue.length) {
          record.queue.shift()!(null);
        }
      }
      return error;
    },
  },
};

export default limiter;
