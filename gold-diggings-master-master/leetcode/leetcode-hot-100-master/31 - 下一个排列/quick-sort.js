/*
 * @lc app=leetcode.cn id=31 lang=javascript
 *
 * [31] 下一个排列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermutation = function (nums) {

    const swap = (left, right) => {

        const temp = nums[left];
        nums[left] = nums[right];
        nums[right] = temp
    }

    const sort = (left, right) => {
        if (right < left) {
            return
        }
        let start = left;

        let end = right;
        let target = start;

        while (start <= end) {
            while (nums[start] <= nums[target] && start <= end) {
                start++
            }
            while (nums[end] >= nums[target] && start <= end) {
                end--
            }
            if (end > start) {
                swap(start, end)
            }
        }
        swap(target, end);
        sort(left, end - 1);
        sort(end + 1, right)
    }

    let min = 0;
    let max = 0;
    // 从后向前找到第一个生序相邻的坐标
    for (let i = nums.length - 1; i >= 1; i--) {
        if (nums[i] > nums[i - 1]) {
            min = i - 1;
            max = i;
            break;
        }
    }

    // 从后向前找到第一个比 nums[min] 大的坐标

    for (let i = nums.length - 1; i > max; i--) {
        if (nums[i] > nums[min]) {
            max = i;
            break
        }
    }

    // 交换 小数和大数
    swap(min, max);

    // 如果是降序排列则 把整个数组都排序
    if (min === 0 && max === 0) {
        sort(0, nums.length - 1);
        // 如果找到了，就把 小数坐标以前的都升序排列
    } else {
        sort(min + 1, nums.length - 1);
    }



};
// @lc code=end

