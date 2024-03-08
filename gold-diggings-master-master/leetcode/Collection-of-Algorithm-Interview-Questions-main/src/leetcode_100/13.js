/**
 * 罗马数字转整数
 * https://leetcode-cn.com/problems/roman-to-integer/
 * @param {*} s 
 * @returns 
 */
var romanToInt = function(s) {
  const symbols = {
      "M": 1000,
      "D": 500, 
      "C": 100,
      "L": 50, 
      "X": 10, 
      "V": 5,
      "I": 1
  };
  let ans = 0;
  for(let i = 0; i < s.length; i++) {
      if (symbols[s[i]] < symbols[s[i+1]]) { 
          ans -= symbols[s[i]]; 
      } else {
          ans += symbols[s[i]];
      }
  }
  return ans;
};

console.log(romanToInt('IV'));
