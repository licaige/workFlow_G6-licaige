import EventBus from "../src/index"

// 创建可监听或派发任意事件的事件总结实例
// const ebus = new EventBus()

// 创建只能派发 或 监听 指定事件的事件总线实例
/**
 * 可以通过给 EventBus 指定 事件名字 与 数据类型或事件类型的映射 来明确每个事件对应的事件的数据类型
 * 这样，以后使用 ebus 时就会自动提示对应的数据类型，在遇到不符合的映射的数据类型时也会提示错误
 */

interface EventMap {
    /**
     * 名字为 `a` 的事件的对应的数据的类型 是 string
     */
    a:string;

    /**
     * 名字为 `b` 的事件的对应的数据的类型 是 number
     */
    b:number;

    /**
     * 名字为 `e` 的事件的对应的事件类型 是 ProgressEvent
     */
    e:ProgressEvent;
}
const ebus = new EventBus<EventMap>()

/**
 * 当监听事件 `a` 时，detail 就会被自动识别为 string
 */
ebus.addEventListener("a",(event) => {
    const detail = event.detail;  // detail 为 string 类型
});

/**
 * 当监听不存在的事件 `c` 时，会报错
 */
ebus.addEventListener("c",(event) => {
    const d = event;
});   // 错误提示：类型“"c"”的参数不能赋给类型“keyof EventDataMap”的参数。

/**
 * 因为 EventMap 定义了名字 `e` 的事件类型为 ProgressEvent，所以 下面 event 参数的类型为 ProgressEvent
 */
ebus.addEventListener("e",(event) => {
    const d = event;  //  event 的类型为 ProgressEvent
});


/**
 * 当派发事件时，如果 指定的 detail 与 指定的事件 不符合，也会报错
 */
ebus.dispatchEvent("a",33);   // 错误提示：类型“number”的参数不能赋给类型“string”的参数。





// 只监听一次的便捷方法，当事件触发一次后，会自动移除监听器
ebus.onceListen("a",function(event) {
    
})


// 监听指定次数的便捷方法，当事件触发指定次数后，会自动移除监听器
ebus.multipleListen("a",(event)=>{},3)


// 监听一次 或 多次，也可通过 addEventListener 方法来指定
ebus.addEventListener("a",(event)=>{},{
    times:3, // 监听3次
    // once:true, // 只监听一次，也可以通过 times:1 来指定
});


// 对于 任何监听函数（如：`onceListen()`,`multipleListen()`,`addEventListener()` ） 都会返回一个函数，用于移除监听器
const remove = ebus.addEventListener("a",(event)=>{});
// 移除监听器
remove();

// 也可以用 EventTarget 的方法来移除监听器，如下：
ebus.removeEventListener("a",fun)



