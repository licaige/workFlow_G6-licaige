---
order: 3
---

# 拓展篇

## 1. 了解 Axios 适配器`adpater`的原理

在运用`adpater`之前，我们先要知道其原理。在拦截器原理的章节中，我们说到`promise`链，如下所示：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/94e214446f6348f5b509e548ef45eaef~tplv-k3u1fbpfcp-watermark.image)

整个`promise`链中真正执行异步请求的是`dispatchRequest`环节，我们来看一下`dispatchRequest`的涉及到`adpater`的源码：

```js | pure
// lib/core/dispatchRequest.js
module.exports = function dispatchRequest(config) {
  // 这里忽略的代码是对config的调整...

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(
    function onAdapterResolution(response) {
      // 这里忽略的代码是对config.transformResponse的调用...
      return response;
    },
    function onAdapterRejection(reason) {
      // 这里忽略的代码是对config.transformResponse的调用...
      return Promise.reject(reason);
    },
  );
};
```

在不传入`config.adapter`情况下，默认调用的是`defaults.adapter`。因此我们继续分析`defaults.adapter`的核心源码，注意此处分析的源码是在浏览器环境下执行的`lib/adapters/xhr.js`代码，如果是在`node.js`环境下则执行`lib/adapters/http.js`代码：

```js | pure
// lib/adapters/xhr.js
function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;
    var responseType = config.responseType;

    var request = new XMLHttpRequest();

    var fullPath = buildFullPath(config.baseURL, config.url);

    request.open(
      config.method.toUpperCase(),
      buildURL(fullPath, config.params, config.paramsSerializer),
      true,
    );

    request.timeout = config.timeout;

    function onloadend() {
      // ... 忽略，里面会调用resolve和reject
    }

    if ('onloadend' in request) {
      request.onloadend = onloadend;
    } else {
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }

        if (
          request.status === 0 &&
          !(request.responseURL && request.responseURL.indexOf('file:') === 0)
        ) {
          return;
        }

        setTimeout(onloadend);
      };
    }

    request.onabort = function handleAbort() {};

    request.onerror = function handleError() {};

    request.ontimeout = function handleTimeout() {};

    if (!requestData) {
      requestData = null;
    }

    request.send(requestData);
  });
}
```

我们可知，在浏览器环境下`default.adapter`内部的核心操作是创建`XHR`实例，根据`config`进行部分配置修改和监听操作后，调用`xhr.open`进行异步请求。我们这里可以用类似`lodash`的高阶函数写法去增强`adapter`去实现更多功能，如下`enchance`所示，`enhance`最终也是返回一个和`default.adapter`同一声明类型的结果。

```js | pure
const request = makeRequest({
  url: '/something',
  adpater: enhance(axios.default.adapter),
});
```

## 2. 支持接口数据缓存

对于部分频繁请求且非常占用后端资源的查询接口，前端可以对其请求结果做缓存，在一定时间内的多次请求中，重复返回首次请求获取的数据，从而缓解后端服务器压力的同时，提高前端的页面渲染速度。

