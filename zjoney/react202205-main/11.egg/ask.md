奈斯啊小刘超奈斯
这个怎么用mock拦截请求呀 
Dave
ajax怎么请求到 mock数据  


egg.js
MVC



控制层
服务层
模型层
视图层


20:50
奈斯啊小刘超奈斯
这个文件夹名字是固定的吧 
大部分都是约定
app放源代码
  controller放控制器
  router.js是路由配置
肉包子
这个 服务是啥 一会儿会封装服务
奈斯啊小刘超奈斯
不是固定的,知道了 
难忘记nice
控制器是入口，服务是主题逻辑 
难忘记nice
主体逻辑 
喜喜
service应该要去请求数据库了吧 
控制器 接收请求参数，调用服务
服务 是进行业务处理，在必要的时候调用模型
模型层是操作数据库的



service应该要去请求数据库了吧 
肉包子
service 是模型? 
英剑คิดถึง
应该会有一个mapper层 操作数据库吧 
肉包子
控制器文件夹下的文件的名字  和route里的 controller点的  这两地方的名字得一样吗？ 是一样的



bu
logs 里面放的什么？ 
韩立


斯啊小刘超奈斯
plugin不需要引入么? 
21:30
bu
config.news 就只是定义一个全局的变量吗？ 是的
bu
bff 详细说说呗
后面会单独开课

肉包子
前端 请求了node  node又请求了java 像这样的 会慢吗？
一般来说会把node服务和java服务放在一个服务器上
然后做集群
BBF mq消息中间件 缓存  RPC


肉包子
看下 config  和 plugin的文件内容  



这个就是前后台不分离了吧 是的。这一个前后端不分离的

bu
怎么控制插件的顺序问题呢？ 




定时器原理是啥 啊 
原理就是轮询啊
setInterval(()=>{},1000);
喜喜
谁去运行这个计划任务 egg .js
bu
底层和操作系统有关 
bu撤回了一条消息
bu
对于多个机器， 只想有一个worker执行某个任务， egg 可以做到吗？ 

一台机器的话，有多个内核，一般来说一个内核对应一个进程，一个进程对应一个worker
all
worker

光靠egg.js自己是无法跨服务器通信 
如果要想做，需要zookeeper

21:52
路人乙
java 里的也是吗 
Dave
服务停了 轮训还计算时间么 
不计算了

window右下有一个时钟
win10里默认不显示秒，但是可以通过修改注册表显示 
win11 彻底关闭此功能


npm i --save egg-mysql
mysql 5.x 6.x 
7.x 8.x

mysql是开源免费的


09:53
英剑คิดถึง
是用来跟踪 数据库的操作？ 

是通过写代码的方式操作数据库


10:07
肉包子
迁移是用来操作表的  种子是操作数据的？ 是的
11
生产的表直接在服务器执行 npx sequelize db:migrate -env production 创建表吗？ 可以 的
bu
app.model.define ， egg 咋知道是 mongo 还是 mysql 的？  

10:13
11
都是 created_at
created_at: DATE,
created_at: DATE 


肉包子
user模型就是定义一个表吗？ 可是数据库里不是已经有userbiaolema 
不是
user模型是用来定义如何读取user表的
不用来创建表，创建表用migrate

bu
如果也配置了mongo呢？ egg 还能识别吗？ 

数据库类型三种
1. 关系型数据库 mySQL    sequelize是他们的ORM工具
2. 文档型数据库 mongodb  ORM mongoose
3. key-value数据库 redis 



user是数据库表的映射吧？ 是的
11
controller 里面作用是啥 是读取表吗？ 是的
肉包子
就是定义的时候 你写那几个字段  查到的就是对应的吗？ 是的
bu
什么时机执行。Migrations 和 seed 操作呢？ 每次新发版都执行一下吗？ 
这个看需要手工执行

喜喜
model只用来读，那更新，删除怎么做 都可以
肉包子
像是 查询数据库的操作比如刚刚的 findAll 应该放在模型里 还是控制器里 去做 
控制器=>服务=>模型层
喜喜
每次建了项目，我们都需要手动执行命令来生成database这个文件夹是吗 是的


10:23
肉包子
model 只是用来定义能访问的表字段  服务是操作数据库的  控制器是调用各个服务的？ 

model是用来操作数据库
服务是用来调用model
控制是来调用服务的


10:40
bu
egg-bin test 使用的就是测试环境的数据库了吗 ？ 



10:51
肉包子
做多语言的时候 那数据库里 怎么存呢 
肉包子
这个配置能动态修改吗 
肉包子
就是根据前端给的语言 来返回对应的语言 



11:34
bu
异步方式 ， 和 it 的第一个参数无关吧？ 

喜喜
建了一个以context命名的文件，language就会加到ctx对象上是么 是的
