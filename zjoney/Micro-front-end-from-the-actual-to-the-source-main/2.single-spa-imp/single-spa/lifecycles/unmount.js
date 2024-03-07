import { MOUNTED, NOT_MOUNTED, UNMOUNTING } from "../application/app.helpers.js"

export function toUnmountPromise(app){
    return Promise.resolve().then(()=>{
        if(app.status !== MOUNTED){
            return app;
        }
        app.status = UNMOUNTING;
        // app.unmount 方法用户可能写的是一个数组。。。。。
        return app.unmount(app.customProps).then(()=>{
            app.status = NOT_MOUNTED;
        })
    })
}