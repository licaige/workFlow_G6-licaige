/**
 * 基于原生Dom中 EventTarget 类的事件总线
 * 
 * @remarks
 * event-bus 是基于原生 EventTarget 类来开发的事件总线，充分复用原生的能力增加了易用性。拥有极少的代码就实现了 EventBus 的核心功能。
 * 
 * 具备以下特性：
 * 
 * - 基于 `EventTarget` 实现，拥有极少量的代码 和 极高的性能
 * 
 * - 拥有丰富、易用的 API，如：一次性监听、指定次数的监听 等等
 * 
 * - 派发事件时，自动配置 Event 相关属性为合适的值
 * 
 * @packageDocumentation
 */


import type {KeyOfNonNullableValue,KeyOfNullableValue} from "./tools"


/**
 * 事件监听器的选项
 * @public
 */
export interface EventBusEventListenerOptions extends AddEventListenerOptions {
  /**
   * 监听的次数
   */
  times?: number | null;
}

/**
 * 移除监听器
 * @public
 */
export type RemoveListener = () => void;


/**
 * EventBus 的 自定义事件的监听器
 */
export interface BusListener<Detail = any> {
  (evt: BusEvent<Detail>): void;
}

/**
 * EventBus 的 自定义事件的监听器对象
 */
export interface BusListenerObject<Detail = any> {
  handleEvent(object: BusEvent<Detail>): void;
}

/**
 * EventBus 的 自定义事件的监听器 或 监听器对象
 */
export type BusListenerOrEventListenerObject<Detail = any> = BusListener<Detail> | BusListenerObject<Detail>;


/**
 * 获取事件的数据类型
 */
export type GetEventDetail<D> = D extends Event ? (D extends CustomEvent<infer Detail> ? Detail : never) : D;


/**
 * 事件类型
 */
export type BusEvent<D> = D extends Event ? D :  CustomEvent<D>;



/**
 * 事件总线
 * 
 * @remarks
 * event-bus 是基于原生 EventTarget 类来开发的事件总线，充分复用原生的能力增加了易用性。拥有极少的代码就实现了 EventBus 的核心功能。
 * 
 * @typeParam EventMap - 事件名字 与 事件的数据类型 或 事件类型 的映射
 * 
 * @public
 */
export class EventBus<EventMap extends Record<string,any> = Record<string,any>> extends EventTarget {


  /**
   * 添加事件监听器；会返回一个用于移除事件监听器的函数；
   * @remarks
   * 当没有指定 times 选项时，也可以通过 EventTarget 的 removeEventListener 方法移除；
   * 当指定 times 选项时，只能通过 返回的函数移除监听器
   * 
   * @param type - 事件名字、事件类型
   * @param callback - 事件监听器，触发事件时会调用此函数
   * @param options - 选项
   * @returns  返回用于移除事件监听器的函数； 也可以通过 `EventTarget#removeEventListener` 方法移除
   */
  public override addEventListener<Type extends keyof EventMap>(type: Type, callback: BusListenerOrEventListenerObject<EventMap[Type]> | null, options?: EventBusEventListenerOptions | boolean): RemoveListener {
    const times = (options as any)?.times;
    if (times) {
      const listener =
        typeof callback === 'function' ? callback : callback?.handleEvent;
      if (listener) {
        return this.multipleListen(type, listener, times);
      }
    }
    super.addEventListener(type as string, callback as EventListenerOrEventListenerObject, options);
    return () => {
      this.removeEventListener(type as string, callback as EventListenerOrEventListenerObject, options);
    };
  }





  /**
   * 派发事件
   * @remarks 
   * 如果该被派发的事件的事件类型(event's type)在方法调用之前没有被经过初始化被指定，就会抛出一个 UNSPECIFIED_EVENT_TYPE_ERR 异常，或者如果事件类型是null或一个空字符串. event handler 就会抛出未捕获的异常； 这些 event handlers 运行在一个嵌套的调用栈中： 他们会阻塞调用直到他们处理完毕，但是异常不会冒泡。
   * 
   * **注意：** 与浏览器原生事件不同，原生事件是由DOM派发的，并通过event loop异步调用事件处理程序，而dispatchEvent()则是同步调用事件处理程序。在调用dispatchEvent()后，所有监听该事件的事件处理程序将在代码继续前执行并返回。
   * 
   * @param name - 事件的名字
   * @param detail - 事件所携带的数据、信息
   * @returns 当该事件是可取消的(cancelable为true)并且至少一个该事件的 事件处理方法 调用了 `Event#preventDefault()`，则返回值为 `false`；否则返回`true`。
   */
  public override dispatchEvent<Type extends KeyOfNonNullableValue<EventMap>>(name: Type, detail: GetEventDetail<EventMap[Type]>): boolean;
  public override dispatchEvent<Type extends KeyOfNullableValue<EventMap>>(name: Type, detail?: GetEventDetail<EventMap[Type]>): boolean;

  /**
   * 派发事件
   * @param event - 事件对象
   */
  public override dispatchEvent(event: Event): boolean;
  public override dispatchEvent(event: string | Event, detail?: GetEventDetail<EventMap[string]>) {
    const cusEvent = event instanceof Event ? event : new CustomEvent(event, { detail, bubbles: false, cancelable: true, composed: false });
    return super.dispatchEvent(cusEvent);
  }



  /**
   * 添加一次性的事件监听器；
   * 
   * @remarks
   * 会返回一个用于移除一次性事件监听器的函数； 也可以通过 EventTarget 的 removeEventListener 方法移除
   * 
   * @param type - 事件名字、事件类型
   * @param callback - 事件监听器，触发事件时会调用此函数
   * @param options - 选项
   * @returns removeEventListener():void; 返回用于移除一次性事件监听器的函数； 也可以通过 EventTarget 的 removeEventListener 方法移除
   */
  public onceListen<Type extends keyof EventMap>(type: Type, callback: BusListener<EventMap[Type]>, options?: AddEventListenerOptions): RemoveListener {
    return this.addEventListener(type, callback, { ...options, once: true });
  }



  /**
   * 添加监听指定次数的事件监听器；
   * 
   * @remarks
   * 当事件触发指定次数后，会自动移除监听器；会返回一个用于移除事件监听器的函数； 不能通过 EventTarget 的 removeEventListener 方法移除
   * 
   * @param type - 事件名字、事件类型
   * @param callback - 事件监听器，触发事件时会调用此函数
   * @param times  需要监听的次数，如果小于 1 ，永远不会自动移除事件监听器，需要手动移除
   * @returns removeEventListener():void; 返回用于移除事件监听器的函数； 不能通过 EventTarget 的 removeEventListener 方法移除
   */
  public multipleListen<Type extends keyof EventMap>(type: Type, callback: BusListener<EventMap[Type]>, times: number): RemoveListener {
    let count = 0;
    const controller = new AbortController();
    const signal = controller.signal;

    super.addEventListener(type as string, (event) => {
      if (++count >= times) {
        controller.abort();
      }
      callback.call(this, event as any);
    }, { signal });

    return function () {
      controller.abort();
    };
  }
}


export default EventBus