# 🔦 d-resouce

web 端资源（文件、文件夹）读取工具 `此库若对你有所帮助，期待 Star 鼓励`


简体中文 | [English](README.md)

## 🎲 能力

内置常见的资源读取需求，方便更快地完成开发任务，愉快摸鱼

- 支持文件、多文件、文件夹读取
- 支持拖拽文件、文件夹读取
- 支持复制粘贴文件读取
- 支持返回两种数据格式（数组、树形）
- 支持只读文件模式
- 支持实时过滤文件、文件夹
- 支持实时检测文件规则校验，不符合可中断
- 默认每级文件夹会记录其下的所有文件大小总和
- 对外暴露拖拽 hover、leave 钩子，方便定制 UI 效果

## 🛵 使用

1. 安装 `d-resouce` 依赖包

```shell
npm install d-resouce
```

2. 实例化 `ResHandle` 工具

```js
import { ResHandle } from "d-resouce";

const resHandle = new ResHandle(options);
```

3. 使用辅助工具函数

```js
import { selectResource, selectFileChange, selectFolderChange, filterSize } from "d-resouce"

```

## 📒 文档

### options

|  字段   | 类型  | 说明 | 入参 |
|  ----  | ----  | ---- | ---- |
| targetDom  | HTMLElement | 拖拽事件对象 | ---- |
| dragoverFuc  | Function | 拖拽事件对象 hover 事件 | 事件对象 |
| dragleaveFuc  | Function | 拖拽事件对象 leave 事件 | 事件对象 |
| beforeReadFuc  | Function | 拖拽、黏贴事件对象读取前钩子函数 | ---- |
| readDataFuc  | Function | 拖拽、黏贴事件对象读取结果钩子函数 | 读取所有资源按照指定 mode 组装后的数据 |
| validFuc  | Function | 读取到的所有资源都会作为参数传入此函数，返回 false 则终止读取操作 | 文件：size、fullPath、name、type、file |
| filterFuc  | Function | 读取到的所有资源都会作为参数传入此函数，返回 false 则过滤掉此资源；注：过滤掉文件夹，其下的资源不在读取 | 分文件、文件夹两种，文件见 validFuc 入参，文件夹：totalSize、fullPath、name、type、file、child |
| mode  | String | 值为 array 或者 tree | ---- |
| onlyFile  | Boolean | 只读取文件，不处理文件夹 | ---- |
| targetDom  | HTMLElement | 拖拽事件对象 | ---- |

### other
|  字段   | 类型  | 说明 | 入参 | 出参 |
|  ----  | ----  | ---- | ---- | ---- |
| selectResource  | Function | 弹出系统资源框 | 1.是否目录上传 2.input type="file" 其他属性对象，例如：{ multiple: true } | 原生读取结果 |
| selectFolderChange  | Function | 文件夹上传读取结果按照指定 mode 组装后的数据 | 1.文件上传读取结果 2.mode类型 | 处理后结果 |
| selectFileChange  | Function | 文件上传读取结果处理（无层级，不需要指定 mode） | 1.文件上传读取结果 2.自定义格式化方法 | 处理后结果（默认按照readDataFuc 处理方式） |
| filterSize  | Function | 文件 size 转换为具体单位（B、KB、MB、GB、TB） | 1.文件 size | 处理后带单位的字符串 |


## 🙌 交流讨论

wetChat: yl66915
qq 邮箱: 1205836625@qq.com 
