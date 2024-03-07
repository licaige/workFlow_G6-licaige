/**
 * @param {number[]} nums
 * @return {number}
 */

let arr = [1];
var majorityElement = function (nums) {
    let result = -1
    function statisticalFieldNumber(arr) {
        return arr.reduce(function (prev, next) {
            prev[next] = (prev[next] + 1) || 1
            return prev
        }, {})
    }
    const numObj = statisticalFieldNumber(nums)
    for (let k in numObj) {
        if (numObj[k] > nums.length / 2) result = k
    }
    return result
}
console.log(majorityElement(arr));