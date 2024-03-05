// 面试题 10.11. 峰与谷

//在一个整数数组中，“峰”是大于或等于相邻整数的元素，
//相应地，“谷”是小于或等于相邻整数的元素。

// 例如，在数组{5, 8, 4, 2, 3, 4, 6}中，{8, 6}是峰， {5, 2}是谷。
//现在给定一个整数数组，将该数组按峰与谷的交替顺序排序。


// 输入: [5, 3, 1, 2, 3]
// 输出: [5, 1, 3, 2, 3]

// 方案 
// 那么先将数组从小到大排序，排序后将数组后半部分依次间隔插入前半部分即可

// 123456
// 615243



// 伪代码  无法通过测试
var wiggleSort = function (nums) {
    let sortedNums = [...nums].sort()

    let idx = 0
    let left = 0
    let right = nums.length - 1

    while (left <= right) {
        if (left == right) {
            nums[idx] = sortedNums[left]
        } else {
            nums[idx] = sortedNums[left]
            idx++
            nums[idx] = sortedNums[right]
            idx++
        }

        left++
        right--
    }

    return nums
};


wiggleSort([1, 2, 3])