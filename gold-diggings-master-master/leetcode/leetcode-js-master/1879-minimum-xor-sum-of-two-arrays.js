/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
const minimumXORSum = function (nums1, nums2) {
  const n = nums1.length
  const limit = 1 << n
  const dp = Array(limit).fill(Infinity)
  dp[0] = 0
  for (let mask = 1; mask < limit; ++mask) {
    for (let i = 0; i < n; ++i) {
      if ((mask >> i) & 1) {
        dp[mask] = Math.min(
          dp[mask],
          dp[mask ^ (1 << i)] + (nums1[bitCnt(mask) - 1] ^ nums2[i])
        )
      }
    }
  }
  return dp[limit - 1]
}

function bitCnt(num) {
  let res = 0
  while (num) {
    res++
    num = num & (num - 1)
  }

  return res
}


// another

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
const minimumXORSum = function (nums1, nums2) {
  const n = nums1.length, dp = Array(1 << n).fill(Infinity)
  return dfs(0, 0)
  function dfs(i, mask) {
    if(i === n) return 0
    if(dp[mask] !== Infinity) return dp[mask]
    for(let j = 0; j < n; j++) {
      if((mask & (1 << j)) === 0) {
        dp[mask] = Math.min(
          dp[mask], 
          (nums1[i] ^ nums2[j]) + dfs(i + 1, mask | (1 << j))
        )
      }
    }
    return dp[mask]
  }
}

// another

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
const minimumXORSum = function(nums1, nums2) {
  const dp = Array(1 << nums2.length).fill(Infinity)
  return dfs(dp, nums1, nums2, 0, 0)
};

function dfs(dp, a, b, i, mask) {
  if(i >= a.length) return 0
  if(dp[mask] === Infinity) {
    for(let j = 0; j < b.length; j++) {
      if((mask & (1 << j)) === 0) {
        dp[mask] = Math.min(dp[mask], (a[i] ^ b[j]) + dfs(dp, a, b, i + 1, mask + (1 << j)))
      }
    }
  }
  return dp[mask]
}

// another

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
const minimumXORSum = function (nums1, nums2) {
  const dp = Array(1 << nums2.length).fill(Infinity)
  return dfs(0, 0)
  
  function dfs(i, mask) {
    if(i >= nums2.length) return 0
    if(dp[mask] != Infinity) return dp[mask]
    for(let j = 0; j < nums2.length; j++) {
      if((mask & (1 << j)) === 0) {
        dp[mask] = Math.min(dp[mask], (nums1[i] ^ nums2[j]) + dfs(i + 1, mask + (1 << j)) )   
      }
    } 
    return dp[mask]
  }
}

// another

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
const minimumXORSum = function (nums1, nums2) {
  const n = nums1.length, dp = Array(1 << n).fill(Infinity)
  return dfs(0, 0)

  function dfs(i, mask) {
    if(i >= n) return 0
    if(dp[mask] !== Infinity) return dp[mask]
    for(let j = 0; j < n; j++) {
      if((mask & (1 << j)) === 0) {
        dp[mask] = Math.min(dp[mask], (nums1[i] ^ nums2[j]) + dfs(i + 1, mask | (1 << j)))
      }
    }
    return dp[mask]
  }
}

