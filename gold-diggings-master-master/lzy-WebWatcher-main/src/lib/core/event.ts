import LzyWebWatcher from './watcher'
import { uuid } from '../utils/uuid'
import { EVENT_TRACK_TAG } from '../utils/constant'
import MessagePool, { EventMessage, ClickEventMessage } from './messagePool'
// 点击事件信息




/**
 * 从点击的节点层层向上获取埋点dom
*/
function getTargetDom(clickedDom: HTMLElement): HTMLElement | undefined {
    if (!clickedDom) return

    // 获取节点到最外层元素的路径
    let path: HTMLElement[] = []

    let currentDom: HTMLElement = clickedDom
    while (currentDom) {
        path.push(currentDom)
        currentDom = currentDom.parentElement
    }

    // 遍历路径 找到第一个埋点元素
    return path.find(ele =>
        ele.hasAttribute && (
            ele.hasAttribute(EVENT_TRACK_TAG) ||
            ele.hasAttribute(EVENT_TRACK_TAG) ||
            ele.hasAttribute(EVENT_TRACK_TAG)
        ))
}


export default class EventWatcher {
    watcher: LzyWebWatcher
    messagePool: MessagePool

    constructor(watcher: LzyWebWatcher) {
        this.watcher = watcher
        this.messagePool = watcher.messagePool
        this.watch()
    }
    // 收集点击事件
    watchClickEvent() {
        document.addEventListener('click', (e: MouseEvent) => {
            const message = new ClickEventMessage({ eventType: 'click' })
            const targetDom = getTargetDom(e.target)
            
            if (!targetDom) return

            const { top, left } = targetDom.getBoundingClientRect(); // 元素距离html的距离
            const { scrollTop, scrollLeft } = document.documentElement; // html距离上和左侧的距离(一般都是0)
            message.eventId = uuid()
            message.title = ''
            message.params = undefined
            message.tiggerTime = Date.now()
            message.url = window.location.href; // 当前页面的url
            message.x = left + scrollLeft
            message.y = top + scrollTop

            this.emit(message)
        })
    }

    // 发送数据
    emit(message: EventMessage) {
        this.messagePool.emit(message)
    }

    // 启动监控
    watch() {
        this.watchClickEvent()
    }
}