// 数组总和 


// 输入: k = 3, n = 7
// 输出: [[1,2,4]]
// 解释:
// 1 + 2 + 4 = 7
// 没有其他符合的组合了。


// 比如  穷举  1 2 3 4 5 6 7 8 9  选择1
//              2 3 4 5 6 7 8 9  (选择3时)
//           下一个从4 5 6 7 8 9里选

// 找到k个数字   总和为n (只能使用1-9  每个数字只能用一次)
var combinationSum3 = function (k, n) {
    // 回溯搜索
    let res = []

    const deep = (sum, nums, used) => {
        if (used.length > k) return

        for (let i = 0; i < nums.length; i++) {
            let newSum = sum + nums[i]
            let newUsed = used + nums[i]

            if (newSum > n) break

            if (newSum == n && newUsed.length == k) {
                res.push(newUsed)
                break
            }
            // 选取一个数字后   从后面的数字开始选择(多指针思想)
            let newNums = [...nums].slice(i + 1)
            deep(newSum, newNums, newUsed)
        }
    }


    // 回溯优化  删除多余遍历的节点
    let originArr = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    for (let i = 0; i <= 9 - k; i++) {
        let startNum = originArr[i]
        let targetArr = [...originArr].slice(i + 1)
        deep(startNum, targetArr, startNum.toString())
    }

    return res.map(r => r.split(""))

};


console.log(combinationSum3(3, 7));