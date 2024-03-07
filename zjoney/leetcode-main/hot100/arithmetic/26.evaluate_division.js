/**
 * 考察：
 * @difficulty 中等
 * @summary 399. 除法求值
 * 给你一个变量对数组 equations 和一个实数值数组 values 作为已知条件，其中 equations[i] = [Ai, Bi] 和 values[i] 共同表示等式 Ai / Bi = values[i] 。每个 Ai 或 Bi 是一个表示单个变量的字符串。
另有一些以数组 queries 表示的问题，其中 queries[j] = [Cj, Dj] 表示第 j 个问题，请你根据已知条件找出 Cj / Dj = ? 的结果作为答案。
返回 所有问题的答案 。如果存在某个无法确定的答案，则用 -1.0 替代这个答案。如果问题中出现了给定的已知条件中没有出现的字符串，也需要用 -1.0 替代这个答案。

注意：输入总是有效的。你可以假设除法运算中不会出现除数为 0 的情况，且不存在任何矛盾的结果。

示例 1：
输入：equations = [["a","b"],["b","c"]], values = [2.0,3.0], queries = [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]
输出：[6.00000,0.50000,-1.00000,1.00000,-1.00000]
解释：
条件：a / b = 2.0, b / c = 3.0
问题：a / c = ?, b / a = ?, a / e = ?, a / a = ?, x / x = ?
结果：[6.0, 0.5, -1.0, 1.0, -1.0 ]

 */
var calcEquation = function(equations, values, queries) {
  let map = new Map();
  // map 保存对应下标和另一个变量
  for(let i = 0; i < equations.length; i++) {
      let [ai, bi] = equations[i];
      if(map.has(ai)) map.set(ai, [...map.get(ai), {i:i, b: bi}]);
      else map.set(ai,[{i:i, b: bi}])
      if(map.has(bi)) map.set(bi, [...map.get(bi), {i:i, a: ai}]);
      else map.set(bi,[{i:i, a: ai}])
  }
  let res = [];
  for(let i = 0; i < queries.length; i++) {
      let [ci, di] = queries[i];
      // 如果map中都有才计算，没有就返回-1
      if(map.has(ci) && map.has(di)) {
          // 如果变量相同
          if(ci == di) {
              res.push(1)
          } else { // 变量不同，就去找关系
              let arr = lin(ci, di)[0];
              // 找不到关系就返回-1
              if(!arr) res.push(-1);
              else { // 找到关系了就计算
                  let num = 1;
                  for(let j = 0; j < arr.length; j++) {
                      if(arr[j].a) num /= values[arr[j].i];
                      else num *= values[arr[j].i];
                  }
                  res.push(num);
              }
          }
      } else {
          res.push(-1);
      }
  }
  // 找关系（可优化）
  function lin(key, val, ed = new Set(), area = [], item = []) {
      if(ed.has(key)) return area;
      ed.add(key);
      let arr = map.get(key);
      for(let i = 0; i < arr.length; i++) {
          if(arr[i].a == val || arr[i].b == val) { // 找到关系了
              area.push([...item, arr[i]])
          } else {
              area = lin(arr[i].a || arr[i].b, val, ed, area, [...item, arr[i]])
          }
      }
      return area;
  }
  return res;
};