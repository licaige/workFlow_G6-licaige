function render(vnode, container) {
    console.log('vnode', vnode)
    const node = createNode(vnode)

    container.appendChild(node)
}

function isString(s) {
    return typeof s === 'string'
}

function createNode(vnode) {
    let node
    // todo 根据vode生成node
    const {type, props} = vnode
    if(isString(type)) {
        node = document.createElement(type)
        reconcileChildren(node, props.children)
        updateNode(node, props)
    } else if(typeof type === 'function') {
        // 区分函数组件和类组件
        node = type.prototype.isReactComponent ? updateClassComponet(vnode) : updateFunctionComponent(vnode)
    } else {
        node = document.createTextNode(vnode)
    }
    return node
}

// 先new，再执行实例的render
function updateClassComponet(vnode) {
    const {type, props} = vnode
    const instance = new type(props)
    const child = instance.render()
    const node = createNode(child)
    return node
}

// 执行函数
function updateFunctionComponent(vnode) {
    const {type, props} = vnode

    const child = type(props)

    const node = createNode(child)

    return node
}

function updateNode(node, nextVal) {
    Object.keys(nextVal).filter(k => k!== 'children').forEach(k => {
        node[k] = nextVal[k]
    })
}

function reconcileChildren(parentNode, children) {
    const newChildren = Array.isArray(children) ? children : [children]
    for(let i = 0; i < newChildren.length; i++) {
        const child = newChildren[i]
        // child是vnode
        // vnode => node，然后插入到container中
        render(child, parentNode)
    }
}

export default { render }
