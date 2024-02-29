#! /usr/bin/env node
const data = [
  {
    id: "1897e132-e98e-4d33-9ca4-b884d4079567",
    name: "分组-1",
    parent_id: null
  },
  {
    id: "fb88c694-df36-42db-9890-429b58674877",
    name: "分组-2",
    parent_id: null
  },
  {
    id: "685a99b5-f8dd-427f-a6df-e43766358e68",
    name: "分组-1-1",
    parent_id: "1897e132-e98e-4d33-9ca4-b884d4079567"
  },
  {
    id: "7c93d559-8c20-4480-83aa-c9fc51c066f0",
    name: "分组-3",
    parent_id: null
  },
  {
    id: "703faaa2-c3ae-49a4-9ebd-c152adc6f91c",
    name: "分组-1-2",
    parent_id: "1897e132-e98e-4d33-9ca4-b884d4079567"
  },
  {
    id: "b22a266d-9e6a-4ab4-ab6d-4d3fad1e41f0",
    name: "分组-1-3",
    parent_id: "1897e132-e98e-4d33-9ca4-b884d4079567"
  },
  {
    id: "08b7bf26-51f9-43f6-bb46-892397d5f210",
    name: "分组-1-1-1",
    parent_id: "685a99b5-f8dd-427f-a6df-e43766358e68"
  }
]
var treeNode = function (data) {
  if (data.length < 2) return data
  var res = data.filter(item => !item.parent_id) // 找到所有的顶级
  var rest = data.filter(item => item.parent_id) // 得到所以的非顶级
  function findParent (parent, child, childIndex) { // child找对应的父级
    const len = parent.length
    for (let i = 0; i < len; i++) {
      const ans = parent[i].id === child.parent_id
      if (ans) { // 加入children数组中
        if (parent[i].children) {
          parent[i].children.push(child)
        } else {
          parent[i].children = [child]
        }
        rest.splice(childIndex, 1)
        return true
      }
      if (parent[i].children) { // 如果存在children数组，递归找父级
        return findParent(parent[i].children, child, childIndex)
      }
    }
    return false
  }
  var i = 0
  while (i < rest.length) { // 直到所有数组都找到对应的父级
    if (findParent(res, rest[i], i)) {
      i = 0
    } else {
      i++
    }
  }
  return res
}
console.log('res:', treeNode(data))
