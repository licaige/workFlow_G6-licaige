import { Placement } from "./utils"

export function createFiber(vnode, returnFiber) {
    const newFiber = {
        type: vnode.type,
        // 定义了当前节点在当前层级下的唯一性
        key: vnode.key,
        props: vnode.props,
        // 第一个子fiber
        child: null,
        // 下一个兄弟fiber
        sibling: null,
        // 父fiber
        return: returnFiber,
        flags: Placement,
        alternate: null,
        stateNode: null,
    }
    return newFiber
}