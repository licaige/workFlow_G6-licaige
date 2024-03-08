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
    // 异或，位数不同的时候为 1
    let z = x^y;
    // 转换为 二进制
    z=z.toString(2);
    for (let i = 0; i < z.length; i++) {
        if(z[i] ==='1'){
            ans++
        }
        
    }
    return ans
   

};
// @lc code=end
// 001
// 100

