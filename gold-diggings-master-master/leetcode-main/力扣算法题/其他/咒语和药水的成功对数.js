//2300 咒语和药水的成功对数


// https://leetcode.cn/problems/successful-pairs-of-spells-and-potions/?envType=study-plan-v2&envId=leetcode-75



// 方案  对points进行排序  二分法找到刚好大于success的值
var successfulPairs = function (spells, potions, success) {

    points = potions.sort((a, b) => a - b)
    let res = []

    for (let spell of spells) {
        let target = Math.ceil(success / spell)
        let index = binarySearch(potions, target)

        if (index == null) {
            res.push(0)
        } else {
            res.push(points.length - index)
        }
    }

    return res
};


// 二分法找到数组中首次大于target的index
function binarySearch(arr, target) {
    let low = 0;
    let high = arr.length - 1;

    while (low <= high) {
        const mid = Math.floor((high + low) / 2);

        if (arr[mid] >= target && (mid === 0 || arr[mid - 1] < target)) { // 找到目标值范围内的第一个元素
            return mid;
        } else if (arr[mid] < target) { // 目标值在右半部分
            low = mid + 1;
        } else { // 目标值在左半部分
            high = mid - 1;
        }
    }

    return null; // 没有找到符合条件的元素
}


let spells = [15, 39, 38, 35, 33, 25, 31, 12, 40, 27, 29, 16, 22, 24, 7, 36, 29, 34, 24, 9, 11, 35, 21, 3, 33, 10, 9, 27, 35, 17, 14, 3, 35, 35, 39, 23, 35, 14, 31, 7],
    potions = [25, 19, 30, 37, 14, 30, 38, 22, 38, 38, 26, 33, 34, 23, 40, 28, 15, 29, 36, 39, 39, 37, 32, 38, 8, 17, 39, 20, 4, 39, 39, 7, 30, 35, 29, 23],
    success = 317

successfulPairs(spells, potions, success)