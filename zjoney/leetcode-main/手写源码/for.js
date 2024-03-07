const persons = ['郑昊川', '钟忠', '高晓波', '韦贵铁', '杨俊', '宋灿']
// 方法一
// for (let i = 0; i < persons.length; i++) {
//   console.log('1', persons[i])
// }
// // 方法二
// for (let i = 0, len = persons.length; i < len; i++) {
//   console.log('2',persons[i])
// }
// // 方法三
// for (let i = 0, person; person = persons[i]; i++) {
//   console.log('3',person)
// }
// // 方法四
// for (let i = persons.length; i--;) {
//   console.log('4',persons[i])
// }

const ARR_SIZE = 6666666
const hugeArr = new Array(ARR_SIZE).fill(1)

/* 
针对四种for循环，测试性能时间
node环境下记录方法执行前后内存中已用到的堆的差值 
*/
function heapRecord(fun) {
  if (process) {
    const startHeap = process.memoryUsage().heapUsed
    fun()
    const endHeap = process.memoryUsage().heapUsed
    const heapDiff = endHeap - startHeap
    console.log('已用到的堆的差值: ', heapDiff)
  } else {
    fun()
  }
}
// 方法一，普通for循环
function method1() {
  var arrCopy = []
  console.time('method1')
  for (let i = 0; i < hugeArr.length; i++) {
    arrCopy.push(hugeArr[i])
  }
  console.timeEnd('method1')
}
// 方法二，缓存长度
function method2() {
  var arrCopy = []
  console.time('method2')
  for (let i = 0, len = hugeArr.length; i < len; i++) {
    arrCopy.push(hugeArr[i])
  }
  console.timeEnd('method2')
}
// 方法三，取值和判断合并
function method3() {
  var arrCopy = []
  console.time('method3')
  for (let i = 0, item; item = hugeArr[i]; i++) {
    arrCopy.push(item)
  }
  console.timeEnd('method3')
}
// 方法四，i--与判断合并，倒序迭代
function method4() {
  var arrCopy = []
  console.time('method4')
  for (let i = persons.length; i--;) {
    arrCopy.unshift(persons[i]) // unshift或者 push
  }
  console.log('arrCopy', arrCopy)
  console.timeEnd('method4')
}
// method1()
// method2()
// method3()
method4() // 第种for写法，性能最好。其次unshift比push时间更快 