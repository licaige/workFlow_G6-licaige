/*
 * @lc app=leetcode.cn id=461 lang=javascript
 *
 * [461] 汉明距离
 */

// @lc code=start
/**
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
var hammingDistance = function(x, y) {

    let ans = 0;
    // 先异或算出不同的数字
    let z = x^y;

    // 每一次 z 和 z-1 相与，每一次相与都会把最右边的 1 给去掉
    // 比如 1010
    // 1010 & 1001 ==》 1000
    while(z){
        ans ++;
        z = z&(z-1)
    }

    return ans
   

};
// @lc code=end
// 101
// 001

