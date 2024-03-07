原文地址：[Promise/A+规范](https://promisesaplus.com/)

>~~提醒：翻译是采用个人理解+谷歌翻译逐字逐句翻译~~

## （1）术语：

1.1. **“promise”** 是一个带有符合此行为规范 **then** 方法的对象（object）或函数（function）。

1.2. **“thenable”** 是定义 **then** 方法的一个对象（object）或函数（function）。

1.3. **“value”** 可以是任何**合法**的 **JavaScript** 值（包括 **undefined**，**thenable**，**promise**）。

1.4. **“exception”** 是被 **throw** 语句抛出的值。

1.5. **“reason”** 是表明 promise 为什么被拒绝的值。

## （2）规范

### 2.1. Promise状态

一个 **promise** 必须处于以下三种状态之一：**pending**，**fulFilled**，或 **rejected**。

**2.1.1.** 当 **promise** 为 **pending** 状态时：

- 2.1.1.1. 可能会转换为 **fulFilled状态** 或 **rejected状态**

**2.1.2.** 当 **promise** 为 **fulFilled** 状态时：

- 2.1.2.1. 不能转换为任何其它状态。

- 2.1.2.2. 必须有一个 **value** 值，且该 **value** 值不能更改。

**2.1.3.** 当 **promise** 为 **rejected** 状态时：

- 2.1.3.1. 不能转换为任何其它状态。

- 2.1.3.2.  必须有一个 **reason** 值，且该 **reason** 值不能更改。

在此，“不能更改”意味着恒等不变（即：===），但并不表示更深层次的不可改变。

### 2.2. then方法

一个 **Promise** 必须提供一个 **then** 方法用来访问 **当前值**、最终的 **value值** 或 **reason**。

一个 **Promise** 的 **then** 方法接收两个参数：

```JavaScript
promise.then(onFulfilled, onRejected)
```

**2.2.1.** **onFulfilled** 和 **onRejected** 都是可选参数：

- 2.2.1.1. 如果 **onFulfilled** 不是函数，则必须将其忽略。

- 2.2.1.2. 如果 **onRejected** 不是函数，则必须将其忽略。

**2.2.2.** 如果 **onFulfilled** 是一个函数：

- 2.2.2.1. 必须在 **promise** 实现 **fulFilled** 状态后调用它，它的第一个参数是 **promise** 的值。

- 2.2.2.2. 不能在 **promise** 实现 **fulFilled** 状态前调用它。

- 2.2.2.3. 它不能被调用超过一次

**2.2.3.**  如果 **onRejected** 是一个函数：

- 2.2.3.1. 必须在 **promise** 实现 **rejected** 状态后调用它，它的第一个参数是 **reason**。

- 2.2.3.2.  不能在 **promise** 实现 **rejected** 状态前调用它。

- 2.2.3.3. 它不能被调用超过一次

**2.2.4.** **onFulfilled** 或 **onRejected** 不能在执行上下文堆栈仅包含平台代码之前调用。**[3.1]**

**2.2.5.** **onFulfilled** 和 **onRejected** 必须作为函数调用（即 没有 **this** 值）。**[3.2]**

**2.2.6.** then 可能在同一个 promise 中被多次调用。

- 2.2.6.1. 如果当 **promise** 是 **fulFilled** 状态时，所有 **then** 各自的 **onFulfilled** 回调必须按照其被 **then** 发起调用的顺序执行。

- 2.2.6.2.  如果当 **promise** 是 **rejected** 状态时，所有 **then** 各自的 **onRejected** 回调必须按照其被 **then** 发起调用的顺序执行。

**2.2.7.** **then** 必须返回一个 **promise** **[3.3]** 。

```JavaScript
promise2 = promise1.then(onFulfilled, onRejected);
```

- 2.2.7.1. 如果 **onFulfilled** 或 **onRejected** 返回一个 value **x**，运行 promise 解决程序：

```JavaScript
[[Resolve]](promise2, x)
```

- 2.2.7.2. 如果 **onFulfilled** 或 **onRejected** 抛出异常 **e** ，**promise2** 必须执行 **rejected** 将 **e** 作为 **reason** 的值。

- 2.2.7.3. 如果 **onFulfilled** 不是一个函数并且 **promise1** 是 **fulFilled** 状态，**promise2** 必须是 **fulFilled** 状态且带着 **promise1** 同样的值。

- 2.2.7.4. 如果 **onRejected** 不是一个函数并且 **promise1** 是 **rejected** 状态，**promise2** 必须是 **rejected** 状态且带着 **promise1** 同样的 **reason**。

### 2.3. Promise 解决程序

Promise 解决程序是一个抽象操作表现为输入一个 **promise** 和一个 **value值**，我们用 **[[Resolve]](promise, x)** 表示，如果 **x** 是一个 **thenable**，它试图使 **promise** 采用 **x** 的状态，假设 **x** 的行为和 **promise** 类似。否则，它带着一个 value **x** 使 **promise** 转为 **fulfilled** 状态。

这种对于 **thenable** 的处理就允许 **promise** 实现互操作，只要他们暴露一个符合 **Promises/A+** 的 **then** 方法。它也允许**Promises/A+** 实现使用合理的 **then** 方法“整合”不合格的实现。

要运行 **[[Resolve]]（promise，x）**，请执行以下步骤：

**2.3.1.** 如果 **promise** 和 **x** 指向同一个对象，**promise** 带着一个 **TypeError** 作为 **reason** 执行 **reject**。

**2.3.2.** 如果 **x** 是一个 **promise** ，采用它的状态 **[3.4]** ：

- 2.3.2.1。 如果 **x** 是 **pending** 状态，**promise** 必须保持 **pending** 状态直到 x 是 **fulFilled** 状态或 **rejected** 状态。

- 2.3.2.2. 如果当 x 是 **fulfilled** 状态，带着同样的 **value** 让 **promise** 变成 **fulFilled** 状态。

- 2.3.2.3. 如果当 x 是 **rejected** 状态，带着同样的 **reason** 让 **promise** 变成 **rejected** 状态。

**2.3.3.** 除此之外，如果 **x** 是一个对象或函数：

- 2.3.3.1. 将 **x.then** 赋值给 **then**。**[3.5]**

- 2.3.3.2. 如果使用属性 **x.then** 引发抛出异常 **e**，带着 **e**  作为 **reason** 让 **promise** 变成 **rejected** 状态。

- 2.3.3.3. 如果 **then** 是一个函数，用 **x** 作为 **this** 调用它，第一个参数 **resolvePromise**，第二个参数 **rejectPromise**，如下：

- - 2.3.3.3.1. 如果当 **resolvePromise** 带着一个 value **y** 被调用，执行 **[[Resolve]](promise, y)**。

- - 2.3.3.3.2. 如果当 **rejectPromise** 带着一个 reason **r** 被调用，带着 **r**  作为 **reason** 让 **promise** 变成 **rejected** 状态。

- - 2.3.3.3.3. 如果同时调用 **resolvePromise** 和 **rejectPromise** ，或者对同一参数进行了多次调用，则第一个调用优先，而所有其他调用均被忽略。

- - 2.3.3.3.4. 如果调用 **then** 抛出异常 **e**：

- - - 2.3.3.3.4.1. 如果 **resolvePromise** 或 **rejectPromise**已经被调用，请忽略它。

- - - 2.3.3.3.4.2. 否则，带着 **e**  作为 **reason** 让 **promise** 变成 **rejected** 状态。

- 2.3.3.4. 如果 then 不是一个函数，带着 **x** 作为 **value** 让 **promise** 变成 **fulFilled** 状态。

如果一个 **Promise** 是 **resolved** 带着一个 **thenable** 在一个 **thenable** 循环链中，这样 **[[Resolve]](promise, thenable)** 的递归性质最终导致 **[[Resolve]](promise, thenable)** 再次被调用，遵循上述算法将导致无限递归，鼓励但不是必需的实现，以检测此类递归并以信息 **TypeError** 为 **reason** 的执行 **promise** 的 **reject**。**[3.6]**

## （3）附注

### 3.1. 这里的“平台代码”是指引擎，执行环境和 **promise** 实现代码。实际上，此要求可确保在事件循环回合之后调用 **onFulfilled** 和 **onRejected** 异步执行，然后使用新的堆栈进行调用。可以使用 **“宏任务”** 机制（如 **setTimeout** 或 **setImmediate** ）或 **“微任务”** 机制（如 **MutationObserver** 或 **process.nextTick** ）来实现。由于 **promise** 实现被视为平台代码，因此它本身可能包含一个任务调度队列或“trampoline”，在其中调用处理程序。

### 3.2. 也就是说，在严格模式下，**this** 是 **undefined** 。 在非严格模式下，**this** 是全局对象。

### 3.3. 如果实现满足所有要求，则实现可以允许 **promise2 === promise1** 。 每个实现都应记录是否可以产生 **promise2 === promise1** 以及在什么条件下产生。

### 3.4. 通常，只有 **x** 来自当前的实现，才知道它是一个真正的 **promise** 。 本节允许使用特定的实现的方式来采用已知符合 **promise** 的状态。

### 3.5. 首先存储对 **x.then** 的引用，然后测试该引用，然后调用该引用的过程避免了对 **x.then** 属性的多次访问。 此类预防措施对于确保访问者属性的一致性非常重要，因为访问者属性的值在两次检索之间可能会发生变化。

### 3.6. 实现不应在可建立链的深度上设置任意限制，并假定超出该任意限制，则递归将是无限的。 只有真正的循环才应该导致 **TypeError** 。 如果遇到无限多个不同的罐头，则永远递归是正确的行为。