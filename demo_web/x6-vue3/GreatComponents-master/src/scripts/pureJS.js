/**
 * 发布订阅模式
 * 
*/
let obj = {}
// 订阅
function on (id, f) {
    if (!obj[id]) {
        obj[id] = []
    }
    obj[id].push(f)
}
// 发布
function emit (id, msg) {
    obj[id].forEach(f => f(msg))
}
// 先订阅再发布
on('老张', (msg) => {new Date().getHours() == 12 && console.log('我在吃饭',msg)})
on('老张', (msg) => {new Date().getHours() !== 12 && console.log('我没吃饭',msg)})
emit('老张', '老李')
/**---------------------------发布订阅模式-------------------------------*/

/**
 * 发布订阅模式2
 * 
*/
let obj2 = {}
obj2.list = []
// 增加订阅者
obj2.on = function (id, f) {
    if (!this.list[id]) {
        this.list[id] = []
    }
    this.list[id].push(f)
}
// 发布信息
obj2.emit = function () {
    let id = Array.prototype.shift.call(arguments)
    let fns = this.list[id]
    if (!fns || fns.length == 0) return
    for (let i = 0, fn; fn = fns[i++];) {
        fn.apply(this, arguments)
    }
}
// 先订阅再发布
obj2.on('red', (size) => {
    console.log(`小红订阅的尺码是${size}`)
})
obj2.on('black', (size) => {
    console.log(`小明订阅的尺码是${size}`)
})
obj2.emit('red', 37)
obj2.emit('black', 42)
/**---------------------------发布订阅模式2-------------------------------*/

/**---------------------------call,apply--------------------------------*/
/**
 *  call应用场景
 * 1，原型链继承
 * 2，判断数据类型
 * 3，伪数组转数组   Array.property.slice.call(obj)
*/
Function.prototype.myCall = function (context) {
    if (typeof this !== 'function') throw new Error('error')
    context = context || window
    var args = [...arguments].slice(1)
    context.fn = this
    var result = context.fn(args)
    delete context.fn
    return result
}

Function.prototype.myApply = function (context, args) {
    if (typeof this !== 'function') throw new Error('error')
    if (!Array.isArray(args)) {
        args = []
    }
    context = context || window
    context.fn = this
    var result = context.fn(...args)
    delete context.fn
    return result
}
/**---------------------------call,apply--------------------------------*/

/**--------------------------快速排序-----------------------------------*/
/**
 * 1. 将数组第一个元素作为p，其后所有元素和p对比
 * 2. 比p小的移到p后index=0位，index++
 * 3. 比较完成后，将p和index-1交换位置
 * 4. 数组被分为左子序列和右子序列，分别快排
 * 5. 直到left >= right，完成排序
 * 
 * 时间复杂度：
 *  最优情况：nlog₂n
 *  最坏情况：n²
*/

function quickSort (arr, left, right) {
    left = typeof left !== 'number' ? 0 : left
    right = typeof right !== 'number' ? arr.length - 1 : right
    if (left < right) {
        let p = left
        let index = p + 1
        for (let i = index; i <= right; i++) {
            if (arr[p] > arr[i]) {
                swap(arr, index, i)
                index++
            }
        }
        swap(arr, p, index - 1)
        quickSort(arr, left, index - 2)
        quickSort(arr, index, right)
    }
}

function swap (arr, i, j) {
    let k = arr[i]
    arr[i] = arr[j]
    arr[j] = k
}

/**--------------------------快速排序-----------------------------------*/