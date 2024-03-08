/**
 * 旋转图像HOT
 * https://leetcode-cn.com/problems/rotate-image/
 * @param {*} matrix 
 */
var rotate = function(matrix) {
  // 原地翻转
  /**
      [3,0] -> [0,0] -> [0,3] -> [3,3] -> [3,0]
      [2,0] -> [0,1]
      [1,0] -> [0,2]
      [0,0] -> [0,3]
      [3,1] -> [1,0]
      [2,1] -> [1,1]
      [1,1] -> [1,2]
      [0,1] -> [1,3]
      [3,2] -> [2,0]
   */
  const n = matrix.length;
  for (let i = 0; i < (n >> 1); i++) {
      for (let j = 0; j < ((n + 1) >> 1); j++) {
          const temp = matrix[i][j];
          matrix[i][j] = matrix[n-j-1][i];
          matrix[n-j-1][i] = matrix[n-i-1][n-j-1];
          matrix[n-i-1][n-j-1] = matrix[j][n-i-1];
          matrix[j][n-i-1] = temp;
      }
  }
};

// 还可以先水平翻转，然后在对角线翻转
var rotate = function(matrix) {
  const n = matrix.length;
  // 先上下翻转，matrix[row][col] -> matrix[n-row-1][col]
  // 注意这里只遍历总长度的一半，因为是进行上下翻转，只要翻转一半，剩余的一半实际已经翻转过了，不再需要翻转
  for(let i = 0; i < (n >> 1); i++) {
    for (let j = 0; j < n; j++) {
      [matrix[i][j], matrix[n-i-1][j]] = [matrix[n-i-1][j], matrix[i][j]];
    }
  }
  // 再对角线翻转,matrix[row][col] -> matrix[col][row]
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }
};

const data = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]];
rotate(data);
console.log(data);
