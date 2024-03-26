'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

function toDisplayString(value) {
    return String(value);
}

var extend = Object.assign;
var isObject = function (val) {
    return val !== null && typeof val === 'object';
};
var hasChange = function (newVal, val) {
    return !Object.is(newVal, val);
};
var EMPTY_OBJ = {};
var hasOwn = function (obj, key) { return Object.prototype.hasOwnProperty.call(obj, key); };
var camelize = function (str) {
    return str.replace(/-(\w)/g, function (_, c) {
        return c ? c.toUpperCase() : "";
    });
};
var capitalize = function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
var toHandlerKey = function (str) {
    return str ? 'on' + capitalize(str) : '';
};
var isFunction = function (val) {
    return typeof val === 'function';
};
var isString = function (val) { return typeof val === 'string'; };
var invokeArrayFns = function (fns, arg) {
    for (var i = 0; i < fns.length; i++) {
        fns[i](arg);
    }
};
var objectToString = Object.prototype.toString;
var toTypeString = function (value) {
    return objectToString.call(value);
};
var isPlainObject = function (val) {
    return toTypeString(val) === '[object Object]';
};

// 记录当前活跃的对象
var activeEffect;
// 标记是否追踪
var shouldTrack;
// 用于依赖收集
var ReactiveEffect = /** @class */ (function () {
    // public scheduler? 显式声明类可选属性
    function ReactiveEffect(fn, scheduler) {
        this.scheduler = scheduler;
        this.deps = []; // 所有依赖这个 effect 的响应式对象
        this.active = true; // 是否为激活状态
        this._fn = fn;
    }
    ReactiveEffect.prototype.run = function () {
        // 运行 run 的时候，可以控制 要不要执行后续收集依赖的一步
        // 目前来看的话，只要执行了 fn 那么就默认执行了收集依赖
        // 这里就需要控制了
        // 是不是收集依赖的变量
        // 执行 fn  但是不收集依赖
        if (!this.active) {
            return this._fn();
        }
        // 执行 fn  收集依赖
        // 可以开始收集依赖了
        shouldTrack = true;
        // 执行的时候给全局的 activeEffect 赋值
        // 利用全局属性来获取当前的 effect
        activeEffect = this;
        // 执行用户传入的 fn
        var result = this._fn();
        // 重置
        shouldTrack = false;
        return result;
    };
    ReactiveEffect.prototype.stop = function () {
        if (this.active) {
            // 如果第一次执行 stop 后 active 就 false 了
            // 这是为了防止重复的调用，执行 stop 逻辑
            cleanupEffect(this);
            if (this.onStop) {
                this.onStop();
            }
            this.active = false;
        }
    };
    return ReactiveEffect;
}());
function cleanupEffect(effect) {
    // 找到所有依赖这个 effect 的响应式对象
    // 从这些响应式对象里面把 effect 给删除掉
    effect.deps.forEach(function (dep) {
        dep.delete(effect);
    });
}
var targetMap = new Map();
function track(target, key) {
    if (!isTacking())
        return;
    // 1. 先基于 target 找到对应的 dep
    // 如果是第一次的话，那么就需要初始化
    var depsMap = targetMap.get(target);
    if (!depsMap) {
        // 初始化 depsMap 的逻辑
        depsMap = new Map();
        targetMap.set(target, depsMap);
    }
    var dep = depsMap.get(key);
    if (!dep) {
        dep = new Set();
        depsMap.set(key, dep);
    }
    if (dep.has(activeEffect))
        return;
    trackEffect(dep);
}
function trackEffect(dep) {
    // 单纯reactive触发依赖收集，不会有Effect实例
    // 用 dep 来存放所有的 effect
    // TODO
    // 这里是一个优化点
    // 先看看这个依赖是不是已经收集了，
    // 已经收集的话，那么就不需要在收集一次了
    // 可能会影响 code path change 的情况
    // 需要每次都 cleanupEffect
    dep.add(activeEffect);
    activeEffect.deps.push(dep);
}
function isTacking() {
    return activeEffect && shouldTrack;
}
function trigger(target, key) {
    var depsMap = targetMap.get(target);
    var deps = depsMap && depsMap.get(key);
    triggerEffect(deps);
}
function triggerEffect(deps) {
    if (deps) {
        deps.forEach(function (effect) {
            if (effect.scheduler) {
                effect.scheduler();
            }
            else {
                effect.run();
            }
        });
        // for(const effect of deps){console.log('effect', effect)
        //     if(effect.scheduler){
        //         effect.scheduler()
        //     } else {
        //         effect.run()
        //     }
        // }
    }
}
function effect(fn, options) {
    if (options === void 0) { options = {}; }
    var scheduler = options.scheduler;
    var _effect = new ReactiveEffect(fn, scheduler);
    // 把用户传过来的值合并到 _effect 对象上去
    // 缺点就是不是显式的，看代码的时候并不知道有什么值
    extend(_effect, options);
    // _effect.onStop = options.onStop
    _effect.run();
    // 把 _effect.run 这个方法返回
    // 让用户可以自行选择调用的时机（调用 fn）
    var runner = _effect.run.bind(_effect);
    runner.effect = _effect;
    return runner;
}

var get = createGetter();
var set = createSetter();
var readonlyGet = createGetter(true);
var shallowReadonlyGet = createGetter(true, true);
function createGetter(isReadonly, shallow) {
    if (isReadonly === void 0) { isReadonly = false; }
    if (shallow === void 0) { shallow = false; }
    return function get(target, key) {
        if (key === "_v_isReactive" /* IS_REACTIVE */) {
            return !isReadonly;
        }
        else if (key === "_v_isReadonly" /* IS_READONLY */) {
            return isReadonly;
        }
        var res = Reflect.get(target, key);
        if (shallow) {
            return res;
        }
        if (!isReadonly)
            track(target, key);
        if (isObject(res)) {
            return isReadonly ? readonly(res) : reactive(res);
        }
        return res;
    };
}
function createSetter() {
    return function set(target, key, val) {
        var res = Reflect.set(target, key, val);
        trigger(target, key);
        return res;
    };
}
var mutableHanders = {
    get: get,
    set: set
};
var readonlyHanders = {
    get: readonlyGet,
    set: function (target, key, val) {
        console.warn('readonly数据不能被set');
        return true;
    }
};
var shallowReadonlyHanders = extend({}, readonlyHanders, { get: shallowReadonlyGet });

