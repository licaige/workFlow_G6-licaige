//import React from 'react';
let element = <h1>hello</h1>

//老的转换
React.createElement('h1',null,'hello');
//新版本

import jsx from 'jsx';
jsx('h1',null,'hello');
React17新加的功能为分界线



瑞思拜
为啥children放在props里面了, 有点奇怪 
bu
config. 会为 null 吗？ 
spr
第三个参数为什么不用剩余运算符， 
因为剩余运算符得到一定是数组


let element = <h1>hello<span>world</span></h1>



要想实现这种效果, 要借助babel的plugin-transform-react-jsx这个插件吧, 不然就报错了 
肉包子
是不是需要把 文本 也转成 react元素呢 

其实源码里并没有


React.createElement 没有像 vue.h 方法那样的多种写法是吗？ 


10:12
钟畅
为什么要包装成prop是字符串了 
钟畅
那不需要把这些放到props的children上嘛 
直接等于props不行么? react-text 


路人乙
为啥不一块处理儿子 


oldProps 看下怎么处理的 
10:39
路人乙
老属性为啥传空啊 



dom.style[attr] = styleObj[attr]==>  dom.style = styleObj;    
张仁阳
https://gitee.com/zhufengpeixun/zhufengreact202205/tree/master/1.basic 
943
symbol 相关的是不是应该都放在一个文件里 
10:50
张仁阳
1 
Dave


 dom.style[attr] = styleObj[attr] 改成后面的这个行么  dom.style = styleObj; 
 只是添加和修改，不能直接覆盖
多个子元素element的时候，createElement怎么递归调用的？代码里没看到递归呀 
 写源码的
