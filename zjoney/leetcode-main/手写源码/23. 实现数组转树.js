/**
 * 数组转树
 * 哈希map
 * @param {*} list 
 * @returns 
 */
const listToTree = function(list) {
  let map = new Map()
  for (let item of list) {
    let name = item.name
    let id = item.id
    let parentId = item.parentId
    let children = map.get(parentId) || []
    children.push({id, name, parentId})
    map.set(parentId, children)
  }
  return appendChildren(0, map)
}
const appendChildren = function(parentId, map) {
   let children = map.get(parentId)
   if (!children) return null
   for (let child of children) {
     let res = appendChildren(child.id, map)
     if (res) child.children = res
   }

   return children
}
let list = [
  {id:1, name:'部门A', parentId:0},
  {id:2, name:'部门B', parentId:0},
  {id:3, name:'部门C', parentId:1},
  {id:4, name:'部门D', parentId:1},
  {id:5, name:'部门E', parentId:2},
  {id:6, name:'部门F', parentId:3},
  {id:7, name:'部门G', parentId:2},
  {id:8, name:'部门H', parentId:4}
];
console.log(listToTree(list))