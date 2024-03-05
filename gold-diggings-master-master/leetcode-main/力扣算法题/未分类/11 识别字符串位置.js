// 给你两个字符串 haystack 和 needle ，
// 请你在 haystack 字符串中找出 needle 字符串出现的第一个位置（下标从 0 开始）。
// 如果不存在，则返回  -1 

// 输入：haystack = "hello", needle = "ll"
// 输出：2



var strStr = function(haystack, needle) {
    return haystack.indexOf(needle)
};



let a = "hello",
    b = "ll"
strStr(a,b)