/**
 * 比特位计数
 * https://leetcode.cn/problems/counting-bits/description
 * @param {number} n
 * @return {number[]}
 */
var countBits = function(n) {
  // 位运算
  const calc = num => {
      let ret = 0;
      while (num > 0) {
          num &= (num - 1);
          ret++;
      }
      return ret;
  };
  const ans = [];
  for (let i = 0; i <= n; i++) {
      ans[i] = calc(i);
  }
  return ans;
};

var countBits = function(n) {
  const ans = new Array(n+1).fill(0);
  ans[0] = 0;
  for (let i = 1; i <= n; i++) {
      if (i % 2 === 1) {
          // 奇数的一比特位个数就是前一个偶数的一比特位个数+1
          ans[i] = ans[i-1] + 1;
      } else {
          // 偶数的一比特位等于其右移一位后的数的一比特位的个数
          ans[i] = ans[i >> 1];
      }
  }
  return ans;
};
