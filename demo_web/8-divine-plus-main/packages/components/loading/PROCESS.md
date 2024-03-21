# Loading

## (一) 前置知识

### (1) 一些单词

```
prefix 前缀
suffix 后缀
```

### (2) 一些 api

```
1
document.defaultView
- 在浏览器中，该属性返回当前 document 对象所关联的 window 对象
- 如果没有，会返回 null

2
Window.getComputedStyle(element)
- 作用: 获取指定元素的 CSS 样式，返回一个对象
- 该对象在应用活动样式表并解析这些值可能包含的任何基本计算后报告元素的所有CSS属性的值
- 私有的CSS属性值可以通过对象提供的 ( API ) 或通过简单地使用 ( CSS属性名 ) 称进行索引来 ( 访问 )

3
window.getComputedStyle(element).getPropertyValue("height")
- api访问 style.heigh 属性
```
