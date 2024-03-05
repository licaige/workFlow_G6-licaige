// 面试题 01.05. 一次编辑

// https://leetcode.cn/problems/one-away-lcci/description/

// 字符串有三种编辑操作: 插入一个英文字符、删除一个英文字符或者替换一个英文字符。 
// 给定两个字符串，编写一个函数判定它们是否只需要一次(或者零次)编辑。



// 方案  将短单词转化为长单词  故添加和删除是同一个操作

// 1. m-n>1  直接返回false
// 2. m-n=1  需要添加操作
// 3. m-n=0  需要替换操作

// 双指针往后刷字符串  分类讨论


function replaceChar(str, index, replacement) {
    const arrFromStr = [...str];
    if (arrFromStr.length <= index) {
        return str + replacement; // 如果数组长度小于等于索引，则直接返回原字符串加上替换的字符
    } else {
        arrFromStr.splice(index, 1, replacement); // 如果不是，则正常使用 splice() 方法进行替换
        return arrFromStr.join("");
    }
}

function insertChar(str, i, char) {
    if (i > str.length) {
        return str + char;
    } else {
        return str.slice(0, i) + char + str.slice(i);
    }
}

var oneEditAway = function (first, second) {
    let m = first.length
    let n = second.length

    // 特殊情况直接返回
    if (
        (m == 0 && n == 0) ||
        (m == 1 && n == 1) ||
        (m == 0 && n == 1) ||
        (m == 1 && n == 0)
    ) return true

    if (Math.abs(m - n) > 1) return false

    let res = true;

    let i = 0

    let long = m - n == 1 ? first : second;
    let short = m - n == 1 ? second : first;


    while (long[i]) {
        if (long[i] == short[i]) {
            i++
            continue
        }
        // 进行一步操作 直接跳出
        else {
            short = m == n
                ? replaceChar(short, i, long[i])
                : insertChar(short, i, long[i])

            // 判断两个单词是否相同
            res = long == short
                ? true
                : false
            break
        }
    }

    return res
};


let first = "teacher",
    second = "beacher"
debugger
oneEditAway(first, second)