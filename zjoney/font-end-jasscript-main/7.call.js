Function.prototype.myCall = function (content) {
  // 使用 Symbol 防止 context 原有属性被覆盖
  const key = Symbol('key');
  content[key] = this;
  const args = [...arguments].slice(1);
  const res = content[key](...args);
  delete content[key];
  return res;
}
const obj = { name: 'zjoney' }
function say() {
  const [age, height] = arguments;
  console.log(`My name is ${this.name}, My age is ${age},My height is ${height}`);
}
say.myCall(obj, 18, 176);