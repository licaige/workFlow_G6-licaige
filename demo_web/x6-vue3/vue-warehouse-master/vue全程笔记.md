# 基础Ant Design of Vue

## 1.开始使用

### 安装和初始化 

```bash
$ npm install -g @vue/cli
$ vue create antd-demo
//若安装缓慢报错，可尝试用 `cnpm` 或别的镜像源自行安装：`rm -rf node_modules && cnpm install`。
$ cd antd-demo
$ npm install
$ npm run serve
```

此时浏览器会访问 http://localhost:8080/ ，看到 `Welcome to Your Vue.js App` 的界面就算成功了。

这是 vue-cli 生成的默认目录结构。

```null
├── README.md
├── babel.config
├── package.json
├── public
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── assets
│   │   └── logo.png
│   ├── components
│   │   └── HelloWorld.vue
│   ├── App.vue
│   └── main.js
└── yarn.lock
```

现在从 yarn 或 npm 安装并引入 ant-design-vue。

```bash
$ yarn add ant-design-vue 
//或者
$ npm i --save ant-design-vue
```

修改 `src/main.js`，引入 antd 的按钮组件以及全部样式文件。

```jsx
import Vue from 'vue';
//import Antd from 'ant-design-vue';全部引入，不推荐
import Button from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import App from './App';

Vue.config.productionTip = false;

//Vue.use(Antd);全部引入，不推荐
Vue.use(Button);

new Vue({
  render: h => h(App),
}).$mount('#app');
```

修改 `src/App.vue`的 template 内容。

```jsx
<template>
  <div id="app">
    <img src="./assets/logo.png">
    <a-button type="primary">Button></a-button>
  </div>
</template>
```

好了，现在你应该能看到页面上已经有了 antd 的蓝色按钮组件，接下来就可以继续选用其他组件开发应用了。其他开发流程你可以参考 vue-cli 的官方文档。

### 高级配置 

我们现在已经把组件成功运行起来了，但是在实际开发过程中还有很多问题，例如上面的例子实际上加载了全部的 antd 组件的样式（对前端性能是个隐患）。

此时我们需要对 vue-cli 的默认配置进行自定义。

#### 使用 babel-plugin-import 

babel-plugin-import 是一个用于按需加载组件代码和样式的 babel 插件。

```bash
$ yarn add babel-plugin-import --dev
或者
$ npm install babel-plugin-import --save-dev
```

#### 使用 vue-cli 2 的小伙伴 

修改`.babelrc`文件，配置 babel-plugin-import

```diff
  {
    "presets": [
      ["env", {
        "modules": false,
        "targets": {
          "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
        }
      }],
      "stage-2"
    ],
-   "plugins": ["transform-vue-jsx", "transform-runtime"]
+   "plugins": [
+     "transform-vue-jsx",
+     "transform-runtime",
+     ["import", { "libraryName": "ant-design-vue", "libraryDirectory": "es", "style": "css" }]
+   ]
  }
```

#### 使用 vue-cli 3 的小伙伴 

修改`babel.config.js`文件，配置 babel-plugin-import

```diff
 module.exports = {
  presets: ["@vue/app"],
+  plugins: [
+    [
+      "import",
+            { libraryName: 'ant-design-vue', libraryDirectory: 'es', style: 'css' } 
+    ]
+  ]
};
```

注意： `style: true` 会加载 less 文件，此时需要安装组件

```bash
$ npm install less less-loader --save-dev
$ npm install less --save-dev
```

### 修改引入

然后移除前面在 `src/main.js` 里全量添加的 `import 'ant-design-vue/dist/antd.css';` 样式代码，并且按下面的格式引入模块。

```diff
  // src/main.js
  import Vue from 'vue'
- import Button from 'ant-design-vue/lib/button';
+ import { Button } from 'ant-design-vue';
- import 'ant-design-vue/dist/antd.css'
  import App from './App'

  Vue.config.productionTip = false

  Vue.use(Button);

  new Vue({
    render: h => h(App)
  }).$mount("#app");
```

最后重启 `npm run serve` 访问页面，antd 组件的 js 和 css 代码都会按需加载，你在控制台也不会看到这样的警告信息。

## 2.定制主题(暂时没啥用)

