// 1. 什么是vue.nextTick()？

// 官方文档解释如下：

// 在下次DOM更新循环结束之后执行的延迟回调。在修改数据之后立即使用这个方法，获取更新后的DOM。

// 2. 为什么要使用nextTick ?

//   {{ name }}

// rvFNjms

// 如上代码 在页面视图上显示bb，但是当我在控制台打印的时候，获取的文本内容还是 aa，但是使用 nextTick后，获取的文本内容就是最新的内容bb了，因此在这种情况下，我们可以使用nextTick函数了。

// 上面的代码为什么改变this.name = 'bb'; 后，再使用console.log(this.$el.textContent); 打印的值还是aa呢？那是因为设置name的值后，DOM还没有更新到，所以获取值还是之前的值，但是我们放到nextTick函数里面的时候，代码会在DOM更新后执行，因此DOM更新后，再去获取元素的值就可以获取到最新值了。

// 理解DOM更新：在VUE中，当我们修改了data中的某一个值后，并不会立即反应到该el中，vue将对更改的数据放到watcher的一个异步队列中，只有在当前任务空闲时才会执行watcher队列任务，这就有一个延迟时间，因此放到 nextTick函数后就可以获取该el的最新值了。如果我们把上面的nextTick改成setTimeout也是可以的。

// 3. Vue源码详解之nextTick（源码在 vue / src / core / util / env.js）

// 在理解nextTick源码之前，我们先来理解下 html5中新增的 MutationObserver的API，它的作用是用来监听DOM变动的接口，它能监听一个dom对象发生的子节点删除，属性修改，文本内容修改等等。

// nextTick源码如下：

export const nextTick = (function () {

  const callbacks = []

  let pending = false

  let timerFunc

  function nextTickHandler() {

    pending = false;

    /*
    
    之所以要slice复制一份出来是因为有的cb执行过程中又会往callbacks中加入内容，比如$nextTick的回调函数里又有$nextTick，
    
    那么这些应该放入到下一个轮次的nextTick去执行，所以拷贝一份，遍历完成即可，防止一直循环下去。
    
    */

    const copies = callbacks.slice(0)

    callbacks.length = 0

    for (let i = 0; i < copies.length; i++) {

      copies[i]()

    }

  }

  // the nextTick behavior leverages the microtask queue, which can be accessed

  // via either native Promise.then or MutationObserver.

  // MutationObserver has wider support, however it is seriously bugged in

  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It

  // completely stops working after triggering a few times... so, if native

  // Promise is available, we will use it:

  /* istanbul ignore if */

  /*
  
  nextTick行为利用了microtask队列, 先使用 Promise.resolve().then(nextTickHandler)来将异步回调
  
  放入到microtask中，Promise 和 MutationObserver都可以使用，但是 MutationObserver 在IOS9.3以上的
  
  WebView中有bug，因此如果满足第一项的话就可以执行，如果没有原生Promise就用 MutationObserver。
  
  */

  if (typeof Promise !== 'undefined' && isNative(Promise)) {

    var p = Promise.resolve()

    var logError = err => { console.error(err) }

    timerFunc = () => {

      p.then(nextTickHandler).catch(logError)

      // in problematic UIWebViews, Promise.then doesn't completely break, but

      // it can get stuck in a weird state where callbacks are pushed into the

      // microtask queue but the queue isn't being flushed, until the browser

      // needs to do some other work, e.g. handle a timer. Therefore we can

      // "force" the microtask queue to be flushed by adding an empty timer.

      if (isIOS) setTimeout(noop)

    }

  } else if (typeof MutationObserver !== 'undefined' && (

    isNative(MutationObserver) ||

    // PhantomJS and iOS 7.x

    MutationObserver.toString() === '[object MutationObserverConstructor]'

  )) {

    // use MutationObserver where native Promise is not available,

    // e.g. PhantomJS IE11, iOS7, android 4.4

    /*
    
    创建一个MutationObserver，observe监听到DOM改动之后执行的回调 nextTickHandler
    
    */

    var counter = 1

    var observer = new MutationObserver(nextTickHandler)

    var textNode = document.createTextNode(String(counter));

    // 使用MutationObserver的接口，监听文本节点的字符内容

    observer.observe(textNode, {

      characterData: true

    });

    /*
    
    每次执行timerFunc函数都会让文本节点的内容在0/1之间切换，切换之后将新赋值到那个我们MutationObserver监听的文本节点上去。
    
    */

    timerFunc = () => {

      counter = (counter + 1) % 2

      textNode.data = String(counter)

    }

  } else {

    // fallback to setTimeout

    /*
    
    如果上面的两种都不支持的话，我们就使用setTimeout来执行
    
    */

    timerFunc = () => {

      setTimeout(nextTickHandler, 0)

    }

  }

  return function queueNextTick(cb?: Function, ctx?: Object) {

    let _resolve

    callbacks.push(() => {

      if (cb) {

        try {

          cb.call(ctx)

        } catch (e) {

          handleError(e, ctx, 'nextTick')

        }

      } else if (_resolve) {

        _resolve(ctx)

      }

    });

    /* 如果pending为true，表明本轮事件循环中已经执行过 timerFunc(nextTickHandler, 0) */

    if (!pending) {

      pending = true

      timerFunc()

    }

    if (!cb && typeof Promise !== 'undefined') {

      return new Promise((resolve, reject) => {

        _resolve = resolve

      })

    }

  }

})()

