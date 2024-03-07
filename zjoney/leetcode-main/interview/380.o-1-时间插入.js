/**
 * 哈希 + 数组
 */
var RandomizedSet = function() {
  this.nums = [];
  this.indices = new Map();
};

RandomizedSet.prototype.insert = function(val) {
  if (this.indices.has(val)) {
      return false;
  }
  let index = this.nums.length;
  this.nums.push(val);
  this.indices.set(val, index);
  return true;
};

RandomizedSet.prototype.remove = function(val) {
  if (!this.indices.has(val)) {
      return false;
  }
  let id = this.indices.get(val);
  this.nums[id] = this.nums[this.nums.length - 1];
  this.indices.set(this.nums[id], id);
  this.nums.pop();
  this.indices.delete(val);
  return true;
};

RandomizedSet.prototype.getRandom = function() {
  const randomIndex = Math.floor(Math.random() * this.nums.length);
  return this.nums[randomIndex];
};
