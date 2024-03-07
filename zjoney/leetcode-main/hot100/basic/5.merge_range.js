/**
 * 考察：排序
 * @difficulty中等
 * @summary:56. 合并区间
 * 以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi] 。
 * 请你合并所有重叠的区间，并返回 一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间 。
 * 
 * 示例 1：
 * 输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
 * 输出：[[1,6],[8,10],[15,18]]
 * 解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
 * 题目理解：
 * 
 * 先对输入按左区间值进行排序；
 * 判断相邻的两个区间是否有重合？
 * 如果没有重合直接存储区间，
 * 如果存在重合，合并前后两个区间
 */
 var merge = function(intervals) {
  if(intervals.length <= 1) return intervals;
  debugger
  intervals.sort((a, b) => a[0] - b[0]);
  let ans = [];
  ans.push(intervals[0]);
  for(let i = 1; i < intervals.length; i++){
      if(intervals[i][0] > ans[ans.length - 1][1]) ans.push(intervals[i]);
      else if (intervals[i][0] <= ans[ans.length - 1][1] && intervals[i][1] > ans[ans.length - 1][1]){
          ans[ans.length - 1][1] = intervals[i][1];
      }
  }
  return ans;
};

const intervals=[[1,3],[2,6],[8,10],[15,18]];
console.log(merge(intervals));