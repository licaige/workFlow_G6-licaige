const DEFAULT_SIZE = 32;

function HashTable (capacity = DEFAULT_SIZE) {
  // TODO:存放hash表采用数组实现，实际使用链表更节省空间
  this.buckets = Array(capacity).fill(null).map(() => []);
  this.keys = {};
}

HashTable.prototype.hash = function (key) {
  const hash = Array.from(key).reduce((acc, cur) => acc + cur.charCodeAt(0), 0);
  return hash % this.buckets.length;
}

HashTable.prototype.set = function (key, value) {
  const keyHash = this.hash(key);
  this.keys[key] = keyHash;
  const bucketsList = this.buckets[keyHash];
  const node = bucketsList.find(item => item.key === key);
  if (!node) {
    bucketsList.push({ key, value });
  } else {
    node.value = value;
  }
}

HashTable.prototype.delete = function (key) {
  const keyHash = this.hash(key);
  delete this.keys[keyHash];
  const bucketsList = this.buckets[keyHash];
  const index = bucketsList.findIndex(item => item.key === key);
  if (index !== -1) {
    return bucketsList.splice(index, 1);
  }
  return null;
}

HashTable.prototype.get = function (key) {
  const bucketsList = this.buckets[this.hash(key)];
  const node = bucketsList.find(item => item.key === key);
  return node ? node.value : undefined;
}

HashTable.prototype.has = function (key) {
  return Object.hasOwnProperty.call(this.keys, key);
}

HashTable.prototype.getKeys = function () {
  return Object.keys(this.keys);
}

HashTable.prototype.getValues = function () {
  return this.buckets.reduce((acc, cur) => {
    const bucketsValue = cur.map(item => item.value);
    return acc.concat(bucketsValue);
  }, []);
}
