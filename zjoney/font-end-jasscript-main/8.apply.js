Function.prototype.myApply = function (content) {
  // Symbol防止key属性重叠
  const key = Symbol('key');
  content[key] = this;
  let res;
  if (arguments[1]) {
    res = content[key](...arguments[1])
  } else {
    res = content[key]()
  }
  delete content[key];
  return res;
}

const obj = { name: 'zjoney' }
function say() {
  const [age, height] = arguments;
  console.log(`My name is ${this.name}, My age is ${age},My height is ${height}`);
}
say.myApply(obj, [18, 176]);