/**
 * 考察：双指针
 * @difficulty 中等
 * @summary:15. 三数之和
 * 给你一个整数数组 nums ，判断是否存在三元组 [nums[i], nums[j], nums[k]] 满足 i != j、i != k 且 j != k ，同时还 * 满足 nums[i] + nums[j] + nums[k] == 0 。请
 * 你返回所有和为 0 且不重复的三元组。
 * 注意：答案中不可以包含重复的三元组。
 * 
 * 示例 1：
 * 输入：nums = [-1,0,1,2,-1,-4]
 * 输出：[[-1,-1,2],[-1,0,1]]
 * 解释：
 * nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0 。
 * nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0 。
 * nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0 。
 * 不同的三元组是 [-1,0,1] 和 [-1,-1,2] 。
 * 注意，输出的顺序和三元组的顺序并不重要。
 * 题目理解：如下
 */
/**
 * 先对数组排序，对外层循环，注意去重，然后再用左右指针向中间收敛（还是要注意去重）去做two sum
 * 时间复杂度 O(n^2) 空间复杂度 O(1)
 * @param {*} nums 
 * @returns 
 */
var threeSum = function (nums) {
  nums.sort((num1, num2) => num1 - num2);
  let result = [];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) return result; // 因为求三数之和为0，如果第一个值已经大于0，那后面不可能有解了，就直接返回结果
    if (i > 0 && nums[i] == nums[i - 1]) continue; // 去重
    let left = i + 1;
    let right = nums.length - 1;
    while (left < right) {
      if (nums[i] + nums[left] + nums[right] == 0) {
        result.push([nums[i], nums[left], nums[right]]);
        while (left < right && nums[left] == nums[left + 1]) left++; // 去重
        while (left < right && nums[right] == nums[right - 1]) right--; // 去重
        left++;
        right--;
      }
      else if (nums[i] + nums[left] + nums[right] < 0) left++;// 三数之和小于0，左指针向右移动

      else if (nums[i] + nums[left] + nums[right] > 0) right--; // 三数之和大于0，右指针向左移动
    }
  }
  return result;
}
const nums1 = [-1, 0, 1, 2, -4];
console.log(threeSum(nums1))
