/**
 * 最长递增子序列
 * https://leetcode-cn.com/problems/longest-increasing-subsequence/
 * @param {*} nums
 */
var lengthOfLIS = function(nums) {
  // 动态规划
  // dp[i] 表示以第i个元素结尾的最长递增子序列，第i个元素需要在子序列中
  // 状态转移方程 假设存在j，0 < j < i，并且nums[j] < nums[i]， 这样每个以j结尾的最长递增子序列为dp[j]，那么dp[i] = Math.max(dp[j]) + 1
  // 这样就得到了以第i个元素结尾的任意长度的最长递增子序列，找到其中长度最大的即最终答案
  const n = nums.length;
  // 所有的以第i个元素结尾的最长递增子序列长度最少都是1，所以初始化为1
  const dp = new Array(n).fill(1);
  let ans = 1;
  for (let i = 1; i < n; i++) {
      for (let j = 0; j < i; j++) {
          if (nums[j] < nums[i]) {
              dp[i] = Math.max(dp[i], dp[j] + 1);
          }
      }
      ans = Math.max(ans, dp[i]);
  }
  return ans;
};

var lengthOfLIS = function(nums) {
  /**
   * 贪心、二分查找
   */
  const n = nums.length;
  const ans = [];
  const bSearch = (arr, target) => {
    const len = arr.length;
    if (len === 1) return 0;
    let l = 0, r = len - 1;
    while (l <= r) {
      const mid = l + ((r - l) >> 1);
      if (arr[mid] > target) {
        r = mid - 1;
      } else if (arr[mid] < target) {
        l = mid + 1;
      } else {
        return mid;
      }
    }
    return l;
  };
  for (let i = 0; i < n; i++) {
    if (!ans.length || ans[ans.length - 1] < nums[i]) {
      ans.push(nums[i]);
    }
    // 这里二分搜索nums[i]的位置，如果不存在的话，返回nums[i]的在ans中的递增位置
    // 这样维持结果数组的单调性，并且保证递增是最小间隔递增的
    const index = bSearch(ans, nums[i]);
    ans[index] = nums[i];
  }
  return ans.length;
}

var nums = [10,9,2,5,3,7,101,18];
console.log(lengthOfLIS(nums));
