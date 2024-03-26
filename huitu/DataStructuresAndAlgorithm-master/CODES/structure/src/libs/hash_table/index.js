/*
 * @Author: Lee
 * @Date: 2021-10-26 16:43:12
 * @LastEditors: Lee
 * @LastEditTime: 2023-06-25 23:41:09
 */

// -- 装填因子
const MAX_LOAD_FACTOR = 0.75;
const MIN_LOAD_FACTOR = 0.25;

export class HashTable {
  constructor() {
    this.storage = []; // 作为数组，存放元素
    this.count = 0; // 用于记录HashTable存放的数量
    this.limit = 7; // 表示数组当前的总长度
  }
  /**
   * 哈希函数
   * 1. 将字符串转换成比较大的数字：hashCode
   * 2. 将数字大的hashCode压缩到数组范围（大小）之内
   * @param {*} str 字符串
   * @param {*} size 数组大小
   * @returns 下标
   */
  hashFunc(str, size) {
    // 1. 定义hashCode
    let hashCode = 0;
    // 2. 霍纳算法：计算hashCode的值
    for (let i = 0; i < str.length; i++) {
      hashCode = 37 * hashCode + str.charCodeAt(i);
    }
    // 3. 取余操作压缩到数组的（大小）范围内
    const index = hashCode % size;
    return index;
  }
  /**
   * 质数判断
   * @param {*} n
   * @returns
   */
  isPrime(n) {
    // 如果输入值小于等于1，则不是质数；
    if (n <= 1) {
      return false;
    }
    // 如果输入值等于2，则是质数；
    if (n === 2) {
      return true;
    }

    // 如果输入值是偶数，则不是质数
    if (n % 2 === 0) {
      return false;
    }

    // 对于奇数，只需要遍历到其平方根即可，因为一个数的因子不可能大于其平方根
    const sqrt = Math.sqrt(n);
    for (let i = 3; i <= sqrt; i += 2) {
      // 判断是否能整除，如果能整除则不是质数
      if (n % i === 0) {
        return false;
      }
    }
    // 如果遍历结束都没有找到能整除的数
    return true;
  }
  /**
   * 获取质数
   * @param {*} n
   * @returns
   */
  getPrime(n) {
    while (!this.isPrime(n)) {
      // 14 → 17
      // 34 → 37
      n++;
    }
    return n;
  }
  /**
   * 哈希表扩容/降容
   * @param {*} newLimit
   */
  resize(newLimit) {
    // 1. 保存旧的数组内容
    const oldStorage = this.storage;
    // 2. 重置属性
    this.storage = [];
    this.count = 0;
    this.limit = newLimit;
    // 3. 遍历oldStorage中所有的bucket
    oldStorage.forEach((bucket) => {
      // 3.1. 判断bucket是否存在
      if (!bucket) {
        return;
      }
      // 3.2. 重新插入
      for (let i = 0; i < bucket.length; i++) {
        const [k, v] = bucket[i];
        this.put(k, v);
      }
    });
  }
  /**
   * 插入/修改元素：HashMap -> { key, value }
   * @param {*} key
   * @param {*} value
   */
  put(key, value) {
    // 1. 根据key获取对应的index
    const index = this.hashFunc(key, this.limit);
    // 2. 根据index获取对应的bucket
    let bucket = this.storage[index];
    // 3. 判断bucket是否存在，如果不存在则创建bucket（为了低耦合，这里直接用数组）
    if (!bucket) {
      bucket = [];
      this.storage[index] = bucket;
    }
    // 4. 判断是否是修改数据
    for (let i = 0; i < bucket.length; i++) {
      const [k] = bucket[i];
      // 修改
      if (k === key) {
        bucket[i][1] = value;
        return;
      }
    }
    // 5. 进行添加操作
    bucket.push([key, value]);
    this.count++;
    // 6. 判断是否需要进行扩容操作
    if (this.count > this.limit * MAX_LOAD_FACTOR) {
      const newSize = this.limit * 2;
      const newPrime = this.getPrime(newSize);
      this.resize(newPrime);
    }
  }
  /**
   * 获取元素
   * @param {*} key
   */
  get(key) {
    // 1. 根据key获取index
    const index = this.hashFunc(key, this.limit);
    // 2. 根据index获取bucket
    const bucket = this.storage[index];
    // 3. 判断bucket是否存在
    if (!bucket) {
      return null;
    }
    // 4. 有bucket，那么就进行线性查找
    for (let i = 0; i < bucket.length; i++) {
      const [k, v] = bucket[i];
      if (k === key) {
        return v;
      }
    }
    // 5. 依然没找到，那么返回null
    return null;
  }
  /**
   * 删除元素
   * @param {*}} key
   */
  remove(key) {
    // 1. 根据key获取index
    const index = this.hashFunc(key, this.limit);
    // 2. 根据index获取bucket
    const bucket = this.storage[index];
    // 3. 判断bucket是否存在
    if (!bucket) {
      return null;
    }
    // 4. 线性查找，删除元素并将其返回
    for (let i = 0; i < bucket.length; i++) {
      const [k, v] = bucket[i];
      if (k === key) {
        bucket.splice(i, 1);
        this.count--;
        // 缩小容量
        if (this.limit > 7 && this.count < this.limit * MIN_LOAD_FACTOR) {
          const newSize = Math.floor(this.limit / 2);
          const newPrime = this.getPrime(newSize);
          this.resize(newPrime);
        }
        return v;
      }
    }
    // 5. 依然没找到，那么返回null
    return null;
  }
  /**
   * 是否为空
   * @returns
   */
  isEmpty() {
    return this.count === 0;
  }
  /**
   * 长度
   * @returns
   */
  size() {
    return this.count;
  }
}
