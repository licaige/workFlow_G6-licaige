/**
 * 把一个树转化成list
 * @param {*} tree 
 * @returns 
 */
const treeToList = function(tree) {
  let list = []
  treeToListHelper(tree, list)
  list.sort((a, b) => a.id - b.id)
  return list
}

const treeToListHelper = function(tree, list) {
  if (!tree) return

  for (let item of tree) {
    let id = item.id
    let name = item.name
    let parentId = item.parentId
    list.push({ id, name, parentId })
    treeToListHelper(item.children, list)
  }
}

let tree = [
  {
    id: 1,
    name: '部门A',
    parentId: 0,
    children: [
      {
        id: 3,
        name: '部门C',
        parentId: 1,
        children: [
          {
            id: 6,
            name: '部门F',
            parentId: 3
          }
        ]
      },
      {
        id: 4,
        name: '部门D',
        parentId: 1,
        children: [
          {
            id: 8,
            name: '部门H',
            parentId: 4
          }
        ]
      }
    ]
  },
  {
    id: 2,
    name: '部门B',
    parentId: 0,
    children: [
      {
        id: 5,
        name: '部门E',
        parentId: 2
      },
      {
        id: 7,
        name: '部门G',
        parentId: 2
      }
    ]
  }  
];

console.log(treeToList(tree))