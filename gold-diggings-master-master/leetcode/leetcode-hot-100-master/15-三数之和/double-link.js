/*
 * @lc app=leetcode.cn id=15 lang=javascript
 *
 * [15] 三数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {

    if (nums.length < 3) {
        return []
    }

    const res = []

    let midZ = false;
    let f = false

    const array = [...nums].sort((pre,next)=>{
        return pre - next
    });
    const n = array.length;

    let left = 0;
    let right = n - 1
    for (let i = 1; i < n - 1; i++) {
        
        if(array[i]<0&&array[i+1]===array[i]){
            continue
        }

        if(array[i]>0&&array[i-1]===array[i]){
            continue
        }

        if(!f&&array[i] === array[i-1]&&array[i-1] === array[i+1]&&array[i+1]===0){
            res.push([0,0,0])
            f = true
            continue
        }
        if(midZ&& array[i]===0 ){
            continue
        }
        if(array[i]===0){
            midZ = true
        }
        left = 0;
        right = n - 1;
        while (left < i && right > i) {
            const sum = array[left] + array[i] + array[right];
            if (sum === 0 ) {
                if( array[left]!==0||array[i]!==0||array[right]!==0){
                    res.push([array[left], array[i], array[right]])
                }
                while(array[left+1]===array[left]){
                    left++
                }
                while(array[right-1]===array[right]){
                    right--
                }
                left++
            } else if (sum < 0) {
                left++
            } else if (sum > 0) {
                right--
            }
        }

    }
    return res

};
// @lc code=end

