
/**
 * 考察：回溯
 * @difficulty中等
 * @summary:剑指 Offer 38. 字符串的排列
 * 输入一个字符串，打印出该字符串中字符的所有排列。
 * 你可以以任意顺序返回这个字符串数组，但里面不能有重复元素。

示例:
输入：s = "abc"
输出：["abc","acb","bac","bca","cab","cba"]
题目理解：
常用的回溯考察
 */
var permutation = function (s) {
    debugger;
    const rec = [], vis = [];
    const n = s.length;
    const arr = Array.from(s).sort();
    const perm = [];
    const backtrack = (arr, i, n, perm) => {
        debugger;
        if (i === n) { // 2、说明已经填完了
            rec.push(perm.toString());
            return;
        }
        for (let j = 0; j < n; j++) {
            if (vis[j] || (j > 0 && !vis[j - 1] && arr[j - 1] === arr[j])) {///3、对于重复的字符，我们一定是从左往右依次填入的空位中的
                continue;
            }
            vis[j] = true;
            perm.push(arr[j]);
            backtrack(arr, i + 1, n, perm);
            perm.pop();
            vis[j] = false;
        }
    }

    backtrack(arr, 0, n, perm);// 1、表示当前排列为perm，下一个待填入空位是第n个
    const size = rec.length;
    const recArr = new Array(size).fill(0);
    for (let i = 0; i < size; i++) {
        recArr[i] = rec[i].split(',').join('');
    }
    return recArr;
};
const s = "acb";
console.log(permutation(s));// ["abc","acb","bac","bca","cab","cba"]