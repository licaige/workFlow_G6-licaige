/**
 * 回文数
 * https://leetcode-cn.com/problems/palindrome-number/
 * @param {*} x 
 * @returns 
 */
var isPalindrome = function(x) {
  if (x < 0) return false;
  const s = String(x);
  const n = s.length;
  if (n % 2 === 0) {
      const mid = Math.floor((n/2)) - 1;
      return s.slice(0, mid+1) === s.slice(mid+1, n);
  } else {
      const mid = Math.floor(n/2);
      return s.slice(0, mid+1) === s.slice(mid, n);
  }
};

// 通过不断除以10，余数是最右边的数，剩余则为左边的数，如果左边等于右边，说明就是回文数
var isPalindrome = function(x) {
  // x为负数或者x的最后一位是0并且x本身不是0的情况下，例如20、30、40，都不是回文数
  if (x < 0 || (x % 10 === 0 && x !== 0)) return false;
  
  let reverseNum = 0;
  while (x > reverseNum) {
    reverseNum = reverseNum * 10 + x % 10;
    x = Math.floor(x / 10);
  }

  // 判断x === reverseNum / 10是会x为奇数，如12321，得到的reverseNum为123，而x为12，中位数3对结果不影响，因此去掉即可
  return x === reverseNum || x === Math.floor(reverseNum / 10);
};
