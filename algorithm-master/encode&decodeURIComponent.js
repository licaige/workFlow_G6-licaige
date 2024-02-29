/*
  encodeURIComponent() 函数可把字符串作为 URI 组件进行编码。
  该方法不会对 ASCII 字母和数字进行编码，也不会对这些 ASCII 标点符号进行编码： - _ . ! ~ * ' ( ) 。
  其他字符（比如 ：;/?:@&=+$,# 这些用于分隔 URI 组件的标点符号），都是由一个或多个十六进制的转义序列替换的。
  decodeURIComponent() 函数可对 encodeURIComponent() 函数编码的 URI 进行解码。
*/
function parseUrl (url) {
  var res = {}
  var args = url.substr(url.indexOf('?') + 1)
  var argsArr = args.split('&')
  argsArr.forEach(item => {
    // 方法①
    const args = item.split('=')
    res[args[0]] = decodeURIComponent(args[1])
    // 方法②
    // res[item.substr(0, item.indexOf('='))] = decodeURIComponent(item.substr(item.indexOf('=') + 1))
  })
  return res
}
console.log('url:', parseUrl('https://www.genshuixue.com?user=gsx&id=111&name=%E5%BC%A0%E4%B8%89'))
