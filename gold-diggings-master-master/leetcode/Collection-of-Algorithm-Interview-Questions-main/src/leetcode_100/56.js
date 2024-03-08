/**
 * 合并区间
 * https://leetcode-cn.com/problems/merge-intervals/
 * @param {*} intervals 
 * @returns 
 */
var merge = function(intervals) {
  /**
      排序，左边界升序排序
      每次遍历和结果数组中的值进行比较，当前遍历到的值的左边界大于结果数组中最后一个元素的右边界
      更新结果数组，否则加入当前遍历的值
      关键点就在于每次遍历的时候，要把结果数组作为参考物来进行对比区间
   */
  intervals.sort((a,b) => a[0]-b[0]);
  const n = intervals.length;
  const ans = [intervals[0]];
  for (let i = 1; i < n; i++) {
      let end = ans[ans.length - 1][1];
      let start = intervals[i][0];
      if (start <= end) {
          ans[ans.length - 1][1] = Math.max(end, intervals[i][1]);
      } else {
          ans.push(intervals[i]);
      }
  }
  return ans;
};
