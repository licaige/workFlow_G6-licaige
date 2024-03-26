---
order: 2
---

# 深入篇

## 1. 了解`Axios`的拦截器实现原理

在实现**深入篇**所支持的特性前，这里需要介绍一下`Axios`拦截器的工作原理：

假设我们注册**A**、**B**作为请求中的成功和失败拦截器，**C**、**D**作为相应中的成功和失败拦截器。如下所示会放在对应的`handlers`中。

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e2c7f464b4af443da151955bf6f8beeb~tplv-k3u1fbpfcp-watermark.image)

当调用`axios`或者`axios.request`发出请求时，就会运行`Array.prototype.request`方法。此时在`Array.prototype.request`中会定义一个数组类型的变量`chain`，`chain`在执行过程中会有如下变化：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/94e214446f6348f5b509e548ef45eaef~tplv-k3u1fbpfcp-watermark.image)

最终`chain`中的元素会双双取出放到`promise`链中，然后把`promise`链返回出去。

关于`Axios`这部分涉及到拦截器的源码分析可看我之前写的文章[如何避免 axios 拦截器上的代码过多](https://juejin.cn/post/6916682684169191437#heading-1)。

除了知道拦截器会放在`promise`链执行之外，我们需要知道，`config`会作为参数贯穿整个`promise`链，由此**我们可以通过`config`中的属性来控制拦截器的是否执行和执行效果**(有人会提到新版本中的`runWhen`这个属性可以控制拦截器是否执行，但这个属性仅限于决定**请求拦截器**的执行与否，不能决定**响应拦截器**的执行与否)。

## 2. 实现自动反馈请求结果

在接口响应后，如果响应失败或返回错误，前端会通过弹框反馈原因。而在一些有关增删改的接口在响应成功后，前端也会反馈操作成功的信息给用户。

如果我们在每个调用请求函数的函数里都写反馈逻辑，会非常累赘。而借助拦截器我们可以很巧妙地对所有接口统一添加上这层逻辑。

<!-- **在添加一个辅助功能时，我们先要想好开发者要怎样开启调用这个功能，然后根据调用方式去从代码层面设计编码实现。** -->

实现上述功能需要以下新增的属性：

1. **`desc`:** 用来描述该接口的用途，以便用户通过`desc`来开启反馈，且知道弹出的反馈来自哪个请求的操作。
2. **`notifyWhenSuccess`:** 用于手动关闭或开启该请求在响应成功后的反馈。`get`,`head`,`option`请求成功后默认不反馈，`post`,`delete`,`put`等涉及到增删改的接口在该请求成功后默认反馈。
3. **`notifyWhenFailure`:** 用于手动关闭或开启该请求在响应失败后的反馈。默认任何请求失败后都会反馈。

以上属性都会添加到`RequestConfig`里，如下所示：

```ts | pure
interface RequestConfig extends AxiosRequestConfig {
  url: NonNullable<AxiosRequestConfig['url']>;
  // 添加属性
  desc?: string;
  notifyWhenSuccess?: boolean;
  notifyWhenFailure?: boolean;
}
```

借助上面的属性，我们可以通过以下方式开启反馈：

```ts | pure
const  getSomething = makeRequest({
  url: '/something',
  // 当desc被填写时，会自动开启反馈，且desc中填写的内容会作为反馈信息
  desc: '这里时接口描述',
}),

// 调用时，可通过notifyWhenFailure和notifyWhenSuccess强制开启或关闭成功失败时的反馈
getSomething({
  // notifyWhenFailure: false
  // notifyWhenSuccess: false
})
```

根据上面的开启反馈方式，我们开始编写拦截器代码，如下所示：

```tsx | pure
// notify.tsx
import { notification } from 'antd';
import type { AxiosResponse, AxiosError } from 'axios';
import React from 'react';

const notify = {
  response: {
    onFulfilled: (response: AxiosResponse<BackendResultFormat>) => {
      const { code, message } = response.data;
      const { desc, notifyWhenFailure, notifyWhenSuccess, method } =
        response.config as RequestConfig;
      // 如果desc被定义，则执行反馈逻辑
      if (desc) {
        // 对code为0的响应做成功反馈
        if (code === 0) {
          if (notifyWhenSuccess !== false) {
            if (
              ['delete', 'put', 'post'].includes(method?.toLowerCase() || '') ||
              notifyWhenSuccess === true
            ) {
              notification.success({
                message: `${desc}成功`,
              });
            }
          }
          // 针对code不为0的响应做失败反馈
        } else if (notifyWhenFailure !== false) {
          notification.error({
            message: `${desc}错误`,
            description: `原因：${message}`,
          });
        }
      }
      return response;
    },
    onRejected: (error: AxiosError<BackendResultFormat>) => {
      const { response, config } = error;
      // 对4xx，5xx状态码做失败反馈
      const { url, desc } = config as RequestConfig;
      if (desc) {
        if (response?.status && response?.statusText) {
          notification.error({
            message: `${desc}错误`,
            description: (
              <div>
                <div>
                  状态：{response.status}~{response.statusText}
                </div>
                <div>路径：{url}</div>
                {/*可能存在后端直接返回错误码，但没返回对象的情况*/}
                {response.data?.message && <div>原因：{response.data.message}</div>}
              </div>
            ),
          });
        } else {
          // 处理请求响应失败,例如网络offline，超时等做失败反馈
          notification.error({
            message: `${desc}失败`,
            description: (
              <div>
                <div>原因：{error.message}</div>
                <div style={{ whiteSpace: 'nowrap' }}>路径：{url}</div>
              </div>
            ),
          });
        }
      }
      return error;
    },
  },
};

// instance为axios.create生成的axios实例
instance.interceptors.response.use(notify.response.onFulfilled, notify.response.onRejected);
```

下面我们来分情况测试一下拦截效果。先用`makeRequest`生成几个请求函数，其中都写上`desc`用于描述请求：

```ts | pure
import makeRequest from '../request';

export default {
  getAdmins: makeRequest<{ admins: string[] }>({
    url: '/admins',
    desc: '获取管理员列表',
  }),

  register: makeRequest<null, { username: string; password: string }>({
    url: '/register',
    method: 'post',
    desc: '注册新用户',
  }),

  updatePassword: makeRequest<null, { password: string }, { username: string }>({
    url: '/password',
    method: 'put',
    desc: '更换密码',
  }),

  getDelay: makeRequest({
    url: '/delay',
    desc: '延时测试请求',
  }),
};
```

接下来我们在下面这个组件上进行测试：

<code src="./2/index.tsx"></code>

1. **`get`请求成功时默认不反馈，但我们可以通过设置`notifyWhenSuccess`来让其强制显示反馈，如下代码所示：**

```ts | pure
const getAdmins1 = async () => {
  getAdmins();
};

const getAdmins2 = async () => {
  // 强制让其反馈
  getAdmins({
    notifyWhenSuccess: true,
  });
};
```

效果如下所示：

![get成功反馈.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d2847c221ce346c3b9df402c9b5617a0~tplv-k3u1fbpfcp-watermark.image?)

2. **`post`,`put`,`delete`请求成功后默认反馈，如下代码所示：**

```ts | pure
const register1 = async () => {
  register({
    data: {
      username: '123',
      password: '123',
    },
  });
};
```

效果如下所示：

![post成功反馈.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b133288dfc234c3fba299efd9e6c347f~tplv-k3u1fbpfcp-watermark.image?)

3. **因响应状态码为 4xx 或 5xx 导致的请求失败时，会有弹窗反馈**

```ts | pure
const updatePassword1 = async () => {
  updatePassword({
    data: {
      // 缺乏password参数
    },
    params: {
      username: 'root',
    },
  });
};

const updatePassword2 = async () => {
  updatePassword({
    data: {
      password: '123',
    },
    params: {
      // 当usernamr为Tom时，正常返回但返回对象里code不为0且message显示不存在该用户信息
      username: 'Tom',
    },
  });
};
```

效果如下所示：

![put失败反馈.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0fafd14646534ec5b5860e40ec228af9~tplv-k3u1fbpfcp-watermark.image?)

4. **响应失败的反馈，例如超时**

```ts | pure
const requestDelayTest = async () => {
  getDelay({
    // 设置接口超时阈值为1s，此接口响应时间被设为2s，因此必定超时
    timeout: 1000,
  });
};
```

效果如下所示：

![timeout.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e88807ec158343c68f26f74c68383e2a~tplv-k3u1fbpfcp-watermark.image?)

5. **请求失败的反馈，例如网络中断**

![network-error.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/159630ba498b4986888a0fce4e5f6a20~tplv-k3u1fbpfcp-watermark.image?)

到此我们完成了请求反馈结果的功能。

## 3. 支持 URL 路径参数替换

存在部分`URL`需要在调用时要对路径中的路径参数进行替换，如`/account/{username}`在调用中,传入的`username`为`jenny`时，发出请求的路径为`/account/jenny`，本章节我们就要对这部分内容进行支持。

我们这里设计成可以通过给请求参数传入`args`开启路径参数替换功能，如下所示：

```ts | pure
// MakeRequest第四泛型参数用于定义args的类型
const getAccount = makeRequest<
  { id: string; name: string; role: string },
  undefined,
  undefined,
  { username: string }
>({
  url: '/account/{username}',
});

const getAccount = async () => {
  getAccount({
    // 在args中指定路径参数
    args: {
      username: 'jenny',
    },
  });
};
```

接下来开始根据上面的开启方式实现该功能，首先我们要往`RequestConfig`声明类型里新增`args`属性，如下所示：

```ts | pure
interface RequestConfig extends AxiosRequestConfig {
  url: NonNullable<AxiosRequestConfig['url']>;
  desc?: string;
  notifyWhenSuccess?: boolean;
  notifyWhenFailure?: boolean;
  // 新增args属性
  args?: Record<string, any>;
}
```

与此同时对`MakrRequest`声明类型添加`Args`泛型参数：

```ts | pure
interface MakeRequest {
  <Payload = any>(config: RequestConfig): (
    requestConfig?: Partial<RequestConfig>,
  ) => Promise<ResultFormat<Payload>>;

  <Payload, Data>(config: RequestConfig): (
    requestConfig: Partial<Omit<RequestConfig, 'data'>> & { data: Data },
  ) => Promise<ResultFormat<Payload>>;

  <Payload, Data, Params>(config: RequestConfig): (
    requestConfig: Partial<Omit<RequestConfig, 'data' | 'params'>> &
      (Data extends undefined ? { data?: undefined } : { data: Data }) & {
        params: Params;
      },
  ) => Promise<ResultFormat<Payload>>;
  // 加上如果带Args泛型参数的情况，同样的，如果指定Params或Data泛型参数为undefined，则可忽略不填
  <Payload, Data, Params, Args>(config: RequestConfig): (
    requestConfig: Partial<Omit<RequestConfig, 'data' | 'params' | 'args'>> &
      (Data extends undefined ? { data?: undefined } : { data: Data }) &
      (Params extends undefined ? { params?: undefined } : { params: Params }) & {
        args: Args;
      },
  ) => Promise<ResultFormat<Payload>>;
}
```

拦截器代码如下所示：

```tsx | pure
import { notification, Space, Typography } from 'antd';

const urlArgsHandler = {
  request: {
    onFulfilled: (config: AxiosRequestConfig) => {
      const { url, args } = config as RequestConfig;
      // 如果args被定义，则执行路径参数替换逻辑
      if (args) {
        const lostParams: string[] = [];
        const replacedUrl = url.replace(/\{([^}]+)\}/g, (res, arg: string) => {
          if (!args[arg]) {
            lostParams.push(arg);
          }
          return args[arg] as string;
        });
        if (lostParams.length) {
          notification.error({
            message: 'args参数缺少警告',
            description: (
              <div>
                <div>
                  内容：在args中找不到
                  <Space>
                    {lostParams.map((arg) => (
                      <Typography.Text key={arg} code>
                        {arg}
                      </Typography.Text>
                    ))}
                  </Space>
                  属性
                </div>
                <div>路径：{url}</div>
              </div>
            ),
          });
          return Promise.reject(new Error('在args中找不到对应的路径参数'));
        }
        return { ...config, url: replacedUrl };
      }
      return config;
    },
  },
};

instance.interceptors.request.use(urlArgs.request.onFulfilled, undefined);
```

最后通过组件进行测试，如下所示：

<code src="./3/index.tsx"></code>

效果如下所示：

1. 当调用`getAccount1`时，从 URL 上可看出`username`已被替换成`jenny`：

![urlArgs-success.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6ba7a497586e44ddba0fd6cb4a9281e8~tplv-k3u1fbpfcp-watermark.image?)

2. 当调用`getAccount2`时，由于`args`中缺乏`username`参数，因此会弹框显示且停止发出请求：

![urlArgs-failure.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/43bee9c7c1f846bcb91efb5d2e4dd12d~tplv-k3u1fbpfcp-watermark.image?)

至此我们完成 URL 路径参数替换功能。

## 4. 支持接口限流

存在部分页面在交互过程中会瞬间对同一个接口发出大量的请求，而如果被请求的接口占用后端较多的计算资源，有可能会导致后端运行缓慢且响应超时。

对此，其中一种解决办法就是在前端通过代码限制请求并发数，又称**接口限流**。而这个特性借助`axios`拦截器可以轻易实现的。

这里我们把请求函数设计成可以通过传入`limit`开启限流替换功能，如下所示：

```ts | pure
getRequest({
  // 限制该请求函数对应接口的前端并发数为2
  limit: 2,
});
```

下面我们来实现这种方式，首先依旧往`RequestConfig`声明类型里新增`limit`属性如下所示：

```ts | pure
interface RequestConfig extends AxiosRequestConfig {
  url: NonNullable<AxiosRequestConfig['url']>;
  desc?: string;
  notifyWhenSuccess?: boolean;
  notifyWhenFailure?: boolean;
  args?: Record<string, any>;
  // 新增limit属性
  limit?: number;
}
```

然后在拦截器上实现该功能，如下所示：

```ts | pure
type ResolveFn = (value: unknown) => void;

const records: Record<string, { count: number; queue: ResolveFn[] }> = {};

const generateKey = (config: RequestConfig) => `${config.url}-${config.method}`;

const limiter = {
  request: {
    onFulfilled: async (config: RequestConfig) => {
      const { limit } = config;
      // 如果limit被定义，则执行限流逻辑
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
        // 把该请求通过await阻塞存储在queue队列中
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
```

最后通过组件代码例子查看效果，下面调用`getDelay`请求函数，该请求函数对应的接口要 2s 后才响应，这里分三种情况来查看效果：

<code src="./4/index.tsx"></code>

下面通过请求时间瀑布流来看上面三种情况的效果：

1. 没有限流的请求:`request1`

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/529bdeebc5ae4ab1b7d24f4d9765a872~tplv-k3u1fbpfcp-watermark.image?)

2. 限流数量为 1 的请求:`request2`

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d7d261ffa82048c1afe44f32e4a2507f~tplv-k3u1fbpfcp-watermark.image?)

3. 限流数量为 2 的请求:`request3`

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4e27e05a209046f0a57b3898900fdfd3~tplv-k3u1fbpfcp-watermark.image?)

至此我们完成请求限流功能。
