import { renderHooks } from "./hooks"
import { reconcileChildren } from "./ReactChildFiber"
import { updateNode } from "./utils"

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

