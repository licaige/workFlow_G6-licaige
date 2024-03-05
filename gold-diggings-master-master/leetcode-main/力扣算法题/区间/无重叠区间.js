// 无重叠区间

// 给定一个区间的集合 intervals ，其中 intervals[i] = [starti, endi] 。
// 返回 需要移除区间的最小数量，使剩余区间互不重叠 。

// 输入: intervals = [[1,2],[2,3],[3,4],[1,3]]
// 输出: 1
// 解释: 移除 [1,3] 后，剩下的区间没有重叠。


// 方案  根据start进行排序
// 上一个区间的end 需要小于等于下一个区间的start

var eraseOverlapIntervals = function (intervals) {

    let length = intervals.length
    if (length == 1) return 0

    // 我们这里按照区间末尾进行排序(而不是区间头部)
    // 这样可以保证区间的分布是线性的
    let sorted = intervals.sort((a, b) => a[1] - b[1])
    
    // 双指针 维护两个指针prev  cur  
    // 指向比较的前后两个区间
    const check = (sortedArr) => {
        let prev = 0
        let remove = 0
        for (let cur = 1; cur < length; cur++) {
            let c = sortedArr[cur][0]
            let p = sortedArr[prev][1]

            if (c >= p) {
                prev = cur  // 符合时,prev区间变为当前,继续下一轮比较
            }
            else if (c < p) {
                remove++    // prev不变  跳过当前区间  进行下轮比较
            }
        }

        return remove
    }

    let remove = check(sorted)
    
    return remove
};


let i = [[0, 2], [1, 3], [2, 4], [3, 5], [4, 6]]

eraseOverlapIntervals(i)