"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defer = void 0;
// 通过Promise实现defer关键字
// 使用unknow代替any
function defer(fn, ...args) {
    Promise.resolve().then(fn.bind(null, ...args));
}
exports.defer = defer;
