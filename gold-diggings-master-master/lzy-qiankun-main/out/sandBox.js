"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProxySandbox {
    constructor() {
        const rawWindow = window;
        const fakeWindow = {};
        const proxyWindow = new Proxy(fakeWindow, {
            set: (target, prop, value) => {
                if (this.sandboxRunning) {
                    target[prop] = value;
                    return true;
                }
                else {
                    return false;
                }
            },
            get: (target, prop) => {
                // 如果fakeWindow里面有，就从fakeWindow里面取，否则，就从外部的window里面取
                let value = prop in target ? target[prop] : rawWindow[prop];
                return value;
            }
        });
        this.sandboxRunning = false;
        this.proxyWindow = proxyWindow;
    }
    active() {
        this.sandboxRunning = true;
    }
    inactive() {
        this.sandboxRunning = false;
    }
}
exports.default = ProxySandbox;
//todo-----------------使用方式
//   let proxy1 = new ProxySandbox();
//   let proxy2 = new ProxySandbox();
//   ((window) => {/。
//       proxy1.active();
//       console.log('修改前proxy1的sex', window.sex);// 男
//       window.sex = '女';
//       console.log('修改后proxy1的sex', window.sex);// 女
//   })(proxy1.proxy);
//   console.log('外部window.sex', window.sex);  // 男(不影响外部window)
//   ((window) => {
//       proxy2.active();
//       console.log('修改前proxy2的sex', window.sex);// 男
//       window.sex = '人妖';
//       console.log('修改后proxy2的sex', window.sex);//人妖
//   })(proxy2.proxy);
//   console.log('外部window.sex', window.sex);  // 男(不影响外部window)
