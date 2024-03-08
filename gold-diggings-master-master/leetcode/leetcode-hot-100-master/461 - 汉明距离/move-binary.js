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

  
    // 每次移动一次 并且与 1 相与如果结果为 1 则 +1

    while(z!==0){
        ans = ans + (1&z)
        z = z>>1
    }
    return ans
   

};
// @lc code=end
// 101
// 001

