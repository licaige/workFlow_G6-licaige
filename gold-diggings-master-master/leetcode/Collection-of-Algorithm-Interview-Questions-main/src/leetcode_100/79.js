/**
 * 单词搜索HOT
 * https://leetcode-cn.com/problems/word-search/
 * @param {*} board 
 * @param {*} word 
 */
var exsit = function (board, word) {
  const m = board.length;
  const n = board[0].length;
  // 用来记录当前元素是否被访问过
  const visited = Array(m).fill(0).map(() => Array(n).fill(false));
  // 定义搜索的方向，分为上下左右四个方向
  const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];
  // 使用回溯判断当前的位置是否存在指定的字符
  const backtrace = (i, j, k) => {
    // 如果当前位置的字符不等于要搜索位置的字符
    if (board[i][j] !== word[k]) {
      return false;
    } else if (k === word.length - 1) {
      // 表示已经搜索到最后一个字符了
      return true;
    }
    let result = false;
    // 选中当前位置的元素
    visited[i][j] = true;
    for (let [dx, dy] of directions) {
      // 获取搜索下一个位置的索引
      const newX = i + dx;
      const newY = j + dy;
      // 判断索引是否越界
      if (newX >= 0 && newX < m && newY >= 0 && newY < n) {
        // 下一个位置的元素没有被访问过
        if (!visited[newX][newY]) {
          result = backtrace(newX, newY, k+1);
          if (result) break;
        }
      }
    }
    // 取消当前选中元素
    visited[i][j] = false;
    return result;
  };
  // 遍历矩阵，判断是否符合搜索单词
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const flag = backtrace(i, j, 0);
      if (flag) {
        return true;
      }
    }
  }
  return false;
}

module.exports = exsit;
