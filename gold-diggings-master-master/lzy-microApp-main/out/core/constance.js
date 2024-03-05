"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appStates = exports.lifeCycles = void 0;
// lifecycle常量
var lifeCycles;
(function (lifeCycles) {
    lifeCycles["CREATED"] = "created";
    lifeCycles["BEFOREMOUNT"] = "beforemount";
    lifeCycles["MOUNTED"] = "mounted";
    lifeCycles["UNMOUNT"] = "unmount";
    lifeCycles["ERROR"] = "error";
})(lifeCycles = exports.lifeCycles || (exports.lifeCycles = {}));
// app 状态
var appStates;
(function (appStates) {
    appStates["CREATED"] = "created";
    appStates["LOADING"] = "loading";
    appStates["LOADED"] = "loaded";
    appStates["LOAD_FAILED"] = "load_failed";
    appStates["MOUNTING"] = "mounting";
    appStates["MOUNTED"] = "mounted";
    appStates["UNMOUNT"] = "unmount";
})(appStates = exports.appStates || (exports.appStates = {}));
