
function* gen() {

}
let it = gen();
//[Function: [Symbol.iterator]]
//如果一个对象是一个迭代器的话，它身上会有一个属性Symbol.iterator 是一个函数
console.log(it[Symbol.iterator]);
let arr = [1, 2, 3];
console.log(arr[Symbol.iterator]);
for (let item of arr) {
  console.log(item);
}