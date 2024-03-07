/**
 * 滑动窗口最大值
 * 给定一个数组 nums，有一个大小为 k 的滑动窗口，从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口中的k个数字。滑动窗口每次只向右移动一位，求返回滑动窗口最大值
 * 输入：nums: [1,3,-1,-3,5,3,6,7]；k: 3
 * 输出：[3, 3, 5, 5, 6, 7]
 * 
 */
function maxSlidingWindow(nums, k) {
  // window存储当前窗口中数据的下标
  const window = [];
  // result存储窗口中的最大值
  const result = [];
  for (let i = 0; i < nums.length; i++) {
    if (i - window[0] > k - 1) {
      // 剔除窗口长度超出范围时左侧的最大值
      window.shift(); 
    }
    for (let j = window.length - 1; j >= 0; j--) {
      // 当前窗口的值依次和要插入的值做比较，如果小于要插入的值，剔除掉该值，直到window为空为止（保证window中最左侧的值为最大值）
      if (nums[window[j]] <= nums[i]) {
        window.pop();
      }
    }
    // 添加右侧新加入的值，插入新值时有两种情况：
    // 1、新值为最大值时，则window此时为空；
    // 2、新值不为最大值时，window已剔除掉比新值小的值
    window.push(i);
    if (i >= k - 1) {
      // 窗口是从0开始移动，当移动的距离大于等于目标范围后，以后再往后移动一次，就要写入当前窗口的最大值
      result.push(nums[window[0]]);
    }
  }
  return result;
}
const nums=[1,3,-1,-3,5,3,6,7], k=3;
console.log(maxSlidingWindow(nums, k))