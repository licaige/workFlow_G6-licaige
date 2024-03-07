/**
 * 考察:动态规划、dfs 深度遍历
 * @difficulty 中等
 * @summary 494. 目标和
 * 给你一个整数数组 nums 和一个整数 target 。向数组中的每个整数前添加 '+' 或 '-' ，然后串联起所有整数，
 * 可以构造一个 表达式 ：例如，nums = [2, 1] ，可以在 2 之前添加 '+' ，
 * 在 1 之前添加 '-' ，然后串联起来得到表达式 "+2-1" 。
 * 返回可以通过上述方法构造的、运算结果等于 target 的不同 表达式 的数目。
 * 
 * 示例一
 * 输入：nums = [1,1,1,1,1], target = 3
 * 输出：5
 * 解释：一共有 5 种方法让最终目标和为 3 。
 * -1 + 1 + 1 + 1 + 1 = 3
 * +1 - 1 + 1 + 1 + 1 = 3
 * +1 + 1 - 1 + 1 + 1 = 3
 * +1 + 1 + 1 - 1 + 1 = 3
 * +1 + 1 + 1 + 1 - 1 = 3
 */

/**
 * 方法1： dfs 深度遍历
 */
 var findTargetSumWays = function(nums, S) {
  // 方法1：深度遍历
  let count = 0;
  function dfs(i, res) {
      if(i === nums.length) {
          if(res === S) {
              count++;
          }
          return;
      };
      dfs(i+1, res+nums[i]);
      dfs(i+1, res-nums[i]);
  }
  dfs(1, nums[0]);
  dfs(1, -nums[0]);
  return count;
};
