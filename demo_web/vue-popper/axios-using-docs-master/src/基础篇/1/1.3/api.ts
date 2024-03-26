import { AxiosRequestConfig } from 'axios';
import { BackendResultFormat, CodeNotZeroError } from '../../../service/request';
import instance from '../../instance';

interface RequestConfig extends AxiosRequestConfig {
  url: NonNullable<AxiosRequestConfig['url']>;
}

const makeRequest = <T>(config: RequestConfig) => {
  return async () => {
    try {
      const response = await instance.request<BackendResultFormat<T>>(config);
      const res = response.data;
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

const getAdmins = makeRequest<{ admins: string[] }>({
  url: '/admins',
  method: 'get',
});

export default getAdmins;
