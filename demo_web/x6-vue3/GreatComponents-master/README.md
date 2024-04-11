# Great Components

## 一、介绍
### 1. 图片滤镜
public/滤镜.html

### 2. vue扩展组件库

+ SplitBox: 点击分裂

+ Bread: 面包屑组件，配合vue-router使用

+ Calendar: 日历组件，内含防抖动方法块，和组件无关可删除

+ Collapse: 折叠菜单

+ Dialog: 弹框

+ Header: 头导航组件

+ Preview: 文件预览（支持doc，pdf，video）

+ ScrollBoard/ScrollBoardItem: 滚动列表

+ Slider: 滑块组件

+ TextView: 百度热点文字翻转效果

+ LoginDialog: 单例组件 登录弹窗

### directive 指令

+ loading: 加载

+ scroll-show-all: 文字超宽时滚动展示

### scripts: 手写源码
+ myPromise: 手写pormise， components/Calendar.vue中有示例

+ plugin: 给异步加加载样式 
``this.$server(() => this.f1(delay), {target: this.$el})``

+ utils: 1）防抖和节流 2）深拷贝 3）解决小数点加减精度丢失的问题 4）判断类型

+ pureJS: 原生代码 1）发布订阅 2）手写bind、apply 3）快速排序

+ pubsub: 发布订阅，App.vue和components/Calendar.vue中有示例

+ storage: 封装localStorage

### test: 面试题测试
+ add.js: 大厂面试题add(1)(2)(3)()

+ 图片懒加载: 用防抖节流实现图片懒加载

+ 预编译： 1 创建AO对象 2 找形参和变量的声明 并赋值undefined 3 实参形参相统一 4 找函数声明 会覆盖变量的声明

+ BFC： 解决方式：1）float: left; 2）position: absolute; 3） display: inline-block;  4） overflow: hidden;

+ 事件循环： 调用栈  微任务队列  消息队列

+ Symbol：Reflect.ownKeys()可以获取到对象中的所有属性

+ this指向：fn() => fn.call(window);   a.fn() => a.fn.call(a)

+ 继承：1. 原型链继承 2. 构造函数继承 3. 组合式继承 4. 原型式继承 5. 寄生继承 6. 组合寄生继承 7. es6 class继承

+ 对象使用展开运算：给对象增加Symbol.iterator属性为一个函数，函数返回一个{next:fn, index: 0}，next函数判断函数是否超出，超出返回{done: true}

+ 找出字符串中出现最多的字符: 三种方法：reduce和forEach

+ class： class中挂载到原型链上的两种方法：1）static+this.prototype 2）fn () {}

+ 单例模式：场景 创建弹框，两种方式：1）闭包函数 2）es6 class类

+ 隐式转化：关系运算符的隐式转化

+ vue-cli: 使用webpack手动搭建vue-cli脚手架

+ 微队列：通过2种方式实现微队列，通过setTimeout的方式解决兼容性问题

### 渡一大师课

#### 1.事件循环

#### 2.浏览器渲染

#### 3.音乐播放器

#### 4.购物车

#### 5.属性描述符

#### 6.vue
## 二、软件架构
vue2.6 + vue-router + vuex + less

### 其他依赖

vue-video-player

## 三、安装教程

1.  安装依赖 npm i
2.  运行 npm run serve
3.  打包 npm run build

## 四、使用说明

1.  个人组件仓库

## 五、参与贡献

1.  暂无


## 六、特技

1.  Gitee 地址 [https://gitee.com/le_shui/GreatComponents](https://gitee.com/le_shui/GreatComponents)

跨标签页通信常见方案：

+ BroadCast Channel
+ Service Worker
+ LocalStorage window.onstorage 监听
+ Shared Worker 定时器轮询（setInterval）
+ IndexedDB 定时器轮询（setInterval）
+ cookie 定时器轮询（setInterval）
+ window.open、window.postMessage
+ websocket
