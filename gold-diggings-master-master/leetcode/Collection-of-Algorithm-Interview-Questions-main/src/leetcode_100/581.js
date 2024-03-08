/**
 * 最短无序连续子数组HOT
 * https://leetcode.cn/problems/shortest-unsorted-continuous-subarray/description/
 * @param {*} nums 
 * @returns 
 */
var findUnsortedSubarray = function(nums) {
  /**
      1. 先对数组进行升序排序
      2. 排序后的数组和原数组进行对比
      3. 确认首尾相同的位置，则中间的数组就是需要排序的数组
      原数组 2,6,4,8,10,9,15
      排序后 2,4,6,8,9,10,15
   */
   const sortedArr = [...nums];
   let l = 0, r = 0;
   const n = nums.length;

   sortedArr.sort((a, b) => a - b);
   for (let i = 0; i < n; i++) {
       if (nums[i] !== sortedArr[i]) { 
           l = i;
           break;
       }
   }
   for (let i = n - 1; i >= 0; i--) {
       if (nums[i] !== sortedArr[i]) {
           r = i;
           break;
       }
   }
   // 完全相等，说明数组已经是升序排序的
   if (r === 0) return 0;

   return r - l + 1;
};

var findUnsortedSubarray = function(nums) {
  /**
      1. nums分为三个部分、nums1,nums2,nums3
      2. nums2、nums3中任意数都大于nums1中的数
      3. 同理nums1,nums2中的数都小于nums3中的数
   */
  let max = -Number.MAX_VALUE;
  let min = Number.MAX_VALUE;
  let l = -1, r = -1;
  const n = nums.length;

  for (let i = 0; i < n; i++) {
      if (max > nums[i]) {
          r = i;
      } else {
          max = nums[i];
      }

      if (min < nums[n - i - 1]) {
          l = n - i - 1;
      } else {
          min = nums[n - i - 1];
      }
  }

  return r === -1 ? 0 : r - l + 1;
}

console.log(findUnsortedSubarray([2,6,4,8,10,9,15]));
