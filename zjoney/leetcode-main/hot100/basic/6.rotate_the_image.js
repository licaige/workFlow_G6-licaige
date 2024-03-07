/**
 * 考察：数组
 * @difficulty中等
 * @summary: 48. 旋转图像
 * 给定一个 n × n 的二维矩阵 matrix 表示一个图像。请你将图像顺时针旋转 90 度。
 * 你必须在 原地 旋转图像，这意味着你需要直接修改输入的二维矩阵。请不要 使用另一个矩阵来旋转图像。
 * 如图 images/8.rotateImage.jpg
 * 输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
 * 输出：[[7,4,1],[8,5,2],[9,6,3]]
 */
var rotate = function(matrix) {
  const n = matrix.length;
  const matrix_new = new Array(n).fill(0).map(() => new Array(n).fill(0));
  debugger
  for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
          matrix_new[j][n - i - 1] = matrix[i][j];
      }
  }
  for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
          matrix[i][j] = matrix_new[i][j];
      }
  }
  console.log('matrix_new', matrix_new); // [ [ 7, 4, 1 ], [ 8, 5, 2 ], [ 9, 6, 3 ] ]
};
rotate([[1,2,3],[4,5,6],[7,8,9]])
