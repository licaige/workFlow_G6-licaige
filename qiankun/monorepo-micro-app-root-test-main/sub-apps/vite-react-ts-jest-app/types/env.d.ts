/// <reference types="vite/client" />

interface ImportMetaEnv extends Readonly<Record<string, unknown>> {
  // 环境变量...
  readonly VITE_NODE_ENV: string
  // 项目标题
  readonly VITE_APP_TITLE: string
  // 是否预览服务
  readonly VITE_APP_PREVIEW?: boolean
  // 是否mock数据
  readonly VITE_APP_MOCK: boolean
  // 输出打包路径
  readonly VITE_OUTPUT_DIR: boolean

  // 公共基础路径
  // readonly BASE_URL: string
  readonly APP_BASE_ROUTER: string
  // 前端服务端口号
  readonly VITE_PORT: number
  // 正式api请求地址
  readonly APP_API_BASE_URL: string
  // 权限请求地址
  readonly APP_API_AURTH_URL: string
  // Socket推送地址
  readonly APP_API_WS_URL: string
  // CDN请求包地址
  readonly APP_CDN_URL: string

  // 透传参数
  readonly VITE_POSITION: string
  readonly APP_KEY: string
}

interface ImportMeta {
  // env: Record<string, unknown>
  readonly env: ImportMetaEnv; // Record<string, unknown>;
  // glob<T = unknown>(globPath: string): Record<string, T>;
  /**
   * @deprecated Use `import.meta.glob('*', { eager: true })` instead globEager
   */
  // globEager<T = unknown>(globPath: string): Record<string, T>
}