# 浏览器

## 一些单词

```
forgery 伪造
// cross site request forgery - CSRF跨站请求伪造

secure 安全的adjective 保护verb
security 安全 noun
// security camera 监控录像
// sense of security 安全感

omit 忽略
// fetch请求在cors时，要携带cookie，需要设置 credentials: include|same-origin|omit

preflight 预检
origin 起源 源头
option 选项 选择
garbage 垃圾
```

## (一) 前置知识

```
1
问题: css的加载放在页面的底部会发生什么？
回答: 可能会发生 ( 重绘或重排 )，因为dom标签已经在DOM渲染过程绘制过了，此时再加载样式就回重新绘制样式并重新布局，造成重绘和回流
扩展: 这也是我们为什么要把样式放在 head 标签中，提前加载css的原因

2
问题: 为什么 script 标签要放在页面最底部？
回答: 因为避免js的 ( 加载和执行 ) 阻塞 ( DOM渲染 )
扩展:
- js的的执行 --> 依赖css解析完成，因为js要等待css解析完毕才能保证js可以操作样式
- DOM构建 ----> 依赖js执行完毕

3
总结
- ( CSS加载和解析 解析 ) 不会阻塞 ( DOM树的解析 )
- ( CSS加载和解析 解析 ) 会阻塞 ( DOM树的渲染 )
- ( CSS加载和解析 解析 ) 会阻塞 ( JS的解析-即执行 )
- ( JS的加载和解析 ) 会阻塞 ( DOM树的渲染 )
- 解析: 就是执行的意思
```

## (二) 浏览器的 - 五大进程

- 浏览器主进程 ---- 1 个
- 网络进程 -------- 1 个
- GPU 进程 -------- 1 个
- 渲染进程 -------- 多个
- 插件进程 -------- 多个

```
浏览器主进程 - 1个
- 主要负责 界面显示，用户交互，子进程管理，同时提供存储功能

GPU进程 - 1个
- 3D绘制，提升性能
- GPU 的使用初衷是为了实现 3D CSS 的效果，只是随后网页、Chrome 的 UI 界面都选择采用 GPU 来绘制，这使得 GPU 成为浏览器普遍的需求。最后，Chrome 在其多进程架构上

网络进程 - 1个
 - 主要负责页面 ( 加载网络资源 )

插件进程 - 多个
- 主要是负责插件的运行，因插件易崩溃，所以需要通过插件进程来隔离，以保证插件进程崩溃不会对浏览器和页面造成影响

渲染进程 - 多个
- 核心任务是将HTML、CSS 和 JavaScript 转换为用户可以与之交互的页面
- 默认情况下，Chrome会为 ( 每个Tab标签都创建一个渲染进程 )。出于安全考虑，渲染进程都是运行在沙箱模式下
```

## (三) 浏览器 - 安全

- https://juejin.cn/post/6844904053235793927
- 本项目/2-FRONTEND/SECURITY/README.md
- XSS 攻击
- CSRF 攻击

```
1
XSS
- 名词解释
  - cross site script 跨站脚本攻击 ( 原本缩写为css，但和样式css重复，所以改为xss )
- 原理
  - XSS攻击指，攻击者在网站上注入 恶意的客户端脚本代码，通过恶意脚本对客户端网页进行篡改，从而在用户浏览网页时，对用户浏览器进行控制，或者获取用户隐私数据的一种攻击方式
  - 恶意脚本: 指 js 代码，有时也指 html 或 flash
- 攻击方式
  - 持久型 - 又叫存储型
  - 非持久型 - 又叫反射型
  - 基于 DOM
- 危害
  - 利用虚假的 ( 输入表单 )，骗取用户个人信息
  - 利用 ( 脚本 )，获取用户的 cookie
  - 显示伪造的图片，文章等
- 预防 XSS 攻击
  - 1. 设置 cookie 的 httpOnly 属性，来阻止通过js脚本或其他脚本，来获取cookie
    - XMLHttpRequest: response.setHeader("Set-Cookie", "key=value;Max-Age=seconds;HTTPOnly");
    - 哪些脚本可以获取cookie: Document.cookie属性，XMLHttpRequest对象， Request API
  - 2. 过滤检查
    - 对表单的input textArea form 等做 ( 特殊符号 ) 的过滤检查
    - htmlEncode: 某些情况下，不能对用户数据进行严格过滤，需要对标签进行转换
    - javascriptEncode

(1) HtmlEncode：对html标签进行转换
< -------------------------- &lt
> -------------------------- &gt
& -------------------------- &amp
'' ------------------------- &quot
空格 ----------------------- &nbsp

(2) JavascriptEncode：对js一些特殊符号进行转码
" ------------------------ \"
\n ----------------------- \\n
\r ----------------------- \\r
```