![img](https://zos.alipayobjects.com/rmsportal/zTFoszBtDODhXfLAazfSpYbSLSEeytoG.png)

### Ant Design Vue 的样式变量 

antd 的样式使用了 Less作为开发语言，并定义了一系列全局/组件的样式变量，你可以根据需求进行相应调整。

以下是一些最常用的通用变量，所有样式变量可以在这里找到。

```less
@primary-color: #1890ff; // 全局主色
@link-color: #1890ff; // 链接色
@success-color: #52c41a; // 成功色
@warning-color: #faad14; // 警告色
@error-color: #f5222d; // 错误色
@font-size-base: 14px; // 主字号
@heading-color: rgba(0, 0, 0, 0.85); // 标题色
@text-color: rgba(0, 0, 0, 0.65); // 主文本色
@text-color-secondary: rgba(0, 0, 0, 0.45); // 次文本色
@disabled-color: rgba(0, 0, 0, 0.25); // 失效色
@border-radius-base: 4px; // 组件/浮层圆角
@border-color-base: #d9d9d9; // 边框色
@box-shadow-base: 0 2px 8px rgba(0, 0, 0, 0.15); // 浮层阴影
```

如果以上变量不能满足你的定制需求，可以给我们提 issue。

### 定制方式

我们使用 modifyVars 的方式来进行覆盖变量。下面将针对不同的场景提供一些常用的定制方式。

#### 在 webpack 中定制主题 

我们以 webpack@4 为例进行说明，以下是一个 `webpack.config.js` 的典型例子，对 less-loader 的 options 属性进行相应配置。

```diff
// webpack.config.js
module.exports = {
  rules: [{
    test: /\.less$/,
    use: [{
      loader: 'style-loader',
    }, {
      loader: 'css-loader', // translates CSS into CommonJS
    }, {
      loader: 'less-loader', // compiles Less to CSS
+     options: {
+       lessOptions: {  // If you are using less-loader@5 please spread the lessOptions to options directly
+         modifyVars: {
+           'primary-color': '#1DA57A',
+           'link-color': '#1DA57A',
+           'border-radius-base': '2px',
+         },
+         javascriptEnabled: true,
+       }
+     },
    }],
    // ...other rules
  }],
  // ...other config
}
```

注意 less-loader 的处理范围不要过滤掉 `node_modules` 下的 antd 包。

#### 在 vue cli 2 中定制主题

修改`build/utils.js`文件

```diff
// build/utils.js
- less: generateLoaders('less'),
+ less: generateLoaders('less', {
+   modifyVars: {
+     'primary-color': '#1DA57A',
+     'link-color': '#1DA57A',
+     'border-radius-base': '2px',
+   },
+   javascriptEnabled: true,
+ }),
```

#### 在 vue cli 3 中定制主题

项目根目录下新建文件`vue.config.js`

```js
// vue.config.js for less-loader@6.0.0
module.exports = {
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          // If you are using less-loader@5 please spread the lessOptions to options directly
          modifyVars: {
            'primary-color': '#1DA57A',
            'link-color': '#1DA57A',
            'border-radius-base': '2px',
          },
          javascriptEnabled: true,
        },
      },
    },
  },
};
```

#### 配置 less 变量文件 

另外一种方式是建立一个单独的 `less` 变量文件，引入这个文件覆盖 `antd.less` 里的变量。

```css
@import '~ant-design-vue/dist/antd.less'; // 引入官方提供的 less 样式入口文件
@import 'your-theme-file.less'; // 用于覆盖上面定义的变量
```

注意，这种方式已经载入了所有组件的样式，不需要也无法和按需加载插件 `babel-plugin-import` 的 `style` 属性一起使用。

#### 没有生效？

注意样式必须加载 less 格式，一个常见的问题就是引入了多份样式，less 的样式被 css 的样式覆盖了。

- 如果你在使用 [babel-plugin-import]的 `style` 配置来引入样式，需要将配置值从 `'css'` 改为 `true`，这样会引入 less 文件。
- 如果你是通过 `'ant-design-vue/dist/antd.css'` 引入样式的，改为 `ant-design-vue/dist/antd.less`。

## 3.国际化(暂时没啥用)

## 4.组件

Components(63)

- General
    - [Button按钮](https://1x.antdv.com/components/button-cn/)
    - [Icon图标](https://1x.antdv.com/components/icon-cn/)
- Layout
    - [Grid栅格](https://1x.antdv.com/components/grid-cn/)
    - [Layout布局](https://1x.antdv.com/components/layout-cn/)
    - [Space间距](https://1x.antdv.com/components/space-cn/)
- Navigation
    - [Affix固钉](https://1x.antdv.com/components/affix-cn/)
    - [Breadcrumb面包屑](https://1x.antdv.com/components/breadcrumb-cn/)
    - [Dropdown下拉菜单](https://1x.antdv.com/components/dropdown-cn/)
    - [Menu导航菜单](https://1x.antdv.com/components/menu-cn/)
    - [PageHeader页头](https://1x.antdv.com/components/page-header-cn/)
    - [Pagination分页](https://1x.antdv.com/components/pagination-cn/)
    - [Steps步骤条](https://1x.antdv.com/components/steps-cn/)
- Data Entry
    - [AutoComplete自动完成](https://1x.antdv.com/components/auto-complete-cn/)
    - [Cascader级联选择](https://1x.antdv.com/components/cascader-cn/)
    - [Checkbox多选框](https://1x.antdv.com/components/checkbox-cn/)
    - [DatePicker日期选择框](https://1x.antdv.com/components/date-picker-cn/)
    - [Form表单](https://1x.antdv.com/components/form-cn/)
    - [FormModel表单](https://1x.antdv.com/components/form-model-cn/)
    - [Input输入框](https://1x.antdv.com/components/input-cn/)
    - [InputNumber数字输入框](https://1x.antdv.com/components/input-number-cn/)
    - [Mentions提及](https://1x.antdv.com/components/mentions-cn/)
    - [Radio单选框](https://1x.antdv.com/components/radio-cn/)
    - [Rate评分](https://1x.antdv.com/components/rate-cn/)
    - [Select选择器](https://1x.antdv.com/components/select-cn/)
    - [Slider滑动输入条](https://1x.antdv.com/components/slider-cn/)
    - [Switch开关](https://1x.antdv.com/components/switch-cn/)
    - [TimePicker时间选择框](https://1x.antdv.com/components/time-picker-cn/)
    - [Transfer穿梭框](https://1x.antdv.com/components/transfer-cn/)
    - [TreeSelect树选择](https://1x.antdv.com/components/tree-select-cn/)
    - [Upload上传](https://1x.antdv.com/components/upload-cn/)
- Data Display
    - [Avatar头像](https://1x.antdv.com/components/avatar-cn/)
    - [Badge徽标数](https://1x.antdv.com/components/badge-cn/)
    - [Calendar日历](https://1x.antdv.com/components/calendar-cn/)
    - [Card卡片](https://1x.antdv.com/components/card-cn/)
    - [Carousel走马灯](https://1x.antdv.com/components/carousel-cn/)
    - [Collapse折叠面板](https://1x.antdv.com/components/collapse-cn/)
    - [Comment评论](https://1x.antdv.com/components/comment-cn/)
    - [Descriptions描述列表](https://1x.antdv.com/components/descriptions-cn/)
    - [Empty空状态](https://1x.antdv.com/components/empty-cn/)
    - [List列表](https://1x.antdv.com/components/list-cn/)
    - [Popover气泡卡片](https://1x.antdv.com/components/popover-cn/)
    - [Statistic统计数值](https://1x.antdv.com/components/statistic-cn/)
    - [Table表格](https://1x.antdv.com/components/table-cn/)
    - [Tabs标签页](https://1x.antdv.com/components/tabs-cn/)
    - [Tag标签](https://1x.antdv.com/components/tag-cn/)
    - [Timeline时间轴](https://1x.antdv.com/components/timeline-cn/)
    - [Tooltip文字提示](https://1x.antdv.com/components/tooltip-cn/)
    - [Tree树形控件](https://1x.antdv.com/components/tree-cn/)
- Feedback
    - [Alert警告提示](https://1x.antdv.com/components/alert-cn/)
    - [Drawer抽屉](https://1x.antdv.com/components/drawer-cn/)
    - [Message全局提示](https://1x.antdv.com/components/message-cn/)
    - [Modal对话框](https://1x.antdv.com/components/modal-cn/)
    - [Notification通知提醒框](https://1x.antdv.com/components/notification-cn/)
    - [Popconfirm气泡确认框](https://1x.antdv.com/components/popconfirm-cn/)
    - [Progress进度条](https://1x.antdv.com/components/progress-cn/)
    - [Result结果](https://1x.antdv.com/components/result-cn/)
    - [Skeleton骨架屏](https://1x.antdv.com/components/skeleton-cn/)
    - [Spin加载中](https://1x.antdv.com/components/spin-cn/)
- Other
    - [Anchor锚点](https://1x.antdv.com/components/anchor-cn/)
    - [BackTop回到顶部](https://1x.antdv.com/components/back-top-cn/)
    - [ConfigProvider全局化配置](https://1x.antdv.com/components/config-provider-cn/)
    - [Divider分割线](https://1x.antdv.com/components/divider-cn/)
    - [LocaleProvider国际化](https://1x.antdv.com/components/locale-provider-cn/)

# Vue基础知识

## 一、邂逅vue

### 安装

> 方式一：直接CDN引入
>
> ```html
> <!-- 开发环境版本，包含了有帮助的命令行警告 -->
> 
> <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
> 
> <!-- 生产环境版本，优化了尺寸和速度 -->
> 
> <script src="https://cdn.jsdelivr.net/npm/vue"></script>
> ```
>
> 方式二：下载和引入
>
> ```html
> 开发环境：https://vuejs.org/js/vue.js
> 生产环境：https://vuejs.org/js/vue.min.js
> ```
>
> 方式三：npm安装
>

### 初体验

> 1.文本展示（{{name}}）
>
> ```html
> 		<div id="app">
> 			<h1>{{message}}</h1>
> 			<h2>{{name}}</h2>
> 		</div>
> 
> 		<!-- 声明式编程 -->
> 		<script>
> 			const app = new Vue({
> 				// 用于挂载要管理的元素
> 				el:'#app',
> 				// 定义数据
> 				data:{
> 					message:'你好，那个人！',
> 					name:'星辰'
> 				}
> 			})
> 		</script>
> ```
>
> 2.列表展示（v-for="item in movies"）
>
>
> ```html
> <div id="app">
> 	<ul>
> 		<li v-for="item in movies">{{item}}</li>
> 	</ul>
> </div>	
> <script>
> 	const app = new Vue({
> 		el:'#app',
> 		data:{
> 			message:'你好！',
> 			movies:['三国志','大话西游','盗墓笔记','少年派']
> 		}
> 	})
> </script>
> ```
> 3.计数器（v-on:click）
>
> ```html
> 		<div id="app">
> 			<h2>当前计数：{{counter}}</h2>
> 			<!-- <button v-on:click="counter++">+</button>
> 			<button v-on:click="counter--">-</button> -->
> 			<button v-on:click="add">+</button>
> 			<button v-on:click="sub">-</button>
> 		</div>
> 		
> 		<script>
> 			const app = new Vue({
> 				el:'#app',
> 				data:{
> 					counter:0
> 				},
> 				methods:{
> 					add:function(){
> 						console.log("add被执行！");
> 						this.counter++;
> 						// alert("add被执行！");
> 					},
> 					sub:function(){
> 						console.log("sub被执行！");
> 						this.counter--;
> 						// alert("sub被执行！");
> 					}
> 				}
> 			})
> 		</script>
> ```
>

### MVVM架构

M:model——数据

V:view——页面视图

VM:ViewModel——创建的vue对象：dom监听和数据绑定

![image-20210713084813987](C:\Users\14403\AppData\Roaming\Typora\typora-user-images\image-20210713084813987.png)


```html
	<div id="app">
			<h2>当前计数：{{counter}}</h2>
			<!-- <button v-on:click="counter++">+</button>
			<button v-on:click="counter--">-</button> -->
			<button v-on:click="add">+</button>
			<button v-on:click="sub">-</button>
	</div>

	<script>
		const obj = {
			counter:0
		}
		const app = new Vue({
			el: '#app',
			data: obj,
			methods: {
				add:function(){
					console.log("add被执行！");
					this.counter++;
					// alert("add被执行！");
				},
				sub:function(){
					console.log("sub被执行！");
					this.counter--;
					// alert("sub被执行！");
				}
			}
		})
	</script>
```
### vue扩展插件

#### 1）vue-cli：脚手架

#### 2）vue-resource(axios)：ajax请求

#### 3）vue-router：路由

#### 4）vuex：状态管理

#### 5）vue-lazyload：图片懒加载

#### 6）vue-scroller：页面滑动相关

#### 7）mint-ui：基于vue的UI组件库（移动端）

#### 8）element-ui：基于vue的UI组件库（pc端）

## 二、Vue基础语法

### 属性总结：

```javascript
//1.绑定对象el
//2.绑定数据data
//3.绑定方法methods
//4.计算属性computed
//5.监视属性watch
//6.钩子函数（生命周期）： beforeCreate()、created()、beforeMount()、mounted()、beforeUpdate()、updated()、beforeDestory()、destoryed()
//7.过滤器
//8.注册局部指令directives
-------------------------------------------------------------------------------------------------------------------
//定义过滤器
Vue.filter(filterName, function(arg1,arg2,...){
	// 进行一定的数据处理
	return newValue
})
//注册全局指令（名字：upper-text）（使用：v-upper-text）
Vue.directive('upper-text', function (el, binding) {
	el.innerHTML = binding.value.toUpperCase()
})

new Vue({
    el: '#example',								
    data:{										
    	newTodoText: '',
  		visitCount: 0,
  		hideCompletedTodos: false,
  		todos: [],
  		error: null
        },
    methods:{
        destoryVm(){}
    },
    computed: {
		fullName: function () {
			return this.firstName + " " + this.lastName
		},
		fullName3: {
			get: function () {
				return this.firstName + " " + this.lastName
			},
			set: function (value) {
				var names = value.split(' ')
				this.firstName = names[0]
				this.lastName = names[1]
			}
		}
	},
	watch: {
		lastName: function (newVal, oldVal) {
			this.fullName2 = this.firstName + ' ' + newVal
		}
	},
    directives: { // 注册局部指令（名字：lower-text）（使用：v-lower-text）
		'lower-text': {
			bind (el, binding) {
				el.innerHTML = binding.value.toLowerCase()
			}
		}
	}
})


vm.$watch('firstName', function (val) {
	this.fullName2 = val + ' ' + this.lastName
})
```



### 语法总结：

```javascript
1.{{}}							  向页面输出数据,可以调用对象的方法，例：
								 {{msg}}
								 {{msg.toUpperCase()}}
2.v-if/v-else-if/v-else   v-show	条件渲染，例：
								 v-if="ok"
								 v-show="!ok"
3.v-bind/:						  指定变化的属性值(强制属性绑定),例：					
								 :xxx='yyy'
4.v-on/@						  绑定指定事件名的回调函数(事件绑定),例：
								 @keyup='xxx'
								 @keyup='xxx(参数)'
								 @keyup.enter='xxx'
5.v-for							  列表渲染，例：
								 <li v-for="(p, index) in persons" :key="index">
                                    <li v-for="(value, key) in persons[0]">
6.v-model 						  对表单数据自动收集
```



### 2.vue的基本使用

```json
标签使用
1.遍历：
		<li v-for="item in movies">{{item}}</li>
		<li v-for="(p,index) in persons":key=index>{{index}}---{{p.name}}---{{p.age}}</li>
2.绑定事件：<button v-on:click="add">+</button>
		  <button @click="add">+</button>
3.双向数据绑定：<input type="text" v-model="username">
4.innerHTML：<h1 v-html="msg"></h1>
5.显示文本：<h1 v-text="msg"></h1>
6.强制属性绑定：
			<h2>1.图片绑定</h2>
			<img v-bind:src="imgUrl" >
			<img :src="imgUrl" >
		
			<h2>2.class绑定</h2>
			<p class="cClass" :class="a">Hello World!</p>
			<p class="cClass" :class="{aClass:isA,bClass:isB}">Hello World!</p>
			
			<h2>3.style绑定</h2>
			<p :style="{color:abc,fontSize:fontsize+'px'}">qwertyuiop</p>
7.条件渲染指令：
			<p v-if="ok">成功了</p>
			<p v-else>失败了</p>
			<p v-show="ok">表白成功</p>
			<p v-show="!ok">表白失败</p>
```

```javascript
Vue对象属性：
			el(关联控件id)	
			data(数据，键值对)	
			methods(方法，即函数)		
			computed(计算属性)
			watch（监视)
            
<script type="text/javascript">
	const app = new Vue({
		el:'#app',
		data:{
			msg:'<a href="http://www.baidu.com">I will back!</a>',
			msg2:'也许吧！',
			imgUrl:'https://cn.vuejs.org/images/logo.png'
			},
		methods:{
			test(){
				alert("hehe!");
			}
		}
	})
</script>
```

### 3.计算属性和监视

#### 3.1 计算属性

1) 在 computed 属性对象中定义计算属性的方法
2) 在页面中使用{{方法名}}来显示计算的结果

#### 3.2 监视属性

1) 通过通过 vm 对象的$watch()或 watch 配置来监视指定的属性
2) 当属性变化时, 回调函数自动调用, 在函数内部进行计算

#### 3.3 计算属性高级

1) 通过 getter/setter 实现对属性数据的显示和监视
2) 计算属性存在缓存, 多次读取只执行一次 getter 计算  

```html
<div id="demo">
姓：<input type="" name="" id="" value="" placeholder="First Name" v-model="firstname" /><br>
名：<input type="" name="" id="" value="" placeholder="Last Name" v-model="lastname" /><br>
姓名1（单向）：<input type="" name="" id="" value="" placeholder="Full Name1" v-model="fullname1" />
姓名2（单向）：<input type="" name="" id="" value="" placeholder="Full Name2" v-model="fullname2" />
姓名3（双向）：<input type="" name="" id="" value="" placeholder="Full Name3" v-model="fullname3" />
</div>

		<script type="text/javascript">
			var app = new Vue({
				el: '#demo',
				data: {
					firstname: 'A',
					lastname: 'B',
					fullname2: 'A B',
				},
				computed: {
					fullname1() {
						return this.firstname + ' ' + this.lastname
					},
					
					fullname3: {
						get() {
							return this.firstname + ' ' + this.lastname
						},
						set(value) {
							const names = value.split(' ')
							this.firstname = names[0]
							this.lastname = names[1]
						}
					}
				},
				watch: {
					firstname: function(value) {
						this.fullname1 = value + ' ' + this.lastname;
					}
				}
			})

			app.$watch('lastname', function(value) {
				this.fullname2 = this.firstname + ' ' + value
			})
		</script>
```

### 4.class和style绑定

#### 4.1 理解

1) 在应用界面中, 某个(些)元素的样式是变化的
2) class/style 绑定就是专门用来实现动态样式效果的技术

#### 4.2 class 绑定

1) :class='xxx'
2) 表达式是字符串: 'classA'
3) 表达式是对象: {classA:isA, classB: isB}
4) 表达式是数组: ['classA', 'classB']

#### 4.3 style 绑定

1) :style="{ color: activeColor, fontSize: fontSize + 'px' }"
2) 其中 activeColor/fontSize 是 data 属性  

```html
		<div id="demo">
			<h2>1.class绑定：：class='xxx'</h2>
			<p class="cClass" :class="a">Hello World!</p>
			<p class="cClass" :class="{aClass:isA,bClass:isB}">Hello World!</p>
			
			<h2>2.style绑定</h2>
			<p :style="{color:abc,fontSize:fontsize+'px'}">qwertyuiop</p>
			
			<button @click="update">更新</button>
		</div>
		
		<script type="text/javascript">
			new Vue({
				el:'#demo',
				data:{
					a:'aClass',
					isA:true,
					isB:false,
					abc:'blue',
					fontsize:10
				},
				methods:{
					update(){
						this.a = 'bClass'
						this.isA = ~this.isA
						this.isB = ~this.isB
						this.abc = 'yellow'
						this.fontsize = 50
					}
				}
			})
		</script>
```

### 5.条件渲染

1. 如果需要频繁切换 v-show 较好
2. 当条件不成立时, v-if 的所有子节点不会解析(项目中使用)  

```html
		<div id="demo">
			<p v-if="ok">成功了</p>
			<p v-else>失败了</p>
			
			<p v-show="ok">表白成功</p>
			<p v-show="!ok">表白失败</p>
			
			<button @click="ok=!ok">切换</button>
		</div>
		
		<script type="text/javascript">
			new Vue({
				el:'#demo',
				data:{
					ok:false
				}
			})
		</script>
```



### 6.列表渲染

#### 6.1 列表显示指令

数组: v-for / index
对象: v-for / key

#### 6.2 列表的更新显示

删除 item
替换 item

#### 6.3 列表的高级处理

列表过滤
列表排序  

```html
		<div id="demo">
			<h2>测试: v-for 遍历数组</h2>
			<ul>
				<li v-for="(p, index) in persons" :key="index">
					{{index}}--{{p.name}}--{{p.age}}
					--
					<button @click="deleteItem(index)">删除</button>
					--
					<button @click="updateItem(index, {name:'Jok',age:15})">更新</button>
				</li>
			</ul>
			<h2>测试: v-for 遍历对象</h2>
			<ul>
				<li v-for="(value, key) in persons[0]">
					{{ key }} : {{ value }}
				</li>
			</ul>
		</div>
		
		<script type="text/javascript">
			new Vue({
				el: '#demo',
				data: {
					persons: [{
							id: 1,
							name: 'Tom',
							age: 13
						},
						{
							id: 2,
							name: 'Jack',
							age: 12
						},
						{
							id: 3,
							name: 'Bob',
							age: 14
						}
					]
				},
				methods: {
					deleteItem(index) {
						this.persons.splice(index, 1)
					},
					updateItem(index, p) {
						// this.persons[index] = p // 页面不会更新
						this.persons.splice(index, 1, p)
					}
				}
			})
		</script>
```

```javascript
<div id="demo">
	<input type="text" name="searchName" placeholder="搜索指定用户名" v-model="searchName">
		<ul>
			<li v-for="(p, index) in filterPerson" :key="index">
			{{index}}--{{p.name}}--{{p.age}}
			</li>
		</ul>
	<button @click="setOrderType(1)">年龄升序</button>
	<button @click="setOrderType(2)">年龄降序</button>
	<button @click="setOrderType(0)">原本顺序</button>
</div>
<script type="text/javascript" src="../js/vue.js"></script>
<script type="text/javascript">
new Vue({
	el: '#demo',
	data: {
		orderType: 0, //0 代表不排序, 1 为升序, 2 为降序
		searchName: '',
		persons: [
			{id: 1, name: 'Tom', age: 13},
			{id: 2, name: 'Jack', age: 12},
			{id: 3, name: 'Bob', age: 17},
			{id: 4, name: 'Cat', age: 14},
			{id: 4, name: 'Mike', age: 14},
			{id: 4, name: 'Monica', age: 16}
		]
	},
	methods: {
		setOrderType (orderType) {
			this.orderType = orderType
		}
	},
	computed: {
		filterPerson() {
			let {orderType, searchName, persons} = this
			// 过滤
			persons = persons.filter(p => p.name.indexOf(searchName)!=-1)
    		// 排序
			if(orderType!==0) {
				persons = persons.sort(function (p1, p2) {
					if(orderType===1) {
						return p1.age-p2.age
					} else {
						return p2.age-p1.age
					}
				})
			} return persons
		}
	}
})
</script>
```



### 7.事件处理

#### 7.1 绑定监听:

1) v-on:xxx="fun"
2) @xxx="fun"
3) @xxx="fun(参数)"
4) 默认事件形参: event
5) 隐含属性对象: $event


#### 7.2 事件修饰符

1) .prevent : 阻止事件的默认行为 event.preventDefault()
2) .stop : 停止事件冒泡 event.stopPropagation()

#### 7.3 按键修饰符

1) .keycode : 操作的是某个 keycode 值的键
2) .keyName : 操作的某个按键名的键(少部分)  

### 8.表单输入绑定

1) text/textarea
2) checkbox
3) radio
4) select  

### 9.vue实例生命周期

1) 初始化显示

\* beforeCreate()					 准备数据和事件之前
\* created()							  准备数据和事件之后
\* beforeMount()					  解析模板之后挂载数据之前
\* mounted()							挂载数据之后(完全初始化显示)
2) 更新状态: this.xxx = value
\* beforeUpdate()					 数据更新之前
\* updated()							 数据更新之后
3) 销毁 vue 实例: vm.$destory()
\* beforeDestory()					vm对象销毁之前
\* destoryed()						   vm对象销毁之后

------

#### 常用的生命周期方法

1. mounted(): 发送 ajax 请求，启动定时器等异步任务
2. beforeDestory(): 做收尾工作, 如: 清除定时器  

### 10.过渡&动画（了解）

#### 10.1 vue 动画的理解

1) 操作 css 的 trasition 或 animation
2) vue 会给目标元素添加/移除特定的 class
3) 过渡的相关类名

- xxx-enter-active: 指定显示的 transition
- xxx-leave-active: 指定隐藏的 transition
- xxx-enter/xxx-leave-to: 指定隐藏时的样式  

![image-20210714095900791](C:\Users\14403\AppData\Roaming\Typora\typora-user-images\image-20210714095900791.png)

#### 10.2 基本过渡动画的编码

1) 在目标元素外包裹<transition name="xxx">
2) 定义 class 样式
指定过渡样式: transition
指定隐藏时的样式: opacity/其它  

```javascript
<style>
	.fade-enter-active, .fade-leave-active {
		transition: opacity .5s
	} 
	.fade-enter, .fade-leave-to {
	opacity: 0
	} 
	/* 可以设置不同的进入和离开动画 */
	.slide-fade-enter-active {
		transition: all .3s ease;
	} 
	.slide-fade-leave-active {
		transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
	} 
	.slide-fade-enter, .slide-fade-leave-to {
		transform: translateX(10px);
		opacity: 0;
	}
</style>

<div id="demo1">
	<button @click="show = !show">Toggle1</button>
	<transition name="fade">
		<p v-if="show">hello</p>
	</transition>
</div>
<div id="demo2">
	<button @click="show = !show">Toggle2</button>
	<transition name="slide-fade">
		<p v-if="show">hello</p>
	</transition>
</div>
<script type="text/javascript" src="../js/vue.js"></script>
<script type="text/javascript">
new Vue({
	el: '#demo1',
	data: {
		show: true
	}
})
new Vue({
	el: '#demo2',
	data: {
		show: true
	}
})
</script>
```



### 11.过滤器

#### 11.1 理解过滤器

1) 功能: 对要显示的数据进行特定格式化后再显示
2) 注意: 并没有改变原本的数据, 可是产生新的对应的数据

#### 11.2 定义和使用过滤器

1) 定义过滤器

```javascript
Vue.filter(filterName, function(arg1,arg2,...){
	// 进行一定的数据处理
	return newValue
})
```

2) 使用过滤器

2) 使用过滤器

```html
<div>{{myData | filterName}}</div>
<div>{{myData | filterName(arg)}}</div>
```

```javascript
<div id="test">
	<p>当前时间为: {{currentTime}}</p>
	<p>当前时间 1 为: {{currentTime | dateStr}}</p>
	<p>当前时间 2 为: {{currentTime | dateStr('YYYY-MM-DD')}}</p>
	<p>当前时间 3 为: {{currentTime | dateStr('HH:mm:ss')}}</p>
</div>
<script type="text/javascript" src="../js/vue.js"></script>
//引入时间相关的插件
<script type="text/javascript" src="https://cdn.bootcss.com/moment.js/2.19.0/moment.js"></script>
<script>
// 注册过滤器
Vue.filter('dateStr', function (value, format) {
    //如果format参数为空使用YYYY-MM-DD HH:mm:ss，否则使用format
	return moment(value).format(format || 'YYYY-MM-DD HH:mm:ss')
})
new Vue({
	el: '#test',
	data: {
	currentTime: new Date()
	}
})
</script>
```

### 12.内置指令与自定义指令

#### 12.1 常用内置指令

1.  v:text : 更新元素的 textContent

2. v-html : 更新元素的 innerHTML

3.  v-if : 如果为 true, 当前标签才会输出到页面

4. v-else: 如果为 false, 当前标签才会输出到页面

5. v-show : 通过控制 display 样式来控制显示/隐藏

6. v-for : 遍历数组/对象

7. v-on : 绑定事件监听, 一般简写为@

8.  v-bind : 强制绑定解析表达式, 可以省略 v-bind

9. v-model : 双向数据绑定

10. ref : 指定唯一标识, vue 对象通过$els 属性访问这个元素对象

11. v-cloak : 防止闪现, 与 css 配合: [v-cloak] { display: none }

    #### 12.2 自定义指令

    1) 注册全局指令

    ```javascript
    Vue.directive('my-directive', function(el, binding){
    	el.innerHTML = binding.value.toupperCase()
    })
    ```

    2) 注册局部指令

    ```javascript
    directives : {
    	'my-directive' : {
    		bind (el, binding) {
    			el.innerHTML = binding.value.toupperCase()
    		}
    	}
    }
    ```

    3) 使用指令
    v-my-directive='xxx'  

    ```javascript
    <style>
    	[v-cloak] {
    		display: none
    	}
    </style>
    <div id="example">
    	<p v-text="url"></p>
    	<p v-html="url"></p>
    	<img :id="myid" :src="imageSrc">
    	<p>
    		<span ref="message">atguigu.com</span>
    		<button @click="showMsg">显示左侧文本</button>
    	</p>
    	<p v-cloak>{{url}}</p>
    </div>
    <script type="text/javascript" src="../js/vue.js"></script>
    <script type="text/javascript">
    alert('模拟加载慢')
    new Vue({
    	el: '#example',
    	data: {
    		url: '<a href="http://www.atguigu.com">尚硅谷</a>',
    		myid: 'abc123',
    		imageSrc: 'http://cn.vuejs.org/images/logo.png'
    	},
    	methods: {
    		showMsg: function () {
    			alert(this.$refs.message.textContent)
    		}
    	}
    })
    </script>
    ```

```javascript
<div id="demo1">
	<p v-upper-text="msg"></p>
	<p v-lower-text="msg"></p>
</div>
<div id="demo2">
	<p v-upper-text="msg2"></p>
	<p v-lower-text="msg2"></p> <!--局部指令, 此处不能使用-->
</div>
<script type="text/javascript" src="../js/vue.js"></script>
<script type="text/javascript">
//注册全局指令
Vue.directive('upper-text', function (el, binding) {
	el.innerHTML = binding.value.toUpperCase()
})
new Vue({
	el: '#demo1',
	data: {
		msg: 'NBA love this game!'
	},
	directives: { // 注册局部指令
		'lower-text': {
			bind (el, binding) {
				el.innerHTML = binding.value.toLowerCase()
			}
		}
	}
})
new Vue({
	el: '#demo2',
	data: {
		msg2: 'I Like You'
	}
})
</script>
```



### 13.自定义插件

#### 13.1 说明

1) Vue 插件是一个包含 install 方法的对象
2) 通过 install 方法给 Vue 或 Vue 实例添加方法, 定义全局指令等  

```javascript
/**
* 自定义 Vue 插件
*/
(function () {
	const MyPlugin = {}
	MyPlugin.install = function (Vue, options) {
		// 1. 添加全局方法或属性
		Vue.myGlobalMethod = function () {
			alert('Vue 函数对象方法执行')
		} 
    	// 2. 添加全局资源
		Vue.directive('my-directive', function (el, binding) {
			el.innerHTML = "MyPlugin my-directive " + binding.value
		})
		// 3. 添加实例方法
		Vue.prototype.$myMethod = function () {
			alert('vue 实例对象方法执行')
		}
	}
    window.MyPlugin = MyPlugin
})()
```

```javascript
/**
* 使用插件
*/
<div id="demo">
	<!--使用自定义指令-->
	<p v-my-directive="msg"></p>
</div>
<script type="text/javascript" src="../js/vue.js"></script>
<script type="text/javascript" src="vue-myPlugin.js"></script>
<script type="text/javascript">
//使用自定义插件
Vue.use(MyPlugin)
var vm = new Vue({
	el: '#demo',
	data: {
		msg: 'atguigu'
	}
})
//调用自定义的静态方法
Vue.myGlobalMethod()
//调用自定义的对象方法
vm.$myMethod()
</script>
```



## 三、组件化开发

> *拆分组件
>
> *实现静态组件
>
> *实现动态组件：初始化显示、数据交互

### 1.环境搭建

![image-20210714103953086](C:\Users\14403\AppData\Roaming\Typora\typora-user-images\image-20210714103953086.png)

## 四、必会知识

### 1.基本使用  

1) 引入组件
2) 映射成标签
3) 使用组件标签  

### 2.关于标签名与标签属性名书写问题

1) 写法一: 一模一样
2) 写法二: 大写变小写, 并用-连接  

### 3.组件间通信

#### 3.1 组件间通信基本原则

1) 不要在子组件中直接修改父组件的状态数据
2) 数据在哪, 更新数据的行为(函数)就应该定义在哪

#### 3.2 vue 组件间通信方式

1) props
2) vue 的自定义事件
3) 消息订阅与发布(如: pubsub 库)
4) slot
5) vuex(后面单独讲)  

#### 3.3 组件间通信 1: props

##### 3.3.1 使用组件标签时

```vue
<my-component name='tom' :age='3' :set-name='setName'></my-component>
```

##### 3.3.2 定义子组件时

1) 在组件内声明所有的 props
	方式一: 只指定名称

```vue
props: ['name', 'age', 'setName']
```

​	方式二: 指定名称和类型

```vue
props: {
	name: String,
	age: Number,
	setNmae: Function
}  
```

​	方式三: 指定名称/类型/必要性/默认值

```vue
props: {
	name: {type: String, required: true, default:xxx},
}
```

##### 3.3.3 注意

1) 此方式用于父组件向子组件传递数据
2) 所有标签属性都会成为组件对象的属性, 模板页面可以直接引用
3) 问题:
a. 如果需要向非子后代传递数据必须多层逐层传递
b. 兄弟组件间也不能直接 props 通信, 必须借助父组件才可以

#### 3.4组件间通信 2: vue 自定义事件

##### 3.4.1 绑定事件监听

```vue
// 方式一: 通过 v-on 绑定
@delete_todo="deleteTodo"
// 方式二: 通过$on()
this.$refs.xxx.$on('delete_todo', function (todo) {
	this.deleteTodo(todo)
})
```

##### 3.4.2 触发事件

```vue
// 触发事件(只能在父组件中接收)
this.$emit(eventName, data)
```

##### 3.4.3 注意:

1) 此方式只用于子组件向父组件发送消息(数据)
2) 问题: 隔代组件或兄弟组件间通信此种方式不合适  

#### 3.5 组件间通信 3: 消息订阅与发布(PubSubJS 库)

##### 3.5.1 订阅消息

```vue
PubSub.subscribe('msg', function(msg, data){})
```

##### 3.5.2 发布消息

```vue
PubSub.publish('msg', data)
```

##### 3.5.3 注意

1) 优点: 此方式可实现任意关系组件间通信(数据)

