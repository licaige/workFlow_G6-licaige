/*
 * @lc app=leetcode.cn id=338 lang=javascript
 *
 * [338] 比特位计数
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number[]}
 */
var countBits = function (n) {

    let res = new Array(n + 1);
    res[0] = 0;


    for (let i = 1; i <= n; i++) {

        let ans = 0;
        let temp = i;

        while (temp > 0) {
            // 每次减去1 和自己相乘
            temp = temp & (temp - 1)
            ans++;
        }

        res[i] = ans
    }

    return res

};
// @lc code=end