function reactive(raw) {
    return createActiveObject(raw, mutableHanders);
}
function readonly(raw) {
    return createActiveObject(raw, readonlyHanders);
}
function shallowReadonly(raw) {
    return createActiveObject(raw, shallowReadonlyHanders);
}
function isReactive(value) {
    return !!value["_v_isReactive" /* IS_REACTIVE */];
}
function createActiveObject(raw, baseHandlers) {
    if (!isObject(raw)) {
        console.warn("raw ${raw} 必须是一个对象");
        return raw;
    }
    return new Proxy(raw, baseHandlers);
}

var RefImpl = /** @class */ (function () {
    function RefImpl(value) {
        this._v_isRef = true;
        this._rawValue = value;
        this._value = convert(value);
        this.dep = new Set();
    }
    Object.defineProperty(RefImpl.prototype, "value", {
        get: function () {
            trackRefValue(this);
            return this._value;
        },
        set: function (newVal) {
            if (hasChange(this._rawValue, newVal)) {
                this._rawValue = newVal;
                this._value = convert(newVal);
                triggerEffect(this.dep);
            }
        },
        enumerable: false,
        configurable: true
    });
    return RefImpl;
}());
function convert(value) {
    return isObject(value) ? reactive(value) : value;
}
function trackRefValue(ref) {
    if (isTacking())
        trackEffect(ref.dep);
}
function ref(value) {
    return new RefImpl(value);
}
function isRef(ref) {
    return ref && !!ref._v_isRef;
}
function unRef(ref) {
    return isRef(ref) ? ref.value : ref;
}
function proxyRefs(objectWithRefs) {
    return new Proxy(objectWithRefs, {
        get: function (target, key) {
            return unRef(Reflect.get(target, key));
        },
        set: function (target, key, val) {
            if (isRef(target[key]) && !isRef(val)) {
                target[key].value = val;
                // 一定要显式地返回true，不然会报错
                return true;
            }
            else {
                return Reflect.set(target, key, val);
            }
        }
    });
}

var currentRenderingInstance = null;
function setCurrentRenderingInstance(instance) {
    var prev = currentRenderingInstance;
    currentRenderingInstance = instance;
    return prev;
}

var Fragment = Symbol('Fragment');
var Text = Symbol('Text');
var normalizeRef = function (_a) {
    var ref = _a.ref, ref_key = _a.ref_key, ref_for = _a.ref_for;
    return (ref != null
        // 从这里我们可以知道ref值可以是字符串，Ref数据，函数
        ? isString(ref) || isRef(ref) || isFunction(ref)
            ? { i: currentRenderingInstance, r: ref, k: ref_key, f: !!ref_for }
            : ref
        : null);
};
function createVNode(type, props, children) {
    var vnode = {
        type: type,
        props: props,
        ref: props && normalizeRef(props),
        children: children,
        component: null,
        key: props && props.key,
        shapeFlag: getShapeFlag(type),
        el: null
    };
    if (typeof children === 'string') {
        // vnode.shapeFlag = vnode.shapeFlag | ShapeFlags.TEXT_CHILDREN
        vnode.shapeFlag |= 4 /* TEXT_CHILDREN */;
    }
    else if (Array.isArray(children)) {
        vnode.shapeFlag |= 8 /* ARRAY_CHILDREN */;
    }
    // 组件 + children object
    if (vnode.shapeFlag & 2 /* STATEFUL_COMPONENT */) {
        if (typeof children === 'object') {
            vnode.shapeFlag |= 16 /* SLOT_CHILDREN */;
        }
    }
    return vnode;
}
function createTextVNode(text) {
    return createVNode(Text, {}, text);
}
function getShapeFlag(type) {
    return typeof type === 'string' ? 1 /* ELEMENT */ : 2 /* STATEFUL_COMPONENT */;
}

function h(type, props, children) {
    return createVNode(type, props, children);
}

function renderSlots(slots, name, props) {
    var slot = slots[name];
    if (slot) {
        if (typeof slot === 'function') {
            return createVNode(Fragment, {}, slot(props));
        }
    }
}

function emit(instance, event) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    var props = instance.props;
    // TPP
    // 先去写一个特定的行为 =》 重构成通用的行为
    var handlerName = toHandlerKey(camelize(event));
    var handler = props[handlerName];
    handler && handler.apply(void 0, __spreadArray([], __read(args), false));
}

function initProps(instance, rawProps) {
    instance.props = rawProps || {};
}

var publicPropertiesMap = {
    $el: function (i) { return i.vnode.el; },
    $slots: function (i) { return i.slots; },
    $props: function (i) { return i.props; }
};
var publicInstanceProxyHandlers = {
    get: function (_a, key) {
        var instance = _a._;
        var setupState = instance.setupState, props = instance.props;
        if (hasOwn(setupState, key)) {
            return setupState[key];
        }
        else if (hasOwn(props, key)) {
            return props[key];
        }
        var publicGetter = publicPropertiesMap[key];
        if (publicGetter) {
            return publicGetter(instance);
        }
        else {
            console.warn("non-existent " + key + " publicGetter");
        }
    }
};

function initSlots(instance, children) {
    var vnode = instance.vnode;
    if (vnode.shapeFlag & 16 /* SLOT_CHILDREN */) {
        normalizeObjectSlots(children, instance.slots);
    }
}
function normalizeObjectSlots(children, slots) {
    var _loop_1 = function (key) {
        var value = children[key];
        slots[key] = function (props) { return normalizeSlotValue(value(props)); };
    };
    for (var key in children) {
        _loop_1(key);
    }
}
function normalizeSlotValue(value) {
    return Array.isArray(value) ? value : [value];
}

var currentInstance = null;
function createComponentInstance(vnode, parent) {
    var component = {
        vnode: vnode,
        next: null,
        type: vnode.type,
        setupState: {},
        props: {},
        slots: {},
        refs: EMPTY_OBJ,
        provides: parent ? parent.provides : {},
        parent: parent,
        isMounted: false,
        subTree: {},
        emit: function () { },
        m: null,
    };
    component.emit = emit.bind(null, component);
    return component;
}
function setupComponent(instance) {
    // TODO
    initProps(instance, instance.vnode.props);
    // initSlots
    initSlots(instance, instance.vnode.children);
    setupStatefulComponent(instance);
}
function setupStatefulComponent(instance) {
    var Component = instance.type;
    instance.proxy = new Proxy({ _: instance }, publicInstanceProxyHandlers);
    var setup = Component.setup;
    if (setup) {
        setCurrentInstance(instance);
        var setupResult = setup(shallowReadonly(instance.props), {
            emit: instance.emit
        });
        setCurrentInstance(null);
        handleSetupResult(instance, setupResult);
    }
}
function handleSetupResult(instance, setupResult) {
    if (typeof setupResult === 'object') {
        instance.setupState = proxyRefs(setupResult);
    }
    finishComponentSetup(instance);
}
function finishComponentSetup(instance) {
    var Component = instance.type;
    if (compiler && !Component.render) {
        if (Component.template) {
            Component.render = compiler(Component.template);
        }
    }
    instance.render = Component.render;
}
function getCurrentInstance() {
    return currentInstance;
}
function setCurrentInstance(instance) {
    currentInstance = instance;
}
function unsetCurrentInstance() {
    currentInstance = null;
}
var compiler;
function registerRuntimeCompiler(_compiler) {
    compiler = _compiler;
}

