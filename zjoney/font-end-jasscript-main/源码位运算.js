// 2.effectList
const OP_INSERT = 1 << 0;//1,  0b01
const OP_REMOVE = 1 << 1;//2, 0b10
// console.log(OP_INSERT, OP_REMOVE);
let OP = 0b00;
// 增加一个插入操作
OP |= OP_INSERT
// 增加一个删除操作
OP |= OP_REMOVE
console.log(OP.toString(2)) // 11

// 删除操作
OP = OP &~OP_INSERT;// 01 => 10; 11&10=10
console.log(OP.toString(2));

// 判断是否包含
console.log((OP& OP_INSERT) === OP_INSERT) // false
console.log((OP& OP_INSERT) === OP_REMOVE) // true

// 判断是否不包含
console.log((OP& OP_INSERT) === 0) // true
console.log((OP& OP_REMOVE) === 0) // false