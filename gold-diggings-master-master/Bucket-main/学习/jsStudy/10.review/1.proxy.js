// const obj = {
//     name: '星空海绵'
// }
// const handler = {
//     get() {
//         return 11
//     }
// }
// const p = new Proxy(obj, handler)
// console.log(p.a);

const target = {
    name: {
        age: 20
    }
}
const p = new Proxy(target, {})
p.name.age = 10;
console.log(target);
console.log(p);