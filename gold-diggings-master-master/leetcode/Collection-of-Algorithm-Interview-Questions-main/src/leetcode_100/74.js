/**
 * 搜索二维矩阵
 * https://leetcode-cn.com/problems/search-a-2d-matrix/
 * @param {*} matrix
 * @param {*} target
 * @returns
 */
// 两次二分搜索
var searchMatrix = function(matrix, target) {
  // 遍历每一行的第一个元素，找到目标值所在的那一行
  // 每一行最后一个元素大于下一行的第一个元素，并且每一行都是升序排列
  // 可以推导出每一列的第一个元素也是升序排列的
  const bscol = (arr, target) => {
      let low = 0, high = arr.length - 1;
      while(low <= high) {
          const mid = low + ((high - low) >> 1);
          // 找到大于等于目标值的第一个元素
          if (arr[mid][0] >= target) {
            high = mid - 1;
          } else {
            low = mid + 1;
          }
      }
      return high;
  }

  // 找到目标在哪一行后，二分查找那一行
  const bsrow = (arr, target) => {
      let low = 0, high = arr.length - 1;
      while(low <= high) {
          const mid = low + ((high - low) >> 1);
          if (arr[mid] > target) {
              high = mid - 1;
          } else if (arr[mid] < target) {
              low = mid + 1;
          } else {
              return true;
          }
      }
      return false;
  }

  const col = bscol(matrix, target);
  if (col < 0) return false;
  return bsrow(matrix[col], target);
};

// 一次二分查找
var searchMatrix = function (matrix, target) {
  // 根据条件将矩阵首尾拼接，就是一个完整的升序数组，直接进行一次二分查找就能解决问题
  const m = matrix.length;
  const n = matrix[0].length;
  let l = 0, r = m * n - 1;

  while (l <= r) {
    const mid = l + ((r - l) >> 1);
    // 得到mid索引后，需要将mid转换成矩阵中的行索引和列索引
    // mid / m 向下取整得到的就是矩阵的行索引，mid % n 得到的就是列索引
    const num = matrix[Math.floor(mid / m)][mid % n];
    if (num === target) return true;
    if (num > target) {
      r = mid - 1;
    } else {
      l = mid + 1;
    }
  }

  return false;
}

console.log(searchMatrix([[1]], 1));
