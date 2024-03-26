/*
 * @Description:
 * @Author: Li-HONGYAO
 * @Date: 2020-12-21 15:51:11
 * @LastEditTime: 2023-07-05 18:34:41
 */

/**
 * 求1 ~ n 的和，使用「高斯求和」算法
 * 高斯求和公式：(首项 + 末项) * 项数 / 2
 * 时间复杂度：O(1)
 * @param {*} n
 */
function sum(n) {
  var sum = ((1 + n) * n) / 2;
  console.log('sum = ', sum);
}
sum(10);

/**
 * 求n!
 * 由于递归每次调用函数都会创建内存执行函数，所以相对于递归求阶乘，此法性能更加。
 * 时间复杂度：O(n)
 * @param {*} n
 */
function factorial(n) {
  let res = 1;
  for (let i = 1; i <= n; i++) {
    res *= i;
  }
  console.log(`${n}! = ${res}`);
}
factorial(3);
