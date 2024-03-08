

// 丑数2
// https://leetcode.cn/problems/ugly-number-ii/

var nthUglyNumber = function (n) {
    // 小根堆BFS遍历  记录丑数数量
    if (n == 1) return 1

    const queue = [1]
    const numSet = new Set()
    numSet.add(1)
    // 得到第n个丑数需要执行n此循环
    // 每次都会往队列添加三个数
    for (let i = 0; i < n; i++) {
        const x = queue[i]

        let a = 2 * x
        let b = 3 * x
        let c = 5 * x

        if (!numSet.has(a)) {
            queue.push(a)
            numSet.add(a)
        }
        if (!numSet.has(b)) {
            queue.push(b)
            numSet.add(b)
        }
        if (!numSet.has(c)) {
            queue.push(c)
            numSet.add(c)
        }
        // 需要将列表排序,生成下一个x，(这里封装最小堆更快)
        queue.sort((a, b) => a - b)

    }

    return queue[n - 1]
};


// 多路归并
// https://mp.weixin.qq.com/s?__biz=MzU4NDE3MTEyMA==&mid=2247490029&idx=1&sn=bba9ddff88d247db310406ee418d5a15&chksm=fd9cb2f2caeb3be4b1f84962677337dcb5884374e5b6b80340834eaff79298d11151da2dd5f7&token=252055586&lang=zh_CN#rd
// arr = [1,2,3,4,5,6,8,9,10,12...] 
// [n*2] [n*3] [n*5] 组合


//   n2数组: [2,4,6,8,10,12]

//   n3数组: [3,6,9,12]

//   n5数组: [5,10,15]

// 三个指针一开始都在1位置, 每次从三个数中找到最小的值,然后对应指针迁移

var nthUglyNumber2 = function (n) {

    let arr = [1] // 丑数数组

    // 准备三个数组
    // i2、i3 和 i5 分别代表三个有序序列当前使用到哪一位「已有丑数」下标（起始都指向 1）
    let i2 = 0
    let i3 = 0
    let i5 = 0

    for (let i = 0; i < n; i++) {

        // 三个指针一开始都指向第0位
        let a = arr[i2] * 2
        let b = arr[i3] * 3
        let c = arr[i5] * 5

        // 找到最小的那一个,即下一个丑数,对应数组index++
        let min = Math.min(a, b, c)

        // 由于有重复的可能,不能用else,比如6时,i2,i3指针都需要前进
        if (min == a) i2++
        if (min == b) i3++
        if (min == c) i5++

        arr.push(min)
    }

    return arr[n - 1]
}

console.log(nthUglyNumber(4));