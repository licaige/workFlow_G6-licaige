// 153. 寻找旋转排序数组中的最小值


// 方案 画图法 
// 题解https://leetcode.cn/problems/find-minimum-in-rotated-sorted-array/solutions/126635/er-fen-cha-zhao-wei-shi-yao-zuo-you-bu-dui-cheng-z/

// 三种情况
// 左>右>中   最小值在左边  右边范围收缩
// 中>右>左   最小值在左边  右边范围收缩
// 中>左>右   最小值在右边  左边范围收缩
// 右>中>左   递增 返回结果
// 左>中>右   递减 不可能出现
// 右>左      不能出现

// 如果这样拆分,整个图必然是不对称的

var findMin = function (nums) {

    let l = nums.length - 1
    let left = 0
    let right = l
    let mid = Math.floor((right - left) / 2)

    while (left < right) {
        if (nums[left] > nums[right] && nums[right] > nums[mid]) {
            right = mid
            mid -= Math.floor((right - left) / 2)
        }
        if (nums[mid] > nums[right] && nums[right] > nums[left]) {
            right = mid
            mid -= Math.floor((right - left) / 2)
        }
        if (nums[mid] > nums[left] && nums[left] > nums[right]) {
            left = mid
            mid += Math.floor((right - left) / 2)
        }
        if (nums[right] > nums[mid] && nums[mid] > nums[left]) {
            break
        }
        // 当left与left差值为1时,结束
        if (right - left == 1) break
    }

    // 循环结束
    return Math.min(nums[left], nums[right])
};

console.log(findMin([11, 13, 15, 17]));