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

    
    // hash 里面保存的是 每个字符出现的次数
    const map = new Map()
    let index = -1;

    for (let i = 0; i < strs.length; i++) {
        let key = new Array(26).fill(0)
        
        for (let j = 0; j < strs[i].length; j++) {
            index = strs[i][j].charCodeAt() - 'a'.charCodeAt()
            key[index ]  = 1 + key[index]
        }
        key = key.join(',')
        console.log(key)
        if(map.has(key)){
            const arr = map.get(key);
            map.set(key,[...arr,strs[i]])
        }else {
            map.set(key,[strs[i]])
        }
        
    }

    const res = []

    for(let [_,value] of map){
        res.push(value)
    }
    return res
};
// @lc code=end

