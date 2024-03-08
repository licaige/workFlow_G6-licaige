/**
 * 整数转罗马数字
 * https://leetcode-cn.com/problems/integer-to-roman/
 * @param {*} num 
 * @returns 
 */
var intToRoman = function(num) {
  const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];    
  const symbols = ["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"];
  let ans = '';
  for(let i = 0; i < values.length; i++) {
      while(num >= values[i]) {
          num -= values[i];
          ans += symbols[i];
      }
  }
  return ans;
};
