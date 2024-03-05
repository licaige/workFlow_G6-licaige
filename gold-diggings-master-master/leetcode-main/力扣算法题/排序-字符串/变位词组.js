

// 变位词组
// https://leetcode.cn/problems/group-anagrams-lcci/solutions/876875/bian-wei-ci-zu-by-leetcode-solution-g2a8/?envType=study-plan-v2&envId=cracking-the-coding-interview

// 编写一种方法，对字符串数组进行排序，将所有变位词组合在一起。变位词是指字母相同，但排列不同的字符串。

// 输入: ["eat", "tea", "tan", "ate", "nat", "bat"],
// 输出:
// [
//   ["ate","eat","tea"],
//   ["nat","tan"],
//   ["bat"]
// ]





// 方案一  字符串排序, 使用哈希表保存对应字符

var groupAnagrams = function (strs) {

    // 使用排序后的字符串作为key
    let resMap = {}

    for (let i = 0; i < strs.length; i++) {
        let key = Array.from(strs[i]).sort().concat()

        if (typeof resMap[key] !== "undefined") {
            resMap[key].push(strs[i])
        } else {
            resMap[key] = [strs[i]]
        }
    }

    debugger
    let res = []
    for (let k in resMap) {
        res.push(resMap[k])
    }

    return res
};


let strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
groupAnagrams(strs)