// 整体思路理解：首先 nextTick 是一个闭包函数，代码立即执行，在理解整体代码之前，我们先来看个类似的demo，如下代码：

// demo代码和上面的代码很类似。

// 我们也可以再来抽离使用nextTick做demo代码如下：

var nextTick2 = (function () {

  const callbacks = [];

  let pending = false;

  let timerFunc;

  function nextTickHandler() {

    pending = false

    const copies = callbacks.slice(0)

    callbacks.length = 0

    for (let i = 0; i < copies.length; i++) {

      copies[i]()

    }

  }

  if (typeof Promise !== 'undefined') {

    var p = Promise.resolve()

    var logError = err => { console.error(err) }

    timerFunc = () => {

      p.then(nextTickHandler).catch(logError)

    }

  } else if (typeof MutationObserver !== 'undefined' ||

    // PhantomJS and iOS 7.x

    MutationObserver.toString() === '[object MutationObserverConstructor]'

  ) {

    // use MutationObserver where native Promise is not available,

    // e.g. PhantomJS IE11, iOS7, Android 4.4

    var counter = 1

    var observer = new MutationObserver(nextTickHandler)

    var textNode = document.createTextNode(String(counter))

    observer.observe(textNode, {

      characterData: true

    })

    timerFunc = () => {

      counter = (counter + 1) % 2

      textNode.data = String(counter)

    }

  } else {

    // fallback to setTimeout

    /* istanbul ignore next */

    timerFunc = () => {

      setTimeout(nextTickHandler, 0)

    }

  }

  return function queueNextTick(cb, ctx) {

    let _resolve

    callbacks.push(() => {

      if (cb) {

        try {

          cb.call(ctx)

        } catch (e) {

          handleError(e, ctx, 'nextTick')

        }

      } else if (_resolve) {

        _resolve(ctx)

      }

    })

    if (!pending) {

      pending = true

      timerFunc()

    }

    if (!cb && typeof Promise !== 'undefined') {

      return new Promise((resolve, reject) => {

        _resolve = resolve

      })

    }

  }

})();

nextTick2(function () {

  console.log(2222);

});

// 如上代码是nextTick源码的抽离，为了更好的理解nextTick，做了如上的demo。

// 我们再来理解一下整体的代码的含义；

// 先定义数组 callbacks = []; 来存放所有需要执行的回调函数，定义let pending = false；判断本轮事件是否执行过 timerFunc(nextTickHandler, 0)这个函数，为true说明执行过 timeFunc函数，接着定义nextTickHandler函数，该函数的作用是依次遍历数组callbacks保存的函数，依次执行；

// 请看源代码如下：

function nextTickHandler() {

  pending = false

  const copies = callbacks.slice(0)

  callbacks.length = 0

  for (let i = 0; i < copies.length; i++) {

    copies[i]()

  }

}

// 然后就是三个判断了，代码如下：

if (typeof Promise !== 'undefined' && isNative(Promise)) {

  var p = Promise.resolve();

  var logError = err => { console.error(err) }

  timerFunc = () => {

    p.then(nextTickHandler).catch(logError);

  } 
}else if (typeof MutationObserver !== 'undefined' && (

    isNative(MutationObserver) ||

    // PhantomJS and iOS 7.x

    MutationObserver.toString() === '[object MutationObserverConstructor]'

  )) {

    var counter = 1

    var observer = new MutationObserver(nextTickHandler)

    var textNode = document.createTextNode(String(counter))

    observer.observe(textNode, {

      characterData: true

    })

    timerFunc = () => {

      counter = (counter + 1) % 2

      textNode.data = String(counter)

    }

  } else {

    timerFunc = () => {

      setTimeout(nextTickHandler, 0)

    }

  }

  // 首先判断是否支持Promise对象，如果支持的话，定义了timeFunc()函数，为了下一步调用做准备，然后继续判断是否支持该对象 MutationObserver，如果支持的话，创建一个文本节点，监听该节点数据是否发生改变，如果发生改变的话，调用timerFunc函数，counter值会在0 / 1切换，如果值改变了的话，把该数据值赋值到data属性上面去，那么data属性发生改变了，就会重新渲染页面(因为vue是通过Object.defineProperty来监听属性值是否发生改变)，如果上面两种情况都不满足的话，那么直接使用setTimeout来执行nextTickHandler函数了；

  // 最后nextTick代码返回一个函数，代码如下：

  return function queueNextTick(cb?: Function, ctx?: Object) {

    let _resolve

    callbacks.push(() => {

      if (cb) {

        try {

          cb.call(ctx)

        } catch (e) {

          handleError(e, ctx, 'nextTick')

        }

      } else if (_resolve) {

        _resolve(ctx)

      }

    })

    if (!pending) {

      pending = true

      timerFunc()

    }

    if (!cb && typeof Promise !== 'undefined') {

      return new Promise((resolve, reject) => {

        _resolve = resolve

      })

    }

  }

  // 代码的含义是：传入的cb是否是函数，ctx参数是否是一个对象，如果cb是一个函数的话，使用cb.call(ctx), 如果timerFunc没有执行过的话，那么pending为false，因此执行 timerFunc()函数。基本的思路就是这样的。