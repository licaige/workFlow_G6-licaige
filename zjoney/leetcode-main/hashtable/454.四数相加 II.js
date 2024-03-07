/**
 * 考察：哈希表+分组
 * @difficulty中等
 * @summary: 454. 四数相加 II
 * 给你四个整数数组 nums1、nums2、nums3 和 nums4 ，数组长度都是 n ，请你计算有多少个元组 (i, j, k, l) 能满足：
0 <= i, j, k, l < n
nums1[i] + nums2[j] + nums3[k] + nums4[l] == 0

示例:
输入：nums1 = [1,2], nums2 = [-2,-1], nums3 = [-1,2], nums4 = [0,2]
输出：2
解释：
两个元组如下：
1. (0, 0, 0, 1) -> nums1[0] + nums2[0] + nums3[0] + nums4[1] = 1 + (-2) + (-1) + 2 = 0
2. (1, 1, 0, 0) -> nums1[1] + nums2[1] + nums3[0] + nums4[0] = 2 + (-1) + (-1) + 0 = 0

题目理解：
1. 哈希表：两层循环，将两个数组的和存入哈希表，时间复杂度O(n^2)
   按照上面分析得出公式a+b=-(c+d)，
   因此先把 a+b 的值存入哈希表，然后再遍历 c+d，如果哈希表中存在 -(c+d) 的值，就说明存在 a+b=-(c+d) 的情况
 */

var fourSumCount = function (nums1, nums2, nums3, nums4) {
  let abMap = new Map();
  for (let i of nums1) {
    for (let j of nums2) {
      if (abMap.has(i + j)) {
        abMap.set(i + j, abMap.get(i + j) + 1);
      } else {
        abMap.set(i + j, 1);
      }
    }
  }
  let res = 0;
  for (let m of nums3) {
    for (let n of nums4) {
      if (abMap.has(-(m + n))) {
        res += abMap.get(-(m + n));
      }
    }
  }
  return res;
};
console.log(fourSumCount([1, 2], [-2, -1], [-1, 2], [0, 2]));// 2
