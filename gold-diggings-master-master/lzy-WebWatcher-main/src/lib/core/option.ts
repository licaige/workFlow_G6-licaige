const _options = {
    requestUrl: '', // 请求地址
    appName: '', // 应用名称
    appCode: '', // 应用code
    appVersion: '', // 应用版本
    ext: '', // 自定义全局附加参数
    debug: false, // 是否开启触发事件时控制台输出

    pvCore: false, // 页面跳转-是否自动发送页面跳转相关数据
    pvHashtag: false, // 页面跳转-浏览器的动作发生时(例如浏览器的回退按钮)是否监听hash变化,如果是hash路由请开启此开关

    performanceCore: false, // 性能数据-是否采集静态资源、接口的相关数据
    performanceFirstResource: false, // 性能数据-是否采集首次进入页面的数据(ps: tcp连接耗时,HTML加载完成时间,首次可交互时间)
    performanceServer: false, // 接口请求-是否采集接口请求(成功的才会采集)

    errorCore: false, // 是否采集异常数据(ps: 资源引入错误,promise错误,控制台输出错误)
    errorServer: false, // 接口请求-是否采集报错接口数据

    eventCore: false, // 页面点击-是否采集点击事件
    eventUnload: false, // 页面卸载-是否在页面卸载时采集页面状态信息
};


export type IOptions = {
    requestUrl: string  // 请求地址
    appName: string     // 应用名称

    logger: boolean     // 开启触发事件时控制台输出
    watchRouter: boolean // 监控页面跳转
    watchPerformance: boolean // 监控页面性能
    watchError: boolean // 监控页面错误
    watchEvent: boolean // 监控用户事件
}

/**
 * 对用户传入的options进行类型检查  格式化
*/
export function parseOption(options: IOptions): IOptions {

    const {
        requestUrl,
        appName,
        logger,
        watchRouter,
        watchError,
        watchPerformance,
        watchEvent
    } = options

    const initOptions = {
        requestUrl: '',
        appName: '',
        logger: false,
        watchRouter: false,
        watchError: false,
        watchPerformance: false,
        watchEvent: false,
    }

    initOptions.requestUrl = requestUrl || ''
    initOptions.appName = appName || ''
    initOptions.logger = logger || false
    initOptions.watchRouter = watchRouter || false
    initOptions.watchError = watchError || false
    initOptions.watchPerformance = watchPerformance || false
    initOptions.watchEvent = watchEvent || false

    return initOptions
}