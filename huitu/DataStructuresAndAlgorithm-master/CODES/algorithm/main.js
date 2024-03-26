/*
 * @Author: Lee
 * @Date: 2023-07-03 11:14:32
 * @LastEditors: Lee
 * @LastEditTime: 2023-07-05 18:35:49
 * @Description:
 */

// 1. 验证冒泡排序
const a1 = [1, 3, 2, 8, 6, 5, 7, 4];
Algorithm.bubbleSort(a1);
console.log('冒泡排序：', a1);

// 2. 验证选择排序
const a2 = [1, 3, 2, 8, 6, 5, 7, 4];
Algorithm.selectionSort(a2);
console.log('选择排序：', a2);

// 3. 验证插入排序
const a3 = [1, 3, 2, 8, 6, 5, 7, 4];
Algorithm.insertionSort(a3);
console.log('插入排序：', a3);

// 4. 验证希尔排序
const a4 = [1, 3, 2, 8, 6, 5, 7, 4];
Algorithm.shellSort(a4);
console.log('希尔排序：', a4);

// 5. 验证快速排序
const a5 = [1, 3, 2, 8, 6, 5, 7, 4];
Algorithm.quickSort(a5);
console.log('快速排序：', a5);