function provide(key, value) {
    var currentInstance = getCurrentInstance();
    if (currentInstance) {
        var provides = currentInstance.provides;
        var parentProvides = currentInstance.parent.provides;
        if (provides === parentProvides) {
            // Object.create() es6创建对象的另一种方式，可以理解为继承一个对象, 添加的属性是在原型下。
            provides = currentInstance.provides = Object.create(parentProvides);
        }
        provides[key] = value;
    }
}
function inject(key, defaultValue) {
    var currentInstance = getCurrentInstance();
    if (currentInstance) {
        var parentProvides = currentInstance.parent.provides;
        if (key in parentProvides) {
            return parentProvides[key];
        }
        else if (defaultValue) {
            if (typeof defaultValue === 'function') {
                return defaultValue();
            }
            return defaultValue;
        }
    }
}

function renderComponentRoot(instance) {
    var proxy = instance.proxy, render = instance.render;
    var result;
    // 返回上一个实例对象
    var prev = setCurrentRenderingInstance(instance);
    result = render.call(proxy, proxy);
    // 再设置当前的渲染对象上一个，具体场景是嵌套循环渲染的时候，渲染完子组件，再去渲染父组件
    setCurrentRenderingInstance(prev);
    return result;
}

function shouldUpdateComponent(prevVNode, nextVNode) {
    var prevProps = prevVNode.props;
    var nextProps = nextVNode.props;
    for (var key in nextProps) {
        if (nextProps[key] !== prevProps[key]) {
            return true;
        }
    }
    return false;
}

function createAppAPI(render) {
    return function createApp(rootComponent) {
        return {
            mount: function (rootContainer) {
                var vnode = createVNode(rootComponent);
                render(vnode, rootContainer);
            }
        };
    };
}

function setRef(rawRef, oldRawRef, vnode, isUnmount) {
    if (isUnmount === void 0) { isUnmount = false; }
    console.log('setRef');
    // 判断如果是组件实例，则把改组件实例作为ref的值，否则就是把该元素作为ref值 
    var refValue = vnode.shapeFlag & 2 /* STATEFUL_COMPONENT */
        ? vnode.component.proxy
        : vnode.el;
    // 如果n2不存在则是卸载
    var value = isUnmount ? null : refValue;
    // 把在创建虚拟DOM的时候设置保存的组件渲染实例解构出来
    var owner = rawRef.i, ref = rawRef.r;
    var oldRef = oldRawRef && oldRawRef.r;
    var refs = owner.refs === EMPTY_OBJ ? (owner.refs = {}) : owner.refs;
    var setupState = owner.setupState;
    // 动态ref,如果ref更改，就删除旧ref的值
    if (oldRef != null && oldRef !== ref) {
        if (isString(oldRef)) {
            refs[oldRef] = null;
            if (hasOwn(setupState, oldRef)) {
                setupState[oldRef] = null;
            }
        }
        else if (isRef(oldRef)) {
            oldRef.value = null;
        }
    }
    // happy path中我们只考虑最简单的情况
    var _isString = isString(ref);
    console.log('setRef', ref);
    if (_isString) {
        console.log('rawRef', rawRef, ref);
        refs[ref] = value;
        // 如果在对应于渲染上下文中存在ref键值，则 VNode 的相应元素或组件实例将被分配给该 ref 的值
        if (hasOwn(setupState, ref)) {
            setupState[ref] = value;
        }
    }
    else if (isRef(ref)) {
        ref.value = value;
        if (rawRef.k)
            refs[rawRef.k] = value;
    }
}

var activePostFlushCbs = null;
var postFlushIndex = 0;
var pendingPostFlushCbs = [];
var activePreFlushCbs = null;
var queue = [];
var isFlushPending = false;
var p = Promise.resolve();
function nextTick(fn) {
    return fn ? p.then(fn) : p;
}
var getId = function (job) {
    return job.id == null ? Infinity : job.id;
};
function queueJobs(job) {
    if (!queue.includes(job)) {
        queue.push(job);
    }
    queueFlush();
}
function queuePreFlushCb(cb) {
    queueCb(cb, activePreFlushCbs);
}
function queuePostFlushCb(cb) {
    queueCb(cb, pendingPostFlushCbs);
}
function flushPostFlushCbs(seen) {
    if (pendingPostFlushCbs.length) {
        var deduped = __spreadArray([], __read(new Set(pendingPostFlushCbs)), false);
        pendingPostFlushCbs.length = 0;
        activePostFlushCbs = deduped;
        activePostFlushCbs.sort(function (a, b) { return getId(a) - getId(b); });
        for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
            activePostFlushCbs[postFlushIndex]();
        }
        activePostFlushCbs = null;
        postFlushIndex = 0;
    }
}
function queueCb(cb, pendingQueue) {
    pendingQueue.push.apply(pendingQueue, __spreadArray([], __read(cb), false));
    queueFlush();
}
function queueFlush() {
    if (isFlushPending)
        return;
    isFlushPending = true;
    nextTick(flushJobs);
}
function flushJobs(seen) {
    isFlushPending = false;
    // 组件更新前队列执行
    // flushPreFlushCbs(seen)
    try {
        queue.sort(function (a, b) { return getId(a) - getId(b); });
        // 组件更新队列执行
        var job = void 0;
        while (job = queue.shift()) {
            job && job();
        }
    }
    finally {
        // 组件更新后队列执行
        flushPostFlushCbs();
        // 如果在执行异步任务的过程中又产生了新的队列，那么则继续回调执行
        if (queue.length ||
            // pendingPreFlushCbs.length ||
            pendingPostFlushCbs.length) {
            flushJobs();
        }
    }
}

