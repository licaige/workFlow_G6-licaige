"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const microApp_element_1 = require("./microApp_element");
const sandBox_1 = __importDefault(require("./sandBox"));
const constance_1 = require("./constance");
const source_center_1 = __importDefault(require("./source_center"));
const logger_1 = __importDefault(require("./logger"));
// 用于观察app资源是否请求完毕
class SourceObserver {
    constructor(app) {
        this.app = app;
        this.isLinksLoaded = false;
        this.isScriptsLoaded = false;
    }
    setState({ scripts, links }) {
        if (scripts !== this.isScriptsLoaded) {
            this.isScriptsLoaded = scripts;
        }
        if (links !== this.isScriptsLoaded) {
            this.isLinksLoaded = links;
        }
        this.dispatchMount();
    }
    dispatchMount() {
        if (this.isLinksLoaded && this.isLinksLoaded) {
            this.app.mount();
        }
    }
}
class CreateApp {
    // 初始化App
    constructor({ name, url, scopecss, useSandbox, container }) {
        this.state = constance_1.appStates.CREATED;
        this.observer = new SourceObserver(this);
        this.name = name;
        this.url = url;
        this.useSandbox = useSandbox;
        this.scopecss = this.useSandbox && scopecss;
        this.container = container !== null && container !== void 0 ? container : null;
        this.source = { html: null, links: new Set(), scripts: new Set() };
        this.sandBox = new sandBox_1.default();
        this.loadSourceCode();
    }
    // 获取资源代码
    loadSourceCode() {
        return __awaiter(this, void 0, void 0, function* () {
            // 处理html
            const htmlCode = yield fetch(this.url).then(res => res.text());
            const htmlTemplate = document.createElement('html');
            htmlTemplate.innerHTML = htmlCode;
            this.source.html = htmlTemplate;
            // 处理js
            const scripts = Array.from(htmlTemplate.querySelectorAll('script'));
            yield this.loadScripts(scripts);
            // 处理css
            const links = Array.from(htmlTemplate.querySelectorAll('link'));
            yield this.loadStylesheets(links);
        });
    }
    // 获取js脚本
    loadScripts(scripts) {
        return __awaiter(this, void 0, void 0, function* () {
            scripts.forEach((script, index) => __awaiter(this, void 0, void 0, function* () {
                const src = script.getAttribute('src');
                if (!src) { //TODO 直接将内部JS代码保存
                    const jsCode = script.innerHTML;
                    this.source.scripts.add(jsCode);
                }
                else { //TODO 解析src 请求代码 返回结果(需要对src做处理 查看是否是http开头的)
                    let jsURL = src.startsWith('http') ? src : this.url + src;
                    if (src.startsWith('http')) {
                        jsURL = src;
                    }
                    else if (src.startsWith('.')) {
                        jsURL = this.url + src.slice(1);
                    }
                    // 获取js代码 转换为text后存入资源池
                    fetch(jsURL)
                        .then(res => res.text())
                        .then(jsCode => {
                        this.source.scripts.add(jsURL); // 保存url
                        source_center_1.default.saveScript(jsURL, jsCode); // 保存代码到资源池
                        //! 检查是否获取完毕 执行mount
                        if (index == scripts.length - 1) {
                            this.observer.setState({ scripts: true });
                        }
                    });
                }
                // 检查是否获取完毕
                if (index == scripts.length - 1) {
                    this.observer.setState({ scripts: true });
                }
            }));
        });
    }
    // 获取css
    loadStylesheets(links) {
        return __awaiter(this, void 0, void 0, function* () {
            const styles = [];
            // 收集styleSheet
            Array.from(links).forEach((link) => {
                if (link.getAttribute('rel') === 'stylesheet') {
                    styles.push(link);
                }
            });
            styles.map((link, index) => __awaiter(this, void 0, void 0, function* () {
                const href = link.getAttribute('href');
                if (!href) { //TODO 直接将内部JS代码用Promise包裹返回
                    return Promise.resolve(link.innerHTML);
                }
                else { //TODO 解析src 请求代码 返回结果Promise(需要对src做处理 查看是否是http开头的)
                    let cssURL = href.startsWith('http') ? href : this.url + href;
                    if (href.startsWith('http')) {
                        cssURL = href;
                    }
                    else if (href.startsWith('.')) {
                        cssURL = this.url + href.slice(1);
                    }
                    // 获取css代码 转换为text后存入资源池
                    fetch(cssURL)
                        .then(res => res.text())
                        .then(cssCode => {
                        source_center_1.default.saveLink(cssURL, cssCode); // 保存代码到资源池
                        this.source.links.add(cssURL); // 保存url
                        //! 检查是否获取完毕 执行mount
                        if (index == styles.length - 1) {
                            this.observer.setState({ links: true });
                        }
                    });
                }
            }));
        });
    }
    onLoad() {
        throw new Error('Method not implemented.');
    }
    onLoadError() {
        throw new Error('Method not implemented.');
    }
    // mount App
    mount() {
        logger_1.default.log('-------mount App--------');
        (0, microApp_element_1.dispatchLifecyclesEvent)(this.container, constance_1.lifeCycles.BEFOREMOUNT);
        this.state = constance_1.appStates.MOUNTING;
        //处理html
        this.container.appendChild(this.source.html);
        // 加载代码
        this.callScripts();
        // 加载css
        this.callStyles();
        (0, microApp_element_1.dispatchLifecyclesEvent)(this.container, constance_1.lifeCycles.MOUNTED);
    }
    unmount(unmountParam) {
        throw new Error('Method not implemented.');
    }
    onerror(e) {
        throw new Error('Method not implemented.');
    }
    // 执行所有脚本
    // 将代码用沙箱包裹并执行
    callScripts() {
        this.source.scripts.forEach((jsUrl) => {
            const proxyWindow = this.sandBox.proxyWindow;
            const proxyDocument = this.getProxyDocument();
            const code = source_center_1.default.scripts.get(jsUrl);
            // 此时内部的window和document都进行了修改
            // 内部的document根据container修改了指向
            //todo bootstarp不支持这款proxyWindow 暂不使用沙箱(已解决)
            ((proxyWindow, document) => {
                this.sandBox.active();
                eval(code);
            })(proxyWindow, proxyDocument); // 将window换为proxyWindow
        });
    }
    // 加载css
    callStyles() {
        this.source.links.forEach((cssUrl) => {
            const microDocument = this.container.firstChild || this.container;
            const cssCode = source_center_1.default.links.get(cssUrl);
            let styleAttr = document.createElement('style');
            styleAttr.textContent = cssCode;
            microDocument.appendChild(styleAttr);
        });
    }
    //! 使用ShadowRoot代理document
    // 重写document的一些方法 用于shadowDom,比如document.getElementById('root') 
    getProxyDocument() {
        const proxyDocument = Function('return document')(); // 当前document
        const container = this.container;
        proxyDocument.getElementById = function getElementById(key) {
            return container.querySelector(`#${key}`);
        };
        return proxyDocument;
    }
}
exports.default = CreateApp;
