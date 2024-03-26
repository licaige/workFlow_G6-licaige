---
order: 1
---

# 基础篇

## 1. 响应数据的约束和获取

### 1.1 约束响应数据

`axios`所提供的常用的请求方法有：

```ts ｜ pure
axios.request(config)
axios.get(url[, config])
axios.post(url[, data[, config]])
```

我们来看一下 **`Axios`源码** 中对这些请求方法的声明类型，如下所示：

```ts ｜ pure
export class Axios {
  request<T = any, R = AxiosResponse<T>, D = any>(config: AxiosRequestConfig<D>): Promise<R>;
  get<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Promise<R>;
  post<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R>;
  // delete，put，options这些方法的声明类型都和上面的大同小异，这里就省略不展示了....
}
// 其中上面AxiosResponse的声明类型如下所示
export interface AxiosResponse<T = any, D = any> {
  data: T;
  status: number;
  statusText: string;
  headers: AxiosResponseHeaders;
  config: AxiosRequestConfig<D>;
  request?: any;
}
```

这里我们注意到其中的泛型变量`R`可用于定义返回数据的类型，其默认为`AxiosResponse<T>`，而`AxiosResponse<T>`的泛型变量`T`用于定义其中的属性`data`。借助该类型声明，我们可以这样编写请求函数：

<code src="./1/1.1/index.tsx"></code>

从下图的冒泡弹框可知，`ts`已经自动推导`getAdmins`的返回数据为`Promise<admins: string[]>`，这就是借助`axios`已有泛型来约束响应数据类型的写法。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ecdadc7b232e4c1b9eb0e537e86bba67~tplv-k3u1fbpfcp-watermark.image?)

这样子，我们就解决了**通过`ts`去约束响应数据的格式**。

### 1.2 规范返回数据

针对上面的请求函数，我们还考虑两种情况：

1. 当请求接口报错时，需要返回错误给开发者处理。
2. 部分场景下，开发者需要获取`Response`对象里的部分属性(例如响应头的部分字段值、http 状态码)，以实现一些复杂的功能。

对于上面的情况，我们完善一下`getAdmins`函数：

<code src="./1/1.2/1/index.tsx"></code>

但如果每次写请求函数，我们都要写重复的`try~catch`逻辑，就会非常累赘。为了减少重复代码的工作量和统一返回的数据格式，我们可以编写一个`makeRequest`高阶函数，用来生成`getAdmins`这类请求函数，如下所示：

```ts ｜ pure
// RequestConfig用来修饰下面的config，以让url为必填项
interface RequestConfig extends AxiosRequestConfig {
  url: NonNullable<AxiosRequestConfig['url']>;
}

const instance = axios.create({
  timeout: 10000,
  baseURL: '/api',
});

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

/** 调用makeRequest，只需要做两步：
 *   1. 在泛型参数T中定义响应数据的类型
 *   2. 在形参中传入config以定义url和method，若method为get则可缺省
 */
const getAdmins = makeRequest<{ admins: string[] }>({
  url: '/admins-no-wrapper',
});

// 和之前的调用方式一样
async function requestAdmins() {
  const { data, err } = await getAdmins();
  if (err) return;
  setAdmins(data!.admins);
}
```

上面例子中，请求函数统一用`makeRequest`来生成，从而高效准确实现了**规范请求方法的返回数据**。

把`makeRequest`运用到例子后，效果如下所示：

<code src="./1/1.2/2/index.tsx"></code>

### 1.3 处理后端返回的响应对象

在大多数实际开发中，后端不会把响应数据直接放在响应体里，而是放在一个对象（下称**返回对象**）的其中一个属性里，然后把**返回对象**放在响应体里返回给前端。**返回对象**往往包含三个大同小异的属性，分别如下所示：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4432fa66ada448fb879054b667901edd~tplv-k3u1fbpfcp-watermark.image?)

- `code`: `number`类型，用于存放状态代码，有时候 http 的状态码不能完全满足业务场景需求，需要额外定义一些状态码来说明请求失败的情况。这里设计 code 为 0 时代表请求通过。
- `data`: 用于存放数据
- `message`: `string`类型，用于存放额外信息。当 `code` 不为 0 时，需要 `message` 来提供更多说明信息以反馈给用户和开发者。

对此，我们还需要完善`makeRequest`来解构处理**返回对象**，如下所示：

```ts ｜ pure
// 先定义返回对象的声明类型
export interface BackendResultFormat<T = any> {
  code: number;
  data: T;
  message: string;
}

// 定义一个返回对象中code不为0时的错误
export class CodeNotZeroError extends Error {
  code: number;

  constructor(code: number, message: string) {
    super(message);
    this.code = code;
  }
}

const makeRequest = <T>(config: RequestConfig) => {
  return async () => {
    try {
      const response = await instance.request<BackendResultFormat<T>>(config);
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
```