function createRenderer(options) {
    var hostCreateElement = options.createElement, hostPatchProp = options.patchProp, hostInsert = options.insert, hostRemove = options.remove, hostSetElementText = options.setElementText;
    function render(vnode, container) {
        patch(null, vnode, container, null, null);
    }
    function patch(n1, n2, container, parentComponent, anchor) {
        // 基于 n2 的类型来判断
        // 因为 n2 是新的 vnode
        var type = n2.type, shapeFlag = n2.shapeFlag, ref = n2.ref;
        // Fragment => 只渲染 children
        switch (type) {
            // 其中还有几个类型比如： static fragment comment
            case Fragment:
                processFragment(n1, n2, container, parentComponent, anchor);
                break;
            case Text:
                processText(n1, n2, container);
                break;
            default:
                // 这里就基于 shapeFlag 来处理
                if (shapeFlag & 1 /* ELEMENT */) {
                    // 处理 element
                    processElement(n1, n2, container, parentComponent, anchor);
                }
                else if (shapeFlag & 2 /* STATEFUL_COMPONENT */) {
                    // 处理 component
                    processComponent(n1, n2, container, parentComponent, anchor);
                }
                break;
        }
        console.log('refxxx', ref);
        // 模板引用ref只会在初始渲染之后获得
        if (ref != null && parentComponent) {
            setRef(ref, n1 && n1.ref, n2 || n1, !n2);
        }
    }
    function processComponent(n1, n2, container, parentComponent, anchor) {
        // 如果 n1 没有值的话，那么就是 mount
        if (!n1) {
            // 初始化 component
            mountComponent(n2, container, parentComponent, anchor);
        }
        else {
            updateComponent(n1, n2);
        }
    }
    // 组件的更新
    function updateComponent(n1, n2) {
        // 更新组件实例引用
        var instance = (n2.component = n1.component);
        // 先看看这个组件是否应该更新
        if (shouldUpdateComponent(n1, n2)) {
            // 那么 next 就是新的 vnode 了（也就是 n2）
            instance.next = n2;
            // 这里的 update 是在 setupRenderEffect 里面初始化的，update 函数除了当内部的响应式对象发生改变的时候会调用
            // 还可以直接主动的调用(这是属于 effect 的特性)
            // 调用 update 再次更新调用 patch 逻辑
            // 在update 中调用的 next 就变成了 n2了
            // ps：可以详细的看看 update 中 next 的应用
            // TODO 需要在 update 中处理支持 next 的逻辑
            instance.update();
        }
        else {
            // 不需要更新的话，那么只需要覆盖下面的属性即可
            n2.component = n1.component;
            n2.el = n1.el;
            n2.vnode = n2;
        }
    }
    function mountComponent(initialVNode, container, parentComponent, anchor) {
        // 1. 先创建一个 component instance
        var instance = (initialVNode.component = createComponentInstance(initialVNode, parentComponent));
        // 2. 给 instance 加工加工
        setupComponent(instance);
        setupRenderEffect(instance, initialVNode, container, anchor);
    }
    function setupRenderEffect(instance, vnode, container, anchor) {
        // 调用 render
        // 应该传入 ctx 也就是 proxy
        // ctx 可以选择暴露给用户的 api
        // 源代码里面是调用的 renderComponentRoot 函数
        // 这里为了简化直接调用 render
        // obj.name  = "111"
        // obj.name = "2222"
        // 从哪里做一些事
        // 收集数据改变之后要做的事 (函数)
        // 依赖收集   effect 函数
        // 触发依赖
        instance.update = effect(function () {
            if (!instance.isMounted) {
                var bm = instance.bm, m = instance.m;
                // beforeMount hook
                if (bm) {
                    invokeArrayFns(bm);
                }
                // 组件初始化的时候会执行这里
                // 为什么要在这里调用 render 函数呢
                // 是因为在 effect 内调用 render 才能触发依赖收集
                // 等到后面响应式的值变更后会再次触发这个函数  
                var subTree = (instance.subTree = renderComponentRoot(instance));
                // 这里基于 subTree 再次调用 patch
                // 基于 render 返回的 vnode ，再次进行渲染
                // 这里我把这个行为隐喻成开箱
                // 一个组件就是一个箱子
                // 里面有可能是 element （也就是可以直接渲染的）
                // 也有可能还是 component
                // 这里就是递归的开箱
                // 而 subTree 就是当前的这个箱子（组件）装的东西
                // 箱子（组件）只是个概念，它实际是不需要渲染的
                // 要渲染的是箱子里面的 subTree
                patch(null, subTree, container, instance, anchor);
                // 把 root element 赋值给 组件的vnode.el ，为后续调用 $el 的时候获取值
                instance.vnode.el = subTree.el; // 这样显式赋值会不会好理解一点呢
                instance.isMounted = true;
                if (m) {
                    queuePostFlushCb(m);
                }
            }
            else {
                // 响应式的值变更后会从这里执行逻辑
                // 主要就是拿到新的 vnode ，然后和之前的 vnode 进行对比
                // 拿到最新的 subTree
                var bu = instance.bu, u = instance.u, next = instance.next, vnode_1 = instance.vnode;
                // 如果有 next 的话， 说明需要更新组件的数据（props，slots 等）
                // 先更新组件的数据，然后更新完成后，在继续对比当前组件的子元素
                if (next) {
                    // 问题是 next 和 vnode 的区别是什么
                    next.el = vnode_1.el;
                    updateComponentPreRender(instance, next);
                }
                // beforeUpdate hook
                if (bu) {
                    invokeArrayFns(bu);
                }
                var subTree = renderComponentRoot(instance);
                // 替换之前的 subTree
                var prevSubTree = instance.subTree;
                instance.subTree = subTree;
                // 用旧的 vnode 和新的 vnode 交给 patch 来处理
                patch(prevSubTree, subTree, container, instance, anchor);
                // updated hook
                if (u) {
                    queuePostFlushCb(u);
                }
            }
        }, {
            scheduler: function () {
                console.log('update - scheduler');
                queueJobs(instance.update);
            }
        });
    }
    function updateComponentPreRender(instance, nextVNode) {
        // 更新 nextVNode 的组件实例
        // 现在 instance.vnode 是组件实例更新前的
        // 所以之前的 props 就是基于 instance.vnode.props 来获取
        // 接着需要更新 vnode ，方便下一次更新的时候获取到正确的值
        instance.vnode = nextVNode;
        instance.next = null;
        instance.props = nextVNode.props;
    }
    function processElement(n1, n2, container, parentComponent, anchor) {
        if (!n1) {
            mountElement(n2, container, parentComponent, anchor);
        }
        else {
            patchElement(n1, n2, container, parentComponent, anchor);
        }
    }
    function patchElement(n1, n2, container, parentComponent, anchor) {
        console.log('patchElement');
        var oldProps = n1.props || {};
        var newProps = n2.props || {};
        // 需要把 el 挂载到新的 vnode
        var el = (n2.el = n1.el);
        // 对比 children
        patchChildren(n1, n2, el, parentComponent, anchor);
        // 对比 props
        patchProps(el, oldProps, newProps);
    }
    function patchChildren(n1, n2, container, parentComponent, anchor) {
        var prevShapeFlag = n1.shapeFlag;
        var c1 = n1.children;
        var shapeFlag = n2.shapeFlag;
        var c2 = n2.children;
        if (shapeFlag & 4 /* TEXT_CHILDREN */) {
            if (prevShapeFlag & 8 /* ARRAY_CHILDREN */) {
                // 1. 把老的 children 清空
                unmountChildren(n1.children);
            }
            if (c1 !== c2) {
                hostSetElementText(container, c2);
            }
        }
        else {
            if (prevShapeFlag & 4 /* TEXT_CHILDREN */) {
                hostSetElementText(container, '');
                mountChildren(c2, container, parentComponent, anchor);
            }
            else {
                // array diff array
                patchKeyedChildren(c1, c2, container, parentComponent, anchor);
            }
        }
    }
    function patchKeyedChildren(c1, c2, container, parentComponent, parentAnchor) {
        var l2 = c2.length;
        var i = 0;
        var e1 = c1.length - 1;
        var e2 = l2 - 1;
        function isSomeVNodeType(n1, n2) {
            return n1.type === n2.type && n1.key === n2.key;
        }
        // 左侧
        while (i <= e1 && i <= e2) {
            var n1 = c1[i];
            var n2 = c2[i];
            if (isSomeVNodeType(n1, n2)) {
                patch(n1, n2, container, parentComponent, parentAnchor);
            }
            else {
                break;
            }
            i++;
        }
        // 右侧
        while (i <= e1 && i <= e2) {
            var n1 = c1[e1];
            var n2 = c2[e2];
            if (isSomeVNodeType(n1, n2)) {
                patch(n1, n2, container, parentComponent, parentAnchor);
            }
            else {
                break;
            }
            e1--;
            e2--;
        }
        // 新的比老的多，创建
        if (i > e1) {
            if (i <= e2) {
                // debugger
                var nextPos = i + 1;
                var anchor = nextPos < l2 ? c2[nextPos].el : null;
                while (i <= e2) {
                    patch(null, c2[i], container, parentComponent, anchor);
                    i++;
                }
            }
        }
        else if (i > e2) {
            while (i <= e1) {
                hostRemove(c1[i].el);
                i++;
            }
        }
        else {
            // 中间对比
            var s1 = i;
            var s2 = i;
            // 剩下需要比对的长度
            var toBePatched = e2 - s2 + 1;
            var patched = 0;
            var keyToNewIndexMap = new Map();
            var newIndexToOldIndexMap = new Array(toBePatched);
            var moved = false;
            var maxNewIndexSoFar = 0;
            for (var i_1 = 0; i_1 < toBePatched; i_1++)
                newIndexToOldIndexMap[i_1] = 0;
            for (var i_2 = s2; i_2 <= e2; i_2++) {
                var nextChild = c2[i_2];
                keyToNewIndexMap.set(nextChild.key, i_2);
            }
            for (var i_3 = s1; i_3 <= e1; i_3++) {
                var prevChild = c1[i_3];
                if (patched >= toBePatched) {
                    hostRemove(prevChild.el);
                    continue;
                }
                var newIndex = void 0;
                if (prevChild.key !== null) {
                    newIndex = keyToNewIndexMap.get(prevChild.key);
                }
                else {
                    for (var j_1 = s2; j_1 < e2; j_1++) {
                        if (isSomeVNodeType(prevChild, c2[j_1])) {
                            newIndex = j_1;
                            break;
                        }
                    }
                }
                if (newIndex === undefined) {
                    hostRemove(prevChild.el);
                }
                else {
                    if (newIndex >= maxNewIndexSoFar) {
                        maxNewIndexSoFar = newIndex;
                    }
                    else {
                        moved = true;
                    }
                    newIndexToOldIndexMap[newIndex - s2] = i_3 + 1;
                    patch(prevChild, c2[newIndex], container, parentComponent, null);
                    patched++;
                }
            }
            var increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : [];
            var j = increasingNewIndexSequence.length - 1;
            for (var i_4 = toBePatched - 1; i_4 >= 0; i_4--) {
                var nextIndex = i_4 + s2;
                var nextChild = c2[nextIndex];
                var anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : null;
                if (newIndexToOldIndexMap[i_4] === 0) {
                    patch(null, nextChild, container, parentComponent, anchor);
                }
                else if (moved) {
                    // 如果不在最长递增子序列里面则要进行移动
                    if (j < 0 || i_4 !== increasingNewIndexSequence[j]) {
                        hostInsert(nextChild.el, container, anchor);
                    }
                    else {
                        j--;
                    }
                }
            }
        }
    }
    function getSequence(arr) {
        var p = arr.slice();
        var result = [0];
        var i, j, u, v, c;
        var len = arr.length;
        for (i = 0; i < len; i++) {
            var arrI = arr[i];
            if (arrI !== 0) {
                j = result[result.length - 1];
                if (arr[j] < arrI) {
                    p[i] = j;
                    result.push(i);
                    continue;
                }
                u = 0;
                v = result.length - 1;
                while (u < v) {
                    c = (u + v) >> 1;
                    if (arr[result[c]] < arrI) {
                        u = c + 1;
                    }
                    else {
                        v = c;
                    }
                }
                if (arrI < arr[result[u]]) {
                    if (u > 0) {
                        p[i] = result[u - 1];
                    }
                    result[u] = i;
                }
            }
        }
        u = result.length;
        v = result[u - 1];
        while (u-- > 0) {
            result[u] = v;
            v = p[v];
        }
        return result;
    }
    function unmountChildren(children) {
        for (var i = 0; i < children.length; i++) {
            var el = children[i].el;
            hostRemove(el);
        }
    }
    function patchProps(el, oldProps, newProps) {
        if (oldProps !== newProps) {
            // 对比 props 有以下几种情况
            // 1. oldProps 有，newProps 也有，但是 val 值变更了
            // 举个栗子
            // 之前: oldProps.id = 1 ，更新后：newProps.id = 2
            // key 存在 oldProps 里 也存在 newProps 内
            // 以 newProps 作为基准
            for (var key in newProps) {
                var prevProp = oldProps[key];
                var nextProp = newProps[key];
                if (prevProp !== nextProp) {
                    // 对比属性
                    // 需要交给 host 来更新 key
                    hostPatchProp(el, key, prevProp, nextProp);
                }
            }
            if (oldProps !== {}) {
                for (var key in oldProps) {
                    if (!(key in newProps)) {
                        // 2. oldProps 有，而 newProps 没有了
                        // 之前： {id:1,tId:2}  更新后： {id:1}
                        // 这种情况下我们就应该以 oldProps 作为基准，因为在 newProps 里面是没有的 tId 的
                        // 还需要注意一点，如果这个 key 在 newProps 里面已经存在了，说明已经处理过了，就不要在处理了
                        hostPatchProp(el, key, oldProps[key], null);
                    }
                }
            }
        }
    }
    function mountElement(vnode, container, parentComponent, anchor) {
        var el = (vnode.el = hostCreateElement(vnode.type));
        var children = vnode.children, shapeFlag = vnode.shapeFlag;
        if (shapeFlag & 4 /* TEXT_CHILDREN */) {
            el.textContent = children;
        }
        else if (shapeFlag & 8 /* ARRAY_CHILDREN */) {
            mountChildren(vnode.children, el, parentComponent, anchor);
        }
        var props = vnode.props;
        for (var key in props) {
            var val = props[key];
            hostPatchProp(el, key, null, val);
        }
        // container.append(el)
        hostInsert(el, container, anchor);
    }
    function mountChildren(children, container, parentComponent, anchor) {
        children.forEach(function (v) {
            patch(null, v, container, parentComponent, anchor);
        });
    }
    function processFragment(n1, n2, container, parentComponent, anchor) {
        // 只需要渲染 children ，然后给添加到 container 内
        if (!n1) {
            // 初始化 Fragment 逻辑点
            mountChildren(n2.children, container, parentComponent, anchor);
        }
    }
    function processText(n1, n2, container) {
        // 处理 Text 节点
        var children = n2.children;
        var textNode = (n2.el = document.createTextNode(children));
        container.append(textNode);
    }
    return {
        createApp: createAppAPI(render)
    };
}

