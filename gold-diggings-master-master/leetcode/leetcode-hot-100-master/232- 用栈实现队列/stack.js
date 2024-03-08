/*
 * @lc app=leetcode.cn id=232 lang=javascript
 *
 * [232] 用栈实现队列
 */

// @lc code=start

var MyQueue = function() {
    this.stack = []
    this.tempStack = [];
    this.size=0
};

/** 
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function(x) {

    while(this.stack.length){
        this.tempStack.push(this.stack.pop())
    };
    this.tempStack.push(x);
    while(this.tempStack.length){
        this.stack.push(this.tempStack.pop())
    }
    this.size++

};

/**
 * @return {number}
 */
MyQueue.prototype.pop = function() {
    this.size--;
    return this.stack.pop();
};

/**
 * @return {number}
 */
MyQueue.prototype.peek = function() {

    let result = null;
    if(this.size){
        result = this.stack.pop();
        this.stack.push(result)
    }
    return result
};

/**
 * @return {boolean}
 */
MyQueue.prototype.empty = function() {
    return this.size===0
};

/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */
// @lc code=end

