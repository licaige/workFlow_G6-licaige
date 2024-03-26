/*
 * @Author: Lee
 * @Date: 2021-08-04 10:48:15
 * @LastEditors: Lee
 * @LastEditTime: 2023-06-21 16:35:03
 */

// 1. 单向链表
class LinkedListNode {
  constructor(data) {
    this.data = data; // 节点的值
    this.next = null; // 指向下一个节点的指针
  }
}

export class LinkedList {
  constructor() {
    this.head = null; // 链表的头节点
    this.tail = null; // 链表的尾节点
    this.length = 0; // 链表的长度
  }

  /**
   * 添加元素到链表末尾
   * @param {*} data
   */
  append(data) {
    const newNode = new LinkedListNode(data); // 创建新的节点

    if (!this.head) {
      // 如果链表为空，新节点即为头节点也是尾节点
      this.head = newNode;
      this.tail = newNode;
    } else {
      // 如果链表不为空，将新节点追加到尾节点后面，并更新尾节点的指针
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++; // 链表长度加一
  }

  /**
   * 在指定位置插入元素
   * @param {*} data
   * @param {*} index
   * @returns
   */
  insertAt(data, index) {
    if (index < 0 || index > this.length) {
      // 检查索引是否越界
      throw new Error('Index out of range');
    }

    const newNode = new LinkedListNode(data); // 创建新的节点

    if (index === 0) {
      // 如果索引为0，插入新节点作为头节点，并更新头节点的指针
      newNode.next = this.head;
      this.head = newNode;
      if (!this.tail) {
        // 如果链表为空，新节点也是尾节点
        this.tail = newNode;
      }
    } else if (index === this.length) {
      // 如果索引为链表长度，插入新节点作为尾节点，并更新尾节点的指针
      this.tail.next = newNode;
      this.tail = newNode;
    } else {
      // 如果索引在头节点和尾节点之间，寻找正确的位置插入新节点，并更新前一个节点和后一个节点的指针
      let current = this.head;
      let prev = null;
      let i = 0;
      while (i++ < index) {
        prev = current;
        current = current.next;
      }
      newNode.next = current;
      prev.next = newNode;
    }

    this.length++; // 链表长度加一
  }
  /**
   * 获取指定位置的元素值
   * @param {*} index
   * @returns
   */
  getAt(index) {
    if (index < 0 || index >= this.length) {
      // 检查索引是否越界
      throw new Error('Index out of range');
    }
    let current = this.head;
    let i = 0;
    while (i++ < index) {
      current = current.next;
    }
    return current.data; // 返回指定位置节点的值
  }

  /**
   * 查看元素的下标位置
   * @param {*} data
   * @returns
   */
  indexOf(data) {
    // 1. 获取第一个元素
    let current = this.head;
    // 2. 开始查找
    let i = 0;
    while (current) {
      if (current.data === data) {
        return i;
      }
      current = current.next;
      i++;
    }
    return -1;
  }

  /**
   * 删除指定位置的元素
   * @param {*} index
   * @returns
   */
  removeAt(index) {
    if (index < 0 || index >= this.length) {
      // 检查索引是否越界
      throw new Error('Index out of range');
    }

    let removedNode;

    if (index === 0) {
      // 如果索引为0，移除头节点，并更新头节点的指针
      removedNode = this.head;
      this.head = this.head.next;
      if (this.length === 1) {
        // 如果链表只有一个节点，移除后链表为空，更新尾节点为null
        this.tail = null;
      }
    } else {
      // 如果索引不为0，寻找正确的位置移除节点，并更新前一个节点和后一个节点的指针
      let current = this.head;
      let prev = null;
      let i = 0;
      while (i++ < index) {
        prev = current;
        current = current.next;
      }

      removedNode = current;
      prev.next = current.next;

      if (index === this.length - 1) {
        this.tail = prev;
      }
    }

    this.length--;
    return removedNode.data; // 返回被移除的节点的值
  }

  /**
   * 删除指定元素
   * @param {*} data
   */
  remove(data) {
    // 1. 获取元素位置
    const index = this.indexOf(data);
    // 2. 删除该位置的元素
    if (index !== -1) {
      this.removeAt(index);
    }
  }

  /**
   * 更新指定下标位置的元素
   * @param {*} data
   * @param {*} index
   * @returns
   */
  update(data, index) {
    if (index < 0 || index >= this.length) {
      // 检查索引是否越界
      throw new Error('Index out of range');
    }
    const result = this.removeAt(index); // 删除指定位置的元素
    this.insertAt(data, index); // 插入指定位置data元素
    return result; // 返回删除的元素
  }
  /**
   * 判断链表是否为空
   * @returns
   */
  isEmpty() {
    return this.length === 0;
  }

  /**
   * 返回链表的长度
   * @returns
   */
  size() {
    return this.length;
  }

  /**
   * 清空链表
   */
  clear() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
}

// 2. 双向链表
class DoubleLinkedListNode {
  constructor(data) {
    this.data = data; // 节点的值
    this.prev = null; // 指向前一个节点的指针
    this.next = null; // 指向后一个节点的指针
  }
}

export class DoubleLinkedList {
  constructor() {
    this.head = null; // 链表的头节点
    this.tail = null; // 链表的尾节点
    this.length = 0; // 链表的长度
  }

