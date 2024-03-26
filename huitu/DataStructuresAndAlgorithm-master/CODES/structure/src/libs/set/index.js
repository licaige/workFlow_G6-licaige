/*
 * @Author: Lee
 * @Date: 2023-06-21 17:07:01
 * @LastEditors: Lee
 * @LastEditTime: 2023-06-25 10:19:25
 * @Description:
 */
export class Set {
  constructor() {
    this.items = {}; // 使用对象存储集合元素
  }

  /**
   * 检查集合中是否包含指定元素
   * @param {*} value
   * @returns
   */
  has(value) {
    return Object.prototype.hasOwnProperty.call(this.items, value);
  }

  /**
   * 向集合中添加一个元素
   * @param {*} value
   */
  add(value) {
    if (!this.has(value)) {
      this.items[value] = value;
      return true; // 添加成功
    }
    return false; // 添加失败（元素已存在）
  }

  /**
   * 从集合中移除一个元素
   * @param {*} element
   * @returns
   */
  delete(element) {
    if (this.has(element)) {
      delete this.items[element];
      return true; // 移除成功
    }
    return false; // 移除失败（元素不存在）
  }
  /**
   * 清空集合中的所有元素
   */
  clear() {
    this.items = {};
  }

  /**
   * 返回集合中的元素个数
   * @returns
   */
  size() {
    return Object.keys(this.items).length;
  }

  /**
   * 返回集合中的所有元素组成的数组
   * @returns
   */
  values() {
    return Object.values(this.items);
  }

  /**
   * 并集
   * @param {*} otherSet
   */
  union(otherSet) {
    // -- this：集合对象A
    // -- otherSet：集合对象B
    // 1. 创建新的集合
    var unionSet = new Set();
    // 2. 将A集合中的所有元素添加到新集合中
    var values = this.values();
    values.forEach((item) => {
      unionSet.add(item);
    });
    // 3. 取出B集合中的元素，判断是否需要加到新集合
    values = otherSet.values();
    values.forEach((item) => {
      unionSet.add(item);
    });
    return unionSet;
  }

  /**
   * 交集
   * @param {*} otherSet
   */
  intersection(otherSet) {
    // -- this：集合对象A
    // -- otherSet：集合对象B
    // 1. 创建新的集合
    var intersectSet = new Set();
    // 2. 从A中取出一个个元素，判断是否同时存在于集合B中，存在则放入新集合中
    var values = this.values();
    values.forEach((item) => {
      if (otherSet.has(item)) {
        intersectSet.add(item);
      }
    });
    return intersectSet;
  }
  /**
   * 差集
   * @param {*} otherSet
   * @returns
   */
  difference(otherSet) {
    // -- this：集合对象A
    // -- otherSet：集合对象B
    // 1. 创建新的集合
    var differenceSet = new Set();
    // 2. 从A中取出一个个元素，判断是否同时存在于集合B中，不存在则放入新集合中
    var values = this.values();
    values.forEach((item) => {
      if (!otherSet.has(item)) {
        differenceSet.add(item);
      }
    });
    return differenceSet;
  }
  /**
   * 子集
   * @param {*} otherSet
   */
  subset(otherSet) {
    // -- this：集合对象A
    // -- otherSet：集合对象B
    // 遍历集合A中所有的元素，如果发现，集合A中的元素，在集合B中不存在，那么返回false
    // 如果遍历完了整个集合，依然发现没有返回false，那么返回true即可
    var values = this.values();
    for (var i = 0; i < values.length; i++) {
      var item = values[i];
      if (!otherSet.has(item)) {
        return false;
      }
    }
    return true;
  }
}
