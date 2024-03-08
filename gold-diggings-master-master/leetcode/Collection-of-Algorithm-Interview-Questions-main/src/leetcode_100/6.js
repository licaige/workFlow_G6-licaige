/**
 * Z字形变换
 * https://leetcode-cn.com/problems/zigzag-conversion/
 * @param {*} s 
 * @param {*} numRows 
 * @returns 
 * 按照以下格式
 * P   A   H   N
 * A P L S I I G
 * Y   I   R
 */
// 1. 一行一行来找到对应的字符，即按行访问
var convert = function(s, numRows) {
  if (numRows === 1) return s;
  const cycleNum = 2 * numRows - 2;
  let ans = '';
  for(let i = 0; i < numRows; i++) {
      for(let j = 0; j + i < s.length; j += cycleNum) {
          ans += s[i+j];
          if (i !== 0 && i !== numRows - 1 && j + cycleNum - i < s.length) {
              ans += s[j + cycleNum - i];
          }
      }
  }
  return ans;
};

// 2. 根据方向来确定当前字符属于哪一行
var convert = function(s, numRows) {
  if (numRows === 1) return s;
  // 存储指定行中的字符串
  const rowsArr = [];
  const n = s.length;
  let ans = '';
  for(let i = 0; i < Math.min(numRows, n); i++) {
      rowsArr[i] = '';
  }

  // 设置当前行以及下次迭代的时候是往下还是往上的方向标示
  let curRow = 0, goDown = false;
  for(let i = 0; i < n; i++) {
      rowsArr[curRow] += s[i];
      // 只有第一行和最后一行的时候，会发生方向的变化
      if (curRow === 0 || curRow === numRows - 1) goDown = !goDown;
      curRow += goDown ? 1 : -1;
  }
  for(let i = 0; i < rowsArr.length; i++) {
      ans += rowsArr[i];
  }
  return ans;
};
