import { Placement } from "./utils"

export function createFiber(vnode, returnFiber) {
    const newFiber = {
        // host string
        // fc 函数
        // cc class
        type: vnode.type,
        // 定义了当前节点在当前层级下的唯一性
        key: vnode.key,
        props: vnode.props,
        // 第一个 fiber
        child: null,
        // 下一个 fiber
        sibling: null,
        // 父 fiber
        return: returnFiber,
        flags: Placement,
        // old fiber
        alternate: null,
        stateNode: null
    }

    return newFiber
}