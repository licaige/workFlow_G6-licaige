/**

Write a function to generate the generalized abbreviations of a word. 
Note: The order of the output does not matter.

Example:

Input: "word"
Output:
["word", "1ord", "w1rd", "wo1d", "wor1", "2rd", "w2d", "wo2", "1o1d", "1or1", "w1r1", "1o2", "2r1", "3d", "w3", "4"]

*/

/**
 * @param {string} word
 * @return {string[]}
 */
const generateAbbreviations = function(word) {
  const n = word.length
  const limit = 1 << n
  const res = []
  
  for(let mask = 0; mask < limit; mask++) {
    res.push(helper(word, mask))
  }
  
  return res
  
  function helper(word, mask) {
    let res = '', zero = 0, idx = 0
    for(let i = 0; i < n; i++) {
      if(mask & (1 << i)) {
        if(zero) res += zero
        res += word[i]
        zero = 0
      } else {
        zero++
      }
      if(i === n - 1 && zero) res += zero
    }
    
    return res
  }
};

// another

/**
 * @param {string} word
 * @return {string[]}
 */
const generateAbbreviations = function(word) {
  const arr = []
  dfs(arr, word, 0, '', 0)
  return arr
};

function dfs(res, word, pos, cur, cnt) {
  if(pos === word.length) {
    if(cnt > 0) cur += cnt
    res.push(cur)
  } else {
    dfs(res, word, pos + 1, cur, cnt + 1)
    dfs(res, word, pos + 1, cur + (cnt > 0 ? cnt : '') + word.charAt(pos), 0)
  }
}
