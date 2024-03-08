/**
 * 全排列2
 * https://leetcode-cn.com/problems/permutations-ii/
 * @param {*} nums 
 * @returns 
 */
var permuteUnique = function(nums) {
  const ans = [];
  const used = [];
  const backtrack = (idx, arr) => {
      if (idx === nums.length) {
          ans.push(arr.slice());
          return;
      }
      for(let i = 0; i < nums.length; i++) {
          if (used[i] || (i > 0 && nums[i] === nums[i - 1] && !used[i-1])) continue;
          arr.push(nums[i]);
          used[i] = true;
          backtrack(idx+1, arr);
          arr.pop();
          used[i] = false;
      }
  }
  nums.sort((a, b) => a - b);
  backtrack(0, []);
  return ans;
};

console.log(permuteUnique([3,3,0,3]));
