/**
 * 考察：栈
 * @difficulty中等
 * @desc 496. 下一个更大元素 I
 * nums1 中数字 x 的 下一个更大元素 是指 x 在 nums2 中对应位置 右侧 的 第一个 比 x 大的元素。
 * 给你两个 没有重复元素 的数组 nums1 和 nums2 ，下标从 0 开始计数，其中nums1 是 nums2 的子集。
对于每个 0 <= i < nums1.length ，找出满足 nums1[i] == nums2[j] 的下标 j ，并且在 nums2 确定 nums2[j] 的 下一个更大元素 。如果不存在下一个更大元素，那么本次查询的答案是 -1 。
返回一个长度为 nums1.length 的数组 ans 作为答案，满足 ans[i] 是如上所述的 下一个更大元素

示例 1：
输入：nums1 = [4,1,2], nums2 = [1,3,4,2].
输出：[-1,3,-1]
题目理解：
1、正序遍历nums2.
2、如果栈不为空且当前值num2[i]大于栈顶元素,nums[i]入栈，看后面考察的元素会不会有大于nums[i]的.
3、如果栈为空，则将nums[i]入栈
4、最后，当数组都考察完毕时，如果栈不为空，说明栈中的元素没有找到下一个更大，都赋值为-1。
 */
var nextGreaterElement = function (nums1, nums2) {
  // 一. 找出 i 之后大于 nums2[i] 的第一个元素, 存进对象中
  debugger;
  let stack = []
  let obj = {}
  for (let n of nums2) {
    while (stack.length && n > stack[stack.length - 1]) { // 当前元素比栈顶大的
      let f = stack.pop() // 弹出栈顶
      obj[f] = n
    }
    stack.push(n) 
  }
  // console.log('stack', stack);
  while (stack.length) {  // 栈中留有元素 说明后面没有比它们大的了, 直接存 -1
    let f = stack.pop()
    obj[f] = -1
  }
  // 二. 根据对象, 直接得出对应的值
  let res = []
  for (let m of nums1) {
    res.push(obj[m])
  }
  return res
}
// test
let nums1 = [4, 1, 2], nums2 = [1, 3, 4, 2];
console.log(nextGreaterElement(nums1, nums2))