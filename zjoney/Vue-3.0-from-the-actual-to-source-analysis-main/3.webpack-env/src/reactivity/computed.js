import { isFunction } from "../shared/utils";
import { effect, track, trigger } from "./effect";
import { TrackOpTypes, TriggerOpTypes } from "./operation";

export function computed(getterOrOptions) {
    let getter;
    let setter;

    if (isFunction(getterOrOptions)) {
        getter = getterOrOptions;
        setter = () => {}
    }else{
        getter = getterOrOptions.get;
        setter = getterOrOptions.set;
    }
    let dirty = true; // 默认第一次取值是执行getter方法的

    let computed;
    // 计算属性也是一个effect 
    let runner = effect(getter,{
        lazy:true, // 懒加载
        computed:true, // 这里仅仅是标识而已 是一个计算属性
        scheduler:()=>{
            if(!dirty){
                dirty = true; // 等会就算属性依赖的值发生变化后 就会执行这个scheduler
                trigger(computed,TriggerOpTypes.SET,'value')
            }
        }
    })
    let value;
    computed = {
        get value(){
            if(dirty){ // 多次取值 不会重新执行effect
                value = runner();
                dirty = false;
                track(computed,TrackOpTypes.GET,'value')
            }
            return value;
        },
        set value(newValue){
            setter(newValue);
        }    
    }

    return computed;
}