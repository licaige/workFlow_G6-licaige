/**
 * 分割等和子集
 * https://leetcode-cn.com/problems/partition-equal-subset-sum/
 * @param {*} nums 
 */
var canPartition = function(nums) {
  const n = nums.length;
  if (n < 2) return false;
  let sum = 0, maxNum = 0;
  for (let i = 0; i < n; i++) {
    sum += nums[i];
    maxNum = Math.max(maxNum, nums[i]);
  }
  const target = Math.floor(sum / 2);
  if (target & 1) return false;
  // 如果数组中最大的值都大于目标值，那么剩余元素的和肯定小于目标值，也就不存在这样的子集
  if (maxNum > target) return false;
  const dp = new Array(n).fill(0).map(() => new Array(target + 1, false));
  dp[0][nums[0]] = true;
  for (let i = 0; i < n; i++) {
    dp[i][0] = true;
  }
  for (let i = 1; i < n; i++) {
    for (let j = 0; j <= target; j++) {
      dp[i][j] = dp[i-1][j];
      if (j === nums[i]) {
        dp[i][j] = true;
      }
      if (j > nums[i]) {
        dp[i][j] = dp[i-1][j] | dp[i][j-nums[i]];
      }
    }
  }
  return dp[n-1][target];
};

const data = [1,2,2,1];
console.log(canPartition(data));
