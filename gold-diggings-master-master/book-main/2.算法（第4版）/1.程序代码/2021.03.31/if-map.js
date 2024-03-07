let a = 20;
// if (a === 10) {
//     console.log('10：' + a);
// } else if (a === 20) {
//     console.log('20：' + a);
// }

const map = new Map()
    .set(10, '10：' + a)
    .set(20, '20：' + a);
console.log(map.get(a));
