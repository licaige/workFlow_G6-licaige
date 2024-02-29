var arr = []
for (var i = 0; i < 10; i++) {
  arr.push(
    function() {
      console.log(i)
    }
  )
}
for (var i = 0; i < 10; i++) {
  arr[i]()
} // 0 1 2 3 4 5 6 7 8 9
// arr.forEach(fn => {
//   fn()
// }) // 10 10 10 10 10 10 10 10 10 10

var arr2 = []
for (var i = 0; i < 10; i++) {
  arr2.push(
    function () {
      setTimeout(() => {
        console.log(i)
      }, 0)
    }
  )
}
for (var i = 0; i < 10; i++) {
  arr2[i]()
}
