/**
 * 螺旋矩阵
 * https://leetcode-cn.com/problems/spiral-matrix/
 * @param {*} matrix 
 * @returns 
 */
var spiralOrder = function(matrix) {
  /**
      根据矩阵旋转的方向
   */
  const m = matrix.length;
  const n = matrix[0].length;
  const directions = [[0,1],[1,0],[0,-1],[-1,0]];
  const ans = [];
  const maxCount = m * n;
  const visited = new Array(m).fill(0).map(() => new Array(n).fill(false));
  let row = 0, col = 0, directionIndex = 0;
  for (let i = 0; i < maxCount; i++) {
      ans[i] = matrix[row][col];
      visited[row][col] = true;
      const nextRow = row + directions[directionIndex][0];
      const nextCol = col + directions[directionIndex][1];
      // 判断是否该转换方向了，visited的作用就是螺旋的时候，对于已经访问过的点忽略掉，并转换方向
      if (nextRow < 0 || nextRow >= m || nextCol < 0 || nextCol >= n || visited[nextRow][nextCol]) {
          directionIndex = (directionIndex + 1) % 4;
      }
      row += directions[directionIndex][0];
      col += directions[directionIndex][1];
  }
  return ans;
};

var spiralOrder = function(matrix) {
  /**
   * 按照每层进行输出
   */
  const m = matrix.length;
  const n = matrix[0].length;
  const ans = [];
  let left = 0, right = n - 1, top = 0, bottom = m - 1;
  while (left <= right && top <= bottom) {
      // 记录往右的数据
      for (let col = left;col <= right; col++) {
          ans.push(matrix[top][col]);
      }
      // 记录往下的数据
      for (let row = top + 1; row <= bottom; row++) {
          ans.push(matrix[row][right]);
      }
      // 记录往左和往上的数据
      // 注意这里的判断条件不能漏掉，如果left，right或者top，bottom相等，则会重复计算
      if (left < right && top < bottom) {
          for (let col = right - 1; col >= left; col--) {
              ans.push(matrix[bottom][col]);
          }
          for (let row = bottom - 1; row > top; row--) {
              ans.push(matrix[row][left]);
          }
      }
      [left, right, top, bottom] = [left + 1, right - 1, top + 1, bottom - 1];
  }
  return ans;
};

// var nums = [[1,2,3],[4,5,6],[7,8,9]];
var nums = [[1,2,3,4],[5,6,7,8],[9,10,11,12]];
console.log(spiralOrder(nums));
