




// 暴力计算思路:
// 以某个节点为开头的所有子序列: 
// 如 [a]，[a, b]，[ a, b, c] ... 再从以 b 为开头的子序列开始遍历 [b] [b, c]。

var maxSubArray = function (nums) {
    let resArr = []
    const number = nums.length
    //第一层循环  每次将nums剔除1项
    for (let k = 0; k < number; k++) {
        // 第二层和第三层用于计算所有子数组的和
        // (将每次计算的结果push到结果数组)
        for (let i = nums.length; i > 0; i--) {
            let res = 0
            for (let j = 0; j < i; j++) {
                res += nums[j]
            }
            resArr.push(res)
        }
        // 剔除nums一项
        nums.splice(0, 1)
    }
    // 从结果数组中取最大的一项返回
    let res = resArr.sort((n1,n2)=>{ return n2-n1 })
    return res[0]
};



maxSubArray([-2, 1, -2, 4])

// 贪心法
// 如果指针之前的项和小于=0  则舍弃前面的数列
// [-2, 1, -2, 4,-1,3]      因为4前面的和小于=0  扔掉得[4,-1,3]
// 再将4,-1,3依次求和  记录最大值  将相加结果与最大值做比较     
var maxSubArray1 = function(nums) {
    let pre = 0, maxAns = nums[0];
    nums.forEach((x) => {
        pre = Math.max(pre + x, x);
        maxAns = Math.max(maxAns, pre);
    });
    return maxAns;
};


// 使用Math.max取数组中的最大值
// 注意 max参数不能为数组,需要使用apply替换  Math.max(1,2,3,4)  // 4
let arr1 = [1,2,3,4]
let max = Math.max.apply(null,arr1)
console.log(max);