/**
 *
 * 思路：
 */

class Element {
  constructer(value) {
    this.value = value;
    this.next = null;
    this.pre = null;
  }
}

class DoubleLink {
  constructer() {
    this.length = 0;
    this.head = null;
    this.tail = null;
  }

  add(value) {
    const element = new Element(value);
    if (this.length === 0) {
      this.head = element;
      this.tail = element;
    } else {
      let temp = this.head;
      while (temp.next) {
        temp = temp.next;
      }
      temp.next = element;
      element.pre = temp;
      this.tail = temp;
    }
    this.length += 1;
  }

  delete() {
    // todo
  }

  getHead() {
    return this.head;
  }

  getTail() {
    return this.tail;
  }
}

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
