/**
 * 考察：二分查找法
 * @difficulty 中等
 * @summary:240. 搜索二维矩阵 II
 * 编写一个高效的算法来搜索 m x n 矩阵 matrix 中的一个目标值 target 。该矩阵具有以下特性：
 * 每行的元素从左到右升序排列。
 * 每列的元素从上到下升序排列。
 * 
 * 示例1：
 * images/searchgrid2.jpeg
 * 输入：matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 5
 * 输出：true
 */

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 * images/search_image.png
 */
 var searchMatrix = function(matrix, target) {
    debugger
  let m = matrix.length;
  let n = matrix[0].length;
  for(let i = m - 1, j = 0; i >= 0 && j < n;) {
      if(matrix[i][j] === target) return true;
      else if(matrix[i][j] > target) {
          i--
      } else {
          j++;
      }
  }
  return false;
};
