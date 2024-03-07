/**
 * 用一个栈来代替方法一中的递归过程。
每次向下搜索时，取出列表的当前指针指向的元素并将其入栈，
同时将该指针向后移动一位。
如此反复直到找到一个整数。循环时若栈顶指针指向了列表末尾，则将其从栈顶弹出

 * @param {*} nestedList 
 */
var NestedIterator = function(nestedList) {
  this.stack = nestedList;
};

NestedIterator.prototype.hasNext = function() {
  while (this.stack.length !== 0) {
      if (this.stack[0].isInteger()) {
          return true;
      } else {
          let cur = this.stack[0].getList();
          this.stack.shift();
          this.stack.unshift(...cur);
      }
  }
};

NestedIterator.prototype.next = function() {
  return this.stack.shift().getInteger();
};
