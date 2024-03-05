
// 136. 只出现一次的数字
// https://leetcode.cn/problems/single-number/?envType=study-plan-v2&id=top-interview-150
// 数组中  只有一个数字只出现一次  其他都出现两次
// 比如 [1,1,2,2,4]



// 方案一
// 对其进行异或运算 :
// (1⊕1)⊕(2⊕2)⊕4 = (0⊕0)⊕4 = 4
// 故最终结果就是只出现一个的数字

var singleNumber = function (nums) {
    let res = 0
    // 逐个做异或运算
    for (const num of nums) {
        res ^= num
    }
    return res
};
