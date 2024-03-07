let a = 0b100;//4
let b = 0b011;//3
console.log((a & b).toString(2));//000 0
console.log((a | b).toString(2));//111 7 
console.log((a ^ b).toString(2));//111 7 
//按位非运算时，任何数字x的运算结果都是-(x + 1)。例如，〜4运算结果为-5
console.log((~a));//-5
console.log((~a).toString(2));//111