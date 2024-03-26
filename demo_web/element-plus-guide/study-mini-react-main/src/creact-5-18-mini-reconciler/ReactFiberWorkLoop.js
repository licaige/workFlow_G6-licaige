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

    // 1. commit 自己
    const { flags, stateNode } = wip
    const parentNode = getParentNode(wip.return)
    // if(flags & Placement && stateNode) {
    //     parentNode.appendChild(stateNode)
    // }

    if (flags & Placement && stateNode) {
        // 找后面有没有节点
        let hasSiblingNode = foundSiblingNode(wip, parentNode);
        if (hasSiblingNode) {
          parentNode.insertBefore(stateNode, hasSiblingNode);
        } else {
          parentNode.appendChild(wip.stateNode);
        }
    }

    if(flags & Update && stateNode) {
        updateNode(stateNode, wip.alternate.props, wip.props)
    }

    if(wip.deletions) {
        commitDeletions(wip.deletions, stateNode || parentNode)
    }

    if(isFn(wip.type)) {
        invokeHooks(wip)
    }
    
    // 2. commit child
    commitWorker(wip.child)
    // 3. commit sibling
    commitWorker(wip.sibling)
}

// 找后面最近的有DOM节点的fiber
function foundSiblingNode(fiber, parentNode) {
    let siblingHasNode = fiber.sibling;
    let node = null;
    while (siblingHasNode) {
      node = siblingHasNode.stateNode;
      if (node && parentNode.contains(node)) {
        return node;
      }
      siblingHasNode = siblingHasNode.sibling;
    }
  
    return null;
}

function commitDeletions(deletions, parentNode) {
    for(let i = 0; i < deletions.length; i++) {
        const element = deletions[i]
        parentNode.removeChild(getStateNode(element))
    }
}

function getStateNode(fiber) {
    while (!fiber.stateNode) {
        fiber = fiber.child
    }
    return fiber.stateNode
}

function getParentNode(wip) {
    while(wip) {
        if(wip.stateNode) {
            return wip.stateNode
        }
        wip = wip.return
    }
}