"use strict";
// 修改全局变量document  修改全局方法  
Object.defineProperty(exports, "__esModule", { value: true });
exports.iniGlobalEnv = void 0;
const globalEnv = {};
const isBrowser = typeof window !== 'undefined';
function iniGlobalEnv() {
    // 创建document对象
    if (!isBrowser)
        return;
    const rawWindow = Function('return window')();
    const rawDocument = Function('return document')(); // 当前app的document
    const rawRootDocument = Function('return Document')(); // 原始document对象 用于获取方法
    // 代理所有document操作dom方法
    const rawCreateElement = rawRootDocument.prototype.createElement;
    const rawCreateElementNS = rawRootDocument.prototype.createElementNS;
    const rawCreateDocumentFragment = rawRootDocument.prototype.createDocumentFragment;
    const rawQuerySelector = rawRootDocument.prototype.querySelector;
    const rawQuerySelectorAll = rawRootDocument.prototype.querySelectorAll;
    const rawGetElementById = rawRootDocument.prototype.getElementById;
    const rawGetElementsByClassName = rawRootDocument.prototype.getElementsByClassName;
    const rawGetElementsByTagName = rawRootDocument.prototype.getElementsByTagName;
    const rawGetElementsByName = rawRootDocument.prototype.getElementsByName;
    Object.assign(globalEnv, {
        rawWindow,
        rawDocument,
        rawRootDocument,
        rawCreateElement,
        rawCreateElementNS,
        rawCreateDocumentFragment,
        rawQuerySelector,
        rawQuerySelectorAll,
        rawGetElementById,
        rawGetElementsByClassName,
        rawGetElementsByTagName,
        rawGetElementsByName,
    });
    patchDocument();
}
exports.iniGlobalEnv = iniGlobalEnv;
//!  修改document方法 改变this指向(指向外部docuemnt改为指向内部document)
function patchDocument() {
    const rawDocument = globalEnv.rawDocument;
    const rawRootDocument = globalEnv.rawRootDocument;
    rawRootDocument.prototype.createElement = function createElement(tagName, options) {
        return globalEnv.rawCreateElement.call(rawDocument, tagName, options);
    };
    rawRootDocument.prototype.createElementNS = function createElementNS(namespaceURI, name, options) {
        return globalEnv.rawCreateElementNS.call(rawDocument, namespaceURI, name, options);
    };
    rawRootDocument.prototype.createDocumentFragment = function createDocumentFragment() {
        return globalEnv.rawCreateDocumentFragment.call(rawDocument);
    };
    rawRootDocument.prototype.getElementById = function getElementById(key) {
        console.log('执行代理getElementById');
        const ele = globalEnv.rawGetElementById.call(rawDocument, key);
        return ele;
    };
    rawRootDocument.prototype.getElementsByClassName = function getElementsByClassName(key) {
        return globalEnv.rawGetElementsByClassName.call(rawDocument, key);
    };
    rawRootDocument.prototype.getElementsByTagName = function getElementsByTagName(key) {
        return globalEnv.rawGetElementsByTagName.call(rawDocument, key);
    };
    rawRootDocument.prototype.getElementsByName = function getElementsByName(key) {
        return globalEnv.rawGetElementsByName.call(rawDocument, key);
    };
}