#### 3.6  事件的 2 个重要操作(总结)

1) 绑定事件监听 (订阅消息)
目标: 标签元素 <button>
事件名(类型): click/focus
回调函数: function(event){}
2) 触发事件 (发布消息)
DOM 事件: 用户在浏览器上对应的界面上做对应的操作
自定义: 编码手动触发

#### 3.7  组件间通信 4: slot

##### 3.7.1 理解

此方式用于父组件向子组件传递`标签数据`

##### 3.7.2 子组件: Child.vue

```vue
<template>
<div>  
    <slot name="xxx">不确定的标签结构 1</slot>
	<div>组件确定的标签结构</div>
	<slot name="yyy">不确定的标签结构 2</slot>
</div>
</template>
```

##### 3.7.3 父组件: Parent.vue  

```vue
<child>
	<div slot="xxx">xxx 对应的标签结构</div>
	<div slot="yyy">yyyy 对应的标签结构</div>
</child> 
```

## 五、vue-resource(axios)：ajax请求

vue 项目中常用的 2 个 ajax 库
		vue-resource：vue 插件, 非官方库, vue1.x 使用广泛
		axios：通用的 ajax 请求库, 官方推荐, vue2.x 使用广泛

### 5.1 vue-resource 的使用

#### 5.1.1 在线文档

