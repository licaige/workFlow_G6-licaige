/*
 * @lc app=leetcode.cn id=208 lang=javascript
 *
 * [208] 实现 Trie (前缀树)
 */

// @lc code=start

var Trie = function () {
  this.head = new Map();
};

/**
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function (word) {
  let head = this.head;
  for (let i = 0; i < word.length; i++) {
    const el = head.get(word[i]);
    if (el) {
      head = el;
    } else {
      const newHead = new Map();
      head.set(word[i], newHead);
      head = newHead;
    }
  }
  head.set('done', true);
};

/**
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function (word) {
  let head = this.head;
  for (let i = 0; i < word.length; i++) {
    const el = head.get(word[i]);
    if (el) {
      head = el;
    } else {
      return false;
    }
  }
  return !!head.get('done');
};

/**
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function (prefix) {
  let head = this.head;
  for (let i = 0; i < prefix.length; i++) {
    const el = head.get(prefix[i]);
    if (el) {
      head = el;
    } else {
      return false;
    }
  }
  return true;
};

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */
// @lc code=end
