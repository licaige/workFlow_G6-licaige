/**
 * 根据身高队列重建HOT
 * https://leetcode-cn.com/problems/queue-reconstruction-by-height/
 * @param {number[][]} people
 * @return {number[][]}
 */
var reconstructQueue = function (people) {
  /**
      按身高从大到小排序,身高相等则前人数按从小到大排序
      [7,0],[7,1],[6,1],[5,0],[5,2],[4,5]
      第二个数决定了当前位置的前面有多少个身高大于等于当前位置的人数
      [7,0]
      [5,0],[7,0],[7,1]
      [5,0],[7,0],[6,1],[7,1]
      [5,0],[7,0],[5,2],[6,1],[7,1],[4,5]    
   */
  // 身高从大到小
  people.sort((a, b) => {
    if (a[0] === b[0]) {
      return b[1] - a[1];
    } else {
      return a[0] - b[0];
    }
  });
  const n = people.length;
  const ans = new Array(n).fill(0).map(() => []);
  for (let p of people) {
    let space = p[1] + 1;
    for (let i = 0; i < n; i++) {
      if (!ans[i].length) {
        space--;
        if (space === 0) {
          ans[i] = p;
          break;
        }
      }
    }
  }
  return ans;
};

const data = [[7, 0], [4, 4], [7, 1], [5, 0], [6, 1], [5, 2]];
console.log(reconstructQueue(data));
