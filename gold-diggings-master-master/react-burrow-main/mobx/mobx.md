## mobx

>在路上。

- 1.[官网](https://cn.mobx.js.org/)。

- 2.任何源自应用状态的东西都应该自动地获得。

- 3.React是不是响应式的，有没有双向绑定？在这点上跟React和Vue有什么区别？

- 4.装饰器就是对类处理的一个函数。

- 5.autorun,接收一个函数作为参数，可以监测@observable监听的属性改变的值。

- 6.为什么需要使用computed，因为如果你多次直接在标签中使用计算表达式，那么可以提取到computed中。可以复用一些计算逻辑。

- 7.computed可以用于基于已有的容器状态去计算一些业务需要的数据。

- 8.computed会缓存计算结果。

- 9.当@observable监测的数据每修改一遍，那么autorun就会执行一遍，而使用@action修饰的话，autorun只会执行一遍。

- 10.@action.bound是用于给函数绑定this。

- 11.runInAction用于在外部修改监测的数据，也只会触发一次autorun。

- 12.autorun默认会执行一次，然后当内部被观测的数据发生改变时重新触发执行。

- 13.如果autorun内部未使用的话，也不会触发autorun重新执行。

- 14.when的用法，当符合某个条件的时候执行一次自定义逻辑。

- 15.reaction不同于when和autorun，reaction只有当被观测的数据发生改变的时候，才会执行。
