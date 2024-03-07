/**
 * 考察: 滑动窗口
 * @difficulty 中等
 * @summary 438. 找到字符串中所有字母异位词
 * 给定两个字符串 s 和 p，找到 s 中所有 p 的 异位词 的子串，
 * 返回这些子串的起始索引。不考虑答案输出的顺序。
 * 异位词 指由相同字母重排列形成的字符串（包括相同的字符串）。
 * 示例 1:
 * 输入: s = "cbaebabacd", p = "abc"
 * 输出: [0,6]
 * 解释:
 * 起始索引等于 0 的子串是 "cba", 它是 "abc" 的异位词。
 * 起始索引等于 6 的子串是 "bac", 它是 "abc" 的异位词。
 * 
 * 思路：
 * 用滑动窗口的思路，遍历字符串，
 * 判断进入窗口的字符是否是需要的字符，并且加入窗口之后该字符的数量是否是和need中的字符数量一致
 * 判断出窗口的字符是否是需要的字符，并且该字符在窗口中的数量是否和need中的字符数量一致
 * 判断窗口中和need中符合要求的字符是否一致 如果一致 则这个窗口形成的子串就是一个异位词
 */
//写法1
var findAnagrams = function (s, p) {
  let need = {};//需要的字符
  let win = {};//窗口中的字符
  for (let a of p) {//统计异位词的数量
    need[a] = (need[a] || 0) + 1;
  }
  //左右指针
  let left = 0,
    right = 0;
  let val = 0;//窗口中和need中字符数量一致的字符种类
  let res = [];
  while (right < s.length) {
    let c = s[right];
    right++;//右边的字符进入窗口
    if (need[c]) {
      win[c] = (win[c] || 0) + 1;//当前字符在need中，更新窗口中的字符数量
      if (win[c] == need[c]) {
        val++;//该字符在窗口中和need中的字符匹配时，字符种类+1
      }
    }
    while (right - left >= p.length) {//不断出窗口
      if (val == Object.keys(need).length) {//如果此时窗口中的子串和p是异位词则将左边界加入res中
        res.push(left);
      }
      let d = s[left];
      left++;//出窗口
      if (need[d]) {//如果该字符在need中 更新窗口中的字符数量 和字符种类
        if (win[d] == need[d]) {
          val--;
        }
        win[d]--;
      }
    }
  }
  return res;
};

//写法2
var findAnagrams = function (s, p) {
  //res：返回的结果
  //win：存储窗口中的字符和对应的频次
  //need：存储需要的异位词的种类和数量
  //len：need异位词的字符种类
  //val：滑动窗口中和need中字符数量相同的字符种类
  const res = [], win = {}, need = {}, pLen = p.length;
  let len = 0, val = 0;
  for (const x of p) {//循环p 
    //如果字符在need中不存在 则初始化need数组中对应的字符数量 并且让字符种类加1
    if (need[x] === undefined) {
      need[x] = win[x] = 0;
      len++;
    }
    need[x]++;//need中存在该字符 则字符数量加1
  }
  for (let i = 0; i < s.length; i++) {
    const j = i - pLen;//滑动窗口左边界
    //如果进入滑动窗口的字符s[i]在need中，并且窗口中的该字符数量加1之后和need中的字符数量相同，
    //说明该字符已经满足了异位字符的要求，让val加1
    if (s[i] in need && ++win[s[i]] === need[s[i]]) val++;
    //如果出滑动窗口的字符s[j]在need中，并且滑动窗口中该字符数量和need中的字符数量相同，
    //说明从窗口中移除该字符之后不满足异位字符的要求了，让窗口中这个字符的数量减1，并且val减1
    if (s[j] in need && win[s[j]]-- === need[s[j]]) val--;
    //如果need中滑动窗口中的异位字符种类一致 就说明从j+1开始就是异位字符串的一个起点
    if (val === len) res.push(j + 1);
  }
  return res;
};
