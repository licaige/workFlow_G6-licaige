/**
 * 任务调度器HOT
 * https://leetcode.cn/problems/task-scheduler/
 * @param {character[]} tasks
 * @param {number} n
 * @return {number}
 */
/* 构造桶结构 */ 
 var leastInterval = function(tasks, n) {
  // 构造一个桶，装入所有的运行的任务
  const buckets = new Array(26).fill(0);
  // 找到数量最多的任务
  let max = 0, cnt = 0;
  for (const ch of tasks) {
      // 找到当前任务在桶中的位置
      const index = ch.charCodeAt() - 'A'.charCodeAt();
      // 记录任务的个数
      buckets[index]++;
      max = Math.max(max, buckets[index]);
  }
  // 找到数量最多的任务的个数
  for (const i of buckets) {
      if (i === max) cnt++;
  }
  // 完成任务的最短时间，(任务个数最多的任务的数量 - 1) * (冷却时间 + 1) + 最后一个桶的任务执行时间 #1
  // 如果冷却时间能够装下所有不同的任务，那么花费时间就是任务的个数 #2
  // 之所以选择两个值中的较大值，因为如果存在空闲待命时间，#1的时间肯定比#2的时间大，如果任务刚好填满冷却时间，#2时间大于#1
  // 因此选择其中的较大值即可
  return Math.max((max - 1) * (n + 1) + cnt, tasks.length);
};
