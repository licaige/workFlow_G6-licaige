
import { parseOption, IOptions } from './option'
import ErrorWatcher from './error'
import EventWatcher from './event'
import RouterWatcher from './router'
import PerformanceWatcher from './performance'
import MessagePool from './messagePool'

/**
 * 前端页面监控器
*/
class LzyWebWatcher {

    messagePool: MessagePool
    private _options: IOptions
    private errorWatcher: ErrorWatcher
    private eventWatcher: EventWatcher
    private routerWatcher: RouterWatcher
    private performanceWatcher: PerformanceWatcher


    constructor(option: any = {}) {
        const _options = parseOption(option)
        this.init(_options)
    }



    private init(options: IOptions) {
        this._options = options

        const {
            requestUrl,
            appName,
            logger,
            watchEvent,
            watchError,
            watchRouter,
            watchPerformance
        } = options

        this.messagePool = new MessagePool(options)
        this.errorWatcher = watchError ? new ErrorWatcher(this) : null
        this.eventWatcher = watchEvent ? new EventWatcher(this) : null
        this.routerWatcher = watchRouter ? new RouterWatcher(this) : null
        this.performanceWatcher = watchPerformance ? new PerformanceWatcher(this) : null
    }

}

export default LzyWebWatcher