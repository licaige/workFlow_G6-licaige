/**
 * 考察：贪心
 * @difficulty 中等
 * @summary:621. 任务调度器
 * 给你一个用字符数组 tasks 表示的 CPU 需要执行的任务列表。其中每个字母表示一种不同种类的任务。
 * 任务可以以任意顺序执行，并且每个任务都可以在 1 个单位时间内执行完。
 * 在任何一个单位时间，CPU 可以完成一个任务，或者处于待命状态。
 * 然而，两个 相同种类 的任务之间必须有长度为整数 n 的冷却时间，因此至少有连续 n 个单位时间内 CPU 在执行不同的任务，
 * 或者在待命状态。你需要计算完成所有任务所需要的 最短时间 。
 * 
 * 示例1：
 * 输入：tasks = ["A","A","A","B","B","B"], n = 2
 * 输出：8
 * 解释：A -> B -> (待命) -> A -> B -> (待命) -> A -> B
     在本示例中，两个相同类型任务之间必须间隔长度为 n = 2 的冷却时间，而执行一个任务只需要一个单位时间，所以中间出现了（待命）状态。 

题目理解：

 */
var leastInterval = function (tasks, n) {
    const len = tasks.length;
    if (n === 0) { return len }

    const letterNum = {};
    tasks.forEach(item => {
        if (letterNum[item]) {
            letterNum[item] += 1
        } else {
            letterNum[item] = 1
        }
    });
    let maxNum = 0, maxCount = 1;
    for (let val in letterNum) {
        if (maxNum === letterNum[val]) {
            maxCount += 1;
        } else if (maxNum < letterNum[val]) {
            maxNum = letterNum[val];
            maxCount = 1
        }
    }

    return Math.max((n + 1) * (maxNum - 1) + maxCount, len)

};
const tasks = ["A", "A", "A", "B", "B", "B"], n = 2
console.log(leastInterval(tasks, n))