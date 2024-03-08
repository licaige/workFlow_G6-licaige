/**
 * 合并两个有序数组
 * https://leetcode-cn.com/problems/merge-sorted-array/
 * @param {*} nums1 
 * @param {*} m 
 * @param {*} nums2 
 * @param {*} n 
 */
// 双指针，从前往后遍历
var merge = function(nums1, m, nums2, n) {
  let p1 = 0, p2 = 0;
  let ans = [];
  // 这里不能使用数组[索引]的形式判断，因为题目后面几位可能是0，中间某项也可能是0,
  // 比如[-1.0,0,0,0,0,0]，m为2，那么后面5位都是空位，留着作为合并的位置
  while(p1 < m || p2 < n) {
      if (p1 === m) {
          ans.push(nums2[p2++]);
      }
      else if (p2 === n) {
          ans.push(nums1[p1++]);
      }
      else if (nums1[p1] > nums2[p2]) {
          ans.push(nums2[p2++]);
      } else {
          ans.push(nums1[p1++]);
      }
  }

  for(let i = 0; i < ans.length; i++) {
      nums1[i] = ans[i];
  }
};

// 双指针，从后向前遍历
var merge = function(nums1, m, nums2, n) {
  let p1 = m - 1, p2 = n - 1;
  let cur;
  let tail = m + n - 1;
  while(p1 >= 0 || p2 >= 0) {
      if (p1 === -1) {
        cur = nums2[p2--];
      }
      else if (p2 === -1) {
        cur = nums1[p1--];
      }
      else if (nums1[p1] < nums2[p2]) {
        cur = nums2[p2--];
      } else {
        cur = nums1[p1--];
      }

      nums1[tail--] = cur;
  }

  console.log(nums1);
};

console.log(merge([-1,0,1,1,0,0,0,0,0],4,[-1,0,2,2,3],5));
