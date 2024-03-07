Function.prototype.myBind = function (context) {
  // 
  const fn = this;
  const args = [...arguments].slice(1);
  const newFunc = function () {
    const newArgs = args.concat(...arguments);
    if (this instanceof newFunc) {
      // new方式调用
      fn.apply(this, newArgs);
    } else {
      // 普通方式调用 将函数内部this替换context
      fn.apply(context ,newArgs)
    }
  }
  // 支持new调用
  newFunc.prototype = Object.create(fn.prototype);
  return newFunc;
}

// test
const myName = {name: '张三丰'}
function say(){
  const [age, height ] = arguments;
  console.log(`my name is ${this.name}, my age is ${age}, my height is ${height}`);
}
console.log(say.myBind(myName, 16, 170)());
