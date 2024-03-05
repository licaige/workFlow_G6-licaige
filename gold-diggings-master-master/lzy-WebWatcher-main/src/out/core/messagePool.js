"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimePerformanceMessage = exports.ClickEventMessage = void 0;
class ClickEventMessage {
    constructor(config = {}) {
        const list = ['eventType', 'eventId', 'url', 'params', 'title', 'x', 'y'];
        list.forEach((key) => { this[key] = config[key] || null; });
    }
}
exports.ClickEventMessage = ClickEventMessage;
class TimePerformanceMessage {
    constructor(config = {}) {
        const list = ['eventType', 'eventId', 'tiggerTime', 'time', 'url'];
        list.forEach((key) => { this[key] = config[key] || null; });
    }
}
exports.TimePerformanceMessage = TimePerformanceMessage;
class MessagePool {
    constructor(options) { }
    emit(msg) {
        console.warn('记录数据', msg);
    }
}
exports.default = MessagePool;
