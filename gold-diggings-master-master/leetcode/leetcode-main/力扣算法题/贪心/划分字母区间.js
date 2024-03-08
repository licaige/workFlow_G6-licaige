// 划分字母区间

// https://leetcode.cn/problems/partition-labels/description/?envType=study-plan-v2&envId=top-100-liked
// 典型的贪心算法应用 
// 贪心算法:  通过找到部分最优解  逐渐拓展最优解  直到找到全局最优解


// 方案  首先获得每个字母出现的最后一个位置
// 双指针记录start和end
// 持续往后扫描  因为end处的字母最后一位一定在这一段内 
// 故每次扫描 end = Max(last,end) 

var partitionLabels = function (s) {
    const litters =
        ["a", "b", "c", "d", "e",
            "f", "g", "h", "i", "j",
            "k", "l", "m", "n", "o",
            "p", "q", "r", "s", "t",
            "u", "v", "w", "x", "y", "z"];

    const last = {}


    litters.forEach(l => {
        let idx = s.lastIndexOf(l)
        if (idx != -1) {
            last[l] = idx
        }
    })
    
    let start = 0
    let end = 0
    let res = []
    for (let i = 0; i < s.length; i++) {
        const lastIdx = last[s[i]]
        // 更新end
        end = Math.max(lastIdx, end)
        // 如果能顺利走到end  则截取这一段
        if (i == end) {
            res.push(end - start + 1)
            start = end + 1
        }
    }

    return res
}


partitionLabels("caedbdedda")