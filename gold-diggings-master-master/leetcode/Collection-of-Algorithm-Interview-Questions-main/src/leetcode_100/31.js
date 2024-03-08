/**
 * 下一个排列HOT
 * https://leetcode.cn/problems/next-permutation/
 * @param {*} nums 
 */
var nextPermutation = function(nums) {
  /**
   * 思路：
   * 要想找到当前序列的下一个序列
   * 1. 首先从后往前遍历，找到一个右侧较大的数，和它前面较小的数进行交换，比如123465，下一个应该交换4和5
   * 2. 要保证交换以后的序列尽可能的小，那么就需要把较大的数的右侧的序列按照升序排列，这样就是最小的
   */
  const n = nums.length;
  const swrap = (arr, i, j) => {
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
  };
  const reverse = (arr, start) => {
      let l = start, r = n - 1;
      while (l < r) {
          swrap(arr, l , r);
          l++;
          r--;
      }
  };
  // 表示倒数第二个数，为了和后一个数做比较
  let i = n - 2;
  // 找到一个数对，左边的数比右边的数小的数对
  while (i >= 0 && nums[i] >= nums[i+1]) {
      i--;
  }
  if (i >= 0) {
      // 此时再比较[i, n-1]这个区间中的数对，找到一个左边数比右边数小的数对
      let j = n - 1;
      while (j >= 0 && nums[i] >= nums[j]) {
          j--;
      }
      // 进行交换
      swrap(nums, i, j);
  }
  reverse(nums, i+1);
};
