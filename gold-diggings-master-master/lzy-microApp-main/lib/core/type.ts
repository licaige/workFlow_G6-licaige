import type ProxySandbox from './sandBox'

type AttrType = string | null

// 全局执行的js和css
type globalAssetsType = {
    js?: string[],
    css?: string[],
}

export type LifecycleEventName = keyof lifeCyclesType

// lifecycle类型
export type lifeCyclesType = {
    created(e: CustomEvent): void
    beforemount(e: CustomEvent): void
    mounted(e: CustomEvent): void
    unmount(e: CustomEvent): void
    error(e: CustomEvent): void
}
// 单个App的资源
export type sourceType = {
    html: HTMLElement | null, // html address
    links: Set<string>, // style/link address list
    scripts: Set<string>, // script address list
}
// 单个App的配置
export type MicroAppConfig = {
    name: string// name: app name
    url: string// url: html address
    shadowDom?: boolean// shadowDom: use shadowDOM, default is false
    scopecss?: boolean// disableScopecss: whether disable css scoped, default is false
    useSandbox?: boolean // disableSandbox: whether disable sandbox, default is false
    baseRoute?: string// baseRoute: route prefix, default is ''
}
// 全局配置
export interface OptionsType extends MicroAppConfig {
    tagName?: string
    lifeCycles?: lifeCyclesType
    globalAssets?: globalAssetsType,
    // plugins?: plugins 用于适配webpack插件
}
// 单个MicroAppElement类型
export interface MicroAppElementType {
    appName: AttrType // app name
    appUrl: AttrType // app url

    // Hooks for element append to documents
    connectedCallback(): void

    // Hooks for element delete from documents
    disconnectedCallback(): void

    // Hooks for element attributes change
    attributeChangedCallback(a: 'name' | 'url', o: string, n: string): void
}
// 创建app参数
export type CreateAppParam = {
    name: string
    url: string
    scopecss: boolean
    useSandbox: boolean
    container?: HTMLElement | ShadowRoot
}
// App实例
export interface AppInterface {
    source: sourceType // app资源
    sandBox: ProxySandbox | null // 沙箱实例
    name: string // app name
    url: string // app url
    useSandbox: boolean
    container: HTMLElement | ShadowRoot | null// 微前端容器dom

    // 获取app资源 
    loadSourceCode(): void
    // 获取app资源回调
    onLoad(): void
    // 错误处理
    onLoadError(): void
    // mount app
    mount(): void
    // unmount app
    unmount(unmountParam: any): void
    // app rendering error
    onerror(e: Error): void
}