关于缓存的实现这里不打算自己写代码了，因为网上有很完美的轮子做推荐：[axios-extensions#cacheadapterenhancer](https://github.com/kuitos/axios-extensions)，该轮子基于`LRU-cache`做缓存。这里展示一下如何在本文设计的**API 层架构**中使用该轮子：

```ts | pure
// 此instance为makeRequest里的instance
// 也可以把adpater放在requestConfig里，如：makeRequest({adapter})，不过此处我直接挂载到实例里
const instance = axios.create({
  timeout: 10000,
  baseURL: '/api',
  adapter: cacheAdapterEnhancer(axios.defaults.adapter!, {
    // 默认不缓存
    enabledByDefault: false,
  }),
});
```

我们通过此下面的代码例子来看看效果：

<code src="./2/index.tsx"></code>

效果如下所示：

![cache.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/27fb1d884f0c4792816976ee094733da~tplv-k3u1fbpfcp-watermark.image?)

除了例子中的配置项，**cacheadapterenhancer**还提供了控制缓存提取次数和存在周期等功能，具体详细的可直接去官网查看。

关于**cacheadapterenhancer**的源码也非常简单，这里就不做分析了。

## 3. 支持接口自动重试

有时候因为网络或后端的影响，接口会偶尔请求失败，但再次请求则可成功。针对这种特殊的错误情况，前端可以添加接口错误后自动重试机制。

这里需要注意的是，不是所有的错误都要重试，大多数**HTTP 状态码**为 4xx 和 5xx 的错误是没必要重复请求的，因为结果都一样，例如访问信息却因为用户角色权限原因报`403 Forbidden`的错误，就没必要重试请求。目前我认为需要重复请求的错误原因有以下：

1. **网络中断**：存在媒体切换网络环境时存在短暂的网络中断，从而导致请求报错，此时可以再次尝试请求。
2. **响应超时**：存在部分查询请求比较消耗后端的资源，而在前端因超时中断请求连接时，后端的查询进程并未中断，且在完成查询后把数据放在类似`redis`的缓存上。此时如果前端再次请求时，可以迅速获取到数据。

虽然针对此机制也有现有的轮子[axios-extensions#retryadapterenhancer](https://github.com/kuitos/axios-extensions#retryadapterenhancer)，但该轮子是无论什么错误都会重试，不符合上面的观点。但该轮子的代码思路值得借鉴，因此我们来借鉴该轮子的源码，还是增强`adapter`的思路，来实现自己的一套**接口重试机制**：

```ts | pure
// 定义配置的声明类型
interface RetryAdapterOption {
  // 重试次数
  retryTimes: number;
  // 重试间隔时间
  retryInterval: number;
}

// 判断错误的方法，如果错误符合条件则重试
// 下面逻辑中，如果错误是超时或网络错误，则返回true
const judgeError = (error: any) => {
  return (
    error instanceof AxiosError &&
    (error.message.startsWith('timeout') || error.message.startsWith('Network Error'))
  );
};

const retryAdapter = (adapter: AxiosAdapter, retryAdapterOption?: Partial<RetryAdapterOption>) => {
  // retryTimes即重复请求次数默认为3次
  const retryTimes =
    retryAdapterOption?.retryTimes === undefined ? 3 : retryAdapterOption?.retryTimes;
  // retryInterval即重复请求时间间隔默认为500
  const retryInterval =
    retryAdapterOption?.retryInterval === undefined ? 500 : retryAdapterOption?.retryInterval;
  return (config: AxiosRequestConfig): Promise<AxiosResponse<any>> => {
    const { retry } = config as RequestConfig;
    // 如果config.retry被定义，则启用重试机制
    if (retry) {
      let count = 0;
      let finalRetryTimes = retryTimes;
      let finalRetryInterval = retryInterval;
      if (typeof retry === 'object') {
        finalRetryTimes = typeof retry.retryTimes === 'number' ? retry.retryTimes : retryTimes;
        finalRetryInterval =
          typeof retry.retryInterval === 'number' ? retry.retryInterval : retryInterval;
      }
      // 核心函数，如果报错且错误符合条件，则调用自身
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
```

在`RequestConfig`中添加`retry`属性，如下所示：

```ts | pure
export interface RequestConfig extends AxiosRequestConfig {
  url: NonNullable<AxiosRequestConfig['url']>;
  desc?: string;
  notifyWhenSuccess?: boolean;
  notifyWhenFailure?: boolean;
  limit?: number;
  args?: Record<string, any>;
  // 新增retry属性
  retry?: boolean | Partial<RetryAdapterOption>;
}
```

生成请求函数

```ts | pure
export default {
  getDelayWithRetry: makeRequest({
    url: '/delay',
    desc: '延时请求测试',
    // 该接口的响应时间为2s，因此调用请求函数必定报超时错误
    timeout: 1000,
    // 定义retry。retry的类型也可以是{retryTimes: number;retryInterval: number;}
    retry: true,
    // 使用上面刚写的retryAdapter
    adapter: retryAdapter(axios.defaults.adapter!),
  }),

  get500Error: makeRequest({
    // 这是一个报HTTP状态码为500的错误
    url: '/500-error',
    desc: '500请求测试',
    // 定义重试，但因该错误不符合重试条件，因此不会重试
    retry: true,
    adapter: retryAdapter(axios.defaults.adapter!),
  }),
};
```

下面来编写组件进行测试，如下所示：：

<code src="./3/index.tsx"></code>

下面来分情况看看测试效果：

1. 超时情况下，首次请求错误后，会依次间隔 0.5s 去重试直至三次请求都失败：

![timeout-retry.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/937feda647a7471a8e3a0264570c47e4~tplv-k3u1fbpfcp-watermark.image?)

2. 报状态码为 500 的情况下，会直接报错，不会重试：

![500-retry.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b42051d8358b4cd19d914a7a969b35d0~tplv-k3u1fbpfcp-watermark.image?)

3. 网络错误情况下，也会和第 1 点一样重复请求三次：

![network-error-retry.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0d7f839632f340259750352033a541f6~tplv-k3u1fbpfcp-watermark.image?)

至此，我们完成了**接口自动重试**机制。
