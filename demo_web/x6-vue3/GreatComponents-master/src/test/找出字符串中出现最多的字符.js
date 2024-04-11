// 找出字符串中出现最多的字符

// 方法一
let str = 'aaaavvvvvvvrrrrrrrrrrrrrzzz'
let ob = str.split('').reduce((a, b) => {
  if (a[0] == b) return a
  if (a.length == 0 || str.split(b).length - 1 > a[1]) return [b, str.split(b).length - 1]
  else return a
}, [])
console.log(ob) // ['r', 13]

// 方法二
let key, value
str.split('').forEach(a => {
  if (key == a) return
  if (!key || str.split(a).length - 1 > value) {
    key = a
    value = str.split(a).length - 1
  }
})
console.log(key, value) // 'r', 13

// 方法三
let strarr = []
str.split('').forEach(a => {
  if (strarr.find(i => i.k == a)) strarr.find(i => i.k == a).v++
  else strarr.push({ k: a, v: 1 }) 
})
let {k, v} = strarr.reduce((a, b) => {
  return a.v > b.v ? a : b
})
console.log(k, v) // 'r', 13