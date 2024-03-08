/*
 * @lc app=leetcode.cn id=1653 lang=javascript
 *
 * [1653] 使字符串平衡的最少删除次数
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var minimumDeletions = function(s) {
    // 建立以 分割线为下标的 dp
    const dp = new Array(s.length+1);
    // min 记录删除次数最小，假设 a 出现个数为 0
    let min = 0;
    // count 记录 1 坐标之后的 a 出现个数
    let count = 0;
    dp[0] = s[0]==='a'?1:0;
    for (let i = 1; i <= s.length; i++) {
        if(s[i]==='a'){
            count ++
        }
        if(s[i-1]==='a'){
            // 每次遇到 a 则分割数健一
            dp[i] = dp[i-1] -1
        }else  {
            // 遇到 b 则分割加一
            dp[i] = dp[i-1] +1
        }
        min = Math.min(min,dp[i])
    }

    return min + count

};

minimumDeletions;
// @lc code=end

