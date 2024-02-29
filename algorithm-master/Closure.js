/*
  闭包的本质：在一个函数内部创建另一个函数
  闭包的作用：闭包常常用来「间接访问一个变量」。换句话说，「隐藏一个变量」

  什么要 return add 呢？
  因为如果不 return，你就无法使用这个闭包。
  把 return add 改成 window.add = add 也是一样的，只要让外面可以访问到这个 add 函数就行。
  所以 return add 只是为了 add 能被使用，也跟闭包无关。
*/
function addLocal () {
	var local = 1
	function add () {
		local++
		return local
	}
	return add
}
var res = addLocal()
console.log('res:', res()) // 2