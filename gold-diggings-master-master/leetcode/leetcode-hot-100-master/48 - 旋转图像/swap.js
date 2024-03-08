/*
 * @lc app=leetcode.cn id=48 lang=javascript
 *
 * [48] 旋转图像
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function (matrix) {
  const swap = (i, j, m, n) => {
    const temp = matrix[i][j];
    matrix[i][j] = matrix[m][n];
    matrix[m][n] = temp;
  };

  // 每一圈进行旋转
  const singleRotate = (idx) => {
    let [q, w] = [idx, idx];

    let [e, r] = [matrix.length - idx - 1, idx];

    let [t, y] = [matrix.length - idx - 1, matrix.length - idx - 1];

    let [u, o] = [idx, matrix.length - idx - 1];

    // 需要旋转个数为 圈长度 - 1
    for (let i = 0; i < matrix.length - idx * 2 - 1; i++) {
      // 旋转 3 次
      swap(q, w, e, r);
      swap(e, r, t, y);
      swap(t, y, u, o);

      q++;
      r++;
      t--;
      o--;
    }
  };
  const mid = Math.floor(matrix.length / 2);

  // 遍历每一圈，直到遇到中间
  for (let i = 0; i < mid; i++) {
    singleRotate(i);
  }
};
rotate;
// @lc code=end
