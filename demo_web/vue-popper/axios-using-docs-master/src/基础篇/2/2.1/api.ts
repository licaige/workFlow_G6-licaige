import { AxiosRequestConfig } from 'axios';
import { BackendResultFormat, CodeNotZeroError } from '../../../service/request';
import instance from '../../instance';

interface RequestConfig extends AxiosRequestConfig {
  url: NonNullable<AxiosRequestConfig['url']>;
}

const makeRequest = <T>(config: RequestConfig) => {
  return async (requestConfig?: Partial<RequestConfig>) => {
    const mergedConfig: RequestConfig = {
      ...config,
      ...requestConfig,
      headers: {
        ...config.headers,
        ...requestConfig?.headers,
      },
    };

    try {
      const response = await instance.request<BackendResultFormat<T>>(mergedConfig);
      const res = response.data;
      // 当返回对象的code不为0时，生成CodeNotZeroError的实例存放到err里返回出去
      if (res.code !== 0) {
        const error = new CodeNotZeroError(res.code, res.message);
        return { err: error, data: null, response };
      }
      return { err: null, data: res.data, response };
    } catch (err) {
      return { data: null, err, response: null };
    }
  };
};

const getNames = makeRequest<{ names: string[] }>({
  url: '/names',
  method: 'get',
});

const requestNames = async (search?: string) => {
  const { data, err } = await getNames({ params: { search } });
  if (err) return;
  setNames(data!.names);
};
