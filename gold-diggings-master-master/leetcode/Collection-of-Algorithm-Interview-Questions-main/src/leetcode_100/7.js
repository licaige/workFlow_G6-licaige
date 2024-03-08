/**
 * 整数反转
 * https://leetcode-cn.com/problems/reverse-integer/
 * @param {*} x 
 * @returns 
 */
 var reverse = function(x) {
  let rev = 0;
  while(x !== 0) {
      let remainder = x % 10;
      // 这里可以使用或运算来取一个数的整数部分，无论是整数还是负数，正数向下取整，负数向上取整
      x = (x / 10) | 0;
      rev = rev * 10 + remainder;
  }
  // 这里可以使用|0来判断值是否超过了32位整数
  return (rev | 0) === rev ? rev : 0;
};

console.log(reverse(-123));
