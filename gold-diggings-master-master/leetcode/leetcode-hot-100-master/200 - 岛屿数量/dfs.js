/*
 * @lc app=leetcode.cn id=200 lang=javascript
 *
 * [200] 岛屿数量
 */

// @lc code=start
/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
  let res = 0;
  const m = grid.length;
  const n = grid[0].length;

  const dfs = (i, j) => {
    if (i >= m || j >= n || i < 0 || j < 0 || grid[i][j] == 0) {
      return;
    }
    if (grid[i][j] == 1) {
      grid[i][j] = 0;
    }
    dfs(i + 1, j, grid[i][j]);
    dfs(i, j + 1, grid[i][j]);
    dfs(i - 1, j, grid[i][j]);
    dfs(i, j - 1, grid[i][j]);
  };

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] == 1) {
        //  如果遇到岛屿就递归，把岛屿变成海洋
        res++;
        dfs(i, j);
      }
    }
  }

  return res;
};

numIslands;
// @lc code=end

// 1 1 1
// 0 1 0
// 1 1 1
