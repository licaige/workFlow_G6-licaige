// 可开闭式logger
class Logger {
    showLoggerInfo: boolean

    constructor({ showLoggerInfo }) {
        this.showLoggerInfo = showLoggerInfo
    }

    log(...args: any[]) {
        if (this.showLoggerInfo) {
            console.log('-----lzyMicroApp:', ...args);
        }
    }

    warn(...args: any[]) {
        if (this.showLoggerInfo) {
            console.warn('-----lzyMicroApp:', ...args);
        }
    }

    error(...args: any[]) {
        if (this.showLoggerInfo) {
            console.error('-----lzyMicroApp:', ...args);
        }
    }
}

export default new Logger({ showLoggerInfo: true })