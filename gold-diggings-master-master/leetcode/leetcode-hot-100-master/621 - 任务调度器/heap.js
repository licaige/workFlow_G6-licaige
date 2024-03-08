/*
 * @lc app=leetcode.cn id=621 lang=javascript
 *
 * [621] 任务调度器
 */

// 思路：
// 建立 分桶，桶的个数为 出现数字最多
// 桶的大小为 n+1
// 依次将数字填满桶

// @lc code=start
/**
 * @param {character[]} tasks
 * @param {number} n
 * @return {number}
 */
var leastInterval = function (tasks, n) {
  // map 存储每个任务出现的个数
  const map = new Map();
  let maxN = 0; // 统计出现最多数字的个数
  let maxC = 1; // 有多少个出现
  for (let i = 0; i < tasks.length; i++) {
    const count = map.get(tasks[i]) || 0;
    map.set(tasks[i], count + 1);
    if (count + 1 > maxN) {
      maxN = count + 1;
      maxC = 1;
    } else if (count + 1 === maxN) {
      maxC++;
    }
  }
  // 有空余返回桶的子有多少，没有空余则返回 size

  return Math.max(tasks.length, (maxN - 1) * (n + 1) + maxC);
};

leastInterval;

// a
// a
// a
// @lc code=end
