import { isObject, hasOwn, hasChanged } from "../shared/utils";
import { reactive } from "./reactive";
import { trigger, track } from "./effect";
import { TrackOpTypes, TriggerOpTypes } from "./operation";

const get = createGetter();
const set = createSetter();
// proxy + reflect => es6 的api
function createGetter() {
    return function get(target, key, receiver) { // proxy + reflect
        const res = Reflect.get(target, key, receiver); // target[key];
        // todo..
        // console.log('用户对这个对象取值了',target,key);

        track(target,TrackOpTypes.GET, key); // 依赖收集
        if (isObject(res)) {
            return reactive(res)
        }
        return res
    }
}

function createSetter() {
    return function set(target, key, value, receiver) {
        // 需要判断是修改属性 还是增加属性 ，如果原来的值 和新设置的值一样什么都不做
        const hadKey = hasOwn(target, key);
        const oldValue = target[key];
        const result = Reflect.set(target, key, value, receiver); // target[key] = value
        // todo...
        if (!hadKey) {
            // console.log('属性的新增操作',target,key);
            trigger(target, TriggerOpTypes.ADD, key, value);
        } else if (hasChanged(value, oldValue)) {
            // console.log('修改操作',target,key);
            trigger(target, TriggerOpTypes.SET, key, value,oldValue); // 触发依赖更新
        }
        // 值没有变化什么都不用做
        return result;
    }
}

// 拦截普通对象和数组的处理
export const mutableHandler = {
    get,
    set,
    // 除了代理这些方法之外 可能还有很多逻辑 deleteProperty has...
}