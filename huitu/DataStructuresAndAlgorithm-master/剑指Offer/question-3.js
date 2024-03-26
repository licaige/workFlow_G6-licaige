/*
 * @Author: Li-HONGYAO
 * @Date: 2021-04-19 15:26:22
 * @LastEditTime: 2021-04-19 15:47:30
 * @LastEditors: Li-HONGYAO
 * @Description:
 * @FilePath: \剑指Offer\question-3.js
 */
/*
找出数组中重复的数字。


在一个长度为 n 的数组 nums 里的所有数字都在 0～n-1 的范围内。数组中某些数字是重复的，但不知道有几个数字重复了，也不知道每个数字重复了几次。请找出数组中任意一个重复的数字。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/shu-zu-zhong-zhong-fu-de-shu-zi-lcof
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。*/

var findRepeatNumber = function (nums) {
  try {
    if (Array.isArray(nums)) {
      nums.reduce((prev, cur) => {
        if(prev[cur]) {
          res = cur;
          throw(cur)
        }else {
          prev[cur] = true;
          return prev;
        }
      }, {});
    } else {
      return -1;
    }
  } catch (res) {
    return res;
  }
};

findRepeatNumber([2, 3, 1, 0, 2, 5, 3])
