/*
 * @lc app=leetcode.cn id=70 lang=javascript
 *
 * [70] 爬楼梯
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {


    if (n === 0 || n === 1) {
        return 1
    }

    let prePre = 1;
    let pre =1;
    // 用于保存 pre
    let temp = null;

    for (let i = 2; i <=n; i++) {
        
        temp = pre;
        pre = pre + prePre;
        prePre = temp;
    }

    return pre

};
// @lc code=end

