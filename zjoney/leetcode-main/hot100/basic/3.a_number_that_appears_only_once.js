/**
 * 考察: 哈希集/数组
 * @difficulty简单
 * @summary:136. 只出现一次的数字
 * 给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。
 * 说明：
 * 你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？
 * 示例：
 * 输入: [2,2,1]
 * 输出: 1
 * 题目理解：
 * 按位异或知识点考察，相同为0，不同1
 */
var singleNumber = function (nums) {
  // 注意，这里为0而不是其它值得原因并不是盲目的：甲^0得到甲，甲^甲得到0
  let result = 0;
  for (const num of nums) {
    // ^ 为提供的按位异或操作符，而 ^= 相似 += ,其效果等价于 result = result ^ nums[i]
    result ^= num;
  }  
  return result;
};

const nums = [2, 2, 1];
console.log(singleNumber(nums)); // 1