```
2
CSRF
- 名词解释
  - cross site request forgery 跨站请求伪造
- 原理
  - CSRF是一种劫持受信任用户向服务器发送非预期请求的攻击方式
  - 主要是通过获取用户在目标网站的cookie，骗取目标网站的服务器的信任，在用户已经登录目标站的前提下，访问到了攻击者的钓鱼网站，攻击者直接通过 url 调用目标站的接口，伪造用户的行为进行攻击，通常这个行为用户是不知情的。
  - 即获取了cookie，就可以做很多事情：比如以你的名义发送邮件、发信息、盗取账号、购买商品、虚拟货币转账等等
- 预防 CSRF 攻击
  - 验证码
    - 最有效: 被认为是对抗csrf攻击最简洁有效的防御方法，因为 csrf往往是在用户不知情的情况下进行了网络请求，而验证码会强制用户与应用进行交互才能完成最终的请求
    - 注意点: 不能给所有的请求都加上验证码交互，只需要对一些敏感的请求加上验证码人际交互，完成最终的请求
  - Referer 检查
    - 请求头: http的 ( 请求头 ) 中有 ( Referer ) 字段，表示请求的 ( 来源地址 )，通过 Referer 可以检查请求是哦福来自合法的源，服务器只对合法的源予以响应
    - 扩展:
      - 不会发送Referer: 1.地址栏输入网址 2.书签打开网页
      - 会发送Referer: 1.表单 2.链接 3.静态资源，比如图片，脚本，样式等
  - token
    - CSRF主要就是获取cookie，所以要防御的话，就需要在请求中加入攻击者不能伪造的信息，并且该信息不能保存在cookie中
  - 响应头 `Set-Cookie: SameSite=Strict`
    - Cookie 的 SameSite 属性用来限制 ( 第三方 cookie - 这种第三方网站引导发出的 Cookie，就称为第三方 Cookie )
    - Chrome 51 开始，浏览器的 Cookie 新增加了一个 SameSite 属性，用来防止 CSRF 攻击和用户追踪
    - Set-Cookie: SameSite=Strict 完全禁止第三方 cookie
    - Set-Cookie: SameSite=Lax 规则稍稍放宽，大多数情况也是不发送第三方 Cookie，但是导航到目标网址的 Get 请求除外 ( lax 是松散的意思 )
    - Set-Cookie: SameSite=None 无论是否跨站都会发送 Cookie
```

```
3
扩展 cookie
- 概念: cookie 是服务器保存在浏览器上的一小段 ( 文本信息 )
- 大小: cookie 的大小一般不超过 ( 4KB )
- 作用: cookie 主要用来分辨 ( 两个请求是否来自于同一个浏览器，以及保存一些状态信息 )

- cookie的生成
  - 服务器如果希望在浏览器上保存cookie，就需要在 ( 响应头 ) 中添加 ( Set-Cookie ) 字段
  - http回应可以包含 ( 多个 Set-Cookie 字段 )，即表示生成多个 cookie -------------------------------- 响应头 Set-Cookie: key=value;xxxxx
  - Cookie 的值，Set-Cookie字段还可以附加 Cookie 的属性
    - Set-Cookie: <cookie-name>=<cookie-value>; Domain=<domain-value>; Secure; HttpOnly
    - Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT; Secure; HttpOnly

- cookie的发送
  - 浏览器向服务器发送 HTTP 请求时，每个请求都会带上相应的 Cookie ------------------------------------- 请求头 Cookie: name1=value1; name2=value2 一次可以发送多个cookie
  - http请求头中就有 Cookie 字段

- cookie的属性
  - Expires 表示cookie的过期时间，注意如果 ( 不设置Expires，或者为null，Cookie只在当前会话有效，即相当于session )
  - Max-Age
  - Domain 指定浏览器发送请求时，哪些 ( 域名要附带这个cookie )
  - Path
  - Secure 表示只有在 ( https ) 协议时，请求才会携带cookie ------- Secure只在https时携带cookie
  - HttpOnly 表示该 cookie 无法通过 ( 脚本 ) 获取 --------------- HttpOnly无法通过脚本获取cookie
```

