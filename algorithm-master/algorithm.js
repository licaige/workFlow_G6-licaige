/*
  1、找到所有的treeNode父节点
*/
const data = [
      {
        id: '1897e132-e98e-4d33-9ca4-b884d4079567',
        name: '分组-1',
        parent_id: null
      },
      {
        id: 'fb88c694-df36-42db-9890-429b58674877',
        name: '分组-2',
        parent_id: null
      },
      {
        id: '685a99b5-f8dd-427f-a6df-e43766358e68',
        name: '分组-1-1',
        parent_id: '1897e132-e98e-4d33-9ca4-b884d4079567'
      },
      {
        id: '7c93d559-8c20-4480-83aa-c9fc51c066f0',
        name: '分组-3',
        parent_id: null
      },
      {
        id: '703faaa2-c3ae-49a4-9ebd-c152adc6f91c',
        name: '分组-1-2',
        parent_id: '1897e132-e98e-4d33-9ca4-b884d4079567'
      },
      {
        id: 'b22a266d-9e6a-4ab4-ab6d-4d3fad1e41f0',
        name: '分组-1-3',
        parent_id: '1897e132-e98e-4d33-9ca4-b884d4079567'
      },
      {
        id: '08b7bf26-51f9-43f6-bb46-892397d5f210',
        name: '分组-1-1-1',
        parent_id: '685a99b5-f8dd-427f-a6df-e43766358e68'
      }
    ]
var treeNode = function (data) {
      if (data.length < 2) return data
      function findParent (parent, child, childIndex) { // child找对应的父级
        const len = parent.length
        for (let i = 0; i < len; i++) {
          if (parent[i].id === child.parent_id) { // 加入children数组中
            if (parent[i].children) {
              parent[i].children.push(child)
            } else {
              parent[i].children = [child]
            }
            children.splice(childIndex, 1)
            return true
          }
          if (parent[i].children) { // 如果存在children数组，递归找父级
            return findParent(parent[i].children, child, childIndex)
          }
        }
        return false
      }
      var res = data.filter(item => !item.parent_id) // 找到所有的顶级
      var children = data.filter(item => item.parent_id) // 得到所有的非顶级
      var n = 0
      while (children.length) { // 直到所有child都找到对应的父级
        if (findParent(res, children[n], n)) {
          n = 0
        } else {
          n++
        }
      }
      return res
    }
console.log('treeNode:', treeNode(data))
/*
  2.给定一个匹配格式，给定一段由空格拼接的字符串，判断 s 是否符合 pattern 的格式
  Input: pattern = "abba", s = "dog dog dog dog"
  Output: false

  Input: pattern = "abba", s = "dog cat cat dog"
  Output: true
*/
var findBoolean = function (pattern, s) {
    if (s === '' || pattern === '') return false
    var sArr = s.split(' ')
    const len = sArr.length
    if (pattern.length !== len) return false
    var res = []
    for (let n = 0; n < len; n++) {
      if (!res[n]) { // 该索引位置（即n）没有被匹配替换过
        for(let m = n; m < len; m++) {
          if (!res[m] && sArr[m] === sArr[n]) { // 该索引位置没有被替换过，且
            res[m] = pattern[n]
          }
        }
      }
    }
    if (res.join('') === pattern) {
      return true
    }
    return false
  }
console.log('findBoolean:', findBoolean('abba', 'b a a b'))

/*
  3.删除倒数第n个节点，并返回结果
  Input: [1, 2, 3, 4, 5] n=2
  Output: [1, 2, 3, 5]

  Input: { val: 1, next: { val: 2, next: { val: 3, next: { val: 4, next: { val: 5, next: null } } } } }  n = 2
  Output: { val: 1, next: { val: 2, next: { val: 3, next: { val: 5, next: null } } } }
*/
var dealLink = function (target, n) {
    var res = {}
    var ruler = []
    function findVal (res, cur) {
      if (cur) {
        if (ruler.length === n) {
          ruler.push(cur.val)
          res.val = ruler.shift()
          res.next = {}
          if (cur.next) {
            return findVal(res.next, cur.next)
          } else {
            ruler.shift()
            return findVal(res.next, null)
          }
        }
        ruler.push(cur.val)
        return findVal(res, cur.next)
      } else {
        if (ruler.length > 1) {
          res.val = ruler.shift()
          res.next = {}
          return findVal(res.next, null)
        } else {
          res.val = ruler.shift()
          res.next = null
          return true
        }
      }
    }
    findVal(res, target)
    return res
  }
var target = { val: 1, next: { val: 2, next: { val: 3, next: { val: 4, next: { val: 5, next: null } } } } }
console.log(dealLink(target, 2))
// { val: 1, next: { val: 2, next: { val: 3, next: { val: 5, next: null } } } } 
console.log(dealLink([1, 2, 3, 4, 5], 2))