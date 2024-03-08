const fs = require('fs');
const path = require('path');

const { 
  Log, 
  createLinkedList, 
  createBinayTree 
} = require('./src/utils/index');

const args = process.argv;
// 获取执行的题目序号
// 获取剩余的参数，用于注入题目中的方法
const [_, file, topicIndex, ...topicParams] = args;
const topicPath = `./src/leetcode_100/${topicIndex}.js`;
const topicAbsolutePath = path.resolve(__dirname, topicPath);

const topic = require(topicPath);
// 判断题目方法的参数合法性
if (topic.length != topicParams.length) {
  Log.error('指定参数与方法参数数量不匹配！');
  process.exit(1);
}

// 判断题目序号参数合法性
if (topicIndex == null || topicIndex == undefined) {
  Log.error('请指定题目的序号！');
  process.exit(1);
}
if (!/\d/.test(topicIndex)) {
  Log.error('题目序号请输入数字！');
  process.exit(1);
}

Log.info('开始执行！');
// 命令行传递进来的参数都是字符串形式的，需要转换一下
const topicParamsVarible = topicParams
  .map(p => {
    const fn = new Function(`return ${p}`);
    return fn();
  });

const topicContent = fs.readFileSync(topicAbsolutePath, 'utf-8');
// 判断文件注释中是否包含链表或者树，有的话需要根据参数来创建对应数据结构
// TODO 正则匹配出@param后面的参数，写不出来orz...暂时提取整个注释的内容后再去判断
const matchParamsType = topicContent.match(/\/\*[^]*?\*\//g)[0].split('\n');
const transformParam = [];
// 除去不是参数的行注释，它们分别是多行注释的'/*'、'*/'，以及题目名，链接地址
for (let i = 3; i < matchParamsType.length - 1; i++) {
  const t = matchParamsType[i];
  if (/@param\s*\{ListNode\}/.test(t)) {
    // 这里跳过了0，因此取对应参数时要补上索引
    transformParam.push(createLinkedList(topicParamsVarible[i-3]));
  } else if (t.includes('@param {TreeNode}')) {
    transformParam.push(createBinayTree(topicParamsVarible[i-3]));
  } else if (t.includes('@param')) {
    transformParam.push(topicParamsVarible[i-3]);
  }
}

const res = topic(...transformParam);

process.stderr.on('data', data => {
  Log.error('执行错误: ' + data);
});
process.on('uncaughtException', err => {
  console.error('有一个未捕获的错误', err);
  process.exit(1);
})
Log.info('执行结果为: ' + JSON.stringify(res));
Log.info('执行结束！');

process.exit(0);
