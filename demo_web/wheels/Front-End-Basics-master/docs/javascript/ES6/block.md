# [ES6]由块级作用域引出的一场变革

## 块级作用域又称词法作用域，存在于：

- 函数内部（函数作用域）
- 块中（字符 { 和 } 之间的区域）

<b style="color: #c03546">注意：ES6 允许块级作用域任意嵌套</b>

```
{{{{{{let text = 'Hello World!'}}}}}}
```

因为有了块级作用域，然后我们才有继续往下聊的可能。

## 1、 块级声明

块级声明是用于声明在指定块的作用域之外无法访问的变量。

## 2、 let 声明：用来声明一个块级作用域变量

1. 声明的变量具有块级作用域的特性

```
// 例子
function getValue (condition) {
    if (condition) {
        let value = 'blue';
        return value;
    }
    console.log(value)
    // 报错 value is not defined
}
getValue()
```

2. 在同一个作用域内不能使用 let 声明同名的变量

```
// 不管是var,const或者let,新的let声明之前同名的变量，都会报错
var count = 30;
let count = 40;
// 报错 Identifier 'count' has already been declared

// 函数形参和函数内部的let声明变量重名，报错
function test(value) {
    let value = 3;
}
test()
// 报错 Identifier 'value' has already been declared

// 在不同的作用域声明的变量重名是没问题的
let count = 30;
if(true) {
  let count = 40;
  // 不同的作用域，不会报错
}

```

3. 声明没有预解析（其实也是有的），不存在变量提升，有“临时死区”(TDZ)

从块的开始到变量声明这段的区域被称为临时死区，ES6 明确规定，如果区块中存在 let 和 const 命令，则这个区块对这些命令声明的变量从一开始就形成封闭作用域，只要在声明之前就使用这些变量（赋值，引用等等），就会报错。

```
if(true) {
    console.log(typeof value);
    // 报错 value is not defined

    let value = 'blue';
}
```

<b style="color: #c03546">注意：TDZ 是区域是“块开始”到“变量声明”，下面的例子不报错</b>

```
// typeof 说是相对安全，确实是，永远拿不到想要的结果
console.log(typeof value); // 打印 undefined，没有报错
if(true) {
    let value = 'red';
}
```

## 3、 const 声明：声明常量（如 PI），值一旦被设定后不可更改

1. 常量声明的值是不可变的

<b style="color: #c03546">注意：const 声明的对象不允许修改绑定，但可以修改该对象的属性值。</b>

```
const number = 6;
number = 5;
// 报错 Assignment to constant variable

const obj = {number: 1};
obj.number = 2; // 不报错

obj = {number: 3};
// 报错 Assignment to constant variable
```

2. 因为常量声明后值就不可更改了，所以声明时必须赋值

```
// 有效的常量
const count = 30;

// 报错 Missing initializer in const declaration
const name;
```

3. 声明的常量具有块级作用域的特性

```
if(true) {
    const number = 5;
}
console.log(number)
// 报错 number is not defined
```

4. 在同一个作用域内不能使用 const 声明同名的变量

```
var message = 'Hello';
let age = 25;

// 这两条语句都会报错
const message = 'Good';
const age = 30;
```

5. 声明没有预解析（其实也是有的），不存在变量提升，有“临时死区”(TDZ)

注：const 变量只能在声明时被初始化一次，之后再也不允许将全新的值赋值给 const 变量，但是，我们仍然可以修改 const 变量已经存在的值，例如修改对象的属性，数组的每一项等，只是不能重写 const 变量。

<br>

<b style="color: #4F86C6;">总结：一张表格</b>

| 声明方式 | 变量提升                                            | 作用域 | 是否需要初始值 | 重复定义 |
| -------- | --------------------------------------------------- | ------ | -------------- | -------- |
| var      | 是                                                  | 函数级 | 不需要         | 允许     |
| let      | 否（但是会预解析，要不解释器怎么知道 “临时死区”？） | 块级   | 不需要         | 不允许   |
| const    | 否（但是会预解析，要不解释器怎么知道 “临时死区”？） | 块级   | 需要           | 不允许   |

<b style="color: #fc913a;">扩展：再提一下变量命名，不管是 var、let、const 声明的变量名，可以由数字，字母，下划线及美元符号组成，但是不能以数字开头。美元符号可以放到任何一个位置，甚至单独一个美元符号。</b>

