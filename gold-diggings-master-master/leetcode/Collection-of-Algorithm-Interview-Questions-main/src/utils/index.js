const chalk = require('chalk');

const Log = Object.create(null);
const log = console.log;

Log.info = function(message) {
  log(chalk.bgGreen.bold('[INFO]: ' + message));
};

Log.error = function(message) {
  log(chalk.bgRed.bold('[ERROR]: ' + message));
};

Log.warn = function(message) {
  log(chalk.bgYellow.bold('[WARN]: ' + message));
};

function ListNode(val, next) {
  this.val = val;
  this.next = next;
}

function createLinkedList (arr) {
  if (!Array.isArray(arr)) {
    Log.error('参数必须是数组类型！');
    return;
  }
  const dummy = new ListNode(-1);
  arr.reduce((acc, cur) => {
    acc.next = new ListNode(cur);
    return acc.next;
  }, dummy);
  return dummy.next;
}

function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

function createBinayTree (arr) {
  if (!Array.isArray(arr)) {
    Log.error('参数必须是数组类型！');
    return;
  }
  const n = arr.length;
  const buildTree = (i) => {
    if (i >= n || arr[i] == undefined) return null;
    const root = new TreeNode(arr[i]);
    root.left = buildTree(i*2+1);
    root.right = buildTree(i*2+2);
    return root;
  };
  return buildTree(0);
}

module.exports = {
  Log,
  createLinkedList,
  createBinayTree
}
