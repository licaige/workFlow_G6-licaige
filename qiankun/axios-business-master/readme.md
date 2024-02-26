# axios-business

基础 axios 封装业务 HTTP 库，将接口转化为可调用的函数

# usage

browser

```js
<script src="./dist/axios-business.umd.js"></script>;
const modules = {
  app: {
    login: {
      url: "/api/login",
      method: "post",
    },
  },
};

const axiosExt = window["axios-business"];
const apis = axiosExt.createApis({ modules });
```

node.js

```js
import { createApis } from "axios-business";
const modules = {
  app: {
    login: {
      url: "/api/login",
      method: "post",
    },
  },
};

const apis = createApis({ modules });
```

# API

createApis

> function createApis(config: AxiosExtConfig): ApiFunc;

```ts
export interface AxiosExtConfig {
  modules: Record<string, ApiModule>;
  timeout?: number;
  interceptor?: {
    request?: (config: AxiosRequestConfig) => AxiosRequestConfig;
    response?: (response: AxiosResponse) => AxiosResponse;
  };
}

export type ApiFunc = {
  [k: string]: {
    [k: string]: (
      data?: FreeObject,
      config?: AxiosRequestConfig
    ) => Promise<any>;
  };
};
```
