// String常用操作方法
// ①创建字符串
// var stringObject = new String('hello world')
var stringValue = 'hello world' // 其每一个实例都有一个length属性
console.log(stringValue.length) // 11
// ②字符方法
// 用于访问字符串中单个字符的方法：
// 1.charAt()
console.log(stringValue.charAt(1)) // 'e'
console.log(stringValue[1]) // 'e'，用方括号[ ]访问字符
// 2.charCodeAt()
// 若想得到的不是字符而是字符编码：
console.log(stringValue.charCodeAt(1)) // '101'(即'e'的字符编码)
// ③字符串操作方法
// 1.concat()：用于将一个或多个字符串拼接起来，返回拼接后的新字符串
var str = 'hello'
var result1 = str.concat(' world')
console.log(result1) // 'hello world'
var result2 = str.concat(' world' + '!')
console.log(result2) // 'hello world!'
// 在大多数情况下更喜欢使用加号操作符(+)拼接多个字符串
// 基于子字符串创建新字符串的方法：
// 2.slice()和substring()：第一个参数指定子字符串的开始位置，第二个参数指定子字符串最后一个字符后面的位置。
// 若没有第二个参数，则将字符串末尾作为结束位置
var stringValue = 'hello world'
console.log(stringValue.slice(1, 5)) // 'ello'
console.log(stringValue.substring(1, 5)) // 'ello'
console.log(stringValue.substring(1)) // 'ello world'
// 3.substr()：第一个参数指定子字符串的开始位置，第二个参数指定返回的字符个数。
// 若没有第二个参数，则将字符串末尾作为结束位置
console.log(stringValue.substr(2, 5)) // 'llo w'
console.log(stringValue.substr(2)) // 'llo world'
// 4.repeat()：返回新的字符串，表示将字符串重复指定次数返回
console.log('a'.repeat(3)) // 'aaa'
// ④字符串位置方法
// 1.indexOf()：从字符串的开头向后搜索子字符串，返回第一个匹配子字符串的位置，若没有找到，则返回-1。
var stringValue = 'hello world'
console.log(stringValue.indexOf('o')) // 4
console.log(stringValue.indexOf('ello')) // 1
// 2.lastIndexOf()：从字符串的末尾向前搜索子字符串，返回第一个匹配子字符串的位置，若没有找到，则返回-1。
console.log(stringValue.lastIndexOf('o')) // 7
// 两个方法还可以接收可选的第二个参数：表示从字符串中的哪个位置开始搜索
console.log(stringValue.indexOf('o', 6)) // 7
console.log(stringValue.lastIndexOf('o', 6)) // 4
// ⑤字符串迭代方法
var str = 'hello'
for (let i = 0; i < str.length; i++) {
  console.log(str[i]) // 字符串每项的值
}
for (const n of str) {
  console.log(n) // 字符串每项的值
}
for (const i in str) {
  console.log(i) // 字符串每项的索引值（string类型）
}
// ⑥trim()方法
// 创建一个字符串的副本，删除前置及后缀的所有空格。
var stringValue = '   hello world   '
console.log(stringValue.trim()) // 'hello world'
// ⑦includes()方法
// 方法用于判断一个字符串是否包含在另一个字符串中，根据情况返回 true 或 false
var stringValue = 'hello world'
console.log(stringValue.includes('e')) // true
console.log(stringValue.includes('ello')) // true
console.log(stringValue.includes('eo')) // false
// ⑧startsWith()方法
// 方法用来判断当前字符串是否以另外一个给定的子字符串开头，并根据判断结果返回 true 或 false
var stringValue = 'hello world'
console.log('starts:', stringValue.startsWith('he')) // true
console.log('starts:', stringValue.startsWith('eo')) // false
// 字符串大小写转换方法
var stringValue = 'hello world'
console.log(stringValue.toLocaleUpperCase()) // 'HELLO WORLD'
console.log(stringValue.toUpperCase()) // 'HELLO WORLD'
console.log(stringValue.toLocaleLowerCase()) // 'hello world'
console.log(stringValue.toLowerCase()) // 'hello world'
// Locale：是针对特定地区的实现，若不知道自己的代码在哪种语言环境中运行，还是使用针对地区的方法更稳妥一些。
// ⑨字符串模式匹配方法
// 1.match()：只接收一个参数，正则表达式或者RegExp对象，结果会返回一个数组。
// 方法的行为在很大程度上有赖于 regexp 是否具有标志 g。
// 如果 regexp 没有标志 g，那么 match() 方法就只能在 stringObject 中执行一次匹配。
// 如果没有找到任何匹配的文本， match() 将返回 null。否则，它将返回一个数组，其中存放了与它找到的匹配文本有关的信息。
console.log(str.match(/ain/g)) // ['ain', 'ain', 'ain']
console.log(str.match(/ain/gi)) // ['ain', 'AIN', 'ain', 'ain']
console.log(str.match(/k/gi)) // null
// 2.search()：只接收一个参数，用于检索字符串中指定的子字符串，或检索与正则表达式相匹配的子字符串。
// 结果返回字符串中第一个匹配项的索引，若没有匹配项，则返回-1。
var stringValue = 'hello world'
console.log(stringValue.search('world')) // 6
console.log(stringValue.search(/WORLD/)) // -1
console.log(stringValue.search(/WORLD/i)) // 6
// 3.replace()：替换子字符串的方法，接收两个参数：第一个参数是一个RegExp对象或者一个字符串(不会被转换成正则表达式)，第二个参数是一个字符串或者一个函数。
var text = 'cat,bat,sat,fat'
var result = text.replace('at', 'ond')
console.log(result) // 'cond,bat,sat,fat'
// 提供一个正则表达式，并指定全局（g）标志
result = text.replace(/at/g, 'ond')
console.log(result) // 'cond,bond,sond,fond'
// 4.split()：基于指定的分隔符将一个字符串分割成多个子字符串，并将结果放在一个数组中。分隔符可以是字符串或者一个RegExp对象，还可以接受第二个可选参数，用于指定数组的大小。
var colorText = 'red,blue,green,yellow'
var colors1 = colorText.split(',') // ['red', 'blue', 'green', 'yellow']
var colors2 = colorText.split(',', 2) // ['red', 'blue']
// ⑩localeCompare()方法
var stringValue = 'yellow'
// 具体返回的正数和负数未必是1和-1，需看实现
console.log(stringValue.localeCompare('brick')) // 1
console.log(stringValue.localeCompare('yellow')) // 0
console.log(stringValue.localeCompare('zoo')) // -1
// ⑪fromCharCode()方法
// String构造函数本身还有一个静态方法：fromCharCode()，接收一个或多个字符编码，然后将它们转换成一个字符串
console.log(String.fromCharCode(104,101,108,108,111)) // 'hello'

