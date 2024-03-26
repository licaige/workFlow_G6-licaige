exports.vueDiff = (c1, c2, { mountElement, patch, unmount, move }) => {
  function isSameVnodeType(n1, n2) {
    return n1.key === n2.key //&& n1.type === n2.type;
  }
  const l2 = c2.length
  let i = 0
  let e1 = c1.length - 1
  let e2 = l2 - 1
  // *1. 从左边往右查找，如果节点可以复用，则继续往右，不能就停止循环
  while (i <= e1 && i <= e2) {
    // 通过上面分析我们可以知道循环条件
    // 取出新老元素
    const n1 = c1[i]
    const n2 = c2[i]
    // 对比是否一样
    if (isSameVnodeType(n1, n2)) {
      // 一样就递归调用
      patch(n1.key)
    } else {
      // 如果不一样就退出循环
      break
    }
    i++ // 指针往后移动
  }

  // *2. 从右边往左边查找，如果节点可以复用，则继续往左，不能就停止循环
  while (i <= e1 && i <= e2) {
    // 取出新老元素
    const n1 = c1[e1]
    const n2 = c2[e2]
    // 对比是否一样
    if (isSameVnodeType(n1, n2)) {
      // 一样就递归调用
      patch(n1.key)
    } else {
      // 如果不一样就退出循环
      break
    }
    // 指针移动
    e1--
    e2--
  }

  // *3. 老节点没了，新节点还有
  if (i > e1) {
    if (i <= e2) {
      // 新节点可能存在多个，所以需要循环
      while (i <= e2) {
        const n2 = c2[i]
        mountElement(n2.key)
        i++
      }
    }
    // *4. 老节点还有，新节点没了
  } else if (i > e2) {
    while (i <= e1) {
      const n1 = c1[i]
      unmount(n1.key)
      i++
    }
  } else {
    // 中间对比
    let s1 = i // 老节点的开始
    let s2 = i // 新节点的开始

    // 记录当前中间节点的总数量
    const toBePactched = e2 - s2 + 1
    // 记录当前处理的数量
    let patched = 0

    // 新节点的映射表
    const keyToNewIndexMap = new Map()

    const newIndexToOldIndexMap = new Array(toBePactched) // 创建一个定长数组，定长的数组性能是最好的
    // 是否需要移动
    let moved = false
    let maxNewIndexSoFar = 0
    for (let i = 0; i < toBePactched; i++) newIndexToOldIndexMap[i] = 0

    for (let i = s2; i <= e2; i++) {
      const nextChild = c2[i]
      keyToNewIndexMap.set(nextChild.key, i)
    }
    // 遍历老节点里面的key
    for (let i = s1; i <= e1; i++) {
      const prevChild = c1[i]
      // 如果当前处理的数量已经大于当前节点总数，那么旧节点直接删除就可以了
      if (patched >= toBePactched) {
        unmount(prevChild.key)
        continue
      }

      let newIndex
      if (prevChild.key !== null || prevChild.key !== undefined) {
        // 如果用户设置了key那么就去映射表里面查询
        newIndex = keyToNewIndexMap.get(prevChild.key)
      } else {
        // 如果用户没有设置key，那么就遍历所有，时间复杂度为O(n)
        for (let j = s2; j < e2; j++) {
          if (isSameVnodeType(prevChild, c2[j])) {
            newIndex = j
            break
          }
        }
      }
      // 如果在新的节点里面没有找到
      if (newIndex === undefined) {
        // 没有找到就删除
        unmount(prevChild.key)
      } else {

        if(newIndex >= maxNewIndexSoFar) {
            maxNewIndexSoFar = newIndex
        } else {
            // 如果旧的节点在新的节点里，前一个索引没有比后面一个索引大就需要移动
            moved = true
        }
        // 0 代表老的节点在新的节点里面是不存在的，所以要 +1
        newIndexToOldIndexMap[newIndex - s2] = i + 1

        // 找到就递归调用
        patch(c2[newIndex].key)
        patched++
      }
    }

    const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : []

    // 因为调用的DOM API 的insertBefore是需要插入到一个元素的前面，所以要使用倒序排列
    let j = increasingNewIndexSequence.length - 1
    for(let i = toBePactched -1; i >= 0; i--) {
      // 求出当前的节点
      const nextIndex = i + s2
      const nextChild = c2[nextIndex]
      // 求出当前锚点
      const anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1] : null
      
      if(newIndexToOldIndexMap[i] === 0) {// 创建
          mountElement(nextChild.key)
      } else if(moved) { // 需要移动的时候再移动
          if(j < 0 || i !== increasingNewIndexSequence[j]) {
              // 如果不在子序列里面就需要移动位置
              move(nextChild.key, anchor.key)
          } else {
              j--
          }
      }
    }
  }

  /**
   * 最长递增子序列
   * @param {*} arr 
   * @returns 
   */
  function getSequence(arr) {
    const p = arr.slice()
    const result = [0]
    let i, j, u, v, c
    const len = arr.length
    for (i = 0; i < len; i++) {
      const arrI = arr[i]
      if (arrI !== 0) {
        j = result[result.length - 1]
        if (arr[j] < arrI) {
          p[i] = j
          result.push(i)
          continue
        }
        u = 0
        v = result.length - 1
        while (u < v) {
          c = (u + v) >> 1
          if (arr[result[c]] < arrI) {
            u = c + 1
          } else {
            v = c
          }
        }
        if (arrI < arr[result[u]]) {
          if (u > 0) {
            p[i] = result[u - 1]
          }
          result[u] = i
        }
      }
    }
    u = result.length
    v = result[u - 1]
    while (u-- > 0) {
      result[u] = v
      v = p[v]
    }
    return result
  }
}
