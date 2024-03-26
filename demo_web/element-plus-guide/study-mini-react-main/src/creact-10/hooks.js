import { scheduleUpdateOnFiber } from "./ReactFiberWorkLoop"
let currentlyRenderingFiber = null
let workInProgressHook = null

export function renderHooks(wip) {
    currentlyRenderingFiber = wip
    currentlyRenderingFiber.memorizedState = null
    workInProgressHook = null
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
        } else {
            // head hook
           hook = workInProgressHook = current.memorizedState
        }

    } else {
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