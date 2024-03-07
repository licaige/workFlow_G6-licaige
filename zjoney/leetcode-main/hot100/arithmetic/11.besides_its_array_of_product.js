/**
 * 考察：数组
 * @difficulty中等
 * @summary:238. 除自身以外数组的乘积
 * 给你一个整数数组 nums，返回 数组 answer ，其中 answer[i] 等于 nums 中除 nums[i] 之外其余各元素的乘积 。
 * 题目数据 保证 数组 nums之中任意元素的全部前缀元素和后缀的乘积都在  32 位 整数范围内。
 * 请不要使用除法，且在 O(n) 时间复杂度内完成此题。
 * 
 * 示例 1:
 * 输入: nums = [1,2,3,4]
 * 输出: [24,12,8,6]
 */
var productExceptSelf = function(nums) {
  let pro = 1,
      res = [];
      debugger
  for(let i = nums.length - 1; i >= 0; i--){
      if(i == nums.length - 1) res[i] = 1;
      else res[i] = nums[i + 1] * res[i + 1];
  }
  for(let i = 0; i < nums.length; i++){
      res[i] = pro * res[i];
      pro *= nums[i];
  }
  return res;
};
console.log(productExceptSelf([1,2,3,4]));
