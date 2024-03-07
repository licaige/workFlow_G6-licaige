/**
 * 考察：哈希表
 * @difficulty简单
 * @summary:560. 和为 K 的子数组
 * 给你一个整数数组 nums 和一个整数 k ，请你统计并返回 该数组中和为 k 的连续子数组的个数 。
 * 
 * 输入：nums = [1,1,1], k = 2
 * 输出：2
 */
var subarraySum = function(nums, k) {
  let res = 0;
  let map = new Map;
  debugger
  //保存当前位置的前缀和
  let sum = 0;
  //前缀和存储到map中
  map.set(0,1);
  for(let i = 0; i < nums.length; i++){
      //因为第一个前缀和已处理，所以跳过第一个
      if(i !== 0){
          sum += nums[i - 1];
          map.set(sum, map.has(sum) ? map.get(sum) + 1 : 1);
      }
      //查看和（累加到当前值 - k）相等的i之前的前缀和有多少个，并累加到结果中
      res += map.has(sum + nums[i] - k) ? map.get(sum + nums[i] - k) : 0;
  }
  return res;
};
