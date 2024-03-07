/**
 * 考察: 动态规划
 * @difficulty 中等
 * @summary 416. 分割等和子集
 * 给你一个 只包含正整数 的 非空 数组 nums 。请你判断是否可以将这个数组分割成两个子集，使得两个子集的元素和相等。
 * 示例 1：

输入：nums = [1,5,11,5]
输出：true
解释：数组可以分割成 [1, 5, 5] 和 [11] 。
 */
var canPartition = function(nums) {
  // 这道题可以转化成一个求容量为sum / 2的背包问题，若正好可以填满背包，就返回true
   const sum = nums.reduce((a, b) => a + b)
   const len = nums.length
   if (sum % 2 || len < 2) {
       return false
   }
   const half = sum / 2
   const res = []
   for (let i = 0; i < half + 1; i++) {
     res[i] = nums[0] <= i ? nums[0] : 0
   }
   for (let i = 1; i < len; i++) {
     for (let j = half; j >= nums[i]; j--) {
         // 更新不同物品放入的数字最大和        
         res[j] = Math.max(res[j], nums[i] + res[j - nums[i]])
     }
   }
   // 如果背包正好填满则返回true
   return res[half] === half
 };