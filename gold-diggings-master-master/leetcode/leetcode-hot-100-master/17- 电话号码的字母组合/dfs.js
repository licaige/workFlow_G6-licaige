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
var letterCombinations = function(digits) {

    if(!digits){
        return []
    }
    const map = new Map();
    map.set('2',['a','b','c']);
    map.set('3',['d','e','f']);
    map.set('4',['g','h','i']);
    map.set('5',['j','k','l']);
    map.set('6',['m','n','o']);
    map.set('7',['p','q','r','s']);
    map.set('8',['t','u','v']);
    map.set('9',['w','x','y','z']);
    const dfs =(index)=>{
        // 如果是最后一个字母，直接返回当前映射字符
        if(index===digits.length-1){
            return map.get(digits[index]);
        }
        const result = []
        const arr = map.get(digits[index]);
        // 获取剩下的组合
        const rest = dfs(index+1);
            for (let i = 0; i < arr.length; i++) {
                for (let j = 0; j < rest.length; j++) {
                    // 将当前与剩下累加
                    result.push(arr[i]+rest[j])
                }
            }
        return result
    }
    return dfs(0)


};
// @lc code=end

