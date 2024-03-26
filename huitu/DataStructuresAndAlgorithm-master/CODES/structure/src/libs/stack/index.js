/*
 * @Author: Lee
 * @Date: 2021-07-30 16:45:30
 * @LastEditors: Lee
 * @LastEditTime: 2023-07-06 11:31:46
 */

export class Stack {
  constructor() {
    this.items = [];
  }
  /**
   * 入栈
   * @param {*} value
   */
  push(value) {
    this.items.push(value);
  }

  /**
   * 出栈
   * @returns 返回出栈元素
   */
  pop() {
    return this.items.pop();
  }

  /**
   * 返回栈顶元素
   * @returns
   */
  peek() {
    if (this.isEmpty()) return null;
    return this.items[this.items.length - 1];
  }

  /**
   * 返回栈的大小
   * @returns
   */
  size() {
    return this.items.length;
  }

  /**
   * 判断栈行结构是否为空
   * @returns
   */
  isEmpty() {
    return this.items.length === 0;
  }

  /**
   * 清空栈
   */
  clear() {
    this.items = [];
  }
}

/**
 * 2. 链表实现
 */
// import { DoubleLinkedList } from '../linked_list/index.js';
// export class Stack {
//   constructor() {
//     // 创建链表
//     this.items = new DoubleLinkedList();
//   }
//   push(data) {
//     this.items.append(data);
//   }
//   pop() {
//     return this.items.removeAt(this.items.size() - 1);
//   }
//   peek() {
//     return this.items.get(this.items.size() - 1);
//   }
//   isEmpty() {
//     return this.items.size() === 0;
//   }
//   size() {
//     return this.items.size();
//   }
// }
