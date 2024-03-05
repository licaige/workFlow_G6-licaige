import LzyWebWatcher from './watcher'
import MessagePool, { EventMessage, TimePerformanceMessage } from './messagePool'
import { uuid } from '../utils/uuid'

export type TimePerformance = {
    fmp: number         // 首屏渲染时间
    fpt?: number         // 白屏时间
    tti?: number         // 首次可交互时间
    ready?: number       // HTML加载完成时间
    onload?: number      // 页面完全加载时间
    firstbyte?: number   // 首包时间
    dns?: number         // dns查询耗时
    appcache?: number    // dns缓存时间
    tcp?: number         // tcp连接耗时
    ttfb?: number        // 请求响应耗时
    trans?: number       // 内容传输耗时    
    dom?: number         // dom解析耗时
    res?: number         // 同步资源加载耗时
    ssllink?: number     // SSL安全连接耗时
    redirect?: number    // 重定向时间
    unloadTime?: number  // 上一个页面的卸载耗时
}

//todo API兼容性判断
const supported = {
    performance: !!window.performance,
    getEntriesByType: !!(window.performance && performance.getEntriesByType),
    PerformanceObserver: 'PerformanceObserver' in window,
    MutationObserver: 'MutationObserver' in window,
    PerformanceNavigationTiming: 'PerformanceNavigationTiming' in window,
};

/**
 * 格式化性能记录,小数位数保留最多两位, 等于0的字段不传输,标记为undefined
 */
function normalizePerformanceRecord(t: TimePerformance) {
    Object.keys(t).forEach((p) => {
        const v = t[p];
        if (typeof v === 'number') t[p] = v === 0 ? undefined : parseFloat(v.toFixed(2));
    });
    return t;
}

export default class PerformanceWatcher {
    watcher: LzyWebWatcher
    messagePool: MessagePool

    constructor(watcher: LzyWebWatcher) {
        this.watcher = watcher
        this.messagePool = watcher.messagePool
        this.watch()
    }

    //todo/**计算首屏渲染时间FMP */
    getFirstMeaningfulPaint() {
        let fmpTime = 0
        // 记录paint时间,获取最后一次的paint时间作为fmpTime(navigation v1版本)
        if (supported.getEntriesByType) {
            const { performance } = window
            const paintEntries = performance.getEntriesByType('paint');

            console.log('计算FMP', paintEntries);
            if (paintEntries.length) {
                // fmpTime = paintEntries.pop().startTime
            }
        }

        // 如果是v2版本, 则首屏渲染时间减去原先重定向时间
        if (fmpTime && supported.PerformanceNavigationTiming) {
            fmpTime -= window.performance.timing.fetchStart
        }
        console.log('计算FMP', fmpTime);

        return fmpTime
    }

    /** 兼容v2和v1的perfermanceAPI(优先使用v2)  https://www.w3.org/TR/navigation-timing-2/*/
    supportTimingAPI() {
        // todo 进行类型兼容
        // let t: PerformanceTiming | PerformanceEntry
        //     = supported.PerformanceNavigationTiming
        //         ? window.performance.getEntriesByType('navigation')[0]
        //         : window.performance.timing

        let t = window.performance.timing
        return t
    }

    /**发送首屏渲染数据*/
    postFirstRenderPerformance() {
        const t = this.supportTimingAPI()

        const times: TimePerformance =
        {
            fmp: this.getFirstMeaningfulPaint(),

            fpt: t.responseEnd - t.fetchStart, // 白屏时间 (从请求开始到浏览器开始解析第一批HTML文档字节的时间差)

            tti: t.domInteractive - t.fetchStart, // 首次可交互时间

            ready: t.domContentLoadedEventEnd - t.fetchStart, // HTML加载完成时间

            onload: t.loadEventStart - t.fetchStart, // 页面完全加载时间

            firstbyte: t.responseStart - t.domainLookupStart, // 首包时间

            dns: t.domainLookupEnd - t.domainLookupStart, // dns查询耗时

            appcache: t.domainLookupStart - t.fetchStart, // dns缓存时间

            tcp: t.connectEnd - t.connectStart,// tcp连接耗时

            ttfb: t.responseStart - t.requestStart,// 请求响应耗时

            trans: t.responseEnd - t.responseStart, // 内容传输耗时

            dom: t.domInteractive - t.responseEnd, // dom解析耗时

            res: t.loadEventStart - t.domContentLoadedEventEnd, // 同步资源加载耗时

            ssllink: t.connectEnd - t.secureConnectionStart, // SSL安全连接耗时

            redirect: t.redirectEnd - t.redirectStart, // 重定向时间

            unloadTime: t.unloadEventEnd - t.unloadEventStart // 上一个页面的卸载耗时
        }

        const message = new TimePerformanceMessage({ eventType: 'FirstRenderPerformance' })
        message.eventId = uuid()
        message.url = window.location.href
        message.time = normalizePerformanceRecord(times)
        message.tiggerTime = Date.now()

        this.emit(message)
    }

    /**发送资源加载性能数据*/
    postResourcePerformance() {

    }

    /**监控页面资源加载性能*/
    observeResource() {

    }

    /**开始监视性能*/
    watch() {
        //! 初始化方法可能在onload事件之后才执行,此时不会触发load事件了,检查document.readyState属性来判断onload事件是否会被触发
        if (document.readyState === 'complete') {
            if (supported.performance) this.postFirstRenderPerformance();
            if (supported.getEntriesByType) this.observeResource();
        } else {
            window.addEventListener('load', () => {
                if (supported.performance) this.postFirstRenderPerformance();
                if (supported.getEntriesByType) this.observeResource();
            })
        }
    }

    /**上报数据*/
    emit(message: EventMessage) {
        this.messagePool.emit(message)
    }
}