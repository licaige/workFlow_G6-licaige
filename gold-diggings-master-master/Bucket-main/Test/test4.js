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
const list = [1201];

function filterTree(tree, list, arr = []) {
    if (!Array.isArray(tree) || !Array.isArray(list)) throw new TypeError('参数类型不正确')
    for (const { name, node_id, children } of tree) {
        if (list.includes(node_id)) {
            if (Array.isArray(children)) {
                if (children && children.length) {
                    let chil = filterTree(children, list, arr)
                    arr.push({
                        name,
                        node_id,
                        children: chil
                    })
                } else {
                    arr.push({
                        name,
                        node_id
                    })
                }
            } else {
                throw new TypeError('children属性不是一个数组')
            }
        }
    }
    return arr
};
console.log(filterTree(data, list));