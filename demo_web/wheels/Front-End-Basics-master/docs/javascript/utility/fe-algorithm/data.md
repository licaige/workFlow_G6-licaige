# 常见数据结构

> 数据结构是计算机为了高效地利用资源而组织数据的一种方式。数据结构和算法是解决一切编程问题的基础。

## 1、数组类型

几乎所有的语言都原生支持数组类型，因为数组是最简单的内存数据结构。

### 1.JavaScript 的数组

这个会单独拿出来放到 JavaScript 基础的数组中去介绍。

### 2.JavaScript 数组与其他语言不同

1. 在`JavaScript`中，数组是一个可以修改的对象。如果添加元素，它就会动态增长。在`C`和`Java`等其他语言里，我们要先决定数组的大小，想添加元素就要创建一个全新的数组，不能简单地往其中添加所需的元素。

2. 与`C`和`Java`等其他语言不同，JavaScript 数组不是强类型的，因此它可以存储任意类型的数据。

## 2、栈

### 1.栈数据结构

> 栈是一种遵从后进先出(LIFO)原则的有序集合，新添加的或待删除的元素都保存在栈的同一端，称为栈顶，另一端叫栈底。

也就是说，在栈里，新元素都靠近栈顶，旧元素都靠近栈底。

基于以上，栈也被用在编程语言的编译器和内存中保存变量、方法调用等。

### 2.栈操作

> 其中包含创建栈，向栈添加元素，从栈移除元素，查看栈顶元素，检查栈是否为空，清空和打印栈元素

```
// Stack 类
// 先创建一个类来表示栈
class Stack {
    constructor () {

        // 需要一种数据结构来保存栈里的元素，这里选择数组
        this.items = [];

        // 缓存栈的size
        this.size = 0;
    }

    /* 声明栈需要的一些方法 */

    // 重置栈的size
    resetSize () {
        return this.items.length;
    }

    // 打印栈数据
    print () {
        console.log(this.items.toString())
    }

    //添加一个或几个新元素到栈顶，该方法只添加元素到栈顶，也就是栈的末尾,返回当前栈元素数量
    push (){
        this.items.push.apply(this.items, arguments)
        this.size = this.resetSize();
        return this.size;
    }

    // 移除栈顶的元素，同时返回被移除的元素，栈遵循LIFO原则，因此移除的是最后添加进去的元素
    pop () {
        this.size--;
        return this.items.pop();
    }

    // 返回栈顶的元素，不对栈做任何修改
    peek () {
        return this.items[this.size - 1];
    }

    // 判断栈是否为空，如果栈里没有任何元素就返回true，否则返回false
    isEmpty () {
        return this.size == 0;
    }

    // 移除栈里的所有元素
    clear () {
        this.items.length = 0;
        this.size = this.resetSize();
    }

    // 返回栈里的元素个数
    getSize () {
        return this.size;
    }
}

// 使用Stack类
let stack = new Stack();
console.log(stack.isEmpty())   // 打印 true
stack.push(1,2,3);
stack.print()  // 打印 1,2,3
console.log(stack.isEmpty())   // 打印 false
console.log(stack.getSize())   // 打印 3
console.log(stack.pop())   // 打印 3
stack.print()  // 打印 1,2
stack.clear()
stack.print()  // 打印为空
console.log(stack.isEmpty())   // 打印 true
stack.push(5,6)
console.log(stack.peek())  // 打印 6

```

#### 以上 Stack 类存在的问题

