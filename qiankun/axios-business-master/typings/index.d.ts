export type FreeObject = Record<string, any>;
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export { AxiosInstance, AxiosRequestConfig, AxiosResponse };

/**
 * API配置
 */
export type ApiConfig = {
  url: string;
  method: "get" | "post" | "delete" | "put" | "patch" | "blob";
};

/**
 * API模块
 */
export type ApiModule = Record<string, ApiConfig>;

/**
 * 配置
 */
export interface AxiosExtConfig {
  modules: Record<string, ApiModule>;
  timeout?: number;
  interceptor?: {
    request?: (config: AxiosRequestConfig) => AxiosRequestConfig;
    response?: (response: AxiosResponse) => AxiosResponse;
  };
}

export interface AxiosExtInstance {
  instance: AxiosInstance;
  post: (url: string, data?: FreeObject, config?: AxiosRequestConfig) => any;
  delete: (url: string, data?: FreeObject, config?: AxiosRequestConfig) => any;
  put: (url: string, data?: FreeObject, config?: AxiosRequestConfig) => any;
  head: (url: string, params?: FreeObject, config?: AxiosRequestConfig) => any;
  get: (url: string, params?: FreeObject, config?: AxiosRequestConfig) => any;
  patch: (url: string, data?: FreeObject, config?: AxiosRequestConfig) => any;
  blob: (url: string, params?: FreeObject, config?: AxiosRequestConfig) => any;
}

export type ApiFunc = {
  [k: string]: {
    [k: string]: (
      data?: FreeObject,
      config?: AxiosRequestConfig
    ) => Promise<any>;
  };
};

export function createApis(config: AxiosExtConfig): ApiFunc;
