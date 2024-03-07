
/**
 * 向最小的堆添加元素
 * @param {*} heap 
 * @param {*} node 
 */
function push(heap, node) {
  const index = heap.length;
  heap.push(node);
  siftUp(heap, node, index)
}
function pop(heap) {
  const first = heap[0]
  if (first !== undefined) {
    const last = heap.pop()
    if (first !== last) {
      heap[0] = last;
      siftDown(heap, last, 0)
    }
  }
  return null;
}
function siftDown(heap, node, i) {
  let index = i;
  const length = heap.length;
  while (index < length) {
    const leftIndex = (index + 1) * 2 - 1;
    const left = heap[leftIndex];
    const rightIndex = leftIndex + 1;
    const right = heap[rightIndex];
    // 如果左子节点 小于父节点
    if (left !== undefined && compare(left, node) < 0) {
      // 比较左子节点 和右子节点
      if (right !== undefined && compare(right, left) < 0) {
        // 让父节点和右子节点交换
        heap[index] = right;
        heap[rightIndex] = node;
        index = rightIndex;
      } else {
        heap[index] = left;
        heap[leftIndex] = node;
        index = leftIndex;
      }
    } else if (right !== undefined && compare(right, node) < 0) {
      heap[index] = right;
      heap[rightIndex] = node;
      index = rightIndex;
    } else {
      return;
    }
  }
}
/**
 * 
 * @param {*} heap 
 */
function peek(heap) {
  const first = heap[0]
  return first;
}
/**
 * 向上调整
 * @param {*} heap 最小堆
 * @param {*} node 需要调整的节点
 * @param {*} index 当前节点索引
 */
function siftUp(heap, node, i) {
  let index = i;
  while (true) {
    // Math.floor(index-1)/2
    const parentIndex = index - 1 >>> 1;
    const parent = heap[parentIndex];
    //  大于 需要交换位置，向上调整
    if (parent !== undefined && compare(parent, node) > 0) {
      heap[parentIndex] = node;
      heap[index] = parent;
      index = parentIndex;
    } else {
      return;
    }
  }
}

function compare(a, b) {
  const diff = a.sortIndex - b.sortIndex
  return diff;
}

module.exports = {
  push,
  pop,
  peek
}