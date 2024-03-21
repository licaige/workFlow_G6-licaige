# Icon 图标

```
1
问题: class方式: 引入 iconfont 后，如何在 i 标签中只写类名?
缩写前: <i class="iconfont icon-xxx"/>
缩写后: <i class="icon-xxx"/>

核心原理:
[class*="dv-icon-"], [class^="dv-icon-"]{
  xxxx
}
```

### 资料

- 源码分析: https://juejin.cn/post/6993329331061653518
- plus 源码分析: https://juejin.cn/post/7168835045984043022
- 少写 class: https://juejin.cn/post/6899359351912431623
