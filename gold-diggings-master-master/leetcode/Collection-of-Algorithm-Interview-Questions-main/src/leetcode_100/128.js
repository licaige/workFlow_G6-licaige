/**
 * 最长连续序列HOT
 * https://leetcode-cn.com/problems/longest-consecutive-sequence/
 * @param {*} nums 
 * @returns 
 */
var longestConsecutive = function(nums) {
  // hash表方法
  const memo = new Set();
  // 利用hash表判断以当前值为起始点的下一个值是否在数组中
  for(let num of nums) {
      memo.add(num);
  }
  let ans = 0;
  for (let num of nums) {
      // 枚举一个连续序列的最大长度需要从序列的第一个元素开始枚举
      // 所以如果当前值的前一个值也是连续序列的值，说明当前值不是序列的开始，跳过此次枚举
      if (!memo.has(num-1)) {
          let cur = num;
          // 以当前位置的值进行枚举，找到最长的序列
          while (memo.has(cur+1)) cur++;
          // 更新最长的序列，序列长度为，当前位置索引cur减去初始位置加上1
          ans = Math.max(ans, cur - num + 1);
      }
  }
  return ans;
};

module.exports = longestConsecutive;
