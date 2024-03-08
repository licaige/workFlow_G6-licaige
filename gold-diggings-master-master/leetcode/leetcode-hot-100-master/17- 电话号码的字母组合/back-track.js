/*
 * @lc app=leetcode.cn id=17 lang=javascript
 *
 * [17] 电话号码的字母组合
 */

// @lc code=start
/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
    if (!digits) {
        return []
    }
    const map = new Map();
    map.set('2', ['a', 'b', 'c']);
    map.set('3', ['d', 'e', 'f']);
    map.set('4', ['g', 'h', 'i']);
    map.set('5', ['j', 'k', 'l']);
    map.set('6', ['m', 'n', 'o']);
    map.set('7', ['p', 'q', 'r', 's']);
    map.set('8', ['t', 'u', 'v']);
    map.set('9', ['w', 'x', 'y', 'z']);
    // 晦朔也是 dfs 
    // 先一路踩到底，再回来一步，再踩
    // 再回来一步，继续踩到底
    const backTrack = (result, index, stack) => {
        if (index >= digits.length) {
            result.push(stack.join(''))
            return
        }
        const arr = map.get(digits[index]);
        for (let i = 0; i < arr.length; i++) {
            stack.push(arr[i])
            backTrack(result, index + 1,stack);
            stack.pop()
        }
    }

    const result = []
    backTrack(result, 0, [])
    return result


};
// @lc code=end