ES6 的类声明，不能像其他语言(Java、C++、C#)一样直接在类里面声明变量，只能在类的构造函数 constructor 里声明。
所以这就导致 items 是公共的了，这是现在 ES6 的不足的地方，不能够声明声明私有属性或方法(虽然已经有提案了)。

在这种情况下，我们希望 Stack 类的用户只能访问暴露给类的方法。否则，就有可能从栈的中间移除元素，毕竟我们用的是数组来存储的，比如直接用实例调用`stack.items.splice(2,3)`，有以下集中方法能相对解决这个问题。

> 1、用 ES5 的构造函数，在构造函数中声明变量 items

```
function Stack () {
    let items = [];
    this.push = function (element) {
        //一次添加一个
        return items.push(element)
    }

    ...其他方法
}

```

用这个方法又有个问题就是，所有方法都是在构造函数中定义的，在创建很多个实例的时候会比基于原型的类更占内存。

> 2、用 ES6 的限定作用域 Symbol 实现

ES6 新增的 Symbol 是不可变的，可以用作对象的属性。

```
let _items = Symbol();

class Stack {
    constructor () {
        this[_items] = [];
    }

    ...其他方法
}
```

这个方法创建了一个假的私有属性，正常情况下在类的实例中是拿不到 Symbol 属性，但是 ES6 有一个叫做`getOwnPropertySymbols`方法能够取到类里面声明的所有 Symbol 属性，然后也可以通过下面的代码破坏 Stack 类。

```
let objectSymbols = Object.getOwnPropertySymbols(stack);
stack.print()   // 打印 5,6
console.log(objectSymbols.length)   // 打印 1
console.log(objectSymbols)  // 打印 [Symbol()]
console.log(objectSymbols[0])   // 打印 Symbol()
stack[objectSymbols[0]].push(1)
stack.print()   // 打印 5,6,1 被改动了……
```

> 用 ES6 的 weakMap 实现

```
const items = new WeakMap();

class Stack {
    constructor () {
        items.set(this, [])
    }
    push (element) {
        let s = items.get(this);
        s.push(element);
    }
    ...其他方法
}
```

现在 items 在 Stack 类里是真正的私有属性了，但如果 Stack 不再 commonjs 模块，或者 webpack 打包中，还得需要一个闭包，因为 items 是在 Stack 类以外声明的，谁都可以动它。

```
let Stack = (function () {
    const items = new WeakMap();

    class Stack {
        constructor () {
            items.set(this, [])
        }
        push (element) {
            let s = items.get(this);
            s.push(element);
        }
        ...其他方法
    }
    return Stack;
})()
```

## 3、队列

### 1、队列的数据结构

> 队列是遵循 FIFO（先进先出）原则的一组有序的项。
> 队列在尾部添加新元素，并从顶部移除元素。最新添加的元素必须排在队列的末尾。

### 2、队列操作

> 其中包含创建队列，向队列中添加元素，从队列中移除元素，查看队列头元素，检查队列是否为空，打印队列元素。

```
// 直接用WeakMap来构造私有变量

const items = new WeakMap();
export default class Queue {
    constructor () {
        items.set(this, [])
    }
    enqueue (element) {
        let s = items.get(this);
        s.push(element);
    }
    dequeue () {
        let s = items.get(this);
        return s.shift();
    }
    front () {
        let s = items.get(this);
        return s[0]
    }
    isEmpty () {
        let s = items.get(this);
        return s.length == 0;
    }
    size () {
        let s = items.get(this);
        return s.length;
    }
    print () {
        let s = items.get(this);
        console.log(s.toString())
    }
}

// 使用Queue类
let queue = new Queue();
console.log(queue.isEmpty()) //true
queue.enqueue('fangxu')
queue.enqueue('wenqi')
queue.enqueue('benben')
queue.print() //'fangxu', 'wenqi', 'benben'
console.log(queue.size()) //3
console.log(queue.isEmpty()) // fasle
queue.dequeue()
queue.dequeue()
queue.print() //'benben'
```

### 3、优先队列

> 优先队列就是元素的的添加和移除是基于优先级的。例如机场登机的顺序，虽然也是排队，但是头等舱比经济舱先登机。

实现一个优先队列，有两种方式：
1、设置优先级，然后在正确的位置添加元素；
2、用正常入列的方式操作添加元素，然后按照优先级移除她们。

```
const items = new WeakMap();
// 整合元素和其对应优先级的类
class QueueElement {
    constructor (element, priority) {
        this.element = element;
        this.priority = priority;
    }
}
export default class Queue {
    constructor() {
        items.set(this, [])
    }
    //更改了一下enqueue方法
    enqueue(element, priority) {
        let s = items.get(this);
        let queueElement = new QueueElement(element, priority);
        let added = false;
        for(var i = 0; i < s.length; i++) {
            if (queueElement.priority < s[i].priority) {
                s.splice(i, 0, queueElement);
                added = true;
                break;
            }
        }
        if(!added) {
            s.push(queueElement);
        }
    }
    dequeue() {
        let s = items.get(this);
        return s.shift();
    }
    front() {
        let s = items.get(this);
        return s[0]
    }
    isEmpty() {
        let s = items.get(this);
        return s.length == 0;
    }
    size() {
        let s = items.get(this);
        return s.length;
    }
    print() {
        let s = items.get(this);
        s.forEach((item, index) => {
            console.log(`${item.element}-${item.priority}`)
        })
    }
}

// 使用Priorityqueue类
let queue = new Priorityqueue();
console.log(queue.isEmpty()) //true
queue.enqueue('fangxu',2)
queue.enqueue('wenqi',1)
queue.enqueue('benben',1)
queue.print() //'wenqi-1', 'benben-1','fangxu-2'
console.log(queue.size()) //3
console.log(queue.isEmpty()) // fasle
queue.dequeue()
queue.dequeue()
queue.print() //'fangxu-2'
```

上述实现的优先队列是最小优先队列，因为优先级值较小的元素被放置在队列最前面。最大优先队列则相反，把优先级的值较大的元素放置在队列最前面。

### 4、循环队列

> 循环队列是又一个修改版的队列，有一个很经典的例子就是击鼓传花（多人围成一个圆圈，把花尽快传递给下一个人。某一时刻传花停止，这个时候花在谁手里，谁就退出这个游戏，然后重复这个过程，直到只剩一个人）

```
import Queue from './queue'

function hotPotato(nameList, time) {
    let queue = new Queue();
    nameList.forEach((item, index) => {
        queue.enqueue(item)
    })
    let eliminated = '';
    while(queue.size() > 1) {
        for(let i = 0; i < time; i++) {
            queue.enqueue(queue.dequeue())
        }
        eliminated = queue.dequeue();
        console.log(`${eliminated}在击鼓传花的游戏中被淘汰。`)
    }
    return queue.dequeue();
}

// 使用hotPotato方法
// 以下都是团队里的成员
let names = ['zheming', 'sijie', 'chengyin', 'guangyu', 'yueying', 'xiaolujie', 'miaomiao', 'wenwu'];
// 为了避免他们说我不公平，这里用了一个随机取1-7的次数
let time = Math.ceil(7 * Math.random());
let winner = hotPotato(names, time);
console.log(`击鼓传花的胜者是${winner}`)

// 打印其中某一次的结果
guangyu在击鼓传花的游戏中被淘汰。
wenwu在击鼓传花的游戏中被淘汰。
yueying在击鼓传花的游戏中被淘汰。
sijie在击鼓传花的游戏中被淘汰。
zheming在击鼓传花的游戏中被淘汰。
chengyin在击鼓传花的游戏中被淘汰。
miaomiao在击鼓传花的游戏中被淘汰。
击鼓传花的胜者是xiaolujie
```

## 4、链表

> 要存储多个元素，数组（或者可以称为列表）可能是最常用的数据结构，正如之前提到的，大多数语言实现的数组有一个缺点，就是数组大小是固定的，从数组的起点或中间插入或者移除项的成本很高，因为需要移动元素（尽管 JavaScript 的 Array 类方法可以帮助我们做这些事，但背后的情况同样是这样）。
> `链表` 存储有序的元素集合，但不同于数组，链表中的元素在内存中并不是连续放置的。每个元素由一个存储元素本身的节点和一个指向下一个元素的引用（也成指针或链接）组成。

#### 链表和数组的区别

链表的优点：相对于传统数组，链表添加和移除元素的时候不需要移动其他元素。
链表的缺点：链表需要使用指针，这是需要注意的地方。还有就是相对于数组可以直接访问任何位置的任何元素而言，想访问链表中间的一个元素，就需要从起点（表头）开始迭代列表直到找到所需的元素。

现实中链表的例子，就比如说运煤的火车，一列火车是由一系列车皮组成的，每节车皮都相互连接，可以很容易的分离一节车皮，改变它的位置，添加或移除它。这样车皮就是列表的元素，车皮间的链接就是指针。

### 1、链表操作

```
// 需要一个Node辅助类
class Node {
    constructor(element) {
        this.element = element;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.length = 0;
        this.head = null;
    }

    // 向链表尾部追加元素
    // 有两种场景，列表为空，添加的是第一个元素，或者列表不为空，向其追加元素
    append(element) {
        let current,
            node = new Node(element);
        if(this.head === null) {
            this.head = node;
        }else {
            current = this.head;
            while(current.next) {
                current = current.next;
            }
            current.next = node;
        }
        this.length++;
    }

    // 从链表中移除元素
    // 有两种场景，第一种是移除第一个元素，第二种是移除第一个以外的任一元素。
    removeAt(position) {
        // 处理位置，首先检查是否越界
        if(position > -1 && position < this.length) {
            let previous,
                index = 0,
                current = this.head;
            if(position === 0) {
                this.head = current.next;
            }else {
                while(index++ < position) {
                    previous = current;
                    current = current.next;
                }
                previous.next = current.next;
            }
            this.length--;
            return current.element;
        }else {
            return null;
        }
    }

    // 在任意位置插入元素
    insert(element, position) {
        if(position >= 0 && position <= this.length) {
            let previous,
                current = this.head,
                index = 0,
                node = new Node(element);
            if(position === 0) {
                node.next = current;
                this.head = node;
            }else {
                while(index++ < position) {
                    previous = current;
                    current = current.next;
                }
                node.next = current;
                previous.next = node;
            }
            this.length++;
            return true;
        }else {
            return false;
        }
    }

    // 返回元素在列表中的索引。如果列表中没有该元素则返回-1
    indexOf(element) {
        let current = this.head,
            index = -1;
        while(current) {
            index++;
            if(current.element === element) {
                return index;
            }
            current = current.next;
        }
        return -1;
    }

    // 从列表中移除一项
    remove(element) {
        let index = this.indexOf(element);
        return this.removeAt(index);
    }

    // 判断链表是否为空
    isEmpty() {
        return this.length === 0;
    }

    // 显示链表的大小，返回链表中包含的元素个数
    size() {
        return this.length;
    }

    // 获取链表的头
    getHead() {
        return this.head;
    }

    // 把链表对象转换成字符串
    toString() {
        let string = '',
            current = this.head;
        while(current) {
            string += current.element + (current.next? 'n' : '');
            current = current.next;
        }
        return string;
    }
}

export default LinkedList



// 具体使用
import LinkedList from 'linkedList'
let linkedList = new LinkedList();

console.log(linkedList.size()) // 0
console.log(linkedList.getHead()) // null
console.log(linkedList.isEmpty()) // true
linkedList.append('fangxu')
linkedList.append('zheming')
linkedList.append('wenwu')
console.log(linkedList.size()) // 3
console.log(linkedList.getHead()) // {element: 'fangxu', next: Node}
console.log(linkedList.isEmpty()) // false
console.log(linkedList.toString()) // fangxunzhemingnwenwu
linkedList.insert('yueying', 0)
linkedList.insert('chengyin', 4)
console.log(linkedList.size()) // 5
console.log(linkedList.getHead()) // {element: 'yueying', next: Node}
console.log(linkedList.toString()) // yueyingnfangxunzhemingnwenwunchengyin
console.log(linkedList.indexOf('fangxu')) // 1
console.log(linkedList.removeAt(2)) // zheming
console.log(linkedList.size()) // 4
console.log(linkedList.toString()) // yueyingnfangxunwenwunchengyin
console.log(linkedList.remove('fangxu')) // fangxu
console.log(linkedList.size()) // 3
console.log(linkedList.toString()) // yueyingnwenwunchengyin


```

> 注意

1、列表中的最后一个节点的下一个元素始终是 null。

### 2、双向链表

双向链表和普通链表的区别是，普通链表一个节点只有链向下一个节点的链接，在双向链表中，链接是双向的：一个链向下一个元素，另一个链向前一个元素

```
// 双向链表需要增加以下属性

class Node {
    constructor(element) {
        this.element = element;
        this.next = null;
        this.prev = null; // 新增指向其哪一个元素的链接
    }
}

class DoublyLinkedList {
    constructor() {
        this.length = 0;
        this.head = null;
        this.tail = null; // 链表类增加链表反向的头,也就是正向链表的尾巴
    }

    ...
}
```

**注意：** 因为双向链表中有向前和向后两个指针，所以在插入和删除指定位置的元素等操作时，需要有比普通链表多的操作。

### 3、循环链表

循环链表可以像普通链表一样只有单向引用，也可以像双向链表一样有双向引用。循环链表和链表之间唯一的区别在于，最后一个元素指向下一个元素的指针（tail.next）不是 null，而是指向第一个元素 head。
双向循环链表有指向 head 的 tail.next,也有指向 tail 的 head.prev。

## 5、集合

> 集合是由一组无序且唯一（即不能重复）的项组成。可以把集合想象成一个既没有重复元素，也没有顺序概念的数组。

### 1、创建集合

ES6 新增了 Set 类，我们可以基于 ES6 的 Set 开发我们的集合类

先熟悉一下 ES6 原生的 Set 类怎么用

```
let set = new Set();
set.add(1)
console.log(set.values()) // 输出@Iterator
console.log(set.has(1)) // 输出true
console.log(set.size) // 输出1

// 首先创建两个集合
let setA = new Set();
setA.add(1)
setA.add(2)
setA.add(3)

let setB = new Set();
setA.add(2)
setA.add(3)
setA.add(4)
```

### 2、集合的操作

1. **并集：** 对于给定的两个集合，返回一个包含两个集合中所有元素的新集合。

2. **交集：** 对于给定的两个集合，返回一个包含两个集合中共有元素的新集合。

3. **差集：** 对于给定的两个集合，返回一个包含所有存在于第一个集合且不存在于第二个集合的元素的新集合

4. **子集：** 验证一个给定的集合是否是另一集合的的子集。

> 并集，集合 A 和集合 B 的并集，表示为 `A∪B` ，该集合定义是： `A∪B = {x|x ∈ A∨x ∈ B}` 意思是 x 元素存在于 A 中，或者 x 存在于 B 中

```
// A、B两个集合并集代码实现如下
let unionAB = new Set();
for(let x of setA) {
    unionAB.add(x)
}
for (let x of setB) {
    unionAB.add(x)
}
```

> 交集 集合 A 和集合 B 的交集，表示为 `A∩B` ，该集合定义是： `A∩B = {x|x ∈ A∧x ∈ B}` 意思是 x 元素存在于 A 中，，且 x 存在于 B 中

```
// 模拟交集需要创建一个辅助函数

function intersection(A, B) {
    let intersectionSet = new Set();
    for (let x of A) {
        if (B.has(x)) {
            intersectionSet.add(x)
        }
    }
    return intersectionSet
}
let intersectionAB = intersection(setA, setB);
```

> 差集 集合 A 和集合 B 的差集，表示为 `A-B` ，该集合定义是： `A-B = {x|x ∈ A∧x ∉ B}` 意思是 x 元素存在于 A 中，，且 x 不存在于 B 中

```
function difference(A, B) {
    let differenceSet = new Set();
    for (let x of A) {
        if (!B.has(x)) {
            differenceSet.add(x)
        }
    }
    return differenceSet
}
let differenceAB = difference(setA, setB);
```

> 子集 集合 A 是集合 B 的子集，表示为 `A⊆B` ，该集合定义是： `∀x {x ∈ A→x ∈ B}` 意思是集合 A 中的每一个 x（元素），也需要存在于 B 中

```
// 这个返回值就不是新集合了,而是一个布尔值
function subSet(A, B) {
    if (A.size > B.size) {
        return false;
    }else {
        for(let x of A) {
            if(!B.has(x)) {
                return false;
            }
        }
        return true;
    }
}
let isSub = subSet(setA, setB);
```

## 6、字典和散列表

> 集合、字典和散列表可以存储不重复的值。在集合中，我们感兴趣的是每个值本身，并把它当做主要元素。在字典中，我们用`[键, 值]`的形式来存储数据。在散列表中也是一样，但这两种数据结构实现方式略有不同。

### 1、字典

> 集合表示一组互不相同的元素（不重复的元素）。在`字典`中存储的是`[键, 值]对`，其中键名用是来查询特定元素的。字典和集合很相似，集合以`[值, 值]`的形式存储元素，字典则是以`[键, 值]`的形式来存储元素。字典也成为`映射`。

ES6 的`Map`类的实现，就是我们所说的字典。

### 2、散列表

> `散列算法`的作用是尽可能快地在数据结构中找到一个值。在之前如果要在数据结构中获得一个值，需要遍历整个数据结构来找到它。如果使用散列函数，就知道值的具体位置，因此能够快速检索到该值。散列函数的作用是给定一个键值，然后返回值在表中的地址。

#### 2.1、创建散列表

我们来用最常见的散列函数-`lose lose` 散列函数来实现散列表，此方法最简单地将每个键值中的每个字母的 ASCII 值相加。

```
// 用最基本的方式实现HashTable类
function HashTable() {
    var table = [];

    // 先实现一个散列函数方法，它是HashTable类中的一个私有方法
    var loseloseHashCode = function (key) {
        var hash = 0;
        for(var i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i);
        }
        return hash % 37; // 减小hash的数值
    }

    // 向散列表增加一个新的项（也能更新散列表）
    this.put = function(key, value) {
        var position = loseloseHashCode(key);
        console.log(position + '--' + value)
        table[position] = value;
    }

    // 返回根据键值检索到的特定的值
    this.get = function(key) {
        return table[loseloseHashCode(key)];
    }

    // 根据键值从散列表中移除值
    this.remove = function(key) {
        table[loseloseHashCode(key)] = undefined;

    }
}

// 使用HashTable
var hash = new HashTable();
hash.put('fangxu','fangxu@email.com')
hash.put('wenting','wenting@email.com')
hash.put('yanqing','yanqing@email.com')
// 因为在put方法中我们打印了位置和值
// 20--fangxu@email.com
// 24--wenting@email.com
// 19--yanqing@email.com
console.log(hash.get('fangxu')) // fangxu@email.com
console.log(hash.get('yanqing')) // yanqing@email.com
hash.remove('yanqing')
console.log(hash.get('yanqing')) // undefined
```

#### 2.2、处理散列表中的冲突

> 有时候，一些键会有相同的散列值，不同的值在散列表中对应相同位置的时候，称之为冲突。

```
// 还是HashTable类
var hash = new HashTable();
hash.put('fangxu','fangxu@email.com')
hash.put('wenting','wenting@email.com')
hash.put('yanqing','yanqing@email.com')
hash.put('xufang', 'xufang@email.com')
hash.put('tingwen', 'tingwen@email.com')

// 20--fangxu@email.com
// 24--wenting@email.com
// 19--yanqing@email.com
// 20--xufang@email.com
// 24--tingwen@email.com
// 显而易见，上面的值重复了

// 为了看一下散列表里到底存了些什么，我们加入一个print实例方法
this.print = function() {
    for(var i = 0; i < table.length; i++) {
        if(table[i] !== undefined) {
            console.log(i + '--' + table[i])
        }
    }
}

hash.print()
// 19--yanqing@email.com
// 20--xufang@email.com
// 24--tingwen@email.com
// 以上可以看到发生冲突的数据被后面的数据给覆盖了
```

> 使用一个数据结构来保存数据的目的显然不是去丢失这些数据，而是通过魔种方法将它们全部保存起来。处理冲突的方法有：分离链接，线性探查和双散列法

#### 2.2.1、分离链接

分离链接法包括为散列表的每一个位置创建一个链表并将元素存储在里面。相当于每个散列表的位置存储的是一个链表。

#### 2.2.2、线性探查

当想向表中摸个位置加入一个新元素的时候，如果索引为 index 的位置已经被占据了，就尝试 index+1 的位置。如果 index+1 的位置也被占据了，就尝试 index+2 的位置，以此类推。

#### 2.3、创建更好的散列函数

> 上面的例子显示 `lose lose` 散列函数并不是一个表现良好的散列函数，因为他会产生太多的冲突。通常，一个表现良好的散列函数是由几个方面构成的：插入和检索的时间（即性能），还包括较低的冲突可能性。

**`djb2散列函数`**

```
// djb2散列函数
var djb2HashCode = function(key) {
    var hash = 5381;
    for(var i = 0; i < key.length; i++) {
        hash = hash * 33 + key.charCodeAt(i);
    }
    return hash % 1013;
}

// 在上面HashTable类中使用djb2散列函数执行上面的例子
// 159--wenting@email.com
// 291--xufang@email.com
// 360--tingwen@email.com
// 777--yanqing@email.com
// 944--fangxu@email.com
// 没有冲突！
```

上面的 djb2 散列函数的内部是，初始化了一个 hash 变量并赋值为一个质数（大多数实现都是 5381），然后迭代参数 key，奖 hash 与 33 想成（用来当做一个魔力数），并和当前迭代的字符的 ASCII 码值相加。最后使用相加的和与另一个随机质数（比我们认为的散列表的大小要大，在上面的例子中，我们认为散列表的大小为 1000）相除的余数。当然这并不是最好的散列函数，但这是最受社区推崇的散列函数之一。

## 7、树

树跟散列表一样，是非顺序数据结构，它对于存储需要快速查找的数据非常有用。树是一种分层数据的抽象模型，最典型的例子就是公司的组织架构图。

### 1、树的相关术语

一个树结构包含一系列存在父子关系的节点。每个节点都有一个父节点（除了顶部的第一个节点）以及零个或多个子节点。

位于树顶的节点叫作根节点，它没有父节点。

树中的每个元素都叫作节点，节点分为内部节点和外部节点。至少有一个子节点的节点称为内部节点。没有子元素的节点称为外部节点或叶节点。

一个节点可以有祖先和后代。一个节点（除了根节点）的祖先包括父节点、祖父节点、曾祖父节点等。一个节点的后代包括子节点、孙子节点、曾孙节点等。

子树：子树由节点和它的后代构成。

节点的一个属性是深度，节点的深度取决于它的祖父节点的数量。

树的高度取决于所有节点深度的最大值。一棵树可以被分解成层级。根节点在第 0 层，它的子节点在第一层，以此类推。

### 2、二叉树和二叉搜索树

> `二叉树：` 二叉树中的节点最多只能有两个子节点：一个是左侧子节点，另一个是右侧子节点。

> 二、`叉搜索树（BST）:` 它是二叉树的一种，但是它只允许你在左侧节点存储（比父节点）小的值，在右侧节点存储（比父节点）大或者等于的值。

### 3、创建 BST 类

```
// 构建BST类
function BinarySearchTree() {
 // 跟链表相似，也需要声明一个Node类来表示树中的节点，每个节点有两个指针， 一个指向左侧节点，一个指向右侧节点
 // 跟双向链表的区别是，双向链表的每个节点包含的两个指针，一个指向下一个节点，另一个指向上一个节点
 function Node(key) {
   // 键是树相关术语中对节点的称呼
   this.key = key;
   this.left = null;
   this.right = null;
 }

 // 树的根元素
 var root = null;

 // 向树中插入一个新的键
 this.insert = function (key) {
   var newNode = new Node(key);
   var insertNode = function (node, newNode) {
     if(newNode.key < node.key){
       if(node.left === null) {
         node.left = newNode;
       }else {
         insertNode(node.left, newNode)
       }
     }else {
       if (node.right === null) {
         node.right = newNode;
       } else {
         insertNode(node.right, newNode)
       }
     }
   }
   if(root === null) {
     root = newNode;
   }else {
     // 将节点插在一个非根节点的其他位置，需要一个私有的辅助函数
     insertNode(root, newNode)
   }
 }

 // 树的遍历有三种，中序，先序，后序
 // 中序遍历：一种以上行顺序访问BST所有节点的遍历方式，也就是以从小到大的顺序访问所有节点。
 this.inOrderTraverse = function (callback) {
   var inOrderTraverseNode = function (node, callback) {
     if(node !== null) {
       inOrderTraverseNode(node.left, callback)
       callback(node.key)
       inOrderTraverseNode(node.right, callback)
     }
   };
   inOrderTraverseNode(root, callback)
 }

 // 先序遍历：以优先于后代节点的顺序访问每个节点。
 this.preOrderTraverse = function (callback) {
   var preOrderTraverseNode = function (node, callback) {
     if(node !== null) {
       callback(node.key);
       preOrderTraverseNode(node.left, callback)
       preOrderTraverseNode(node.right, callback)
     }
   }
   preOrderTraverseNode(root, callback)
 }

 // 后序遍历： 后序遍历先访问节点的后代节点，再访问节点本身。
 this.postOrderTraverse = function (callback){
   var postOrderTraverseNode = function (node, callback){
     if(node !== null) {
       postOrderTraverseNode(node.left, callback)
       postOrderTraverseNode(node.right, callback)
       callback(node.key)
     }
   }
   postOrderTraverseNode(root, callback)
 }

 // 搜索最小值
 this.min = function () {
   var minNode = function(node){
     if(node){
       while(node && node.left !== null) {
         node = node.left;
       }
       return node.key;
     }
     return null;
   }
   return minNode(root);
 }

 // 搜索最大值
 this.max = function () {
   var maxNode = function(node) {
     if(node) {
       while(node && node.right !== null) {
         node = node.right;
       }
       return node.key;
     }
     return null;
   }
   return maxNode(root);
 }

 // 找一个特定的值，然后存在返回true，不存在返回false
 this.search = function (key) {
   var searchNode = function (node,key) {
     if(node === null) {
       return false;
     }
     if(key < node.key) {
       return searchNode(node.left, key)
     }else if(key > node.key) {
       return searchNode(node.right, key)
     }else {
       return true;
     }
   }
   return searchNode(root, key)
 }

 // 移除一个节点
 this.remove = function (key) {
   var removeNode = function (node, key) {
     if(node === null) {
       return null;
     }
     if(key < node.key) {
       node.left = removeNode(node.left, key);
       return node;
     }else if(key > node.key) {
       node.right = removeNode(node.right,key);
       return node;
     }else { // 键等于node.key
       // 第一种情况，一个叶节点
       if(node.left === null && node.right === null) {
         node = null;
         return node;
       }

       // 第二种情况，一个只有一个子节点的节点
       if(node.left === null) {
         node = node.right;
         return node;
       }
       if(node.right === null) {
         node = node.left;
         return node;
       }

       // 第三种情况,一个有两个子节点的节点（最难想的）

       function findMinNode(node) { //获取最小节点
         while(node && node.left !== null) {
           node = node.left;
         }
         return node;
       }
       // 找到需要移除的节点后，发现有左右两个子节点，那就去找右侧节点下面最小的节点，这个节点一定比要移除的那个节点左侧的节点大，比右侧的节点小（与右侧最小的相等）
       var aux = findMinNode(node.right);
       // 把右侧这个最小的节点的key赋值给要移除的节点，通过这一步，我们就改变了要移除节点的值，也就是说这个节点被移除了。
       node.key = aux.key;
       // 上一步造成了这个树中有两个拥有相同键的节点，这是不允许的，要继续把右侧子树中的最小节点移除，毕竟它已经被移至要移除的节点的位置了。
       node.right = removeNode(node.right, aux.key);
       // 最后，向它的父节点返回更新后节点的引用
       return node;
     }
   }
   root = removeNode(root, key)
 }
}


// 使用BST类
let tree = new BinarySearchTree();
tree.insert(11)
tree.insert(9)
tree.insert(15)
tree.insert(24)
tree.insert(7)
tree.insert(13)
tree.insert(3)
tree.insert(8)

tree.inOrderTraverse(function (value){
   console.log(value)
})
// 3,7,8,9,11,13,15,24

tree.preOrderTraverse(function (value) {
   console.log(value)
})
// 11,9,7,3,8,15,13,24

tree.postOrderTraverse(function (value){
   console.log(value)
})
// 3,8,7,9,13,24,15,11

let min = tree.min();
console.log(min) // 3

let max = tree.max();
console.log(max) // 24

console.log(tree.search(1)) //false 节点中没有1
console.log(tree.search(15)) //true 节点中有15

tree.remove(24);
tree.remove(7);
tree.inOrderTraverse(function (value){
   console.log(value)
})
// 3,8,9,11,13,15
```

## 8、图

> 图是网络结构的抽象模型，图是一组由 `边` 连接的 `节点(或顶点)`，任何二元关系都可以用图来表示。特别常见的例子就是社交网络，比如六度空间理论（最多通过六个人你就能够认识任何一个陌生人），脑海中出现了一张大网！

### 1、概念

一个图 `G = (V,E)` 由以下元素组成。
V: 一组顶点
E：一组边，连接 V 中的顶点

相邻顶点： 由一条边连接在一起的顶点成为相邻顶点。

度： 一个顶点的度指的是相邻顶点的数量。

路径： 路径是顶点 v1,v2,……,vk 的一个连续序列，其中 vi 和 vi+1 是相邻的。简单路径要求不包含重复的顶点。

如果图中不存在环，则称该图是无环的。如果图中每两个顶点间都存在路径，则该图是连通的。

### 2、图的表示

> 从数据结构的角度来说，我们有多种方式来表示图。图的正确表示法取决于待解决的问题和图的类型。

#### 1、邻接矩阵

图最常见的实现是邻接矩阵。每个节点都和一个整数相关联，该整数将作为数组的索引。我们用一个二维数组来表示定点之间的连接。如果索引为 i 的节点和索引为 j 的节点相邻，则 `array[i][j] === 1` ，否则 `array[i][j] === 0`。

#### 2、邻接表

邻接表由图中每个定点的相邻顶点列表所组成。

#### 3、关联矩阵

在关联矩阵中，矩阵的行表示顶点，列表示边。

### 4、创建 Graph 类（邻接表表示法）

```
function Graph() {
    let vertices = [],
        adjList = new Map();

    this.addVertex = function (v) {
        vertices.push(v)
        adjList.set(v, [])
    }

    this.addEdge = function (v,w) {
        adjList.get(v).push(w)
        adjList.get(w).push(v)
    }

    this.toString = function () {
        let s = '';
        for(var i = 0; i < vertices.length; i++) {
            s += vertices[i] + '->';
            let neighbors = adjList.get(vertices[i]);
            for(var j = 0; j < neighbors.length; j ++) {
                s += neighbors[j];
            }
            s += '\n'
        }
        return s;
    }
}

//使用Graph类
let graph = new Graph();
let myVertices = ['A','B','C','D','E'];
for(var i = 0; i < myVertices.length; i++){
    graph.addVertex(myVertices[i])
}
graph.addEdge('A','B')
graph.addEdge('A','C')
graph.addEdge('A','D')
graph.addEdge('C','D')
graph.addEdge('C','E')
graph.addEdge('B','E')
console.log(graph.toString())
打印结果：
A->BCD
B->AE
C->ADE
D->AC
E->CB
```

### 5、图的遍历

一般有两种算法可以对图进行遍历：广度优先搜索（BFS）和深度优先搜索（DFS）。图遍历可以用来寻找特定的顶点或寻找两个顶点之间的路径，检查图是否连通，检查图是否含有环等。
图遍历算法的思想是必须追踪每个第一次访问的节点，并且追踪有哪些节点还没有被完全探索。对于两种图遍历算法，都需要明确指出第一个被访问的顶点。
完全探索一个顶点要求我们查看该顶点的每一条边。对于每一条边所连接的没有被访问过的顶点，将其标注为被发现的，并将其加进待访问顶点列表中。
为了保证算法的效率，务必访问每个顶点至多两次。连通图中每条边和顶点都会被访问到。

> 广度优先搜索算法和深度优先搜索算法基本上是相同的，只有一点不同，那就是待访问顶点列表的数据结构。

| 算法         | 数据结构 | 描述                                                                 |
| ------------ | -------- | -------------------------------------------------------------------- |
| 深度优先搜索 | 栈       | 通过将顶点存入栈中，顶点是沿着路径被探索的，存在新的相邻顶点就去访问 |
| 广度优先搜索 | 队列     | 通过将顶点存入队列中，最先入队列的顶点先被探索                       |

两种算法之前，先确定标注已经访问过的顶点状态颜色。
|颜色|状态|
|--|--|
|白色|表示该节点没有被访问|
|灰色|表示该顶点被访问过，但并未被探索过|
|黑色|表示该顶点被访问过且被完全探索过|

#### <font color="#e6a920">1、广度优先搜索</font>

> 广度优先搜索算法会从指定的第一个顶点开始遍历图，先访问其所有的相邻点，就像一次访问图的一层。换句话说就是先宽后深地访问顶点。

广度优先搜索和深度优先搜索都需要标注被访问过的顶点，所以需要需要一个辅助数组 color，当算法开始执行时，所有的顶点颜色都是白色，所以我们创建了一个 initilizeColor 的辅助函数，为这两个算法执行初始化颜色的操作
1、bfs 方法接受一个顶点作为算法的起始点，将此顶点入队列。
2、如果队列非空，我们将通过出队列操作从队列中移除一个顶点，并取得一个包含其所有邻点的邻接表。该顶点江北标注为 grey，表示我们发现了这个顶点，但是还没有对它进行完全的探索。
3、对于邻接表里的每个顶点，得到他们的值，从颜色辅助数组中查看此顶点，如果是 white，表示从未被访问过，我们将它的颜色编程 grey，并将这个顶点加入队列中，这样就可以等待它从队列中出队列时，就可以对它进行完全探索。
4、当完成探索该点，并且访问了其相邻顶点后，就可以认定该点被彻底探索过了，颜色设置为 black。此后就可以执行回调函数，传入此点。

```
function Graph() {
……
//增加颜色初始化的方法
let initilizeColor = function () {
    let color = {};
    for(let i = 0; i < vertices.length; i++) {
        color[vertices[i]] = 'white';
    }
    return color;
}
//增加广度优先遍历方法
this.bfs = function (v, callback) {
    let color = initilizeColor(),
        queue = new Queue();
    queue.enqueue(v)
    while(!queue.isEmpty()) {
        let u = queue.dequeue(),
            neighbors = adjList.get(u);
        color[u] = 'grey';
        for(let i = 0; i < neighbors.length; i++) {
            let w = neighbors[i];
            if(color[w] === 'white') {
                color[w] = 'grey';
                queue.enqueue(w)
            }
        }
        color[u] = 'black';
        if(callback) {
            callback(u);
        }
    }
}

……
}

//使用广度优先遍历方法
graph.bfs(myVertices[0],function (v) {
    console.log('访问顶点'+v)
})
//打印
//访问顶点A
//访问顶点B
//访问顶点C
//访问顶点D
//访问顶点E

```

**以上是介绍的 BFS 算法的工作原理，还可以再继续深入，寻找两个顶点的的最短路径距离，和每个顶点的上一个顶点。**

```
this.BFS = function (v) {
    let color = initilizeColor(),
        queue = new Queue(),
        d = {},
        pred = {};
    queue.enqueue(v);
    for(let i = 0; i < vertices.length; i++) {
        d[vertices[i]] = 0;
        pred[vertices[i]] = null;
    }
    while(!queue.isEmpty()) {
        let u = queue.dequeue(),
            neighbors = adjList.get(u);
        color[u] = 'grey';
        for(let i = 0; i < neighbors.length; i++) {
            let w = neighbors[i];
            if(color[w] === 'white') {
                queue.enqueue(w);
                color[w] = 'grey';
                d[w] = d[u] + 1;
                pred[w] = u;
            }
        }
        color[u] = 'black';
    }
    return {
        distances: d,
        predecessors: pred
    }
}

//使用BFS方法
graph.BFS(myVertices[0])
//返回：{"distances":{"A":0,"B":1,"C":1,"D":1,"E":2},"predecessors":{"A":null,"B":"A","C":"A","D":"A","E":"B"}}
//即从A到B、C、D的距离是1，到E的距离是2

// 我们通过BFS方法获取到的前溯点数组，可以构建从顶点到其他的顶点的路径
let shortestPathA = graph.BFS(myVertices[0]);
let fromVertex = myVertices[0];
for(let i = 1; i < myVertices.length; i++) {
    let toVertex = myVertices[i];
    let path = new Stack();
    for(let v = toVertex; v !== fromVertex; v = shortestPathA.predecessors[v]) {
        path.push(v)
    }
    path.push(fromVertex)
    let s = path.pop();
    while(!path.isEmpty()) {
        s += ` - ${path.pop()}`;
    }
    console.log(s)
}
//输出
//A - B
//A - C
//A - D
//A - B - E

```

以上说的图不是加权图，如果要计算加权图中的最短路径（例如，城市 A 和城市 B 之间的最短路径——GPS 和 Google Maps 中用到的算法），广度优先搜索未必合适。

> 举例
> **Dijkstra 算法** 解决了单源最短路径问题。 **[1、Dijkstra 实现](http://www.zhiwenli.com/wordpress/?p=745)** **[2、理解 Dijkstra](http://www.bijishequ.com/detail/439838?p=)** > **Bellman-Ford 算法** 解决了边权值为负的单源最短路径问题。 **[Bellman-Ford 实现](https://segmentfault.com/a/1190000012691823)** **[理解 Bellman-Ford](https://my.oschina.net/qiaotoubao/blog/735890)** > **A\*搜索算法** 解决了求仅一对顶点间的最短路径问题，它用经验法则来加速搜索过程。 **[A\*搜索算法实现](https://my.oschina.net/parker/blog/711300)** > **Floyd-Warshall 算法** 解决了求所有顶点对间的最短路径这一问题。 **[理解 Floyd-Warshall 算法](https://my.oschina.net/qiaotoubao/blog/738646)**

#### <font color="#e6a920">2、深度优先搜索</font>

> 深度优先搜索算法将会从第一个指定的顶点开始遍历图，沿着路径直到这条路径最后一个顶点被访问了，接着原路回退并搜索下一条路径。

```
this.dfs = function (callback) {
    let dfsVisit = function (u, color, callback) {
        color[u] = 'grey';
        if(callback) {
            callback(u)
        }
        let neighbors = adjList.get(u);
        for(var i = 0; i < neighbors.length; i++) {
            let w = neighbors[i];
            if(color[w] === 'white') {
                dfsVisit(w, color, callback)
            }
        }
        color[u] = 'black';
    }
    let color = initilizeColor();
    for(let i = 0; i < vertices.length; i++) {
        if(color[vertices[i]] === 'white') {
            dfsVisit(vertices[i], color, callback)
        }
    }
}

// 在上面已经添加节点的后面执行

graph.dfs(function (v) {
    console.log('访问顶点'+v)
})
//打印
// 访问顶点A
// 访问顶点B
// 访问顶点E
// 访问顶点C
// 访问顶点D
```

上面展示了深度优先搜索算法的工作原理。我们也可以对于给定的图 G，我们通过深度优先搜索算法遍历图 G 的所有节点，构建“森林”（有跟树的一个集合）以及一组源顶点（根），并输出两个数组：发现时间和完成探索时间。

```
// 接上面例子

this.DFS = function () {
    let time = 0;
    let color = initilizeColor(),
    d = {},
    f = {},
    p = {};
    let DFSVisit = function (u,color,d,f,p) {
        console.log('discovered' + u)
        color[u] = 'grey';
        d[u] = ++time;
        let neighbors = adjList.get(u);
        for(let i = 0; i < neighbors.length; i++) {
            var w = neighbors[i];
            if(color[w] === 'white') {
                p[w] = u;
                DFSVisit(w,color,d,f,p)
            }
        }
        color[u] = 'black';
        f[u] = ++time;
        console.log('explored' + u)

    }
    for(let i = 0; i < vertices.length; i++) {
        f[vertices[i]] = 0;
        d[vertices[i]] = 0;
        p[vertices[i]] = null;
    }
    for(let i = 0; i < vertices.length; i++) {
        if(color[vertices[i]] === 'white') {
            DFSVisit(vertices[i],color,d,f,p)
        }
    }
    return {
        discovery: d,
        finished: f,
        perdecessors: p
    }
}

// 执行
console.log(graph.DFS())

// 其中有两个打印
//descoveredA、descoveredB、descoveredE、descoveredC、descoveredD
//exploredD、exploredC、exploredE、exploredB、exploredA
//返回值
{"discovery":{"A":1,"B":2,"C":4,"D":5,"E":3},"finished":{"A":10,"B":9,"C":7,"D":6,"E":8},"perdecessors":{"A":null,"B":"A","C":"E","D":"C","E":"B"}}
```
