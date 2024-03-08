/**
 * 数组中第K个最大元素HOT
 * https://leetcode.cn/problems/kth-largest-element-in-an-array/description/
 * @param {*} nums
 * @param {*} k
 * @returns
 */
var findKthLargest = function(nums, k) {
  const swap = (arr, i, j) => {
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  };
  const partition = (arr, l, r) => {
    // 设最后一个元素为分区元素
    const pivot = arr[r];
    // 记录分区点的索引
    let i = l;
    // 注意去掉分区元素，所以j应该小于len-1
    for (let j = l; j < arr.length - 1; j++) {
      // 把所有小于pivot的元素移动到其左边
      if (arr[j] < pivot) {
        swap(arr, i, j);
        // 有元素小于pivot，说明其左边存在小于pivot的元素，分区点需要往右边移动
        i++;
      }
    }
    // 遍历完所有元素之后，把pivot移动到分区索引的位置
    // 这样在分区元素的左边都是小于分区元素的元素，右边则是大于分区元素的元素
    swap(arr, i, r);
    return i;
  };
  const quickSort = (arr, l, r) => {
      if (l >= r) return;
      // 找到分区点的索引
      const q = partition(arr, l, r);
      quickSort(arr, l, q - 1);
      quickSort(arr, q + 1, r);
  };
  const n = nums.length;
  quickSort(nums, 0, n - 1);
  return nums[n - k];
}

const nums = [3,2,1,5,6,4];
console.log(findKthLargest(nums, 2));
