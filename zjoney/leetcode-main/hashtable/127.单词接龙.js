/**
 * 考察：哈希表
 * @difficulty困难
 * @summary: 127. 单词接龙
 * 字典 wordList 中从单词 beginWord 和 endWord 的 转换序列 是一个按下述规格形成的序列 beginWord -> s1 -> s2 -> ... -> sk：

每一对相邻的单词只差一个字母。
 对于 1 <= i <= k 时，每个 si 都在 wordList 中。注意， beginWord 不需要在 wordList 中。
sk == endWord
给你两个单词 beginWord 和 endWord 和一个字典 wordList ，返回 从 beginWord 到 endWord 的 最短转换序列 中的 单词数目 。如果不存在这样的转换序列，返回 0 。
示例：
输入：beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
输出：5
解释：一个最短转换序列是 "hit" -> "hot" -> "dot" -> "dog" -> "cog", 返回它的长度 5。Z
题目理解：
将单词表映射成对象。
将beiginWord存在queue数组内，按照word,level设置且首次为1。
queue开始循环,每次取出栈底元素解构出word,level,当word等于endWord，就直接返回level,否则就循环单词映射表。
将变量word对比单词映射表的每一个值item是否满足置换，满足就将当前的item放在queue中并且level+1, 并且将单词映射表此元素删除。
 */
var ladderLength2 = function (beginWord, endWord, wordList) {
    debugger;
    if (!wordList.length) return;
    const wordSet = new Set(wordList);
    // 查看是否能转换
    const canConversion = (s1, s2) => {
        if (s1.length !== s2.length) return false;
        // 不同字符的数量，为1表示能够转换
        let count = 0;
        for (let i = 0; i < s1.length; i++) {
            if (s1[i] !== s2[i]) {
                count++;
            }
            if (count > 1) {
                return false;
            }
        }
        return count === 1;
    }

    const queue = [];
    queue.push([beginWord, 1]);
    while (queue.length) {
        const [word, level] = queue.shift();
        if (word === endWord) {
            return level;
        }
        for (let item of wordSet) {
            if (canConversion(word, item)) {
                queue.push([item, level + 1]);
                wordSet.delete(item);
            }
        }
    }
    return 0;
};
console.log(ladderLength2('hit', 'cog', ["hot", "dot", "dog", "lot", "log", "cog"])); // 5
