let arr = [
  {id: 1},
  {id: 2},
  {id: 3},
  {id: 4},
  {id: 5},
  {id: 6},
  {id: 7},
  {id: 8},
  {id: 9},
]
/**
 * 将数组转为链表
 * @param {array} arr 数组
 * @param {boolean} [isCircle=false] 是否生成环链，默认不是环链
 * @return {array} 返回生成的链表
 */
function initList(arr, isCircle = false) {
  return arr.map((item, index) => ({...item, next: (index + 1 == arr.length && isCircle) ? 0 : index + 1}))
}
let list = initList(arr)

/**
 * 更改链表指向
 * @param {array} list 链表
 * @param {number} index1 被修改的下标
 * @param {number} index2 指向的下标
 * @return {array} 返回更改后的链表
 */
function changeNext(list, index1, index2) {
  if (
    list.find(item => !('next' in item)) ||
    index1 == undefined ||
    index2 == undefined ||
    index1 == index2
  ) return void 0;
  list[index1].next = index2
  return list
}

/**
 * 获取下一个节点 node
 * @param {array} list
 * @param {number} next 下一个的下标
 * @return {obj} 返回下一个节点对象
 */
function getNext(list, next) {
  return list[next]
}

/**
 * 获取上个节点 [node, node……]
 * @param {array} list
 * @param {number} previous 上一个的下标
 * @return {array} 返回上一个节点对象数组
 */
function getPrevious(list, previous) {
  return list.filter(item => item.next == previous)
}

/**
 * 判断环链
 * @param {array} list 链表
 * @param {*} [map=new Map()] 不用传
 * @return {boolean} 判断结果
 */
function isCircle(list, map = new Map()) {
  function testNext(next) {
    if (map.has(next)) {
      if (map.size == list.length && next == list[0]) {
        return true
      } else {
        return false
      }
    } else {
      map.set(next)
      return list[next.next] ? testNext(list[next.next]) : false
    }
  }
  return testNext(list[0])
}

/**
 * 判断包含环链，可以存在断链、多链的情况
 * @param {array} list 链表
 * @return {boolean} 判断结果
 */
function hasCircle(list) {
  for(let i = 0; i < list.length; i++) {
    if (list.find((item, index) => index <= i && item == getNext(list, list[i].next))) {
      return true
    }
  }
  return false
}