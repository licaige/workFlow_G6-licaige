/**
 * 寻找两个正序数组中的中位数HOT
 * https://leetcode-cn.com/problems/median-of-two-sorted-arrays/
 * @param {*} nums1 
 * @param {*} nums2 
 * @returns 
 */
// 1. 合并数组，找中位数
var findMedianSortedArrays = function(nums1, nums2) {
  const res = nums1.concat(nums2).sort((a, b) => a - b);
  const mid = res.length >> 1;
  let ans = 0;
  if (res.length % 2 === 0) {
      ans = (res[mid-1] + res[mid]) / 2;
  } else {
      ans = res[mid];
  }
  return ans;
};

// 找到中位数的下标，使用双指针
var findMedianSortedArrays = function(nums1, nums2) {
  const m = nums1.length;
  const n = nums2.length;
  const len = m + n;
  const mid = Math.floor(len / 2);
  let l1 = 0, l2 = 0;
  let midNum1 = 0, midNum2 = 0;
  while (l1 < m || l2 < n) {
    let cur = 0;
    if (l1 >= m || nums2[l2] <= nums[l1]) {
      cur = nums2[l2++];
    } else if (l2 >= n || nums1[l1] < nums2[l2]) {
      cur = nums1[l1++];
    }
    if (index === mid - 1) {
      midNum1 = cur;
    } else if (index === mid) {
      midNum2 = cur;
    }
  }
  return len % 2 === 0 ? (midNum1 + midNum2) / 2 : midNum2;
}

// 3. 太难了，看不明白
