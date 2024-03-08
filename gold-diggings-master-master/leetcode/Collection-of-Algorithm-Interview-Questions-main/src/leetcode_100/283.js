/**
 * 移动零HOT
 * https://leetcode.cn/problems/move-zeroes/description
 * @param {*} nums
 */
var moveZeroes = function(nums) {
  // 指针，用来记录非零数字的位置，剩余位置最后补零
  const n = nums.length;
  let index = 0;
  for (let i = 0; i < n; i++) {
      if (nums[i] !== 0) {
          nums[index++] = nums[i];
      }
  }
  for (let i = index; i < n; i++) {
      nums[i] = 0;
  }
};

var moveZeroes = function(nums) {
  // 双指针，一个指针记录0的位置，另外一个指针记录非0的位置
  const n = nums.length;
  // 指针j记录0的位置
  let j = 0;
  // 指针i记录非0的位置
  for (let i = 0; i < n; i++) {
      /**
          4,0,1,0,3,12 j=1,i=1
          4,0,1,0,3,12 j=1,i=2
          4,1,0,0,3,12 j=2,i=3
          4,1,0,0,3,12 j=2,i=4
          4,1,2,0,0,12 j=3,i=5
          4,1,2,12,0,0 j=4,i=6 结束遍历
       */
      // 指针i为非0值时，与指针j所指的位置进行交换，并且指针j往前一步
      if (nums[i]) {
          const temp = nums[i];
          nums[i] = nums[j];
          nums[j++] = temp;
      }
  }
}
