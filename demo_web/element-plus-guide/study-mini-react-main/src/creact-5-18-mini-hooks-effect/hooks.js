import { scheduleUpdateOnFiber } from "./ReactFiberWorkLoop"
import { areHookInputsEqual, HookLayout, HookPassive } from "./utils"

let currentlyRenderingFiber = null
let workInProgressHook = null
let currentHook = null

export function renderHooks(wip) {
    currentlyRenderingFiber = wip
    currentlyRenderingFiber.memorizedState = null
    currentlyRenderingFiber.updateQueueOfEffect = []
    currentlyRenderingFiber.updateQueueOfLayoutEffect = []
    workInProgressHook = null
}

function updateWorkInProgressHook() {
    const current = currentlyRenderingFiber.alternate
    let hook
    if(current) {
        // 组件更新，在老hook的基础上更新
        currentlyRenderingFiber.memorizedState = current.memorizedState
        if(workInProgressHook) {
            // not head
            hook = workInProgressHook = workInProgressHook.next
            currentHook = currentHook.next
        } else {
            // head hook
            hook = workInProgressHook = current.memorizedState
            currentHook = current.memorizedState
        }
    } else {
        // 初始渲染
        currentHook = null
        hook = {
            memorizedState: null,
            next: null
        }

        if(workInProgressHook) {
            // not head
            workInProgressHook = workInProgressHook.next = hook
        } else {
            // head hook
            workInProgressHook = currentlyRenderingFiber.memorizedState = hook
        }
    }

    return hook
}

export function useReducer(reducer, initalState) {

    const hook = updateWorkInProgressHook()

    if(!currentlyRenderingFiber.alternate) {
        hook.memorizedState = initalState
    }
    const dispatch = (action) => {
        hook.memorizedState = reducer(hook.memorizedState, action)
        scheduleUpdateOnFiber(currentlyRenderingFiber)
    }
    
    return [hook.memorizedState, dispatch]
}

function updateEffectImp(hookFlags, create, deps) {
    const hook = updateWorkInProgressHook()
    if(currentHook) {
        // 检查 deps 是否变化
        const prevEffect = currentHook.memorizedState
        if(deps) {
            const prevDeps = prevEffect.deps;
            if(areHookInputsEqual(deps, prevDeps)) {
                return
            }
        }
    }
    const effect = {hookFlags, create, deps}
    hook.memorizedState = effect

    if(hookFlags & HookPassive) {
        currentlyRenderingFiber.updateQueueOfEffect.push(effect)
    } else if(hookFlags & HookLayout){
        currentlyRenderingFiber.updateQueueOfLayoutEffect.push(effect)
    }

}

export function useEffect(create, deps) {
    return updateEffectImp(HookPassive, create, deps)
}

export function useLayoutEffect(create, deps) {
    return updateEffectImp(HookLayout, create, deps)
}

