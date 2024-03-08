/*
 * @lc app=leetcode.cn id=438 lang=javascript
 *
 * [438] 找到字符串中所有字母异位词
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function(s, p) {

    const arr = new Array(26).fill(0)
    const res = []

    for (let i = 0; i < p.length; i++) {
        arr[p[i].charCodeAt() - 'a'.charCodeAt()]++
    }

    const key = arr.join(',')
    // 将 p 生成 key
    let newArr = new Array(26).fill(0)


    for (let i = 0; i <= s.length-p.length; i++) {

        
        for (let j = i; j < i+ p.length; j++) {
            newArr[s[j].charCodeAt() - 'a'.charCodeAt()]++
        }

        console.log(key,newArr)
        // 比较key 是否一致
        if(newArr.join(',')===key){
            res.push(i)
        }
        newArr = new Array(26).fill(0)
    }

    return res




};
// @lc code=end

