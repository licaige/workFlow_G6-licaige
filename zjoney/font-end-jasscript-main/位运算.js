// 4个bit 2的3次方 
// let a = 0b1000;
// console.log(Math.pow(2, 3)); // run code  8

// 2.js----------------
// let a = 0b100; //4
// let b = 0b011; //3
// console.log(a&b.toString(2));// 000 0
// console.log((a|b).toString(2));// 111 7
// console.log((a^b).toString(2));// 111 7
// 0b100数字1是负数,按位非远算结果是-（x+1），-(2的2次方+1)
// console.log(~a) // -5
// 100， 如果1标识符号位，-(2^2), -4
// console.log(~(a)); // -4
// -4(100)对应原码 011
// console.log(~(-4)); // +3

// 3.js-----------------
let a = 0b001;
// 左移
console.log((a << 2).toString()); // 4
// 无符号右移>>> 丢弃被移除的位，左侧补0
let b = 0b100;
console.log((b >>> 1).toString(2)); //0b010
// console.log((b>>>1).toString()); //2
// 有符号的右移，丢弃被移除的位，左侧填充最高位
let c = 0b101; // 正常来算5 符号位来算 -3

// console.log((c>>1).toString(2))
// 101
// 110-对应大图-2
console.log((-3 >> 1).toString(2))
/**
 * 获取优先级最低的
 * const InputDiscreteLanes = 0b11000
 * @param {*} lines 
 */
const InputDiscreteLanes = 0b11000
function getLowersPriotyLane(lines) {
  // 0000000000000000000000000011000
  // 31-26 = 5
  // 1<<4 10000
  let index = 31 - Math.clz32(lines)
  console.log('index', index);// 4
  console.log('Math.clz32(lines)', Math.clz32(lines));
  return 1 << index;
}
console.log(getLowersPriotyLane(InputDiscreteLanes));//0b10000 ->16

/**
 * 获取高位
 * @param {*} lines 0b11000
 * 
 */
// 11000
// 
function getHighestPriotyLane(lanes) {
  return lanes & -lanes;
}
console.log(getHighestPriotyLane(InputDiscreteLanes));

