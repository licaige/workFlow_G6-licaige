/**
 * 考察：数学
 * @difficulty简单
 * @summary: 9.回文数
 * 给你一个整数 x ，如果 x 是一个回文整数，返回 true ；否则，返回 false 。
 * 回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。
示例：
输入：x = 121
输出：true
题目理解：
1、x为0、负数、首位是自然数且最后一位是0，都不是回文数
2、可以从右向左取数组保存在变量revertedNumber，直到x值小于revertedNumber跳出循环
3、对于偶数个位数，需要返回x等于revertedNumber
4、对于奇数个位数，需要返回x等于revertedNumber/10的向下取整
 */
var isPalindrome = function (x) {
  debugger;
  // 特殊情况：
  // 如上所述，当 x < 0 时，x 不是回文数。
  // 同样地，如果数字的最后一位是 0，为了使该数字为回文，
  // 则其第一位数字也应该是 0
  // 只有 0 满足这一属性
  if (x < 0 || (x % 10 === 0 && x !== 0)) {
    return false;
  }

  let revertedNumber = 0;
  while (x > revertedNumber) {
    revertedNumber = revertedNumber * 10 + x % 10;
    x = Math.floor(x / 10);
  }

  // 当数字长度为奇数时，我们可以通过 revertedNumber/10 去除处于中位的数字。
  return x === revertedNumber || x === Math.floor(revertedNumber / 10);
};
const numer = 67976
console.log(isPalindrome(numer));// 1221->true、12213->false