/**
 * 括号生成HOT
 * https://leetcode-cn.com/problems/generate-parentheses/
 * @param {*} n 
 * @returns 
 */
 var generateParenthesis = function(n) {
  const ans = [];
  const dfs = (cur, left, right, max) => {
      if (cur.length === n * 2) {
          ans.push(cur);
          return;
      }
      // 左括号小于n，那么就需要添加左括号
      if (left < max) {
          dfs(cur+'(', left+1, right, max);
      }

      // 右括号的数量小于左括号时添加一个右括号
      if (right < left) {
          dfs(cur+')', left, right+1, max);
      }
  }
  dfs('', 0, 0, n);
  return ans;
};
console.log(generateParenthesis(3));
