"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const option_1 = require("./option");
const error_1 = __importDefault(require("./error"));
const event_1 = __importDefault(require("./event"));
const router_1 = __importDefault(require("./router"));
const performance_1 = __importDefault(require("./performance"));
const messagePool_1 = __importDefault(require("./messagePool"));
/**
 * 前端页面监控器
*/
class LzyWebWatcher {
    constructor(option = {}) {
        const _options = (0, option_1.parseOption)(option);
        this.init(_options);
    }
    init(options) {
        this._options = options;
        const { requestUrl, appName, logger, watchEvent, watchError, watchRouter, watchPerformance } = options;
        this.messagePool = new messagePool_1.default(options);
        this.errorWatcher = watchError ? new error_1.default(this) : null;
        this.eventWatcher = watchEvent ? new event_1.default(this) : null;
        this.routerWatcher = watchRouter ? new router_1.default(this) : null;
        this.performanceWatcher = watchPerformance ? new performance_1.default(this) : null;
    }
}
exports.default = LzyWebWatcher;
