/*
 * @lc app=leetcode.cn id=225 lang=javascript
 *
 * [225] 用队列实现栈
 */

// @lc code=start

var MyStack = function() {
    this.inQueue = [];

    this.outQueue = [];

    this.size = 0;

};

/** 
 * @param {number} x
 * @return {void}
 */
MyStack.prototype.push = function(x) {

    this.outQueue.push(x);
    while(this.inQueue.length){
        this.outQueue.push(this.inQueue.shift())
    }

    let temp = this.outQueue;
    this.outQueue = this.inQueue;
    this.inQueue = temp

    this.size++
};

/**
 * @return {number}
 */
MyStack.prototype.pop = function() {
    this.size--
    return this.inQueue.shift()
};

/**
 * @return {number}
 */
MyStack.prototype.top = function() {

    return this.inQueue[0]|| null

};

/**
 * @return {boolean}
 */
MyStack.prototype.empty = function() {
    return this.size===0
};

/**
 * Your MyStack object will be instantiated and called as such:
 * var obj = new MyStack()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.empty()
 */
// @lc code=end

