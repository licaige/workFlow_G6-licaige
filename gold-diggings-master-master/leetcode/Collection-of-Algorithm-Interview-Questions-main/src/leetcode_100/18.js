/**
 * 四数之和
 * https://leetcode-cn.com/problems/4sum/
 * @param {*} nums 
 * @param {*} target 
 */
var fourSum = function(nums, target) {
  // 思路就是先排序，排完序以后固定2个数，剩下两个数则根据和与目标值的关系来调整
  const n = nums.length;
  if (n < 4) return [];
  const ans = [];
  nums.sort((a, b) => a - b);
  for (let i = 0; i < n; i++) {
    // 去重
    if (i > 0 && nums[i] === nums[i-1]) continue;
    for (let j = i + 1; j < n; j++) {
      // 去重
      if (j > i+1 && nums[j] === nums[j-1]) continue;
      let start = j + 1, end = n - 1;
      while (start < end) {
        const sum = nums[i] + nums[j] + nums[start] + nums[end];
        if (sum === target) {
          ans.push([nums[i], nums[j], nums[start], nums[end]]);
          // 这里同样也需要去重
          while (start < n && nums[start] === nums[start+1]) start++;
          while (end >= 0 && nums[end] === nums[end-1]) end--;
          start++;
          end--;
        } else if (sum > target) {
          // 和大于目标值，需要减少最后一个值的大小
          end--;
        } else {
          start++;
        }
      }
    }
  }
  return ans;
};

module.exports = fourSum;
