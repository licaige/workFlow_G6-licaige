// a+b+c = 1000,a²+b²=c²，求a，b，c所有自然数解

let arr = [];

for (let a = 0; a < 1001; a += 1) {
    for (let b = 0; b < 1001; b += 1) {
        for (let c = 0; c < 1001; c += 1) {
            if(a*a+b*b === (1000-a-b)*(1000-a-b)){
                arr.push({
                    a,
                    b,
                    c:(1000-a-b)
                })
            }
        }
    }
}
console.log(arr);