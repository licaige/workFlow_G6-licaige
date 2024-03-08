/**
 * 实现Trie（前缀树）
 * https://leetcode.cn/problems/implement-trie-prefix-tree/description/
 * @param {*} ch
 */
var TrieNode = function(ch) {
  this.data = ch;
  // 子节点
  this.children = new Array(26);
  // 标记字符串的结束
  this.isEndingChar = false;
}

var Trie = function() {
  // 根节点设为“/”
  this.root = new TrieNode('/');
};

/**
* @param {string} word
* @return {void}
*/
Trie.prototype.insert = function(word) {
  const n = word.length;
  let p = this.root;
  for (let i = 0; i < n; i++) {
      const index = word[i].charCodeAt() - 'a'.charCodeAt();
      if (p.children[index] == null) {
          const newNode = new TrieNode(word[i]);
          p.children[index] = newNode;
      }
      p = p.children[index];
  }
  p.isEndingChar = true;
};

/**
* @param {string} word
* @return {boolean}
*/
Trie.prototype.search = function(word) {
  const n = word.length;
  let p = this.root;
  for (let i = 0; i < n; i++) {
      const index = word[i].charCodeAt() - 'a'.charCodeAt();
      if (!p.children[index]) return false;
      p = p.children[index];
  }
  if (!p.isEndingChar) return false;
  return true;
};

/**
* @param {string} prefix
* @return {boolean}
*/
Trie.prototype.startsWith = function(prefix) {
  const n = prefix.length;
  let p = this.root;
  for (let i = 0; i < n; i++) {
      const index = prefix[i].charCodeAt() - 'a'.charCodeAt();
      if (!p.children[index]) return false;
      p = p.children[index];
  }
  return true;
};

const trie = new Trie();
console.log(trie.insert('apple'));
console.log(trie.insert('app12'));
console.log(trie.search('app44'));
console.log(trie.search('app'));
console.log(trie.startsWith('app'));
