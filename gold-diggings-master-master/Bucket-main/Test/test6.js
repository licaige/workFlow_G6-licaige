function filterTree(tree, list) {
    return tree.reduce((acc, { name, node_id, children }) => {
        if (list.includes(node_id)) {
            if (children && children.length) {
                children = filterTree(children, list)
            }
            acc.push(JSON.parse(JSON.stringify({
                name,
                node_id,
                children: (children && children.length) ? children : undefined
            })))
        }
        return acc
    }, [])
};