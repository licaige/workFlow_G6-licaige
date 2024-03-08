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

    // 如果 p 的长度大于 s 长度 直接返回空数组
    if(p.length>s.length){
        return []
    }

   

    // differ 记录滑动窗口内 字符出现次数不对等的情况
    let differ = 0;
    let res = []

    const countArray = new Array(26).fill(0);

    // 首先把第一个滑动窗口的 differ 计算出来
    for (let i = 0; i < p.length; i++) {
        countArray[s[i].charCodeAt() - 'a'.charCodeAt()]++;
        countArray[p[i].charCodeAt() - 'a'.charCodeAt()]--
    }

    for (let i = 0; i < countArray.length; i++) {
        
        if(countArray[i]!==0){
            differ++
        }
        
    }
    // 第一个滑动窗口的 differ 
    if(!differ){
        res.push(0)
    }

    // 每一次遍历移动一次元素
    for (let i = 0; i < s.length - p.length; i++) {

        // 首先这是要出去的元素
        //如果之前 是 0 代表之前是相同的字符
        if(countArray[s[i].charCodeAt() - 'a'.charCodeAt()]===0){
            differ++
        // 之前是 不同的字符，现在出去了表示 differ--
        }else if(countArray[s[i].charCodeAt() - 'a'.charCodeAt()]===1){
            differ--
        }

        countArray[s[i].charCodeAt() - 'a'.charCodeAt()]--;

        // 这是要进来的元素
        if(countArray[s[i+p.length].charCodeAt() - 'a'.charCodeAt()]===0){
            differ++
        }else if(countArray[s[i+p.length].charCodeAt() - 'a'.charCodeAt()]===-1){
            differ--
        }
        countArray[s[i+p.length].charCodeAt() - 'a'.charCodeAt()]++;

        if(differ===0){
            res.push(i+1)
        }        
    }

    return res


    // d e f c b a c      a b c  
    // d e f    a b c  6
    // e f c    a b c  4
    // f c b    a b c  2
    // c b a    a b c  0
    // b a c    a b c  0


};
// @lc code=end

