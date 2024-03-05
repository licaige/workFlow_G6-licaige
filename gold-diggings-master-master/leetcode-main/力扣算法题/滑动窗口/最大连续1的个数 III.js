
// 最大连续1的个数 III
// https://leetcode.cn/problems/max-consecutive-ones-iii/description/




// 方案 滑动窗口
// 比如数组 1 1 0 0 1 1 0 1 0 1 1
//          |         | 

// 右指针右移动  遇到0时, 左边指针收缩
// 右指针继续移动,持续计算窗口大小

var longestOnes = function (nums, k) {
    // 边界判断
    if (k >= nums.length) return nums.length

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
        if (zeroCount > k) {
            while (zeroCount > k) {
                left++
                if (nums[left - 1] == 0) {
                    zeroCount--
                }
            }
        }

        // 计算当前窗口大小
        result = Math.max(result, right - left + 1)

    }

    return result

};