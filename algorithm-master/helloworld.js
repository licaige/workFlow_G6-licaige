#! /usr/bin/env node
console.log('hello world')

const key = '你好'
var keyReg = eval('/^' + key + '$/g')
console.log(keyReg) // /^你好$/g

