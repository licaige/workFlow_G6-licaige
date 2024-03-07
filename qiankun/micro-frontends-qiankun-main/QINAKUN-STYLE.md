# 微应用（qiankun）之 样式隔离

## 前言

在上篇文章 [微应用（qiankun）之 vite 构建](https://juejin.cn/post/7271276760905334845) 中，我们在应用的样式隔离方面并没有做过多的介绍。而在实际项目中，这确是一个不容忽视的问题。那么我们应该如何去做这样式隔离呢？接下来本文首先会从 `qiankun` 提供的样式隔离方案开始进行简单介绍，然后选取合适的方案来实现样式隔离。下面就让我们一起来看看吧！

## 为什么要做样式隔离

在使用 `qiankun` 时，我们会发现，当我们在主应用中引入了多个子应用时，子应用的样式会互相影响，这是因为子应用的样式是**全局**的，而 `qiankun` 默认情况下并没有对子应用的样式进行隔离。而我们实际中想要的样式隔离效果又是怎么样的呢？其主要是下面两点：

1. 子应用样式不会影响到其他子应用或主应用，同时也支持全局样式
2. 主应用样式可以覆盖各子应用下的指定的样式，不容易影响到其他子应用

基于上面两点，我们需要的样式隔离方案应该是**弱隔离型**。那么我们该如何去实现呢？首先，让我们先来了解一下 `qiankun` 提供的样式隔离方案。

## qiankun 提供的样式隔离方案

`qiankun` 提供了两种样式隔离方案 `strictStyleIsolation` 和 `experimentalStyleIsolation`，我们可以根据实际情况来选择合适的方案。下面也会对这两种方案进行介绍，并给出示例代码，方便大家理解。更多详情可参考 [qiankun-startopts](https://qiankun.umijs.org/zh/api#startopts)

### strictStyleIsolation

它是严格的样式隔离，也是官方推荐的，主要是通过 `shadow dom` 来实现的。

#### shadow dom

`shadow dom` 是一种浏览器技术，它可以将一个 `DOM` 节点及其子节点与另一个文档分离。这样它就可以有自己的 `DOM` 树、`CSS` 样式、计算样式等等，但它并不是所有浏览器都支持。更多详情可参考 [shadow dom](https://web.dev/shadowdom-v1/)。

下面是 `qiankun` 中 `strictStyleIsolation` 样式隔离的示例代码：

#### 示例代码

```ts
import { start, loadMicroApp } from 'qiankun'

// 说明：结合加载子应用方式选择其中一种即可

// 方式1: 启动 qiankun
start({
  sandbox: {
    strictStyleIsolation: true,
  }
})

// 方式2: 手动加载子应用 reactApp
loadMicroApp('reactApp', {
  sandbox: {
    strictStyleIsolation: true,
  }
})
```

当开启 `strictStyleIsolation` 后，我们会发现子应用的样式已经被隔离了，同时子应用的样式也无法覆盖主应用的样式了。如下图所示：

![image-20230913093626724.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2c14e1b297f34c5da5d3ed351c839fe5~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=2876&h=1568&s=498334&e=png&b=fdfcfc)

#### 结论

通过上面对 `shadow dom` 的了解，我们会发现它是**强隔离型**，也并不支持覆盖子应用样式及子应用无法设置全局样式等问题。所以它是不能满足我们需求的。

### experimentalStyleIsolation

它是实验性的样式隔离。主要是通过 `scoped css` 来实现的。

#### scoped css

`scoped css` 是一种 `css` 技术，它可以让 `css` 样式只作用于当前组件中的元素。这种技术可以用来实现样式隔离。更多详情可参考下面的链接：

- [scoped css(vue)](https://cn.vuejs.org/api/sfc-css-features.html)
- [css scoping in react](https://www.upbeatcode.com/react/css-scoping-in-react-everything-you-need-to-know/)

下面是 `qiankun` 中 `experimentalStyleIsolation` 样式隔离的示例代码：

#### 示例代码

```ts
import { start, loadMicroApp } from 'qiankun'

// 说明：结合加载子应用方式选择其中一种即可

// 方式1: 启动 qiankun
start({
  sandbox: {
    experimentalStyleIsolation: true,
  }
})

// 方式2: 手动加载子应用 reactApp
loadMicroApp('reactApp', {
  sandbox: {
    experimentalStyleIsolation: true,
  }
})
```

当开启 `experimentalStyleIsolation` 后，其实我们可以看到 `qiankun` 会在外层容器上添加 `data-qiankun="子应用名称"` 属性，与此同时也会子应用的样式上添加 `div[data-qiankun="子应用名称"]` 选择器来实现了样式隔离。如下面结构所示：

```scss
// 子应用名称 = reactApp
div[data-qiankun="reactApp"] .layout {
  // 子应用样式
}

div[data-qiankun="reactApp"] .layout-container {
  // 子应用样式
}
```

但是在我的项目示例中并没有展现正确的效果，看早前有人提过 [issues](https://github.com/umijs/qiankun/issues/2376)，可是并没有得到任何回复。不过其他人好像也并没有遇到类似的问题，它或许可能与我项目中的其它地方产生了冲突，如果有知道小伙伴的可以评论区留言哦！示例项目中效果如下图所示：

![image-20230913093858359.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/09249938b9a54235844f55ffb7057b6a~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=2876&h=1568&s=759572&e=png&b=fdfcfc)

#### 结论

通过上面对 `scoped css` 的了解，我们会发现它其实是可以满足我们需求的，但是 `qiankun` 的 `experimentalStyleIsolation` 却并没有支持全局样式的设置。故也是 `pass`，期待 `qiankun` 后续完善支持!

### 最终样式隔离方案

综上所述，我们可以得出结论：`qiankun` 目前提供的两种样式隔离方案并不能满足我们的需求。但给了我们一个思路，那就是 `scoped css` 方案。故此我们可以自己在项目通过 `scoped css` 来实现应用的样式隔离来满足我们的需求。下面依次介绍如何在 `react` 和 `vue` 中使用 `scoped css` 来实现样式隔离。

#### React

在 `React` 中，我们可以通过 `scoped css` 来实现样式隔离，它的原理是给每个 `class` 添加一个 `hash` 的属性，这样就可以实现样式隔离。`vite` 构建的 `react` 项目默认支持 `scoped css`，我们只需要将样式文件后缀改为 `.module.scss` 即可

##### 示例代码

```tsx
import styles from './index.module.scss'

export default () => {
  return (
    <div className={styles.container}>
      <p className='title'>react app</p>
      <button className={styles.button}>button</button>
    </div>
  )
}
```

`index.module.scss` 样式文件正常 `scss` 语法 写即可，不需要做任何处理

```scss
.container {
  .title {}
  // :global 前缀可以让样式不被隔离，可以在全局使用
  :global.button {}
}
```

#### vue

在 `vue` 中，我们可以通过 `scoped` 来实现样式隔离，它的原理是给每个 `class` 添加一个 `data-v-xxxx` 的属性，这样就可以实现样式隔离。

#### 示例代码

```vue
<style lang="scss" scoped></style>
```

文章介绍到这里就结束了，希望对大家有所帮助，如果有什么问题欢迎在评论区留言哦！
