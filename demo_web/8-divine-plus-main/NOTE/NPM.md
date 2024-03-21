# npm 相关命令

```
(1) npm包版本号
---

版本号基本是由三位数字组成：
   1   .   0   .   0   - beta.24
[MAJOR].[MINOR].[PATCH]-[alpha内部版本|beta公测版本|rc候选版本]

- MAJOR 进行不兼容的API更改时的版本 - 重大更新版本 不兼容
- MINOR 以向后兼容的方式添加功能时的版本 - 新功能 兼容
- PATCH 向后兼容的错误修复程序的版本 - 修复错误 兼容

// major 重要的 重大的
// minor 次要的 较小的
// patch 补丁

// alpha 希腊字母的第一个字母；开端；最初
// beta 希腊字母的第二个字母
```

```
(2) ^ 和 ~ 的区别
~ 表示改变 path层级的版本
^ 表示改变 minor层级的版本
---

"vue": "2.5.21",
"vue": "~2.5.21" // 2.5.x ---------- ( 不低于2.5.21小于2.6.x )
"vue": "^2.5.21", // 2.x.x --------- ( 不低于2.5.21小于3.x.x )
```

```
(3) 发布npm包相关的命令
---

1. 第一次发包
- npm adduser --- 注意 npm 必须是npm的源，不能是淘宝等，可以使用nrm切换
- 然后输入 用户名 密码

2. 非第一次发包
npm login

3. 发布
npm publish

4. 撤销发布的包
npm unpublish
npm unpublish 包名@版本号

5.1 更新至新的补丁版本
npm version patch

5.2 更新版本号并进行git提交，自定义提交描述
npm version major -m "版本更新至%s"

5.3 更新至新的补丁版本，并不增加git的tag
npm version patch --no-git-tag-version
```

```
6. 引用模块 - 全局安装的包，在项目里面只需要引用即可
npm link
npm link [<@scope>/]<pkg>[@<version>]
7. 解除引用
npm unlink
npm link [<@scope>/]<pkg>[@<version>]
```
