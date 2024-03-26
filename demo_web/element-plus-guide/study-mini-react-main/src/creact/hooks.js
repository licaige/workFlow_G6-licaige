import { scheduleUpdateOnFiber } from "./ReactFiberWorkLoop"
import { areHookInputsEqual, HookLayout, HookPassive } from "./utils"
let currentlyRenderingFiber = null
let workInProgressHook = null
let currentHook = null

export function renderHooks(wip) {
    currentlyRenderingFiber = wip
    currentlyRenderingFiber.memorizedState = null
    workInProgressHook = null
    currentlyRenderingFiber.updateQueueOfEffect = []
    currentlyRenderingFiber.updateQueueOfLayout = []
}

function updateWorkInProgressHook() {
    const current = currentlyRenderingFiber.alternate
    let hook
    if(current) {
        // 组件更新， 在老hook的基础上更新
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
        // 1.修改状态值
        hook.memorizedState = reducer(hook.memorizedState, action)
        // 2.更新组件
        scheduleUpdateOnFiber(currentlyRenderingFiber)
    }

    return [hook.memorizedState, dispatch]
}

function updateEffectImpl(hookFlags, create, deps) {
    const hook = updateWorkInProgressHook()

    if(currentHook) {
        const prevEffect = currentHook.memorizedState
        if(deps) {
            const prevDeps = prevEffect.deps
            if(areHookInputsEqual(deps, prevDeps)) {
                return
            }
        }
    }

    const effect = {hookFlags, create, deps}
    hook.memorizedState = effect

    if(hookFlags & HookPassive) {
        currentlyRenderingFiber.updateQueueOfEffect.push(effect)
    } else if(hookFlags & HookLayout) {
        currentlyRenderingFiber.updateQueueOfLayout.push(effect)
    }
}

export function useEffect(create, deps) {
    return updateEffectImpl(HookPassive, create, deps)
}

export function useLayoutEffect(create, deps) {
    return updateEffectImpl(HookLayout, create, deps)
}