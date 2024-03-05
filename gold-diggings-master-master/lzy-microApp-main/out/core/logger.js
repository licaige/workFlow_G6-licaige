"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 可开闭式logger
class Logger {
    constructor({ showLoggerInfo }) {
        this.showLoggerInfo = showLoggerInfo;
    }
    log(...args) {
        if (this.showLoggerInfo) {
            console.log('-----lzyMicroApp:', ...args);
        }
    }
    warn(...args) {
        if (this.showLoggerInfo) {
            console.warn('-----lzyMicroApp:', ...args);
        }
    }
    error(...args) {
        if (this.showLoggerInfo) {
            console.error('-----lzyMicroApp:', ...args);
        }
    }
}
exports.default = new Logger({ showLoggerInfo: true });
