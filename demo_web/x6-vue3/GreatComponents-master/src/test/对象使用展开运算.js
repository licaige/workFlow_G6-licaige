// 能否用某种方式为下面语句使用展开运算符而不导致类型错误
// 错误代码示例

let obj = { x: 1, y: 2, z: 3 }
// console.log([...obj]) // [1, 2, 3]

obj[Symbol.iterator] = function () {

  return {
    next: function () {
      let objArr = Reflect.ownKeys(obj)
      if (objArr.length - 1 > this.index) {
        let key = objArr[this.index]
        this.index++
        return {
          value: obj[key]
        }
      } else {
        return {
          done: true
        }
      }
    },
    index: 0
  }
}

console.log([...obj]) // [1, 2, 3]