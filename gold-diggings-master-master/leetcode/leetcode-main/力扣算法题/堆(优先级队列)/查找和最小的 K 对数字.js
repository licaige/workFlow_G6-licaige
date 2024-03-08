// 查找和最小的 K 对数字
// https://leetcode.cn/problems/find-k-pairs-with-smallest-sums/description/


// 输入: nums1 = [1, 7, 11], nums2 = [2, 4, 6], k = 3
// 输出: [1, 2], [1, 4], [1, 6]
// 解释: 返回序列中的前 3 对数：
// [1, 2], [1, 4], [1, 6], [7, 2], [7, 4], [11, 2], [7, 6], [11, 4], [11, 6]


// 设两个数组为 a b
// 需穷举的集合为: 四维度矩阵
// 矩阵从左到右递增 ， 上到下递增

// (a0+b0) (a0+b1) (a0+b2) (a0+b3)    // 数组1
// (a1+b0) (a1+b1) (a1+b2) (a1+b3)    // 数组2
// (a2+b0) (a2+b1) (a2+b2) (a2+b3)    // 数组3
// (a3+b0) (a3+b1) (a3+b2) (a3+b3)    // 数组4

// 那么此时我们可以用  多路归并思想  最终得到的数组是四个数组的合 


// 先把所有的 nums1 的索引入队，即入队的元素有 [0, 0]、[1, 0]、[2, 0]、[3, 0]、......
// 首次弹出的肯定是 [0, 0]，再把 [0, 1] 入队；这样就可以通过优先级队列比较 [0, 1] 和 [1, 0] 的结果，再弹出较小者；
// 然后入队 [0, 2],  [0, 3] ...

// 优先队列
var kSmallestPairs = function (nums1, nums2, k) {
    const res = [];
    const pq = new MinPriorityQueue({ compare: (a, b) => nums1[a[0]] + nums2[a[1]] - (nums1[b[0]] + nums2[b[1]]) });

    // 所有的 nums1 的索引入队:  [0, 0]、[1, 0]、[2, 0]、[3, 0]
    for (let i = 0; i < nums1.length; i++) pq.enqueue([i, 0]);


    while (res.length < k && pq.size()) {
        // 弹出队顶最小项 第一次为[0，0]
        let [i, j] = pq.dequeue();
        // 遍历nums2 生成[0，1][0，2][0，3]
        for (; res.length < k && j < nums2.length; j++) {
            // 比较弹出的项[0，0]和[0，1]  [0，0]小 插入[0，1]
            // 比较弹出的项[0，0]和[0，1]  [0，0]小 插入[0，2]
            // 比较弹出的项[0，0]和[0，1]  [0，0]小 插入[0，3]
            // ...
            const [i1, j1] = pq.front() || [];
            if (pq.size() && nums1[i1] + nums2[j1] < nums1[i] + nums2[j]) {
                pq.enqueue([i, j]);
                break;
            }


            // 如果生成的项小 则推入结果
            res.push([nums1[i], nums2[j]]);
        }
    }

    return res;
};


//! 力扣已经封装好了MinPriorityQueue合MaxPriorityQueue
// 小顶堆和大顶堆  (也就是最小优先队列和最大优先队列)

class MinPriorityQueue {

    constructor() { }// ：构造函数，创建一个空队列。

    enqueue(element, priority) { }//：将元素加入到队列中，并指定其优先级。较高优先级在队列头部。

    dequeue() { }//：删除并返回队首元素（即具有最高优先级的元素）。如果当前没有任何项则返回 null。

    peek() { }//：返回队列顶部(即具有最高优先级) 的项。
    front() { }//：返回队列顶部(即具有最高优先级) 的项。(同peek函数)

    isEmpty() { }//：判断是否存在待排除项目

    size() { }//：获取当前未排序列表长度
}

class MaxPriorityQueue { }




let nums1 = [1, 7, 11], nums2 = [2, 4, 6], k = 3
console.log(kSmallestPairs(nums1, nums2, k));