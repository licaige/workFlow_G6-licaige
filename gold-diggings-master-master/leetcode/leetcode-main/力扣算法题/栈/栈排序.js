// 面试题 03.05. 栈排序


// 栈排序  栈顶保存最小的元素(由顶到底递增)
// 仅能使用一个辅助栈


// 方案  push的时候,持续弹栈, 找到位置, 存入栈
// 再将弹出的元素还原


var SortedStack = function () {
    this._stack = []
    this._helper = []
};

/** 
 * @param {number} val
 * @return {void}
 */
SortedStack.prototype.push = function (val) {
    if (this._stack.length == 0) {
        this._stack.push(val)
    }

    else {
        // 推入到适当位置
        while (true) {
            let top = this._stack[this._stack.length - 1]

            if (top < val) {
                this._helper.push(this._stack.pop())
            } else {
                this._stack.push(val)
                break
            }
        }

        // 还原移除的val
        while (this._helper.length > 0) {
            this._stack.push(this._helper.pop())
        }
    }
};

/**
 * @return {void}
 */
SortedStack.prototype.pop = function () {
    return this._stack.pop()
};

/**
 * @return {number}
 */
SortedStack.prototype.peek = function () {
    let res = this._stack[this._stack.length - 1]
    return typeof res == 'undefined' ? -1 : res
};

/**
 * @return {boolean}
 */
SortedStack.prototype.isEmpty = function () {
    return this._stack.length == 0
};