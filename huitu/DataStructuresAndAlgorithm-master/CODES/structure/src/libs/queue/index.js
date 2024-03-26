/*
 * @Author: Lee
 * @Date: 2021-08-03 11:25:47
 * @LastEditors: Lee
 * @LastEditTime: 2023-07-06 11:31:05
 */

export class Queue {
  constructor() {
    this.items = [];
  }

  /**
   * 入队
   * @param {*} value
   */
  enqueue(value) {
    this.items.push(value);
  }

  /**
   * 出队
   * @returns 返回出队的元素
   */
  dequeue() {
    return this.items.shift();
  }

  /**
   * 判断队列是否为空
   * @returns
   */
  isEmpty() {
    return this.items.length === 0;
  }

  /**
   * 返回队头元素
   * @returns
   */
  front() {
    if (this.isEmpty()) return null;
    return this.items[0];
  }

  /**
   * 清空队列
   */
  clear() {
    this.items = [];
  }

  /**
   * 返回队列的大小
   * @returns
   */
  size() {
    return this.items.length;
  }
}

export class PriorityQueue extends Queue {
  /**
   * 重写入队方法
   * @param {*} value 元素
   * @param {*} priority 优先级
   */
  enqueue(value, priority) {
    // 1. 创建入队元素
    const element = { value, priority };
    // 2. 根据优先级插入到合适的位置
    let inserted = false;
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      if (priority > item.priority) {
        this.items.splice(i, 0, element);
        inserted = true;
        break;
      }
    }
    // 3. 如果优先级最低，则插入到队尾
    if (!inserted) {
      this.items.push(element);
    }
  }
}