// injectHook是一个闭包函数，通过闭包缓存绑定对应生命周期Hooks到对应的组件实例上
function injectHook(type, hook, target) {
    if (target) {
        // 把各个生命周期的Hooks函数挂载到组件实例上，并且是一个数组，因为可能你会多次调用同一个组件的同一个生命周期函数
        var hooks = target[type] || (target[type] = []);
        // 把生命周期函数进行包装并且把包装函数缓存在__weh上
        var wrappedHook = hook.__weh ||
            (hook.__weh = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                if (target.isUnmounted) {
                    return;
                }
                // 当生命周期调用时 保证currentInstance是正确的
                setCurrentInstance(target);
                // 执行生命周期Hooks函数
                var res = args ? hook.apply(void 0, __spreadArray([], __read(args), false)) : hook();
                unsetCurrentInstance();
                return res;
            });
        // 把生命周期的包装函数绑定到组件实例对应的hooks上
        hooks.push(wrappedHook);
        // 返回包装函数
        return wrappedHook;
    }
}
// 创建生命周期函数，target,表示该生命周期Hooks函数被绑定到哪个组件实例上，默认是当前工作的组件实例。
// createHook是一个闭包函数，通过闭包缓存当前是属于哪个生命周期的Hooks
var createHook = function (lifecycle) { return function (hook, target) {
    if (target === void 0) { target = currentInstance; }
    return injectHook(lifecycle, hook, target);
}; };
var onBeforeMount = createHook("bm" /* BEFORE_MOUNT */);
var onMounted = createHook("m" /* MOUNTED */);
var onBeforeUpdate = createHook("bu" /* BEFORE_UPDATE */);
var onUpdated = createHook("u" /* UPDATED */);
var onBeforeUnmount = createHook("bum" /* BEFORE_UNMOUNT */);
var onUnmounted = createHook("um" /* UNMOUNTED */);

