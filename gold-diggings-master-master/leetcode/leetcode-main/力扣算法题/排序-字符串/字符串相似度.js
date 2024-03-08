
// 1657. 确定两个字符串是否接近
// https://leetcode.cn/problems/determine-if-two-strings-are-close/?envType=study-plan-v2&envId=leetcode-75


// 如果可以使用以下操作从一个字符串得到另一个字符串，则认为两个字符串 接近 ：
// 操作 1：交换任意两个 现有 字符。
// 例如，abcde -> aecdb
// 操作 2：将一个 现有 字符的每次出现转换为另一个 现有 字符，并对另一个字符执行相同的操作。
// 例如，aacabb -> bbcbaa（所有 a 转化为 b ，而所有的 b 转换为 a ）
// 你可以根据需要对任意一个字符串多次使用这两种操作。

// 给你两个字符串，word1 和 word2 。如果 word1 和 word2 接近 ，就返回 true ；否则，返回 false 。








// ------------------------------------------

// 经过观察可发现 
// 满足这两个情况  要求字母种类和字母数量相同

// 比如 abbccc effggg 三种字母 种类不同  字母数分别为 1 2 3(顺序可乱)
// abbccc  cbbacc      种类相同  字母数分别为 1 2 3(顺序可乱)


// 方案使用hash表进行记录
var closeStrings = function (word1, word2) {
    const map1 = {}
    const map2 = {}

    let res1 = []
    let res2 = []
    let res3 = []
    let res4 = []

    for (let i = 0; i < word1.length; i++) {
        if (!map1[word1[i]]) {
            map1[word1[i]] = 1
        } else {
            map1[word1[i]]++
        }
    }

    for (let j = 0; j < word2.length; j++) {
        if (!map2[word2[j]]) {
            map2[word2[j]] = 1
        } else {
            map2[word2[j]]++
        }
    }

    for (let key in map1) {
        res1.push(map1[key])
        res2.push(key)
    }
    for (let key in map2) {
        res3.push(map2[key])
        res4.push(key)
    }


    const countStr1 = res1.sort().join("")
    const countStr2 = res3.sort().join("")

    const litterStr1 = res2.sort().join("")
    const litterStr2 = res4.sort().join("")

    return (countStr1 == countStr2) && (litterStr1 == litterStr2)
};



var closeStrings = function (word1, word2) {

    if (word1.length !== word2.length) return false

    const map1 = {}
    const map2 = {}

    let res1 = []
    let res2 = []
    let res3 = []
    let res4 = []

    for (let i = 0; i < word1.length; i++) {
        if (!map1[word1[i]]) {
            map1[word1[i]] = 1
            res2.push(word1[i])
        } else {
            map1[word1[i]]++
        }

        if (!map2[word2[i]]) {
            map2[word2[i]] = 1
            res4.push(word1[i])
        } else {
            map2[word2[i]]++
        }
    }


    for (let key in map1) {
        res1.push(map1[key])
        res2.push(key)
    }
    for (let key in map2) {
        res3.push(map2[key])
        res4.push(key)
    }


    const countStr1 = res1.sort().join("")
    const countStr2 = res3.sort().join("")

    const litterStr1 = res2.sort().join("")
    const litterStr2 = res4.sort().join("")

    return (countStr1 == countStr2) && (litterStr1 == litterStr2)
};

closeStrings("cabbba", "abbccc")