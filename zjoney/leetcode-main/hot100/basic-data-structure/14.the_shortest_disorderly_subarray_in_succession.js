/**
 * 考察:单调栈
 * @difficulty 中等
 * @summary 581. 最短无序连续子数组
 * 给你一个整数数组 nums ，你需要找出一个 连续子数组 ，如果对这个子数组进行升序排序，那么整个数组都会变为升序排序。
 * 
 * 请你找出符合题意的 最短 子数组，并输出它的长度。
 * 示例一：
 * 输入：nums = [2,6,4,8,10,9,15]
 * 输出：5
 * 解释：你只需要对 [6, 4, 8, 10, 9] 进行升序排序，那么整个表都会变为升序排序。
 */
var findUnsortedSubarray = function (nums) {
  var stack = [];
  var start = Infinity;
  var end = -1;
  var max = -Infinity;
  debugger
  for (var i = 0; i < nums.length; i++) {
    // 保证栈递增
    while (stack.length && (nums[stack[stack.length - 1]] > nums[i])) {
      // 保存已发现的最大值
      max = Math.max(max, nums[stack[stack.length - 1]]);
      var c = stack.pop();
      // start只能向前移动
      c < start && (start = c);
    }
    // 当前值小于已发现的max，end改为当前
    if (nums[i] < max) end = i;
    stack.push(i);
  }
  if (start > end) return 0;
  return end - start + 1;
};
const nums = [2, 6, 4, 8, 10, 9, 15]
console.log(findUnsortedSubarray(nums))