function watch(source, cb, _a) {
    var immediate = _a.immediate, deep = _a.deep, flush = _a.flush;
    var instance = currentInstance;
    var getter;
    if (isRef(source)) {
        // 如果是ref类型
        getter = function () { return source.value; };
    }
    else if (isReactive(source)) {
        // 如果是reactive类型
        getter = function () { return source; };
        // 深度监听为true
        deep = true;
    }
    else if (Array.isArray(source)) {
        // 如果是数组，进行循环处理
        getter = function () {
            return source.map(function (s) {
                if (isRef(s)) {
                    return s.value;
                }
                else if (isReactive(s)) {
                    return traverse(s);
                }
                else if (isFunction(s)) {
                    return s();
                }
            });
        };
    }
    else if (isFunction(source)) {
        // 如果是函数
        getter = function () { return source(); };
    }
    if (cb && deep) {
        // 如果有回调函数并且深度监听为true，那么就通过traverse函数进行深度递归监听
        var baseGetter_1 = getter;
        getter = function () { return traverse(baseGetter_1()); };
    }
    // 定义老值
    var oldValue;
    // 提取 scheduler 调度函数为一个独立的 job 函数
    var job = function () {
        // 在scheduler中重新执行effect实例对象的run方法，得到的是新值
        var newValue = effect.run();
        // 将新值和旧值作为回调函数的参数
        cb(newValue, oldValue);
        // 更新旧值，不然下一次会得到错误的旧值
        oldValue = newValue;
    };
    var scheduler;
    if (flush === 'sync') {
        scheduler = job; // 同步执行
    }
    else if (flush === 'post') {
        // 将job函数放到微任务队列中，从而实现异步延迟执行，注意 post 是在 DOM 更新之后再执行
        scheduler = function () { return queuePostFlushCb(job); };
    }
    else {
        // flush默认为：'pre'
        scheduler = function () {
            if (!instance || instance.isMounted) {
                // 在组件更新之前执行
                queuePreFlushCb(job);
            }
            else {
                // 使用“pre”选项，第一次调用必须在安装组件之前进行，以便同步调用。
                job();
            }
        };
    }
    var effect = new ReactiveEffect(getter, scheduler);
    if (immediate) {
        // 当 immediate 为 true 时立即执行 job，从而触发回调函数执行
        job();
    }
    else {
        // 手动执行effect实例对象的run方法，拿到的值就是旧值
        oldValue = effect.run();
    }
}
function traverse(value, seen) {
    // 如果是普通类型或者不是响应式的对象就直接返回
    if (!isObject(value)) {
        return value;
    }
    seen = seen || new Set();
    if (seen.has(value)) {
        // 如果已经读取过就返回
        return value;
    }
    // 读取了就添加到集合中，代表遍历地读取过了，避免循环引用引起死循环
    seen.add(value);
    if (isRef(value)) ;
    else if (Array.isArray(value)) {
        // 如果是数组类型
        for (var i = 0; i < value.length; i++) {
            // 递归调用traverse进行处理
            traverse(value[i], seen);
        }
    }
    else if (isPlainObject(value)) {
        // 如果是对象，使用for in 读取对象的每一个值，并递归调用traverse进行处理
        for (var key in value) {
            traverse(value[key], seen);
        }
    }
    return value;
}