https://github.com/pagekit/vue-resource/blob/develop/docs/http.md

#### 5.1.2 下载

```
npm install vue-resource --save
```

#### 5.1.3 编码

```javascript
// 引入模块
import VueResource from 'vue-resource'
// 使用插件
Vue.use(VueResource)
// 通过 vue/组件对象发送 ajax 请求
this.$http.get('/someUrl').then((response) => {
		// success callback
		console.log(response.data) //返回结果数据
	}, (response) => {
		// error callback  
		console.log(response.statusText) //错误信息
})  
```

### 5.2 axios 的使用  

#### 5.2.1 在线文档

https://github.com/pagekit/vue-resource/blob/develop/docs/http.md

#### 5.2.2 下载:

```
npm install axios --save
```

#### 5.2.3 编码  

```javascript
// 引入模块
import axios from 'axios'
// 发送 ajax 请求
axios.get(url)
.then(response => {
	console.log(response.data) // 得到返回结果数据
})
.catch(error => {
	console.log(error.message)
})  
```

## 六、vue-router



## 七、Vuex详解



## 八、项目部署



# 箭头函数

 

**箭头函数表达式**的语法比[函数表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/function)更简洁，并且没有自己的`this`，`arguments`，`super`或`new.target`。箭头函数表达式更适用于那些本来需要匿名函数的地方，并且它不能用作构造函数。

