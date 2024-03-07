/**
 * 考察：布莱恩算法、动态规划
 * @difficulty简单
 * @summary: 338. 比特位计数
 * 给你一个整数 n ，对于 0 <= i <= n 中的每个 i ，计算其二进制表示中 1 的个数 ，返回一个长度为 n + 1 的数组 ans 作为答案。
 * 输入：n = 2
 * 输出：[0,1,1]
 * 解释：
 * 0 --> 0
 * 1 --> 1
 * 2 --> 10
 * 题目理解：
 * 考察布莱恩 柯宁汉
 */
//Brian Kernighan 算法 
var countBits = function (n) {
  debugger;
  // 定义一维数组
  const bits = new Array(n + 1).fill(0);
  for (let i = 0; i <= n; i++) {
    // 填充数组
    bits[i] = countOnes(i);
  }
  return bits
};
const countOnes = (x) => {
  debugger;
  let ones = 0;
  while (x > 0) {
    x &= (x - 1);
    ones++;
  }
  return ones;
}
// 动态规划
var countBits2 = function(n) {
  debugger;
  const bits = new Array(n + 1).fill(0);
  console.log(bits, '');
  let highBit = 0;
  for (let i = 1; i <= n; i++) {
      if ((i & (i - 1)) == 0) {
          highBit = i;
      }
      // bits[i] 表示 i 的「一比特数」
      bits[i] = bits[i - highBit] + 1;
  }
  return bits;
};
console.log(countBits2(3));// [0,1,1,2]