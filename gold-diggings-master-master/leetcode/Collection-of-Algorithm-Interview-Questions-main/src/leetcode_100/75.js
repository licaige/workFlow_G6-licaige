/**
 * 颜色分类HOT
 * https://leetcode-cn.com/problems/sort-colors/
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
 var sortColors = function(nums) {
  /**
      分析：
      1. p0表示0移动的位置，p1表示1移动的位置
      2. 遇到1的时候，p1往后移动一位
      3. 遇到0的时候，p0、p1都需要往后移动一位
      4. 如果p0 < p1的情况，先交换当前位置和p0，再交换当前位置和p1
   */
  const n = nums.length;
  let p0 = 0, p1 = 0;
  for (let i = 0; i < n; i++) {
      if (nums[i] === 1) {
          const temp = nums[i];
          nums[i] = nums[p1];
          nums[p1] = temp;
          p1++;
      } else if (nums[i] === 0) {
          const temp = nums[i];
          nums[i] = nums[p0];
          nums[p0] = temp;
          if (p0 < p1) {
              const temp = nums[i];
              nums[i] = nums[p1];
              nums[p1] = temp;
          }
          p0++;
          p1++;
      }
  }
};

/**
  分析：
  1. p0指向0，p2指向2
  2. 当前位置为0，则交换p0与当前位置，p0后移一位
  3. 当前位置为2，交换p2与当前位置，p2前移一位
  4. p2交换以后如果当前位置还是2，则继续进行交换
  5. 如果当前位置变成了0，则进行和p0交换，如果是1，什么都不做
*/
var sortColors = function(nums) {
  const n = nums.length;
  if (n === 1) return;
  let p0 = 0, p2 = n - 1;
  for (let i = 0; i <= p2; i++) {
      while (i <= p2 && nums[i] === 2) {
          const temp = nums[i];
          nums[i] = nums[p2];
          nums[p2] = temp;
          p2--;
      }
      if (nums[i] === 0) {
          const temp = nums[i];
          nums[i] = nums[p0];
          nums[p0] = temp;
          p0++;
      }
  }
}
