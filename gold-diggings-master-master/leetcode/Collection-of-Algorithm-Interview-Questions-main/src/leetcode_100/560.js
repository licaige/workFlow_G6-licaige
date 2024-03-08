/**
 * 和为k的子数组HOT
 * https://leetcode.cn/problems/subarray-sum-equals-k/description/
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
 var subarraySum = function(nums, k) {
  // 遍历nums数组中的每一个元素作为子数组的结束位置
  let ans = 0;
  for (let i = 0; i < nums.length; i++) {
      let sum = 0;
      for (let j = i; j >= 0; j--) {
          sum += nums[j];
          if (sum === k) {
              ans++;
          }
      }
  }
  return ans;
};

var subarraySum = function(nums, k) {
  let preSum = 0, ans = 0;
  const map = new Map();
  for (const num of nums) {
    preSum += num;
    if (preSum === k) {
      ans++;
    }

    if (map.has(preSum - k)) {
      ans += map.get(preSum - k);
    }

    if (map.has(preSum)) {
      map.set(preSum, map.get(preSum) + 1);
    } else {
      map.set(preSum, 1);
    }
  }

  return ans;
}

var subarraySum = function(nums, k) {
  // 前缀和+hash表
  let preSum = 0, ans = 0;
  const map = new Map();
  // 如果前缀和刚好等于k，由下面的分析可知preSum-k=0，也是和为k的一个答案，不能漏掉
  map.set(0, 1);
  for (let num of nums) {
      preSum += num;
      /**
          1. 求连续子数组的和为k就是求从位置j到i的和为k，根据上面的枚举可知
          2. [j,i]的和为k，[0,i]的和为preSum，那么[0,j-1]的和就是preSum-k
          3. 也就是说满足位置[0,j-1]的和为preSum-k就是和为k的一个答案
       */
      if (map.has(preSum - k)) {
          ans += map.get(preSum - k);
      }
      // 记录每个前缀和出现的次数
      if (map.has(preSum)) {
          map.set(preSum, map.get(preSum) + 1);
      } else {
          map.set(preSum, 1);
      }
  }
  return ans;
}
