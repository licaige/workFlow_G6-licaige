/*
 * @lc app=leetcode.cn id=399 lang=javascript
 *
 * [399] 除法求值
 */

// @lc code=start
/**
 * @param {string[][]} equations
 * @param {number[]} values
 * @param {string[][]} queries
 * @return {number[]}
 */
var calcEquation = function (equations, values, queries) {
  // 创建并查集，找到相同组合的分子分母
  class UnionFind {
    constructor() {
      // 存储 partent
      this.parentHash = new Map();
      // 存储权重，这个是相对权重，不是绝对权重，所以在 union 的时候只需要调整 被合并的根元素权重
      this.weightHash = new Map();
    }
    /**
     * 查找根元素，并且降低 level。提高查找效率
     * @param {*} x
     * @returns
     */
    find(x) {
      let parent = this.parentHash.get(x);
      if (!parent) {
        this.parentHash.set(x, x);
        this.weightHash.set(x, 1);
        return x;
      }
      let temp = x;
      while (x !== parent) {
        x = parent;
        parent = this.parentHash.get(x);
        this.parentHash.set(temp, parent);
        // 权重要提升
        this.weightHash.set(
          temp,
          this.weightHash.get(x) * this.weightHash.get(temp)
        );
      }
      return parent;
    }

    union(x, y, v) {
      const rootX = this.find(x);
      const rootY = this.find(y);
      if (rootX !== rootY) {
        this.parentHash.set(rootX, rootY);
        this.weightHash.set(
          rootX,
          (this.weightHash.get(y) * v) / this.weightHash.get(x)
        );
      }
    }

    isConnected(x, y) {
      // 如果没有在集合里
      if (!this.parentHash.has(x) || !this.parentHash.has(y)) {
        return -1.0;
      } else {
        // find 过程会调整权重
        const rootX = this.find(x);
        const rootY = this.find(y);
        // 如果不是在一个集合里
        if (rootX !== rootY) {
          return -1.0;
        }
        return this.weightHash.get(x) / this.weightHash.get(y);
      }
    }
  }

  const unionFind = new UnionFind();

  const res = [];
  // 第一个循环是合并元素
  for (let i = 0; i < equations.length; i++) {
    const [x, y] = equations[i];
    unionFind.union(x, y, values[i]);
  }

  // 第二个循环 把权重相处
  for (let i = 0; i < queries.length; i++) {
    const [x, y] = queries[i];

    res.push(unionFind.isConnected(x, y));
  }

  return res;
};

calcEquation;
// @lc code=end

// a b = 2
// b c
// c c
//d  d
//a  d
