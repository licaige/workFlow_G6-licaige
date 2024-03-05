import { IOptions } from './option'
import { TimePerformance } from './performance'

/**
 * 定义消息池和各种类型的message
*/
export type EventMessage = ClickEventMessage | TimePerformanceMessage


export class ClickEventMessage {
    eventType: string
    eventId: string
    tiggerTime: number
    url: string
    params: any
    title: string
    x: number
    y: number

    constructor(config = {}) {
        const list = ['eventType', 'eventId', 'url', 'params', 'title', 'x', 'y'];
        list.forEach((key) => { this[key] = config[key] || null; });
    }
}

export class TimePerformanceMessage {
    eventType: string
    eventId: string
    tiggerTime: number
    url: string
    time: TimePerformance

    constructor(config = {}) {
        const list = ['eventType', 'eventId', 'tiggerTime', 'time', 'url'];
        list.forEach((key) => { this[key] = config[key] || null; });
    }
}

export default class MessagePool {
    constructor(options: IOptions) { }


    emit(msg: any) {
        console.warn('记录数据', msg);
    }
}