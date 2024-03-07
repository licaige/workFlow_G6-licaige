import { getAppChanges, shouldBeActive } from "../application/app.helpers.js";
import { toBootstrapPromise } from "../lifecycles/bootstrap.js";
import { toLoadPromise } from "../lifecycles/load.js";
import { toMountPromise } from "../lifecycles/mount.js";
import { toUnmountPromise } from "../lifecycles/unmount.js";
import { started } from "../start.js";
import './naviation-event.js'
import { callCaptureEventListeners } from "./naviation-event.js";



// 后续路径变化 也需要走这里， 重新计算哪些应用被加载或者写在

let appChangeUnderWay = false;
let peopleWaitingOnAppChange = []
export function reroute(event) {

    // 如果多次触发reroute 方法我们可以创造一个队列来屏蔽这个问题
    if(appChangeUnderWay){
        return new Promise((resolve,reject)=>{
            peopleWaitingOnAppChange.push({
                resolve,reject
            })
        })
    }
    // 获取app对应的状态 进行分类
    const { appsToLoad, appsToMount, appsToUnmount } = getAppChanges()
    // 加载完毕后 需要去挂载的应用
    if(started){
        appChangeUnderWay = true
        // 用户调用了start方法 我们需要处理当前应用要挂载或者卸载
        return performAppChange();
    }
    // 先拿到应用去加载  -》
    return loadApps();
    function loadApps() {
        // 应用的加载
        return Promise.all(appsToLoad.map(toLoadPromise)).then(callEventListener)// 目前我们没有调用start 
    }
    function performAppChange(){
        // 将不需要的应用卸载掉, 返回一个卸载的promise
        // 1) 稍后测试销毁逻辑
        const unmountAllPromises = Promise.all(appsToUnmount.map(toUnmountPromise))

        // 流程加载需要的应用  -》 启动对应的应用 -》 卸载之前的 -》 挂载对应的应用

        // 2) 加载需要的应用（可能这个应用在注册的时候已经被加载了）

        // 默认情况注册的时候 路径是 /a , 但是当我们start的时候应用是/b
        const loadMountPromises = Promise.all(appsToLoad.map(app=> toLoadPromise(app).then(app=>{
            // 当应用加载完毕后 需要启动和挂载，但是要保证挂载前 先卸载掉来的应用
            return  tryBootstrapAndMount(app,unmountAllPromises)
        })));

        // 如果应用 没有加载   加载 -》启动挂载   如果应用已经加载过了  挂载
        const MountPromises = Promise.all(appsToMount.map(app=> tryBootstrapAndMount(app,unmountAllPromises)))

        function tryBootstrapAndMount(app,unmountAllPromises){
            if(shouldBeActive(app)){
                // 保证卸载完毕在挂载
                return toBootstrapPromise(app).then(app=> unmountAllPromises.then(()=> toMountPromise(app)))
            }
        }
        
        return Promise.all([loadMountPromises,MountPromises]).then(()=>{ // 卸载完毕后
            callEventListener();
            appChangeUnderWay = false;
            if(peopleWaitingOnAppChange.length > 0){
                peopleWaitingOnAppChange = []; // 多次操作 我缓存起来，。。。。
            }
           
        })

        
    }

    function callEventListener(){
        callCaptureEventListeners(event)
    }

}

//  [a]  -》 【a]
//  [a,b] -> [a]


// [a]  -> []
// [a,b]  -> [b]