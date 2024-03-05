//! 代理沙箱实例
type Proxy = /*unresolved*/ any

export default class ProxySandbox {

    proxyWindow: Proxy
    sandboxRunning: boolean
    
    constructor() {
        const rawWindow = window;
        const fakeWindow = {};
        const proxyWindow = new Proxy(fakeWindow, {
            set: (target: any, prop: any, value: any) => {
                if (this.sandboxRunning) {
                    target[prop] = value;
                    return true;
                } else {
                    return false
                }
            },
            get: (target: any, prop: any) => {
                // 如果fakeWindow里面有，就从fakeWindow里面取，否则，就从外部的window里面取
                //! 注意  如果调用了window.addEventLister之类的window函数, 需要将value的this转换为真实window,
                //! 否则空对象target.addEventLister无法进行调用
                //! Proxy一般需要配合Reflect进行调用  这里使用Reflect.get获取target/rawWindow中的属性
                var hasProp = prop in target
                let value = hasProp ? Reflect.get(target,prop) : Reflect.get(rawWindow,prop);
            
                // 如果value是一个函数,改变this指向为真实window
                if(typeof(value)=='function'){
                    value = hasProp? value.bind(target): value.bind(rawWindow)
                }
                
                return value
            },            
        })
        this.sandboxRunning = false
        this.proxyWindow = proxyWindow;
    }

    active() {
        this.sandboxRunning = true;
    }
    inactive() {
        this.sandboxRunning = false;
    }
}


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
