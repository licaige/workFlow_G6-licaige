
/**
 * @param {number} timeToLive
 * 解题思路：哈希表
 * 按照题意，用一个哈希表 map 保存验证码和过期时间。调用 generate时，将验证码-过期时间对直接插入 map。调用 renew时，如果验证码存在并且未过期，则更新过期时间。调用 countUnexpiredTokens 时，遍历整个 map，统计未过期的验证码的数量
 */
var AuthenticationManager = function (timeToLive) {
  this.timeToLive = timeToLive
  this.manager = new Map() //管理所有token {}
  // this.manager = {}
};

/** 
 * @param {string} tokenId 
 * @param {number} currentTime
 * @return {void}
 */
AuthenticationManager.prototype.generate = function (tokenId, currentTime) {
  this.manager[tokenId] = currentTime
  this.manager.set(tokenId, currentTime + this.timeToLive);
};

/** 
 * @param {string} tokenId 
 * @param {number} currentTime
 * @return {void}
 */
AuthenticationManager.prototype.renew = function (tokenId, currentTime) {
  if ((this.manager.get(tokenId) || 0) > currentTime) {
    this.manager.set(tokenId, currentTime + this.timeToLive);
  }
};

/** 
 * @param {number} currentTime
 * @return {number}
 */
AuthenticationManager.prototype.countUnexpiredTokens = function (currentTime) {
  let result = 0
  for (const time of this.manager.values()) {
    if (time > currentTime) {
      res++;
    }
  }
  return result;

};

