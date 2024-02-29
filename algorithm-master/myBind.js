function getName (a, b) {
  return this.name + a + b
}
Function.prototype.myBind = function (context) {
  var _this = this
  // 将arguments对象转为数组
  var args = [...arguments]
  args = args.slice(1) // 截取得到除第一个参数外的其余参数
  console.log('args:', args) // ['&', '30']
  return function () {
    return _this.apply(context, args) // apply第二个参数接收一个参数数组
  }
}
var player = {
  name: 'curry'
}
var myBindName = getName.myBind(player, '&', '30') // 将第一个参数player作为函数的this上下文，其余参数作为函数的入参
console.log(myBindName) // f () {...}
console.log('myBindName:', myBindName()) // curry&30

var bindName = getName.bind(player, '&', '30')
console.log('bindName:', bindName()) // curry&30