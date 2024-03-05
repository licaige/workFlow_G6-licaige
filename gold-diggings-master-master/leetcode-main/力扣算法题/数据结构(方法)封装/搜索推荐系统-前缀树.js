// 1268. 搜索推荐系统
// https://leetcode.cn/problems/search-suggestions-system/?envType=study-plan-v2&envId=leetcode-75




// 基本暴力思路
// 封装一个字典树  检索某个节点后所有的单词
// 排序后返回前三个字典序单词

// 封装一个字典树
class Trie {
    constructor() {
        this.children = {} // 字母映射
    }

    insert = function (word) {

        let node = this.children

        for (let letter of word) {
            if (!node[letter]) {
                node[letter] = {} // 预备的下层节点
            }

            node = node[letter] // 进入下一层
        }

        node.isEnd = true // 记录结束点  用于判断一个单次
    }

    searchPrefix = function (prefix) {
        let node = this.children

        for (let letter of prefix) {
            if (!node[letter]) {
                return false
            }
            node = node[letter]
        }
        return node // 返回末尾节点
    }

    search = function (word) {
        const node = this.searchPrefix(word)
        return node !== undefined && node.isEnd == true
    }
}

// 从当前root开始BFS  查找所有单词
const searchAll = (node, res, resList, prefix) => {
    if (node.isEnd) {
        resList.push(prefix + res)
    }

    for (let letter in node) {
        searchAll(
            node[letter],
            res + letter,
            resList,
            prefix
        )
    }

    return resList
}

var suggestedProducts = function (products, searchWord) {
    // 构建字典树+BFS的思路

    const trie = new Trie()
    // 保存所有单词到字典树中
    // 保存的时候顺带存入当前单词
    products.forEach(p => {
        trie.insert(p)
    });


    // 遍历查找
    let res = []
    let prefix = ''

    for (let letter of searchWord) {

        prefix += letter

        const root = trie.searchPrefix(prefix)

        // 从当前root开始BFS  查找所有单词
        let resList = searchAll(root, "", [], prefix)
        resList = resList.sort().slice(0, 3)
        res.push(resList)
    }

    return res
};


let products = ["mobile", "mouse", "moneypot", "monitor", "mousepad"],
    searchWord = "mouse"


suggestedProducts(products, searchWord)