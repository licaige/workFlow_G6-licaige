/**
 * 汉明距离HOT
 * https://leetcode-cn.com/problems/hamming-distance/
 * @param {*} x 
 * @param {*} y 
 * @returns 
 */
var hammingDistance = function(x, y) {
  // 利用异或运算，异或运算就是不同为1，相同为0，因此得到异或结果以后，计算结果的二进制表示中有多少个1
  let s = x ^ y;
  let ans = 0;
  while (s) {
      // 判断当前位是否是1
      ans += s & 1;
      // 右移判断下一位是否为1
      s = s >> 1;
  }
  return ans;
};
