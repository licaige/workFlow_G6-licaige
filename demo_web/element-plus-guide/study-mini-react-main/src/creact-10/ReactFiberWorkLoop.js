import { isFn, isStr, Placement, Update, updateNode } from './utils'
import { shouldYield, scheduleCallback } from './scheduler/index'
import { updateHostComponent, updateFunctionComponent, updateFragmentComponent } from './ReactFiberReconciler'
// 更新vnode
// 更新dom
// work in progress 当前正在工作当中的 wip
let wipRoot = null;
let nextUnitOfWork = null;
export function scheduleUpdateOnFiber(fiber) {
    fiber.alternate = {...fiber}
    wipRoot = fiber
    nextUnitOfWork = wipRoot
    scheduleCallback(workLoop)
}

function performUnitOfWork(wip) {
    // 1. 更新当前fiber
    const { type } = wip
    
    if(isStr(type)) {
        updateHostComponent(wip)
    } else if(isFn(type)) {
        updateFunctionComponent(wip)
    } else {
        updateFragmentComponent(wip)
    }

    // 2. 返回下一个更新的fiber
    // 深度优先
    if(wip.child) {
        return wip.child
    }

    while(wip){
        if(wip.sibling) {
            return wip.sibling
        }

        wip = wip.return
    }

    return null
}

function workLoop() {
    while(nextUnitOfWork && !shouldYield()) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    }

    if(!nextUnitOfWork && wipRoot) {
        // vnode更新完了
        commitRoot()
    }
}

// requestIdleCallback(workLoop)

function commitRoot() {
  isFn(wipRoot.type) ? commitWork(wipRoot) :  commitWork(wipRoot.child)
}

function commitWork(wip) {
    if(!wip) {
        return
    }
    // 1. commit 自己
    const { flags, stateNode } = wip
    let parentNode = getParentNode(wip.return)
    if(flags & Placement && stateNode) {
        parentNode.appendChild(stateNode)
    }

    if(flags & Update && stateNode) {
        console.log('update', stateNode, wip.alternate.props, wip.props)
        updateNode(stateNode, wip.alternate.props, wip.props)
    }

    // 2. commit child
    commitWork(wip.child)
    // 3. cmmit sibling
    commitWork(wip.sibling)
}

function getParentNode(wip) {
    while(wip) {
        if(wip.stateNode) {
            return wip.stateNode
        }
        wip = wip.return
    }
}