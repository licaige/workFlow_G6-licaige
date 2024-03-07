/**
 * 考察:哈希表
 * @difficulty中等
 * @summary 525. 连续数组
 * 给定一个二进制数组 nums , 找到含有相同数量的 0 和 1 的最长连续子数组，并返回该子数组的长度。
输入: nums = [0,1]
输出: 2
说明: [0, 1] 是具有相同数量 0 和 1 的最长连续子数组
题目理解：
利用前缀和 + 哈希表,保存数字出现的次数
 */

var findMaxLength = function(nums) {
  debugger;
  let maxLength = 0;
  // 利用前缀和 + 哈希表,保存数字出现的次数
  const map = new Map(); 
  let counter = 0;
  map.set(counter, -1);
  const n = nums.length;
  for (let i = 0; i < n; i++) {
      const num = nums[i];
      if (num == 1) {
          counter++;
      } else {
          counter--;
      }
      if (map.has(counter)) {
          const prevIndex = map.get(counter);
          maxLength = Math.max(maxLength, i - prevIndex);
      } else {
          map.set(counter, i);
      }
  }
  return maxLength;
};
const nums = [0, 1]
console.log(findMaxLength(nums)); // 2