/**
 * 除自身以外数组的乘积HOT
 * https://leetcode.cn/problems/product-of-array-except-self/description/
 * @param {*} nums
 * @returns
 */
var productExceptSelf = function(nums) {
  const n = nums.length;
  // prefix[i] 表示[0,i-1]的乘积
  const prefix = [];
  // 初始i为0，左边没有值，所以默认为1
  prefix[0] = 1;
  // suffix[i] 表示[i+1, n-1]的乘积
  const suffix = [];
  // 同理suffix[n-1] 右边已经没有值了，所以默认为1
  suffix[n-1] = 1;
  // 获取前缀乘积
  for (let i = 1; i < n; i++) {
      prefix[i] = prefix[i-1] * nums[i-1];
  }
  // 获取后缀乘积
  for (let i = n - 2; i >= 0; i--) {
      suffix[i] = suffix[i+1] * nums[i+1];
  }
  // 前缀和后缀相乘得到的就是除i之外的乘积
  const ans = [];
  for (let i = 0; i < n; i++) {
      ans[i] = prefix[i] * suffix[i];
  }
  return ans;
};

// O(1)空间复杂度解法
var productExceptSelf = function(nums) {
  const n = nums.length;
  // ans 首先用来保存前缀乘积的结果
  const ans = [];
  // i为0时，左侧没有值，所以乘积为1
  ans[0] = 1;
  for (let i = 1; i < n; i++) {
      ans[i] = ans[i-1] * nums[i-1];
  }
  // 使用变量来保存当前i的后缀乘积，然后立刻和前缀乘积相乘就得到了最终的结果，不需要保存完整的后缀乘积数组
  let R = 1;
  for (let i = n - 1; i >= 0; i--) {
      ans[i] = ans[i] * R;
      // 需要更新下一次后缀乘积的结果
      R = R * nums[i];
  }
  return ans;
}
