/**
 * 考察：数学
 * @difficulty 中等
 * @summary: 453.最小操作次数使数组元素相等
示例： 
输入：nums = [1,2,3]
输出：3
解释：
只需要3次操作（注意每次操作会增加两个元素的值）：
[1,2,3]  =>  [2,3,3]  =>  [3,4,3]  =>  [4,4,4]
 */
// 数学
var minMoves = function(nums){
  const minNum = Math.min(...nums);
  let res = 0;
  for(let num of nums){
    res += num-minNum
  }
  return res;
}
const nums = [1, 2, 3]
console.log(minMoves(nums));