<div><span><p></p></span></div>
编译 后
createElement('div' ,  createElement('span',   createElement('p')));
把编译后的代码放在浏览器里后
createElement('div' , {type:'span,props:{children:{type:'p'}}});
{type:'div',props:{children:{type:'span,props:{children:{type:'p'}}}}}

10:59
ganlu
style里面放props里面的属性怎么写呢 
style = {color:'red',backgroundCold:'green'}
青衣
React.createElement 是在react内部调用的吗，不用手动调用吗 
是的
有什么是 jsx 无法兼容的写法吗，跟原生之间 


英剑คิดถึง
刚才问的问题是动态的style吧 
bu
函数组件的虚拟DOM看一下吧～ 



路人乙
函数组件有儿子吗 
ganlu
style = {color: props.clolor} 
青衣
$$typeof 是什么 
没什么大用，就是一个类型标记，标记这个是一个React元素的虚拟DOM

943
jsx 可用动态标签吗，比如 <[xxx] /> 
不行


jsx 可用动态标签吗，比如 <[xxx] /> 
bu
props.children 原理是将 虚拟DOM直接传过去使用吗？  是的


虚拟 
王小玟
为什么要从内往外执行？ 


难忘记nice
这就是js的运行机制吧 
bu
函数就这么执行呀 
943
看下 mountFunctionComponent 



11:30
瑞思拜
先new 实例  然后调实例.render 


array的length不是只读的吗 
11:54




奈斯啊小刘超奈斯
pendindStates为什么要保存一下number:1 
因为后面要支持批量更新，所以需要数组暂存这些新的状态
setState();
setState();
今天有风
再看一下源码部分 
路人乙
为啥要forEach 覆盖属性啊 
英剑คิดถึง
老师。再说一下 create Element的执行时机 
 写的是JSX
 编译的时候babel把JSX成了React.createElement
 会在浏览器里执行，执行的时候 从内往 外的，先执行儿子的createElement,再执行父亲的createElement
青衣
shouleUpdate 不是已经将state 赋值给组件实例了吗，forceUpdate做什么处理呢 
更新真实DOM



存在数组为了做合并更新么/ 
943
后面有批量更新，代码为此做准备 
青衣
setState 调用了，但是数据没变也会强制更新组件吗 默认会的，但是是可以后面优化的
943
pendingStates.length = 0 可以把数组给清空吗？原来在内存里的数组元素还在吗 会被 垃圾回收了
forrest
是不可以理解为创建虚拟dom的动作是bable在处理？ 不可能




jsx 浏览器不认识，babel 转成可以被识别的 createElement 方法，放到浏览器中执行 是的
青衣
React 提供的方法，浏览器执行的时候调用方法 是的
瑞思拜
虚拟dom是render函数处理的, babel只是把jsx编译成render函数 
babel是把jsx编译 成React.createElement()



function Fun(){
  return <Fun2>
}
function Fun2(){
  return <Fun3>
}



英剑คิดถึง
是要开始比对了吗 
奈斯啊小刘超奈斯
findDOM再说一下 


奈斯啊小刘超奈斯
那现在是不是把所有vDom都替换了呀 
瑞思拜
这种直接replaceChildren性能是不是赶不上Vue里面打补丁这种方式 
a a a
replace的好像是虚拟dom啊 
a a a
debugg的 




Cara
为什么要这么设计 为了减少更新
王小玟
setState合并的原则是是什么？同一事件的就会合并么
 一个事件处理函数方法内部的更新都是批量
瑞思拜
减少更新次数 
王小玟
为什么setTimeout里面的就是同步的呢 
Cara
setTimeout里为什么却是立即执行 
奈斯啊小刘超奈斯
同一个事件里面的setState才会合并么 
是同一个函数中才会批量合并


在生命周期钩子里也是这样吗？是的 只要是React能够管理的方法，都是批量的
943
他这里每次+1，其实是同步加了，但是视图更新是合并的是吗 
不是
都是合并的
状态更新和视图更新都合并了，都 批量了
肉包子
开启批量更新   执行事件函数  关闭批量更新， settimeout是一步的 批量已经关闭了 所以就是同步的了？ 是的

这是由于react设计导致，并不是故意 的
因为在react控制批量更新， 是用一个标记变量 isBatchingUpdate =true false

在React18以后，在setTimeout也是批量的了，在新版本里是用的更新优先级来合并的


14:39
英剑คิดถึง
那这个setState到底是同步还是异步 

在事件函数里面就是批量 事件函数执行完  就是同步了 


如果是 shadowDom 的场景，这个原理是不是就不能用 react 
难忘记nice
target 
943
store 的值是什么时候塞进去的 
a a a撤回了一条消息


a a a撤回了一条消息
bu
updaters 为啥存的是 this ? 
updaters存的肯定 是Updater类的实例
路人乙
在捋一下 
a a a
onmousedown和click用的是一个update对象吗 是的
一个类的实例会有一个Updater实例

15:03
奈斯啊小刘超奈斯
store冒泡的那里不太懂,store是什么 
bu
提下代码吧 




批量更新执行的是最后一次的setState吗 不是
setState this.pendingStates.push(partialState);

943
updateQueue 定义在文件顶部，为什么可以做到事件独立，不会都塞在一起吗 
全局变量
a a a
那mousedown和click的 isbanchupdate也是同一个，会不会冲突，还是有先后顺序？
事件处理只能一个一个来 
spr
看package里，用的react是18版本的，刚才老师说：在React18以后，在setTimeout也是批量的了。为什么看效果好像不是批量更新的？ 
奈斯啊小刘超奈斯
因为渲染被禁掉了,没有用新的方法 
肉包子
感觉吧 更新的方法 用微任务包一下，就都是批量了 



造一个冒泡 
185****1937
模拟冒泡 
难忘记nice
因为是事件委托 
15:30
185****1937
不用考虑捕获过程吗 
难忘记nice
怎么阻止啊 
943
currentTarget 和 target 不是同一个东西吗，为啥要另外定义一个 
难忘记nice
要迭代往上找 所以要另外定义 
943
噢噢是的 
bu
这样会有问题吗？ 比如 儿子想取消默认事件， 但是父亲不想取消 
儿子想不冒泡
父亲想冒泡


15:47
测不准
现在 super 的前面是不是可以写其他代码了 
测不准
为什么要对象包裹current，直接返回呢？每次返回不会相互影响吧 
943
就是创建了一个引用，解析的时候去塞值 
bu
1 
青衣
出现循环绑定ref呢 


16:02
青衣
this要调 
难忘记nice
forwardRef那个方法吧 
难忘记nice
如果我只想暴露方法呢 

ForwardUsername = {$$typeof:Symbol('react.forward_ref')};

<ForwardUsername ref={this.usernameRef} />
babel转译
React.createElement(ForwardUsername,{ref:this.usernameRef});
在浏览器里执行后
{
  $$typeof:Symbol('react.element'),
  type:{$$typeof:Symbol('react.forward_ref'),render:老的函数组件},
  props:{},
  ref:this.usernameRef
}


难忘记nice
调用render方法把props和ref传进去，执行完之后ref就有值了 
Dave
ref = input => this.input =input 也是调用createRef 来的  
路人乙
再说一下 


16:37
943
{$$typeof, render}是在哪里塞到 react 元素中的 
bu
默认属性的 key 是固定的吗？ 会和接受的props合并？
是
是的




看下更新钩子那块 
瑞思拜
this为啥是当前instance呀 
路人乙
更新的时候在会走 forceupdate吗 
难忘记nice
我感觉源码是不是写的会更好点呀。有个dispatch之类的方法触发 



!classInstance.shouldComponentUpdate() 



16:56
943
能简化写法吗 
943
1 
a a a
shouldupdate 为flase state 也会变吗 
会的

17:04
青衣
更新是先父组件再子组件 
开始父组件
开始子组件
结束子组件
结束父组件

开始更新父组件
开始更新子组件
结束更新子线件
结束 更新父组件

测不准
老师，为什么will的生命周期会不安全了unsafe 


现在凡是will开头标记为不安全，不推荐用了
fiber的因为
在以前组件的渲染是同步的
现在是异步，并发的
可以暂停和恢复
did

componentWillUnmount 


感觉vue 也是一气呵成的渲染， 为啥vue感觉没做什么优化呢？ 

vue的更新是精准的
let a 2;

<div a>

let c = 3;
更新整个虚拟DOM树

老师  如果想通过ref调用函数组件上的方法，是否可以把函数组件的原型赋给ref呢？ 

haining
应该说的是想通过ref去调用组件内的方法吧 
王小玟
现在的hooks写法 不都是函数组件么  也都是在函数组件里面定义方法和变量 



1.初次挂载
Counter 1.constructor
Counter 2.componentWillMount
Counter 3.render
ChildCounter 1.componentWillMount
ChildCounter 2.render
ChildCounter 3.componentDidMount
Counter 4.componentDidMount

第1次点击
Counter 5.shouldComponentUpdate
第2次点击
Counter 5.shouldComponentUpdate
Counter 6.componentWillUpdate
Counter 3.render
ChildCounter 4.componentWillReceiveProps
ChildCounter 5.shouldComponentUpdate
Counter 7.componentDidUpdate
第3次点击
Counter 5.shouldComponentUpdate
第4次点击
Counter 5.shouldComponentUpdate
Counter 6.componentWillUpdate
Counter 3.render
ChildCounter 6.componentWillUnmount
Counter 7.componentDidUpdate
第5次点击
Counter 5.shouldComponentUpdate
第6次点击
Counter 5.shouldComponentUpdate
Counter 6.componentWillUpdate
Counter 3.render
ChildCounter 1.componentWillMount
ChildCounter 2.render
ChildCounter 3.componentDidMount
Counter 7.componentDidUpdate



20:30
bu
属性不更改也会执行这个钩子？ 会的

奈斯啊小刘超奈斯
刚来,现在在讲生命周期还是diff啊 
青衣
diff 
王小玟
diff 


bu
啥情况会走 165 行？ 
青衣
新老dom 都是组件，怎么知道是同一个组件的 
20:43



Counter 1.constructor
Counter 2.componentWillMount
Counter 3.render
ChildCounter 1.componentWillMount
ChildCounter 2.render
ChildCounter 3.componentDidMount
Counter 4.componentDidMount
Counter 5.shouldComponentUpdate
Counter 5.shouldComponentUpdate
Counter 6.componentWillUpdate
Counter 3.render
ChildCounter 4.componentWillReceiveProps
ChildCounter 5.shouldComponentUpdate
Counter 7.componentDidUpdate
Counter 5.shouldComponentUpdate
Counter 5.shouldComponentUpdate
Counter 6.componentWillUpdate
Counter 3.render
ChildCounter 6.componentWillUnmount
Counter 7.componentDidUpdate
Counter 5.shouldComponentUpdate
Counter 5.shouldComponentUpdate
Counter 6.componentWillUpdate
Counter 3.render
ChildCounter 1.componentWillMount
ChildCounter 2.render
ChildCounter 3.componentDidMount
Counter 7.componentDidUpdate



newVdom.dom 函数组件 这个值什么时候付上的？ 


20:57
英剑คิดถึง
新老虚拟节点都为空 是啥情况 
青衣



21:18
路人乙
react 的 空标签咋实现的 
奈斯啊小刘超奈斯
每个接节点都会有挂载索引么? 
bu
加 mountIndex 是干啥用的？ 

21:28
青衣
移动后，原有不动的老节点的mountIndex 怎么恢复正确的索引 
bu
为啥不直接用 遍历时的 index ne ? 

复用的是新的吗 
复用指的是复用老真实DOM，老的虚拟DOM肯定 是要扔掉不用的
bu
老节点 为啥不用index. ? 

标记后，统一处理？？ 
青衣
1 



bu
不是  比对的时候也遍历老的了， 为啥还得提前存一下呢？ 
没有遍历老节点
21:37
bu
不是 concat. 了 move吗？ 不把move的也删了 ？ 

路人乙
那 neKey 就没用啊 
bu
为什么 vue 不采用和react一样的 diff 处理呢？  
Dave
文本节点 ？ 

青衣
vue diff 比较麻烦点 
路人乙
正相比，反向比，交叉比 


dom树，怎么递归对比的呢 

在React里面不会进行跨节点 的复用




20:08
瑞思拜
react库还没换 
bu
getDerivedStateFromProps
 这个没理解为啥setState 会执行这个钩子，
 是父组件setState, 
 子组件会掉用这个钩子的意思吗？  
肉包子
自己还没实现呢 
肉包子
preState是指本组件上一次的state吗 
就 状态变更前的老的state



```js
const _context = {
  $$typeof: Symbol(react.context)
  Consumer: {$$typeof: Symbol(react.context), _context:_context}
  Provider: {$$typeof: Symbol(react.provider), _context: _context}
  _currentValue: undefined
}
```


20:55
奈斯啊小刘超奈斯
type._context哪里来的 
奈斯啊小刘超奈斯
type是什么? 

21:17
王小玟
老师  咱们现在实现的生命周期    好像不会触发子组件中的componentwillUpdate和componentDidUpdate 

会的

对于 Context 这种虚拟DOM 新旧应该是不相同的吧， 现在都是老的卸载， 新的创建吧？  
bu
我们实现的这种 
虚拟DOM永远都是用新的，不会复用的

npm eject



自己传compare， 一般是什么场景？ 
深比较 lodash

10:06
bu
为啥不直接用 oldVdom.props ?  
英剑คิดถึง
那个里面有children啥的吧 
children也是属性的一种
children变了也算更新



老师 这里为什么需要维护一个hookState，useState直接返回 [ newState, setState ] 不可以么？ 


useState里面有闭包,把current缓存了是么? 



compareTwoVdom(container,vdom,vdom); 为什要这么做呢？ 不应该从某个组件为root， 开始更新吗？ 
源码里的确是这么干的
因为React它不知道新的状态会影响 哪些组件



userState方法返回的数组第二个值叫setState，为什么用的时候，可以改名成setNumber？ 
肉包子
如果好几个hook中都执行了 scheduleUpdate  会合并吗 
现在实现的时候是没有合并的


但是对于类组件来说， setState 话不是从当前类组件开始的吗？
其实在真正的源码里，类组件也是从根节点开渲染的  
瑞思拜
 compareTwoVdom(container, vdom, vdom) 这个两个vdom为啥是一样的 可以再讲一下吗? 

通过 hookIndex 控制顺序， 如果有某个函数组件被删除了， 不会影响吗？ 
目前来说会的
FuncA   fiber {let hookStates = [],let hookIndex = 0;}
FuncB  fiber {let hookStates = [],let hookIndex = 0;}
FuncC  fiber {let hookStates = [],let hookIndex = 0;}

FuncA
FuncC

通过 hookIndex 控制顺序， 如果有某个函数组件被删除了， 不会影响吗？ 
bu
哦哦 

11:10
bu
每次都从根更新，即使有fiber， 应用越大性能会下降的厉害吗？  
会的

奈斯啊小刘超奈斯
从根节点更新时单个组件的根节点么 
Dave
有了轻重缓急了  
有了fiber 之后，有了更新优先级的概念。

肉包子
react 生态好 vue找个东西找半天 想转react 
奈斯啊小刘超奈斯
fiber 不是每个组件都缓存了 hookstate么?为啥还要所有组件都更新呀 

王小玟
react 的某个组件更新了  也会从跟节点整个重新渲染一次？ 是的
英剑คิดถึง
因为没有依赖收集嘛 是的


11:26
bu
data 每次都是一个新对象吧 
奈斯啊小刘超奈斯
如果吧memo去掉也会render吧 

那如果我想先调用第一个hook   然后直接调用第三个hook呢？ 
不要能
难忘记nice
之前不是单向链表吗，现在是修改了吗  = 单向链表=数组
bu
JS是单线程的 

useState接受函数的没说 



11:52
王小玟
老师 感觉useState 和 useReducer 很像。它们各自的使用场景应该是什么样的呢 
如果你可以方便的知道新状态是什么可以直接使用useState直接传入新的状态
如果你只是执行一个行动，结果 未知，或者说计算新状态的过程比较 复杂，可以使用useReducer

奈斯啊小刘超奈斯
useState初始值也可以穿函数么 

这种hookindex自增，
执行很多次那数组的内存会很大，会不会内存溢出问题，
现在那个数组相当于记录所有状态改变的快照嘛 

不会的
hookIndex = 0;

let hookState = [objA,objB];
let hookIndex = 2;


更新的时候
hookIndex = 0;
 hookState = [objC,objD];

 此时objA,objB已经被 垃圾回收了



14:18
王小玟
useEffect的依赖也是浅比较么 
bu
空数组， same 是true吧 
难忘记nice
数组一直是空的 
难忘记nice
数组的默认值应该是undefined 


那这个ref 是不是也可以换成一个全局变量 
