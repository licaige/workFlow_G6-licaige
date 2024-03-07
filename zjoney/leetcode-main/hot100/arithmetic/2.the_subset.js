
/**
 * 考察：回溯
 * @difficulty中等
 * @summary:78. 子集
 * 给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集）。
 * 解集 不能 包含重复的子集。你可以按 任意顺序 返回解集。
 * 示例：
 * 输入：nums = [1,2,3]
 * 输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
 * 题目理解：
 * 列举所有组合的可能,
 */
//例子：nums = [1,2,3]
var subsets = function (nums) {
  let result = []//存放结果
  let path = []//存放一个分支的结果
  function backtracking(startIndex) {//startIndex字符递归开始的位置
    
    result.push(path.slice())//path.slice()断开和path的引用关系
    for (let i = startIndex; i < nums.length; i++) {//从startIndex开始递归
      path.push(nums[i])//当前字符推入path
      backtracking(i + 1)//startIndex向后移动一个位置 继续递归
      path.pop()//回溯状态
    }
  }
  backtracking(0)
  return result
};
const as = [1, 2, 3]
console.log(subsets(as)); 
/**
[
  [],             [ 1 ],
  [ 1, 2 ], [ 1, 2, 3 ],
  [ 1, 3 ],       [ 2 ],
  [ 2, 3 ],       [ 3 ]
]
 */
