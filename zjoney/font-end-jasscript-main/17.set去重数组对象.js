// 数组对象去重
const originData = [{ name: 'a' }, { name: 'b' }, { name: 'c' }, { name: 'e' }, { name: 'a' }, { name: 'b' }, { name: 'c' }];
const newData = new Set(originData.map(o=>JSON.stringify(o)));
// 开始去重
const uniqueData = [...newData].map(o=>JSON.parse(o));

console.log(uniqueData);