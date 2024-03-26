/*
 * @Author: Lee
 * @Date: 2021-07-30 16:47:28
 * @LastEditors: Lee
 * @LastEditTime: 2023-07-01 22:22:56
 */

import { Stack } from './libs/stack/index.js';
import { Queue, PriorityQueue } from './libs/queue/index.js';
import { LinkedList, DoubleLinkedList } from './libs/linked_list/index.js';
import { Set } from './libs/set/index.js';
import { HashTable } from './libs/hash_table/index.js';
import { BinarySearchTree } from './libs/binary_search_tree/index.js';

// 栈
console.log('-----------------------------------------------');
console.log('01. 【栈】');
console.log('-----------------------------------------------');
const stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);
stack.push(4);
stack.push(5);
console.log(stack.items);
console.log(stack.pop());
console.log(stack.pop());
console.log(stack.items);
console.log(stack.peek());
console.log(stack.isEmpty());
console.log(stack.size());

// eg：栈结构实现10进制转二进制
function dec2bin(num) {
  // 1. 创建Stack
  const stack = new Stack();
  // 2. 循环取余数
  while (num > 0) {
    let remainder = num % 2;
    num = Math.floor(num / 2);
    stack.push(remainder);
  }
  // 3. 拼接字符串
  let binString = '';
  while (!stack.isEmpty()) {
    binString += stack.pop();
  }
  return binString;
}
console.log(dec2bin(10)); // 1010
console.log(dec2bin(100)); // 1100100
console.log(dec2bin(1000)); // 1111101000

console.log('-----------------------------------------------');
console.log('02. 【队列】');
console.log('-----------------------------------------------');

const queue = new Queue();
queue.enqueue('A');
queue.enqueue('B');
queue.enqueue('C');
queue.enqueue('D');
console.log(queue.items);
console.log(queue.dequeue());
console.log(queue.items);
console.log(queue.front());
console.log(queue.size());

// 面试题：击鼓传花
function passGame(nameList, num) {
  // 1. 创建一个对垒
  const queue = new Queue();

  // 2. 将 nameList 里面的每一个元素一次加入到队列中
  for (const name of nameList) {
    queue.enqueue(name);
  }

  // 3. 开始数数：队列中只剩下 1 个元素时就停止数数
  while (queue.size() > 1) {
    // 不是 num 时，重新加入到队列的末尾
    // 是 num 时，将其删除
    for (let i = 0; i < num - 1; i++) {
      queue.enqueue(queue.dequeue());
    }
    // num 对应这个人，直接从队列中删除
    queue.dequeue();
  }

  // 4. 获取剩下的那个人
  return queue.front();
}

console.log(`击鼓传花：`, passGame(['A', 'B', 'C', 'D', 'E'], 3));

console.log('-----------------------------------------------');
console.log('03. 【优先级队列】');
console.log('-----------------------------------------------');

const priorityQueue = new PriorityQueue();
priorityQueue.enqueue('李鸿耀', 1);
priorityQueue.enqueue('苟玉梅', 3);
priorityQueue.enqueue('王进锋', 2);
priorityQueue.enqueue('余惠勤', 5);
priorityQueue.enqueue('宁玮君', 4);
console.log(priorityQueue.items);
console.log(priorityQueue.front());

console.log('-----------------------------------------------');
console.log('04. 【链表】');
console.log('-----------------------------------------------');

const linkedList = new LinkedList();
linkedList.append('成都');
linkedList.append('重庆');
linkedList.append('贵阳');
linkedList.append('昆明');
linkedList.insertAt('自贡', linkedList.length);
console.log(linkedList.getAt(0));
console.log(linkedList.getAt(1));
console.log(linkedList.getAt(2));

console.log(linkedList.indexOf('成都'));
console.log(linkedList.indexOf('乐山'));

console.log(linkedList.removeAt(2));
console.log(linkedList.removeAt(3));
console.log(linkedList);

console.log(linkedList.getAt(1));
linkedList.update('广都', 1);
console.log(linkedList.getAt(1));

linkedList.remove('成都');
console.log(linkedList);

console.log(linkedList.isEmpty());
console.log(linkedList.size());

