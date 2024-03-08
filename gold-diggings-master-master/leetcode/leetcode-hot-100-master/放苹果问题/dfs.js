/**
 * 把m个同样的苹果放在n个同样的盘子里，允许有的盘子空着不放，问共有多少种不同的分法？
注意：如果有7个苹果和3个盘子，（5，1，1）和（1，5，1）被视为是同一种分法。


输入描述：
输入两个int整数

输出描述：
输出结果，int型

示例1
输入：
7 3
复制
输出：
8
 */


function findApple(m, n) {
    let ans = 0;
    if(n<=1||m<=1){
        return 1
    }
    // 如果盘子比苹果多，那么
    if (n > m) {
        return findApple(m, m);
    }else {
        // 如果苹果多，那么盘子就会是 全部占满  ==> 只占一个，依次累加
        // 如果盘子全部铺满，那么就换算成 m- i，i 问题再递归
        for(let i=1;i<=n;i++){
            ans = findApple(m-i,i) + ans
        }
    }
    return ans
}

findApple;