/**
 * 字符串转换整数
 * https://leetcode-cn.com/problems/string-to-integer-atoi/
 * @param {*} s 
 * @returns 
 */
// 1. 利用parseInt
var myAtoi = function(s) {
  const max = 2**31 - 1;
  const min = -(2**31);
  let ans = parseInt(s);
  if (isNaN(ans)) return 0;
  if (ans < min) ans = min;
  if (ans > max) ans = max;
  return ans;
};

// 2. 正则表达式

// 3. 自动机
