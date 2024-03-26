import { AxiosRequestConfig } from 'axios';
import instance from '../../../instance';

interface RequestConfig extends AxiosRequestConfig {
  url: NonNullable<AxiosRequestConfig['url']>;
  method?: AxiosRequestConfig['method'];
}

const makeRequest = <T>(config: RequestConfig) => {
  return async () => {
    try {
      const response = await instance.request<T>(config);
      const { data } = response;
      return { data, err: null, response };
    } catch (err) {
      return { data: null, err, response: null };
    }
  };
};

const getAdmins = makeRequest<{ admins: string[] }>({
  url: '/admins-no-wrapper',
  // method: 'get',
});

export default getAdmins;
