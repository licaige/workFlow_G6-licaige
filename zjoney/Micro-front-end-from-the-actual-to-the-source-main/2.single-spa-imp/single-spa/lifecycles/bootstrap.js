import { BOOTSTRAPING, NOT_BOOTSTRAPED, NOT_MOUNTED } from "../application/app.helpers.js";

export function toBootstrapPromise(app){
    return Promise.resolve().then(()=>{
        if(app.status !== NOT_BOOTSTRAPED){
            // 此应用加载完毕了 
            return app;
        }
        app.status = BOOTSTRAPING

        return app.bootstrap(app.customProps).then(()=>{
            app.status = NOT_MOUNTED;
            return app
        })
    })
}