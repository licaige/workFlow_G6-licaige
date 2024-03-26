import { createFiber } from "./createFiber"
import { renderHooks } from "./hooks"
import { isArray, isStringOrNumber, Update, updateNode } from "./utils"

export function updateFunctionComponent(wip) {
    renderHooks(wip)
    const children = wip.type(wip.props)
    // 协调子节点
    reconcileChildren(wip, children)
}

export function updateHostComponent(wip) {
    // 更新自己
    // 协调子节点
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

    let previousNewFiber = null
    let oldFiber = returnFiber.alternate && returnFiber.alternate.child
    for(let i = 0; i < newChildren.length; i++) {
        const newChild = newChildren[i]
        const newFiber = createFiber(newChild, returnFiber)
        const same = sameNode(newFiber, oldFiber)
        if(same) {
            Object.assign(newFiber, {
                alternate: oldFiber,
                flags: Update,
                stateNode: oldFiber.stateNode
            })
        }

        if(oldFiber) {
            oldFiber = oldFiber.sibling
        }

        if(previousNewFiber === null) {
            returnFiber.child = newFiber
        } else {
            previousNewFiber.sibling = newFiber
        }

        previousNewFiber = newFiber
    }

}

function sameNode(a, b) {
    return a && b && a.key===b.key && a.type===b.type
}