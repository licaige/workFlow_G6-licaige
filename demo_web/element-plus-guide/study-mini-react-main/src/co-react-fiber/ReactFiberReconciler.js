import { createFiber } from "./createFiber"
import { isStr, updateNode } from "./utils"


export function updateFunctionComponent(wip) {
    const children = wip.type(wip.props)
    reconileChildren(wip, children)
}

export function updateHostComponent(wip) {
    // 更新自己
    if(!wip.stateNode) {
        wip.stateNode = document.createElement(wip.type)
        // 属性
        updateNode(wip.stateNode, wip.props)
    }
    // 协调子节点
    reconileChildren(wip, wip.props.children)
}

export function updateFragmentComponent(wip) {
    reconileChildren(wip, wip.props.children)
}

function reconileChildren(returnFiber, children) {
    if(isStr(children)) {
        return
    }
    const newChildren = Array.isArray(children) ? children : [children]
    let previousNewsFiber = null
    for(let i = 0; i < newChildren.length; i ++) {
        const newChild = newChildren[i]
        const newFiber = createFiber(newChild, returnFiber)
        if(previousNewsFiber === null) {
            returnFiber.child = newFiber
        } else {
            previousNewsFiber.sibling = newFiber
        }
        previousNewsFiber = newFiber
    }
}