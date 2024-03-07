// 1. 深拷贝

// (1)JSON.parse(JSON.stringify(obj));
// 缺点：处理不了undefined，function，Symbol类型,会直接忽略
// 处理不了循环引用的情况
// const obj = {
//     name: {
//         age: {
//             hight: undefined,
//             method: function () { },
//             type: Symbol(1)
//         }
//     }
// }
// const deepObj = JSON.parse(JSON.stringify(obj));
// console.log(obj);
// console.log(deepObj);

// （2）递归
// const obj = {
//     name: {
//         age: {
//             hight: undefined,
//             method: function () { },
//             type: Symbol(1)
//         }
//     }
// }

// function deepObj(obj) {
//     const copyObj = Array.isArray(obj) ? [] : {};
//     Object.keys(obj).forEach(item => {
//         if (typeof obj[item] === 'object' && obj[item] !== obj) {
//             copyObj[item] = deepObj(obj[item])
//         } else {
//             copyObj[item] = obj[item]
//         }
//     })
//     return copyObj;
// }
// const obj1 = deepObj(obj);
// console.log(obj1);

// 1.浅拷贝

// (1)展开语法
// const obj = {
//     name: '星空'
// }
// const obj1 = { ...obj }
// obj1.name = '海绵'
// console.log(obj);
// console.log(obj1);

// （2）Object.assign

// const obj = {
//     name: '星空'
// }
// const obj1 = Object.assign({}, obj);
// obj1.name = '海绵'
// console.log(obj);
// console.log(obj1);

// (3)遍历

// const obj = {
//     name: '星空'
// }
// const obj1 = {};
// Object.keys(obj).forEach(item => {
//     obj1[item] = obj[item]
// })
// obj1.name = '海绵'
// console.log(obj1);
// console.log(obj);