"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const watcher_1 = __importDefault(require("./watcher"));
const watcher = new watcher_1.default({
    watchPerformance: true,
    watchEvent: true,
    watchError: true,
    watchRouter: true
});
console.log(watcher);
