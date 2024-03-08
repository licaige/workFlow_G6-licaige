/*
 * @lc app=leetcode.cn id=739 lang=javascript
 *
 * [739] 每日温度
 */

// @lc code=start
/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function (temperatures) {
  // 存结果
  const res = new Array(temperatures.length).fill(0);
  // 存30-100 温度从右到左第一次出现的坐标
  const next = new Array(100).fill(-1);
  let min = Number.POSITIVE_INFINITY;

  for (let i = temperatures.length - 1; i >= 0; i--) {
    const t = temperatures[i];
    // 温度=> 坐标
    next[t - 1] = i;
    // 虽然是两个 for 循环，但是第二个循环是 30-100 ，只遍历不到 70次

    min = Number.POSITIVE_INFINITY;
    for (let j = t; j < 100; j++) {
      if (min === 1) {
        break;
      }
      // 从温度比较找到最近 index
      if (next[j] > next[t - 1]) {
        min = Math.min(min, next[j] - next[t - 1]);
      }
    }

    res[i] = min === Number.POSITIVE_INFINITY ? 0 : min;
  }

  return res;
};

dailyTemperatures;
// @lc code=end
