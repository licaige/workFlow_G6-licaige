// weakMap
let wm = new WeakMap()
// wm.set('a', 'b') // TypeError: Invalid value used as weak map key
 
var o1 = {},
    o2 = function () {}
 
wm.set(o1, 37)
wm.set(o2, 'azerty')
 
wm.has(o1) // true
wm.delete(o1)
wm.has(o1) // false

// weakSet
var ws = new WeakSet()
var obj = {}
var foo = {}
 
ws.add(obj)
// ws.add(1) // TypeError: Invalid value used in weak set

ws.has(foo) // false, foo 没有添加成功
console.log(ws.has(obj)) // true
ws.delete(obj)
console.log(ws.has(obj)) // false

let stephen = { name: 'curry', num: 30 }
ws.add(stephen)
console.log('ws:', ws)
stephen = null // 一个变量被置为null，意味着这个变量的内存可以被回收了
console.log('ws:', ws)
// 由于是弱引用，因此只要WeakSet实例中的对象不再被引用，那么 WeakSet 就直接为空了，也即WeakSet中的数据所占据的内存被释放了。
console.log('stephen:', ws.has(stephen)) // false

var s = new Set()
let klay = { name: 'klay', num: 11 }
s.add(klay)
klay = null
console.log('s:', s)
console.log('klay:', s.has(klay)) // false
console.log(typeof null) // object