这样子就完成了处理**返回对象**的逻辑。

上述代码的组件例子如下所示：

<code src="./1/1.3/index.tsx"></code>

## 2. 请求参数的传入和约束

### 2.1 请求参数的传入

`AxiosRequestConfig`声明类型里的属性中，可以按**确定时期**分为两类：

1. **配置属性**：这部分参数在在调用`makeRequest`生成请求函数时就可以确定下来，例如`method`,`url`。之前的`RequestConfig`声明类型中会把**配置属性**定义为必填项。
2. **调用属性**：这部分参数在调用请求函数时可以确定下来，例如`data`,`param`

```ts ｜ pure
export interface AxiosRequestConfig<D = any> {
  // 配置属性
  url?: string;
  method?: Method | string;
  transformRequest?: AxiosRequestTransformer | AxiosRequestTransformer[];
  transformResponse?: AxiosResponseTransformer | AxiosResponseTransformer[];
  // ....

  // 调用属性
  params?: any;
  data?: D;
  cancelToken?: CancelToken; //用于中断上一次重复请求，0.27版本推荐用signal来代替该属性
  signal?: GenericAbortSignal; //用于中断上一次重复请求
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void; // 上传回调
  onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void; // 下载回调
  // ...
}
```

当然有些属性可能同时属于**配置属性**和**调用属性**，例如`headers`,`timeout`。

而本节中要在请求函数中支持传入的那些请求参数就是上面所说的**调用属性**。为了让定义**调用属性**时的做法和调用`axios.request(config)`一致，我们可以指定请求函数的形参为`Partial<RequestConfig>`声明类型。下面我们按照这个思路来实现：

<!-- 在实现请求函数传入形参之前，我们要明确在调用接口时可能需要指定的参数，从`AxiosRequestConfig`

已知我们调用接口请求时，要配置 **`data`(请求体)** 或 **`param`(location.search)**，有些罕见的情况还要我们去设置 **`header`(请求头)** 以及别的配置，而这些配置都包含在`axios.request(config)`的`config`对象里，因此对于`makeRequest`生成的请求函数，我们可以把该请求函数的形参同样也设计为`AxiosRequestConfig`声明类型，我们可以在形参中定义请求配置，如下所示： -->

```ts ｜ pure
// config用于指定配置属性，因此用RequestConfig修饰
// requestConfig用于指定调用属性或者覆盖配置属性，因此先用Partial<RequestConfig>修饰，在下面章节中会有所改动
const makeRequest = <T>(config: RequestConfig) => {
  return async (requestConfig?: Partial<RequestConfig>) => {
    // 最终两个config会进行浅合并
    const mergedConfig: RequestConfig = {
      ...config,
      ...requestConfig,
      // 对于headers需要特殊处理做深度合并
      headers: {
        ...config.headers,
        ...requestConfig?.headers,
      },
    };

    // 下面逻辑与之前一样
    try {
      const response = await instance.request<BackendResultFormat<T>, RequestConfig>(mergedConfig);
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

const getNames = makeRequest<{ names: string[] }>({
  url: '/names',
  method: 'get',
});

const requestNames = async (search?: string) => {
  const { data, err } = await getNames({
    // 此处params等同于axios.request(config)中的config.params
    params: { search },
  });
  if (err) return;
  setNames(data!.names);
};
```

这样子就实现了**请求函数的形参传入**。

### 2.2 请求参数的约束

上节中我们简单用`Partial<RequestConfig>`来修饰请求函数的形参，而`RequestConfig`继承于`AxiosRequestConfig`，我们先来看看`AxiosRequestConfig`这个声明类型：

```ts ｜ pure
export interface AxiosRequestConfig<D = any> {
  url?: string;
  method?: Method | string;
  baseURL?: string;
  headers?: AxiosRequestHeaders;
  params?: any;
  data?: D;
  // ..还有很多属性，不过不涉及到本章节分析因此省略
}
```

从`AxiosRequestConfig`声明类型可知，如果直接用`Partial<RequestConfig>`修饰请求函数的形参有两个缺陷：

1. **对`config.data`的约束不够严谨**: 当我们在定义`AxiosConfig`的泛型参数`D`时，是对`config.data`进行类型约束，但由于`?:`的存在，`data`在不赋值的情况下不会报出`ts`的错误
2. **缺乏对`config.params`的约束**: 部分请求需要传入`config.params`，因此也需要对`config.params`进行类型约束，但`AxiosConfig`没有泛型参数去对此进行约束

为了解决上面存在的问题，我们对`makeRequest`设计一个类型声明`MakeRequest`，如下所示：

