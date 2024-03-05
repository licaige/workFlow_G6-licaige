// 443. 压缩字符串

// 压缩字符串中的连续字符

// 输入：chars = ["a","a","b","b","c","c","c"]
// 输出：返回 6 ，输入数组的前 6 个字符应该是：["a","2","b","2","c","3"]
// 解释："aa" 被 "a2" 替代。"bb" 被 "b2" 替代。"ccc" 被 "c3" 替代。


// 推荐解法  双指针

// 两个指针 i j 分别指向 当前处理的位置  和  答案待插入的位置
// 1. i 指针一直往后处理，每次找到字符相同的连续一段 [i,idx)[i, idx)[i,idx)，令长度为 cntcntcnt；
// 2. 将当前字符插入到答案，并让 j 指针后移：cs[j++] = cs[i]；
// 3. 检查长度 cntcntcnt 是否大于 111，如果大于 111，需要将数字拆分存储。

const compress = chars => {
    const len = chars.length
    let s = ''
    let i = 0, j = i + 1
    while (j <= len) {
        // 相等的话 右指针向右移
        if (chars[i] === chars[j]) {
            j++
        } else {
            const tempS = (j - i) > 1 ? `${chars[i]}${j - i}` : `${chars[i]}`
            s += tempS
            i = j
            j = i + 1
        }
    }
    // 写入chars
    for (let i = 0; i < s.length; i++) {
        chars[i] = s[i]
    }
    return s.length
}




compress(["a", "a", "b", "b", "c", "c", "c"])