元素隔离的概念来自ShadowDom，即ShadowDom中的元素可以和外部的元素重复但不会冲突，micro-app模拟实现了类似ShadowDom的功能，元素不会逃离`<micro-app>`元素边界，子应用只能对自身的元素进行增、删、改、查的操作。

**举个栗子🌰 :**

基座应用和子应用都有一个元素`<div id='root'></div>`，此时子应用通过`document.querySelector('#root')`获取到的是自己内部的`#root`元素，而不是基座应用的。

**基座应用可以获取子应用的元素吗？**

可以的！

这一点和ShadowDom不同，在微前端下基座拥有统筹全局的作用，所以我们没有对基座应用操作子应用元素的行为进行限制。

### 解除元素绑定
默认情况下，当子应用操作元素时会绑定元素作用域，而解绑过程是异步的，这可能会导致渲染出错，此时可以主动解除元素绑定来避免这个问题。

执行`removeDomScope`方法后，元素作用域会重置为基座应用。

<!-- tabs:start -->
#### ** 基座应用 **
```js
import { removeDomScope } from '@micro-zoe/micro-app'

// 重置作用域
removeDomScope()
```

#### ** 子应用 **
```js
// 重置作用域
window.microApp.removeDomScope()
```
<!-- tabs:end -->

