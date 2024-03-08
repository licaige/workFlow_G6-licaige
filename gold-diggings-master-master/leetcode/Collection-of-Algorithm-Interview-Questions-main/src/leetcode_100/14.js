/**
 * 最长公共前缀
 * https://leetcode-cn.com/problems/longest-common-prefix/
 * @param {*} strs 
 * @returns 
 */
// 横向比较
var longestCommonPrefix = function(strs) {
  if(!strs.length) return '';
  let prefix = strs[0];
  // 难点就是怎么一个一个比较字符串
  // 这里以第一个字符串长度为基准，比较每个位置的字符是否相等，相等的话，指针后移一位
  // 最后截取到指针位置的字符串
  const calcPrefix = (str1, str2) => {
      let index = 0;
      const len = Math.min(str1.length, str2.length);
      while(index < len && str1[index] === str2[index]) {
          index++;
      }
      return str1.slice(0, index);
  }
  for(let i = 1; i < strs.length; i++) {
      prefix = calcPrefix(prefix, strs[i]);
      if (prefix === '') break;
  }
  return prefix;
};

// 纵向比较
var longestCommonPrefix = function(strs) {
    if(!strs.length) return '';
    const calcPrefix = () => {
        for(let i = 0; i < strs[0].length; i++) {
            let c = strs[0][i];
            for(let j = 1; j < strs.length; j++) {
                if (i === strs[j].length || strs[j][i] !== c) {
                    return strs[j].slice(0, i);
                }
            }
        }
    }
    return calcPrefix();
};

// 分治法
var longestCommonPrefix = function(strs) {
    if (strs.length === 0) return '';
    const LCP = (strs, start, end) => {
        if (start === end) return strs[start];
        const mid = start + ((end - start) >> 1);
        const leftPrefix = LCP(strs, start, mid);
        const rightPrefix = LCP(strs, mid+1, end);
        return calcPrefix(leftPrefix, rightPrefix);
    }
    const calcPrefix = (s1, s2) => {
        let index = 0;
        const minLen = Math.min(s1.length, s2.length);
        while (index < minLen && s1[index] === s2[index]) {
            index++;
        }
        return s1.slice(0, index);
    };
    return LCP(strs, 0, strs.length - 1);
};

// 二分查找
var longestCommonPrefix = function(strs) {
    if (strs.length === 0) return '';
    let minLen = Number.MAX_SAFE_INTEGER;
    strs.forEach(str => {
        minLen = Math.min(minLen, str.length);
    });
    const calcPrefix = (strs, len) => {
        const str0 = strs[0].slice(0, len);
        const n = strs.length;
        for(let i = 1; i < n; i++) {
            const str = strs[i];
            for(let j = 0; j < len; j++) {
                if (str0[j] !== str[j]) return false;
            }
        }
        return true;
    }
    let i = 0, j = minLen;
    while(i < j) {
        const mid = i + ((j - i + 1) >> 1);
        // 表示当前i到j的字符前缀都相等，说明最长的公共前缀还在mid的后面
        if (calcPrefix(strs, mid)) {
            i = mid;
        } else {
            j = mid - 1;
        }
    }
    return strs[0].slice(0, i);
};

console.log(longestCommonPrefix(["aaa","aa","aaa"]));
