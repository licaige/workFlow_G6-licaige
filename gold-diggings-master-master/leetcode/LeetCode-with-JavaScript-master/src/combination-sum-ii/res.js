/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function(candidates, target) {
  candidates.sort((a, b) => b-a);
  const res = [];
  
  const calCombs = (candis, resArr, targ) => {
    if (!candis.length) return ;
    const ele = candis[0];

    if (targ === ele) {
      res.push([...resArr, ele]);
    } else if (targ - ele > 0) {
      calCombs(candis.slice(1), [...resArr, ele], targ-ele);
    }

    let sliceIndex = 0;
    while (sliceIndex < candis.length && candis[0] === candis[sliceIndex]) {
      sliceIndex++;
    }
    calCombs(candis.slice(sliceIndex), [...resArr], targ);
  }

  calCombs(candidates, [], target);

  // console.log(res);
  return res;
};
