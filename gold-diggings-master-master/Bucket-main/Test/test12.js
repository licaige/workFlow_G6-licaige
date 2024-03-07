const obj = {
    name: '小王',
    age: 20,
    firstName: '李'
}
const {name,...rest} = obj;
obj = rest;
console.log(obj);