function createElement(type) {
    return document.createElement(type);
}
function patchProp(el, key, prevVal, nextVal) {
    var isOn = function (key) { return /^on[A-Z]/.test(key); };
    if (isOn(key)) {
        var event_1 = key.slice(2).toLowerCase();
        el.addEventListener(event_1, nextVal);
    }
    else {
        if (nextVal === undefined || nextVal === null) {
            el.removeAttribute(key, nextVal);
        }
        else {
            el.setAttribute(key, nextVal);
        }
    }
}
function insert(child, parent, anchor) {
    // parent.append(el)
    parent.insertBefore(child, anchor || null);
}
function remove(child) {
    var parent = child.parentNode;
    if (parent) {
        parent.removeChild(child);
    }
}
function setElementText(el, text) {
    el.textContent = text;
}
var renderer = createRenderer({
    createElement: createElement,
    patchProp: patchProp,
    insert: insert,
    remove: remove,
    setElementText: setElementText
});
function createApp() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return renderer.createApp.apply(renderer, __spreadArray([], __read(args), false));
}

var runtimeDom = /*#__PURE__*/Object.freeze({
    __proto__: null,
    createApp: createApp,
    h: h,
    renderSlots: renderSlots,
    createTextVNode: createTextVNode,
    createElementVNode: createVNode,
    getCurrentInstance: getCurrentInstance,
    registerRuntimeCompiler: registerRuntimeCompiler,
    provide: provide,
    inject: inject,
    createRenderer: createRenderer,
    nextTick: nextTick,
    toDisplayString: toDisplayString,
    ref: ref,
    proxyRefs: proxyRefs,
    reactive: reactive,
    injectHook: injectHook,
    createHook: createHook,
    onBeforeMount: onBeforeMount,
    onMounted: onMounted,
    onBeforeUpdate: onBeforeUpdate,
    onUpdated: onUpdated,
    onBeforeUnmount: onBeforeUnmount,
    onUnmounted: onUnmounted,
    watch: watch,
    traverse: traverse
});

var _a;
var TO_DISPLAY_STRING = Symbol('toDisplayString');
var CREATE_ELEMENT_VNODE = Symbol('createElementVNode');
var helperMapName = (_a = {},
    _a[TO_DISPLAY_STRING] = 'toDisplayString',
    _a[CREATE_ELEMENT_VNODE] = 'createElementVNode',
    _a);

function generate(ast) {
    var context = createCodegenContext();
    var push = context.push;
    genFunctionPreamble(ast, context);
    var functionName = 'render';
    var args = ['_ctx', '_cache'];
    var signature = args.join(', ');
    push("function " + functionName + "(" + signature + "){");
    push("return");
    genNode(ast.codegenNode, context);
    push("}");
    return {
        code: context.code
    };
}
function genFunctionPreamble(ast, context) {
    var push = context.push;
    var VueBinging = "Vue";
    var aliasHelper = function (s) { return helperMapName[s] + ":_" + helperMapName[s]; };
    if (ast.helpers.length > 0) {
        push("const { " + ast.helpers.map(aliasHelper).join(', ') + " } = " + VueBinging);
    }
    push("\r\n");
    push('return ');
}
function genNode(node, context) {
    switch (node.type) {
        // 文本
        case 3 /* TEXT */:
            genText(node, context);
            break;
        // 插值
        case 0 /* INTERPOLATION */:
            genInterpolation(node, context);
            break;
        // 表达式
        case 1 /* SIMPLE_EXPRESSION */:
            genExpression(node, context);
            break;
        // 元素
        case 2 /* ELEMENT */:
            genElement(node, context);
            break;
        // 复合类型
        case 5 /* COMPOUND_EXPRESSION */:
            genCompoundExpression(node, context);
            break;
    }
}
function genCompoundExpression(node, context) {
    var push = context.push;
    var children = node.children;
    for (var i = 0; i < children.length; i++) {
        var child = children[i];
        if (isString(child)) {
            push(child);
        }
        else {
            genNode(child, context);
        }
    }
}
function genElement(node, context) {
    var push = context.push, helper = context.helper;
    var tag = node.tag, children = node.children, props = node.props;
    push(helper(CREATE_ELEMENT_VNODE) + "(");
    genNodeList(genNullable([tag, props, children]), context);
    push(')');
}
function genNodeList(nodes, context) {
    var push = context.push;
    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        if (isString(node)) {
            push(node);
        }
        else {
            genNode(node, context);
        }
        if (i < nodes.length - 1) {
            push(', ');
        }
    }
}
function genNullable(args) {
    return args.map(function (arg) { return arg || 'null'; });
}
function genExpression(node, context) {
    var push = context.push;
    push("" + node.content);
}
function genInterpolation(node, context) {
    var push = context.push, helper = context.helper;
    push(helper(TO_DISPLAY_STRING) + "(");
    genNode(node.content, context);
    push(')');
}
function genText(node, context) {
    var push = context.push;
    push(" '" + node.content + "'");
}
function createCodegenContext() {
    var context = {
        code: '',
        push: function (source) {
            context.code += source;
        },
        helper: function (key) {
            return " _" + helperMapName[key];
        }
    };
    return context;
}

