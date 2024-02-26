import { AxiosExtConfig, AxiosExtInstance, FreeObject } from "@type/index";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

/**
 * 错误处理
 * @param error
 * @returns
 */
function rejectedHandler(error: any) {
  return Promise.reject(error);
}

/**
 * 预处理AxiosRequestConfig
 * 处理rest API，将API中的参数替换为实际值
 *
 * @param config
 * @returns
 */
function parseRestParam(config: AxiosRequestConfig) {
  const { url = "", params = {}, data = {}, method } = config;

  if (FormData && data instanceof FormData) {
    return config;
  }

  const tmpParams = { ...params, ...data };
  config.url = url.replace(/:([^/\d]+)/g, (sub, $0) => {
    const v = tmpParams[$0];
    Reflect.deleteProperty(tmpParams, $0);
    return v;
  });

  if (method === "get") {
    config.params = { ...tmpParams };
    config.data = {};
  } else {
    config.params = {};
    config.data = { ...tmpParams };
  }

  return config;
}

/**
 * 预处理AxiosResponse
 *
 * @param response
 * @returns
 */
function parseToJSON(response: AxiosResponse) {
  const {
    config: { responseType },
    data,
  } = response;

  if (responseType === "json") {
    return data;
  }

  return response;
}

let ins: AxiosInstance | null = null;

/**
 * 获取Axios实例
 * @param config
 * @returns
 */
function getInstance(config: AxiosExtConfig) {
  if (ins !== null) {
    return ins;
  }

  const cfg: AxiosRequestConfig = {
    baseURL: "",
    timeout: config.timeout || 10000,
    headers: { "Content-Type": "application/json" },
    responseType: "json",
  };

  ins = axios.create(cfg);

  return ins;
}

/**
 * 导出一个实例
 *
 * @param config
 * @returns
 */
export default function (config: AxiosExtConfig): AxiosExtInstance {
  const instance = getInstance(config);

  const before = config.interceptor?.request;
  if (typeof before === "function") {
    instance.interceptors.request.use(before, rejectedHandler);
  }

  const after = config.interceptor?.response;
  if (typeof after === "function") {
    instance.interceptors.response.use(after, rejectedHandler);
  }

  instance.interceptors.request.use(parseRestParam, rejectedHandler);
  instance.interceptors.response.use(parseToJSON, rejectedHandler);

  return {
    instance: instance,
    head: (url: string, params?: FreeObject, config?: AxiosRequestConfig) => {
      return instance.head(url, { params, ...config });
    },

    post: (url: string, data?: FreeObject, config?: AxiosRequestConfig) => {
      return instance.post(url, data, config);
    },

    delete: (url: string, data?: FreeObject, config?: AxiosRequestConfig) => {
      return instance.delete(url, { data, ...config });
    },

    put: (url: string, data?: FreeObject, config?: AxiosRequestConfig) => {
      return instance.put(url, data, config);
    },

    get: (url: string, params?: FreeObject, config?: AxiosRequestConfig) => {
      return instance.get(url, { params, ...config });
    },

    patch: (url: string, data?: FreeObject, config?: AxiosRequestConfig) => {
      return instance.patch(url, data, config);
    },

    blob: (url: string, params?: FreeObject, config?: AxiosRequestConfig) => {
      return instance.get(url, {
        params,
        ...config,
        responseType: "blob",
      });
    },
  };
}
