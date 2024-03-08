// 给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。
// 如果目标值不存在于数组中，返回它将会被按顺序插入的位置。

// 输入: nums = [1,3,5,6], target = 5
// 输出: 2

// 输入: nums = [1,3,5,6], target = 7
// 输出: 4


// 判断是否存在  存在直接返回index 
// 不存在 先插入元素  sort重新排序  再次查找index
var searchInsert = function (nums, target) {
    let index = nums.indexOf(target)
    if (index === -1) {
        nums.push(target)
        nums.sort((n1,n2)=>{ return n1-n2 })
    } 
    return index = nums.indexOf(target)
};


let nums1 = [1, 3, 5, 6],
    target1 = 7
console.log(searchInsert1(nums1, target1));