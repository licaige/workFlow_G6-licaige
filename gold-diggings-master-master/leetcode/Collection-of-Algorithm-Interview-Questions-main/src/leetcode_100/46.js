/**
 * 全排列HOT
 * https://leetcode-cn.com/problems/permutations/
 * @param {*} nums 
 * @returns 
 */
var permute = function(nums) {
  // 回溯 不含重复数字
  const ans = [];
  // 备忘录，记录已使用的数字
  const backtrace = (arr, index) => {
      if (index === nums.length) {
          ans.push(arr.slice());
          return;
      }
      for (let i = 0; i < nums.length; i++) {
          if (used[nums[i]]) continue;
          arr.push(nums[i]);
          used[nums[i]] = true;
          backtrace(arr, index + 1);
          arr.pop();
          used[nums[i]] = false;
      }
  };
  backtrace([], 0);
  return ans;
};

const data = [1,2,3];
console.log(permute(data));
