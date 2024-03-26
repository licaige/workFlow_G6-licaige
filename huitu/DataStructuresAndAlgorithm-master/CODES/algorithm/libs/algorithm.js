/*
 * @Author: Lee
 * @Date: 2023-07-03 11:14:48
 * @LastEditors: Lee
 * @LastEditTime: 2023-07-05 21:13:31
 * @Description:
 */
class Algorithm {
  /**
   * 冒泡排序
   * @param {*} arr 待排序数组
   */
  static bubbleSort(arr) {
    // 获取数组长度
    const length = arr.length;
    // 外层循环控制遍历次数（趟数）
    for (let i = 0; i < length - 1; i++) {
      // 内层循环进行比较和交换（次数）
      for (let j = 0; j < length - i - 1; j++) {
        // 如果当前元素比下一个元素大，则交换它们的位置
        if (arr[j] > arr[j + 1]) {
          // 使用解构赋值进行交换（当然你也可以使用空杯原理交换位置）
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }
    }
  }

  /**
   * 选择排序
   * @param {*} arr 待排序数组
   */
  static selectionSort(arr) {
    // 获取数组长度
    const length = arr.length;
    // 遍历未排序部分
    for (let i = 0; i < length - 1; i++) {
      let minIndex = i; // 假设当前元素是最小的
      // 在未排序部分中寻找最小元素的索引
      for (let j = i + 1; j < length; j++) {
        if (arr[j] < arr[minIndex]) {
          minIndex = j; // 更新最小元素的索引
        }
      }
      // 将最小元素与未排序部分的第一个元素进行交换
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }

  /**
   * 插入排序
   * @param {*} arr 待排序数组
   */
  static insertionSort(arr) {
    // 1. 获取数组的长度
    const length = arr.length;
    // 2. 外层循环：从第1个位置开始获取数据，向前面局部有序进行插入（遍历未排序部分）
    for (let i = 1; i < length; i++) {
      // 3. 内层循环：获取i位置的元素，和前面的数据依次进行比较
      let current = arr[i]; // 当前待插入元素
      let j = i; // 记录当前位置下标
      while (arr[j - 1] > current && j > 0) {
        arr[j] = arr[j - 1];
        j--;
      }

      // 4. 在j位置，放置current即可。
      arr[j] = current;
    }
  }

  /**
   * 希尔排序
   * @param {*} arr 待排序数组
   */
  static shellSort(arr) {
    // 1. 获取数组长度
    const length = arr.length;
    // 2. 初始化增量（数组长度的一半）
    let gap = Math.floor(length / 2);
    // 3. while循环（gap不断减小）
    while (gap > 0) {
      // 4. 以gap作为间隔，进行分组，对分组进行插入排序
      for (let i = gap; i < length; i++) {
        let temp = arr[i]; // 当前待插入元素
        let j = i; // 记录当前位置下标

        // 在已排序的元素序列中从后向前扫描，找到插入位置
        while (j >= gap && arr[j - gap] > temp) {
          arr[j] = arr[j - gap];
          j -= gap;
        }
        // 将新元素插入到合适的位置
        arr[j] = temp;
      }
      // 5. 缩小gap
      gap = Math.floor(gap / 2);
    }
  }

  /**
   * 快速排序
   * @param {*} arr
   * @param {*} left
   * @param {*} right
   */
  static quickSort(arr, left = 0, right = arr.length - 1) {
    // 当左指针大于等于右指针时，数组已经有序，无需继续排序
    if (left >= right) {
      return;
    }

    // 选择枢纽元素
    const pivotIndex = Math.floor((left + right) / 2);
    const pivot = arr[pivotIndex];

    // 将枢纽元素放到数组的最右边
    [arr[pivotIndex], arr[right]] = [arr[right], arr[pivotIndex]];

    // 使用双指针进行分区操作
    let i = left; // 左指针
    let j = right - 1; // 右指针

    while (i <= j) {
      // 左指针找到大于枢纽的元素
      while (i <= j && arr[i] <= pivot) {
        i++;
      }

      // 右指针找到小于枢纽的元素
      while (i <= j && arr[j] >= pivot) {
        j--;
      }

      // 交换左右指针找到的元素
      if (i < j) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }

    // 将枢纽元素放回正确的位置
    [arr[i], arr[right]] = [arr[right], arr[i]];

    // 对枢纽左边的子数组进行递归排序
    this.quickSort(arr, left, i - 1);

    // 对枢纽右边的子数组进行递归排序
    this.quickSort(arr, i + 1, right);
  }
}
