/*
 * @lc app=leetcode.cn id=448 lang=javascript
 *
 * [448] 找到所有数组中消失的数字
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDisappearedNumbers = function (nums) {


    const dfs = (value) => {

        let temp = nums[value - 1]
        if (!temp) {
            return
        }
        nums[value - 1] = 0;
        dfs(temp)
    }



    for (let i = 0; i < nums.length; i++) {

        if (nums[i] !== 0) {
            dfs(nums[i])
        }

    }
    let res = [];

    let a;

    for (let i = 0; i < nums.length; i++) {

        if (nums[i] !== 0) {
            res.push(i + 1)
        }

    }
    return res

};
// @lc code=end

