// 最大子序列的分数

var maxScore = function (nums1, nums2, k) {
    // 首先对num1  num2进行排序
    const queue = new CustomPriorityQueue((a, b) => a < b);

    const n = nums1.length;
    const indexes = [...new Array(n).keys()];
    // index为排序后nums1对应的下标
    indexes.sort((a, b) => nums2[b] - nums2[a]);

    // 从nums1中抽取前k个数入队 (按nums2顺序)

    let sum = 0;
    for (let i = 0; i < k; i++) {
        const idx = indexes[i];
        sum += nums1[idx];
        queue.insert(nums1[idx]);
    }

    // 计算第一次的结果 
    let ans = nums2[indexes[[k - 1]]] * sum;


    // 枚举nums2最小值  
    for (let i = k; i < n; i++) {
        const idx = indexes[i];
        const min = nums2[idx];
        const x = nums1[idx];
        queue.insert(x);  // nums1入队

        // 重新计算sum  加上x值  减去最小的一个值  
        sum += x;
        sum -= queue.deq();
        // 重新计算结果
        ans = Math.max(ans, sum * min);
    }

    return ans;
};


// 首先对num1  num2  按照num2的顺序倒序排序
// 2 3 1 3
// 4 3 2 1

// 枚举num2  依次作为最小值
// 4时  对应num1 只能在下标<=0时选 则这个跳过
// 3时同理 跳过
// 2时  对应num1 只能在下标<=1里选 只能选2 3 1
// 1时  可从2 3 1 3中选出三个数


// 对于1时  问题就转换为了  :从n个数字中 选出k个数  使其合最大

// 可以利用优先队列  遍历数组  依次将其排序差入队列  





/**
 * JS优先队列实现
 */

class CustomPriorityQueue {
    constructor(comparator) {
        this.comparator = comparator;
        this.heap = [-1];
    }
    insert(x) {
        this.heap.push(x);
        this.swim(this.heap.length - 1);
    }
    swim(i) {
        const { parent } = this;
        while (parent(i) > 0 && this.compare(i, parent(i))) {
            this.swap(i, parent(i));
            i = parent(i);
        }
    }
    deq() {
        this.swap(1, this.heap.length - 1);
        const t = this.heap.pop();
        this.sink(1);
        return t;
    }
    sink(i) {
        const { left, right, heap } = this;
        const n = heap.length;
        while (left(i) < n) {
            let temp = i;
            if (this.compare(left(i), temp)) temp = left(i);
            if (right(i) < n && this.compare(right(i), temp)) temp = right(i);
            if (temp === i) break;
            this.swap(i, temp);
            i = temp;
        }
    }
    compare(i, j) {
        return this.comparator(this.heap[i], this.heap[j]);
    }
    swap(i, j) {
        const { heap } = this;
        [heap[i], heap[j]] = [heap[j], heap[i]];
    }
    left(i) {
        return i * 2;
    }
    right(i) {
        return i * 2 + 1;
    }
    parent(i) {
        return i >> 1;
    }
}