## (四) 浏览器 - 跨域

- 跨域的方法
  - jsonp
  - cors
  - node devServer -- proxy
  - nginx 反向代理 --- nginx.conf/http/server/location/proxy_pass
- 2-FRONTEND/1-JS/17-cors/cors.md

```
1
cors
- 概念: cross origin resource share 跨域资源共享
- 支持: cors需要 服务器 和 浏览器 同时支持
- 分类: ( 简单请求 ) 和 ( 非简单请求 )


简单请求
- 需要同时满足两个条件
  - 请求的方法必须是: GET POST HEAD 这三个http1.0中的三个方法
  - HTTP头信息不超出以下字段: Accept Accept-Language Content-Language Last-Event-ID Content-Type: 只限于三个值 application/x-www-form-urlencoded，multipart/form-data，text/plain
- 流程
  - 请求头
    - Origin 字段，表示本次请求来自哪个源 ( 协议 + 域名 + 端口 )，-- 如果服务器返回的响应头中没有 Access-Control-Allow-Origin，就会抛错。无法通过状态码识别，因为都是200
  - 响应头
    - Access-Control-Allow-Origin
      - 必须
      - 值: 要么是 ( Origin ) 字段的值，要么是 ( * )，*表示接受任意域名的请求
    - Access-Control-Allow-Credentials
      - boolean
      - 问题: 如何才能在cors请求时，携带cookie?
      - 回答:
        - 1.响应头中必须有 Access-Control-Allow-Credentials 字段，并且 Access-Control-Allow-Origin 不能是 *
        - 2.XMLHttpRequest: --- 需要设置 xhr.withCredentials = true
        - 3.fetch: ------------ 需要设置 credentials=include same-origin omit
        - 4.Access-Control-Allow-Origin 不能是*
    - Access-Control-Expose-Headers
    - Content-Type


非简单请求
- 非简单请求的 - 条件: 不满足简单请求的条件都是，比如 PUT DELETE 请求，比如 Content-Type: application/json 等
- 非简单请求的 - 特点: 会在正式请求前，增加一次 ( 预检请求 preflight )
- preflight预检请求
  - options: 预检请求的方法是 OPTIONS 请求
  - 作用:
    - 一共三个
    - 1. 请求头 Origin 字段 ---------------------- 服务器允许cors请求的 白名单
    - 2. 请求头 Access-Control-Request-Method --- 请求需要用到的 HTTP 方法
    - 3. 请求头 Access-Control-Request-Headers -- 请求允许携带的 头信息
- 预检请求
  - 请求头
    - Origin --------------------------- 当前网页所在的域名是否在服务器的许可名单之中
    - Access-Control-Request-Method ---- 必须字段，用来列出浏览器去cors请求会用到哪些HTTP方法
    - Access-Control-Request-Headers
  - 响应头
    - Access-Control-Allow-Methods
    - Access-Control-Allow-Headers
    - Access-Control-Allow-Credentials
    - Access-Control-Max-Age
  - 总结
    - 1. 服务求收到 OPTIONS 预检请求后，会检查 ( Origin请求域是否是白名单 + Access-Control-Request-Method请求允许的HTTP方法 + Access-Control-Request-Headers允许的头信息 )，即 ( 许可的域名，方法，头信息 )
    - 2. 之后和简单请求的处理一样
```

## (五) 浏览器 - 垃圾回收机制

- https://juejin.cn/post/6911192116651622413#heading-6
- 常见的 GC 算法
  - 引用计数
  - 标记清除
  - 标记整理
  - 分代回收
