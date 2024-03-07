let data = [
    {
        name: 'dashboard',
        node_id: 1001
    },
    {
        name: 'goods',
        node_id: 1101,
        children: [
            {
                name: 'kind',
                node_id: 1102,
            }
        ]
    },
    {
        name: 'content',
        node_id: 1201,
        children: [
            {
                name: 'banner',
                node_id: 1202,
            },
            {
                name: 'TkChoose',
                node_id: 1203,
                children: [
                    {
                        name: 'childChoose',
                        node_id: 1204
                    },
                ]
            },
            {
                name: 'EditGoods',
                node_id: 1205,
            },
        ]
    },
]
const list = [1001, 1201, 1205];

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
console.log(filterTree(data, list));