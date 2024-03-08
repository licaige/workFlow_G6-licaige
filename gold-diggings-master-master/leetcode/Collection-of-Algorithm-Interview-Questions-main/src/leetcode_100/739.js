/**
 * 每日温度HOT
 * https://leetcode.cn/problems/daily-temperatures/
 * @param {number[]} temperatures
 * @return {number[]}
 */

// 暴力解法
var dailyTemperatures = function (temperatures) {
  const n = temperatures.length;
  const ans = [];
  for (let i = 0; i < n - 1; i++) {
    let isExited = false;
    for (let j = i + 1; j < n; j++) {
      if (temperatures[i] < temperatures[j]) {
        ans.push(j - i);
        isExited = true;
        break;
      }
    }
    if (!isExited) ans.push(0);
  }
  ans.push(0);
  return ans;
};

/*SOLUTION 单调栈*/
var dailyTemperatures = function (temperatures) {
  const n = temperatures.length;
  const ans = new Array(n).fill(0);
  // 设置单调栈
  const stack = [];
  for (let i = 0; i < n; i++) {
    const temp = temperatures[i];
    while (stack.length && temperatures[stack[stack.length - 1]] < temp) {
      const prevIndex = stack.pop();
      ans[prevIndex] = i - prevIndex;
    }
    stack.push(i);
  }
  return ans;
};

dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]);
