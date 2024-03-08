/**
 * 最接近的三数之和
 * https://leetcode-cn.com/problems/3sum-closest/
 * @param {*} nums 
 * @param {*} target 
 * @returns 
 */
// 排序+双指针。同上一题的思路，区别在于每次判断三数的和是否比上次更接近目标值，是的话，进行记录
// 不是的话根据和与目标值的大小比较来继续移动指针
var threeSumClosest = function(nums, target) {
  let ans = nums[0] + nums[1] + nums[2];
  const len = nums.length;
  // 先进行排序
  nums.sort((a, b) => a - b);
  for (let i = 0; i < len-2; i++) {
      let l = i + 1,r = len - 1;
      while (l < r) {
          const sum = nums[i] + nums[l] + nums[r];
          if (Math.abs(ans - target) > Math.abs(sum - target)) {
              ans = sum;
          } 
          if (sum === target) {
              return sum;
          } else if (sum > target) {
              r--;
          } else {
              l++;
          }
      }
  }
  return ans;
};

console.log(threeSumClosest([-1,2,1,1,-4], 1));
