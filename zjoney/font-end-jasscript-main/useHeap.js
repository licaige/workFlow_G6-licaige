const {
  push,
  pop,
  peek
} = require('./ScheduleMinHeap.js')
let heap = [];
push(heap, { sortIndex: 1 });
push(heap, { sortIndex: 2 });
push(heap, { sortIndex: 3 });
console.log(peek(heap)); // 1
push(heap, { sortIndex: 4 });
push(heap, { sortIndex: 5 });
push(heap, { sortIndex: 6 });
push(heap, { sortIndex: 7 });
console.log(peek(heap));// 1
pop(heap)
console.log(peek(heap)); // 2
