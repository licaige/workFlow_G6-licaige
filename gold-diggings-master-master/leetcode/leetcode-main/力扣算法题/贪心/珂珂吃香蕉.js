// 875. 爱吃香蕉的珂珂

// 首先可得 速度>=平均值


var minEatingSpeed = function (piles, h) {
    // 计算出二分的上下限值  最小为平均值(最小需要的速度)
    let low = Math.ceil(piles.reduce((prev, cur) => prev + cur) / h)

    let high = 0;
    for (const pile of piles) {
        high = Math.max(high, pile);
    }


    // 从avg处开始计算
    // k最小为avg  最大为最大香蕉堆的数量
    //todo  k满足在avg-2avg之间  满足二分查找条件  (进行二分查找会快很多)
    let res = low
    for (let k = low; k <= high; k++) {

        let time = 0
        for (const pile of piles) {
            const curTime = Math.floor((pile + k - 1) / k);
            time += curTime;

        }

        // 取最大的时间
        if (time <= h) {
            res = k
            break
        }
    }

    return res
};

// 
minEatingSpeed([30, 11, 23, 4, 20], 5)