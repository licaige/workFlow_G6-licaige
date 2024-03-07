// 创建实例
const urlParams = new URLSearchParams(window.location.search);
// 将键值对列表转成对象
const data = Object.fromEntries(urlParams.entries());
console.log(data);