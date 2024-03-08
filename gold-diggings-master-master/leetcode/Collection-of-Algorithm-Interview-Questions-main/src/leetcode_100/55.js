/**
 * 跳跃游戏
 * https://leetcode-cn.com/problems/jump-game/
 * @param {*} nums 
 * @returns 
 */
var canJump = function (nums) {
  /**
      贪心思想，每次能够跳跃的最大索引
   */
  const n = nums.length;
  let maxDis = 0;
  for (let i = 0; i < n; i++) {
    // 当前位置的索引要在最大跳跃的范围内的时候，才能更新最大距离
    if (i <= maxDis) {
      // 更新当前位置能够到达的最远距离
      maxDis = Math.max(i + nums[i], maxDis);
      if (maxDis >= n - 1) return true;
    }
  }
  return false;
};

var nums = [0, 2, 3];
console.log(canJump(nums));
