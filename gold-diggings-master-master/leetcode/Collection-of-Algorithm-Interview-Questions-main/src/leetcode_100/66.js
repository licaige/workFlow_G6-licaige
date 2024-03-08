/**
 * 加一
 * https://leetcode-cn.com/problems/plus-one/
 * @param {*} digits 
 * @returns 
 */
var plusOne = function(digits) {
  /**
      处理进位问题
   */
  let carry = 0;
  const n = digits.length;
  const ans = [];
  for (let i = n - 1; i >= 0; i--) {
      let sum = 0;
      if (i === n - 1) {
          sum = digits[i] + 1;
      } else {
          sum = digits[i] + carry;
      }
      ans[i] = sum % 10;
      carry = Math.floor(sum / 10);
  }
  if (carry) {
    ans.unshift(carry);
  }
  return ans;
};

var plusOne = function(digits) {
  const n = digits.length;
  for (let i = n - 1; i >= 0; i--) {
    if (digits[i] !== 9) {
      ++digits[i];
      for (let j = i + 1; j < n; j++) {
        digits[j] = 0;
      }
      return digits;
    }
  }
  const ans = new Array(n+1).fill(0);
  ans[0] = 1;
  return ans;
}

var nums = [1,2,3];
console.log(plusOne(nums));
