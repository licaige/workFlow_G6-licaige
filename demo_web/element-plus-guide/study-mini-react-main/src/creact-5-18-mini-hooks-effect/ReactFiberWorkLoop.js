import { updateFragmentComponent, updateFunctionComponent, updateHostComponent } from "./ReactFiberReconciler";
import { scheduleCallback, shouldYield } from "./scheduler";
import { isFn, isStringOrNumber, Placement, Update, updateNode } from "./utils";

// 更新vnode
// 更新dom
let wipRoot = null;
let nextUnitOfWork = null;
export function scheduleUpdateOnFiber(fiber) {
    fiber.alternate = {...fiber}
    wipRoot = fiber;
    nextUnitOfWork = fiber;
    scheduleCallback(workLoop)
}

function performUnitOfWork(wip) {
    const { type } = wip
    // 1. 更新当前 fiber
    if(isStringOrNumber(type)) {
        updateHostComponent(wip)
    } else if(isFn(type)) {
        updateFunctionComponent(wip)
    } else {
        updateFragmentComponent(wip)
    }
    // 2. 返回下一个要更新的fiber
    // 深度优先
    if (wip.child) {
        return wip.child
    }

    while(wip) {
        if(wip.sibling) {
            return wip.sibling
        }
        wip = wip.return
    }

    return null;
}

function workLoop() {
    while(nextUnitOfWork && !shouldYield()) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    }

    if(!nextUnitOfWork && wipRoot) {
        // vnode 更新完了
        commitRoot()
    }
}

// requestIdleCallback(workLoop)

function commitRoot() {
    isFn(wipRoot.type) ? commitWorker(wipRoot) : commitWorker(wipRoot.child)
}

function invokeHooks(wip) {
    const {updateQueueOfEffect, updateQueueOfLayoutEffect} = wip
    for(let i = 0; i < updateQueueOfLayoutEffect.length; i++) {
        const effect = updateQueueOfLayoutEffect[i]
        effect.create();
    }

    for(let i = 0; i < updateQueueOfEffect.length; i++) {
        const effect = updateQueueOfEffect[i]
        scheduleCallback(() => {
            effect.create();
        })
    }
}

function commitWorker(wip) {
    if(!wip) {
        return
    }

    if(isFn(wip.type)) {
        invokeHooks(wip)
    }

    // 1. commit 自己
    const { flags, stateNode } = wip
    const parentNode = getParentNode(wip.return)
    if(flags & Placement && stateNode) {
        console.log('xxx', stateNode, parentNode)
        parentNode.appendChild(stateNode)
    }

    if(flags & Update && stateNode) {
        updateNode(stateNode, wip.alternate.props, wip.props)
    }
    
    // 2. commit child
    commitWorker(wip.child)
    // 3. commit sibling
    commitWorker(wip.sibling)
}

function getParentNode(wip) {
    while(wip) {
        if(wip.stateNode) {
            return wip.stateNode
        }
        wip = wip.return
    }
}