/**
 * 考察：双指针/Map 数据结构
 * @difficulty中等
 * @summary:287. 寻找重复数
 * 给定一个包含 n + 1 个整数的数组 nums ，其数字都在 [1, n] 范围内（包括 1 和 n），可知至少存在一个重复的整数。
 * 假设 nums 只有 一个重复的整数 ，返回 这个重复的数 。
 * 你设计的解决方案必须 不修改 数组 nums 且只用常量级 O(1) 的额外空间。
 * 
 * 示例一
 * 输入：nums = [1,3,4,2,2]
 * 输出：2
*/

/**
 * 方法2：Map 数据结构
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function (nums) {
    debugger
    let map = new Map();
    for (let i = 0; i < nums.length; i++) {
        if (map.has(nums[i])) { // 通过键值Key  找到对应的值，如果存在就返回
            return nums[i];
        } else {
            map.set(nums[i], 1);
        }
    }
};


/**
 * 方法1：双指针
 * @param {*} nums 
 */
//  var findDuplicate = function(nums) {
//   let fast = 0;
//   let slow = 0;

//   while (1) {
//     fast = nums[nums[fast]];
//     slow = nums[slow];

//     if (slow === fast) {
//       fast = 0;
//       while(nums[slow] != nums[fast]) {
//         fast = nums[fast];
//         slow = nums[slow];
//       }
//       return nums[slow];
//     }
//   }
// };
const nums = [1, 2, 4, 3, 2]
console.log('@@', findDuplicate(nums));