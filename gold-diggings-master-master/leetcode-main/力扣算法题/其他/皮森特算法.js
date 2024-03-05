
// 皮森特算法（Peterson's algorithm）是一种解决进程互斥问题的经典算法之一，由计算机科学家 Gary L. Peterson 在 1981 年提出。

// 该算法主要应用于两个进程的情况下，实现它们在临界区互斥访问共享资源。 算法中基于了以下假设：

// 进程执行速度快于系统切换时间
// 每个进程都可以非阻塞地尝试获取锁


// 一个简化版本的皮森特算法如下所示：



// 在这个 JavaScript 版本中，两个进程被用 0 和 1 表示，并且算法通过一系列开关变量来确保只有一个进程能够访问其临界区。

let flag = [false, false];  // 数组保存的是  是否"想要"获取锁
let turn = 0;               // 初始权力归进程 0 所有(开关变量)

function process(i) {
    while (true) {
        // 进入临界区前的操作
        // 进程希望访问资源时，首先必须把对应位置flag设置成为“想要”拥有这个锁
        flag[i] = true;
        // 切换进程拥有权
        turn = 1 - i;

        // 对方正在使用该共享资源或轮到对方使用，则等待释放并交替
        while (flag[1 - i] && turn == (1 - i)) {
            console.log("Process", i, "is waiting.");
        }

        // 在临界区内进行操作
        console.log("Process", i, "is in a critical section.")

        // 结束后将标志位重置为可获得状态。
        flag[i] = false;
    }
}

process(0);   // 开始第一个进程