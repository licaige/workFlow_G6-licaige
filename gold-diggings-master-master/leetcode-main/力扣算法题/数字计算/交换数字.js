
// 面试题 16.01. 交换数字
// https://leetcode.cn/problems/swap-numbers-lcci/description/?envType=study-plan-v2&envId=cracking-the-coding-interview

// 详见notion笔记 


var swapNumbers = function(numbers) {
    numbers[0]=numbers[1]-numbers[0];
    numbers[1]=numbers[1]-numbers[0];
    numbers[0]=numbers[1]+numbers[0];
    return numbers
};
