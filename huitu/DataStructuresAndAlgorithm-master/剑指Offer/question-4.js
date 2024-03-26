/*
 * @Author: Li-HONGYAO
 * @Date: 2021-04-19 15:55:26
 * @LastEditTime: 2021-04-19 16:03:18
 * @LastEditors: Li-HONGYAO
 * @Description:
 * @FilePath: \剑指Offer\question-4.js
 */

/*
剑指 Offer 04. 二维数组中的查找
在一个 n * m 的二维数组中，每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个高效的函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。
*/
var findNumberIn2DArray = function(matrix, target) {
  if(!Array.isArray(matrix) || typeof target !== 'number') return -1;
  let res = false;
  for(let i = 0; i < matrix.length; i++) {
    if(!Array.isArray(matrix[i])) {
      return -1;
    }else {
      if(matrix[i].indexOf(target) !== -1) {
        res = true;
        break;
      }
    }
  }
  return res;
};

const matrix = [
  [1,   4,  7, 11, 15],
  [2,   5,  8, 12, 19],
  [3,   6,  9, 16, 22],
  [10, 13, 14, 17, 24],
  [18, 21, 23, 26, 30]
]
console.log(findNumberIn2DArray(matrix, 20))