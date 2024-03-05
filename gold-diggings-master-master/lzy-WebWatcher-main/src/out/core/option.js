"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseOption = void 0;
const _options = {
    requestUrl: '',
    appName: '',
    appCode: '',
    appVersion: '',
    ext: '',
    debug: false,
    pvCore: false,
    pvHashtag: false,
    performanceCore: false,
    performanceFirstResource: false,
    performanceServer: false,
    errorCore: false,
    errorServer: false,
    eventCore: false,
    eventUnload: false, // 页面卸载-是否在页面卸载时采集页面状态信息
};
/**
 * 对用户传入的options进行类型检查  格式化
*/
function parseOption(options) {
    const { requestUrl, appName, logger, watchRouter, watchError, watchPerformance, watchEvent } = options;
    const initOptions = {
        requestUrl: '',
        appName: '',
        logger: false,
        watchRouter: false,
        watchError: false,
        watchPerformance: false,
        watchEvent: false,
    };
    initOptions.requestUrl = requestUrl || '';
    initOptions.appName = appName || '';
    initOptions.logger = logger || false;
    initOptions.watchRouter = watchRouter || false;
    initOptions.watchError = watchError || false;
    initOptions.watchPerformance = watchPerformance || false;
    initOptions.watchEvent = watchEvent || false;
    return initOptions;
}
exports.parseOption = parseOption;
