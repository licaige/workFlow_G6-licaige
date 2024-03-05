"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dispatchLifecyclesEvent = exports.MicroAppElement = exports.appInstanceMap = void 0;
const constance_1 = require("./constance");
const createApp_1 = __importDefault(require("./createApp"));
const logger_1 = __importDefault(require("./logger"));
// App实例
exports.appInstanceMap = new Map();
class MicroAppElement extends HTMLElement {
    // 监视自定义组件属性改变,触发回调(attributeChangedCallback)
    static get observedAttributes() {
        return ['name', 'url'];
    }
    constructor() {
        super();
        this.appName = ''; // app name
        this.appUrl = ''; // app url
        this.options = {
            name: this.appName,
            url: this.appUrl,
            shadowDom: true
        }; // start时传入的全局option
        logger_1.default.log('创建micro-app-element组件');
        // patchSetAttribute()
    }
    // 组件挂载到document时的hook
    connectedCallback() {
        logger_1.default.log('组件挂载到document');
        const isAppEffective = this.appName && this.appUrl;
        dispatchLifecyclesEvent(this, constance_1.lifeCycles.CREATED);
        isAppEffective && this.handleConnected();
    }
    // 组件从document删除时的hook
    disconnectedCallback() {
        throw new Error("Method not implemented.");
    }
    // 组件属性改变时的hook(配合observedAttributes)
    //!设置attr并执行conn
    attributeChangedCallback(attr, oldVal, newVal) {
        if (attr === 'name' && this.appName !== attr) {
            this.appName = newVal;
        }
        if (attr === 'url' && this.appUrl !== attr) {
            this.appUrl = newVal;
        }
        const isAppEffective = this.appName && this.appUrl;
        isAppEffective && this.handleConnected();
    }
    // 尝试mount App
    handleConnected() {
        if (!this.appName || !this.appUrl)
            return;
        logger_1.default.log('尝试链接 App');
        // 初始化shadowDom
        this.initShadowDom();
        // 创建App
        const appAlreadyCreated = exports.appInstanceMap.has(this.appName);
        if (appAlreadyCreated) {
        }
        else {
            this.handleCreateApp();
        }
    }
    // 创建App实例
    handleCreateApp() {
        var _a;
        logger_1.default.log('创建app实例');
        //todo 卸载app并删除实例  
        const app = exports.appInstanceMap.get(this.appName);
        if (app) { }
        const newApp = new createApp_1.default({
            name: this.appName,
            url: this.appUrl,
            container: (_a = this.shadowRoot) !== null && _a !== void 0 ? _a : this,
            scopecss: false,
            useSandbox: true
        });
        exports.appInstanceMap.set(newApp.name, newApp);
    }
    // 获取某个配置结果(可从元素attr和全局options中获取)
    getOptionsResult(name) {
        const eleAttr = this.getAttribute(name); // ele属性
        const optionResult = this.options[name]; // options结果
        return eleAttr || optionResult; // attr优先
    }
    // 初始化shadowDom
    initShadowDom() {
        const shouldAttachShadow = this.getOptionsResult('shadowDom') && !this.shadowRoot;
        if (shouldAttachShadow) {
            logger_1.default.log('初始化shadowDom');
            this.attachShadow({ mode: 'open' });
        }
    }
}
exports.MicroAppElement = MicroAppElement;
// TODO -------------- 触发生命周期事件-----------------
function dispatchLifecyclesEvent(element, lifecycleName) {
    logger_1.default.log(`触发生命周期事件:` + lifecycleName);
}
exports.dispatchLifecyclesEvent = dispatchLifecyclesEvent;
