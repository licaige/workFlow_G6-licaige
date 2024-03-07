奈斯啊小刘超奈斯
在项目中可以同时使用saga与tollkit么 
redux toolkit redux工具包
saga是 redux中间件
可以的
喜喜
不太理解纯函数 

09:49
bu
saga 中 yield  后 异步必须返回promise吗？  
并不是，异步处理有两种方式，一种是promise,一种是回调


09:54
喜喜
co库会把yield后面的值都转成promise吗 
喜喜
还是说会分别判断类型 


10:22
肉包子
put 派发的 是同步的吗 是的
bu
rootSage 没有 *  
bu
用了 yield  




一个 root 可以用多个 watcher监听吗 
喜喜
yield后面还可以跟迭代器吗 
yield 后面能跟的东西很多，可以跟JS对象 Promise  Iterator迭代器
白开水
saga跟thunk是不是一样的功能 可以这么认为
作用都是处理副作用的
bu
put 具体做了什么事情 ？只是 dispatch  ？ 是的 put就是一个指令 ，告诉saga中间件我要向仓库派发一个动作
bu
那我要是都两种异步，咋监听呢 ？ 第一个符合不就卡住了？ 
后面会讲 阻塞的监听方法，也有不阻塞的监听方法
11
不会占用内存吗？ 

100个学生
1
不执行的时候不会占用任何的空间，也不会消耗任何的资源

1个床位

那是不是每个watch里面都要写循环呀 
有语法糖


workerSaga是做具体工作的，具体是啥你自己写
workerSaga就是一个派发,不同的异步就是一个不同的 worker? 


10:46
肉包子
take put 都是saga的actionCreater方法 
PUT saga的dispatch方法做的事情 
都通过channel通知 channel.emit()

runSaga去 channel.once
做，
effectCreator
再捋捋过程老师 



为啥中间件哪里， 要先 next(action) 呢？  
肉包子
EVentemitter 不是 node 的吗 是的，需要安装浏览器版本 events

