/**
 * 组合总和HOT
 * https://leetcode-cn.com/problems/combination-sum/
 * @param {*} candidates 
 * @param {*} target 
 * @returns 
 */
var combinationSum = function(candidates, target) {
  const ans = [];
  /**
   * 回溯
   * 1. 如何判断每次回溯的结束条件
   * 2. 注意索引超出数组长度时要退出回溯
   * 3. 做出选择，如果选择当前数为构成组合，不选择当前数
   * 4. 选择当前数组合的时候，索引不变，因为每个数都可以重复使用
   * @param {*} target 目标和
   * @param {*} nums 当前得到的组合
   * @param {*} index candidate中的索引
   */
  const backtrace = (target, nums, index) => {
    // 如果索引已经超出给定数组的长度，说明已经遍历结束了
    // if (index === candidates.length) return;
    // 如果目标和为0，说明当前的组合满足条件，则加入结果数组中
    if (target === 0) {
        ans.push(nums);
        return;
    }
    // 进行选择，如果不选当前索引的值
    backtrace(target, nums, index+1);
    // 如果选择当前值，则目标值需减去当前值会得到一个新的目标值，并把该值加入组合中
    const remaining = target - candidates[index];
    // 判断剩余目标值是否大于等于0，为什么要加上等于？没有等于的话，不会进入上面的步骤
    if (remaining >= 0) {
        // 注意这里idx不变，因为每个数可以使用多次
        backtrace(remaining, [...nums, candidates[index]], index);
    }
  };
  backtrace(target, [], 0);
  return ans;
};

const data = [2,3,6,7,8,10,12,44,80,102,29,12,33,21,31,4,5,12,34,2,3,11,23,44,8,6,4,3,1,2];
console.log(combinationSum(data, 7));
