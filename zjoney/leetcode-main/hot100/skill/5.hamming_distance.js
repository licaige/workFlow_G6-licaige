/**
 * 考察: 位运算
 * @difficulty 简单
 * @summary 461. 汉明距离 Hamming Distance
 * 两个整数之间的 汉明距离 指的是这两个数字对应二进制位不同的位置的数目。
 * 给你两个整数 x 和 y，计算并返回它们之间的汉明距离。
 * 
 * 示例 1：
输入：x = 1, y = 4
输出：2
解释：
1   (0 0 0 1)
4   (0 1 0 0)
       ↑   ↑
上面的箭头指出了对应二进制位不同的位置。
 */
var hammingDistance = function(x, y) {
  return (x^y).toString(2).split('').filter(i => i === '1').length
};