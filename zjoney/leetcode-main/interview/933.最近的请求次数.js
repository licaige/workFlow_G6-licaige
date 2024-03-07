/*
 *
 * [933] 最近的请求次数
 */
var RecentCounter = function() {
  this.arr = []
};

/** 
 * @param {number} t
 * @return {number}
 */
RecentCounter.prototype.ping = function(t) {
  this.arr.push(t)
  while(this.arr[0]<t-3000){
    this.arr.shift()
  }
  return this.arr.length
};
