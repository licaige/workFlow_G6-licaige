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
  // 单调递减栈
  const stack = [0];
  const res = new Array(temperatures.length).fill(0);

  let popIndex = 0;

  for (let i = 1; i < temperatures.length; i++) {
    while (temperatures[stack[stack.length - 1]] < temperatures[i]) {
      // 每次 pop 的时候会拿当前下标作比较，如果没有当前下标大

      // 说明找到啦

      // value = i - stack.pop()

      popIndex = stack.pop();
      res[popIndex] = i - popIndex;
    }

    // 寸下标
    stack.push(i);
  }

  return res;
};

dailyTemperatures;
// @lc code=end
