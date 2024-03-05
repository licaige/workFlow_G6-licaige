"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 创建资源池用于集中保存传来的代码, 加速读取
class SourceCenter {
    constructor() {
        this.scripts = new Map();
        this.links = new Map();
    }
    saveScript(url, code) {
        this.scripts.set(url, code);
    }
    saveLink(url, code) {
        this.links.set(url, code);
    }
}
exports.default = new SourceCenter();