```ts ｜ pure
/**
 * 允许定义三个泛型参数：
 *    Payload为响应数据
 *    Data为请求体参数，对应config.data
 *    Params对应URL的请求参数，对应config.params
 *  对不同泛型值有不同的传参方式
 */
interface MakeRequest {
  // 当不定义泛型或只定义Payload泛型参数时，返回对象data为any或你定义的Payload
  <Payload = any>(config: RequestConfig): (
    requestConfig?: Partial<RequestConfig>,
  ) => Promise<Payload>;
  // 当泛型参数Data被定义时，config和config.data不能为空
  <Payload, Data>(config: RequestConfig): (
    requestConfig: Partial<Omit<RequestConfig, 'data'>> & { data: Data },
  ) => Promise<Payload>;
  // 当泛型参数Params被定义时，config和config.params不能为空
  // 但如果Data为undefined时，config.data可以不填写
  <Payload, Data, Params>(config: RequestConfig): (
    requestConfig: Partial<Omit<RequestConfig, 'data' | 'params'>> &
      (Data extends undefined ? { data?: undefined } : { data: Data }) & {
        params: Params;
      },
  ) => Promise<Payload>;
}
```

我们把`MakeRequest`声明类型加到`makeRequest`函数上，如下所示：

```ts ｜ pure
// 加上MakeRequest声明类型，其余保持不变
const makeRequest: MakeRequest = <T>(config: RequestConfig) => {
  //... 省略
};
```

下面来看一下在`MakeRequest`的作用下，加上泛型参数生成的请求函数，在调用过程中对请求参数校验的结果：

- 在只定义`Payload`的情况下

  ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/98d14a4c6ac044359586f3c86a9c4c02~tplv-k3u1fbpfcp-watermark.image?)

- 定义`Payload`，`Data`的情况下

  ![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9f7fe2f34349409293c7d41f3ec0285f~tplv-k3u1fbpfcp-watermark.image?)

- 定义`Payload`，`Data`，`Param`的情况下

  ![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/229fe2f5c81044f383dafd3ac57741fe~tplv-k3u1fbpfcp-watermark.image?)

- 定义`Payload`，`Param`的情况下

  ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/53c8ed8ce4cc4451b742066bb988f35d~tplv-k3u1fbpfcp-watermark.image?)

从上面的效果可知，我们已经完成了**对请求参数的格式约束**。

---

下面说一下在一些复杂场景下，我们要怎么约束请求参数

#### 2.2.1 提交`Form`表单

提交`Form`类型的数据时，按照之前的约束我们可以这么写：

```ts ｜ pure
export default const register1 = makeRequest<null, FormData>({
  url: '/register',
  method: 'post',
});
```

但这样我们只是指定了`config.data`必须是一个`FormData`类型的变量，但不能指定`FormData`中要有那些字段值。而在`v0.27.0`后`axios`官方提供一种新的写法支持传`FormData`格式的数据，如下所示：

```ts ｜ pure
import axios from 'axios';

axios
  .post(
    'https://httpbin.org/post',
    { x: 1 },
    {
      // 把Content-Type设为multipart/form-data后，axios内部会自动把{x: 1}对象转换为FormData类型的变量
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  )
  .then(({ data }) => console.log(data));
```

详情可看[官方文档此处](https://github.com/axios/axios#-automatic-serialization-to-formdata)，按照上面的写法，我们可以把开头的`register1`请求函数改成下面的写法：

<code src="./2/2.2/2.2.1/index.tsx"></code>

在调用时，控制台信息如下所示

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/33a4e6eb92f04e97858417bbd1548cea~tplv-k3u1fbpfcp-watermark.image?)

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7c015d03126146e2ab9492d9eed13370~tplv-k3u1fbpfcp-watermark.image?)

#### 2.2.2 上传文件

假设文件是通过`<input type="file"/>`获取的，那可以通过下面这个例子来了解：

```ts ｜ pure
export const uploadPhoto = makeRequest<null, { photo: FileList }>({
  url: '/photo',
  method: 'post',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
```

我们可以通过以下代码例子来进行测试：

<code src="./2/2.2/2.2.2/FileInputUpload.tsx"></code>

效果如下所示：

![upload-photo.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/23acf2b43fbc4f938c78cb3c441b39a7~tplv-k3u1fbpfcp-watermark.image?)

此时调用接口时请求参数如下所示：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ad89329015f4427d9b2547be26853c2a~tplv-k3u1fbpfcp-watermark.image?)

---

总结：在**基础篇**中，我们编写了用于生成请求函数的高阶函数`makeRequest`。且通过`ts`的类型声明和泛型约束了请求参数和响应数据的格式。
