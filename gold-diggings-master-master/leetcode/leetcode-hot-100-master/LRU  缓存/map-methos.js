/**
 *
 * 思路：
 * 1、利用 map 能够取出最后的 key 特性
 * 2、map set 自动放到第一个
 * 3、
 */

/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.maxSize = capacity;
  this.map = new Map();
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  const res = this.map.get(key);
  if (res !== 0 && !res) {
    return -1;
  }
  this.put(key, res);
  return res;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  if (this.map.has(key)) {
    this.map.delete(key);
  }
  this.map.set(key, value);
  if (this.map.size > this.maxSize) {
    const key = this.map.keys().next().value;
    this.map.delete(key);
  }
};
