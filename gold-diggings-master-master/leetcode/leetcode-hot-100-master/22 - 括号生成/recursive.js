/*
 * @lc app=leetcode.cn id=22 lang=javascript
 *
 * [22] 括号生成
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string[]}
 */
// 递归生成符合规则的符号
// 1、当（）个数相同时，只能 （
// 2、当（ 个数 为 0 ，只能 ）
// 3、当 （ 和 ） 个数==0 退出递归
var generateParenthesis = function (n) {
  const res = [];
  if (n === 1) {
    return ['()'];
  }
  const generatethesis = (pre, left, right, res) => {
    if (left === 0 && right === 0) {
      res.push(pre);
      return;
    }
    if (left === right) {
      generatethesis(pre + '(', left - 1, right, res);
    } else if (left === 0) {
      generatethesis(pre + ')', left, right - 1, res);
    } else {
      generatethesis(pre + '(', left - 1, right, res);
      generatethesis(pre + ')', left, right - 1, res);
    }
  };
  generatethesis('', n, n, res);

  return res;
};

generateParenthesis;
// @lc code=end
