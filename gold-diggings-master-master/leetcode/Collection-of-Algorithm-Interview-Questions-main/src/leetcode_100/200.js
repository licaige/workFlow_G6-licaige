/**
 * 岛屿数量HOT
 * https://leetcode-cn.com/problems/number-of-islands/
 * @param {*} grid 
 */
var numIslands = function(grid) {
  // 深度优先遍历
  const m = grid.length;
  const n = grid[0].length;
  const dfs = (i, j) => {
    if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] === '0') return;
    grid[i][j] = '0';
    dfs(i+1, j);
    dfs(i-1, j);
    dfs(i, j+1);
    dfs(i, j-1);
  };
  let ans = 0;
  for(let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      // 如果当前是岛屿快，则深度遍历其上下左右的位置
      if (grid[i][j] === '1') {
        dfs(i, j);
        ans++;
      }
    }
  }
  return ans;
};
