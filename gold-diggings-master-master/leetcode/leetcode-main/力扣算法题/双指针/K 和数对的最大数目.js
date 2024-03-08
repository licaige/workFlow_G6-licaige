
// 1679. K 和数对的最大数目
// https://leetcode.cn/problems/max-number-of-k-sum-pairs/?envType=study-plan-v2&envId=leetcode-75


// 每次从数组中选出两个数字 和为 k
// 从数组中删除两个数字
// 求最大操作数量


// 方案一 排序后双指针
// 1 2  4 5 6 7 10

var maxOperations = function (nums, k) {
    nums = nums.sort((a, b) => a - b)

    let left = 0
    let right = nums.length - 1
    let opCount = 0
    // 依次移动左右指针  进行检查
    // 左指针右移动  sum+
    // 右指针左移    sum-

    while (left < right) {
        let sum = nums[left] + nums[right]

        // 如果相等  指针移动即可
        if (sum == k) {
            left++;
            right--;
            opCount++
        }

        else if (sum > k) {
            right--
        }

        else if (sum < k) {
            left++
        }
    }

    return opCount
};


let arr = [1, 2, 4, 5, 6, 7, 10]
maxOperations(arr, 12)