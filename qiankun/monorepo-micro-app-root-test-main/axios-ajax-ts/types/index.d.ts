import {
	type AxiosInstance,
	type RawAxiosResponseHeaders,
	type AxiosResponseHeaders,
	type AxiosRequestConfig,
	type InternalAxiosRequestConfig,
	type AxiosResponse,
	AxiosError,
} from 'axios';

// interface NewAxiosInstance extends AxiosInstance {
// 	setToken: (token: string) => void;
// }

/** 请求配置相关类型 */
// 自定义请求配置
export interface NewReqConfig {
	authtoken?: boolean;
	fetchLock?: boolean;
	quiet?: boolean;
	readType?: string;
	loadTarget?: string;
	isSync?: boolean;
}

// 拦截请求配置类型接口
export interface NewAxiosReqConfig<D = any> extends AxiosRequestConfig, NewReqConfig {}
// 请求实例配置类型接口
export interface NewInternalAxiosReqConfig<D = any> extends InternalAxiosRequestConfig, NewReqConfig { }

// 自定义实例化请求配置类型
export interface ReqOpts<D = any> {
	paramId?: string;
	params?: any;
	data?: D;
}

// 实例化请求配置类型接口
export interface ReqOptsConfig<D = any> extends ReqOpts, AxiosRequestConfig {
	// method: string;
	// url: string;
	authtoken?: boolean;
	// isFormdata?: boolean;
}
// 实例化请求附加配置类型接口
export interface ExtraTypeOpts {
	isProd?: boolean;
	envBaseUrl: string;
	envUploadUrl?: string;
	envTokenKey?: string;
	envRefreshKey?: string;
	router?: any;
	store?: any;
	message?: any | ((obj: object) => void);
	loading?: any | ((target: string) => void);
	closeLoading?: any | (() => void);
	goToLogin: () => void;
	refreshTokenFn: Function; 
}

// 自定义实例化上传数据类型
export interface UploadFileItemType {
	name: string;
	value: string | blob | arraybuffer
}
// 自定义实例化上传配置接口类型
export type UploadReqConfig = Omit<ReqOptsConfig, 'data'>

export interface InterceptorsMap {
  requestInterceptor: (res: AxiosRequestConfig) => AxiosRequestConfig;
	requestInterceptorErr?: (error: any) => any;
  responseInterceptor: (res: AxiosResponse) => AxiosResponse;
  responseInterceptorErr?: (error: any) => any
}

/** 自定义响应配置类型接口 */
export interface NewAxiosResponse<T = any, D = any> extends Omit<AxiosResponse, "config"> {
	// headers: RawAxiosResponseHeaders | AxiosResponseHeaders; // traceId?: any; // 通常后端生成放在headers里
	// config: InternalAxiosRequestConfig<D>;
	config: NewInternalAxiosReqConfig<D>;
}
// 自定义响应数据类型接口
export interface ResDataTypeMode<G = any> {
	success: boolean;
	code: number | string;
	data: G;
	message: string | null;
}

/** 自定义错误配置类型 */
export interface NewAxiosError<T = any, D = any> extends AxiosError {
	// config?: InternalAxiosRequestConfig<D>;
	// code?: string;
	// request?: any;
	response: NewAxiosResponse<T, D>;
	status: number;
}

export class HttpAxios {
	constructor(options: ExtraTypeOpts, config?: AxiosRequestConfig);

	axiosConfig: NewAxiosReqConfig;
	otherOpts: ExtraTypeOpts;
	axiosInstance: AxiosInstance;
	loading: boolean;

	public static requests: any[];
	public static isRefreshToken: boolean;
	public static loadingReqCount: number;
	public static retryOrigRequest(config: NewInternalAxiosReqConfig, tokenkey: string | undefined): Promise<NewInternalAxiosReqConfig, string | undefined>;

	private interceptorsRequest(): void;
	private interceptorsResponse(): void;
	
	public ajax<T = any, R = NewAxiosResponse<ResDataTypeMode<T>, any>, D = any>(opts: ReqOptsConfig<D>): Promise<R>;
	public get<T = any, R = NewAxiosResponse<ResDataTypeMode<T>, any>, D = any>(opts: ReqOptsConfig<D>): Promise<R>;
	public post<T = any, R = NewAxiosResponse<ResDataTypeMode<T>, any>, D = any>(opts: ReqOptsConfig<D>): Promise<R>;
	public put<T = any, R = NewAxiosResponse<ResDataTypeMode<T>, any>, D = any>(opts: ReqOptsConfig<D>): Promise<R>;
	public delete<T = any, R = NewAxiosResponse<ResDataTypeMode<T>, any>, D = any>(opts: ReqOptsConfig<D>): Promise<R>;
	public upload<T = string, R = NewAxiosResponse<ResDataTypeMode<T>, any>>(fileItem: UploadFileItemType, opts?: UploadReqConfig): Promise<R> | null;

  // head<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
  // options<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
  // post<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
  // put<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
  // patch<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
  // postForm<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
}