## 4、 循环中的块作用域绑定

> 循环中的 let 声明

```
// 第一个对比
// before
for(var i = 0; i < 5; i++) {
    // ... 省略一些代码
}
console.log(i)  // 5

//after
for(let i = 0; i < 5; i++) {
    // ... 省略一些代码
}
console.log(i) // 报错 i is not defined


// 第二个对比
// before
var funcs = [];
for(var i = 0; i < 10; i++) {
    funcs.push(() => {console.log(i)})
}
funcs.forEach((ele) => {
	ele()
})
// 打印 10次 10

// after
var funcs = [];
for(let i = 0; i < 10; i++) {
    funcs.push(() => {console.log(i)})
}
funcs.forEach((ele) => {
	ele()
})
// 打印 0 1 2 3 4 5 6 7 8 9
```

<b style="color: #c03546">注意：有一点很重要，let 声明在循环内部的行为是标准中专门定义的，它不一定与 let 不提升特性有关。</b>

> 循环中的 const 声明

```
// for 循环会报错
for (const i = 0; i < 1; i++) {
    console.log(i)
}
// 打印 0 ，然后报错 Assignment to constant variable.

// for-in 和 for-of 不会报错
var object = {
    a: true,
    b: true,
    c: true
};
for (const key in object) {
    // 不要在循环体内更改key的值，会报错
    console.log(key)
}
// 打印 a b c
```

<b style="color: #c03546">注意：const 可以应用在 for-in 和 for-of 循环中，是因为每次迭代不会修改已有绑定，而是会创建一个新绑定。</b>

## 5、 块级绑定最佳实践的进化

> ES6 早期

普遍认为默认使用 let 来替代 var,对于写保护的变量使用 const

> ES6 使用中

普遍默认使用 const，只有确实需要改变变量的值时使用 let。因为大部分变量的值在初始化后不应再改变，而预料之外的变量值的改变是许多 bug 的源头。这样就可以在某种程度上实现代码的不可变，从而防止某些错误的发生。

## 6、 全局变量将逐步与顶层对象的属性脱钩

顶层对象，在浏览器环境指的是 window 对象，在 Node 指的是 global 对象。

**为了保持兼容性，var 命令和 function 命令声明的全局变量，依旧是顶层对象的属性；**

```
var a = 1;
window.a // 1
```

![var 声明的a，在右侧 global 里面](./images/var.jpg)

另一方面规定，let 命令、const 命令、class 命令声明的全局变量，不属于顶层对象的属性。

![](./images/let.jpg)
上图可见 let 声明的变量，并没有在 Window 对象里，而是一个新的 Script 对象。

<b style="color: #fc913a;">扩展：如果需要在浏览器中跨 frame 或 window 访问代码，仍然可以用 var 在全局对象下定义变量。</b>

<b style="color: #c03546">注意：不使用 var 声明的变量非严格模式还是在跟之前一样会当成全局变量，严格模式下会直接报错。</b>

```js
'use strict'

a = 5 // 会报错 Uncaught ReferenceError: a is not defined
```

## 7、 块级函数

从 ECMAScript 6 开始，在严格模式下，块里的函数作用域为这个块。ECMAScript 6 之前不建议块级函数在严格模式下使用。

```
'use strict';

function f() {
  return 1;
}

{
  function f() {
    return 2;
  }
}

f() === 1; // true

// f() === 2 在非严格模式下相等
```

<b style="color: #c03546">注意：在非严格模式下不要用块级函数，因为在非严格模式下，块中函数的声明表现奇怪，有兼容性风险</b>

```
if (shouldDefineZero) {
   function zero() {     // DANGER: 兼容性风险
      console.log("This is zero.");
   }
}
```

ECMAScript 6 中，如果 shouldDefineZero 是 false，则永远不会定义 zero,因为这个块不执行。这是新标准定义的。然而，这里存在历史遗留问题，无论这个块是否执行，一些浏览器会定义 zero。

在严格模式下，所有支持 ECMAScript 6 的浏览器以相同的方式处理：只有在 shouldDefineZero 为 true 的情况下定义 zero，并且作用域只是这个块内。
