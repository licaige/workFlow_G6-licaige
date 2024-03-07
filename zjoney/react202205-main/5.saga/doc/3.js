function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

let it = gen();
let r1 = it.next();
console.log(r1);

let r2 = it.next();
console.log(r2);
//it.return('直接结束');//直接让saga结束了
try {
  it.throw('执行出错了');
} catch (e) {
  console.log(e);
}


let r3 = it.next();
console.log(r3);

let r4 = it.next();
console.log(r4);