/**
 * 考察：深度优先
 * @difficulty困难
 * @summary:301. 删除无效的括号
 * 给你一个由若干括号和字母组成的字符串 s ，删除最小数量的无效括号，使得输入的字符串有效。
 * 返回所有可能的结果。答案可以按 任意顺序 返回。
 * 
 * 示例 1：
 * 输入：s = "()())()"
 * 输出：["(())()","()()()"]
 */
/**
 * 方法2
 */
var removeInvalidParentheses = function (s) {
    
    // BFS广度优先,注意题目中只删除最少括号
    // s在任意位置删除一个括号字符，则形成新的层级
    // 最坏情况就是O(2^len),但是会在删除若干字符后退出
    let level=new Set();
    level.add(s)

    while(true){
        const valid=[...level].filter(str=>isValid(str))
        if(valid.length) return valid;

        // 
        let next_level=new Set();
        for(const str of level){
            for(let i=0;i<str.length;i++){
                if(['(',')'].includes(str[i]))
                    next_level.add(str.slice(0,i)+str.slice(i+1))
            }
        }
        level=next_level;
    }

    // 判定当前括号排列是否合法
    function isValid(s){
        debugger
        let cnt=0;

        for(const c of s){
            if(c==='(') cnt++;
            if(c===')') cnt--;

            if(cnt<0) return false
        }

        return cnt===0
    }
}
/**
 * 方法1
 */
// var removeInvalidParentheses = function (s) {
//     debugger
//     const n = s.length;
//     // 记录最大有效括号数量
//     let count = 0;
//     let l = 0;
//     // 存在重复字符形式
//     const set = new Set();
//     for (let c of s) {
//         if (c == '(') {
//             l++;
//         } else if (c == ')' && l > 0) {
//             l--;
//             count++;
//         }
//     }
//     const dfs = (i, l, r, str) => {
//         // 数量关系，剪枝
//         if (l < r || l > count || r > count) return;
//         // 结束
//         if (i == n) {
//             // 数量相同，删除最小
//             if (l == count && r == count) {
//                 set.add(str);
//             }
//             return;
//         }
//         const cur = s[i];
//         if (cur == '(') {
//             // 括号，选或不选
//             dfs(i + 1, l + 1, r, str + '(');
//             dfs(i + 1, l, r, str);
//         } else if (cur == ')') {
//             dfs(i + 1, l, r + 1, str + ')');
//             dfs(i + 1, l, r, str);
//         } else {
//             // 字符直接加入
//             dfs(i + 1, l, r, str + cur);
//         }
//     }
//     dfs(0, 0, 0, '');
//     console.log([...set])
//     return [...set];
// };
// const s = "()())()"
const s = ")())()"
// const s = "()())("
removeInvalidParentheses(s); // ["(())()","()()()"]