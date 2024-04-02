# 邮件模板采坑

## Outlook 客户端：

1. 不支持 HTML5

2. Outlook 支持传统的 table 布局，不支持浮动，定位布局，建议使用 table 布局。

3. 内部和外联样式表实际操作来看，Outlook2010 是支持的，但是慎用，不排除低版本 Outlook 不支持，建议写内联样式。

4. 表格正常布局，建议格式化样式，合并内边距 cellpadding="0" cellspacing="0" style="border-collapse: collapse;"，建议开发时 border="1",这样可以看到你当前布局所占的位置，方便调试。

5. table 对于 margin 支持不好，padding 实际操作可以。两个部分之间的空格建议新建一行 tr 空元素加高度实现。

6. 实际操作中 line-height 会解析错误，直接给高度也可以实现垂直居中。

7) 浮动可以使用 align="center/left/right"。

8) 使用 colspan，rowspan 可以正确解析，合并表格

9) 图片问题尽量使用在线的路径，注意使用线上绝对路径的 src 值，防止图片找不到。图片设置 width 属性，写在 style 中可能会不生效。

10) table 支持背景色和 text-align:center;文字居中

11) 英文不自动换行，可以使用`<td style="word-break:break-all;">`

## Outlook 的 Web 客户端

1. 跟以上的不同点是，不支持内部和外联样式表，所以只能用内嵌，内嵌的覆盖样式在预览状态下不支持，会被客户端的一些标签给替换掉，比如说英文换行，双击新页面打开可以正常展示

2. 图片展示需要开始受信任人才可以展示

### 推荐链接

- [HTML Email 编写指南](http://www.ruanyifeng.com/blog/2013/06/html_email.html)

- [令人抓狂的 HTML Email](https://macsalvation.net/2018/01/17/fuck-html-email/)
