import { Placement } from './utils'
export function createFiber(vnode, returnFiber) {
    const newFiber = {
        type: vnode.type,
        key: vnode.key,
        props: vnode.props,
        child: null,
        sibling: null,
        return: returnFiber,
        flags: Placement,
        alternate: null,
        stateNode: null
    }

    return newFiber;
}