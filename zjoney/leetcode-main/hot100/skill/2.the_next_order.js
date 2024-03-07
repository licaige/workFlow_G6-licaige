/**
 * 考察：双指针
 * @difficulty中等
 * @summary:31. 下一个排列
 * 整数数组的一个 排列  就是将其所有成员以序列或线性顺序排列。
 * 例如，arr = [1,2,3] ，以下这些都可以视作 arr 的排列：[1,2,3]、[1,3,2]、[3,1,2]、[2,3,1] 。
 * 整数数组的 下一个排列 是指其整数的下一个字典序更大的排列。更正式地，如果数组的所有排列根据其字典顺序从小到大排列在一个容器中，那么数组的 下一个排列 就是在这个有序容器中排在它后面的那个排列。如果不存在下一个更大的排列，那么这个数组必须重排为字典序最小的排列（即，其元素按升序排列）。
 * 例如，arr = [1,2,3] 的下一个排列是 [1,3,2] 。
 * 类似地，arr = [2,3,1] 的下一个排列是 [3,1,2] 。
 * 而 arr = [3,2,1] 的下一个排列是 [1,2,3] ，因为 [3,2,1] 不存在一个字典序更大的排列。
 * 给你一个整数数组 nums ，找出 nums 的下一个排列。
 * 必须 原地 修改，只允许使用额外常数空间。
 * 
 * 示例 1：
 * 输入：nums = [1,2,3]
 * 输出：[1,3,2]
 * 思路：双指针
 *  1.设置两个指针：pre 和 cur
 *  2.pre 的初始值为数组长度，cur 初始值为 0
 *  3.如果 nums[cur] < nums[pre] ，说明 cur 到 pre 的比较元素小，将 cur 指向 pre ，更新 pre 的值为 cur+1
 *  4.如果 nums[cur] > nums[pre] ，说明 cur 到 pre 的比较元素大，将 cur 指向 pre ，更新 pre 的值为 cur-1
 *  5.此时 pre = cur
 *  update:
 *  从后向前查找第一个相邻升序的元素对 (i,j)，满足 A[i] < A[j]。此时 [j,end) 必然是降序
 * 在 [j,end) 从后向前查找第一个满足 A[i] < A[k] 的 k。A[i]、A[k] 分别就是上文所说的「小数」、「大数」
 * 将 A[i] 与 A[k] 交换
 * 可以断定这时 [j,end) 必然是降序，逆置 [j,end)，使其升序
 * 如果在步骤 1 找不到符合的相邻元素对，说明当前 [begin,end) 为一个降序顺序，则直接跳到步骤 4
 */
var nextPermutation = function(nums) {
  debugger; 
  if (nums.length <= 1) {
      return
  }
  let leftHand
  debugger; 
  for (let i = nums.length - 2; i >= 0; i--) {
      if (nums[i] < nums[i + 1]) {
          leftHand = i
          break
      }
  }
  for (let i = nums.length - 1; i > leftHand; i--) {
      if (nums[i] > nums[leftHand]) {
          [nums[i], nums[leftHand]] = [nums[leftHand], nums[i]]
          let chopped = nums.splice(leftHand + 1)
          chopped.reverse()
          nums.push(...chopped)
          return
      }
  }
  nums.sort((a, b) => a - b)
};
const nums = [1,2,3];
console.log(nextPermutation(nums));
