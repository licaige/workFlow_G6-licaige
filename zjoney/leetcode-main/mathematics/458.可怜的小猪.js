
/**
 * 考察：组合数学
 * @difficulty困难
 * @summary: 458. 可怜的小猪
 * 有 buckets 桶液体，其中 正好有一桶 含有毒药，其余装的都是水。它们从外观看起来都一样。
 * 为了弄清楚哪只水桶含有毒药，你可以喂一些猪喝，通过观察猪是否会死进行判断。
 * 不幸的是，你只有 minutesToTest 分钟时间来确定哪桶液体是有毒的。
 * 喂猪的规则如下：
 * 选择若干活猪进行喂养
 * 可以允许小猪同时饮用任意数量的桶中的水，并且该过程不需要时间。
小猪喝完水后，必须有 minutesToDie 分钟的冷却时间。在这段时间里，你只能观察，而不允许继续喂猪。
过了 minutesToDie 分钟后，所有喝到毒药的猪都会死去，其他所有猪都会活下来。
重复这一过程，直到时间用完。
给你桶的数目 buckets ，minutesToDie 和 minutesToTest ，返回 在规定时间内判断哪个桶有毒所需的 最小 猪数 。
示例：
输入：buckets = 1000, minutesToDie = 15, minutesToTest = 60
输出：5
题目理解：
组合数学，Math.floor,Math.log
 */
// f(i, j)表示i只小猪测试j轮
// i 只小猪中有 k 只小猪存活的组合数是 C(i, k)
/**
 * 
 当最大测试轮数是 11 时，ii 只小猪可以判断的最大桶数是 f(i, 1)
         i
f(i,1) = ∑   f(k, 0)*C(i, k)
         k=0
         i
       = ∑  C(i, k)
         k=0
       = 2ˇⅰ
   
       1和2 喂一号猪，2和3喂二号猪，花费十五分钟。 
       如果一号猪死了，二号猪没死，证明1有毒； 
       如果一号猪和二号猪死了，证明2有毒； 
       如果二号猪死了，证明3有毒； 
       如果一号猪和二号猪都没死，则4有毒。
 */ 

var poorPigs = function(buckets, minutesToDie, minutesToTest) {
  debugger;
  const states = Math.floor(minutesToTest / minutesToDie) + 1; // 获得最大测试轮数
  const pigs = Math.ceil(Math.log(buckets) / Math.log(states) - 1e-5);
  return pigs;
};
const buckets = 4, minutesToDie = 15, minutesToTest = 15;
console.log(poorPigs(buckets, minutesToDie, minutesToTest));// 2， 表示2头猪可以测出来哪桶水有毒