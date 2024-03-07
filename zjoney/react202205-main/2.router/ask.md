oldPushState不太懂 


bu
go back forwrad 也不会刷新页面吗？ 
不会
hash
pushState
它们有一个共同的特点，不刷新页面

bu
onpopstate 监听不到 pushState 吗？
是的

push 放入
pop 弹出

onpushstate
pushstate



第一个参数咋用呢？ 

可以有多个Routes么  可以的


这个路由匹配方法，如果不用正则，直接当作字符串去相等比较应该也


16:47
难忘记nice
修改window.location.hash和action 
bu
越界得处理吧 

bu
hash的话， 怎么加query方式的参数呢？ 
16:52
bu
hash的话， 怎么加query方式的参数呢？ 
bu
query 部分不会算到hash值内吗？  算


react-router中路由之间的传参 除了query还有别的方式吗 
路径参数

/user/detail/100 路径参数
/user/detail?id=100 查询参数
state传参
是state那种刷新会丢失吗？ 

用的是browserHistory 刷新不丢
如果hashHistory刷新会丢失

难忘记nice
browserHistory 感觉ssr才会用到， 正常单页应用不会用到 
生产环境正常肯定 会是browserHistory
如果是微前端 必须要 browser 


20:08
青衣
每次看到复杂的正则就头大 
20:14
bu
正则有相关录播吗？  
喜喜
那这跟能匹配到/add  怎么理解？ 
20:21
肉包子
非贪婪就是尽可能短的匹配吗 
是的


21:01
瑞思拜
如果路由要穿多个参数呢？ 

bu
slice(1) 是为啥？全部收集到 下标1 吗？ 



数组截取吖，从1开始 是  从1开始就是分组的值了
瑞思拜
复制从1 开始后面的所有元素到一个新数组 
bu
1 
喜喜
两个分组一样的，怎么后面只匹配到一个a 



难忘记nice
源码里面好像就阻止了下默认事件 
奈斯啊小刘超奈斯
老师,你课件发一下 
21:45
难忘记nice
router-view 
21:57
奈斯啊小刘超奈斯
刷新state会丢失么? 
如果用的browserRouter不会
hash会





奈斯啊小刘超奈斯
我们测试总把我链接里面参数删掉,然后就报错了,现在我都写一个兼容 
肉包子
history 
Dave
props 上有state 吧 没有
bu
单放一个state 现在to是个字符串 state单独传
to={pathname,state}
肉包子
To类型是啥 字符串 {pathname:'/user/list'}
Dave
可以传 自定义属性不  
奈斯啊小刘超奈斯
state放到哪里了? 存在浏览器内部了
瑞思拜
是浏览器支持的还是react- router支持的 
这个是浏览器支持的
如果浏览器不支持，当你刷新的时候，它从哪里读呢？？？



10:00
青衣
user/后面为什么有一个* 
英剑คิดถึง
这个相对路径怎么理解 


 <Route path="/user" element={<User />}>
        <Route path="/add" element={<UserAdd />} >
         <Route path="/update" element={<UserUpdate />} />
        </Route/>
        <Route path="/list" element={<UserList />} />
        <Route path="/detail/:id" element={<UserDetail />} />
      </Route>

相对路径就是自己那部分匹配的路径
url = /user/add/update

relativePath 相对路径 就是相对于父路径的子路径
<!-- 
branches = [
  {
    path:'/user/add/update',
    routesMeta:['/user','/add','/update']
  }
  ...
]
 -->

英剑คิดถึง
为什么要写/*，不写的话 也能实现啊 

这个* 最后也会放到params里，成为路径参数的一部分。 params['*']

['/user/*','/add']
/user/add



11:41
英剑คิดถึง
地址栏路劲不对。 



奈斯啊小刘超奈斯
一个角色,没有权限进入 一些权限页面 , 
但是通过 url 复制路径 直接进入,这样就进去了, 该怎么限制?
 想要 该角色不管以任何方式进入,都让她跳到 403 界面 ,有没有什么统一判断的方法 

使用一个中间件




15:00
Dave
这种权限校验一般会放在 后台做吧 
一般会调用后台的接口进行判断
肉包子
类似于 vue的路由守卫的东西  怎么做呢 在react中 
奈斯啊小刘超奈斯
后台怎么判断呀 
cookie session jwt 
cms
Dave
之前做过的是放在后台的 具体怎么做的不清楚 
肉包子
配置路由 能用路由懒加载吗 
可以的
难忘记nice
如果Protected里面的逻辑是异步的呢
如果以权限的判断是异步的， 
15:07
肉包子
是不是也不要routes了  不要了 Routes=>useRoutes
奈斯啊小刘超奈斯
routes可以写多个,那有什么用呢 
15:16
Dave
判断 内网 应该 怎么判断  
一个 router里面不是可以有多个routes 
可以的


15:20
奈斯啊小刘超奈斯
这样发包后,
就会有可能资源丢失,因为修改内容了,文件hash变化了,
获取资源时,还可能是获取原来的hash文件名,这样怎么解决?只能加一个错误边界么? 
首页一般是不缓存的，永远是最新的  index.html不缓存的
它引入的别的静态资源才会带hash值 
测不准
 Suspense 是异步的么？ 
 如果你要异步加载组件的话，外面必须 包裹一个Suspense
奈斯啊小刘超奈斯
不是吧 

/* webpackChunkName: "Home" */ 这个注释是必要的嘛 不是必要的
如果加上它，它会决定 代码块的名称，会永定 打出来的文件名 src_component_home.js  home.js



难忘记nice
因为* 
测不准
从上往下匹配的 
难忘记nice
*所有的都能匹配到 
测不准
404 和 * 放最后每次 
测不准
往前面插入是不是也行 
奈斯啊小刘超奈斯
shift可以了么? 
测不准
精确匹配放前面感觉没问题 



{path: '/user/detail/:id', routesMeta: Array(2), score: 28}
{path: '/user/add', routesMeta: Array(2), score: 24}
{path: '/user/list', routesMeta: Array(2), score: 24}
{path: '/user', routesMeta: Array(1), score: 13}
{path: '/profile', routesMeta: Array(1), score: 13}
{path: '/login', routesMeta: Array(1), score: 13}
{path: '/', routesMeta: Array(1), score: 4}
{path: '/*', routesMeta: Array(1), score: 1}

['','*']
initialScore=2
score=0
1

15:48
测不准
貌似感觉就过滤了 * 
测不准
这个是防止 非精确匹配情况吧，把长的放上面 

越精确的越往 上排
越不精确的，越模糊的越往下

测不准
每次动态插入路由后，会在重新排序是吧 
会的

/usr/add
/user/list
/usr/detail


let routes = [
  {
    path:'/user',
    children:[
      {path:'/add'},
       {path:'/list'}
    ]
  },
   {
    path:'/book',
    children:[
      {path:'/add'},
       {path:'/list'}
    ]
  }
]
let branches = [
  {path:'/user/add',routesMeta:[{childrenIndex:0},{childrenIndex:0}] },
  {path:'/user/list',routesMeta:[{childrenIndex:0},{childrenIndex:1}]},
  {path:'/book/add',routesMeta:[{childrenIndex:1},{childrenIndex:0}]},
  {path:'/book/list',routesMeta:[{childrenIndex:1},{childrenIndex:1}]},
]

/user/add  [0,0]
/user/list [0,1]

/user/list = [0,1]
/book/list = [1,1]
分数是一样的
只有比索引