<iframe class="interactive" width="100%" height="490" src="https://interactive-examples.mdn.mozilla.net/pages/js/functions-arrow.html" title="MDN Web Docs Interactive Example" loading="lazy" style="box-sizing: border-box; background-color: rgb(238, 238, 238); border: 0px; color: rgb(33, 33, 33); padding: 10px; width: 1002px; max-width: 100%;"></iframe>

## [语法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions#syntax)

> ### 基础语法
>
> ```javascript
> (param1, param2, …, paramN) => { statements }
> (param1, param2, …, paramN) => expression
> //相当于：(param1, param2, …, paramN) =>{ return expression; }
> 
> // 当只有一个参数时，圆括号是可选的：
> (singleParam) => { statements }
> singleParam => { statements }
> 
> // 没有参数的函数应该写成一对圆括号。
> () => { statements }
> ```

### [高级语法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions#高级语法)

> ```javascript
> //加括号的函数体返回对象字面量表达式：
> params => ({foo: bar})
> 
> //支持剩余参数和默认参数
> (param1, param2, ...rest) => { statements }
> (param1 = defaultValue1, param2, …, paramN = defaultValueN) => {
> statements }
> 
> //同样支持参数列表解构
> let f = ([a, b] = [1, 2], {x: c} = {x: a + b}) => a + b + c;
> f();  // 6
> ```

