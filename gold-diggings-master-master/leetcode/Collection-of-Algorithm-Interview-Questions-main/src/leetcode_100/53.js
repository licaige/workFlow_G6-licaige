/**
 * 最大子数组和HOT
 * https://leetcode-cn.com/problems/maximum-subarray/
 * @param {*} nums 
 * @returns 
 */
var maxSubArray = function(nums) {
  /**
      暴力解法，超时了
      动态规划
      dp[i]表示从0到i的最大连续和，注意并不是整个数组的最大连续和，所以还需要一个值来记录最大和
      dp[i] = Math.max(dp[i-1]+nums[i], nums[i]); 
   */
  const n = nums.length;
  const dp = new Array(n).fill(0);
  dp[0] = nums[0];
  let ans = nums[0];
  for (let i = 1; i < n; i++) {
      dp[i] = Math.max(dp[i-1] + nums[i], nums[i]);
      ans = Math.max(ans, dp[i]);
  }
  return ans;
};

// 动态规划只和前一个值有关
var maxSubArray = function(nums) {
  // 记录以i结尾的数组的最大值，并不是整个数组中连续子数组的最大值
  let prev = 0;
  // 要想求得整个数组中的连续最大子数组，还需要比较每个以i结尾的数组的最大值中的最大值
  let ans = nums[0];
  for (let num of nums) {
    // 记录以i结尾的数组的最大值
    prev = Math.max(prev + num, num);
    // 记录每个以i结尾的最大值中的最大值
    ans = Math.max(prev, ans);
  }
  return ans;
}

/**
 * 分治法
 */
function Status(l, r, i, m) {
  this.lSum = l; // [l,r]内以l为左端点的最大子段和
  this.rSum = r; // [l,r]内以r为右端点的最大子段和
  this.iSum = i; // [l,r]内的区间和
  this.mSum = m; // [l,r]内的最大子段和
}

function pushUp(l, r) {
  // m为[l,r]的中点,[l,m]为左半部分区间,[m+1,r]为右半部分区间
  // [l,r]内的区段和就是左半部分区间的区间和加上右半部分的区间和
  const iSum = l.iSum + r.iSum;
  // [l,r]内l为左端点的区段和为
  // 左半部分区间以l为左端点的最大区段
  // 左半部分区间的区段和加上右半部分以m+1为左端点的最大区段和
  // 取两者中的大值
  const lSum = Math.max(l.lSum, l.iSum + r.lSum);
  // 同理
  const rSum = Math.max(r.rSum, r.iSum + l.rSum);
  // 
  const mSum = Math.max(Math.max(l.mSum, r.mSum), l.rSum + r.lSum);
  return new Status(lSum, rSum, iSum, mSum);
}

function getInfo(a, l, r) {
  // 区间长度为1的情况下，所有维护的区段和都是相等的
  if (l === r) {
    return new Status(a[l], a[l], a[l], a[l]);
  }
  const m = (l + r) >> 1;
  const lSub = getInfo(a, l, m);
  const rSub = getInfo(a, m+1, r);
  return pushUp(lSub, rSub);
}

var maxSubArray = function(nums) {
  return getInfo(nums, 0, nums.length - 1).mSum;
}

var nums = [-2,1,-3,4,-1,2,1,-5,4];
console.log(maxSubArray(nums));
