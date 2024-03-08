/*
 * @lc app=leetcode.cn id=79 lang=javascript
 *
 * [79] 单词搜索
 */

// @lc code=start
/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function (board, word) {
  const m = board.length;
  const n = board[0].length;
  let find = false;
  const map = new Map();

  const dfs = (i, j, count) => {
    if (i < 0 || i >= m || j < 0 || j >= n || map.get(`${i}+${j}`) || find) {
      return;
    }
    // 标记已经寻找
    map.set(`${i}+${j}`, true);
    if (board[i][j] === word[count]) {
      count++;
      if (count === word.length) {
        return (find = true);
      } else {
        dfs(i + 1, j, count) ||
          dfs(i - 1, j, count) ||
          dfs(i, j + 1, count) ||
          dfs(i, j - 1, count);
      }
    }
    // 没有找到单词就把当前给回退
    map.set(`${i}+${j}`, false);
  };

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === word[0]) {
        // 找到了就递归
        dfs(i, j, 0);
        if (find) {
          return true;
        }
      }
    }
  }
  return false;
};

exist;
// @lc code=end
