/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
    if (nums.length == 0) {
        return 0;
    }
    let dp = new Array(nums.length);
    dp[0] = 1;
    let maxans = 1;
    for (let i = 1; i < dp.length; i++) {
        let maxval = 0;
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                maxval = Math.max(maxval, dp[j]);
            }
        }
        dp[i] = maxval + 1;
        maxans = Math.max(maxans, dp[i]);
    }
    return maxans;
};