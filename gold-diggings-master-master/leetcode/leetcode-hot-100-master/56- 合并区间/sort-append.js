/*
 * @lc app=leetcode.cn id=56 lang=javascript
 *
 * [56] 合并区间
 */

// @lc code=start
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {

    // 首字母先排序（从大到小）
    intervals = intervals.sort((pre, next) => {
        return pre[0] - next[0]
    });

    const target = [];

    let i = 0;
    // max 记录每一项最大的值
    let max = 0;
    while (i < intervals.length) {
        // 先取当前的 0 为 第一个目标
        const temp = [...intervals[i]];
        // max 先定 1
        max = temp[1]
        // 从后面的每一项做比较
        let j = i + 1;
        while (j < intervals.length && intervals[j][0] <= max) {
            // 每一次更新最大值
            max = Math.max(max, intervals[j][1]);
            j++
        }
        temp[1] = max;
        target.push(temp);
        i = j
    }

    return target



};
// @lc code=end