function baseParse(content) {
    var context = createParserContext(content);
    return createRoot(parseChildren(context, []));
}
function parseChildren(context, ancestors) {
    var nodes = [];
    while (!isEnd(context, ancestors)) {
        var node = void 0;
        var s = context.source;
        if (s.startsWith("{{")) {
            node = parseInterpolation(context);
        }
        else if (s[0] === '<') {
            if (/[a-z]/i.test(s[1])) {
                node = parseElement(context, ancestors);
            }
        }
        if (!node) {
            node = parseText(context);
        }
        nodes.push(node);
    }
    return nodes;
}
function isEnd(context, ancestors) {
    var s = context.source;
    if (s.startsWith('</')) {
        for (var i = ancestors.length - 1; i >= 0; i--) {
            var tag = ancestors[i].tag;
            if (startsWithEndTagOpen(s, tag)) {
                return true;
            }
        }
    }
    return !s;
}
function parseText(context) {
    var endIndex = context.source.length;
    var endTokens = ["<", "{{"];
    for (var i = 0; i < endTokens.length; i++) {
        var index = context.source.indexOf(endTokens[i]);
        if (index !== -1 && endIndex > index) {
            endIndex = index;
        }
    }
    var content = parseTextData(context, endIndex);
    return {
        type: 3 /* TEXT */,
        content: content
    };
}
function parseTextData(context, length) {
    var content = context.source.slice(0, length);
    advanceBy(context, length);
    return content;
}
function parseElement(context, ancestors) {
    var element = parseTag(context, 0 /* Start */);
    ancestors.push(element);
    element.children = parseChildren(context, ancestors);
    ancestors.pop();
    if (startsWithEndTagOpen(context.source, element.tag)) {
        parseTag(context, 1 /* End */);
    }
    else {
        throw new Error("\u7F3A\u5C11\u7ED3\u675F\u6807\u7B7E:" + element.tag);
    }
    return element;
}
function startsWithEndTagOpen(source, tag) {
    return source.startsWith('</') && source.slice(2, 2 + tag.length).toLowerCase() === tag;
}
function parseTag(context, type) {
    // 解析 tag
    var match = /^<\/?([a-z]*)/i.exec(context.source);
    var tag = match[1];
    // 删除处理完的代码
    advanceBy(context, match[0].length);
    advanceBy(context, 1);
    if (type === 1 /* End */) {
        return;
    }
    return {
        type: 2 /* ELEMENT */,
        tag: tag
    };
}
function parseInterpolation(context) {
    var openDelimiter = '{{';
    var closeDelimiter = '}}';
    var closeIndex = context.source.indexOf(closeDelimiter, openDelimiter.length);
    advanceBy(context, openDelimiter.length);
    var rawContentLength = closeIndex - openDelimiter.length;
    var rawContent = parseTextData(context, rawContentLength);
    var content = rawContent.trim();
    advanceBy(context, closeDelimiter.length);
    return {
        type: 0 /* INTERPOLATION */,
        content: {
            type: 1 /* SIMPLE_EXPRESSION */,
            content: content
        }
    };
}
function advanceBy(context, length) {
    context.source = context.source.slice(length);
}
function createRoot(children) {
    return {
        children: children,
        type: 4 /* ROOT */
    };
}
function createParserContext(content) {
    return {
        source: content
    };
}

function transform(root, options) {
    if (options === void 0) { options = {}; }
    var context = createTransformContext(root, options);
    traverseNode(root, context);
    createRootCodegen(root);
    root.helpers = __spreadArray([], __read(context.helpers.keys()), false);
}
function createRootCodegen(root) {
    var child = root.children[0];
    if (child.type === 2 /* ELEMENT */) {
        root.codegenNode = child.codegenNode;
    }
    else {
        root.codegenNode = child;
    }
}
function traverseNode(node, context) {
    var nodeTransforms = context.nodeTransforms;
    var exitFns = [];
    for (var i_1 = 0; i_1 < nodeTransforms.length; i_1++) {
        var transform_1 = nodeTransforms[i_1];
        var onExit = transform_1(node, context);
        if (onExit)
            exitFns.push(onExit);
    }
    switch (node.type) {
        case 0 /* INTERPOLATION */:
            context.helper(TO_DISPLAY_STRING);
            break;
        case 4 /* ROOT */:
        case 2 /* ELEMENT */:
            traverseChildren(node, context);
            break;
    }
    var i = exitFns.length;
    while (i--) {
        exitFns[i]();
    }
}
function traverseChildren(node, context) {
    var children = node.children;
    if (children) {
        for (var i = 0; i < children.length; i++) {
            var node_1 = children[i];
            traverseNode(node_1, context);
        }
    }
}
function createTransformContext(root, options) {
    var context = {
        root: root,
        nodeTransforms: options.nodeTransforms || [],
        helpers: new Map(),
        helper: function (key) {
            context.helpers.set(key, 1);
        }
    };
    return context;
}

function createVNodeCall(context, tag, props, children) {
    context.helper(CREATE_ELEMENT_VNODE);
    return {
        type: 2 /* ELEMENT */,
        tag: tag,
        props: props,
        children: children
    };
}

function transformElement(node, context) {
    if (node.type === 2 /* ELEMENT */) {
        return function () {
            // 中间处理层
            //tag 
            var vnodeTag = "'" + node.tag + "'";
            // props
            var vnodeProps;
            // children
            var children = node.children;
            var vnodeChildren = children[0];
            node.codegenNode = createVNodeCall(context, vnodeTag, vnodeProps, vnodeChildren);
        };
    }
}

function transformExpression(node) {
    if (node.type === 0 /* INTERPOLATION */) {
        node.content = processExpression(node.content);
    }
}
function processExpression(node) {
    node.content = "_ctx." + node.content;
    return node;
}

function transformText(node) {
    function isText(node) {
        return node.type === 3 /* TEXT */ || node.type === 0 /* INTERPOLATION */;
    }
    var currentContainer;
    if (node.type === 2 /* ELEMENT */) {
        return function () {
            var children = node.children;
            for (var i = 0; i < children.length; i++) {
                var child = children[i];
                if (isText(child)) {
                    for (var j = i + 1; j < children.length; j++) {
                        var next = children[j];
                        if (isText(next)) {
                            if (!currentContainer) {
                                currentContainer = children[i] = {
                                    type: 5 /* COMPOUND_EXPRESSION */,
                                    children: [child]
                                };
                            }
                            currentContainer.children.push(' + ');
                            currentContainer.children.push(next);
                            children.splice(j, 1);
                            j--;
                        }
                        else {
                            currentContainer = undefined;
                            break;
                        }
                    }
                }
            }
        };
    }
}

function baseCompile(template) {
    var ast = baseParse(template);
    transform(ast, {
        nodeTransforms: [transformExpression, transformElement, transformText]
    });
    return generate(ast);
}

function compileToFunction(template) {
    var code = baseCompile(template).code;
    var render = new Function('Vue', code)(runtimeDom);
    return render;
}
registerRuntimeCompiler(compileToFunction);

exports.createApp = createApp;
exports.createElementVNode = createVNode;
exports.createHook = createHook;
exports.createRenderer = createRenderer;
exports.createTextVNode = createTextVNode;
exports.getCurrentInstance = getCurrentInstance;
exports.h = h;
exports.inject = inject;
exports.injectHook = injectHook;
exports.nextTick = nextTick;
exports.onBeforeMount = onBeforeMount;
exports.onBeforeUnmount = onBeforeUnmount;
exports.onBeforeUpdate = onBeforeUpdate;
exports.onMounted = onMounted;
exports.onUnmounted = onUnmounted;
exports.onUpdated = onUpdated;
exports.provide = provide;
exports.proxyRefs = proxyRefs;
exports.reactive = reactive;
exports.ref = ref;
exports.registerRuntimeCompiler = registerRuntimeCompiler;
exports.renderSlots = renderSlots;
exports.toDisplayString = toDisplayString;
exports.traverse = traverse;
exports.watch = watch;
