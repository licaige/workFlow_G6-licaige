function quickSort(arr) {
  function sort(left, right) {
    if (right <= left) {
      return;
    }
    const temp = left;
    const last = right;

    // 条件一定不能包含等于，会死循环
    while (right >= left) {
      while (arr[left] <= arr[temp] && left <= right) {
        left++;
      }
      while (arr[right] >= arr[temp] && left <= right) {
        right--;
      }
      if (left < right) {
        swap(left, right);
      }
    }

    // 每一次一定要交换 临界值，确保临界值左边都比他小，临界值右边都比他大
    swap(temp, right);
    sort(temp, right - 1);
    sort(right + 1, last);
  }

  const swap = (i, j) => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  };

  sort(0, arr.length - 1);
}

const arr = [4, 3, 6, 1];

quickSort(arr);
console.log(arr, '2222');
