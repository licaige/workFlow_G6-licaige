/**考察：栈
 * @difficulty 中等
 * @summary:739. 每日温度
 * 给定一个整数数组 temperatures ，表示每天的温度，返回一个数组 answer ，其中 answer[i] 是指对于第 i 天，
 * 下一个更高温度出现在几天后。如果气温在这之后都不会高，请在该位置用 0 来代替。
 * 示例:
 * 输入: temperatures = [73,74,75,71,69,72,76,73]
 * 输出: [1,1,4,2,1,1,0,0]
 * 题目理解：
 * 初始化一个数组，假设温度都是0
 * 遍历数组，记录天以及该天高温度。
 * 遍历结束，记录一个max一个max，如果temps[i] > temps[i-1]，我们说第i天没有超越第(i-1)天。说明上一天的温度都小于等于(i-1)天高温度。
 */
var dailyTemperatures = function (temperatures) {
  //栈
  let n = temperatures.length;
  let answer = new Array(n).fill(0);//初始化，假设后续都没出现过更高气温
  let stack = [];
  debugger
  
  for (let i = 0; i < n; i++) {//遍历数组确定answer[i]
    while (stack.length && temperatures[i] > temperatures[stack[stack.length - 1]]) {//栈中有元素，且前几天有比当前温度低的情况
      let preIndex = stack.pop();//已经找到比第preIndex天温度高的是哪天了，answer[preIndex]已经确定了，把preIndex从栈里pop出来
      answer[preIndex] = i - preIndex;//记录第preIndex天后出现高温距preIndex有多少天
    }
    stack.push(i);//answer[i]还不知道，先把i压进栈
  }
  return answer;
};

const temperatures = [73, 74, 75, 71, 69, 72, 76, 73]
console.log(dailyTemperatures(temperatures));