/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
  candidates.sort((a, b) => b-a);
  const res = [];
  
  const calCombs = (candis, resArr, targ) => {
    if (!candis.length) return ;
    console.log(candis, resArr, targ);
    const ele = candis[0];

    if (targ === ele) {
      res.push([...resArr, ele]);
    } else if (targ - ele > 0) {
      calCombs(candis.slice(), [...resArr, ele], targ-ele);
    }

    calCombs(candis.slice(1), [...resArr], targ);
  }

  calCombs(candidates, [], target);

  // console.log(res);
  return res;
};
