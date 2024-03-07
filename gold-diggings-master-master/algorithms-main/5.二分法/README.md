## 二分法

### 1.什么是二分法？

>二分法也被称做二分查找，是通过每次折半的方法查找一个有序数组中需要查找的数。

### 2.二分法通过程序如何实现？

- 1.首先，设置两个变量，一个保存数组开头的值，一个保存数组结尾的值。

- 2.设置一个变量存中间值。

- 3.设置一个while循环，终止条件为开头值大于结尾值。

- 4.while循环里面比较需要查找的值和中间值的大小，如果查找值大于中间值，那么开始值等于中间值的下标+1，如果查找值小于中间值，那么结尾值等于中间值下标-1，等于就直接返回。

### 3.代码实现

```JavaScript
function binarySearch(value, array) {
    let startValue = 0;
    let endValue = array.length - 1;
    while (startValue <= endValue) {
        let midValue = parseInt((startValue + endValue) / 2);
        if (value < array[midValue]) {
            endValue = midValue - 1;
        } else if (value > array[midValue]) {
            startValue = midValue + 1;
        } else {
            return midValue;
        }
    }
    return -1
}
```