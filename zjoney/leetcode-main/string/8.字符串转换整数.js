/**
 * 考察：字符串
 * @difficulty 中等
 * @summary: 8. 字符串转换整数 (atoi)
 * 请你来实现一个 myAtoi(string s) 函数，使其能将字符串转换成一个 32 位有符号整数（类似 C/C++ 中的 atoi 函数）。
 * 函数 myAtoi(string s) 的算法如下：
读入字符串并丢弃无用的前导空格
检查下一个字符（假设还未到字符末尾）为正还是负号，读取该字符（如果有）。 确定最终结果是负数还是正数。 如果两者都不存在，则假定结果为正。
读入下一个字符，直到到达下一个非数字字符或到达输入的结尾。字符串的其余部分将被忽略。
将前面步骤读入的这些数字转换为整数（即，"123" -> 123， "0032" -> 32）。如果没有读入数字，则整数为 0 。必要时更改符号（从步骤 2 开始）。
如果整数数超过 32 位有符号整数范围 [−2^31,  2^31 − 1] ，需要截断这个整数，使其保持在这个范围内。具体来说，小于 −2^31 的整数应该被固定为 −2^31 ，大于 2^31 − 1 的整数应该被固定为 2^31 − 1 。
返回整数作为最终结果。

示例一：
输入：s = "42"
输出：42
解释：加粗的字符串为已经读入的字符，插入符号是当前读取的字符。
第 1 步："42"（当前没有读入字符，因为没有前导空格）
         ^
第 2 步："42"（当前没有读入字符，因为这里不存在 '-' 或者 '+'）
         ^
第 3 步："42"（读入 "42"）
           ^
解析得到整数 42 。
由于 "42" 在范围 [-2^31, 2^31 - 1] 内，最终结果为 42 。
 */

/* 解题二：数学思想
范围在32位内（含）
if (number < Math.pow(-2, 31) || number > Math.pow(2, 31) - 1) {
    return number < Math.pow(-2, 31) ? Math.pow(-2, 31) : Math.pow(2, 31) - 1;
}

其他情况返回0
if(isNaN(number)) {
    return 0;
} 

小细节
如果字符串 string 以"0x"或者"0X"开头, 则基数是16 (16进制).
如果字符串 string 以"0"开头, 基数是8（八进制）或者10（十进制），那么具体是哪个基数，取决与ECMAScript的版本。

 */
var myAtoi = function (str) {
  const number = parseInt(str, 10);

  if(isNaN(number)) {
      return 0;
  } else if (number < Math.pow(-2, 31) || number > Math.pow(2, 31) - 1) {
      return number < Math.pow(-2, 31) ? Math.pow(-2, 31) : Math.pow(2, 31) - 1;
  } else {
      return number;
  }
}
// 常规解题
//  var myAtoi = function(s) {
  // const re = new RegExp(/^(-|\+)?\d+/);
  // let str = s.trim().match(re);
  // let res = str ? Number(str[0]) : 0;
  // return res >= 0 ? Math.min(res, 2**31 - 1) : Math.max(res, -(2**31))
// };
