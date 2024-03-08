/**
 * 三数之和HOT
 * https://leetcode-cn.com/problems/3sum/
 * @param {*} nums 
 * @returns 
 */
// 排序+双指针，通过固定第一位数，利用双指针找到剩下的两个数
var threeSum = function (nums) {
  const ans = [];
  const len = nums.length;
  if (len < 3) return [];
  // 先进行排序
  nums.sort((a, b) => a - b);
  for (let i = 0; i < len; i++) {
    // 对于排序好的数组，如果当前项的值大于0，那么它后面的值都是大于0的，因此不存在和为0的三个数
    if (nums[i] > 0) break;
    // 如果当前项的值和前一项相等，那么此时的结果也会和上次遍历的结果相同，所以需要去重
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    // 注意要是这么做的话，则不同位置相同的值会被过滤掉
    // if (nums[i] === nums[i + 1]) continue;
    // 定义左右双指针
    let l = i + 1,r = len - 1;
    while (l < r) {
      const sum = nums[i] + nums[l] + nums[r];
      if (sum === 0) {
        ans.push([nums[i], nums[l], nums[r]]);
        // 这里找到双指针的位置以后，判断下一个位置是否和当前位置的值相同，相同的话则同样需要去重
        while (l < r && nums[l] === nums[l + 1]) l++;
        while (l < r && nums[r] === nums[r - 1]) r++;
        l++;
        r--;
      } else if (sum > 0) {
        r--;
      } else {
        l++;
      }
    }
  }
  return ans;
};

console.log(threeSum([1, -1, -1, 0]));
