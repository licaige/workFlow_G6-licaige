
/**
 * 排序。合并两个数组
 * @param {*} nums1 
 * @param {*} m 
 * @param {*} nums2 
 * @param {*} n 
 */
function merge(nums1, m, nums2, n) {
  let i = m - 1;  //定义一个指针i指向数组1的尾元素
  let j = n - 1;  //定义一个指针j指向数组2的尾元素
  let tail = m + n - 1;  //定义一个指针tail指向数组1加上空位0后的尾元素
  let temp;  //用来存放临时的变量
  
  while(j >= 0) { //只要数组2中还有元素，就继续循环，数组2中没元素了，说明元素都转移完毕了
      //第一种情况，数组1遍历完了（或数组1本来就是空），数组2中还有元素
      if(i == -1) {
          //把数组2中的尾元素加进数组1中，然后继续判断下一轮循环
          temp = nums2[j];
          j--;
      } 
      //第二种情况，比较时发现数组2的尾元素更大
      else if(nums1[i] <= nums2[j]) {
          //那么就放到num1加上空位后的大尾部，同时指针j向前移动
          temp = nums2[j];
          j--;
      } 
      //第二种情况，比较时发现数组1的尾元素更大
      else {
          //那么就放到num1加上空位后的大尾部，同时指针i向前移动
          temp = nums1[i];
          i--;
      }
      //这是放到大尾部的代码，因为每个部分都要有这一步，所以可以抽取出来
      nums1[tail] = temp;
      tail--;
  }
  console.log(nums1)
}
const nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
merge(nums1, m, nums2, n)