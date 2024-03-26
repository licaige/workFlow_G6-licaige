import { createFiber } from "./createFiber"
import { isArray, isStringOrNumber, updateNode } from "./utils"

export function updateFunctionComponent(wip) {
    const children = wip.type(wip.props)
    reconcileChildren(wip, children)
}

export function updateHostComponent(wip) {
    // 更新自己
    if(!wip.stateNode) {
        wip.stateNode = document.createElement(wip.type)
        // 属性
        updateNode(wip.stateNode, {}, wip.props)
    }
    // 协调子节点
    reconcileChildren(wip, wip.props.children)
    console.log('wip', wip)
}

export function updateFragmentComponent(wip) {
    // 协调子节点
    reconcileChildren(wip, wip.props.children)
}

function reconcileChildren(returnFiber, children) {
    if(isStringOrNumber(children)) {
        return
    }
    const newChildren = isArray(children) ? children : [children]
    let previousNewFiber = null;
    for (let i = 0; i < newChildren.length; i++) {
        const newChild = newChildren[i]
        const newFiber = createFiber(newChild, returnFiber)
        if(previousNewFiber === null) {
            returnFiber.child = newFiber
        } else {
            previousNewFiber.sibling = newFiber;
        }

        previousNewFiber = newFiber
    }
}