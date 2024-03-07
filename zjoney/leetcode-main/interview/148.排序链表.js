
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var sortList = function(head) {
  if(!head){
    return null
  }
  let arr = []
  while(head){
    let tmp = head.next
    head.next = null
    arr.push(head)
    head = tmp
  }
  arr.sort((a,b)=>a.val-b.val)
  for(let i=0;i<arr.length-1;i++){
    arr[i].next = arr[i+1]
  }
  return arr[0]
};