/**
 * 考察：深度优先搜索
 * @difficulty中等
 * @summary: 79. 单词搜索
 * 给定一个 m x n 二维字符网格 board 和一个字符串单词 word 。如果 word 存在于网格中，返回 true ；否则，返回 false 。
 * 单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母不允许被重复使用。
 * 示例1,如图image/word_search.jpg
 * 输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
 * 输出：true
 * 
 * 题目理解：
 * 1 找到数组中符合word第一个字符的位置，
 * 2 进行深度优先搜索，朝一个方向搜索到底，
 * 3 如果遇到数组当前位置，储存字符不等于当前word字符或数组越界的情况，立即返回
 */
/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
 var exist = function(board, word) {
  let n = board.length;
  let m = board[0].length;
  let wLen = word.length;
  debugger
  const findWord = (i, j, curLen) => {//进行深度优先搜索
      if(curLen === wLen) return true;//已经检查完word字符，说明全部符合
      if(i >= n || j >= m || i < 0 || j < 0) return false;//数组越界
      if(board[i][j] !== word.charAt(curLen)) return false;//当前位置储存字符不等于当前word字符
      let pre = board[i][j];//储存当前位置字符
      board[i][j] = '0';//修改字符为不可能匹配值，防止之后深度优先搜索又经过这个字符
      let res = findWord(i + 1, j, curLen + 1) || //朝不同方向搜索到底
                findWord(i, j + 1, curLen + 1) ||
                findWord(i - 1, j, curLen + 1) ||
                findWord(i, j - 1, curLen + 1);
      board[i][j] = pre;//将字符换回来
      return res;

  }
  for(let i = 0; i < n; i++) {//找到数组中符合word第一个字符的位置
      for(let j = 0; j < m; j++) {
          if(findWord(i, j, 0)) return true;
      }
  }
  return false;
};
const board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
console.log(exist(board, word))