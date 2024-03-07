/**
 * 考察：归并排序
 * @difficulty 简单
 * @summary:88.合并两个有序数组
 * 给你两个按 非递减顺序 排列的整数数组 nums1 和 nums2，另有两个整数 m 和 n ，分别表示 nums1 和 nums2 中的元素数目。
请你 合并 nums2 到 nums1 中，使合并后的数组同样按 非递减顺序 排列。

输入：nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
输出：[1,2,2,3,5,6]
解释：需要合并 [1,2,3] 和 [2,5,6] 。
合并结果是 [1,2,2,3,5,6] ，其中斜体加粗标注的为 nums1 中的元素。
 */

function merge(nums1, m, nums2, n){
  let i = m - 1, j = n - 1, k = m + n - 1;
  while(i >= 0 && j >= 0){ // 从后往前比较
    if(nums1[i] >= nums2[j]){ // 谁大谁放后面
      nums1[k] = nums1[i]
      i--
      k--
    }else{ // 谁大谁放后面
      nums1[k] = nums2[j]
      j--
      k--
    }
  }
  while(j >= 0){ // 如果nums2还有剩余，直接放到nums1前面
    nums1[k] = nums2[j]
    j--
    k--
  }
  return nums1; // 返回nums1
}
const nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
console.log(merge(nums1, m, nums2, n))