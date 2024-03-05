const times = 5_000_000_000

function process() {
    return 1 + 2
}
function daff_1(times) {

    let iterations = Math.floor(times / 32);
    let leftover = times % 32;
    // 循环第一部分
    if (leftover > 0) {
        do {
            process();
        } while (--leftover > 0);
    }
    // 循环第二部分 8次为一组(do while比普通的while和for更快  因为少一次初始条件判断)
    do {
        process();
        process();
        process();
        process();
        process();
        process();
        process();
        process();
        process();
        process();
        process();
        process();
        process();
        process();
        process();
        process();
        process();
        process();
        process();
        process();
        process();
        process();
        process();
        process();
        process();
        process();
        process();
        process();
        process();
        process();
        process();
        process();
    } while (--iterations > 0);

}
function daff_2(times) {
    let iterations = Math.ceil(times / 8);
    let startAt = times % 8;
    do {
        switch (startAt) {
            case 0: process();
            case 7: process();
            case 6: process();
            case 5: process();
            case 4: process();
            case 3: process();
            case 2: process();
            case 1: process();
        }
        startAt = 0;
    } while (--iterations > 0);
}


console.time("For Iterator");
for (let i = 0; i < times; i++) {
    process()
}
console.timeEnd("For Iterator");

console.time("Daff Iterator");
daff_2(times)
console.timeEnd("Daff Iterator");

console.time("Daff Iterator+");
daff_1(times)
console.timeEnd("Daff Iterator+");



