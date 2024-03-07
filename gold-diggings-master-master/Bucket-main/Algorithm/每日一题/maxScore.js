const cardPoints = [11,49,100,20,86,29,72], k = 4;

// 经过3次试错，发现思路错了

//测试用例怎么写？

// 选择从头尾拿哪个收益更高
// 可以只从一边拿
// 也可以两边交换着拿
// 思路，每次对头尾拿的牌进行比较，然后拿其中大的,但是如果相同的话，就要去比较后面一张牌的大小了
// 特殊情况：如果长度等于数组长度，直接求和

// 算法可以先考虑暴力解法，后面再继续优化

function maxScore(cardPoints,k){
    if(k === cardPoints.length){
        return arraySum(cardPoints)
    } else{
        return arraySum(compare(cardPoints,k))
    }
}

console.log(maxScore(cardPoints,k));

// 数组求和的方法
function arraySum(cardPoints){
    return cardPoints.reduce((acc,cur) => {
        return (acc+cur)
    })
}

// 数组头尾比较的方法
// 两个参数，一个是原数组，一个是比较次数
function compare(cardPoints,k){
    // 拿一个空数组接收
    // 需要处理相等时候的特殊情况,先不考虑
    // 相等的时候其实取哪个都行，因为后续还会继续比较
    // 拿走的那个值得从数组中删掉，才能再拿头尾的
    // const cardPoints = [100,40,17,9,73,75], k = 3;
    // 拿两个变量存一下头尾的值
    const arr = [];
    let startValue = cardPoints[0]; // 100
    let endValue = cardPoints[cardPoints.length - 1]; // 75
    let startCount = 0;
    let endCount = 0;
    for (let i = 0; i < k; i++) {
        if(startValue > endValue){
            arr.push(startValue);
            startCount++;
            startValue = cardPoints[startCount]; // 40
        }else{
            arr.push(endValue);
            endCount++;
            endValue = cardPoints[cardPoints.length-1-endCount]
        }
    }
    console.log(arr);
    return arr
}