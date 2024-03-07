import { TriggerOpTypes } from "./operation";

export function effect(fn, options = {}) { // watchEffect
    const effect = createReactiveEffect(fn, options);
    if (!options.lazy) { // 后续可能有lazy的情况
        effect(); // 默认就要执行
    }
    return effect;
}
// 创建响应式的effect
let uid = 0;
let activeEffect;
const effectStack = []; // 栈结构
function createReactiveEffect(fn, options) {
    const effect = function reactiveEffect() {
        if (!effectStack.includes(effect)) { // 防止不停的更改属性导致死循环
            try {
                effectStack.push(effect);
                activeEffect = effect; // 将effect放到了 activeEffect上
                return fn();
            } finally {
                effectStack.pop(); // vue2
                activeEffect = effectStack[effectStack.length - 1];
            }
        }
    }
    effect.options = options;
    effect.id = uid++;
    effect.deps = []; // 依赖了哪些属性
    // todo...
    return effect;
}
const targetMap = new WeakMap(); //用法和map一致  但是弱引用 不会导致内存泄漏
export function track(target, type, key) { // a = [effect,effect]  b = [effect]
    if (activeEffect == undefined) {
        return; // 说明取值的属性 不依赖于 effect
    }
    let depsMap = targetMap.get(target); // 根据key 来进行取值

    if (!depsMap) {
        targetMap.set(target, (depsMap = new Map()))
    }
    let dep = depsMap.get(key);
    if (!dep) {
        depsMap.set(key, (dep = new Set()));
    }
    if (!dep.has(activeEffect)) {
        dep.add(activeEffect); // { "{name:'zf'}":{name:set(effect)}  }
        // activeEffect.deps.push(dep); // 让这个effect 记录dep属性
    }
}
export function trigger(target, type, key, value, oldValue) {
    const depsMap = targetMap.get(target); // 获取当前对应的map
    if (!depsMap) {
        return;
    }
    // 计算属性要优先于effect执行
    const effects = new Set();
    const computedRunners = new Set();

    const add = (effectsToAdd) => {
        if (effectsToAdd) {
            effectsToAdd.forEach(effect => {
                if (effect.options.computed) {
                    computedRunners.add(effect);
                } else {
                    effects.add(effect);
                }
            });
        }
    }

    // const run = (effects) => {
    //     if (effects) {
    //         effects.forEach(effect => effect())
    //     }
    // }
    if (key !== null) { // arr.push(4) [1,2,3    , 4]   push length
        add(depsMap.get(key));
    }
    if (type === TriggerOpTypes.ADD) { // 对数组新增属性 会触发length 对应的依赖 在取值的时候回对length属性进行依赖收集
        add(depsMap.get(Array.isArray(target) ? 'length' : ''));
    }
    const run = (effect) => {
        if (effect.options.scheduler) {
            effect.options.scheduler();
        } else {
            effect();
        }
    }
    computedRunners.forEach(run);
    effects.forEach(run);
}