- 什么是垃圾
  - 不需要使用的对象: 程序中不需要使用到的对象，会被认为是垃圾
  - 不能访问到的对象: 程序中不能访问到的对象，会被认为是垃圾

```
(一)
标记清除
- 概念: 假定存在一个 ( 根对象 )，相当于js中的全局对象，垃圾回收器将 ( 定期 ) 从根对象开始查找，凡是从 ( 根对象 ) 出发 ( 能扫描到的都会保留 )，( 扫描不到的将会被回收 )
- 具体流程:
  - 包含两个阶段: ( 标记阶段 ) 和 ( 清除阶段 )
  - 1. ( 递归遍历 ) 每一个 ( 根 )，直到所有 ( 可达对象 ) 都被访问到，并 ( 标记 ) 所有被访问到的对象 -- 以免将来再次遍历到同一个对象
  - 2. ( 递归遍历 ) 每一个 ( 根 )，( 清除 ) 没有标记到的对象，并 ( 抹掉第一阶段的所有标记 )
  - 3. ( 回收对应的空间 )，将回收的空间 ( 加到-空闲链表 ) 中i，方便后面的程序申请空间时使用
  - 4. 定期重复以上步骤
- 优缺点
  - 优点: 解决 循环引用 问题
  - 缺点:
    - 1.不会立即回收垃圾对象，即使发现了垃圾对象，也 ( 必须遍历完，才进行清除 )
    - 2.产生 ( 碎片化空间 )，即 ( 链表地址不连续 )
```

```
(二)
引用计数
- 概念: 设置引用数，判断 ( 当前引用数是否为0 )，为0就是垃圾对象，则会被垃圾回收器回收
- 原理: 通过 ( 引用计数器 )，当 ( 引用关系发生改变时 )，会 ( 修改引用计数器的数字 )
- 具体流程:
  - 1. 设置引用计数器
  - 2. 当 ( 对象的引用关系 ) 发生变化时，引用计数器会修改 ( 引用数字 )
  - 3. 当 ( 引用数字为0 ) 时，立即回收
- 优缺点
  - 优点: 一旦发现垃圾，就 ( 立即回收 )，最大限度减少程序暂停
  - 缺点:
    - 1. 无法回收 - 循环引用的对象
    - 2. 时间复杂度 - 高
    - 3. 资源消耗 - 大
```

```
(三)
标记整理
- 概念: 在标记清除的基础上，增加了整理阶段
  - 标记清除: 标记 -> 清除
  - 标记整理: 标记 -> 整理 -> 清除
- 具体流程
  - 标记阶段：递归遍历，对可达对象 ( 可达对象即活动对象 ) 做标记
  - 整理阶段：清除前先进行整理，移动对象位置，让 ( 地址产生连续 ) -------- 连续空间
  - 清除阶段：递归遍历，清除未标记的对象 ( 未标记的对象即非活动对象 )
```

```
(四)
分代回收
- 分类: 新生代 老生代 大对象
  - 新生代: ( 存活时间比较 - 短 ) 的对象，生命周期短，空间利用率低
  - 老生代: ( 存活时间比较 - 长 ) 的对象，生命周期长 ---- 比如: 全局对象，比较，new生成的实例，新生代晋升为老生代的对象
  - 大对象: 整块分配，一次性回收
- 存储
  - 分为 ( 新生代存储区 ) 和 ( 老生代存储区 )
  - 新生代存储区: ( 区域较小 )，分为 ( From空间 ) 和 ( To空间 )
  - 老生代存储区: ( 区域较大 )


新生代回收过程
- 1. 将所有 ( 活动对象 ) 存储在 ( From空间 )，此时 ( To空间空闲 )
- 2. From使用到一定程度，产生GC，此时会进行 ( 标记整理 - 即对活动对象进行整理，移动位置，使From空间连续，不会产生碎片化空间 )
- 3. 将 ( From中的活动对象 ) 拷贝到 ( To空间 )
- 4. 把 ( From空间完全释放 - 因为To中已经有了备份 )，回收完成 ( 即将From整理过后的连续空间的内容复制到To空间后，清除From空间 )
- 5. 对 ( From 和To 进行 调换 )，置换后 ( From就变成了To空间，To空间就变成了From空间 ) 继续重复之前的操作
- 总结: From -> 标记整理 -> To -> 清除From -> 名称互换
```