## [描述](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions#描述)

引入箭头函数有两个方面的作用：更简短的函数并且不绑定`this`。

### [更短的函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions#更短的函数)

```javascript
var elements = ['Hydrogen','Helium','Lithium','Beryllium'];

elements.map(function(element) {
  return element.length;
}); 

// 上面的普通函数可以改写成如下的箭头函数
elements.map((element) => {
  return element.length;
});

// 当箭头函数只有一个参数时，可以省略参数的圆括号
elements.map(element => {
 return element.length;
}); 

// 当箭头函数的函数体只有一个 `return` 语句时，可以省略 `return` 关键字和方法体的花括号
elements.map(element => element.length); 

// 在这个例子中，因为我们只需要 `length` 属性，所以可以使用参数解构
// 需要注意的是字符串 `"length"` 是我们想要获得的属性的名称，而 `lengthFooBArX` 则只是个变量名，
// 可以替换成任意合法的变量名
elements.map(({ "length": lengthFooBArX }) => lengthFooBArX); 
```

### [没有单独的`this`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions#没有单独的this)

在箭头函数出现之前，每一个新函数根据它是被如何调用的来定义这个函数的this值：

- 如果该函数是一个构造函数，this指针指向一个新的对象
- 在严格模式下的函数调用下，this指向undefined
- 如果该函数是一个对象的方法，则它的this指针指向这个对象

