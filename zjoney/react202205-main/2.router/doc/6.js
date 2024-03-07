console.log('1a'.match(/\d[a-z][a-z]/));

//正向肯定 往前看就是往右看，必须根着什么东西
//console.log('1b'.match(/\d(?=[a-b]{2})[b-c]/));
//正向否定
//console.log('1a'.match(/\d(?![A-Z])[a-z]/));
//反向肯定
//console.log('b1a'.match(/(?<=[a-z])\d[a-z]/));
//的向否定
console.log('A1a'.match(/(?<![a-z])\d[a-z]/));
/**
肉包子
那把后面那个 [a-z] 去掉呢 还能匹配到吗 肯定能
喜喜
后面必须跟着什么  是从哪个起的后面必须跟着什么 
ganlu
跟直接写\d[a-z]有啥区别呢 

肉包子
不消耗吗不是 
难忘记nice
?= 就是 匹配但是不占位的意思吗 
cv老油条
这比喻真恰当 
spr
true 

 */