## (六) 浏览器从 输入 url 到 显示整个页面的全过程

```
url到页面显示的过程
---

1. DNS域名解析
- DNS是 ( domain name system ) 域名系统的缩写
- 将域名解析成ip地址
- 一个域名对应一个以上的ip地址
- 为什么要将域名解析成ip地址？
  - 因为 ( TCP/IP网络 ) 是通过 ( ip地址 ) 来确定 ( 通信对象 )，不知道ip就无法将消息发送给对方
- DNS域名解析的过程：// 递归查询和迭代查询
1. ( 浏览器 ) 中查询 DNS 缓存，有则进入建立tcp链接阶段，下面同理
2. ( 本机的系统 )中查询 DNS 缓存
3. ( 路由器 ) 中查询 DNS 缓存
4. ( 运营商服务器 ) 中查询 DNS 缓存
5. 递归查询 // 根域名/一级域名/二级域名 ....blog.baidu.com
  - .com
  - .baidu
  - blog
  - 还未找到就报错
- 优化
  - 当第一次访问结束后，会 ( 缓存 ) ( 域名和IP的映射 )
  - 但是一个项目足够大时，可能 ( img的src是不同的域名的url ) ( style的link是不同域名的url )，这些都是要做 DNS域名 解析的
  - 1. DNS预解析
    - 1. meta标签: 用meta信息来告知浏览器, 当前页面要做DNS预解析 <meta http-equiv="x-dns-prefetch-control" content="on" />
    - 2. link标签: 在页面 header 中使用 link 标签来强制对 DNS 预解析 <link rel="dns-prefetch" href="http://..." />
  - 2. DNS缓存优化
    - 1. 加本地 DNS 缓存的大小
    - 2. 优化本地 DNS 缓存的清理策略
  - 3. CDN域名加速
    - CDN服务缩短了用户查看内容的访问延迟
    - 将静态资源通过 CDN 进行加速，减少IP地址切换带来的影响，解决了网络带宽小、用户访问量大、网点分布不均等问题



2. 建立tcp链接 // 三次握手
- 第一次握手
    - 客服端发送一个 标志位SYN=1,序号Seq=x的链接包给服务端
        - SYN：表示发起一个新链接，( Synchronize Sequence Numbers )
        - Seq：序号是随机的
- 第二次握手
    - 服务端发送一个 标志位SYN=1,ACK=1,确认号Ack=x+1,序号Seq=y的确认包给客户端
    - 标志位 ACK 表示响应
- 第三次握手
    - 客户端发送一个 SYN=0,ACK=1,确认号Ack=y+1,序号Seq=x+1的确认包给服务器
    - 为什么需要三次握手
        - 之所以要第三次握手，主要是因为避免无效的连接包延时后又发送到服务器，造成服务器以为又要建立链接的假象，造成错误


3. 客户端发送http请求
4. 服务端处理请求，并返回http响应报文


5. 浏览器解析渲染
  - 遇见HTML标记，浏览器调用HTML解析器，解析成Token并构建DOM树
  - 遇见style/link标记，浏览器调用css解析器，解析成CSSOM树
  - 遇见script标记，浏览器调用js解析器，处理js代码（绑定事件，可能会修改DOM tree 和 CSSOM tree）
  - 将DOM 和 CSSOM 合并成 render tree
  - 根据render tree计算布局（布局）
  - 将各个节点的颜色绘制到屏幕上（渲染）



6. 断开TCP链接 // 四次挥手，( FIN : 表示释放链接 )
- 第一次挥手：浏览器发起，告诉服务器我请求报文发送完了，你准备关闭吧
- 第二次挥手：服务器发起，告诉浏览器我请求报文接收完了，我准备关闭了，你也准备吧
- 第三次挥手：服务器发起，告诉浏览器，我响应报文发送完了，你准备关闭吧
- 第四次挥手：浏览器发起，告诉服务器，我响应报文接收完了，我准备关闭了，你也准备吧
- 先是服务器先关闭，再是浏览器关闭
```
