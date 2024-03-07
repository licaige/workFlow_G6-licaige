/**
 * 考察：动态规划
 * @difficulty 中等
 * @summary 198. 打家劫舍
 * 你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，
 * 影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，
 * 如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。
 * 给定一个代表每个房屋存放金额的非负整数数组，计算你 不触动警报装置的情况下 ，一夜之内能够偷窃到的最高金额。
 * 
 * 示例 1：
输入：[1,2,3,1]
输出：4
解释：偷窃 1 号房屋 (金额 = 1) ，然后偷窃 3 号房屋 (金额 = 3)。
     偷窃到的最高金额 = 1 + 3 = 4 。

分析状态转移方程： 
1.由于两间相邻的房屋是不可以接连闯入的 那么对于dp[i] = Math.max(nums[i] + dp[i - 2], dp[i - 1]) 
2.先处理基本情况 dp[0] dp[1]

 */
var rob = function (nums) {
    if (nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];

    let dp = [],
        n = nums.length;
    dp[0] = nums[0];
    dp[1] = Math.max(nums[0], nums[1]);

    for (let i = 2; i < n; i++) {
        dp[i] = Math.max(nums[i] + dp[i - 2], dp[i - 1]);
    }

    return dp[n - 1];
};
const nums = [1,2,3,1]
const res = rob(nums)
console.log(res)