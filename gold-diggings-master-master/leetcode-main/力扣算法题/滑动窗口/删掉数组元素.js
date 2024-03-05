
//1493. 删掉一个元素以后全为 1 的最长子数组
// https://leetcode.cn/problems/longest-subarray-of-1s-after-deleting-one-element/?envType=study-plan-v2&envId=leetcode-75


// 同最大连续1的个数 III几乎一样
// https://leetcode.cn/problems/max-consecutive-ones-iii/description/

var longestSubarray = function (nums) {
    // 边界判断
    
    let left = 0
    let right = 0
    let zeroCount = nums[0] == 0 ? 1 : 0
    let result = 0



    while (right < nums.length - 1) {
        right++

        if (nums[right] == 0) {
            zeroCount++
        }
        // 移动指针后0数量超过, 则左指针持续收缩,直至0数量正常
        if (zeroCount > 1) {
            while (zeroCount > 1) {
                left++
                if (nums[left - 1] == 0) {
                    zeroCount--
                }
            }
        }

        // 计算当前窗口大小
        result = Math.max(result, right - left + 1)

    }

    return result - 1

};


