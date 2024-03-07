/**
 * 我们使用nums来存储当前数组，并用original 来存储数组的初始状态。在需要重设数组到它的初始状态时，只需要
将original 复制到nums并返回即可。
 * @param {*} nums 
 */
var Solution = function(nums) {
  this.nums = nums;
  this.original = nums.slice();

};

Solution.prototype.reset = function() {
  this.nums = this.original.slice();
  return this.nums;
};

Solution.prototype.shuffle = function() {
  const shuffled = new Array(this.nums.length).fill(0);
  const list = [];
  this.nums.forEach((num) => list.push(num));
  for (let i = 0; i < this.nums.length; ++i) {
      const j = Math.random() * list.length;
      shuffled[i] = list.splice(j, 1);
  }
  this.nums = shuffled.slice();
  return this.nums;
};
