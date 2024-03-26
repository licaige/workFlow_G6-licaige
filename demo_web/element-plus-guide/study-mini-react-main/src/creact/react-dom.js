import { scheduleUpdateOnFiber } from "./ReactFiberWorkLoop"

function render(vnode, container) {
    const fiberRoot = {
        type: container.nodeName.toLocaleLowerCase(),
        props: {children: vnode},
        stateNode: container,
    }
    scheduleUpdateOnFiber(fiberRoot)
}

export default { render }