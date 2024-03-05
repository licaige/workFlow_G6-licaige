"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messagePool_1 = require("./messagePool");
const uuid_1 = require("../utils/uuid");
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
function normalizePerformanceRecord(t) {
    Object.keys(t).forEach((p) => {
        const v = t[p];
        if (typeof v === 'number')
            t[p] = v === 0 ? undefined : parseFloat(v.toFixed(2));
    });
    return t;
}
class PerformanceWatcher {
    constructor(watcher) {
        this.watcher = watcher;
        this.messagePool = watcher.messagePool;
        this.watch();
    }
    //todo/**计算首屏渲染时间FMP */
    getFirstMeaningfulPaint() {
        let fmpTime = 0;
        // 记录paint时间,获取最后一次的paint时间作为fmpTime(navigation v1版本)
        if (supported.getEntriesByType) {
            const { performance } = window;
            const paintEntries = performance.getEntriesByType('paint');
            console.log('计算FMP', paintEntries);
            if (paintEntries.length) {
                // fmpTime = paintEntries.pop().startTime
            }
        }
        // 如果是v2版本, 则首屏渲染时间减去原先重定向时间
        if (fmpTime && supported.PerformanceNavigationTiming) {
            fmpTime -= window.performance.timing.fetchStart;
        }
        console.log('计算FMP', fmpTime);
        return fmpTime;
    }
    /** 兼容v2和v1的perfermanceAPI(优先使用v2)  https://www.w3.org/TR/navigation-timing-2/*/
    supportTimingAPI() {
        // todo 进行类型兼容
        // let t: PerformanceTiming | PerformanceEntry
        //     = supported.PerformanceNavigationTiming
        //         ? window.performance.getEntriesByType('navigation')[0]
        //         : window.performance.timing
        let t = window.performance.timing;
        return t;
    }
    /**发送首屏渲染数据*/
    postFirstRenderPerformance() {
        const t = this.supportTimingAPI();
        const times = {
            fmp: this.getFirstMeaningfulPaint(),
            fpt: t.responseEnd - t.fetchStart,
            tti: t.domInteractive - t.fetchStart,
            ready: t.domContentLoadedEventEnd - t.fetchStart,
            onload: t.loadEventStart - t.fetchStart,
            firstbyte: t.responseStart - t.domainLookupStart,
            dns: t.domainLookupEnd - t.domainLookupStart,
            appcache: t.domainLookupStart - t.fetchStart,
            tcp: t.connectEnd - t.connectStart,
            ttfb: t.responseStart - t.requestStart,
            trans: t.responseEnd - t.responseStart,
            dom: t.domInteractive - t.responseEnd,
            res: t.loadEventStart - t.domContentLoadedEventEnd,
            ssllink: t.connectEnd - t.secureConnectionStart,
            redirect: t.redirectEnd - t.redirectStart,
            unloadTime: t.unloadEventEnd - t.unloadEventStart // 上一个页面的卸载耗时
        };
        const message = new messagePool_1.TimePerformanceMessage({ eventType: 'FirstRenderPerformance' });
        message.eventId = (0, uuid_1.uuid)();
        message.url = window.location.href;
        message.time = normalizePerformanceRecord(times);
        message.tiggerTime = Date.now();
        this.emit(message);
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
            if (supported.performance)
                this.postFirstRenderPerformance();
            if (supported.getEntriesByType)
                this.observeResource();
        }
        else {
            window.addEventListener('load', () => {
                if (supported.performance)
                    this.postFirstRenderPerformance();
                if (supported.getEntriesByType)
                    this.observeResource();
            });
        }
    }
    /**上报数据*/
    emit(message) {
        this.messagePool.emit(message);
    }
}
exports.default = PerformanceWatcher;
