/**
 * 找到所有数组中消失的数字HOT
 * https://leetcode-cn.com/problems/find-all-numbers-disappeared-in-an-array/
 * @param {*} nums 
 * @returns 
 */
var findDisappearedNumbers = function(nums) {
  const n = nums.length;
  for (let num of nums) {
      const x = (num - 1) % n;
      nums[x] += n;
  }
  const ans = [];
  for (let [i, num] of nums.entries()) {
      if (num <= n) {
          ans.push(i+1);
      }
  }
  return ans;
};

// console.log(findDisappearedNumbers([4,3,2,7,8,2,3,1]));

module.exports = findDisappearedNumbers;
