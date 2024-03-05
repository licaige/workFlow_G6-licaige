"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("../utils/uuid");
const constant_1 = require("../utils/constant");
const messagePool_1 = require("./messagePool");
// 点击事件信息
/**
 * 从点击的节点层层向上获取埋点dom
*/
function getTargetDom(clickedDom) {
    if (!clickedDom)
        return;
    // 获取节点到最外层元素的路径
    let path = [];
    let currentDom = clickedDom;
    while (currentDom) {
        path.push(currentDom);
        currentDom = currentDom.parentElement;
    }
    // 遍历路径 找到第一个埋点元素
    return path.find(ele => ele.hasAttribute && (ele.hasAttribute(constant_1.EVENT_TRACK_TAG) ||
        ele.hasAttribute(constant_1.EVENT_TRACK_TAG) ||
        ele.hasAttribute(constant_1.EVENT_TRACK_TAG)));
}
class EventWatcher {
    constructor(watcher) {
        this.watcher = watcher;
        this.messagePool = watcher.messagePool;
        this.watch();
    }
    // 收集点击事件
    watchClickEvent() {
        document.addEventListener('click', (e) => {
            const message = new messagePool_1.ClickEventMessage({ eventType: 'click' });
            const targetDom = getTargetDom(e.target);
            if (!targetDom)
                return;
            const { top, left } = targetDom.getBoundingClientRect(); // 元素距离html的距离
            const { scrollTop, scrollLeft } = document.documentElement; // html距离上和左侧的距离(一般都是0)
            message.eventId = (0, uuid_1.uuid)();
            message.title = '';
            message.params = undefined;
            message.tiggerTime = Date.now();
            message.url = window.location.href; // 当前页面的url
            message.x = left + scrollLeft;
            message.y = top + scrollTop;
            this.emit(message);
        });
    }
    // 发送数据
    emit(message) {
        this.messagePool.emit(message);
    }
    // 启动监控
    watch() {
        this.watchClickEvent();
    }
}
exports.default = EventWatcher;
