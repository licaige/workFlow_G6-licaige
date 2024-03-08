/**
 * Pow(x, n)HOT
 * https://leetcode-cn.com/problems/powx-n/
 * @param {*} x 
 * @param {*} n 
 */
// 采用平方的方式进行快速迭代
var myPow = function(x, n) {
  // 快速幂+递归
  var quickMul = (x, n) => {
    if (n === 0) return 1;
    var y = quickMul(x, Math.floor(n / 2));
    return (n & 1) === 0 ? y * y : y * y * x;
  };
  return n < 0 ? 1 / quickMul(x, -n) : quickMul(x, n);
}

var myPow = function(x, n) {
  // 快速幂+迭代
  var quickMul = (x, n) => {
    if (n === 0) return 1;
    var ans = 1;
    while (n > 0) {
      if ((n & 1) === 1) ans *= x;
      x *= x;
      n = Math.floor(n / 2); 
    }
    return ans;
  };
  return n < 0 ? 1 / quickMul(x, -n) : quickMul(x, n);
}

console.log(myPow(2, 10));
