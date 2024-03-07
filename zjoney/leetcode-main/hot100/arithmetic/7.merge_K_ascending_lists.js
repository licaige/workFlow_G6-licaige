/**
 * 考察：优先队列、分治
 * @difficulty 困难
 * @summary:23. 合并K个升序链表
 * 给你一个链表数组，每个链表都已经按升序排列。
 * 请你将所有链表合并到一个升序链表中，返回合并后的链表。
 * 
 * 示例 1：
 * 输入：lists = [[1,4,5],[1,3,4],[2,6]]
 * 输出：[1,1,2,3,4,4,5,6]
 * 解释：链表数组如下：
    [
      1->4->5,
      1->3->4,
      2->6
    ]
    将它们合并到一个有序链表中得到。
    1->1->2->3->4->4->5->6
 */
/**
 * 解题2：
 * 背景：排除面试情况，增加时间和空间复杂度要求，怎么算是最优解答
 * 最简单的：
 * 1.将List全部遍历一次并将每个结点的值放入arr，做一次sort排序，遍历一次arr并不断生成新的节点，然后通过Next连接起来。
 * 2.如果要合并四个有序链表，那么先将第一个和第二个合并，将合并后的结果跟第三个合并，再将合并后的结果跟第四个合并。
 * 最终面试走完流程，但不是很符合面试官的考的要求，所以采用归并算法，思路类似上面的第二种
 * 比如有 4 个链表，将 4 分成左右各 2 个，再将 2 个分成左右各 1 个，数量为 1 以后，再 return 回去左右各 1 个的合并排序结果
 * tips:即归并是从中间开始不断分为左右两部分，对左右两部分进行合并排序，而不是从第一个开始合并一直到最后一个
 * 
 * 查看图片images/merge_K_ascending_lists.jpg
 * 示例 1：

输入：lists = [[1,4,5],[1,3,4],[2,6]]
输出：[1,1,2,3,4,4,5,6]
解释：链表数组如下：
[
  1->4->5,
  1->3->4,
  2->6
]
将它们合并到一个有序链表中得到。
1->1->2->3->4->4->5->6

 */
var mergeKLists = function (lists) {
  if(!lists.length) return null; // lists为空，直接返回
  return mergeList(lists, 0, lists.length-1)
}

function mergeList(lists, start, end) {
  // 如果 start === end 说明分治的分到头了，只剩一个元素了，直接返回即可
  if (start === end) {
    return lists[start];
  }
  const mid = start + ((end - start) >> 1); // 找到中点，然后下面继续进行递归分割成左右两部分
  const leftList = mergeList(lists, start, mid);
  const rightList = mergeList(lists, mid + 1, end);
  return merge(leftList, rightList); // 进行合并
}
// 基本算法，合并两个有序链表
function merge(head1, head2) {
  let newHead = new ListNode(0), p = newHead;
  while (head1 && head2) {
    if (head1.val <= head2.val) {
      p.next = head1;
      head1 = head1.next;
    } else {
      p.next = head2;
      head2 = head2.next;
    }
    p = p.next
  }
  
  // 没遍历完，接上即可
  p.next = head1 ? head1 : head2
  return newHead.next;
}
// 方式一
// var mergeKLists = function(lists) {
//   function transform(l, arr) {
//       while(l) {
//           arr.push(l.val);
//           l = l.next;
//       }
//   }

//   let arr = [];
//   let res = new ListNode(null);

//   lists.map(item => transform(item, arr));
//   arr.sort((a, b) => a - b);
//   for (let i = arr.length - 1; i >= 0; i--) {
//       let temp = new ListNode(null);
//       res.val = arr[i];
//       temp.next = res;
//       res = temp;
//   }

//   return res.next;
// };
console.log(mergeKLists([[1, 4, 5], [1, 3, 4], [2, 6]])); // 1->1->2->3->4->4->5->6

