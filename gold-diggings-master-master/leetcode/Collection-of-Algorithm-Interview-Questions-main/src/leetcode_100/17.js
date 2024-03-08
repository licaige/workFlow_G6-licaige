/**
 * 电话号码的字母组合HOT
 * https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number/
 * @param {*} digits 
 * @returns 
 */
var letterCombinations = function(digits) {
  if (!digits.length) return [];
  const map = {
      2: ['a','b','c'],
      3: ['d','e','f'],
      4: ['g','h','i'],
      5: ['j','k','l'],
      6: ['m','n','o'],
      7: ['p','q','r','s'],
      8: ['t','u','v'],
      9: ['w','x','y','z']
  };
  const ans = [];
  const backtrace = (cur, index) => {
      if (index === digits.length) {
          ans.push(cur);
          return;
      }
      const letters = map[digits[index]];
      for(let i = 0; i < letters.length; i++) {
        backtrace(cur + letters[i], index+1);
      }
  }
  backtrace('', 0);
  return ans;
};

console.log(letterCombinations(''));
