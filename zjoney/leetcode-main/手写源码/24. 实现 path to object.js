/**
 * 
手写一个可以转换 path 数组到对象的方法
 */
const pathToObjData = {
  'a.b': 1,
  'a.c': 2,
  'a.d.e': 5,
  'c': 3
}
/* 
返回结果
{ a: { b: 1, c: 2, d: { e: 5 } }, c: 3 }
*/

const pathToObj = function(pathList) {
  let res = {}
  for (let path in pathList) {
    let pathArr = path.split('.')
    pathToObjHelper(pathArr, pathList[path], res)
  }
  return res
}
const pathToObjHelper = function(pathArr, val, res) {
  if (pathArr.length === 0) {
    return val
  }

  let key = pathArr.shift()
  let obj = res[key] ? res[key] : {}
  res[key] = pathToObjHelper(pathArr, val, obj)

  return res
}
console.log(pathToObj(pathToObjData))