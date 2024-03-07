
/**
 * 考察：二分查找法+排序
 * @difficulty中等
 * @summary: 274. H 指数
 * 给你一个整数数组 citations ，其中 citations[i] 表示研究者的第 i 篇论文被引用的次数。计算并返回该研究者的 h 指数。
根据维基百科上 h 指数的定义：h 代表“高引用次数”，一名科研人员的 h指数是指他（她）的 （n 篇论文中）总共有 h 篇论文分别被引用了至少 h 次。且其余的 n - h 篇论文每篇被引用次数 不超过 h 次。
如果 h 有多种可能的值，h 指数 是其中最大的那个。

示例：
输入：citations = [3,0,6,1,5]
输出：3 
解释：给定数组表示研究者总共有 5 篇论文，每篇论文相应的被引用了 3, 0, 6, 1, 5 次。
     由于研究者有 3 篇论文每篇 至少 被引用了 3 次，其余两篇论文每篇被引用 不多于 3 次，所以她的 h 指数是 3。
题目理解：
 * 1、二分查找目标是查找后半段的左边界。
   数字3,6,5这三个都大于h, 0,1这两个小于h，所以h=3
   2、排序+遍历 
 */

var hIndex = function (citations) {
  // 快速排序或桶排序
  citations.sort((a, b) => a - b);
  // 下半部的左边界: citations[i] >= citations.length - i
  let l = 0,
    r = citations.length - 1;
  while (l < r) {
    let m = l + r >> 1;
    if (citations[m] >= citations.length - m) {
      r = m
    } else {
      l = m + 1
    }
  }

  let h = citations.length - l;
  return citations[l] >= h ? h : 0;
};
// 方法2:: 排序+遍历
var hIndex2 = function(citations) {
  debugger;
  citations.sort((a, b) => a - b); // 升序[8,7,6,5,4,2,1]
  let h = 0, i = citations.length - 1; 
  while (i >= 0 && citations[i] > h) {
      h++; 
      i--;
  }
  return h;
};
let res = hIndex2(
  // [3, 0, 6, 1, 5]
  [8,7,6,5,4,2,1]
  )
console.log('out', res);// 4