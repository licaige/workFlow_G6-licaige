// https://leetcode.cn/leetbook/read/illustration-of-algorithm/o58jfs/
// 归并排序应用


// 归并排序
// 对数组进行二分划分  不断划分成多个子数组 进行排序

// 完成整个归并排序, 期间即可统计数字位置不同

var reversePairs = function (nums) {

    function mergeSort(nums) {
        if (nums.length < 2) return nums;
        const mid = parseInt(nums.length / 2);
        let left = nums.slice(0, mid);
        let right = nums.slice(mid);
        return merge(mergeSort(left), mergeSort(right));
    }

    function merge(left, right) {
        let res = [];
        let leftLen = left.length;
        let rightLen = right.length;
        let len = leftLen + rightLen;

        // 当结果数组长度为预计数组长度时结束
        for (let index = 0, i = 0, j = 0; index < len; index++) {
            if (i >= leftLen) {
                res[index] = right[j++]
            }

            else if (j >= rightLen) {
                res[index] = left[i++];
            }

            else if (left[i] <= right[j]) {
                res[index] = left[i++];
            }

            else {
                res[index] = right[j++];
                sum += leftLen - i;//在归并排序中唯一加的一行代码
            }
        }
        return res;
    }


    // 归并排序
    let sum = 0;
    mergeSort(nums);
    return sum;
};
