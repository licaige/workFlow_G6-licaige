// 面试题 10.03. 搜索旋转数组


// 思路  两次二分查找
// 先二分法找到旋转点
// 然后判断target在左边还是右边
// 最后对这一部分再次二分搜索

var search = function (arr, target) {
    let len = arr.length
    let left = 0
    let right = len - 1
    //去重
    while (right > 0 && arr[0] == arr[right]) right--;
    //用二分找到原数组最后的元素（首尾相连点）
    //这样左侧和右侧各是一个升序数组
    while (left < right) {
        let mid = Math.floor((right - left + 1) / 2) + left
        if (arr[mid] >= arr[0]) {
            left = mid
        } else {
            right = mid - 1
        }
    }
    //判断target在翻折点的左侧还是右侧
    if (arr[0] > target) {
        left += 1
        right = len - 1
    } else {
        left = 0
    }
    while (left < right) {
        let mid = Math.floor((right - left) / 2) + left
        if (arr[mid] >= target) {
            right = mid
        } else {
            left = mid + 1
        }
    }
    return arr[right] == target ? right : -1
};



// 讲道理也不是很慢  但是数组过长时差距会很明显 
var search = function (arr, target) {
    let res = -1

    for (let i = 0; i < arr.length; i++) {
        if (target == arr[i]) {
            res = i
            break
        }
    }

    return res
}