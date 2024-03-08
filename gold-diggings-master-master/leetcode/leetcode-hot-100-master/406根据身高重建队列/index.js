/*
 * @lc app=leetcode.cn id=406 lang=javascript
 *
 * [406] 根据身高重建队列
 */

// @lc code=start
/**
 * @param {number[][]} people
 * @return {number[][]}
 */
var reconstructQueue = function (people) {
  // 先按照身高从大到小排序
  // [7,0],[7,1],[6,1],[5,0],[5,2],[4,4]]
  // 再按照 rank 数插入相应的队列中
  const people1 = people.sort((pre, next) => {
    if (pre[0] === next[0]) {
      return pre[1] - next[1];
    }
    return next[0] - pre[0];
  });

  const res = [];
  people1.forEach((p) => {
    res.splice(p[1], 0, p);
  });
  return res;
};
