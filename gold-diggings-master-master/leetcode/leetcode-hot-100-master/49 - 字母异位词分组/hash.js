/*
 * @lc app=leetcode.cn id=49 lang=javascript
 *
 * [49] 字母异位词分组
 */

// @lc code=start
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    

    const map = new Map();
    let arr = []

    for (let i = 0; i < strs.length; i++) {
        // 排序放进 map 里面
        const key =  strs[i].split('').sort().join('');
        if(!map.has(key)){
            map.set(key,[strs[i]])
        }else {
            const arr = map.get(key)
            map.set(key,[...arr,strs[i]])
        }
    }

     for(let [key,value] of map){
        arr.push(value)
     }

     return arr
};
// @lc code=end

