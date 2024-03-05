"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = void 0;
const microApp_element_1 = require("./core//microApp_element");
const logger_1 = __importDefault(require("./core/logger"));
// 也就是start方法
function start({ showLoggerInfo = true }) {
    // 初始化logger
    logger_1.default.showLoggerInfo = showLoggerInfo;
    // 启动,初始化customELE
    customElements.define('micro-app-element', microApp_element_1.MicroAppElement);
}
exports.start = start;
exports.default = { start };
