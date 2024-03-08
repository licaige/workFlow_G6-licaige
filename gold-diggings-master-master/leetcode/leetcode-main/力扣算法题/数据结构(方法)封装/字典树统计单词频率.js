
// 面试题 16.02. 单词频率
// 设计一个方法，找出任意指定单词在一本书中的出现频率。


// 可直接用哈希表保存字母

// 这里提供字典树法进行统计
class Tire {
    constructor() {
        this.children = {} // 字母映射
    }

    insert(word) {
        let node = this.children // 首个索引

        for (let letter of word) {
            if (!node[letter]) { //本层查找字母  无则插入
                node[letter] = {}
            }
            node = node[letter] // 进入下一层
        }

        node.isEnd = true // 记录结束点
        node.count ? node.count++ : node.count = 1  // 记录结束点数量
    }

    searchPrefix(prefix) {
        let node = this.children

        for (let letter of prefix) {
            if (!node[letter]) {
                return false
            }

            node = node[letter]
        }

        return node // 返回末尾节点
    }

    search(word) {
        const node = this.searchPrefix(word)
        return node.count || 0
    }
}


var Tire = function () {
    this.children = {} // 字母映射
}

// 保存单词方法
Tire.prototype.insert = function (word) {
    let node = this.children // 首个索引

    for (let letter of word) {
        if (!node[letter]) { //本层查找字母  无则插入
            node[letter] = {}
        }
        node = node[letter] // 进入下一层
    }

    node.isEnd = true // 记录结束点
    node.count ? node.count++ : node.count = 1  // 记录结束点数量
}
// 渐进深入查询是否存在此段字母
Trie.prototype.searchPrefix = function (prefix) {
    let node = this.children

    for (let letter of prefix) {
        if (!node[letter]) {
            return false
        }

        node = node[letter]
    }

    return node // 返回末尾节点
}

// 查询
Trie.prototype.search = function (word) {
    const node = this.searchPrefix(word)
    return node.count || 0
}


// 封装书籍  添加书籍
var WordsFrequency = function (book) {

    this.tire = new Tire()

    for (let b of book) {
        this.tire.insert(b)
    }
};


WordsFrequency.prototype.get = function (word) {
    return this.tire.search(word)
};