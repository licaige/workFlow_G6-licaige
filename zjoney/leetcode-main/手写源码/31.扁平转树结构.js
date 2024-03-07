/**
 * 扁平数结构转树状结构，数据转成Map，对象引用写法
 * @param {*} data 
 * @returns 
 */
const listToTree = (data) => {
  const itemMap = {}, result = [];
  for (const item of data) {
    const id = item.id, pid = item.pid;
    if (!itemMap[id]) {
      itemMap[id] = {
        children: []
      }
    }
    itemMap[id] = {
      ...item, children: itemMap[id]['children']
    }
    const treeItem = itemMap[id]
    if (pid === 0) {
      result.push(treeItem)
    } else {
      if (!itemMap[pid]) {
        itemMap[id] = {
          children: []
        }
      }
      itemMap[pid].children.push(treeItem)
    }
  }
  console.log('arrayToTree1', result)
  return result;
}