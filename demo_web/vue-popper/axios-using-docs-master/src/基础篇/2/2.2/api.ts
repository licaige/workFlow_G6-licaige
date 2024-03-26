import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { BackendResultFormat, CodeNotZeroError, ResultFormat } from '../../../service/request';
import instance from '../../instance';

interface RequestConfig extends AxiosRequestConfig {
  url: NonNullable<AxiosRequestConfig['url']>;
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
  // 当泛型参数Data被定义时，config和config.data不能为空
  <Payload, Data>(config: RequestConfig): (
    requestConfig: Partial<Omit<RequestConfig, 'data'>> & { data: Data },
  ) => Promise<ResultFormat<Payload>>;
  // 当泛型参数Params被定义时，config和config.params不能为空
  // 但如果Data为undefined时，config.data可以不填写
  <Payload, Data, Params>(config: RequestConfig): (
    requestConfig: Partial<Omit<RequestConfig, 'data' | 'params'>> &
      (Data extends undefined ? { data?: undefined } : { data: Data }) & { params: Params },
  ) => Promise<ResultFormat<Payload>>;
}

export const makeRequest: MakeRequest = <T>(config: RequestConfig) => {
  return async (requestConfig?: Partial<RequestConfig>) => {
    // 合并在service中定义的option和调用时从外部传入的option
    const mergedConfig: RequestConfig = {
      ...config,
      ...requestConfig,
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

const getAdmins = makeRequest<{ admins: string[] }>({
  url: '/admins-no-wrapper',
  method: 'get',
});

export default getAdmins;
