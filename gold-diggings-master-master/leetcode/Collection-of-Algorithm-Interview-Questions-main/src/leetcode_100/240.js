/**
 * 搜索二维矩阵ⅡHOT
 * https://leetcode.cn/problems/search-a-2d-matrix-ii/description/
 * @param {*} matrix
 * @param {*} target
 * @returns
 */
var searchMatrix = function(matrix, target) {
  // 暴力查找
  const m = matrix.length;
  const n = matrix[0].length;
  for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
          if (matrix[i][j] === target) return true;
      }
  }
  return false;
};

var searchMatrix = function(matrix, target) {
  // 二分查找
  const bsearch = (arr) => {
      const n = arr.length;
      let l = 0, r = n - 1;
      while (l <= r) {
          const mid = l + ((r - l) >> 1);
          if (arr[mid] > target) {
              r = mid - 1;
          } else if (arr[mid] < target) {
              l = mid + 1;
          } else {
              return true;
          }
      }
      return false;
  };
  const m = matrix.length;
  for (let i = 0; i < m; i++) {
      if (bsearch(matrix[i])) return true;
  }
  return false;
}

var searchMatrix = function (matrix, target) {
  // Z字形查找
  // 从左下角开始查找
  let row = matrix.length - 1;
  let col = 0;
  // 查找的行列都需要满足矩阵的大小
  while (row >= 0 && col < matrix[0].length) {
    if (matrix[row][col] === target) return true;
    if (matrix[row][col] > target) {
      // 根据每行、每列都是升序，从左下角开始查找
      // 左下角的值大于目标值，说明最后一行全部都大于目标值，那么只能从其上一行去查找
      row -= 1;
    } else {
      // 同理，如果第一列的值都小于目标值，说明目标值肯定位于第一行的后面
      col += 1;
    }
  }
  return false;
}
