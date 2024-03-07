/**
 * 考察:单调栈
 * @difficulty困难
 * @summary 239. 滑动窗口最大值
 * 给你一个整数数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。
 * 你只可以看到在滑动窗口内的 k 个数字。滑动窗口每次只向右移动一位。返回 滑动窗口中的最大值 。
 * 输入：nums = [1,3,-1,-3,5,3,6,7], k = 3
 * 输出：[3,3,5,5,6,7]
 * 解释：
 * 滑动窗口的位置 最大值
 * ---------------               -----
 * [1  3  -1] -3  5  3  6  7       3
 *  1 [3  -1  -3] 5  3  6  7       3
 *  1  3 [-1  -3  5] 3  6  7       5
 *  1  3  -1 [-3  5  3] 6  7       5
 *  1  3  -1  -3 [5  3  6] 7       6
 *  1  3  -1  -3  5 [3  6  7]      7
 *  题目理解：
 *  1、「滑动窗口中的最大值」，使用「单调递减队列来进行解决」.
 *  2、窗口大小为 k，所以当窗口右端点下标为 r 时，当前窗口最大值的元素下标范围为 [r-k+1, r].
 *  3、制定「队首」弹出元素的规则，即当「队尾元素的下标 - 队首元素的下标 + 1」大于 k 时，弹出「队首」元素。
 *  单调递增查看[image/the_maximum_sliding_window_stack.gif]
 *  单调递减查看[image/the_maximum_sliding_window.gif]
 */
 var maxSlidingWindow = function (nums, k) {
    
    const q = [];//单递减的双端队列
    const res = [];debugger;
    //最后的返回结果
    for (let i = 0; i < nums.length; i++) {//循环nums
        debugger
        //当进入滑动窗口的元素大于等于队尾的元素时 不断从队尾出队，
        //直到进入滑动窗口的元素小于队尾的元素，以保证单调递减的性质
        while (q.length && nums[i] >= nums[q[q.length - 1]]) {
            q.pop();
        }
        q.push(i);//元素的索引入队
        while (q[0] <= i - k) {//队头元素已经在滑动窗口外了，移除对头元素
            q.shift();
        }
        //当i大于等于k-1的时候，单调递减队头就是滑动窗口的最大值
        if (i >= k - 1) res.push(nums[q[0]]);
    }
    return res;
};

const nus = [1, 3, -1, -3, 5, 3, 6, 7], k = 3;
console.log(maxSlidingWindow(nus, k)); // [3,3,5,5,6,7]
