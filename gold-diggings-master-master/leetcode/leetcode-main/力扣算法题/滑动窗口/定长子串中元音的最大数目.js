

// 定长子串中元音的最大数目
// https://leetcode.cn/problems/maximum-number-of-vowels-in-a-substring-of-given-length/?envType=study-plan-v2&envId=leetcode-75


// 找到abciiidef 子串中  最多的元音字母

// 方案一  滑动窗口
var maxVowels = function (s, k) {

    let left = 0
    let right = k - 1
    let maxCount = 0

    const is = (l) => ["a", "e", "i", "o", "u"].indexOf(l) != -1
    // 首次检查
    for (let i = left; i <= right; i++) {
        if (is(s[i])) {
            maxCount++
        }
    }
    // 不需要每滑动一次检查全部字符  只需要检查新增的字符和减少的字符即可
    let count = maxCount
    while (right < s.length - 1) {
        // 右滑窗口
        left++
        right++
        // 
        if (is(s[left - 1])) {
            count--
        }
        if (is(s[right])) {
            count++
        }

        if (count > maxCount) {
            maxCount = count
        }

    }

    return maxCount
};