`This`被证明是令人厌烦的面向对象风格的编程。

```
function Person() {
  // Person() 构造函数定义 `this`作为它自己的实例.
  this.age = 0;

  setInterval(function growUp() {
    // 在非严格模式, growUp()函数定义 `this`作为全局对象,
    // 与在 Person()构造函数中定义的 `this`并不相同.
    this.age++;
  }, 1000);
}

var p = new Person();
```

在ECMAScript 3/5中，通过将`this`值分配给封闭的变量，可以解决`this`问题。

```
function Person() {
  var that = this;
  that.age = 0;

  setInterval(function growUp() {
    // 回调引用的是`that`变量, 其值是预期的对象.
    that.age++;
  }, 1000);
}
```

或者，可以创建[绑定函数](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)，以便将预先分配的`this`值传递到绑定的目标函数（上述示例中的`growUp()`函数）。

箭头函数不会创建自己的`this,它只会从自己的作用域链的上一层继承this`。因此，在下面的代码中，传递给`setInterval`的函数内的`this`与封闭函数中的`this`值相同：

```
function Person(){
  this.age = 0;

  setInterval(() => {
    this.age++; // |this| 正确地指向 p 实例
  }, 1000);
}

var p = new Person();
```

#### 与严格模式的关系

鉴于 `this` 是词法层面上的，[严格模式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode)中与 `this` 相关的规则都将被忽略。

```
var f = () => { 'use strict'; return this; };
f() === window; // 或者 global
```

严格模式的其他规则依然不变.

#### 通过 call 或 apply 调用

由于 箭头函数没有自己的this指针，通过 `call()` *或* `apply()` 方法调用一个函数时，只能传递参数（不能绑定this---译者注），他们的第一个参数会被忽略。（这种现象对于bind方法同样成立---译者注）

```
var adder = {
  base : 1,

  add : function(a) {
    var f = v => v + this.base;
    return f(a);
  },

  addThruCall: function(a) {
    var f = v => v + this.base;
    var b = {
      base : 2
    };

    return f.call(b, a);
  }
};

console.log(adder.add(1));         // 输出 2
console.log(adder.addThruCall(1)); // 仍然输出 2
```

### [不绑定`arguments`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions#不绑定arguments)

箭头函数不绑定[Arguments 对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/arguments)。因此，在本示例中，`arguments`只是引用了封闭作用域内的arguments：

```
var arguments = [1, 2, 3];
var arr = () => arguments[0];

arr(); // 1

function foo(n) {
  var f = () => arguments[0] + n; // 隐式绑定 foo 函数的 arguments 对象. arguments[0] 是 n,即传给foo函数的第一个参数
  return f();
}

foo(1); // 2
foo(2); // 4
foo(3); // 6
foo(3,2);//6
```

在大多数情况下，使用[剩余参数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Rest_parameters)是相较使用`arguments`对象的更好选择。

```
function foo(arg) {
  var f = (...args) => args[0];
  return f(arg);
}
foo(1); // 1

function foo(arg1,arg2) {
    var f = (...args) => args[1];
    return f(arg1,arg2);
}
foo(1,2);  //2
```

### [使用箭头函数作为方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions#使用箭头函数作为方法)

如上所述，箭头函数表达式对非方法函数是最合适的。