console.log('-----------------------------------------------');
console.log('05. 【双向链表】');
console.log('-----------------------------------------------');
const doubleLinkedList = new DoubleLinkedList();
doubleLinkedList.append('周瑜');
doubleLinkedList.append('廉颇');
doubleLinkedList.insertAt('小乔', 0);
doubleLinkedList.insertAt('刘备', 3);
doubleLinkedList.insertAt('曹操', 2);
console.log('第0个元素：', doubleLinkedList.getAt(0));
console.log('第3个元素：', doubleLinkedList.getAt(3));
console.log('第4个元素：', doubleLinkedList.getAt(4));
console.log('刘备的下标是：', doubleLinkedList.indexOf('刘备'));
console.log(doubleLinkedList.removeAt(0));
console.log(doubleLinkedList.removeAt(3));
console.log(doubleLinkedList.removeAt(1));
doubleLinkedList.remove('廉颇');
console.log(doubleLinkedList);

console.log(doubleLinkedList.size());
console.log(doubleLinkedList.isEmpty());

console.log('-----------------------------------------------');
console.log('06. 【集合】');
console.log('-----------------------------------------------');

// const set = new Set();
// console.log(set.add(1));
// console.log(set.add(1));
// console.log(set.add(2));
// console.log(set.add(3));
// console.log(set.values());
// console.log(set.size());
// console.log(set.has(2));
// set.delete(2);
// console.log(set.values());
// console.log(set.size());
// set.clear();
// console.log(set.values());
// console.log(set.size());

var setA = new Set();
setA.add(1);
setA.add(2);
setA.add(3);

var setB = new Set();
setB.add(3);
setB.add(4);
setB.add(5);
console.log('并集：', setA.union(setB).values());
console.log('交集：', setA.intersection(setB).values());
console.log('差集：', setA.difference(setB).values());
console.log('子集：', setA.subset(setB));

console.log('-----------------------------------------------');
console.log('07. 【哈希函数】');
console.log('-----------------------------------------------');

// 创建哈希表实例
const hashTale = new HashTable();

// 存储
hashTale.put('name', '张三');
hashTale.put('job', '前端工程师');
hashTale.put('address', '成都市高新区');
hashTale.put('job', '全栈工程师');
// console.log(hashTale.storage);

// 获取
// console.log(hashTale.get('job'));
// console.log(hashTale.get('age'));

// 删除
console.log(hashTale.remove('job'));
// console.log(hashTale.storage);

// 其他方法
console.log(hashTale.isEmpty());
console.log(hashTale.size());

hashTale.put('aaa', 111);
hashTale.put('bbb', 111);
hashTale.put('ccc', 111);
hashTale.put('ddd', 111);
hashTale.put('eee', 111);
hashTale.put('fff', 111);
console.log(hashTale);

hashTale.put('ggg', 222);
console.log(hashTale);

console.log(hashTale.isPrime(2));
console.log(hashTale.isPrime(3));
console.log(hashTale.isPrime(4));
console.log(hashTale.isPrime(5));
console.log(hashTale.isPrime(6));

console.log('-----------------------------------------------');
console.log('07. 二叉搜索树');
console.log('-----------------------------------------------');

// 1. 创建二叉树
const bst = new BinarySearchTree();

// 2. 插入数据
bst.insert(11);
bst.insert(7);
bst.insert(15);
bst.insert(5);
bst.insert(3);
bst.insert(9);
bst.insert(8);
bst.insert(10);
bst.insert(13);
bst.insert(12);
bst.insert(14);
bst.insert(20);
bst.insert(18);
bst.insert(25);
bst.insert(6);

// 3. 测试遍历
console.log('先序遍历：', bst.preOrderTraverse());
console.log('中序遍历：', bst.inorderTraverse());
console.log('后序遍历：', bst.postOrderTraverse());

// 4. 最值
console.log('最小值：', bst.min());
console.log('最大值：', bst.max());

// 5. 搜索特定的值
console.log(bst.search(13));
console.log(bst.remove(9));
console.log(bst.remove(7));
console.log(bst.remove(15));
console.log('后序遍历：', bst.postOrderTraverse());
console.log(bst.root);
