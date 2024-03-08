/**
 * 寻找重复树HOT
 * https://leetcode.cn/problems/find-the-duplicate-number/description/
 * @param {*} nums
 * @returns
 */
var findDuplicate = function(nums) {
  // 在指定范围内查找一个数
  // 假设获取[1,n]内每个数小于等于i的个数cnt，不重复的情况下，cnt = i
  // 存在某一个数重复的话，例如[1,3,4,2,2]，范围就是[1,4] cnt为[1,3,3,4,5]
  // 可以看出来i为1的时候，cnt = 1，为3,4,2,2的时候，cnt > i，从i=2开始，都有cnt>i
  // 所以找到cnt > i的左边界即可，二分搜索中查找左边界就是不断缩小右边界
  const n = nums.length;
  let l = 0, r = n - 1;
  while (l <= r) {
      const mid = l + ((r - l) >> 1);
      let cnt = 0;
      for (let i = 0; i < n; i++) {
          cnt += (nums[i] <= mid);
      }
      if (cnt > mid) {
          r = mid - 1;
      } else {
          l = mid + 1;
      }
  }
  return l;
};