```
'use strict';
var obj = {
  i: 10,
  b: () => console.log(this.i, this),
  c: function() {
    console.log( this.i, this)
  }
}
obj.b();
// undefined, Window{...}
obj.c();
// 10, Object {...}
```

箭头函数没有定义this绑定。另一个涉及[`Object.defineProperty()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)的示例：

```
'use strict';
var obj = {
  a: 10
};

Object.defineProperty(obj, "b", {
  get: () => {
    console.log(this.a, typeof this.a, this);
    return this.a+10;
   // 代表全局对象 'Window', 因此 'this.a' 返回 'undefined'
  }
});

obj.b; // undefined   "undefined"   Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, frames: Window, …}
```

### [使用 `new` 操作符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions#使用_new_操作符)

箭头函数不能用作构造器，和 `new`一起用会抛出错误。

```
var Foo = () => {};
var foo = new Foo(); // TypeError: Foo is not a constructor
```

### [使用`prototype`属性](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions#使用prototype属性)

箭头函数没有`prototype`属性。

```
var Foo = () => {};
console.log(Foo.prototype); // undefined
```

### [使用 `yield` 关键字](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions#使用_yield_关键字)

 `yield` 关键字通常不能在箭头函数中使用（除非是嵌套在允许使用的函数内）。因此，箭头函数不能用作函数生成器。

## [函数体](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions#函数体)

箭头函数可以有一个“简写体”或常见的“块体”。

在一个简写体中，只需要一个表达式，并附加一个隐式的返回值。在块体中，必须使用明确的`return`语句。

```
var func = x => x * x;
// 简写函数 省略return

var func = (x, y) => { return x + y; };
//常规编写 明确的返回值
```

## [返回对象字面量](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions#返回对象字面量)

记住用`params => {object:literal}`这种简单的语法返回对象字面量是行不通的。

```
var func = () => { foo: 1 };
// Calling func() returns undefined!

var func = () => { foo: function() {} };
// SyntaxError: function statement requires a name
```

这是因为花括号（`{}` ）里面的代码被解析为一系列语句（即 `foo` 被认为是一个标签，而非对象字面量的组成部分）。

所以，记得用圆括号把对象字面量包起来：

```
var func = () => ({foo: 1});
```

## [换行](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions#换行)

箭头函数在参数和箭头之间不能换行。

```
var func = ()
           => 1;
// SyntaxError: expected expression, got '=>'
```

但是，可以通过在 ‘=>’ 之后换行，或者用 ‘( )’、'{ }'来实现换行，如下：

```
var func = (a, b, c) =>
  1;

var func = (a, b, c) => (
  1
);

var func = (a, b, c) => {
  return 1
};

var func = (
  a,
  b,
  c
) => 1;

// 不会有语法错误
```

## [解析顺序](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions#解析顺序)

虽然箭头函数中的箭头不是运算符，但箭头函数具有与常规函数不同的特殊[运算符优先级](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)解析规则。

```
let callback;

callback = callback || function() {}; // ok

callback = callback || () => {};
// SyntaxError: invalid arrow-function arguments

callback = callback || (() => {});    // ok
```

## [更多示例](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions#更多示例)

```
// 空的箭头函数返回 undefined
let empty = () => {};

(() => 'foobar')();
// Returns "foobar"
// (这是一个立即执行函数表达式,可参阅 'IIFE'术语表)


var simple = a => a > 15 ? 15 : a;
simple(16); // 15
simple(10); // 10

let max = (a, b) => a > b ? a : b;

// Easy array filtering, mapping, ...

var arr = [5, 6, 13, 0, 1, 18, 23];

var sum = arr.reduce((a, b) => a + b);
// 66

var even = arr.filter(v => v % 2 == 0);
// [6, 0, 18]

var double = arr.map(v => v * 2);
// [10, 12, 26, 0, 2, 36, 46]

// 更简明的promise链
promise.then(a => {
  // ...
}).then(b => {
  // ...
});

// 无参数箭头函数在视觉上容易分析
setTimeout( () => {
  console.log('I happen sooner');
  setTimeout( () => {
    // deeper code
    console.log('I happen later');
  }, 1);
}, 1);
```

#### 箭头函数也可以使用条件（三元）运算符：

```
var simple = a => a > 15 ? 15 : a;
simple(16); // 15
simple(10); // 10

let max = (a, b) => a > b ? a : b;
```

> 箭头函数内定义的变量及其作用域

```
// 常规写法
var greeting = () => {let now = new Date(); return ("Good" + ((now.getHours() > 17) ? " evening." : " day."));}
greeting();          //"Good day."
console.log(now);    // ReferenceError: now is not defined 标准的let作用域

// 参数括号内定义的变量是局部变量（默认参数）
var greeting = (now=new Date()) => "Good" + (now.getHours() > 17 ? " evening." : " day.");
greeting();          //"Good day."
console.log(now);    // ReferenceError: now is not defined

// 对比：函数体内{}不使用var定义的变量是全局变量
var greeting = () => {now = new Date(); return ("Good" + ((now.getHours() > 17) ? " evening." : " day."));}
greeting();           //"Good day."
console.log(now);     // Fri Dec 22 2017 10:01:00 GMT+0800 (中国标准时间)

// 对比：函数体内{} 用var定义的变量是局部变量
var greeting = () => {var now = new Date(); return ("Good" + ((now.getHours() > 17) ? " evening." : " day."));}
greeting(); //"Good day."
console.log(now);    // ReferenceError: now is not defined
```

> #### 箭头函数也可以使用闭包：

```
// 标准的闭包函数
function A(){
      var i=0;
      return function b(){
              return (++i);
      };
};

var v=A();
v();    //1
v();    //2


//箭头函数体的闭包（ i=0 是默认参数）
var Add = (i=0) => {return (() => (++i) )};
var v = Add();
v();           //1
v();           //2

//因为仅有一个返回，return 及括号（）也可以省略
var Add = (i=0)=> ()=> (++i);
```

> ####  箭头函数递归

```
var fact = (x) => ( x==0 ?  1 : x*fact(x-1) );
fact(5);       // 120
```

# 框架**[ant-design-pro](https://github.com/ant-design/ant-design-pro)**

- 预览: [http://preview.pro.ant.design](http://preview.pro.ant.design/)
- 网址: [http://pro.ant.design](http://pro.ant.design/)
- 参考文档: http://pro.ant.design/docs/getting-started

## 1.开始使用

```bash
$ mkdir <your-project-name>
$ cd <your-project-name>
$ npm create umi # or yarn create umi

# Choose ant-design-pro:
 Select the boilerplate type (Use arrow keys)
❯ ant-design-pro  - Create project with an layout-only ant-design-pro boilerplate, use together with umi block.
  app             - Create project with a simple boilerplate, support typescript.
  block           - Create a umi block.
  library         - Create a library with umi.
  plugin          - Create a umi plugin.

$ git init
$ npm install
$ npm start         # 查看 http://localhost:8000
```

