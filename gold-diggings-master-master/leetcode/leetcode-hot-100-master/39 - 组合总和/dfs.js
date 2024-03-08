/*
 * @lc app=leetcode.cn id=39 lang=javascript
 *
 * [39] 组合总和
 */

// @lc code=start
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
  // index 参数是标记当前该寻找的点，避免重复选择
  const dfs = (target, index) => {
    const result = [];

    for (let i = index; i < candidates.length; i++) {
      if (target - candidates[i] === 0) {
        // 如果 元素 === target，直接返回本身
        result.push([candidates[i]]);
      } else if (target - candidates[i] > 0) {
        // 如果除去自己还有元素要找，则继续 dfs 本身以后元素
        const rest = dfs(target - candidates[i], i);
        // 如果找到了，即rest 有长度才 push，依次 回溯到上一层
        for (let j = 0; j < rest.length; j++) {
          result.push([candidates[i], ...rest[j]]);
        }
      }
    }

    return result;
  };

  return dfs(target, 0);
};

combinationSum;
// @lc code=end