  /**
   * 判断链表是否为空
   * @returns
   */
  isEmpty() {
    return this.length === 0;
  }
  /**
   * 添加元素到链表末尾
   * @param {*} data
   */
  append(data) {
    const newNode = new DoubleLinkedListNode(data); // 创建新的节点

    if (this.isEmpty()) {
      // 如果链表为空，新节点即为头节点也是尾节点
      this.head = newNode;
      this.tail = newNode;
    } else {
      // 如果链表不为空，将新节点追加到尾节点后面，并更新节点的指针
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.length++; // 链表长度加一
  }

  /**
   * 在指定位置插入元素
   * @param {*} data
   * @param {*} index
   * @returns
   */
  insertAt(data, index) {
    if (index < 0 || index > this.length) {
      // 检查索引是否越界
      throw new Error('Index out of range');
    }

    const newNode = new DoubleLinkedListNode(data); // 创建新的节点

    if (index === 0) {
      // 如果索引为0，插入新节点作为头节点，并更新节点的指针
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
      if (!this.tail) {
        // 如果链表为空，新节点也是尾节点
        this.tail = newNode;
      }
    } else if (index === this.length) {
      // 如果索引为链表长度，插入新节点作为尾节点，并更新节点的指针
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    } else {
      // 如果索引在头节点和尾节点之间，寻找正确的位置插入新节点，并更新前一个节点和后一个节点的指针
      let current = this.head;
      let i = 0;
      while (i++ < index) {
        current = current.next;
      }

      newNode.prev = current.prev;
      newNode.next = current;
      current.prev.next = newNode;
      current.prev = newNode;
    }

    this.length++; // 链表长度加一
  }

  /**
   * 获取指定位置的元素值
   * @param {*} index
   * @returns
   */
  getAt(index) {
    if (index < 0 || index >= this.length) {
      // 检查索引是否越界
      throw new Error('Index out of range');
    }
    let current = this.head;
    let i = 0;
    while (i++ < index) {
      current = current.next;
    }
    return current.data; // 返回指定位置节点的值
  }
  /**
   * 查看元素的下标位置
   * @param {*} data
   * @returns
   */
  indexOf(data) {
    // 1. 获取第一个元素
    let current = this.head;
    // 2. 开始查找
    let i = 0;
    while (current) {
      if (current.data === data) {
        return i;
      }
      current = current.next;
      i++;
    }
    return -1;
  }

  /**
   * 删除指定位置的元素
   * @param {*} index
   * @returns
   */
  removeAt(index) {
    if (index < 0 || index >= this.length) {
      // 检查索引是否越界
      throw new Error('Index out of range');
    }

    let removedNode;

    if (index === 0) {
      // 如果索引为0，移除头节点，并更新节点的指针
      removedNode = this.head;
      this.head = this.head.next;
      this.head.prev = null;
      if (this.length === 1) {
        // 如果链表只有一个节点，移除后链表为空，更新尾节点为null
        this.tail = null;
      }
    } else if (index === this.length - 1) {
      // 如果索引为链表长度减一，移除尾节点，并更新节点的指针
      removedNode = this.tail;
      this.tail = this.tail.prev;
      this.tail.next = null;
    } else {
      // 如果索引在头节点和尾节点之间，寻找正确的位置移除节点，并更新前一个节点和后一个节点的指针
      let current = this.head;
      let i = 0;

      while (i++ < index) {
        current = current.next;
      }
      removedNode = current;
      current.prev.next = current.next;
      current.next.prev = current.prev;
    }

    this.length--; // 链表长度减一
    return removedNode.data; // 返回被移除的节点的值
  }

  /**
   * 删除指定元素
   * @param {*} data
   */
  remove(data) {
    // 1. 获取元素位置
    const index = this.indexOf(data);
    // 2. 删除该位置的元素
    if (index !== -1) {
      this.removeAt(index);
    }
  }

  /**
   * 更新指定下标位置的元素
   * @param {*} data
   * @param {*} index
   * @returns
   */
  update(data, index) {
    if (index < 0 || index >= this.length) {
      // 检查索引是否越界
      throw new Error('Index out of range');
    }

    const result = this.removeAt(index); // 删除指定位置的元素
    this.insertAt(data, index); // 插入指定位置data元素

    return result; // 返回删除的元素
  }

  /**
   * 返回链表的长度
   * @returns
   */
  size() {
    return this.length;
  }

  /**
   * 清空链表
   */
  clear() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
}
